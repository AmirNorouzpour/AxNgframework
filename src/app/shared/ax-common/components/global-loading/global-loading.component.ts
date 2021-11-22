import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderService } from "./../../../services";
import { LoaderState } from "shared/models";

@Component({
  selector: "ax-global-loading",
  templateUrl: "./global-loading.component.html",
  styleUrls: ["./global-loading.component.scss"],
})
export class GlobalLoadingComponent implements OnInit {
  show: boolean = false;
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
      this.cdr.detectChanges();
    });
  }
}
