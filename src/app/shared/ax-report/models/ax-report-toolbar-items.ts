import { AxReportToolbarItem } from "./../../ax-common/model/ax-toolbar-item";

export const reportDefaultToolbarItems: AxReportToolbarItem[] = [
  {
    key: "new",
    title: "New",
    icon: "plus-square",
    showAlways: true,
  },
  {
    key: "edit",
    title: "Edit",
    icon: "edit",
    color: "warning",
    showAlways: false,
    showSingleSelect: true,
    showMultiSelect: false,
  },
  {
    key: "delete",
    title: "Delete",
    icon: "delete",
    color: "danger",
    showAlways: false,
    showSingleSelect: true,
    showMultiSelect: true,
    hasConfirm: true,
    confirmTitle: "Are Your Sure?",
  },
  {
    key: "refresh",
    title: "",
    icon: "reload",
    showAlways: true,
  },
];
