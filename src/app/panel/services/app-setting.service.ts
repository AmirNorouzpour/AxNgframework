import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, forkJoin, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiHttpService, ApiEndpointsService } from "shared/services";
import { InitialData, ApiResult, AxSystem } from "shared/models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppSetting implements Resolve<InitialData> {
  private _initialData: InitialData;
  private _userPermissions: string[];
  private _systemNameMap: any;
  private _sidebarIsCollapsedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _mobileSidebarIsCollapsedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public sidebarIsCollapsed = this._sidebarIsCollapsedSubject.asObservable();
  public mobileSidebarIsCollapsed =
    this._mobileSidebarIsCollapsedSubject.asObservable();

  get initialData(): InitialData {
    return this._initialData;
  }

  get userPermissions(): string[] {
    return this._userPermissions;
  }

  getSystemNameById(id) {
    return Object.keys(this._systemNameMap).find(
      (key) => this._systemNameMap[key] === id
    );
  }

  getSystemIdByName(name) {
    return this._systemNameMap[name];
  }

  collapseSidebar() {
    this._sidebarIsCollapsedSubject.next(true);
  }

  expandSidebar() {
    this._sidebarIsCollapsedSubject.next(false);
  }

  collapseMobileSidebar() {
    this._mobileSidebarIsCollapsedSubject.next(true);
  }

  expandMobileSidebar() {
    this._mobileSidebarIsCollapsedSubject.next(false);
  }

  constructor(
    private httpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<InitialData> {
    return forkJoin(this.getInitialData(), this.getUserPermissions()).pipe(
      map(([initDataResult, userPermissionsResult]) => {
        this._initialData = initDataResult.data;
        this._userPermissions = userPermissionsResult.data;
        this._systemNameMap = this.createSystemNameMap(
          this._initialData.systemsList
        );

        return initDataResult.data;
      })
    );
  }

  private getInitialData() {
    return this.httpService.get<ApiResult<InitialData>>(
      this.apiEndpointsService.getInitDataEndpoint()
    );
  }

  private getUserPermissions() {
    return this.httpService.get<ApiResult<string[]>>(
      this.apiEndpointsService.getUserPermissionsEndPoint()
    );
  }

  private createSystemNameMap(systemList: AxSystem[]) {
    return systemList.reduce((systemNameMap, system) => {
      if (!system.name) {
        alert(system.title + " has not name!");
        system.name = system.title;
      }
      return { ...systemNameMap, [system.name.toLowerCase()]: system.id };
    }, {});
  }
}
