import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "src/app/shared/services";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { environment } from "environments/environment";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ProductHistory } from "../models/ProductHistory";

@Injectable({
  providedIn: "root",
})
export class ProductHistoryService
  extends ResourceSerivce<ProductHistory>
  implements Resolve<ProductHistory>
{
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(
      apiHttpService,
      apiEndpointsService,
      environment.productInstanceHistoryApi
    );
  }
  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<ProductHistory> {
    const id = route.params["productInstanceId"];
    return this.getById([id]).pipe(map((result) => result.data));
  }
}
