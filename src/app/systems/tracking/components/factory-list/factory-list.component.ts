import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
import { FactoryService } from "../../services/factory.service";

@Component({
  selector: "app-factory-list",
  templateUrl: "./factory-list.component.html",
  styleUrls: ["./factory-list.component.scss"],
})
export class FactoryListComponent implements OnInit {
  columns = [
    {
      title: "نام مجموعه",
      index: "name",
      filter: {
        type: "text",
      },
    },
    {
      title: "کد مجموعه",
      index: "code",
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

  constructor(public factoryService: FactoryService, private router: Router) {}

  handleNew() {
    this.router.navigate(["/panel/tracking/factories/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/factories/edit/" + id]);
  }

  ngOnInit(): void {}
}
