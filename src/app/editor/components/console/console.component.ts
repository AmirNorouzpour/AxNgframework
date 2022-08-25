import { Component, OnInit } from "@angular/core";
import { Log } from "../../models/log";

@Component({
  selector: "ax-console",
  templateUrl: "./console.component.html",
  styleUrls: ["./console.component.scss"],
})
export class ConsoleComponent implements OnInit {
  constructor() {}
  logs: Array<Log> = [];
  ngOnInit(): void {
    var l = new Log(
      new Date(),
      "Your global Angular CLI version (14.1.0) is greater than your local version (13.3.9). The local Angular CLI version is used.",
      1
    );
    var l2 = new Log(
      new Date(),
      "Enabling Ivy language service for f:/AxNgFramework/AxNgFramework/tsconfig.json.",
      0
    );
    var l3 = new Log(
      new Date(),
      "No config file for f:/AxNgFramework/AxNgFramework/src/app/editor/components/footer/footer.component.html",
      2
    );
    var l4 = new Log(
      new Date(),
      "Angular language server process ID: 19652",
      3
    );
    this.logs.push(l);
    this.logs.push(l2);
    this.logs.push(l3);
    this.logs.push(l4);
  }
}
