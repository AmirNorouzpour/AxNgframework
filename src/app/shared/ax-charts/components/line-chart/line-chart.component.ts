import { LineChart } from "./../../models/line-chart.model";
import { Component, OnInit, Input } from "@angular/core";
import { ChartOptions } from "chart.js";

@Component({
  selector: "ax-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  @Input() chartId: number;
  @Input() model: LineChart;

  public lineChartLegend = true;
  public lineChartType = "line";

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontFamily: "Inter",
      },
    },
    tooltips: {
      bodyFontFamily: "Inter",
      titleFontFamily: "Inter",
    },
    scales: {
      xAxes: [
        {
          id: "x",
          ticks: {
            fontFamily: "Inter",
          },
        },
      ],
      yAxes: [
        {
          id: "y",
          ticks: {
            fontFamily: "Inter",
            min: 0,
          },
        },
      ],
    },
  };

  constructor() {}

  ngOnInit() {
    this.lineChartOptions = Object.assign({}, this.lineChartOptions, {
      animation: {
        duration: 1000,
      },
    });
  }
  ngOnChanges() {
    this.lineChartOptions = Object.assign({}, this.lineChartOptions, {
      animation: {
        duration: 0,
      },
    });
  }
}
