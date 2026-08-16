import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideArrowLeft, LucideArrowRight, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTrash2, LucideTruck } from "@lucide/angular";
import { formatCurrency } from "../models/product";
import { ShopStateService } from "../services/shop-state.service";

@Component({
  imports: [RouterLink, LucideArrowLeft, LucideArrowRight, LucideMinus, LucidePlus, LucideShieldCheck, LucideShoppingBag, LucideTrash2, LucideTruck],
  templateUrl: "./cart.page.html",
})
export class CartPage {
  readonly shop = inject(ShopStateService);
  readonly formatCurrency = formatCurrency;
}
