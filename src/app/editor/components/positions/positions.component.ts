import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ax-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"],
})
export class PositionsComponent implements OnInit {
  constructor() {}
  listOfData: ItemData[] = [];
  ngOnInit(): void {
    for (let i = 0; i < 11; i++) {
      this.listOfData.push({
        Symbol: `Edward King ${i}`,
        Size: 32,
        Leverage: 32,
        Entry: 1540,
        EntryDate: "2022-09-03 18:52:30",
      });
    }
  }
}
interface ItemData {
  Symbol: string;
  Size: number;
  Entry: number;
  Leverage: number;
  EntryDate: string;
}
