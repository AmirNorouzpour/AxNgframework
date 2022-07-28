export class IndicatorGroup {
  constructor(title, icon) {
    this.title = title;
    this.icon = icon;
  }
  title: string;
  icon: string;
  indicators: Indicator[];
  isOpen: boolean;
  description: string;
}

export class Indicator {
  constructor(title) {
    this.title = title;
  }
  title: string;
  icon: string;
  description: string;
  parameters: IndicatorParameter[];
}

export class IndicatorParameter {
  constructor(title) {
    this.title = title;
  }
  title: string;
  type: string;
  isInput: boolean;
  description: string;
}
