import { AppSetting } from "./../../services/app-setting.service";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewEncapsulation,
} from "@angular/core";
import { AxSystem } from "./../../../shared/models";
import { Direction, Directionality } from "@angular/cdk/bidi";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ax-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-header",
    "[class.ax-header_rtl]": "dir === 'rtl'",
  },
})
export class HeaderComponent implements OnInit, OnChanges {
  systemList: AxSystem[];
  userDisplayName: string;
  dir: Direction;
  @Input() organizationName: string;
  private destroy$ = new Subject();

  constructor(private appSetting: AppSetting, directionality: Directionality) {
    this.dir = directionality.value;
    directionality.change
      .pipe(takeUntil(this.destroy$))
      .subscribe((direction) => {
        this.dir = direction;
      });
  }

  ngOnInit(): void {
    const { initialData } = this.appSetting;

    this.systemList = initialData.systemsList;
    this.userDisplayName = initialData.userDisplayName;
  }

  drawerVisible = false;
  ngOnChanges() {}

  chatDrawer() {
    this.drawerVisible = true;
  }

  close(): void {
    this.drawerVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
