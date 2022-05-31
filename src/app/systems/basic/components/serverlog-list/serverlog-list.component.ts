import { ServerlogService } from "./../../services/serverlog.service";
import { Component, OnInit } from "@angular/core";
import { AxTableColumnType } from "shared/ax-common/model/ax-table-column-type";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-serverlog-list",
  templateUrl: "./serverlog-list.component.html",
  styleUrls: ["./serverlog-list.component.scss"],
})
export class ServerlogListComponent implements OnInit {
  columns = [
    {
      title: this.translate.instant("Id"),
      index: "id",
      width: "5%",
    },
    {
      title: this.translate.instant("Username"),
      index: "userName",
      width: "100px",
      fixed: true,
    },
    {
      title: this.translate.instant("Message"),
      index: "message",
      width: "45%",
      showTooltip: true,
    },
    {
      title: this.translate.instant("Address"),
      index: "url",
      width: "25%",
    },
    {
      title: this.translate.instant("DateTime"),
      index: "logged",
      type: AxTableColumnType.DateTime,
      width: "15%",
    },
  ];

  constructor(public serverlogService: ServerlogService, private translate: TranslateService) { }

  ngOnInit(): void { }
}
