import { Component, Input, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { createChart, CrosshairMode } from "lightweight-charts";

@Component({
  selector: "ax-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  constructor(private http: HttpClient) {}
  isSpinning;
  private _height: number;
  @Input() set height(value) {
    this._height = value;
    this.resize(window.innerWidth - 20, this._height - 40);
  }
  get height() {
    return this._height;
  }
  chart;
  ohlc;
  cdata;
  ngOnInit(): void {
    var w = window.innerWidth - 20;
    let div = document.getElementById("chart-box");
    this.chart = createChart(div, {
      width: w,
      height: this.height - 40,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      layout: {
        backgroundColor: "#041a2e",
        textColor: "rgba(255, 255, 255, 0.9)",
        fontSize: 12,
        fontFamily: "Inter",
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
        const prices = param.seriesPrices.get(series);
        this.ohlc = prices;
      } else {
        this.ohlc = this.cdata[this.cdata.length - 1];
      }
      this.ohlc.color =
        this.ohlc.close > this.ohlc.open ? "#f23645" : "#089981";
    });
    const series = this.chart.addCandlestickSeries();
    this.isSpinning = true;
    this.http
      .get<[]>(
        `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1h&limit=2000`
      )
      .subscribe((data) => {
        this.cdata = data.map((d) => {
          return {
            time: parseInt(d[0]) / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        this.isSpinning = false;
        series.setData(this.cdata);
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

        series.setMarkers(markers);
      });
  }
  resize(width, height) {
    this.chart.resize(width, height);
  }
}
