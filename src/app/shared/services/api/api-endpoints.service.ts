import { environment } from "environments/environment";
import { Injectable } from "@angular/core";
import { UrlBuilder } from "../../helpers/url-builder";
import { QueryStringParameters } from "../../helpers/query-string-parameters";

@Injectable({
  providedIn: "root",
})
export class ApiEndpointsService {
  constructor() {}

  //#region private
  private createUrl(
    version: string,
    api: string,
    action?: string,
    pathVariables: string[] = [],
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(environment.apiEndPoint, [
      version,
      api,
      action,
      ...pathVariables,
    ]);

    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }

    return urlBuilder.toString();
  }
  //#endregion

  getLoginEndpoint() {
    const { apiVersion1, userApi, axToken } = environment;
    return this.createUrl(apiVersion1, userApi, axToken);
  }

  getLogoutEndpoint() {
    const { apiVersion1, userApi, signout } = environment;
    return this.createUrl(apiVersion1, userApi, signout);
  }

  getInitDataEndpoint() {
    const { apiVersion1, userApi, getInitData } = environment;
    return this.createUrl(apiVersion1, userApi, getInitData);
  }

  getUserPermissionsEndPoint() {
    const { apiVersion1, userApi, getUserPermissions } = environment;
    return this.createUrl(apiVersion1, userApi, getUserPermissions);
  }

  getSetUserConnectionIdEndPoint() {
    const { apiVersion1, userApi, setUserConnectionId } = environment;
    return this.createUrl(apiVersion1, userApi, setUserConnectionId);
  }

  getDisableUserConnectionIdEndPoint() {
    const { apiVersion1, userApi, disableUserConnectionId } = environment;
    return this.createUrl(apiVersion1, userApi, disableUserConnectionId);
  }

  getSystemMenusEndpoint(systemId) {
    const { apiVersion1, menuApi, getSystemMenus } = environment;
    return this.createUrl(apiVersion1, menuApi, getSystemMenus, [systemId]);
  }

  getDashboardChartsEndpoint(systemId) {
    const { apiVersion1, menuApi, getDashboardCharts } = environment;
    return this.createUrl(apiVersion1, menuApi, getDashboardCharts, [systemId]);
  }

  getChart(chartId, filter, cid) {
    const { apiVersion1, chartApi, getChart } = environment;
    return this.createUrl(
      apiVersion1,
      chartApi,
      getChart,
      [chartId, filter],
      (queryStringParameters) => {
        queryStringParameters.push("cid", cid);
      }
    );
  }

  getUserNotificationListEndpoint() {
    const { apiVersion1, userMessagesApi, getUserNotificationList } =
      environment;
    return this.createUrl(
      apiVersion1,
      userMessagesApi,
      getUserNotificationList
    );
  }

  getResourceEndpoint(
    api: string,
    parameters?: string[],
    filters?,
    action?: string
  ) {
    const { apiVersion1 } = environment;
    var res = this.createUrl(
      apiVersion1,
      api,
      action,
      [...(parameters ? parameters : [])],
      (queryStringParameters) => {
        if (filters) {
          for (var key in filters) {
            queryStringParameters.push(key, filters[key]);
          }
        }
      }
    );
    return res;
  }

  getAuditLogsEndpoint(parameters?: string[], filters?) {
    const { apiVersion1, auditApi, getLogs } = environment;
    return this.createUrl(
      apiVersion1,
      auditApi,
      getLogs,
      [...(parameters ? parameters : [])],
      (queryStringParameters) => {
        if (filters) {
          for (var key in filters) {
            queryStringParameters.push(key, filters[key]);
          }
        }
      }
    );
  }

  getAuditLogEndpoint(parameters?: string[]) {
    const { apiVersion1, auditApi, getLog } = environment;
    return this.createUrl(apiVersion1, auditApi, getLog, [
      ...(parameters ? parameters : []),
    ]);
  }

  getGeoEndpoint(parameters?: string[]) {
    const { apiVersion1, geoApi, getWithChildren } = environment;
    return this.createUrl(apiVersion1, geoApi, getWithChildren, [
      ...(parameters ? parameters : []),
    ]);
  }

  getAuthhorizationEndpoint(parameters?: string[]) {
    const { apiVersion1, authorizationApi, getTree } = environment;
    return this.createUrl(apiVersion1, authorizationApi, getTree, [
      ...(parameters ? parameters : []),
    ]);
  }

  getDamagedEndpoint(parameters?: string[]) {
    const { apiVersion1, productInstanceApi, getDamagedList } = environment;
    return this.createUrl(apiVersion1, productInstanceApi, getDamagedList, [
      ...(parameters ? parameters : []),
    ]);
  }

  getPihXlsxEndpoint(filters) {
    const { apiVersion1, productInstanceHistoryApi, exportToXlsxPih } =
      environment;
    return this.createUrl(
      apiVersion1,
      productInstanceHistoryApi,
      exportToXlsxPih,
      [],
      (queryStringParameters) => {
        if (filters) {
          for (var key in filters) {
            queryStringParameters.push(key, filters[key]);
          }
        }
      }
    );
  }
}
