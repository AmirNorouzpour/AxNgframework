import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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
import { StrategyConfigComponent } from "./components/strategy-config/strategy-config.component";
import { TranslateService } from "@ngx-translate/core";
import { ChartConfig } from "./models/chartConfig";

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
    private viewContainerRef: ViewContainerRef,
    private translator: TranslateService
  ) {}

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
  @ViewChild("strategiesListContentTemplate", { read: TemplateRef })
  strategiesListContentTemplate: TemplateRef<any>;

  rightVisable = false;
  line: LeaderLineType;
  connectMode = false;
  isDirty = false;
  chartConfig = new ChartConfig("ETHUSDT", "15", "BINANCE");
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
      this.indicatorGroupsAll = result.data;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.unique = this.activatedRoute.snapshot.params["strategyId"];
      var version = this.activatedRoute.snapshot.params["version"];
      this.loadBoxs(this.unique, version);
    });
    let h = window.innerHeight;
    this.panelHeight = h - 300 - 30;
  }
  panelHeight = 500;

  height = 300;
  y = 100;
  oldY = 0;
  grabber = false;

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
      return;
    }
    this.resizer(event.clientY - this.oldY);
    this.oldY = event.clientY;
  }

  @HostListener("document:mouseup", ["$event"])
  onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }

  resizer(offsetY: number) {
    this.height += offsetY * -1;
    this.panelHeight += offsetY;
  }

  @HostListener("document:mousedown", ["$event"])
  onMouseDown(event) {
    if (event.target.id != "grabber") return;
    this.grabber = true;
    this.oldY = event.clientY;
  }
  panelHide = true;
  panelActive = "";

  onChangePanel(id) {
    this.panelHide = id == "";
    this.panelActive = id;
  }

  menuSearch() {
    // debugger;
    // var tmp: Array<IndicatorGroup> = [];
    // var value = this.searchValue;
    // if (!value) {
    //   this.indicatorGroups = this.indicatorGroupsAll;
    //   return;
    // }
    // for (var i = 0; i < this.indicatorGroupsAll.length; i++) {
    //   var item = this.indicatorGroupsAll[i];
    //   for (var j = 0; i < item.indicators.length; j++) {
    //     var child = item.indicators[j];
    //     if (
    //       child.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
    //     ) {
    //       var index = tmp.indexOf(item);
    //       if (index == -1) {
    //         item.indicators = [];
    //         item.indicators.push(child);
    //         tmp.push(item);
    //       } else {
    //         tmp[index].indicators.push(child);
    //       }
    //     }
    //   }
    // }
    // this.indicatorGroups = tmp;
  }

  loadBoxs(unique, version) {
    if (unique) {
      this.lines.forEach((x) => x.remove());
      this.lines = [];
      this.inner_lines = [];
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
                      });
                      this.lines.push(line);
                    }
                  }
                }
              }
            }
            this.isDirty = false;
          }, 50);
        });
    }
  }

  strategyName: string;
  strategy: string;
  unique: string;
  boxs: Array<Box> = [];
  lines: Array<LeaderLineType> = [];
  inner_lines: Array<Line> = [];
  indicatorGroups: Array<IndicatorGroup> = [];
  indicatorGroupsAll: Array<IndicatorGroup> = [];
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
      if (!line.start) {
        this.lines.pop();
        continue;
      }
      line.position();
    }
    this.isDirty = true;
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
    this.isDirty = true;
    // this.modalService.success({
    //   nzTitle: "This is a success message",
    //   nzContent: "some messages...some messages...",
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

  hanldeMsg() {
    this.rightVisable = true;
  }

  rightClose(): void {
    this.rightVisable = false;
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
      this.inner_lines.push(l0);
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
      var l0 = this.inner_lines.find((x) => !x.isComplete);
      if (!l0) return;
      l0.isComplete = true;
      l0.end = b.id + "_" + p.title;
      if (!p.inouts) p.inouts = [];
      p.inouts.push(l0);
      this.isDirty = true;
    }
  }

  rightClick(e) {
    if (this.line && this.connectMode) {
      var l0 = this.inner_lines.find((x) => !x.isComplete);
      if (l0) this.inner_lines.pop();
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
    this.isDirty = true;
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
      nzContent: this.strategiesListContentTemplate,
      nzFooter: null,
    });
  }

  onConfig() {
    this.modalService.create({
      nzTitle: "Config Strategy",
      nzContent: StrategyConfigComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: this.translator.instant("Save"),
          type: "primary",
          onClick: (componentInstance) => {
            var config = componentInstance!.onSave();
            this.chartConfig = config;
          },
        },
      ],
    });
  }

  editItem(item) {
    this.showDirtyConfirm(() => {
      this.modalService.closeAll();
      this.router.navigate(["editor", item.unique, item.version]);
    });
  }

  newItem() {
    this.showDirtyConfirm(() => {
      this.lines.forEach((x) => x.remove());
      this.lines = [];
      this.inner_lines = [];
      this.boxs = [];
      this.router.navigate(["editor"]);
    });
  }

  showDirtyConfirm(action): void {
    if (this.isDirty) {
      this.modalService.confirm({
        nzTitle: "Leave?",
        nzContent:
          '<b style="color: red;">Changes you made may not be saved!</b>',
        nzOkText: "Yes",
        nzOkType: "primary",
        nzOkDanger: true,
        nzOnOk: () => action(),
        nzCancelText: "No",
      });
    } else action();
  }

  save() {
    let boxs = document.getElementsByClassName("box");
    let diagram = { name: this.strategyName, boxs: [] };
    for (let i = 0; i < boxs.length; i++) {
      let boxNode = boxs[i].getAttribute("data-id");
      let box = this.boxs.find((b) => b.id == boxNode);
      var locs = boxs[i]
        .getAttribute("style")
        .split("transform: translate3d")[1]
        .split("(")[1]
        .split(")")[0]
        .split(",");
      var old = boxs[i].getAttribute("style").split("translate3d")[2];

      var x0 = parseInt(locs[0]);
      var y0 = parseInt(locs[1]);
      var x1 = 0,
        y1 = 0;
      if (old) {
        var oldNumbers = old.split("(")[1].split(")")[0].split(",");
        y1 = parseInt(oldNumbers[1]);
        x1 = parseInt(oldNumbers[0]);
      }
      var x = x1 + x0;
      var y = y1 + y0;
      box.transform = `translate3d(${x}px, ${y}px,0px)`;
      diagram.boxs.push(box);
    }

    this.modalService.create({
      nzTitle: "Save strategy",
      nzContent: this.saveModalContentTemplate,
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
        this.isDirty = false;
        this.messageService.success("Strategy saved successfully", {
          nzDuration: 1000,
        });
        this.router.navigate([
          "editor",
          result.data.unique,
          result.data.version,
        ]);
      } else
        this.messageService.error(result.message, {
          nzDuration: 2000,
        });
    });
  }
}
