import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  AfterContentInit,
  OnChanges,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AxMenuItem } from "shared/models";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Direction, Directionality } from "@angular/cdk/bidi";

@Component({
  selector: "ax-side-menu",
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          height: "*",
        })
      ),
      state(
        "closed",
        style({
          height: "0px",
        })
      ),
      transition("open => closed", [animate("0.2s")]),
      transition("closed => open", [animate("0.2s")]),
    ]),
  ],
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SideMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  menuItemsState = {};
  dir: Direction;

  @Input() menuItems: AxMenuItem[];
  @Input() isCollapsed: boolean;
  @Output() onMenuItemClick: EventEmitter<AxMenuItem> = new EventEmitter();
  @ViewChildren("ax-side-menu__item") linkElements: QueryList<
    ElementRef<HTMLElement>
  >;
  private destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    directionality: Directionality
  ) {
    this.dir = directionality.value;
    directionality.change
      .pipe(takeUntil(this.destroy$))
      .subscribe((direction) => {
        this.dir = direction;
      });
  }

  ngAfterViewInit(): void {
    var me = this;
    setTimeout(() => {
      me.elementRef.nativeElement
        .querySelectorAll(".ax-side-menu__item")
        .forEach((el) => {
          if (el.querySelector(".active-link")) {
            const activeMenuKey = el.getAttribute("data-key");
            me.menuItemsState[activeMenuKey] = true;
          }
        });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleMenuItemClick(e, menuItem: AxMenuItem) {
    e.stopPropagation();
    if (!this.isCollapsed && this.menuItemHasChildren(menuItem)) {
      if (this.menuItemsState[menuItem.key]) {
        this.menuItemsState[menuItem.key] = !this.menuItemsState[menuItem.key];
      } else {
        this.menuItemsState[menuItem.key] = true;
      }
    }

    if (!this.menuItemHasChildren(menuItem)) {
      this.onMenuItemClick.emit(menuItem);
    }
  }

  menuItemHasChildren(menuItem) {
    return menuItem && menuItem.children && menuItem.children.length > 0;
  }
}
