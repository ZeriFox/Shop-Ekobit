import { Component, effect, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideCookie, LucideShieldCheck } from "@lucide/angular";
import { I18nService } from "../i18n/i18n.service";
import { CookieConsentService } from "../services/cookie-consent.service";

@Component({
  selector: "app-cookie-consent",
  imports: [RouterLink, LucideCookie, LucideShieldCheck],
  template: `
    @if (consent.bannerVisible()) {
      <div class="consentScrim" aria-hidden="true"></div>
      <section class="consentPanel" role="dialog" aria-modal="true" aria-labelledby="consent-title">
        <div class="consentIcon"><svg lucideCookie [size]="24"></svg></div>
        <div class="consentIntro">
          <p class="eyebrow">{{ i18n.t('cookie.kicker') }}</p>
          <h2 id="consent-title">{{ i18n.t('cookie.title') }}</h2>
          <p>{{ i18n.t('cookie.text') }}</p>
        </div>

        @if (customizing()) {
          <div class="consentOptions">
            <label><span><strong>{{ i18n.t('cookie.necessary') }}</strong><small>{{ i18n.t('cookie.necessaryText') }}</small></span><input type="checkbox" checked disabled /></label>
            <label><span><strong>{{ i18n.t('cookie.analytics') }}</strong><small>{{ i18n.t('cookie.analyticsText') }}</small></span><input type="checkbox" [checked]="analytics()" (change)="analytics.set(!analytics())" /></label>
            <label><span><strong>{{ i18n.t('cookie.marketing') }}</strong><small>{{ i18n.t('cookie.marketingText') }}</small></span><input type="checkbox" [checked]="marketing()" (change)="marketing.set(!marketing())" /></label>
            <label><span><strong>{{ i18n.t('cookie.external') }}</strong><small>{{ i18n.t('cookie.externalText') }}</small></span><input type="checkbox" [checked]="external()" (change)="external.set(!external())" /></label>
          </div>
        }

        <div class="consentActions">
          <button type="button" class="consentGhost" (click)="consent.rejectOptional()">{{ i18n.t('cookie.reject') }}</button>
          @if (customizing()) {
            <button type="button" class="consentPrimary" (click)="save()">{{ i18n.t('cookie.save') }}</button>
          } @else {
            <button type="button" class="consentGhost" (click)="customizing.set(true)">{{ i18n.t('cookie.customize') }}</button>
            <button type="button" class="consentPrimary" (click)="consent.acceptAll()">{{ i18n.t('cookie.accept') }}</button>
          }
        </div>
        <a class="consentPolicy" [routerLink]="i18n.route('cookies')"><svg lucideShieldCheck [size]="15"></svg>{{ i18n.t('page.cookies') }}</a>
      </section>
    }
  `,
})
export class CookieConsentComponent {
  readonly customizing = signal(false);
  readonly analytics = signal(false);
  readonly marketing = signal(false);
  readonly external = signal(false);

  constructor(readonly consent: CookieConsentService, readonly i18n: I18nService) {
    effect(() => {
      if (!consent.settingsOpen()) return;
      const current = consent.preferences();
      if (!current) return;
      this.customizing.set(true);
      this.analytics.set(current.analytics);
      this.marketing.set(current.marketing);
      this.external.set(current.external);
    });
  }

  save(): void {
    this.consent.save({ analytics: this.analytics(), marketing: this.marketing(), external: this.external() });
  }
}
