import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ShiftService } from "../../services/shift.service";

@Component({
  selector: "app-shift-list",
  templateUrl: "./shift-list.component.html",
  styleUrls: ["./shift-list.component.scss"],
})
export class ShiftListComponent implements OnInit {
  columns = [
    {
      title: "نام شیفت",
      index: "name",
      filter: {
        type: "text",
      },
    },
    {
      title: "زمان شروع",
      index: "startTime",
      filter: {
        type: "text",
      },
    },
    {
      title: "زمان پایان",
      index: "endTime",
      filter: {
        type: "text",
      },
    },
  ];
  constructor(public shiftService: ShiftService, private router: Router) {}

  handleNew() {
    this.router.navigate(["/panel/tracking/shifts/new"]);
  }

  handleEdit(id) {
    this.router.navigate(["/panel/tracking/shifts/edit/" + id]);
  }

  ngOnInit(): void {}
}
