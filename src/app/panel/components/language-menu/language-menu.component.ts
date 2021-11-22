import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ax-language-menu",
  templateUrl: "./language-menu.component.html",
  styleUrls: ["./language-menu.component.scss"],
})
export class LanguageMenuComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  onLangClick(lang) {
    this.translateService.use(lang);
    localStorage.setItem("lang", lang);
  }
}
