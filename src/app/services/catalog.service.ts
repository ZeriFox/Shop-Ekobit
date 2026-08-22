import { HttpClient } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { finalize } from "rxjs";
import { CATEGORIES, DEMO_PRODUCTS, localizeDemoProduct } from "../data/catalog.data";
import { I18nService } from "../i18n/i18n.service";
import { type CatalogResponse, type Product, normalizeProduct } from "../models/product";

export type CatalogStatus = "idle" | "loading" | "ready" | "demo" | "fallback";

@Injectable({ providedIn: "root" })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);
  private requested = false;
  private readonly sourceProducts = signal<Product[]>(DEMO_PRODUCTS);

  readonly products = computed(() => this.sourceProducts().map((product) => localizeDemoProduct(product, this.i18n.locale())));
  readonly status = signal<CatalogStatus>("idle");
  readonly error = signal<string | null>(null);
  readonly categories = computed(() => [
    "Tutti",
    ...new Set([
      ...CATEGORIES.filter((category) => category !== "Tutti"),
      ...this.products().map((product) => product.category),
    ]),
  ]);
  readonly featuredProducts = computed(() => {
    const products = this.products();
    const featured = products.filter((product) => product.featured);
    const remaining = products.filter((product) => !product.featured);
    return [...featured, ...remaining].slice(0, 5);
  });

  load(force = false): void {
    if (this.requested && !force) return;
    this.requested = true;
    this.status.set("loading");
    this.error.set(null);

    this.http
      .get<CatalogResponse>("/api/products")
      .pipe(finalize(() => this.status.update((status) => (status === "loading" ? "fallback" : status))))
      .subscribe({
        next: (payload) => {
          const products = Array.isArray(payload?.products)
            ? payload.products.map(normalizeProduct).filter((product): product is Product => product !== null)
            : [];
          if (products.length) {
            this.sourceProducts.set(products);
            this.status.set("ready");
          } else {
            this.sourceProducts.set(DEMO_PRODUCTS);
            this.status.set("demo");
          }
        },
        error: () => {
          this.error.set("Il catalogo online non è momentaneamente raggiungibile.");
          this.status.set("fallback");
        },
      });
  }

  findById(productId: string | null): Product | null {
    return productId ? (this.products().find((product) => product.id === productId) ?? null) : null;
  }
}
