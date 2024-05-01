import { GenderType } from "./../../models/gender-type.model";
import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { UserService } from "./../../services";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  customToolbarItems = [
    {
      key: "changePwd",
      title: this.translator.instant("Change Password"),
      showAlways: true,
      icon: "lock",
    },
  ];

  columns = [
    {
      title: this.translator.instant("Username"),
      index: "userName",
    },
    {
      title: this.translator.instant("Status"),
      index: "isActive",
      flex: 1,
      type: AxTableColumnType.Boolean,
      options: {
        trueCaption: "Active",
        falseCaption: "InActive",
      },
    },
    {
      title: this.translator.instant("First Name"),
      index: "firstName",
    },
    {
      title: this.translator.instant("Last Name"),
      index: "lastName",
    },
    {
      title: this.translator.instant("Expiration Date"),
      type: AxTableColumnType.DateTime,
      index: "expireDateTime",
    },
  ];

  constructor(
    public userService: UserService,
    private router: Router,
    private modal: NzModalService,
    private translator: TranslateService,
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
            label: this.translator.instant("Save"),
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
