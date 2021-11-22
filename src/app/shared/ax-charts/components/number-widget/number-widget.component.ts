import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { NumberWidget } from "shared/ax-charts/models/number-widget.model";

@Component({
  selector: "ax-number-widget",
  templateUrl: "./number-widget.component.html",
  styleUrls: ["./number-widget.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-number-widget",
  },
})
export class NumberWidgetComponent implements OnInit {
  @Input() model: NumberWidget;
  @Input() chartId: number;

  constructor() {}

  ngOnInit(): void {}
}
