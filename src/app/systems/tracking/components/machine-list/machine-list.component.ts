import { MachineService } from "../../services/machine.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";

@Component({
  selector: "app-machine-list",
  templateUrl: "./machine-list.component.html",
  styleUrls: ["./machine-list.component.scss"],
})
export class MachineListComponent implements OnInit {
  columns = [
    {
      title: "نام ماشین",
      index: "name",
      filter: {
        type: "text",
      },
    },
    {
      title: "کد ماشین",
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
      title: "نام ایستگاه",
      index: "operationStationName",
      filter: {
        type: "text",
      },
    },
  ];

  constructor(public machineService: MachineService, private router: Router) {}

  handleNew() {
    this.router.navigate(["/panel/tracking/machines/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/machines/edit/" + id]);
  }

  ngOnInit(): void {}
}
