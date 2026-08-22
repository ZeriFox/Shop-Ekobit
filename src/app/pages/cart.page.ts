import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideArrowLeft, LucideArrowRight, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTrash2, LucideTruck } from "@lucide/angular";
import { I18nService } from "../i18n/i18n.service";
import { ShopStateService } from "../services/shop-state.service";

@Component({
  imports: [RouterLink, LucideArrowLeft, LucideArrowRight, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTrash2, LucideTruck],
  templateUrl: "./cart.page.html",
})
export class CartPage {
  readonly shop = inject(ShopStateService);
  readonly i18n = inject(I18nService);
  readonly formatCurrency = (value: number) => this.i18n.currency(value);
}
