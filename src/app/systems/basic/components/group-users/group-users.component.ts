import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { TranslateService } from "@ngx-translate/core";
import { GroupUsersService } from "../../services/group-users.service";

@Component({
  selector: "app-group-users",
  templateUrl: "./group-users.component.html",
  styleUrl: "./group-users.component.scss",
})
export class GroupUsersComponent implements OnInit {
  columns = [
    {
      title: this.translate.instant("FullName"),
      index: "name",
    },
    {
      title: this.translate.instant("DateTime"),
      index: "insertDateTime",
    },
  ];

  constructor(
    public groupUsersService: GroupUsersService,
    private translate: TranslateService
  ) {}
  listOfData;
  ngOnInit(): void {
    debugger;

    var data = this.groupUsersService.getList(1);
    this.listOfData = data;
  }
}
