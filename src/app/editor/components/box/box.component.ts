import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Indicator } from "../../models/indicator";

@Component({
  selector: "box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BoxComponent implements OnInit {
  constructor() {}
  @Input() name = "";
  @Input() indicator: Indicator;
  @Output() MoveEvent = new EventEmitter<any>();
  ngOnInit(): void {
    debugger;
  }

  moved($event) {
    this.MoveEvent.emit($event);
  }
}
