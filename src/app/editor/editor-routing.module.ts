import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../auth";
import {EditorComponent} from "../editor/editor.component";

const routes: Routes = [
  {
    path: "editor",
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      // initialData: AppSetting,
    },
    // children: SystemsRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
