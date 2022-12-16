import { Injectable, EventEmitter } from "@angular/core";
import { SignalRService } from "shared/services";

@Injectable({
  providedIn: "root",
})
export class ChartUpdateService {
  onDataReceived: EventEmitter<any> = new EventEmitter();

  constructor(private signalRService: SignalRService) {}

  public listenToUpdateChart() {
    this.signalRService.addListener("KlineUpdate", this.onDataReceived);
  }

  public removeUpdateChartListener() {
    this.signalRService.removeListener("KlineUpdate");
  }
}
