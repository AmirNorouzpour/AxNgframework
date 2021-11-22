import { AxReportFilterOperationType } from "./../../models/ax-report-filter.model";
import { AxTableColumn } from "./../../../ax-common/model/ax-table-column";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AxReportFilter } from "shared/ax-report/models/ax-report-filter.model";

@Component({
  selector: "ax-boolean-filter",
  templateUrl: "./ax-boolean-filter.component.html",
  styleUrls: ["./ax-boolean-filter.component.scss"],
})
export class AxBooleanFilterComponent implements OnInit {
  @Input() colSetting: AxTableColumn;

  @Input() filters: AxReportFilter[];
  @Output() filtersChange = new EventEmitter<AxReportFilter[]>();

  selected: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.filters = [
      {
        property: this.colSetting.index,
        value1: this.selected,
        operation: AxReportFilterOperationType.EqualTo,
      },
    ];
  }

  handleChange(e) {
    this.filters[0].value1 = e;
    this.filtersChange.emit(this.filters);
  }
}
