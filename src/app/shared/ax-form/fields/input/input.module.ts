import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { FormlyFieldInput } from "./input.type";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";

@NgModule({
  declarations: [FormlyFieldInput],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    FormlyNzFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: "input",
          component: FormlyFieldInput,
          wrappers: ["form-field"],
        },
        { name: "string", extends: "input" },
        {
          name: "number",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number",
            },
          },
        },
        {
          name: "integer",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number",
            },
          },
        },
      ],
    }),
  ],
})
export class FormlyNzInputModule {}
