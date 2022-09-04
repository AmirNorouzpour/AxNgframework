import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ohlc-legend",
  templateUrl: "./ohlc-legend.component.html",
  styleUrls: ["./ohlc-legend.component.scss"],
})
export class OhlcLegendComponent implements OnInit {
  @Input() ohlc;
  constructor() {}
  color;

  ngOnInit(): void {}
}
