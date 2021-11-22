import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { FieldType } from "@ngx-formly/core";
import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: "formly-field-nz-select",
  template: `
    <nz-select
      [class.ng-dirty]="showError"
      [nzPlaceHolder]="to.placeholder"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzMode]="to.multiple ? 'multiple' : 'default'"
      [nzAllowClear]="to.allowClear"
      [nzShowSearch]="to.showSearch"
      [nzServerSearch]="to.lazyLoad"
      (nzOnSearch)="onSearch($event)"
      [nzLoading]="isLoading"
      (nzOpenChange)="onOpenChange($event)"
      [nzCustomTemplate]="to.selectedTemplate ? to.selectedTemplate : null"
    >
      <ng-container *ngIf="!to.lazyLoad">
        <ng-container
          *ngFor="let item of to.options | formlySelectOptions: field | async"
        >
          <nz-option
            [nzCustomContent]="
              to.optionTemplate !== null && to.optionTemplate !== undefined
            "
            [nzValue]="item.value"
            [nzDisabled]="item.disabled"
            [nzLabel]="item.label"
          >
            <ng-container *ngIf="to.optionTemplate">
              <ng-container
                *ngTemplateOutlet="
                  to.optionTemplate;
                  context: { $implicit: item }
                "
              ></ng-container>
            </ng-container>
          </nz-option>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="to.lazyLoad">
        <ng-container *ngFor="let item of optionList">
          <nz-option
            [nzCustomContent]="
              to.optionTemplate !== null && to.optionTemplate !== undefined
            "
            *ngIf="!isLoading"
            [nzValue]="item[to.valueProp]"
            [nzLabel]="item[to.labelProp]"
          >
            <ng-container *ngIf="to.optionTemplate">
              <ng-container
                *ngTemplateOutlet="
                  to.optionTemplate;
                  context: { $implicit: item }
                "
              >
              </ng-container>
            </ng-container>
          </nz-option>
        </ng-container>
        <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
          <i nz-icon nzType="loading" class="loading-icon"></i> در حال دریافت
          اطلاعات...
        </nz-option>
      </ng-container>
    </nz-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelect extends FieldType {
  isLoading = false;
  searchChange$ = new BehaviorSubject("");
  optionList: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  onSearch(value: string): void {
    if (this.to.lazyLoad) {
      this.isLoading = true;
    }
    this.searchChange$.next(value);
  }

  onOpenChange(open: boolean): void {
    if (open) {
      this.to.loadData().subscribe((data) => {
        this.optionList = data;
      });
    }
  }

  ngOnInit(): void {
    if (this.to.lazyLoad) {
      const optionList$: Observable<
        string[]
      > = this.searchChange$
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(switchMap(this.to.loadData));
      optionList$.subscribe((data) => {
        this.optionList = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }

  defaultOptions = {
    templateOptions: {
      options: [],
      allowClear: true,
      showSearch: true,
      valueProp: "value",
      labelProp: "label",
    },
  };
}
