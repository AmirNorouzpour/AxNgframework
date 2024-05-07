import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ContractService } from "../../services/contract.service";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";

@Component({
  selector: "app-contracts-list",
  templateUrl: "./contracts.component.html",
  styleUrl: "./contracts.component.scss",
})
export class ContractsComponent implements OnInit {
  columns = [
    {
      title: "ستون 1",
      index: "f1",
    },
    {
      title: "ستون 2",
      index: "f2",
    },
    {
      title: "ستون 3",
      index: "f3",
    },
    {
      title: "ستون 4",
      index: "f4",
    },
    {
      title: "ستون 5",
      index: "f5",
    },
    {
      title: "تاریخ",
      index: "insertDateTime",
      type: AxTableColumnType.DateTime,
    },
  ];
  constructor(
    public service: ContractService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    this.filters = {
      date1: this.date1?.toJSON(),
      date2: this.date2?.toJSON(),
    };
  }
  date1: Date;
  date2: Date;
  filters = {};
  clear() {
    this.date1 = null;
    this.date2 = null;
    this.filters = {};
  }
}
