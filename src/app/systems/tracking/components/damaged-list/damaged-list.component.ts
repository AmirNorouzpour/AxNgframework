import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { User } from "src/app/systems/basic/models";
import { UserService } from "src/app/systems/basic/services";
import { DamagedService } from "../../services/damaged.service";

@Component({
  selector: "app-damaged-list",
  templateUrl: "./damaged-list.component.html",
  styleUrls: ["./damaged-list.component.scss"],
})
export class DamagedListComponent implements OnInit {
  constructor(
    public damagedService: DamagedService,
    public userService: UserService
  ) {}
  columns = [
    {
      title: "کد محصول",
      index: "code",
    },
    {
      title: "کد ضایعات",
      type: AxTableColumnType.DateTime,
      index: "damageCode",
    },
    {
      title: "کاربر",
      index: "userName",
    },
    {
      title: "زمان",
      type: AxTableColumnType.DateTime,
      index: "dateTime",
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
  }

  inputValue?: string;
  options: User[] = [];
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
    this.op = null;
    this.filters = {};
  }
  isLoading = false;
  onSearch(value: string): void {
    this.isLoading = true;
  }
}
