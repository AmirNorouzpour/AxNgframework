import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-nz-checkbox",
  template: `
    <label
      nz-checkbox
      [nzIndeterminate]="to.indeterminate && formControl.value == null"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCheckbox extends FieldType {
  defaultOptions = {
    templateOptions: {},
  };
}
