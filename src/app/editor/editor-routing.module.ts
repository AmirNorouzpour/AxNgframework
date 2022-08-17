import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../auth";
import { EditorComponent } from "../editor/editor.component";

const routes: Routes = [
  {
    path: "editor/:strategyId/:version",
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "editor",
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
