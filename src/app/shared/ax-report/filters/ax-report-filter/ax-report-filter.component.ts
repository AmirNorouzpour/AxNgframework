import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AxTableColumn } from "shared/ax-common/model/ax-table-column";
import { AxReportFilter } from "shared/ax-report/models/ax-report-filter.model";

@Component({
  selector: "ax-report-filter",
  templateUrl: "./ax-report-filter.component.html",
  styleUrls: ["./ax-report-filter.component.scss"],
})
export class AxReportFilterComponent implements OnInit {
  @Input() colSetting: AxTableColumn;

  @Input() filters: AxReportFilter[];
  @Output() filtersChange = new EventEmitter<AxReportFilter[]>();

  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleFiltersChange(e) {
    this.filtersChange.emit(e);
  }

  handleSearch() {
    this.search.emit();
  }

  handleReset() {
    this.reset.emit(this.colSetting);
  }

  ngOnInit(): void {}
}
