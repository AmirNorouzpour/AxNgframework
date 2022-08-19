import { PanelRoutingModule } from "./panel-routing.module";
import { SharedModule } from "./../shared";
import { NgModule } from "@angular/core";
import { PanelComponent } from "./panel.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { SystemMenuComponent } from "./components/system-menu/system-menu.component";
import { UserMenuComponent } from "./components/user-menu/user-menu.component";
import { SystemContainerComponent } from "./components/system-container/system-container.component";
import { NotificationsMenuComponent } from "./components/notifications-menu/notifications-menu.component";
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";
import { ThemeMenuComponent } from "./components/theme-menu/theme-menu.component";
import { LanguageMenuComponent } from "./components/language-menu/language-menu.component";

@NgModule({
  declarations: [
    PanelComponent,
    SidebarComponent,
    HeaderComponent,
    SystemMenuComponent,
    UserMenuComponent,
    SystemContainerComponent,
    NotificationsMenuComponent,
    BreadCrumbComponent,
    ThemeMenuComponent,
    LanguageMenuComponent,
  ],
  imports: [SharedModule, PanelRoutingModule],
  exports:[NotificationsMenuComponent]
})
export class PanelModule {}
