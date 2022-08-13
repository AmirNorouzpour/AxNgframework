import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-strategy-list",
  templateUrl: "./strategy-list.component.html",
  styleUrls: ["./strategy-list.component.scss"],
})
export class StrategyListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  data = [
    { title: "RSI 14 and SMA", date: new Date() },
    { title: "Test Bot", date: new Date() },
    { title: "SMA 50& SMA100", date: new Date() },
    { title: "MACD Strategy", date: new Date() },
    { title: "Practice", date: new Date() },
  ];
}
