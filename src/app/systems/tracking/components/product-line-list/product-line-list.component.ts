import { ProductLineService } from "../../services/product-line.service";
import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
@Component({
  selector: "app-product-line-list",
  templateUrl: "./product-line-list.component.html",
  styleUrls: ["./product-line-list.component.scss"],
})
export class ProductLineListComponent implements OnInit {
  columns = [
    {
      title: "نام خط تولید",
      index: "name",
      filter: {
        type: "text",
      },
    },
    {
      title: "کد خط تولید",
      index: "code",
      filter: {
        type: "text",
      },
    },
    {
      title: "نام کارخانه",
      index: "factoryName",
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
    public productLineService: ProductLineService,
    private router: Router
  ) {}
  handleNew() {
    this.router.navigate(["/panel/tracking/productLines/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/productLines/edit/" + id]);
  }

  ngOnInit(): void {}
}
