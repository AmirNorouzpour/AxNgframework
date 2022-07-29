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
  @Input() id = "";
  @Input() hasBorder = false;
  @Input() indicator: Indicator;
  @Output() Move = new EventEmitter<any>();
  @Output() Click = new EventEmitter<any>();
  ngOnInit(): void {}

  moved($event) {
    this.Move.emit($event);
  }
  clicked($event) {
    this.Click.emit(this);
  }
}
