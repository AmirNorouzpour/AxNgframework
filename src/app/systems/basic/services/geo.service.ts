import { Geo } from "./../models/geo.model";
import { ResourceSerivce } from "shared/services/api/resource.service";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiHttpService, ApiEndpointsService } from "shared/services";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeoService extends ResourceSerivce<Geo> implements Resolve<Geo> {
  constructor(
    apiHttpService: ApiHttpService,
    apiEndpointsService: ApiEndpointsService
  ) {
    super(apiHttpService, apiEndpointsService, environment.geoApi, {
      getUrlFn: (parameters, queryParams) => {
        return apiEndpointsService.getGeoEndpoint(parameters);
      },
    });
  }

  getChildren(parentId): Observable<any> {
    return this.getList([parentId]).pipe(
      map((result) => result.data),
      map(this.mapChildren.bind(this))
    );
  }

  mapChildren(result) {
    return (
      result &&
      result.map((geoItem) => ({
        key: geoItem.id,
        title: geoItem.title,
        isLeaf:
          geoItem.hasChildren === false ||
          !geoItem.children ||
          (geoItem.children && geoItem.children.length === 0),
        children: !(
          geoItem.hasChildren === false ||
          !geoItem.children ||
          (geoItem.children && geoItem.children.length === 0)
        )
          ? this.mapChildren(geoItem.children)
          : [],
      }))
    );
  }

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<Geo> {
    const geoId = route.parent.params["geoId"];
    return this.getById([geoId]).pipe(map((result) => result.data));
  }
}
