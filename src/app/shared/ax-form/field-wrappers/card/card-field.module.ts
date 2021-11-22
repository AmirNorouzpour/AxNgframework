import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCardModule } from "ng-zorro-antd/card";
import { FormlyWrapperCardField } from "./card-field.wrapper";

@NgModule({
  declarations: [FormlyWrapperCardField],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: "card",
          component: FormlyWrapperCardField,
        },
      ],
    }),
  ],
})
export class FormlyNzCardFieldModule {}
