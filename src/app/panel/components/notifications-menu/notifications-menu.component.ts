import { NotificationService } from "./../../services/notification.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AxNotification } from "../../models/notification.model";

@Component({
  selector: "ax-notifications-menu",
  templateUrl: "./notifications-menu.component.html",
  styleUrls: ["./notifications-menu.component.scss"],
})
export class NotificationsMenuComponent implements OnInit {
  notifications$: Observable<AxNotification>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService
      .getNotifications()
      .pipe(map((result) => result.data));
  }
}
