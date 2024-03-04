import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from "ng-apexcharts";
import { PieChart } from "shared/ax-charts/models/pie-chart.model";
import {
  RED_COLOR,
  YELLOW_COLOR,
  ORANGE_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
} from "./../../utils/chart-color";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  dataLabels: any;
  fill: ApexFill;
  labels: any;
  colors: any[];
  legend: ApexLegend;
};

@Component({
  selector: "ax-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "ax-pie-chart",
  },
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() model: PieChart;
  @Input() pieChartType: "pie" | "doughnut" = "pie";
  @Input() showLegend: boolean = true;
  @Input() chartId: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   tooltips: {
  //     bodyFontFamily: "Inter",
  //     callbacks: {
  //       label: (item: ChartTooltipItem, data: ChartData) => {
  //         const { index, datasetIndex } = item;
  //         const dataset = data.datasets[datasetIndex].data;
  //         const total = (<number[]>dataset).reduce((acc, curr) => acc + curr);
  //         const value = <number>dataset[index];
  //         const percentage = ((value / total) * 100).toFixed(1);

  //         return `${data.labels[index]} (${percentage}%) : ${value}`;
  //       },
  //     },
  //   },
  //   maintainAspectRatio: false,
  //   legend: {
  //     position: "top",
  //     labels: {
  //       fontFamily: "Inter",
  //     },
  //   },
  // };

  // public pieChartColors: Color[] = [
  //   {
  //     backgroundColor: [
  //       RED_COLOR,
  //       BLUE_COLOR,
  //       GREEN_COLOR,
  //       ORANGE_COLOR,
  //       YELLOW_COLOR,
  //     ],
  //   },
  // ];

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: this.model.series.data,
      chart: {
        height: 280,
        type: "pie",
        fontFamily: 1 == 1 ? "IranSans" : "Inter",
        events: {
          click(event, chartContext, config) {
            console.log(config.config.series[config.seriesIndex]);
            console.log(config.config.series[config.seriesIndex].name);
            console.log(
              config.config.series[config.seriesIndex].data[
                config.dataPointIndex
              ]
            );
          },
        },
      },
      legend: {
        position: "top",
        show: false,
      },
      dataLabels: { dropShadow: false },
      colors: [RED_COLOR, BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR, YELLOW_COLOR],
      labels: this.model.labels.map(function (item) {
        return item.name;
      }),
      responsive: [
        {
          breakpoint: 780,
          options: {
            chart: {
              // width: "100%",
              height: 150,
            },
          },
        },
      ],
    };
  }
}
