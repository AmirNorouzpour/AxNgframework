import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { Contact } from "../models/contact";
import { ResourceSerivce } from "../../../shared/services/api/resource.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models/api/api-result.model";
import { UserService } from "src/app/systems/basic/services";

@Injectable({
  providedIn: "root",
})
export class ChatService
  extends ResourceSerivce<Contact>
  implements Resolve<Contact> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.addressApi);
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Contact | Observable<Contact> | Promise<Contact> {
    throw new Error("Method not implemented.");
  }
}
