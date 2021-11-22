import { AxReportModule } from "./ax-report/ax-report.module";
import { AxFormModule } from "./ax-form/ax-form.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AxChartsModule } from "./ax-charts/ax-charts.module";
import { AxCommonModule } from "./ax-common/ax-common.module";
import { AxDashboardModule } from "./ax-dashboard/ax-dashboard.module";
import { SharedMaterialModule } from "./material/shared-material.module";
import { SharedNgZorroModule } from "./ng-zorro/shared-ng-zorro.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AxChatModule } from "./ax-chat/ax-chat.module";
import { TranslateModule } from "@ngx-translate/core";
import { BidiModule } from "@angular/cdk/bidi";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedNgZorroModule,
    AxCommonModule,
    AxFormModule,
    AxReportModule,
    AxChatModule,
    BidiModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedNgZorroModule,
    AxChartsModule,
    AxCommonModule,
    AxDashboardModule,
    AxFormModule,
    AxReportModule,
    AxChatModule,
    TranslateModule,
    BidiModule,
  ],
})
export class SharedModule {}
