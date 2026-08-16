import { Component, OnDestroy, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  LucideArrowLeft,
  LucideArrowRight,
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
import { HERO_SLIDES } from "../data/catalog.data";
import { CatalogService } from "../services/catalog.service";

@Component({
  imports: [
    RouterLink,
    ProductCardComponent,
    LucideArrowLeft,
    LucideArrowRight,
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
export class HomePage implements OnDestroy {
  readonly heroSlides = HERO_SLIDES;
  readonly activeSlide = signal(0);
  readonly carouselPaused = signal(false);
  private readonly carouselTimer: ReturnType<typeof setInterval>;

  constructor(readonly catalog: CatalogService) {
    this.carouselTimer = setInterval(() => {
      if (!this.carouselPaused()) this.changeSlide(1);
    }, 4400);
  }

  ngOnDestroy(): void {
    clearInterval(this.carouselTimer);
  }

  changeSlide(direction: number): void {
    this.activeSlide.update((current) => (current + direction + this.heroSlides.length) % this.heroSlides.length);
  }

  moveHeroGlow(event: PointerEvent, element: HTMLElement): void {
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }
}
