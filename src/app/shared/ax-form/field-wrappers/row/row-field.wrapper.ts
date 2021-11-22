import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-wrapper-nz-tab-panel-field",
  template: `
    <div nz-row [nzGutter]="16">
      <div
        nz-col
        class="gutter-row"
        [nzSpan]="to.colSpan"
        [nzXs]="to.colXs"
        [nzSm]="to.colSm"
        [nzMd]="to.colMd"
        [nzLg]="to.colLg"
        [nzXl]="to.colXl"
        [nzXXl]="to.colXXl"
        *ngFor="let f of field.fieldGroup"
      >
        <formly-field [field]="f"></formly-field>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperRowField extends FieldWrapper {}
