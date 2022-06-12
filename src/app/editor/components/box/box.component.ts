import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
})
export class BoxComponent implements OnInit {
  constructor() {}
  @Input() name = "";
  ngOnInit(): void {}
}
