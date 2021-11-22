import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  @Input() color: string;

  ellipsises: number[] = new Array(4);

  constructor() {}

  ngOnInit(): void {}
}
