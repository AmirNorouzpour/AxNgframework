import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-nz-input",
  template: `
    <input
      *ngIf="to.type !== 'number'; else numberTmp"
      nz-input
      [formControl]="formControl"
      [type]="to.type || 'text'"
      [formlyAttributes]="field"
    />
    <ng-template #numberTmp>
      <nz-input-number
        style="width: 100%"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [nzMin]="to.min"
        [nzMax]="to.max"
        [nzStep]="to.step"
      ></nz-input-number>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldInput extends FieldType {}
