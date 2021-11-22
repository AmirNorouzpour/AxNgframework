import { NgModule } from "@angular/core";
import { AxDashboardComponent } from "./ax-dashboard.component";
import { AxCommonModule } from "./../ax-common/ax-common.module";
import { AxChartsModule } from "./../ax-charts/ax-charts.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AxDashboardComponent],
  imports: [AxChartsModule, AxCommonModule, CommonModule],
  exports: [AxDashboardComponent],
})
export class AxDashboardModule {}
