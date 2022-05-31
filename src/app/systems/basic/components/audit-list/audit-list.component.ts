import { Component, OnInit } from "@angular/core";
import { AuditService } from "../../services/audit.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-audit-list",
  templateUrl: "./audit-list.component.html",
  styleUrls: ["./audit-list.component.scss"],
})
export class AuditListComponent implements OnInit {
  columns = [
    {
      title: this.translate.instant("Table"),
      index: "tableName",
    },
    {
      title: this.translate.instant("Key"),
      index: "primaryKey",
    },
    {
      title: this.translate.instant("User"),
      index: "userDisplay",
    },
    {
      title: this.translate.instant("Type"),
      index: "auditTypeDisplay",
    },
    {
      title: this.translate.instant("DateTime"),
      index: "entityInsertDateTime",
    },
  ];
  constructor(public auditService: AuditService, private translate: TranslateService) { }

  ngOnInit(): void { }
}
