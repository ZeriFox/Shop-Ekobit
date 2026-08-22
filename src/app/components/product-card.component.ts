import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideArrowRight, LucideHeart, LucideShoppingBag } from "@lucide/angular";
import { I18nService } from "../i18n/i18n.service";
import { type Product } from "../models/product";
import { ShopStateService } from "../services/shop-state.service";

@Component({
  selector: "app-product-card",
  imports: [RouterLink, LucideArrowRight, LucideHeart, LucideShoppingBag],
  template: `
    <article class="productCard">
      <div class="productMedia">
        <span class="badge">{{ product().badge }}</span>
        <button
          type="button"
          class="heartButton"
          [class.liked]="shop.isLiked(product().id)"
          [attr.aria-label]="i18n.t('nav.wishlist') + ': ' + product().name"
          [attr.aria-pressed]="shop.isLiked(product().id)"
          (click)="shop.toggleWishlist(product())"
        >
          <svg lucideHeart [size]="19" [attr.fill]="shop.isLiked(product().id) ? 'currentColor' : 'none'"></svg>
        </button>
        <a class="productImageLink" [routerLink]="i18n.route('product', product().id)" [attr.aria-label]="i18n.t('product.details') + ': ' + product().name">
          <img [src]="product().image" [alt]="product().name" width="400" height="400" loading="lazy" />
          <span class="quickViewButton">{{ i18n.t('product.details') }} <svg lucideArrowRight [size]="17"></svg></span>
        </a>
      </div>
      <div class="productInfo">
        <p>{{ product().brand }}</p>
        <h3><a [routerLink]="i18n.route('product', product().id)">{{ product().name }}</a></h3>
        <div class="priceRow">
          <strong>{{ i18n.currency(product().price) }}</strong>
          @if (product().oldPrice > product().price) { <del>{{ i18n.currency(product().oldPrice) }}</del> }
        </div>
        <button type="button" class="addButton" [disabled]="product().stock === 0" (click)="shop.addToCart(product())">
          <svg lucideShoppingBag [size]="18"></svg>{{ product().stock === 0 ? i18n.t('product.unavailable') : i18n.t('product.add') }}
        </button>
      </div>
    </article>
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly shop = inject(ShopStateService);
  readonly i18n = inject(I18nService);
}
