import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { MatDatepickerInput } from "@angular/material/datepicker";
import { FieldType } from "@ngx-formly/core";

@Component({
  selector: "formly-field-datepicker",
  template: `
    <nz-input-group [nzAddOnAfter]="addOnAfterTemplate">
      <input
        (click)="picker.open()"
        nz-input
        [matDatepicker]="picker"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
    </nz-input-group>
    <ng-template #addOnAfterTemplate>
      <i
        nz-icon
        nzType="calendar"
        (click)="picker.open()"
        nzTheme="outline"
      ></i>
    </ng-template>
    <mat-datepicker
      #picker
      [color]="to.color"
      [dateClass]="to.datepickerOptions.dateClass"
      [disabled]="to.datepickerOptions.disabled"
      [opened]="to.datepickerOptions.opened"
      [panelClass]="to.datepickerOptions.panelClass"
      [startAt]="to.datepickerOptions.startAt"
      [startView]="to.datepickerOptions.startView"
      [touchUi]="to.datepickerOptions.touchUi"
      (monthSelected)="
        to.datepickerOptions.monthSelected(field, $event, picker)
      "
      (yearSelected)="to.datepickerOptions.yearSelected(field, $event, picker)"
    >
    </mat-datepicker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDateTime extends FieldType {
  @ViewChild(MatDatepickerInput, { static: true })
  datepickerInput!: MatDatepickerInput<any>;
  @ViewChild("datepickerToggle", { static: true })
  datepickerToggle!: TemplateRef<any>;

  defaultOptions = {
    templateOptions: {
      datepickerOptions: {
        startView: "month",
        datepickerTogglePosition: "suffix",
        dateInput: () => {},
        dateChange: () => {},
        monthSelected: () => {},
        yearSelected: () => {},
      },
    },
  };
}
