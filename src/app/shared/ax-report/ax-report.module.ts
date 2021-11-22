import { AxCommonModule } from "./../ax-common/ax-common.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxTableComponent } from "./components/ax-table/ax-table.component";
import { SharedNgZorroModule } from "shared/ng-zorro/shared-ng-zorro.module";
import { FormsModule } from "@angular/forms";
import { AxTreeComponent } from "./components/ax-tree/ax-tree.component";
import { AxTextFilterComponent } from "./filters/ax-text-filter/ax-text-filter.component";
import { AxNumberFilterComponent } from "./filters/ax-number-filter/ax-number-filter.component";
import { AxDateFilterComponent } from "./filters/ax-date-filter/ax-date-filter.component";
import { AxBooleanFilterComponent } from "./filters/ax-boolean-filter/ax-boolean-filter.component";
import { AxEnumFilterComponent } from "./filters/ax-enum-filter/ax-enum-filter.component";
import { AxForeignKeyFilterComponent } from "./filters/ax-foreign-key-filter/ax-foreign-key-filter.component";
import { AxReportFilterComponent } from "./filters/ax-report-filter/ax-report-filter.component";

@NgModule({
  imports: [CommonModule, SharedNgZorroModule, AxCommonModule, FormsModule],
  declarations: [
    AxTableComponent,
    AxTreeComponent,
    AxTextFilterComponent,
    AxNumberFilterComponent,
    AxDateFilterComponent,
    AxBooleanFilterComponent,
    AxEnumFilterComponent,
    AxForeignKeyFilterComponent,
    AxReportFilterComponent,
  ],
  exports: [AxTableComponent, AxTreeComponent],
})
export class AxReportModule {}
