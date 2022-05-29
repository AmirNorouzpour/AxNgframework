import { GroupService } from "../../services/group.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: ["./group-list.component.scss"],
})
export class GroupListComponent implements OnInit {
  columns = [
    {
      title: this.translator.instant("Group Name"),
      index: "groupName",
    },
    {
      title: this.translator.instant("Description"),
      index: "description",
    },
    {
      title: this.translator.instant("User Count"),
      index: "usersCount",
    },
  ];
  constructor(public groupService: GroupService,
    private router: Router,
    private translator: TranslateService) { }

  handleNew() {
    this.router.navigate(["/panel/basic/groups/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/basic/groups/edit/" + id]);
  }

  ngOnInit(): void { }
}
