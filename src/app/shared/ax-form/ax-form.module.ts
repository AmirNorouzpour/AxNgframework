import { FormlyNzCascaderModule } from "./fields/cascader/cascader.module";
import { NgModule } from "@angular/core";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AxFormComponent } from "./components/ax-form/ax-form.component";
import { DynamicFormHostDirective } from "./directives/dynamic-form-host.directive";
import { CommonModule } from "@angular/common";
import { FormlyNzInputModule } from "./fields/input/input.module";
import { SharedNgZorroModule } from "shared/ng-zorro/shared-ng-zorro.module";
import { FormlyNzCheckboxModule } from "./fields/checkbox/checkbox.module";
import { FormlyNzSelectModule } from "./fields/select/select.module";
import { FormlyNzRadioModule } from "./fields/radio/radio.module";
import { FormlyNzTextAreaModule } from "./fields/textarea/textarea.module";
import { FormlyNzDateTimeModule } from "./fields/datetime/datetime.module";
import { FormlyNzFormFieldModule } from "./field-wrappers/form-field/form-field.module";
import { FormlyNzTabFieldModule } from "./field-wrappers/tab/tab-field.module";
import { FormlyNzRowFieldModule } from "./field-wrappers/row/row-field.module";
import { FormlyNzCardFieldModule } from "./field-wrappers/card/card-field.module";
import { passwordMatchValidator } from "./validators/password-match-validator";
import { FormlyNzDynamicFieldModule } from "./fields/dynamic/dynamic-field.module";
import { FormlyNzFileModule } from "./fields/file/file.module";

@NgModule({
  declarations: [AxFormComponent, DynamicFormHostDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: "required", message: "This field is required" },
      ],
      validators: [{ name: "fieldMatch", validation: passwordMatchValidator }],
    }),
    FormlyNzFormFieldModule,
    FormlyNzInputModule,
    SharedNgZorroModule,
    FormlyNzCheckboxModule,
    FormlyNzSelectModule,
    FormlyNzRadioModule,
    FormlyNzTextAreaModule,
    FormlyNzDateTimeModule,
    FormlyNzTabFieldModule,
    FormlyNzRowFieldModule,
    FormlyNzCardFieldModule,
    FormlyNzDynamicFieldModule,
    FormlyNzCascaderModule,
    FormlyNzFileModule,
  ],
  exports: [AxFormComponent, DynamicFormHostDirective],
})
export class AxFormModule {}
