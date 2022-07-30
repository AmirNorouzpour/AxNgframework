export const environment = {
  production: false,

  /**** Endpoint urls ****/
  apiEndPoint: "http://localhost:6223/api",
  signalREndPoint: "http://localhost:6223/axhub",
  // apiEndPoint: "http://95.216.94.13:4200/services/api",
  // signalREndPoint: "http://95.216.94.13:4200/services/axhub",

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

  /**** Routes ****/
  panelRoute: "panel",
  authRoute: "auth",
};
