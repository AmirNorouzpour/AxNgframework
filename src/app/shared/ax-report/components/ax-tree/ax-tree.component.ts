import { BehaviorSubject, forkJoin } from "rxjs";
import { AxTreeNode } from "./../../models/ax-tree-node.model";
import { reportDefaultToolbarItems } from "shared/ax-report/models/ax-report-toolbar-items";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AxReportToolbarItem } from "shared/ax-common/model/ax-toolbar-item";
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
} from "ng-zorro-antd/tree";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "ax-tree",
  templateUrl: "./ax-tree.component.html",
  styleUrls: ["./ax-tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-tree",
  },
})
export class AxTreeComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() checkable: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() data: AxTreeNode[];
  @Input() lazyLoad: boolean = false;
  @Input() dataService: ResourceSerivce<any>;
  @Input() hideToolbar: boolean = false;

  @Output() onExpand: EventEmitter<any> = new EventEmitter();
  @Output() onNew: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onCustomCommand: EventEmitter<any> = new EventEmitter();
  @Output() onCheckBoxChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(NzTreeComponent) nativeTreeComponent: NzTreeComponent;

  toolbarItems: AxReportToolbarItem[] = reportDefaultToolbarItems;
  $selectedKeys: BehaviorSubject<NzTreeNode[]> = new BehaviorSubject([]);
  $expandedKeys: BehaviorSubject<string[]> = new BehaviorSubject([]);
  _selectedKeys: NzTreeNode[] = [];
  _expandedKeys: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  loadFromServer() {
    this.dataService
      .getList(null)
      .pipe(
        map((result) => result.data),
        map<any, AxTreeNode[]>(this.mapChildren.bind(this))
      )
      .subscribe((treeData) => {
        this.data = treeData;
        this.cdr.detectChanges();
      });
  }

  mapChildren(result) {
    return (
      result &&
      result.map((item) => ({
        key: item.key,
        title: item.title,
        isLeaf: item.isLeaf,
        checked: item.checked,
        children: !(
          item.hasChildren === false ||
          !item.children ||
          (item.children && item.children.length === 0)
        )
          ? this.mapChildren(item.children)
          : [],
      }))
    );
  }

  refreshToolbarItems(): void {
    if (this._selectedKeys.length === 0) {
      this.toolbarItems = reportDefaultToolbarItems.filter(
        (item) => item.showAlways
      );
    } else if (this._selectedKeys.length === 1) {
      this.toolbarItems = reportDefaultToolbarItems.filter(
        (item) => item.showAlways || item.showSingleSelect
      );
    } else if (this._selectedKeys.length > 1) {
      this.toolbarItems = reportDefaultToolbarItems.filter(
        (item) => item.showAlways || item.showMultiSelect
      );
    }
  }

  handleNodeClick(event: NzFormatEmitEvent) {
    this.$selectedKeys.next(event.selectedKeys);
  }

  handleNodeDblClick(e) {}

  handleCheckBoxChange(e) {
    this.onCheckBoxChange.emit(e);
  }

  handleExpandChange(event: NzFormatEmitEvent) {
    const node = event.node;
    if (node?.getChildren().length === 0 && node?.isExpanded) {
      this.$expandedKeys.next(event.keys);
      this.onExpand.emit(node);
    }
  }

  onToolbarItemClick(itemKey) {
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

  editEventHandler() {
    const selectedId = this._selectedKeys[0]?.key;
    this.onEdit.emit(selectedId);
  }

  deleteEventHandler() {
    let listOfDeleteObservable = [];

    for (let selectedKey of this._selectedKeys) {
      listOfDeleteObservable.push(this.dataService.delete(selectedKey.key));
    }

    forkJoin(...listOfDeleteObservable).subscribe(() => {
      this.loadFromServer();
      this.refreshToolbarItems();
    });
  }

  customEventHandler(key) {
    const selectedKeys = this._selectedKeys;
    this.onCustomCommand.emit({ key, selectedKeys });
  }

  ngOnInit(): void {
    this.$selectedKeys.subscribe((selectedKeys) => {
      this._selectedKeys = selectedKeys;
      this.refreshToolbarItems();
    });

    this.$expandedKeys.subscribe((expandedKeys) => {
      this._expandedKeys = expandedKeys;
    });

    this.loadFromServer();
  }

  ngAfterViewInit(): void {}

  ngOnChanges() {}
}
