import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ax-card",
  templateUrl: "./ax-card.component.html",
  styleUrls: ["./ax-card.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-card",
    "ax-card": "ax-card",
  },
})
export class AxCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
