import { GenderType } from "./../../models/gender-type.model";
import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { UserService } from "./../../services";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  customToolbarItems = [
    {
      key: "changePwd",
      title: "Change Password",
      showAlways: true,
      icon: "lock",
    },
  ];

  columns = [
    {
      title: "Username",
      index: "userName",
    },
    {
      title: "Status",
      index: "isActive",
      flex: 1,
      type: AxTableColumnType.Boolean,
      options: {
        trueCaption: "Active",
        falseCaption: "InActive",
      },
    },
    {
      title: "First Name",
      index: "firstName",
    },
    {
      title: "Last Name",
      index: "lastName",
    },
    {
      title: "Expire Date",
      type: AxTableColumnType.DateTime,
      index: "expireDateTime",
    },
  ];

  constructor(
    public userService: UserService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  handleNew() {
    this.router.navigate(["/panel/basic/users/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/basic/users/edit/" + id]);
  }

  handleCustomCommand(e) {
    if (e.key == "changePwd") {
      var it = e.setOfCheckedId.values();
      //get first entry:
      var id = it.next();
      const modal = this.modal.create({
        nzTitle: "Change Password",
        nzContent: ChangePasswordComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzFooter: [
          {
            label: "Save",
            type: "primary",
            onClick: (componentInstance) => {
              componentInstance!.onSave(id);
            },
          },
        ],
      });
    }
  }

  ngOnInit(): void {}
}
