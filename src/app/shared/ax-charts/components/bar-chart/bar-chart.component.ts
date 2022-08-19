import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
} from "@angular/core";
import { BarChart } from "shared/ax-charts/models/bar-chart.model";
import { ChartOptions } from "chart.js";
import { Color } from "ng2-charts";
import {
  RED_COLOR,
  YELLOW_COLOR,
  ORANGE_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
} from "./../../utils/chart-color";

@Component({
  selector: "ax-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-bar-chart",
  },
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() model: BarChart;
  @Input() chartId: number;

  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      bodyFontFamily: "Inter",
      titleFontFamily: "Inter",
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          id: "x",
          ticks: {
            fontFamily: "Inter",
            minRotation: 45,
          },
        },
      ],
      yAxes: [
        {
          id: "y",
          ticks: {
            fontFamily: "Inter",
            min: 0,
            stepSize: 10,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
    legend: {
      labels: {
        fontFamily: "Inter",
      },
    },
  };

  public barChartColors: Color[] = [
    {
      backgroundColor: RED_COLOR,
    },
    {
      backgroundColor: BLUE_COLOR,
    },
    {
      backgroundColor: GREEN_COLOR,
    },
    {
      backgroundColor: ORANGE_COLOR,
    },
    {
      backgroundColor: YELLOW_COLOR,
    },
  ];

  public barChartLegend = true;

  constructor() {}

  ngOnInit() {
    this.barChartOptions = Object.assign({}, this.barChartOptions, {
      animation: {
        duration: 1000,
      },
    });
  }
  ngOnChanges() {
    this.barChartOptions = Object.assign({}, this.barChartOptions, {
      animation: {
        duration: 0,
      },
    });
  }
}
