import { AxSystem } from "./../../../shared";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ax-system-menu",
  templateUrl: "./system-menu.component.html",
  styleUrls: ["./system-menu.component.scss"],
})
export class SystemMenuComponent implements OnInit {
  @Input() systems: AxSystem[];

  constructor() {}

  ngOnInit(): void {}
}
