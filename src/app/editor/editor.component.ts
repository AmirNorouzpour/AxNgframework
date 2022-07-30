import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
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

  @HostListener("document:keydown.delete", ["$event"])
  onDeleteComponent(event: KeyboardEvent) {
    debugger;
    var b = this.boxs.find((b) => b.id == this.selectedBoxId);
    const index = this.boxs.indexOf(b);
    if (index !== -1) {
      if (this.connectMode) {
        this.line.remove();
        this.connectMode = false;
      }
      this.boxs.splice(index, 1);
    } else this.boxs.pop();
  }

  @ViewChild("endingElement", { read: ElementRef })
  private point;
  line: LeaderLineType;
  connectMode = false;
  @ViewChild("block") block: ElementRef;
  ngOnInit(): void {
    this.point = document.getElementById("elm");
    this.indicatorService.getMenuData().subscribe((result) => {
      //  this.snackBarService.showSuccessMessage(result.message);
      this.indicatorGroups = result.data;
    });
  }
  ngAfterViewInit() {}

  boxs: Array<Box> = [];
  lines: Array<LeaderLineType> = [];
  indicatorGroups: Array<IndicatorGroup> = [];
  lastType = "";
  searchValue = "";
  selectedBoxId: "";

  openHandler(value: string): void {
    for (const i in this.indicatorGroups) {
      if (this.indicatorGroups[i].title !== value) {
        this.indicatorGroups[i].isOpen = false;
      } else this.indicatorGroups[i].isOpen = true;
    }
  }

  boxMoved($event) {
    for (let line of this.lines) {
      line.position();
    }
  }
  boxClick(box) {
    this.selectedBoxId = box.id;
  }

  itemClick(indicator) {
    debugger;
    this.boxs.push(
      new Box(indicator.title, "box_" + this.boxs.length, indicator)
    );
    // this.modalService.success({
    //   nzTitle: "This is a success message",
    //   nzContent: "some messages...some messages...",
    //   nzDirection: "ltr",
    // });
  }

  mainClick($event) {
    var type = $event.target.getAttribute("data-type");
    if (
      this.connectMode &&
      this.lastType != type &&
      type != "object" &&
      this.lastType != "object"
    ) {
      var c = this.line.color;
      setTimeout(() => {
        this.line.setOptions({
          color: c,
        });
      }, 200);

      this.line.setOptions({
        color: "red",
      });

      return false;
    }
    if ($event.target.classList.contains("g-dot") && !this.connectMode) {
      this.connectMode = true;
      this.point.nativeElement.style.left = $event.clientX + 10 + "px";
      this.point.nativeElement.style.top = $event.clientY + 10 + "px";
      this.lastType = type;
      let color = window.getComputedStyle($event.target).backgroundColor;
      this.line = this.getLine($event.target, color);
    }

    if ($event.target.classList.contains("dot")) {
      this.line.setOptions({
        end: $event.target,
        endPlug: "behind",
        color: window.getComputedStyle($event.target).backgroundColor,
        dash: false,
      });

      this.lines.push(this.line);
      this.connectMode = false;
    }
  }

  rightClick(e) {
    if (this.line) {
      this.line.remove();
      this.connectMode = false;
    }
    return false;
  }

  mouseMove($event) {
    if (this.connectMode) {
      this.updateLine($event);
    }
  }
  updateLine($event) {
    if (!this.line) return;
    this.point.nativeElement.style.left = $event.pageX + "px";
    this.point.nativeElement.style.top = $event.pageY + "px";
    this.line.position();
  }

  getLine(target, color) {
    return new LeaderLine(target, this.point.nativeElement, {
      path: "grid",
      size: 2,
      startSocket: "right",
      endSocket: "left",
      color: color,
      endPlug: "behind",
      dash: true,
    });
  }
}
