import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "leader-line";
declare type LeaderLineType = any;
declare let LeaderLine: any;

@Component({
  selector: "editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  constructor() {}

  @ViewChild("startingElement", { read: ElementRef })
  startingElement: ElementRef;
  @ViewChild("endingElement", { read: ElementRef })
  endingElement: ElementRef;
  line: LeaderLineType;
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.line = new LeaderLine(
      this.startingElement.nativeElement.children[0].querySelector("#output"),
      this.endingElement.nativeElement.children[0].querySelector("#input"),
      {
        path: "grid",
        size: 2,
        startSocket: "right",
        endSocket: "left",
        color: "rgb(255, 232, 98)",
        endPlug: "behind",
      }
    );
  }

  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false,
    sub4e: false,
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  boxMoved($event) {
    this.line.position();
  }
}
