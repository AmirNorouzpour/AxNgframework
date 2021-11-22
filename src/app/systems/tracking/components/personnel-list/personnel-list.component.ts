import { PersonnelService } from "./../../services/personnel.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-personnel-list",
  templateUrl: "./personnel-list.component.html",
  styleUrls: ["./personnel-list.component.scss"],
})
export class PersonnelListComponent implements OnInit {
  columns = [
    {
      title: "نام و نام خانوادگی",
      index: "userName",
      filter: {
        type: "text",
      },
    },
    {
      title: "کد پرسنلی",
      index: "code",
      filter: {
        type: "text",
      },
    },
    {
      title: "نام کارخانه",
      index: "factoryName",
      filter: {
        type: "text",
      },
    },
  ];
  constructor(
    public personnelService: PersonnelService,
    private router: Router
  ) {}

  handleNew() {
    this.router.navigate(["/panel/tracking/personnels/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/personnels/edit/" + id]);
  }

  ngOnInit(): void {}
}
