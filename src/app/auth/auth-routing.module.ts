import { CanActivateLogin } from "./services/can-activate-login.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "auth",
    component: LoginComponent,
    canActivate: [CanActivateLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
