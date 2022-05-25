import { SystemMenuResolver } from "./services/system-menu-resolver.service";
import { SystemContainerComponent } from "./components/system-container/system-container.component";
import { AppSetting } from "./services/app-setting.service";
import { PanelComponent } from "./panel.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../auth";
import { AxDashboardComponent } from "shared/ax-dashboard/ax-dashboard.component";
import { BasicSystemRoutes } from "./../systems/basic";

const systemBreadCrumbNames = {
  basic: "Basic",
};

const getSystemRoute: (string, Routes) => Route = (systemName, childRoutes) => {
  debugger;
  return {
    path: systemName,
    component: SystemContainerComponent,
    resolve: {
      systemMenu: SystemMenuResolver,
    },
    data: {
      systemName,
      breadcrumb: systemBreadCrumbNames[systemName],
    },
    children: [
      {
        path: "",
        component: AxDashboardComponent,
        data: {
          breadcrumb: null,
        },
      },
      ...childRoutes,
    ],
  };
};

const SystemsRoutes = [getSystemRoute("basic", BasicSystemRoutes)];

const routes: Routes = [
  {
    path: "panel",
    component: PanelComponent,
    canActivate: [AuthGuard],
    resolve: {
      initialData: AppSetting,
    },
    children: SystemsRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
