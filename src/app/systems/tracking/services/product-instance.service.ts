import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ProductInstance } from "./../models/productInstance";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { environment } from "environments/environment";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductInstanceService
  extends ResourceSerivce<ProductInstance>
  implements Resolve<ProductInstance> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.productInstanceApi);
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<ProductInstance> {
    const id = route.params["productInstanceId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
