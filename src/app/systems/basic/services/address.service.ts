import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { environment } from "environments/environment";
import { Address } from "../models/address.model";
import { ResourceSerivce } from "../../../shared/services/api/resource.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResult } from "shared/models";

@Injectable({
  providedIn: "root",
})
export class AddressService
  extends ResourceSerivce<Address>
  implements Resolve<Address> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.addressApi);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Address> {
    const addressId = route.params["addressId"];
    const userId = route.parent.params["userId"];
    return this.getById([addressId, userId]).pipe(map((result) => result.data));
  }
}
