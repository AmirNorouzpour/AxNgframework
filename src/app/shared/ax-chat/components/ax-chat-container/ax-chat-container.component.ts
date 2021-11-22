import { Component, OnInit } from "@angular/core";
import { Message } from "shared/ax-chat/models/message";
import { LiveChatService } from "shared/ax-chat/services/live-chat.service";
import { SnackBarService } from "shared/services/snack-bar.service";

@Component({
  selector: "ax-chat-container",
  templateUrl: "./ax-chat-container.component.html",
  styleUrls: ["./ax-chat-container.component.scss"],
})
export class AxChatContainerComponent implements OnInit {
  constructor(private liveChatService: LiveChatService) {}
  isList: boolean = true;
  ngOnInit(): void {
    this.liveChatService.listenToUpdateChat();
    this.liveChatService.onDataReceived.subscribe((msg) => {
      msg.fromContact = true;
      this.currentMsg = msg;
    });
  }

  currentId: number;
  currentName: string;
  currentMsg: Message;

  public setFlag(data: any, flage: boolean): void {
    this.currentId = data?.id;
    this.currentName = data?.name;
    this.isList = flage;
  }

  ngOnDestroy() {
    this.liveChatService.removeUpdateChatListener();
  }
}
