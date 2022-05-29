import { GroupService } from "../../services/group.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: ["./group-list.component.scss"],
})
export class GroupListComponent implements OnInit {
  columns = [
    {
      title: "Group Name",
      index: "groupName",
    },
    {
      title: "Description",
      index: "description",
    },
    {
      title: "User Count",
      index: "usersCount",
    },
  ];
  constructor(public groupService: GroupService, private router: Router) {}

  handleNew() {
    this.router.navigate(["/panel/basic/groups/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/basic/groups/edit/" + id]);
  }

  ngOnInit(): void {}
}
