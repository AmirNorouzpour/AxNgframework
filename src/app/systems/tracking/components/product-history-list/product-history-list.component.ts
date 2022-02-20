import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { User } from "src/app/systems/basic/models/user.model";
import { UserService } from "src/app/systems/basic/services";
import { OperationStation } from "../../models/operationStation.model";
import { OperationStationService } from "../../services/operation-station.service";
import { ProductHistoryService } from "../../services/product-history.service";

@Component({
  selector: "app-product-history-list",
  templateUrl: "./product-history-list.component.html",
  styleUrls: ["./product-history-list.component.scss"],
})
export class ProductHistoryListComponent implements OnInit {
  constructor(
    public productHistoryService: ProductHistoryService,
    public userService: UserService,
    public operationStationService: OperationStationService
  ) {}
  columns = [
    {
      title: "کد محصول",
      index: "code",
    },
    {
      title: "ایستگاه",
      index: "opName",
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
  }

  inputValue?: string;
  options: User[] = [];
  OpsOptions: OperationStation[] = [];
  code: string;
  users: number[];
  op: number;
  date: Date;
  filters = {};

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
  }
  submitForm(): void {
    this.filters = {
      code: this.code,
      userIds: this.users?.join(),
      date: this.date?.toJSON(),
      op: this.op,
    };
  }

  clear() {
    this.code = null;
    this.users = null;
    this.date = null;
    this.filters = {};
  }
  isLoading = false;
  onSearch(value: string): void {
    this.isLoading = true;
  }
}
