import { Component, OnInit } from "@angular/core";
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
    private modalService: NzModalService,
    private router: Router
  ) {}
  data;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.editorService.GetUserStrategies().subscribe((result) => {
      this.data = result.data;
    });
  }

  onEdit(item) {
    this.modalService.closeAll();
    // var routerLink = "/editor/" + item.unique;
    // this.router.navigate([routerLink]);
    // debugger;
    // this.router.navigateByUrl(routerLink);
  }

  versionChange(event) {}
}
