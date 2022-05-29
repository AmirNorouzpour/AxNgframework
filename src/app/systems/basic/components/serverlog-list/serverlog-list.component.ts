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
      title: "Id",
      index: "id",
      width: "5%",
    },
    {
      title: "Username",
      index: "userName",
      width: "100px",
      fixed: true,
    },
    {
      title: "Message",
      index: "message",
      width: "45%",
      showTooltip: true,
    },
    {
      title: "Address",
      index: "url",
      width: "25%",
    },
    {
      title: "DateTime",
      index: "logged",
      type: AxTableColumnType.DateTime,
      width: "15%",
    },
  ];

  constructor(public serverlogService: ServerlogService) {}

  ngOnInit(): void {}
}
