import { ShiftService } from "./../../services/shift.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Shift } from "../../models/shift.model";

@Component({
  selector: "app-shift-form",
  templateUrl: "./shift-form.component.html",
  styleUrls: ["./shift-form.component.scss"],
})
export class ShiftFormComponent extends AxForm<Shift> implements OnInit {
  redirectUrl = "/panel/tracking/shifts";
  editParam = "shiftId";
  constructor(protected httpService: ShiftService, injector: Injector) {
    super(httpService, injector);
  }
  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { shiftDetail } = data || {};
    this.baseFormComponent.model = shiftDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "شیفت جدید",
      icon: "",
    };
  }

  getFields(): FormlyFieldConfig[] {
    const responsiveOption = {
      labelSm: 8,
      controlSm: 16,
    };

    return [
      {
        wrappers: ["card"],
        templateOptions: {
          title: "مشخصات شیفت",
        },
        fieldGroup: [
          {
            wrappers: ["row"],
            templateOptions: {
              colSpan: 8,
              colXs: 24,
              colSm: 24,
              colMd: 12,
              colLg: 6,
              colXl: 6,
              colXXl: 6,
            },
            fieldGroup: [
              {
                key: "name",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "نام شیفت",
                  required: true,
                },
              },
              {
                key: "startTime",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "ساعت شروع",
                  required: true,
                },
              },
              {
                key: "endTime",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "ساعت پایان",
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ];
  }

  ngOnInit(): void {}
}
