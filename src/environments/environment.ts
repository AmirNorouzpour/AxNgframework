// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /**** Endpoint urls ****/
  apiEndPoint: "http://65.108.14.168:8011/services/api",
  signalREndPoint: "http://65.108.14.168:8011/services/axhub",

  /**** Versions ****/
  apiVersion1: "v1",

  /**** Api ****/
  userApi: "Users",
  generalApi: "General",
  menuApi: "Menus",
  chartApi: "Charts",
  userMessagesApi: "UserMessages",
  auditApi: "Audits",
  addressApi: "Addresses",
  groupApi: "Groups",
  factoryApi: "Factories",
  productLineApi: "ProductLines",
  machineApi: "Machines",
  operationStationApi: "OperationStations",
  shiftApi: "Shifts",
  personnelApi: "Personnels",
  geoApi: "Geo",
  authorizationApi: "Permissions",
  msgApi: "Chat",
  productInstanceApi: "ProductInstances",
  productInstanceHistoryApi: "ProductInstanceHistories",
  indicatorsApi: "Indicators",
  editorsApi: "Editor",
  chartsApi: "Charts",

  /**** Actions ****/
  axToken: "AxToken",
  signout: "SignOut",
  getInitData: "GetInitData",
  getOrganizationLogo: "GetOrganizationLogo",
  getUserPermissions: "GetUserPermissions",
  getSystemMenus: "GetSystemMenus",
  getChart: "GetChart",
  setUserConnectionId: "setUserConnectionId",
  disableUserConnectionId: "disableUserConnectionId",
  getUserNotificationList: "GetUserNotificationList",
  getLogs: "GetLogs",
  getLog: "GetLog",
  getWithChildren: "GetWithChildren",
  getTree: "GetTree",
  getUsersAndGroups: "GetUsersAndGroups",
  exportToXlsxPih: "ExportToXlsx",
  getDamagedList: "GetDamagedList",
  getStopList: "GetStopList",
  changePassword: "changePassword",
  getMenuData: "getMenuData",
  getKLines: "GetKLines",

  /**** Routes ****/
  panelRoute: "panel",
  authRoute: "auth",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
