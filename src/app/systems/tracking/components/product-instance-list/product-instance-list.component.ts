import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
import { ProductInstanceService } from "../../services/product-instance.service";

@Component({
  selector: "app-product-instance-list",
  templateUrl: "./product-instance-list.component.html",
  styleUrls: ["./product-instance-list.component.scss"],
})
export class ProductInstanceListComponent implements OnInit {
  columns = [
    {
      title: "کد محصول",
      index: "code",
      filter: {
        type: "number",
      },
    },
    {
      title: "تاریخ ",
      index: "dateTime",
      filter: {
        type: "text",
      },
    },
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
  ];

  constructor(
    public productInstanceService: ProductInstanceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
