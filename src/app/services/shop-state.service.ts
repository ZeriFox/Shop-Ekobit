import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from "@angular/core";
import type { CartLine, Product } from "../models/product";
import { CatalogService } from "./catalog.service";

const CART_KEY = "ekobit-cart-v1";
const WISHLIST_KEY = "ekobit-wishlist-v1";

function parseCart(value: string | null): CartLine[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((line): line is CartLine => Boolean(line) && typeof line === "object" && typeof (line as CartLine).productId === "string" && Number.isInteger((line as CartLine).quantity) && (line as CartLine).quantity > 0)
      : [];
  } catch {
    return [];
  }
}

function parseWishlist(value: string | null): Set<string> {
  if (!value) return new Set();
  try {
    const parsed: unknown = JSON.parse(value);
    return new Set(Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

@Injectable({ providedIn: "root" })
export class ShopStateService {
  private readonly catalog = inject(CatalogService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  readonly cart = signal<CartLine[]>([]);
  readonly wishlist = signal<Set<string>>(new Set());
  readonly cartOpen = signal(false);
  readonly menuOpen = signal(false);
  readonly toast = signal("");
  readonly cartItems = computed(() => this.cart().flatMap((line) => {
    const product = this.catalog.findById(line.productId);
    return product ? [{ ...line, product }] : [];
  }));
  readonly cartCount = computed(() => this.cart().reduce((total, line) => total + line.quantity, 0));
  readonly cartTotal = computed(() => this.cartItems().reduce((total, line) => total + line.product.price * line.quantity, 0));
  readonly overlayOpen = computed(() => this.cartOpen() || this.menuOpen());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.cart.set(parseCart(localStorage.getItem(CART_KEY)));
      this.wishlist.set(parseWishlist(localStorage.getItem(WISHLIST_KEY)));
      effect(() => localStorage.setItem(CART_KEY, JSON.stringify(this.cart())));
      effect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify([...this.wishlist()])));
    }
    effect((onCleanup) => {
      if (!this.overlayOpen()) return;
      const previousOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = "hidden";
      onCleanup(() => { this.document.body.style.overflow = previousOverflow; });
    });
  }

  isLiked(productId: string): boolean { return this.wishlist().has(productId); }

  toggleWishlist(product: Product): void {
    const next = new Set(this.wishlist());
    const removing = next.has(product.id);
    if (removing) next.delete(product.id); else next.add(product.id);
    this.wishlist.set(next);
    this.showToast(removing ? "Rimosso dai preferiti" : "Salvato nei preferiti");
  }

  addToCart(product: Product, openCart = false): void {
    this.cart.update((current) => {
      const existing = current.find((line) => line.productId === product.id);
      return existing
        ? current.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { productId: product.id, quantity: 1 }];
    });
    this.showToast(`${product.brand} aggiunto al carrello`);
    if (openCart) this.cartOpen.set(true);
  }

  updateQuantity(productId: string, delta: number): void {
    this.cart.update((current) => current.flatMap((line) => {
      if (line.productId !== productId) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  }

  removeFromCart(productId: string): void {
    this.cart.update((current) => current.filter((line) => line.productId !== productId));
  }

  closeOverlays(): void { this.cartOpen.set(false); this.menuOpen.set(false); }

  showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(""), 2400);
  }
}
