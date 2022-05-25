import { AxReportToolbarItem } from "./../../ax-common/model/ax-toolbar-item";

export const reportDefaultToolbarItems: AxReportToolbarItem[] = [
  {
    key: "new",
    title: "جدید",
    icon: "plus-square",
    showAlways: true,
  },
  {
    key: "edit",
    title: "ویرایش",
    icon: "edit",
    color: "warning",
    showAlways: false,
    showSingleSelect: true,
    showMultiSelect: false,
  },
  {
    key: "delete",
    title: "حذف",
    icon: "delete",
    color: "danger",
    showAlways: false,
    showSingleSelect: true,
    showMultiSelect: true,
    hasConfirm: true,
    confirmTitle: "آیا از حذف این آیتم اطمینان دارید؟",
  },
  {
    key: "refresh",
    title: "",
    icon: "reload",
    showAlways: true,
  },
];
