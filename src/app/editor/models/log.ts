export class Log {
  constructor(date, data, type) {
    this.date = date;
    this.data = data;
    this.type = type;
  }
  date: Date;
  data: string;
  type: LogTypes;

  getColor() {
    switch (this.type) {
      case LogTypes.Info:
        return "white";
      case LogTypes.Warnning:
        return "rgb(255, 232, 98)";
      case LogTypes.Error:
        return "rgb(253, 38, 38)";
      case LogTypes.Success:
        return "rgb(45, 221, 22)";
      default:
        return "white";
    }
  }

  getTitle() {
    return LogTypes[this.type];
  }
}

enum LogTypes {
  Info = 0,
  Warnning = 1,
  Error = 2,
  Success = 3,
}
