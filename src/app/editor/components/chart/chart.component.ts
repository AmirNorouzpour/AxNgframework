import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { createChart, CrosshairMode } from "lightweight-charts";
import { ChartsService } from "../../services/charts.service";
import { ChartConfig } from "../../models/chartConfig";
import { ChartUpdateService } from "../../services/chart-update.service";

@Component({
  selector: "ax-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  constructor(
    private chartsService: ChartsService,
    private chartUpdateService: ChartUpdateService
  ) {}
  isSpinning;
  private _height: number;
  private _config: ChartConfig;
  @Input() set height(value) {
    this._height = value;
    this.resize(window.innerWidth - 20, this._height - 40);
  }
  get height() {
    return this._height;
  }

  @Input() set config(value) {
    this._config = value;
    this.loadFromServer();
  }
  get config() {
    return this._config;
  }
  chart;
  ohlc;
  cdata;

  ngOnDestroy() {
    this.chartUpdateService.removeUpdateChartListener();
  }

  currentBar;
  isNew;
  ngOnInit(): void {
    this.chartUpdateService.listenToUpdateChart();
    this.chartUpdateService.onDataReceived.subscribe((data) => {
      if (data && this.currentBar) {
        if (!this.isNew) {
          this.currentBar.close = data.close;
          this.currentBar.high = data.high;
          this.currentBar.low = data.low;
        } else {
          this.currentBar = {
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            time: this.currentBar.time + 60 * parseInt(this.config.interval),
          };
          this.isNew = false;
        }
        if (data.final) this.isNew = true;
        if (this.ohlc) {
          this.ohlc.close = this.currentBar.close;
          this.ohlc.open = this.currentBar.open;
          this.ohlc.high = this.currentBar.high;
          this.ohlc.low = this.currentBar.low;
          this.ohlc.color =
            this.ohlc.close < this.ohlc.open ? "#f23645" : "#089981";
        }
        this.series.update(this.currentBar);
        // this.chartModel$.next(data);
        // this.liveChartReceivingData = true;
        // this.timeOuts.push(
        //   setTimeout(() => {
        //     this.liveChartReceivingData = false;
        //   }, 1000)
        // );
        // this.cdr.detectChanges();
      }
    });

    var w = window.innerWidth - 20;
    let div = document.getElementById("chart-box");
    this.chart = createChart(div, {
      width: w,
      height: this.height - 40,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        // backgroundColor: "#041a2e",
        textColor: "rgba(255, 255, 255, 0.9)",
        fontSize: 12,
        fontFamily: "IranSans",
      },
      grid: {
        vertLines: {
          color: "#b2b5be1c",
        },
        horzLines: {
          color: "#b2b5be1c",
        },
      },
      rightPriceScale: {
        borderColor: "#b2b5be1c",
      },
      timeScale: {
        borderColor: "#b2b5be1c",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    this.chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const prices = param.seriesPrices.get(this.series);
        this.ohlc = prices;
      } else {
        if (!this.cdata) return;
        this.ohlc = this.cdata[this.cdata.length - 1];
      }
      this.ohlc.color =
        this.ohlc.close < this.ohlc.open ? "#f23645" : "#089981";
    });
    this.series = this.chart.addCandlestickSeries();
    this.loadFromServer();
  }
  series;
  loadFromServer() {
    this.isSpinning = true;
    this.chartsService
      .GetKLines(this.config.symbol, this.config.interval)
      .subscribe((res) => {
        if (!res.isSuccess) return;

        this.cdata = res.data.map((d) => {
          return {
            time: parseInt(d[0]) / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        this.currentBar = this.cdata[this.cdata.length - 1];
        this.isSpinning = false;
        this.series.setData(this.cdata);
        // this.chart.timeScale().fitContent();
        var markers = [
          {
            time: this.cdata[this.cdata.length - 41].time,
            position: "aboveBar",
            color: "#f23645",
            shape: "arrowDown",
            text: "SHORT@" + this.cdata[this.cdata.length - 41].open,
            size: 2,
          },
          {
            time: this.cdata[this.cdata.length - 152].time,
            position: "belowBar",
            color: "#089981",
            shape: "arrowUp",
            text: "LONG@" + this.cdata[this.cdata.length - 152].open,
            size: 2,
          },
        ];

        this.series.setMarkers(markers);
      });
  }

  resize(width, height) {
    this.chart?.resize(width, height);
  }
}
