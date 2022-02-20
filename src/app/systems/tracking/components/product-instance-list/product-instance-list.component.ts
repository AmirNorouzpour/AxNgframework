import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { Router } from "@angular/router";
import { ProductInstanceService } from "../../services/product-instance.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "src/app/systems/basic/services";
import { User } from "src/app/systems/basic/models";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-product-instance-list",
  templateUrl: "./product-instance-list.component.html",
  styleUrls: ["./product-instance-list.component.scss"],
})
export class ProductInstanceListComponent implements OnInit {
  columns = [
    {
      title: "کد محصول",
      index: "code",
    },
    {
      title: "تاریخ ",
      index: "insertDateTime",
      type: AxTableColumnType.DateTime,
    },
    {
      title: "نام کاربری",
      index: "userName",
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
    },
  ];
  filters = {};

  constructor(
    public productInstanceService: ProductInstanceService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
  date: Date;

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
  }
  submitForm(): void {
    this.filters = {
      code: this.code,
      userIds: this.users?.join(),
      date: this.date?.toJSON(),
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
