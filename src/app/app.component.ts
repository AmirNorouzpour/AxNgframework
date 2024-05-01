import { ThemeService } from "./panel/services/theme.service";
import { Component, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  direction = "ltr";

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {}
  title = "NgFramework";
  languageDirectionMapping = {
    fa: "rtl",
    en: "ltr",
  };

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.configureTranslateService();
  }

  configureTranslateService() {
    const lang = localStorage.getItem("lang") || "fa";
    this.translateService.addLangs(["en", "fa"]);
    this.translateService.setDefaultLang("fa");
    this.translateService.use(lang);
    this.translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      const direction = this.languageDirectionMapping[params.lang];
      this.direction = direction;
      document.body.setAttribute("dir", direction);
    });
  }
}
