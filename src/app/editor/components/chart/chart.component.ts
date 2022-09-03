import { Component, Input, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { createChart } from "lightweight-charts";

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
  ngOnInit(): void {
    var w = window.innerWidth - 20;
    let div = document.getElementById("chart-box");
    this.chart = createChart(div, {
      width: w,
      height: this.height - 40,
      layout: {
        backgroundColor: "#041a2e",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });
    const series = this.chart.addCandlestickSeries();
    this.isSpinning = true;
    this.http
      .get<[]>(
        `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=2000`
      )
      .subscribe((data) => {
        var cdata = data.map((d) => {
          return {
            time: new Date(parseInt(d[0])).toISOString(),
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        this.isSpinning = false;
        series.setData(cdata);
        this.chart.timeScale().fitContent();
        let datesForMarkers = [
          cdata[cdata.length - 39],
          data[cdata.length - 19],
        ];
        var indexOfMinPrice = 0;
        for (var i = 1; i < datesForMarkers.length; i++) {
          if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
            indexOfMinPrice = i;
          }
        }
        var markers = [
          {
            time: cdata[cdata.length - 48].time,
            position: "aboveBar",
            color: "#f68410",
            shape: "circle",
            text: "D",
          },
        ];
        for (var i = 0; i < datesForMarkers.length; i++) {
          if (i !== indexOfMinPrice) {
            markers.push({
              time: datesForMarkers[i].time,
              position: "aboveBar",
              color: "#e91e63",
              shape: "arrowDown",
              text: "Sell @ " + Math.floor(datesForMarkers[i].high + 2),
            });
          } else {
            markers.push({
              time: datesForMarkers[i].time,
              position: "belowBar",
              color: "#2196F3",
              shape: "arrowUp",
              text: "Buy @ " + Math.floor(datesForMarkers[i].low - 2),
            });
          }
        }
        // series.setMarkers(markers);
      });
  }
  resize(width, height) {
    this.chart.resize(width, height);
  }
}
