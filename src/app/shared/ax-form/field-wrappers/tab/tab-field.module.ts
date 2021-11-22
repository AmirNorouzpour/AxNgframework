import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormlyWrapperTabField } from "./tab-field.wrapper";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCardModule } from "ng-zorro-antd/card";

@NgModule({
  declarations: [FormlyWrapperTabField],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzTabsModule,
    NzCardModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: "tab",
          component: FormlyWrapperTabField,
        },
      ],
    }),
  ],
})
export class FormlyNzTabFieldModule {}
