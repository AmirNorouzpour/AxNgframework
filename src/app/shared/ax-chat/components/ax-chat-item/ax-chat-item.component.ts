import { Message } from "../../models/message";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  Input,
} from "@angular/core";
import { MessageService } from "shared/ax-chat/services/message.service";
import { LiveChatService } from "shared/ax-chat/services/live-chat.service";

@Component({
  selector: "ax-chat-item",
  templateUrl: "./ax-chat-item.component.html",
  styleUrls: ["./ax-chat-item.component.scss"],
})
export class AxChatItemComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private liveChatService: LiveChatService
  ) {}

  @ViewChild("content") private myScrollContainer: ElementRef;
  data: Message[] = [];
  inputValue: string = "";
  @Output() onBackClick: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    this.liveChatService.listenToUpdateChat();
    this.liveChatService.onDataReceived.subscribe((msg) => {
      this.getMessages();
      this.scrollToBottom();
    });
    this.getMessages();
  }

  getMessages() {
    this.isSpinning = true;
    this.messageService.getMessages(this.id).subscribe(
      (result) => {
        this.data = result.data;
        this.isSpinning = false;
        this.scrollToBottom();
      },
      (err) => console.log(err)
    );
  }

  onEnter(value) {
    if (value == null || value == "") return;
    var msg = new Message();
    msg.body = value;
    msg.fromContact = false;
    msg.receiverId = this.id;
    msg.sending = "ُSending...";
    this.addChatItem(msg);
    this.messageService.create(msg).subscribe(
      (result) => {
        this.getMessages();
      },
      (err) => console.log(err)
    );
  }

  @Input() id: number;
  @Input() name: string;
  isSpinning = false;

  addChatItem(msg: Message) {
    this.data.push(msg);
    this.inputValue = "";
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.cdr.detectChanges();
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onBack() {
    this.onBackClick.emit();
  }

  ngOnDestroy() {
    this.liveChatService.removeUpdateChatListener();
  }
}
