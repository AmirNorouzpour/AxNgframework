import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  imagePath;
  @Output() Save = new EventEmitter<any>();
  @Output() Open = new EventEmitter<any>();
  @Output() New = new EventEmitter<any>();
  @Output() Msg = new EventEmitter<any>();
  ngOnInit(): void {}

  save($event) {
    this.Save.emit($event);
  }
  open($event) {
    this.Open.emit($event);
  }
  newItem($event) {
    this.New.emit($event);
  }
  openMsg($event) {
    this.Msg.emit($event);
  }
}
