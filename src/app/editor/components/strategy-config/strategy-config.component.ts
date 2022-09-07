import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzFormTooltipIcon } from "ng-zorro-antd/form";
import { NzModalService } from "ng-zorro-antd/modal";
import { ChartConfig } from "../../models/chartConfig";

@Component({
  selector: "strategy-config",
  templateUrl: "./strategy-config.component.html",
  styleUrls: ["./strategy-config.component.scss"],
})
export class StrategyConfigComponent implements OnInit {
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: "info-circle",
    theme: "twotone",
  };
  amount;
  market;
  account;
  interval;
  onSave() {
    if (this.validateForm.valid) {
      this.modalService.closeAll();

      var chartConfig = new ChartConfig(
        this.validateForm.value.market,
        this.validateForm.value.interval,
        "BINANCE"
      );
   
      return chartConfig;
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      market: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      interval: [null, [Validators.required]],
    });
  }
}
