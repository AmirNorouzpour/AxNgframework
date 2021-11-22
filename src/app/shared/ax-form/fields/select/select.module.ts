import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormlySelectModule } from "@ngx-formly/core/select";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";

import { FormlyFieldSelect } from "./select.type";

@NgModule({
  declarations: [FormlyFieldSelect],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,

    FormlyNzFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: "select",
          component: FormlyFieldSelect,
          wrappers: ["form-field"],
        },
        { name: "enum", extends: "select" },
      ],
    }),
  ],
})
export class FormlyNzSelectModule {}
