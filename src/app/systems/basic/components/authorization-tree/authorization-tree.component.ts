import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { map } from "rxjs/operators";
import { AxTreeComponent } from "shared/ax-report/components/ax-tree/ax-tree.component";
import { AuthorizationService } from "../../services/authorization.service";

@Component({
  selector: "app-authorization-tree",
  templateUrl: "./authorization-tree.component.html",
  styleUrls: ["./authorization-tree.component.scss"],
})
export class AuthorizationTreeComponent implements OnInit, OnChanges {
  constructor(
    public service: AuthorizationService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() userId: string = "null";
  data: any[];
  @ViewChild(AxTreeComponent) axTreeComponent: AxTreeComponent;

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges() {
    this.loadData();
  }

  loadData() {
    if (this.userId != "null")
      this.service
        .getList([this.userId])
        .pipe(map((result) => result.data))
        .subscribe((treeData) => {
          this.data = treeData;
          this.cdr.detectChanges();
        });
  }
}
