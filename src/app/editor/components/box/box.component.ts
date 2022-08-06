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
  @Input() location = [];
  @Input() indicator: Indicator;
  @Output() Move = new EventEmitter<any>();
  @Output() Click = new EventEmitter<any>();
  @Output() ParameterClick = new EventEmitter<any>();
  ngOnInit(): void {}

  moved($event) {
    this.Move.emit($event);
  }
  clicked($event) {
    this.Click.emit(this);
  }

  parameterClicked($event, parameter) {
    this.ParameterClick.emit({
      obj: this,
      event: $event,
      parameter: parameter,
    });
  }

  styleObject(): Object {
    var res = { border: "", left: "0px", top: "0px" };
    if (this.hasBorder) res.border = "1px solid #185691";
    if (this.location[0]) res.left = this.location[0] + "px";
    if (this.location[1]) res.top = this.location[1] + "px";

    return res;
  }
}
