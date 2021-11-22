import { ServerlogService } from "./../../services/serverlog.service";
import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";

@Component({
  selector: "app-serverlog-list",
  templateUrl: "./serverlog-list.component.html",
  styleUrls: ["./serverlog-list.component.scss"],
})
export class ServerlogListComponent implements OnInit {
  columns = [
    {
      title: "شناسه",
      index: "id",
      width: "5%",
    },
    {
      title: "نام کاربری",
      index: "userName",
      width: "100px",
      fixed: true,
    },
    {
      title: "پیام",
      index: "message",
      width: "45%",
      showTooltip: true,
    },
    {
      title: "آدرس",
      index: "url",
      width: "30%",
    },
    {
      title: "تاریخ",
      index: "logged",
      type: AxTableColumnType.DateTime,
      width: "10%",
    },
  ];

  constructor(public serverlogService: ServerlogService) {}

  ngOnInit(): void {}
}
