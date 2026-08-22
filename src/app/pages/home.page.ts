import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  LucideArrowRight,
  LucideGlobe2,
  LucideHeadphones,
  LucideShieldCheck,
  LucideSnowflake,
  LucideSparkles,
  LucideTruck,
  LucideTv,
  LucideWarehouse,
  LucideWashingMachine,
} from "@lucide/angular";
import { ProductCardComponent } from "../components/product-card.component";
import { I18nService } from "../i18n/i18n.service";
import { CatalogService } from "../services/catalog.service";

@Component({
  imports: [
    RouterLink,
    ProductCardComponent,
    LucideArrowRight,
    LucideGlobe2,
    LucideHeadphones,
    LucideShieldCheck,
    LucideSnowflake,
    LucideSparkles,
    LucideTruck,
    LucideTv,
    LucideWarehouse,
    LucideWashingMachine,
  ],
  templateUrl: "./home.page.html",
})
export class HomePage {
  readonly catalog = inject(CatalogService);
  readonly i18n = inject(I18nService);
}
