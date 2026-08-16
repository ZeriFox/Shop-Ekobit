import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideArrowRight, LucideHandshake, LucideHeartHandshake, LucideMapPin, LucideShieldCheck } from "@lucide/angular";

@Component({
  imports: [RouterLink, LucideArrowRight, LucideHandshake, LucideHeartHandshake, LucideMapPin, LucideShieldCheck],
  templateUrl: "./about.page.html",
})
export class AboutPage {}
