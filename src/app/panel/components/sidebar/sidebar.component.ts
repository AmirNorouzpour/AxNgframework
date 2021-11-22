import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from "@angular/core";
import { AxMenuItem } from "../../../shared";
import { Subject } from "rxjs";
import { Direction, Directionality } from "@angular/cdk/bidi";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ax-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-sidebar",
    "[class.ax-sidebar_collapsed]": "isCollapsed",
    "[class.ax-sidebar_rtl]": "dir==='rtl'",
  },
})
export class SidebarComponent implements OnInit, OnChanges {
  toggleBtnIcon: string = "chevron_right";
  dir: Direction;

  @Input() systemMenu: AxMenuItem[];
  @Input() isCollapsed: boolean = false;
  @Input() title: string;
  @Input() icon: string;

  @Output() onSidebarToggle: EventEmitter<any> = new EventEmitter();
  private destroy$ = new Subject();

  constructor(directionality: Directionality) {
    this.dir = directionality.value;
    directionality.change
      .pipe(takeUntil(this.destroy$))
      .subscribe((direction) => {
        this.dir = direction;
        this.setToggleBtnIcon();
      });
  }

  ngOnInit(): void {
    this.setToggleBtnIcon();
  }

  ngOnChanges() {
    this.setToggleBtnIcon();
  }

  setToggleBtnIcon() {
    this.toggleBtnIcon = this.isCollapsed
      ? "menu"
      : this.dir === "rtl"
      ? "chevron_right"
      : "chevron_left";
  }

  toggleCollapsed() {
    this.onSidebarToggle.emit(this.isCollapsed);
  }
}
