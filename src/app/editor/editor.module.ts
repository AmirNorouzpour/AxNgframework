import { EditorRoutingModule } from "./editor-routing.module";
import { SharedModule } from "./../shared";
import { NgModule } from "@angular/core";
import { EditorComponent } from "./editor.component";
import { BoxComponent } from "./components/box/box.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HeaderComponent } from "./components/header/header.component";
import { StrategyListComponent } from "./components/strategy-list/strategy-list.component";
import { FooterComponent } from "./components/footer/footer.component";
import { UserAccountMenuComponent } from "./components/user-account-menu/user-account-menu.component";
import { NotificationsMenuComponent } from "../panel/components/notifications-menu/notifications-menu.component";
import { PanelModule } from "../panel";

@NgModule({
  declarations: [
    EditorComponent,
    BoxComponent,
    HeaderComponent,
    StrategyListComponent,
    FooterComponent,
    UserAccountMenuComponent,
  ],
  imports: [SharedModule, EditorRoutingModule, DragDropModule,PanelModule],
})
export class EditorModule {}
