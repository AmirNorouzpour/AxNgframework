import { EditorRoutingModule } from "./editor-routing.module";
import { SharedModule } from "./../shared";
import { NgModule } from "@angular/core";
import { EditorComponent } from "./editor.component";
import { BoxComponent } from "./components/box/box.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [EditorComponent, BoxComponent, HeaderComponent],
  imports: [SharedModule, EditorRoutingModule, DragDropModule],
})
export class EditorModule {}
