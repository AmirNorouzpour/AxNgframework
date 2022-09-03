import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SignalRService } from "shared/services";
import { NzResizeEvent } from "ng-zorro-antd/resizable";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}
  onDataReceived: EventEmitter<any> = new EventEmitter();
  @Output() OnHide = new EventEmitter<any>();
  @Output() OnChange = new EventEmitter<any>();
  ngOnInit(): void {
    // this.signalRService.addListener("PriceUpdate", this.onDataReceived);
  }
  tabs = ["Console", "Chart", "Orders", "Positions", "Histories"];
  active = "";
  openConsole(id) {
    if (id == this.active) this.active = "";
    else this.active = id;
    this.OnChange.emit(this.active);
  }
}
