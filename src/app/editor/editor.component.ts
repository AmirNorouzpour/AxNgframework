import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "leader-line";
import { NzModalService } from "ng-zorro-antd/modal";
import { Box } from "./models/box";
import { IndicatorGroup } from "./models/indicator";
import { IndicatorService } from "./services/indicator.service";
declare type LeaderLineType = any;
declare let LeaderLine: any;

@Component({
  selector: "editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  constructor(
    public indicatorService: IndicatorService,
    private modalService: NzModalService
  ) {}

  @ViewChild("endingElement", { read: ElementRef })
  point: ElementRef;
  line: LeaderLineType;
  connectMode = false;
  @ViewChild("block") block: ElementRef;
  ngOnInit(): void {
    this.indicatorService.getMenuData().subscribe((result) => {
      //  this.snackBarService.showSuccessMessage(result.message);
      this.indicatorGroups = result.data;
    });
  }
  ngAfterViewInit() {}

  boxs: Array<Box> = [];
  lines: Array<LeaderLineType> = [];
  indicatorGroups: Array<IndicatorGroup> = [];

  openHandler(value: string): void {
    for (const i in this.indicatorGroups) {
      debugger;
      if (this.indicatorGroups[i].title !== value) {
        this.indicatorGroups[i].isOpen = false;
      }
    }
  }

  boxMoved($event) {
    for (let line of this.lines) {
      line.position();
    }
  }

  itemClick(indicator) {
    debugger;
    this.boxs.push(new Box(indicator.title, indicator));
    // this.modalService.success({
    //   nzTitle: "This is a success message",
    //   nzContent: "some messages...some messages...",
    //   nzDirection: "ltr",
    // });
  }

  mainClick($event) {
    if ($event.target.classList.contains("g-dot")) {
      debugger;
      this.connectMode = true;
      let color = window.getComputedStyle($event.target).backgroundColor;
      this.line = new LeaderLine($event.target, this.point.nativeElement, {
        path: "grid",
        size: 2,
        startSocket: "right",
        endSocket: "left",
        color: color,
        endPlug: "behind",
        dash: true,
      });
    }

    if ($event.target.classList.contains("dot")) {
      debugger;
      this.line.setOptions({
        end: $event.target,
        endPlug: "behind",
        dash: false,
      });

      this.lines.push(this.line);
      this.connectMode = false;
    }
  }
  mouseMove($event) {
    if (this.connectMode) {
      this.updateLine($event);
    }
  }
  updateLine(event) {
    this.point.nativeElement.style.left = `${event.clientX - 240}px`;
    this.point.nativeElement.style.top = `${event.clientY - 50}px`;
    this.line.position();
  }
}
