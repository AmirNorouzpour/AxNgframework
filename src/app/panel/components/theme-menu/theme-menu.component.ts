import { Subscription } from "rxjs";
import { ThemeService } from "./../../services/theme.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "ax-theme-menu",
  templateUrl: "./theme-menu.component.html",
  styleUrls: ["./theme-menu.component.scss"],
})
export class ThemeMenuComponent implements OnInit, OnDestroy {
  currentTheme: string;
  themeSubscription: Subscription;

  constructor(public themeService: ThemeService) {
    this.themeSubscription = themeService.activeTheme$.subscribe(
      (theme) => (this.currentTheme = theme)
    );
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  onThemeClick(theme) {
    this.themeService.changeTheme(theme);
  }
}
