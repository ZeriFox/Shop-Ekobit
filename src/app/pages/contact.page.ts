import { Component, computed, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { LucideArrowRight, LucideClock3, LucideMail, LucideMapPin, LucideNavigation, LucidePhone, LucideShieldCheck } from "@lucide/angular";
import { COMPANY } from "../config/company";
import { I18nService, type Locale } from "../i18n/i18n.service";
import { CookieConsentService } from "../services/cookie-consent.service";

const CONTACT_COPY: Record<Locale, Record<string, string>> = {
  it: { kicker: "Contatto diretto", title: "Una sede italiana. Un servizio europeo.", lead: "Scrivici per prodotti, ordini, partnership o assistenza. Ti risponde una persona del team Ekobit.", email: "Scrivici", phone: "Chiamaci", office: "Vieni a trovarci", hours: "Orari", hoursValue: "Lun–Ven · 09:00–18:00", mapTitle: "Ekobit a Crotone", mapText: "Per proteggere la tua privacy, Google Maps viene caricato solo dopo il consenso ai contenuti esterni.", loadMap: "Carica Google Maps", directions: "Apri indicazioni", business: "Dati societari" },
  en: { kicker: "Direct contact", title: "An Italian base. A European service.", lead: "Contact us about products, orders, partnerships or support. A real member of the Ekobit team will reply.", email: "Email us", phone: "Call us", office: "Visit us", hours: "Hours", hoursValue: "Mon–Fri · 09:00–18:00", mapTitle: "Ekobit in Crotone", mapText: "To protect your privacy, Google Maps loads only after consent to external content.", loadMap: "Load Google Maps", directions: "Open directions", business: "Company details" },
  fr: { kicker: "Contact direct", title: "Une base italienne. Un service européen.", lead: "Contactez-nous pour les produits, commandes, partenariats ou l’assistance. Une personne de l’équipe vous répondra.", email: "Écrivez-nous", phone: "Appelez-nous", office: "Nous rendre visite", hours: "Horaires", hoursValue: "Lun–Ven · 09:00–18:00", mapTitle: "Ekobit à Crotone", mapText: "Google Maps est chargé uniquement après votre consentement aux contenus externes.", loadMap: "Charger Google Maps", directions: "Itinéraire", business: "Informations société" },
  de: { kicker: "Direkter Kontakt", title: "Italienischer Standort. Europäischer Service.", lead: "Kontaktieren Sie uns zu Produkten, Bestellungen, Partnerschaften oder Support. Unser Team antwortet persönlich.", email: "E-Mail", phone: "Anrufen", office: "Besuchen", hours: "Öffnungszeiten", hoursValue: "Mo–Fr · 09:00–18:00", mapTitle: "Ekobit in Crotone", mapText: "Google Maps wird zum Schutz Ihrer Privatsphäre erst nach Einwilligung geladen.", loadMap: "Google Maps laden", directions: "Route öffnen", business: "Unternehmensdaten" },
  es: { kicker: "Contacto directo", title: "Una sede italiana. Un servicio europeo.", lead: "Escríbenos sobre productos, pedidos, colaboraciones o asistencia. Te responderá una persona del equipo Ekobit.", email: "Escríbenos", phone: "Llámanos", office: "Visítanos", hours: "Horario", hoursValue: "Lun–Vie · 09:00–18:00", mapTitle: "Ekobit en Crotone", mapText: "Google Maps solo se carga después de aceptar el contenido externo.", loadMap: "Cargar Google Maps", directions: "Abrir indicaciones", business: "Datos societarios" },
};

@Component({
  imports: [RouterLink, LucideArrowRight, LucideClock3, LucideMail, LucideMapPin, LucideNavigation, LucidePhone, LucideShieldCheck],
  templateUrl: "./contact.page.html",
})
export class ContactPage {
  readonly i18n = inject(I18nService);
  readonly consent = inject(CookieConsentService);
  readonly company = COMPANY;
  readonly copy = computed(() => CONTACT_COPY[this.i18n.locale()]);
  readonly mapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(COMPANY.mapEmbedUrl);
}
