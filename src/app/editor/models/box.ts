import { Indicator } from "./indicator";

export class Box {
  constructor(title, id, indicator, transform) {
    this.title = title;
    this.id = id;
    this.indicator = indicator;
    this.transform = transform;
    if (!transform) this.transform = "translate3d(0px,0px,px)";
  }
  title: string;
  id: string;
  indicator: Indicator;
  transform;
}
