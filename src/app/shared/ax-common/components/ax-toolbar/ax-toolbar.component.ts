import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AxToolbarItem } from "shared/ax-common/model/ax-toolbar-item";

@Component({
  selector: "ax-toolbar",
  templateUrl: "./ax-toolbar.component.html",
  styleUrls: ["./ax-toolbar.component.scss"],
})
export class AxToolbarComponent implements OnInit {
  @Input() items: AxToolbarItem[];
  @Output() onItemClick: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handleItemClick(e, key) {
    this.onItemClick.emit(key);
  }
}
