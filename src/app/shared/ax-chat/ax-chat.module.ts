import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxChatContactsListComponent } from "./components/ax-chat-contacts-list/ax-chat-contacts-list.component";
import { AxChatItemComponent } from "./components/ax-chat-item/ax-chat-item.component";
import { SharedNgZorroModule } from "shared/ng-zorro/shared-ng-zorro.module";
import { FormsModule } from "@angular/forms";
import { AxChatContainerComponent } from "./components/ax-chat-container/ax-chat-container.component";

@NgModule({
  declarations: [
    AxChatContactsListComponent,
    AxChatItemComponent,
    AxChatContainerComponent,
  ],
  imports: [CommonModule, SharedNgZorroModule, FormsModule],
  exports: [
    AxChatContactsListComponent,
    AxChatItemComponent,
    AxChatContainerComponent,
  ],
})
export class AxChatModule {}
