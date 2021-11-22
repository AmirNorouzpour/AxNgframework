import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { ResourceSerivce } from "../../../shared/services/api/resource.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable } from "rxjs";

import { Message } from "../models/message";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class MessageService
  extends ResourceSerivce<Message>
  implements Resolve<Message> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.msgApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Message> {
    const friendId = route.parent.params["friendId"];
    return this.getById([friendId]).pipe(map((result) => result.data));
  }

  getMessages(friendId) {
    const resourceEndpoint = this.apiEndpointsService.getResourceEndpoint(
      this.resourceName,
      [friendId],
      null,
      "GetMessages"
    );
    return this.apiHttpService.get<ApiResult<Message[]>>(resourceEndpoint);
  }
}
