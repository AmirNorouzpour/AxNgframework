import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InitialData } from "shared/models";
import { AppSetting } from "./services/app-setting.service";

@Component({
  selector: "panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
})
export class PanelComponent implements OnInit {
  private _initialData: InitialData;

  get initialData() {
    return this._initialData;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appSetting: AppSetting
  ) {
    route.data.subscribe((data) => (this._initialData = data.initialData));
  }

  ngOnInit(): void {
    const { defaultSystemId } = this._initialData;
    if (!this.router.url.includes("/panel/")) {
      this.router.navigate([
        `/panel/${this.appSetting.getSystemNameById(defaultSystemId)}`,
      ]);
    }
  }
}
