import {
  AxReportFilter,
  AxReportFilterOperationType,
} from "shared/ax-report/models/ax-report-filter.model";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { AxTableColumn } from "shared/ax-common/model/ax-table-column";

@Component({
  selector: "ax-text-filter",
  templateUrl: "./ax-text-filter.component.html",
  styleUrls: ["./ax-text-filter.component.scss"],
})
export class AxTextFilterComponent implements OnInit{
  @Input() colSetting: AxTableColumn;

  @Input() filters: AxReportFilter[];
  @Output() filtersChange = new EventEmitter<AxReportFilter[]>();

  constructor() {}
  ngOnInit(){}


  handleChange(e) {
    const filters = [
      {
        property: this.colSetting.index,
        value1: e.target.value,
        operation: AxReportFilterOperationType.Contains,
      },
    ];

    this.filtersChange.emit(filters);
  }
}
