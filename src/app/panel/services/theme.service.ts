import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _theme: string;
  private readonly themePrefix = "theme-";
  public activeTheme$: BehaviorSubject<string> = new BehaviorSubject("default");

  themes = of([
    { key: "default", title: "Blue" },
    { key: "1", title: "Navy Blue" },
    { key: "2", title: "Black" },
    { key: "3", title: "Green" },
    { key: "4", title: "Purple" },
    { key: "5", title: "Metalic" },
  ]);

  constructor() {
    this._theme = localStorage.getItem("theme") || "default";
  }

  public initializeTheme() {
    const themeClassName = this.themePrefix + this._theme;
    document.body.classList.add(themeClassName);
    this.addThemeLink(this._theme);
    this.activeTheme$.next(this._theme);
  }

  public changeTheme(theme) {
    const oldTheme = this._theme;
    const themePrefix = "theme-";

    if (theme) {
      this._theme = theme;
      localStorage.setItem("theme", theme);
      const themeClassName = themePrefix + theme;
      document.body.classList.replace(themePrefix + oldTheme, themeClassName);
      this.addThemeLink(theme);
      this.activeTheme$.next(theme);
    }
  }

  private addThemeLink(theme) {
    const dom = document.getElementsByClassName("theme-override")[0];
    if (dom) {
      dom.remove();
    }

    if (theme !== "default") {
      const style = document.createElement("link");
      style.type = "text/css";
      style.rel = "stylesheet";
      style.className = "theme-override";
      style.href = `/assets/themes/style.theme${theme}.css`;
      document.body.appendChild(style);
    }
  }
}
