import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzGridModule } from "ng-zorro-antd/grid";
import { FormlyWrapperRowField } from "./row-field.wrapper";

@NgModule({
  declarations: [FormlyWrapperRowField],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzTabsModule,
    NzGridModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: "row",
          component: FormlyWrapperRowField,
        },
      ],
    }),
  ],
})
export class FormlyNzRowFieldModule {}
