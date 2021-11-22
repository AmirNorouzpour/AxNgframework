import { UserService } from "./../../../basic/services/user.service";
import { FactoryService } from "./../../services/factory.service";
import { PersonnelService } from "./../../services/personnel.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Personnel } from "../../models/personnel.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-personnel-form",
  templateUrl: "./personnel-form.component.html",
  styleUrls: ["./personnel-form.component.scss"],
})
export class PersonnelFormComponent extends AxForm<Personnel>
  implements OnInit {
  redirectUrl = "/panel/tracking/personnels";
  editParam = "personnelId";
  constructor(
    protected httpService: PersonnelService,
    protected factoryService: FactoryService,
    protected userService: UserService,
    injector: Injector
  ) {
    super(httpService, injector);
  }
  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { personnelDetail } = data || {};
    this.baseFormComponent.model = personnelDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "پرسنل جدید",
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
          title: "مشخصات پرسنل",
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
                key: "code",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: "کد پرسنل",
                  required: true,
                },
              },
              {
                key: "userId",
                type: "select",
                templateOptions: {
                  label: "نام کاربری",
                  lazyLoad: true,
                  labelProp: "userName",
                  valueProp: "id",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.userService
                      .getList(null, {
                        "Filters[0].Property": "userName",
                        "Filters[0].Value1": searchTerm,
                        "Filters[0].Operation": 2,
                      })
                      .pipe(map((result) => result.data));
                  },
                },
              },
              {
                key: "factoryId",
                type: "select",
                templateOptions: {
                  label: "کارخانه",
                  lazyLoad: true,
                  labelProp: "name",
                  valueProp: "id",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.factoryService
                      .getList(null, {
                        "Filters[0].Property": "name",
                        "Filters[0].Value1": searchTerm,
                        "Filters[0].Operation": 2,
                      })
                      .pipe(map((result) => result.data));
                  },
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
