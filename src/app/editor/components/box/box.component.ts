import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BoxComponent implements OnInit {
  constructor() {}
  @Input() name = "";
  @Output() MoveEvent = new EventEmitter<any>();
  ngOnInit(): void {}

  moved($event) {
    this.MoveEvent.emit($event);
  }
}
