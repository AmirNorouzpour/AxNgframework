import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyFieldFile } from "./file.type";
import { FormlyNzFormFieldModule } from "../../field-wrappers/form-field/form-field.module";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [FormlyFieldFile],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyNzFormFieldModule,
    NzUploadModule,
    NzIconModule,
    NzButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: "file",
          component: FormlyFieldFile,
          wrappers: ["form-field"],
        },
      ],
    }),
  ],
})
export class FormlyNzFileModule {}
