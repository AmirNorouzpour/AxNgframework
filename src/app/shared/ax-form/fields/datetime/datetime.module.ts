import { NzButtonModule } from "ng-zorro-antd/button";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyFieldDateTime } from "./datetime.type";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { SharedMaterialModule } from "shared/material/shared-material.module";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";

@NgModule({
  declarations: [FormlyFieldDateTime],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    FormlyNzFormFieldModule,
    NzInputModule,
    SharedMaterialModule,
    NzButtonModule,
    NzIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: "datetime",
          component: FormlyFieldDateTime,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
})
export class FormlyNzDateTimeModule {}
