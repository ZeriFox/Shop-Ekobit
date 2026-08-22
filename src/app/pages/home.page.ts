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

  moveStage(event: PointerEvent): void {
    if (event.pointerType === "touch") return;
    const stage = event.currentTarget;
    if (!(stage instanceof HTMLElement)) return;
    const bounds = stage.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    stage.style.setProperty("--stage-x", x.toFixed(3));
    stage.style.setProperty("--stage-y", y.toFixed(3));
  }

  resetStage(event: PointerEvent): void {
    const stage = event.currentTarget;
    if (!(stage instanceof HTMLElement)) return;
    stage.style.setProperty("--stage-x", "0");
    stage.style.setProperty("--stage-y", "0");
  }
}
