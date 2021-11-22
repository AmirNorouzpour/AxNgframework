import { GenderType } from "./../../models/gender-type.model";
import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../services";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  customToolbarItems = [
    {
      key: "custom1",
      title: "تست دستور سفارشی",
      showAlways: true,
      icon: "folder-open",
    },
  ];

  toolbarItems = [{
    key: "edit",
    permissionKey: "010101"
  }];

  columns = [
    {
      title: "نام کاربری",
      index: "userName",
      filter: {
        type: "text",
      },
    },
    {
      title: "وضعیت",
      index: "isActive",
      flex: 1,
      type: AxTableColumnType.Boolean,
      options: {
        trueCaption: "فعال",
        falseCaption: "غیر فعال",
      },
      filter: {
        type: "boolean",
        options: {
          label: "فعال / غیر فعال",
        },
      },
    },
    {
      title: "نام",
      index: "firstName",
      filter: {
        type: "text",
      },
    },
    {
      title: "نام خانوادگی",
      index: "lastName",
      filter: {
        type: "text",
      },
    },
    {
      title: "جنسیت",
      index: "genderType",
      type: AxTableColumnType.Enum,
      options: {
        enumDict: {
          [GenderType.Male]: "مرد",
          [GenderType.Female]: "زن",
        },
      },
      filter: {
        type: "enum",
        options: {
          items: [
            {
              label: "مرد",
              value: 1,
            },
            {
              label: "زن",
              value: 2,
            },
          ],
        },
      },
    },
    {
      title: "تاریخ اعتبار حساب",
      type: AxTableColumnType.DateTime,
      index: "expireDateTime",
    },
  ];

  constructor(public userService: UserService, private router: Router) {}

  handleNew() {
    this.router.navigate(["/panel/basic/users/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/basic/users/edit/" + id]);
  }

  handleCustomCommand(e) {
    console.log(e);
  }

  ngOnInit(): void {}
}
