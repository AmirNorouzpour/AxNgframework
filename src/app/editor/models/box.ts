import { Indicator } from "./indicator";

export class Box {
  constructor(title, id, indicator) {
    this.title = title;
    this.id = id;
    this.indicator = indicator;
  }
  title: string;
  id: string;
  indicator: Indicator;
}
