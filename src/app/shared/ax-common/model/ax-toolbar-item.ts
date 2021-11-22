export interface AxToolbarItem {
  key: string;
  title: string;
  icon: string;
  color?: string;
  cls?: string;
  hasConfirm?: boolean;
  confirmTitle?: string;
  tooltip?: string;
}

export interface AxReportToolbarItem extends AxToolbarItem {
  showAlways?: boolean;
  showMultiSelect?: boolean;
  showSingleSelect?: boolean;
  permissionKey?: string;
}
