import { AppSetting } from "./../../../../panel/services/app-setting.service";
import { AxReportFilterComponent } from "./../../filters/ax-report-filter/ax-report-filter.component";
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  TemplateRef,
  OnDestroy,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Observable, forkJoin, Subscription } from "rxjs";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { AxReportToolbarItem } from "shared/ax-common/model/ax-toolbar-item";
import { tap } from "rxjs/operators";
import { AxReportFilter } from "shared/ax-report/models/ax-report-filter.model";
import { reportDefaultToolbarItems } from "./../../models/ax-report-toolbar-items";

@Component({
  selector: "ax-table",
  templateUrl: "./ax-table.component.html",
  styleUrls: ["./ax-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AxTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataSet: Observable<any>;
  @Input() columns: any[];
  @Input() dataService: ResourceSerivce<any>;
  @Input() title: string;
  @Input() queryParams: Object;
  @Input() noResultContent: string | TemplateRef<void>;
  @Input() customToolbarItems: AxReportToolbarItem[] = [];
  @Input() toolbarItems: AxReportToolbarItem[];
  @Input() hideToolbar: boolean = false;

  @Output() onNew: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onCustomCommand: EventEmitter<any> = new EventEmitter();

  @ViewChild("reportFilterCmp") reportFilterComponent: AxReportFilterComponent;

  setOfCheckedId = new Set<number>();
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  totalCount: number = 0;
  sortField: string;
  sortOrder: number;
  loading: boolean = false;
  subscriptions: Subscription[] = [];
  filters: Object = {};
  tempToolbarItems: AxReportToolbarItem[];

  constructor(private cdr: ChangeDetectorRef, private appSetting: AppSetting) {}

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  refreshToolbarItems(): void {
    if (!this.toolbarItems || this.toolbarItems.length == 0)
      this.toolbarItems = reportDefaultToolbarItems;

    this.tempToolbarItems = this.toolbarItems
      .concat(this.customToolbarItems)
      .map((itm) => ({
        ...itm,
        ...(this.toolbarItems &&
          this.toolbarItems.find((item) => item.key === itm.key && item)),
      }))
      .map((item) => {
        if (
          item.permissionKey &&
          !this.appSetting.userPermissions.includes(item.permissionKey)
        ) {
          return { ...item, disabled: true, tooltip: "عدم دسترسی" };
        }
        return item;
      })
      .filter(Boolean);

    if (this.setOfCheckedId.size === 0) {
      this.tempToolbarItems = this.tempToolbarItems.filter(
        (item) => item.showAlways
      );
    } else if (this.setOfCheckedId.size === 1) {
      this.tempToolbarItems = this.tempToolbarItems.filter(
        (item) => item.showAlways || item.showSingleSelect
      );
    } else if (this.setOfCheckedId.size > 1) {
      this.tempToolbarItems = this.tempToolbarItems.filter(
        (item) => item.showAlways || item.showMultiSelect
      );
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
    this.refreshToolbarItems();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
    this.refreshToolbarItems();
  }

  handleFilterChange(filters: AxReportFilter[], col): void {
    this.filters[col.key] = filters;
  }

  handleFilterSearch(filters: AxReportFilter[], col): void {
    this.loadFromServer();
  }

  handleFilterReset(colSetting) {
    const { index } = colSetting;
    this.filters[index] = null;
    this.loadFromServer();
  }

  getFilterParams() {
    const filterArray = Object.values(this.filters);
    const flattendFilterArray: AxReportFilter[] = [].concat(...filterArray);
    return flattendFilterArray.filter(Boolean).reduce((acc, filter, i) => {
      acc[`Filters[${i}].Property`] = filter.property;
      acc[`Filters[${i}].Value1`] = filter.value1;
      acc[`Filters[${i}].Operation`] = filter.operation;
      return acc;
    }, {});
  }

  loadFromServer(): void {
    const { pageSize, pageIndex, sortField, sortOrder } = this;
    const filterParams = this.getFilterParams();

    this.loading = true;
    if (this.dataService instanceof ResourceSerivce && this.dataService) {
      this.subscriptions.push(
        this.dataService
          .getList(null, {
            pageSize: pageSize,
            pageIndex: pageIndex - 1,
            sort: sortField,
            sortType: sortOrder,
            ...filterParams,
            ...this.queryParams,
          })
          .subscribe(
            (result) => {
              this.totalCount = result.metaData.totalCount;
              this.listOfCurrentPageData = result.data;
              this.cdr.detectChanges();
            },
            (err) => console.log(err),
            () => (this.loading = false)
          )
      );
    }
  }

  handleQueryParams(params) {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);

    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder =
      currentSort &&
      (currentSort.value === "ascend"
        ? 0
        : currentSort.value === "descend"
        ? 1
        : null);

    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;

    this.loadFromServer();
  }

  onToolbarItemClick(itemKey): void {
    switch (itemKey) {
      case "refresh":
        this.loadFromServer();
        break;
      case "new":
        this.newEventHandler();
        break;
      case "edit":
        this.editEventHandler();
        break;
      case "delete":
        this.deleteEventHandler();
        break;
      default:
        this.customEventHandler(itemKey);
    }
  }

  newEventHandler() {
    this.onNew.emit();
  }

  onItemDblClick(id, e) {
    this.onEdit.emit(id);
  }

  editEventHandler() {
    const checkedId = this.setOfCheckedId.values().next().value;
    this.onEdit.emit(checkedId);
  }

  deleteEventHandler() {
    let listOfDeleteObservable = [];

    for (let checkedId of this.setOfCheckedId) {
      listOfDeleteObservable.push(
        this.dataService
          .delete(checkedId)
          .pipe(tap(() => this.updateCheckedSet(checkedId, false)))
      );
    }

    forkJoin(...listOfDeleteObservable).subscribe(() => {
      this.loadFromServer();
      this.refreshCheckedStatus();
      this.refreshToolbarItems();
    });
  }

  customEventHandler(itemKey) {
    const setOfCheckedId = this.setOfCheckedId;
    this.onCustomCommand.emit({ key: itemKey, setOfCheckedId });
  }

  handleFilterVisibleChange(isVisible) {}

  ngOnInit(): void {
    this.refreshToolbarItems();
    this.subscriptions.push(
      this.dataService.onResourceSaved.subscribe(() => this.loadFromServer())
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageIndex = 1;
    this.loadFromServer();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
