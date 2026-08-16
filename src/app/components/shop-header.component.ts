import { Component, DestroyRef, HostListener, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { NavigationStart, Router, RouterLink, RouterLinkActive } from "@angular/router";
import {
  LucideArrowRight,
  LucideChevronDown,
  LucideCircleUserRound,
  LucideHeadphones,
  LucideHeart,
  LucideMenu,
  LucideMinus,
  LucidePlus,
  LucideSearch,
  LucideShoppingBag,
  LucideTrash2,
  LucideX,
} from "@lucide/angular";
import { formatCurrency } from "../models/product";
import { CatalogService } from "../services/catalog.service";
import { ShopStateService } from "../services/shop-state.service";
import { filter } from "rxjs";

@Component({
  selector: "app-shop-header",
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    LucideArrowRight,
    LucideChevronDown,
    LucideCircleUserRound,
    LucideHeadphones,
    LucideHeart,
    LucideMenu,
    LucideMinus,
    LucidePlus,
    LucideSearch,
    LucideShoppingBag,
    LucideTrash2,
    LucideX,
  ],
  templateUrl: "./shop-header.component.html",
})
export class ShopHeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly catalog = inject(CatalogService);
  readonly shop = inject(ShopStateService);
  readonly query = signal("");
  readonly searchOpen = signal(false);
  readonly formatCurrency = formatCurrency;
  readonly normalizedQuery = computed(() => this.query().trim().toLocaleLowerCase("it"));
  readonly searchMatches = computed(() => {
    const query = this.normalizedQuery();
    if (!query) return [];
    return this.catalog.products()
      .filter((product) => `${product.brand} ${product.name} ${product.category}`.toLocaleLowerCase("it").includes(query))
      .slice(0, 5);
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.searchOpen.set(false);
        this.shop.closeOverlays();
      });
  }

  @HostListener("document:keydown.escape")
  closeOnEscape(): void {
    this.searchOpen.set(false);
    this.shop.closeOverlays();
  }

  submitSearch(event: Event): void {
    event.preventDefault();
    const query = this.query().trim();
    if (!query) return;
    this.searchOpen.set(false);
    void this.router.navigate(["/catalogo"], { queryParams: { q: query } });
  }

  chooseProduct(productId: string): void {
    this.searchOpen.set(false);
    this.query.set("");
    void this.router.navigate(["/prodotto", productId]);
  }

  openCategory(category: string): void {
    this.shop.menuOpen.set(false);
    void this.router.navigate(["/catalogo"], { queryParams: { category } });
  }

  closeSearchIfOutside(event: FocusEvent): void {
    const container = event.currentTarget;
    if (container instanceof HTMLElement && !(event.relatedTarget instanceof Node && container.contains(event.relatedTarget))) {
      this.searchOpen.set(false);
    }
  }
}
