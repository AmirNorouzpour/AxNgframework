import { Injectable, EventEmitter } from "@angular/core";
import { SignalRService } from "shared/services";

@Injectable({
  providedIn: "root",
})
export class LiveChatService {
  onDataReceived: EventEmitter<any> = new EventEmitter();

  constructor(private signalRService: SignalRService) {}

  public listenToUpdateChat() {
    this.signalRService.addListener("UpdateChat", this.onDataReceived);
  }

  public removeUpdateChatListener() {
    this.signalRService.removeListener("UpdateChat");
  }
}
