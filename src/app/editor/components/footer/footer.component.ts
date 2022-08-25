import { Component, EventEmitter, OnInit } from "@angular/core";
import { SignalRService } from "shared/services";
import { NzSpaceModule } from "ng-zorro-antd/space";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}
  onDataReceived: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.signalRService.addListener("PriceUpdate", this.onDataReceived);
  }
  tabs = ["Console", "Chart", "Orders", "Positions", "Histories"];
  openConsole(id) {
    if (id == this.active) this.hide = !this.hide;
    else this.hide = false;
    this.active = id;
  }
  active = "";
  hide = true;
}
