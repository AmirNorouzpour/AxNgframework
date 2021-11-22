import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { Observable } from "rxjs";
import { ApiResult } from "shared/models";
import { tap } from "rxjs/operators";
import { AxNotification } from "../models/notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  getNotifications() {
    return this.apiHttpService.get<ApiResult<AxNotification>>(
      this.apiEndpointsService.getUserNotificationListEndpoint()
    );
  }
}
