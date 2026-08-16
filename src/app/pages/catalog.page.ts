import { Component, DestroyRef, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LucideCheck, LucideRefreshCw, LucideSearch } from "@lucide/angular";
import { ProductCardComponent } from "../components/product-card.component";
import { CatalogService } from "../services/catalog.service";

@Component({
  imports: [FormsModule, ProductCardComponent, LucideCheck, LucideRefreshCw, LucideSearch],
  templateUrl: "./catalog.page.html",
})
export class CatalogPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly catalog = inject(CatalogService);
  readonly category = signal("Tutti");
  readonly query = signal("");
  readonly saleOnly = signal(false);
  readonly sort = signal("featured");

  readonly products = computed(() => {
    const category = this.category();
    const query = this.query().trim().toLocaleLowerCase("it");
    let products = this.catalog.products().filter((product) => {
      const matchesCategory = category === "Tutti" || product.category === category;
      const matchesQuery = !query || `${product.brand} ${product.name} ${product.category}`.toLocaleLowerCase("it").includes(query);
      const matchesSale = !this.saleOnly() || product.oldPrice > product.price;
      return matchesCategory && matchesQuery && matchesSale;
    });

    products = [...products];
    if (this.sort() === "price-asc") products.sort((left, right) => left.price - right.price);
    if (this.sort() === "price-desc") products.sort((left, right) => right.price - left.price);
    if (this.sort() === "name") products.sort((left, right) => left.name.localeCompare(right.name, "it"));
    if (this.sort() === "featured") products.sort((left, right) => Number(right.featured) - Number(left.featured));
    return products;
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.category.set(params.get("category") || "Tutti");
      this.query.set(params.get("q") || "");
      this.saleOnly.set(params.get("sale") === "true");
      this.sort.set(params.get("sort") || "featured");
    });
  }

  setCategory(category: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category === "Tutti" ? null : category },
      queryParamsHandling: "merge",
    });
  }

  setSort(sort: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sort === "featured" ? null : sort },
      queryParamsHandling: "merge",
    });
  }

  clearFilters(): void {
    void this.router.navigate(["/catalogo"]);
  }
}
