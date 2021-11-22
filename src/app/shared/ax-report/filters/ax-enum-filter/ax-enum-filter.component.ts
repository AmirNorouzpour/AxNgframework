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
  selector: 'ax-enum-filter',
  templateUrl: './ax-enum-filter.component.html',
  styleUrls: ['./ax-enum-filter.component.scss']
})
export class AxEnumFilterComponent implements OnInit {

  @Input() colSetting: AxTableColumn;

  @Input() filters: AxReportFilter[];
  @Output() filtersChange = new EventEmitter<AxReportFilter[]>();

  constructor() {}
  ngOnInit(){}

  handleChange(e) {
    console.log(e);
    // const filters = [
    //   {
    //     property: this.colSetting.index,
    //     value1: e.target.value,
    //     operation: AxReportFilterOperationType.Contains,
    //   },
    // ];

    // this.filtersChange.emit(filters);
  }
}
