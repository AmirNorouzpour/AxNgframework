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
import { Line } from "./models/line";
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
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      alert("no no!");
    }

    this.point = document.getElementById("elm");
    this.indicatorService.getMenuData().subscribe((result) => {
      //  this.snackBarService.showSuccessMessage(result.message);
      this.indicatorGroups = result.data;
    });
  }
  ngAfterViewInit() {}

  boxs: Array<Box> = [];
  lines: Array<LeaderLineType> = [];
  lines0: Array<Line> = [];
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
    var exist = this.boxs.filter((x) => x.id == indicator.title);
    var id =
      exist.length > 0 ? indicator.title + (exist.length + 1) : indicator.title;
    this.boxs.push(new Box(indicator.title, id, indicator));
    // this.modalService.success({
    //   nzTitle: "This is a success message",
    //   nzContent: "some messages...some messages...",
    //   nzDirection: "ltr",
    // });
  }

  mainClick($event) {
    if ($event.target.classList.contains("main")) this.selectedBoxId = "";
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
  }

  parameterClick(data) {
    var type = data.event.target.getAttribute("data-type");
    if (data.event.target.classList.contains("g-dot") && !this.connectMode) {
      this.connectMode = true;
      this.point.nativeElement.style.left = data.event.clientX + 10 + "px";
      this.point.nativeElement.style.top = data.event.clientY + 10 + "px";
      this.lastType = type;
      let color = window.getComputedStyle(data.event.target).backgroundColor;
      this.line = this.getLine(data.event.target, color);
      var b = this.boxs.find((b) => b.id == data.obj.id);
      var p = b.indicator.parameters.find(
        (p) => p.title == data.parameter.title && p.isInput
      );
      var l0 = new Line(b.id + "_" + p.title, p);
      this.lines0.push(l0);
      p.inouts.push(l0);
    }

    if (data.event.target.classList.contains("dot")) {
      this.line.setOptions({
        end: data.event.target,
        endPlug: "behind",
        color: window.getComputedStyle(data.event.target).backgroundColor,
        dash: false,
      });
      this.lines.push(this.line);
      var b = this.boxs.find((b) => b.id == data.obj.id);
      var p = b.indicator.parameters.find(
        (p) => p.title == data.parameter.title && !p.isInput
      );
      this.connectMode = false;
      var l0 = this.lines0.find((x) => !x.isComplete);
      if (!l0) return;
      l0.isComplete = true;
      l0.end = p;
      p.inouts.push(l0);
    }
  }

  rightClick(e) {
    if (this.line && this.connectMode) {
      var l0 = this.lines0.find((x) => !x.isComplete);
      if (l0) this.lines0.pop();
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

  save() {
    var boxs = document.getElementsByClassName("box");
    debugger;
  }
}
