import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { User } from "src/app/systems/basic/models/user.model";
import { UserService } from "src/app/systems/basic/services";
import { OperationStation } from "../../models/operationStation.model";
import { OperationStationService } from "../../services/operation-station.service";
import { ProductHistoryService } from "../../services/product-history.service";
import { saveAs } from "file-saver";
import { ProductLineService } from "../../services/product-line.service";
import { ProductLine } from "../../models/productLine.model";
import { Machine } from "../../models/machine.model";
import { MachineService } from "../../services/machine.service";

@Component({
  selector: "app-product-history-list",
  templateUrl: "./product-history-list.component.html",
  styleUrls: ["./product-history-list.component.scss"],
})
export class ProductHistoryListComponent implements OnInit {
  constructor(
    public productHistoryService: ProductHistoryService,
    public userService: UserService,
    public operationStationService: OperationStationService,
    public productLineService: ProductLineService,
    public machineService: MachineService
  ) {}
  columns = [
    {
      title: "کد محصول",
      index: "code",
    },
    {
      title: "خط تولید",
      index: "productLineName",
    },
    {
      title: "ایستگاه",
      index: "opName",
    },
    {
      title: "ماشین",
      index: "machineName",
    },
    {
      title: "کاربر",
      index: "personnelName",
    },
    {
      title: "زمان",
      type: AxTableColumnType.DateTime,
      index: "enterTime",
    },
  ];

  toolbarItems = [
    {
      key: "refresh",
      title: "",
      icon: "reload",
      showAlways: true,
    },
  ];

  customToolbarItems = [
    {
      key: "export",
      title: "خروجی به اکسل",
      showAlways: true,
      showSingleSelect: true,
      icon: "export",
    },
  ];

  handleCustomCommand(e) {
    if (e.key == "export") {
      var parameters = {
        code: this.code,
        userIds: this.users?.join(),
        date1: this.date1?.toJSON(),
        date2: this.date2?.toJSON(),
        op: this.op,
        line: this.line,
      };
      let date = new Date().toISOString();
      this.productHistoryService.export(parameters).subscribe((data) => {
        saveAs(data, date + ".xlsx");
      });
    }
  }

  ngOnInit(): void {
    var users = this.userService.getList();
    users.subscribe((data) => {
      this.options = data.data.map(
        (item) =>
          ({
            id: item.id,
            fullName: item.firstName + " " + item.lastName,
          } as User)
      );
    });

    var ops = this.operationStationService.getList();
    ops.subscribe((data) => {
      this.OpsOptions = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
          } as OperationStation)
      );
    });

    var lines = this.productLineService.getList();
    lines.subscribe((data) => {
      this.LinesOptions = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
          } as ProductLine)
      );
    });

    var machines = this.machineService.getList();
    machines.subscribe((data) => {
      this.machineOptions = data.data.map(
        (item) =>
          ({
            id: item.id,
            name: item.code,
          } as Machine)
      );
    });
  }

  inputValue?: string;
  options: User[] = [];
  OpsOptions: OperationStation[] = [];
  machineOptions: Machine[] = [];
  LinesOptions: ProductLine[] = [];
  code: string;
  users: number[];
  op: number;
  machine: number;
  line: number;
  date1: Date;
  date2: Date;
  filters = {};

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
  }
  submitForm(): void {
    this.filters = {
      code: this.code,
      userIds: this.users?.join(),
      date1: this.date1?.toJSON(),
      date2: this.date2?.toJSON(),
      op: this.op,
      machine: this.machine,
      line: this.line,
    };
  }

  clear() {
    this.code = null;
    this.users = null;
    this.date1 = null;
    this.date2 = null;
    this.op = null;
    this.machine = null;
    this.line = null;
    this.filters = {};
  }
  isLoading = false;
  onSearch(value: string): void {
    this.isLoading = true;
  }
}
