import { Component, computed, inject } from "@angular/core";
import { LucideCreditCard, LucideHeadphones, LucideMail, LucidePackageCheck, LucideShieldCheck, LucideTruck } from "@lucide/angular";
import { COMPANY } from "../config/company";
import { I18nService, type Locale } from "../i18n/i18n.service";

const SUPPORT_COPY: Record<Locale, Record<string, string>> = {
  it: { title: "Persone vere, risposte utili.", lead: "Dubbi su prodotti, consegne o acquisti? Il team Ekobit ti accompagna in ogni fase.", write: "Scrivi a", pre: "Prima dell’acquisto", preText: "Confrontiamo misure, funzioni, consumi e compatibilità.", ship: "Spedizioni tracciate", shipText: "Informazioni chiare su destinazioni, tempi e tracciamento.", after: "Post vendita", afterText: "Supporto per resi, garanzia e assistenza tecnica.", payments: "Pagamenti protetti", paymentsText: "I dati saranno gestiti da provider certificati e non salvati nei sistemi Ekobit.", cards: "Carte e wallet", encrypted: "Connessione cifrata" },
  en: { title: "Real people, useful answers.", lead: "Questions about products, deliveries or purchases? The Ekobit team supports you at every stage.", write: "Email", pre: "Before purchase", preText: "We compare dimensions, features, consumption and compatibility.", ship: "Tracked shipping", shipText: "Clear information about destinations, timing and tracking.", after: "After sales", afterText: "Support for returns, legal guarantee and technical assistance.", payments: "Protected payments", paymentsText: "Payment data will be handled by certified providers and never stored by Ekobit.", cards: "Cards and wallets", encrypted: "Encrypted connection" },
  fr: { title: "De vraies personnes, des réponses utiles.", lead: "Des questions sur les produits, livraisons ou achats ? L’équipe Ekobit vous accompagne.", write: "Écrire à", pre: "Avant l’achat", preText: "Nous comparons dimensions, fonctions, consommation et compatibilité.", ship: "Livraison suivie", shipText: "Informations claires sur destinations, délais et suivi.", after: "Après-vente", afterText: "Assistance pour retours, garantie et support technique.", payments: "Paiements protégés", paymentsText: "Les données seront gérées par des prestataires certifiés et jamais stockées par Ekobit.", cards: "Cartes et wallets", encrypted: "Connexion chiffrée" },
  de: { title: "Echte Menschen, hilfreiche Antworten.", lead: "Fragen zu Produkten, Lieferung oder Kauf? Das Ekobit-Team begleitet Sie.", write: "E-Mail an", pre: "Vor dem Kauf", preText: "Wir vergleichen Maße, Funktionen, Verbrauch und Kompatibilität.", ship: "Verfolgter Versand", shipText: "Klare Angaben zu Zielen, Zeiten und Sendungsverfolgung.", after: "Nach dem Kauf", afterText: "Hilfe bei Rückgabe, Gewährleistung und Technik.", payments: "Geschützte Zahlungen", paymentsText: "Zahlungsdaten werden von zertifizierten Anbietern verarbeitet und nicht bei Ekobit gespeichert.", cards: "Karten und Wallets", encrypted: "Verschlüsselte Verbindung" },
  es: { title: "Personas reales, respuestas útiles.", lead: "¿Dudas sobre productos, entregas o compras? El equipo Ekobit te acompaña.", write: "Escribe a", pre: "Antes de comprar", preText: "Comparamos medidas, funciones, consumo y compatibilidad.", ship: "Envíos con seguimiento", shipText: "Información clara sobre destinos, plazos y seguimiento.", after: "Posventa", afterText: "Ayuda con devoluciones, garantía y asistencia técnica.", payments: "Pagos protegidos", paymentsText: "Los datos serán gestionados por proveedores certificados y no se almacenarán en Ekobit.", cards: "Tarjetas y wallets", encrypted: "Conexión cifrada" },
};

@Component({
  imports: [LucideCreditCard, LucideHeadphones, LucideMail, LucidePackageCheck, LucideShieldCheck, LucideTruck],
  templateUrl: "./support.page.html",
})
export class SupportPage {
  readonly i18n = inject(I18nService);
  readonly company = COMPANY;
  readonly copy = computed(() => SUPPORT_COPY[this.i18n.locale()]);
}
