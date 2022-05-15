import { AxTableColumnType } from "./../../../../shared/ax-common/model/ax-table-column-type";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { AddressService } from "../../services/address.service";
import { AddressType } from "../../models/address.model";

@Component({
  selector: "app-address-list",
  templateUrl: "./address-list.component.html",
  styleUrls: ["./address-list.component.scss"],
})
export class AddressListComponent implements OnInit {
  columns = [
    {
      title: "شهر",
      index: "geoTitle",
    },
    {
      title: "آدرس",
      index: "content",
    },
    {
      title: "آدرس اصلی",
      index: "isMainAddress",
      type: AxTableColumnType.Boolean,
      options: {
        trueCaption: "بله",
        falseCaption: "خیر",
      },
    },
    {
      title: "نوع",
      index: "type",
      type: AxTableColumnType.Enum,
      options: {
        enumDict: {
          [AddressType.Home]: "خانه",
          [AddressType.Work]: "محل کار",
          [AddressType.Other]: "سایر",
        },
      },
    },
    {
      title: "تاریخ ایجاد",
      index: "insertDateTime",
    },
  ];
  queryParams;

  @ViewChild("noContent", { static: true }) noContent: TemplateRef<any>;

  constructor(
    public auditService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams = {
      userId: this.activatedRoute.snapshot.params["userId"],
    };
  }

  ngOnInit(): void {}

  handleNew() {
    const userId = this.activatedRoute.snapshot.params["userId"];
    this.router.navigate([`/panel/basic/users/edit/${userId}/addresses/new`], {
      replaceUrl: true,
    });
  }

  handleEdit(id) {
    const userId = this.activatedRoute.snapshot.params["userId"];
    this.router.navigate([
      `/panel/basic/users/edit/${userId}/addresses/edit/` + id,
    ]);
  }
}
