import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  ChartOptions,
  ChartTooltipModel,
  ChartTooltipItem,
  ChartData,
} from "chart.js";
import { PieChart } from "shared/ax-charts/models/pie-chart.model";
import { Color } from "ng2-charts";
import {
  RED_COLOR,
  YELLOW_COLOR,
  ORANGE_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
} from "./../../utils/chart-color";

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
  @Input() model: PieChart;
  @Input() pieChartType: "pie" | "doughnut" = "pie";
  @Input() showLegend: boolean = true;
  @Input() chartId: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  public pieChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      bodyFontFamily: "IranSans",
      callbacks: {
        label: (item: ChartTooltipItem, data: ChartData) => {
          const { index, datasetIndex } = item;
          const dataset = data.datasets[datasetIndex].data;
          const total = (<number[]>dataset).reduce((acc, curr) => acc + curr);
          const value = <number>dataset[index];
          const percentage = ((value / total) * 100).toFixed(1);

          return `${data.labels[index]} (${percentage}%) : ${value}`;
        },
      },
    },
    maintainAspectRatio: false,
    legend: {
      position: "top",
      labels: {
        fontFamily: "IranSans",
      },
    },
  };

  public pieChartColors: Color[] = [
    {
      backgroundColor: [
        RED_COLOR,
        BLUE_COLOR,
        GREEN_COLOR,
        ORANGE_COLOR,
        YELLOW_COLOR,
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}

  public handleClick({ event, active }): void {
    const index = active[0]["_index"];
    const label = this.model.labels[index];

    this.onClick.emit(label.tag);
  }
}
