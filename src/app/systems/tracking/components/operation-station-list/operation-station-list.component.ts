import { OperationStationService } from "../../services/operation-station.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";

@Component({
  selector: "app-operation-station-list",
  templateUrl: "./operation-station-list.component.html",
  styleUrls: ["./operation-station-list.component.scss"],
})
export class OperationStationListComponent implements OnInit {
  columns = [
    {
      title: "نام ایستگاه کاری",
      index: "name",
      filter: {
        type: "text",
      },
    },
    {
      title: "کد ایستگاه کاری",
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
    {
      title: "خط تولید",
      index: "productLineName",
      filter: {
        type: "text",
      },
    },
    {
      title: "ترتیب",
      index: "order",
      filter: {
        type: "number",
      },
    },
    {
      title: "vas",
      index: "vas",
      filter: {
        type: "number",
      },
    },
  ];

  constructor(
    public operationStationService: OperationStationService,
    private router: Router
  ) {}

  handleNew() {
    this.router.navigate(["/panel/tracking/operationStations/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/operationStations/edit/" + id]);
  }
  ngOnInit(): void {}
}
