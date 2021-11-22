import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-wrapper-nz-tab-panel-field",
  template: `
    <nz-card-tab>
      <nz-tabset>
        <nz-tab
          *ngFor="let f of field.fieldGroup"
          [nzTitle]="f.templateOptions.label"
        >
          <formly-field [field]="f"></formly-field>
        </nz-tab>
      </nz-tabset>
    </nz-card-tab>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperTabField extends FieldWrapper {
  get errorState() {
    return this.showError ? "error" : "";
  }
}
