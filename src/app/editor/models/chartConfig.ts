export class ChartConfig {
  constructor(symbol, interval, broker) {
    this.symbol = symbol;
    this.interval = interval;
    this.broker = broker;
  }
  symbol: string;
  interval: string;
  broker: string;
}
