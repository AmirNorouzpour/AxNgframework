import { EventEmitter } from "@angular/core";
import { Injector } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { ChatService } from "shared/ax-chat/services/chat-service.service";
import { AxForm } from "shared/ax-form/ax-form";
import { UserService } from "src/app/systems/basic/services";
import { Contact } from "../../models/contact";

@Component({
  selector: "ax-chat-contacts-list",
  templateUrl: "./ax-chat-contacts-list.component.html",
  styleUrls: ["./ax-chat-contacts-list.component.scss"],
})
export class AxChatContactsListComponent
  extends AxForm<Contact>
  implements OnInit
{
  constructor(
    protected httpService: ChatService,
    injector: Injector,
    private userService: UserService
  ) {
    super(httpService, injector);
  }

  isSpinning = false;
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();
  contacts: Contact[] = [];
  ngOnInit(): void {
    var me = this;
    this.isSpinning = true;
    // this.userService.getList(null, null).subscribe(
    //   (result) => {
    //     result.data.forEach(function (user) {
    //       var contact = new Contact();
    //       contact.id = user.id;
    //       contact.name = user.firstName + " " + user.lastName;
    //       contact.lastLoginDate = user.lastLoginDate;
    //       me.contacts.push(contact);
    //       me.isSpinning = false;
    //       // contact.datetime = user.lastLoginDate;
    //     });
    //   },
    //   (err) => console.log(err)
    // );
  }

  onClick(id, name) {
    this.onItemClick.emit({ id, name });
  }
}
