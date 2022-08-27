import { Component, EventEmitter, OnInit } from "@angular/core";
import { SignalRService } from "shared/services";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzResizeEvent } from "ng-zorro-antd/resizable";


@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}
  onDataReceived: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    // this.signalRService.addListener("PriceUpdate", this.onDataReceived);
  }
  tabs = ["Console", "Chart", "Orders", "Positions", "Histories"];
  active = "";
  hide = true;
  openConsole(id) {
    if (id == this.active) this.hide = !this.hide;
    else this.hide = false;
    this.active = id;
  }

  width = 400;
  height = 200;

  onResize({ width, height }: NzResizeEvent): void {
    this.width = width!;
    this.height = height!;
  }
}
