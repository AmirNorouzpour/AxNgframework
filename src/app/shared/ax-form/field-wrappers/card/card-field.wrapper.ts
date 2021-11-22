import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: "formly-wrapper-nz-card-panel-field",
  template: `
    <nz-card class="card-field-wrapper" nzType="inner" [nzTitle]="to.title">
      <ng-container #fieldComponent></ng-container>
    </nz-card>
  `,
  styleUrls: ["./card-field.wrapper.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperCardField extends FieldWrapper {}
