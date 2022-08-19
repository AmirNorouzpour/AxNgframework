import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { EditorService } from "../../services/editor.service";

@Component({
  selector: "app-strategy-list",
  templateUrl: "./strategy-list.component.html",
  styleUrls: ["./strategy-list.component.scss"],
})
export class StrategyListComponent implements OnInit {
  constructor(
    private editorService: EditorService,
    private modalService: NzModalService
  ) {}
  data;
  @Output() onEdit = new EventEmitter<any>();
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.editorService.GetUserStrategies().subscribe((result) => {
      this.data = result.data;
    });
  }

  onEditClick(item) {
    this.onEdit.emit(item);
  }

  versionChange(event) {}
}
