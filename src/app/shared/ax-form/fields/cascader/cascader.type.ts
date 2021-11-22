import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: "formly-field-nz-cascader",
  template: `
    <nz-cascader
      [formControl]="formControl"
      [formlyAttributes]="field"
      (ngModelChange)="onChanges($event)"
      [nzShowSearch]="to.showSearch"
      [nzAllowClear]="to.allowClear"
      [nzOptions]="to.options"
    ></nz-cascader>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCascader extends FieldType {
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }
  onChanges(e) {
    console.log(e);
  }

  ngOnInit(): void {}

  defaultOptions = {
    templateOptions: {
      options: [],
      allowClear: true,
      showSearch: true,
    },
  };
}
