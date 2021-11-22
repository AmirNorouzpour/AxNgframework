import { Injectable, EventEmitter } from "@angular/core";
import { SignalRService } from "shared/services";

@Injectable({
  providedIn: "root",
})
export class LiveChartService {
  onDataReceived: EventEmitter<any> = new EventEmitter();

  constructor(private signalRService: SignalRService) {}

  public listenToUpdateChart() {
    this.signalRService.addListener("UpdateChart", this.onDataReceived);
  }

  public removeUpdateChartListener() {
    this.signalRService.removeListener("UpdateChart");
  }
}
