import { Component, OnInit } from "@angular/core";

@Component({
  selector: "editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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
}
