import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import "leader-line";
import { NzModalService } from "ng-zorro-antd/modal";
import { StrategyListComponent } from "./components/strategy-list/strategy-list.component";
import { Box } from "./models/box";
import { IndicatorGroup } from "./models/indicator";
import { Line } from "./models/line";
import { IndicatorService } from "./services/indicator.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { EditorService } from "./services/editor.service";
import { ActivatedRoute, Router } from "@angular/router";

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
    public editorService: EditorService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public ref: ChangeDetectorRef
  ) {
    this.activatedRoute.params.subscribe((params) => {
      // this.unique = params.strategyId;
      // this.loadBoxs(this.unique);
      // ref.detectChanges();
    });
  }

  @HostListener("document:keydown.delete", ["$event"])
  onDeleteComponent(event: KeyboardEvent) {
    if (!this.selectedBoxId) return;
    var b = this.boxs.find((b) => b.id == this.selectedBoxId);
    const index = this.boxs.indexOf(b);
    if (index !== -1) {
      this.lines.forEach((x) => {
        var start, end;
        if (x.start)
          start =
            x.start.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
              "data-id"
            );
        end =
          x.end.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          );
        if (b.id == start || b.id == end) x.remove();
      });
      if (this.connectMode) {
        this.line.remove();
        this.connectMode = false;
      }
      this.boxs.splice(index, 1);
    } else this.boxs.pop();
  }

  @ViewChild("endingElement", { read: ElementRef })
  private point;
  @ViewChild("saveModalContent", { read: TemplateRef })
  saveModalContentTemplate: TemplateRef<any>;

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

  ngAfterViewInit() {
    this.unique = this.activatedRoute.snapshot.params["strategyId"];
    var version = this.activatedRoute.snapshot.params["version"];
    this.loadBoxs(this.unique, version);
  }

  loadBoxs(unique, version) {
    if (unique) {
      this.lines.forEach((x) => x.remove());
      this.lines0 = [];
      this.boxs = [];
      this.editorService
        .getByunique(this.unique, version)
        .subscribe((result) => {
          this.strategy = result.data.data;
          this.strategyName = result.data.name;
          let data = JSON.parse(this.strategy);
          for (let i = 0; i < data.boxs.length; i++) {
            let b = data.boxs[i];
            var exist = this.boxs.filter((x) => x.id == b.indicator.title);

            this.boxs.push(new Box(b.title, b.id, b.indicator, b.transform));
          }
          setTimeout(() => {
            for (let i = 0; i < data.boxs.length; i++) {
              let b = data.boxs[i];
              for (let j = 0; j < b.indicator.parameters.length; j++) {
                var p = b.indicator.parameters[j];
                if (p.inouts) {
                  for (let k = 0; k < p.inouts.length; k++) {
                    var l = p.inouts[k];
                    var lsid = b.id + "_" + p.title;
                    if (l.start == lsid) {
                      let start = document.getElementById(lsid);
                      if (!start) alert("start is null!!");
                      let end = document.getElementById(l.end);
                      if (!start || !end) continue;
                      let color = window.getComputedStyle(end).backgroundColor;
                      let line = this.getLine(start, color);
                      line.setOptions({
                        end: end,
                        endPlug: "behind",
                        color: color,
                        dash: false,
                        show: false,
                      });
                      line.show("draw");
                      this.lines.push(line);
                    }
                  }
                }
              }
            }
          }, 50);
        });
    }
  }

  strategyName: string;
  strategy: string;
  unique: string;
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
    this.boxs.push(
      new Box(indicator.title, id, indicator, "translate3d(220px, 88px, 0px);")
    );
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
        (p) => p.title == data.parameter.title && !p.isInput
      );
      var l0 = new Line(b.id + "_" + p.title, b.id + "_" + p.title);
      this.lines0.push(l0);
      if (!p.inouts) p.inouts = [];
      p.inouts.push(l0);
    }

    if (data.event.target.classList.contains("dot")) {
      this.line.setOptions({
        end: data.event.target,
        endPlug: "behind",
        color: window.getComputedStyle(data.event.target).backgroundColor,
        dash: false,
      });
      this.line.show("draw");
      this.lines.push(this.line);
      var b = this.boxs.find((b) => b.id == data.obj.id);
      var p = b.indicator.parameters.find(
        (p) => p.title == data.parameter.title && p.isInput
      );
      this.connectMode = false;
      var l0 = this.lines0.find((x) => !x.isComplete);
      if (!l0) return;
      l0.isComplete = true;
      l0.end = b.id + "_" + p.title;
      if (!p.inouts) p.inouts = [];
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

  showStrategiesList(): void {
    this.modalService.create({
      nzTitle: "Your Strategies",
      nzContent: StrategyListComponent,
      nzDirection: "ltr",
      nzFooter: null,
    });
  }

  save() {
    let boxs = document.getElementsByClassName("box");
    let diagram = { name: this.strategyName, boxs: [] };
    for (let i = 0; i < boxs.length; i++) {
      let boxNode = boxs[i].getAttribute("data-id");
      let box = this.boxs.find((b) => b.id == boxNode);
      var locs = boxs[i]
        .getAttribute("style")
        .split("transform")[1]
        .split("(")[1]
        .split(")")[0]
        .split(",");
      box.transform = `translate3d(${locs[0]}, ${locs[1]},0px)`;
      diagram.boxs.push(box);
    }

    this.modalService.create({
      nzTitle: "Save strategy",
      nzContent: this.saveModalContentTemplate,
      nzDirection: "ltr",
      nzOnOk: () => this.saveAction(diagram),
    });
  }
  saveAction(diagram) {
    var mid = this.messageService.loading(
      "Saving strategy in progress..."
    ).messageId;

    diagram.name = this.strategyName;
    let json = JSON.stringify(diagram);
    let data = { Name: this.strategyName, Data: json, unique: this.unique };
    return this.editorService.save(data).subscribe((result) => {
      this.messageService.remove(mid);
      if (result.isSuccess) {
        this.messageService.success("Strategy saved successfully", {
          nzDuration: 1000,
        });
        this.router.navigate(["editor", result.data]);
      } else
        this.messageService.error(result.message, {
          nzDuration: 2000,
        });
    });
  }
}
