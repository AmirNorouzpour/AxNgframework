import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AxMenuItem, AxSystem } from "shared/models";
import { AppSetting } from "../../services/app-setting.service";

@Component({
  selector: "system-container",
  templateUrl: "./system-container.component.html",
  styleUrls: ["./system-container.component.scss"],
})
export class SystemContainerComponent implements OnInit {
  systemMenu: AxMenuItem[];
  currentSystem: AxSystem;
  sidebarIsCollpased: boolean = false;
  mobileSidebarIsCollapsed: boolean = true;
  // breadCrumbInitialItem:

  constructor(private route: ActivatedRoute, private appSetting: AppSetting) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      debugger;
      this.currentSystem = this.appSetting.initialData.systemsList.find(
        (system) =>
          system.id == this.appSetting.getSystemIdByName(data["systemName"])
      );
      this.systemMenu = data.systemMenu;
    });

    this.appSetting.sidebarIsCollapsed.subscribe((isCollapsed) => {
      this.sidebarIsCollpased = isCollapsed;
    });

    this.appSetting.mobileSidebarIsCollapsed.subscribe((isCollapsed) => {
      this.mobileSidebarIsCollapsed = isCollapsed;
    });
  }

  openMobileMenu() {
    this.appSetting.expandMobileSidebar();
  }

  closeMobileMenu() {
    this.appSetting.collapseMobileSidebar();
  }

  handleMobileSidebarToggle(isCollapsed) {
    isCollapsed
      ? this.appSetting.expandMobileSidebar()
      : this.appSetting.collapseMobileSidebar();
  }

  handleSidebarToggle(isCollapsed) {
    isCollapsed
      ? this.appSetting.expandSidebar()
      : this.appSetting.collapseSidebar();
  }
}
