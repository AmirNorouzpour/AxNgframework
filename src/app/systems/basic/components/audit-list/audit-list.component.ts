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
      title: "جدول",
      index: "tableName",
    },
    {
      title: "کلید",
      index: "primaryKey",
    },
    {
      title: "کاربر",
      index: "userDisplay",
    },
    {
      title: "نوع",
      index: "auditTypeDisplay",
    },
    {
      title: "زمان",
      index: "entityInsertDateTime",
    },
  ];
  constructor(public auditService: AuditService) {}

  ngOnInit(): void {}
}
