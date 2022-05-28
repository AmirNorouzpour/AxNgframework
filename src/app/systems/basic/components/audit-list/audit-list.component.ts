import { Component, OnInit } from "@angular/core";
import { AuditService } from "../../services/audit.service";

@Component({
  selector: "app-audit-list",
  templateUrl: "./audit-list.component.html",
  styleUrls: ["./audit-list.component.scss"],
})
export class AuditListComponent implements OnInit {
  columns = [
    {
      title: "Table",
      index: "tableName",
    },
    {
      title: "Key",
      index: "primaryKey",
    },
    {
      title: "User",
      index: "userDisplay",
    },
    {
      title: "Type",
      index: "auditTypeDisplay",
    },
    {
      title: "Date Time",
      index: "entityInsertDateTime",
    },
  ];
  constructor(public auditService: AuditService) {}

  ngOnInit(): void {}
}
