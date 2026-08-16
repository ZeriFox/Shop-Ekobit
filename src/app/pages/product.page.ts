import { KeyValuePipe } from "@angular/common";
import { Component, DestroyRef, computed, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { LucideCheck, LucideHeart, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTruck } from "@lucide/angular";
import { ProductCardComponent } from "../components/product-card.component";
import { formatCurrency } from "../models/product";
import { CatalogService } from "../services/catalog.service";
import { ShopStateService } from "../services/shop-state.service";

@Component({
  imports: [KeyValuePipe, RouterLink, ProductCardComponent, LucideCheck, LucideHeart, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTruck],
  templateUrl: "./product.page.html",
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly title = inject(Title);
  readonly catalog = inject(CatalogService);
  readonly shop = inject(ShopStateService);
  readonly productId = signal<string | null>(null);
  readonly quantity = signal(1);
  readonly product = computed(() => this.catalog.findById(this.productId()));
  readonly related = computed(() => {
    const product = this.product();
    return product
      ? this.catalog.products().filter((item) => item.category === product.category && item.id !== product.id).slice(0, 5)
      : [];
  });
  readonly formatCurrency = formatCurrency;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.productId.set(params.get("id"));
      this.quantity.set(1);
    });
    effect(() => {
      const product = this.product();
      if (product) this.title.setTitle(`${product.name} | Ekobit`);
    });
  }

  updateQuantity(delta: number): void {
    this.quantity.update((current) => Math.min(20, Math.max(1, current + delta)));
  }

  addToCart(): void {
    const product = this.product();
    if (!product || product.stock === 0) return;
    for (let index = 0; index < this.quantity(); index += 1) this.shop.addToCart(product);
    this.shop.cartOpen.set(true);
  }
}
