import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";
import { NzCascaderModule } from "ng-zorro-antd/cascader";
import { FormlyFieldCascader } from "./cascader.type";

@NgModule({
  declarations: [FormlyFieldCascader],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCascaderModule,
    FormlyNzFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: "cascader",
          component: FormlyFieldCascader,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
})
export class FormlyNzCascaderModule {}
