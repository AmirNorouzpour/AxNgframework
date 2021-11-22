import { AxTreeNode } from "./../../../../shared/ax-report/models/ax-tree-node.model";
import { GeoService } from "./../../services/geo.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NzTreeNode } from "ng-zorro-antd/tree";

@Component({
  selector: "app-geo-tree",
  templateUrl: "./geo-tree.component.html",
  styleUrls: ["./geo-tree.component.scss"],
})
export class GeoTreeComponent implements OnInit {
  geoData: AxTreeNode[];

  constructor(public geoService: GeoService) {}

  ngOnInit(): void {}

  handleTreeExpand(node: NzTreeNode) {
    this.geoService.getChildren(node.key).subscribe((result) => {
      node.addChildren(result);
    });
  }
}
