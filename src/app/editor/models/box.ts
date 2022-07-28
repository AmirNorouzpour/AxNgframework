import { Indicator } from "./indicator";

export class Box {
  constructor(title, indicator: Indicator) {
    this.title = title;
    this.indicator = indicator;
  }
  title: string;
  indicator: Indicator;
}
