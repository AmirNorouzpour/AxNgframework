import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";
import { FormlyFieldDynamic } from "./dynamic-field.type";
import { DynamicFieldHostDirective } from "./dynamic-field-host.directive";

@NgModule({
  declarations: [FormlyFieldDynamic, DynamicFieldHostDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyNzFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: "dynamic-field",
          component: FormlyFieldDynamic,
          wrappers: ["card"],
        },
      ],
    }),
  ],
})
export class FormlyNzDynamicFieldModule {}
