import { GroupService } from "./../../services/group.service";
import { Component, OnInit, Injector } from "@angular/core";
import { AxForm } from "shared/ax-form";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormConfig } from "shared/ax-form/models/form-config";
import { Group } from "../../models/group.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-group-form",
  templateUrl: "./group-form.component.html",
  styleUrls: ["./group-form.component.scss"],
})
export class GroupFormComponent extends AxForm<Group> implements OnInit {
  redirectUrl = "/panel/basic/groups";
  editParam = "groupId";
  constructor(protected httpService: GroupService, injector: Injector, private translator: TranslateService) {
    super(httpService, injector);
  }
  setModelForCreate(data) { }

  setModelForUpdate(data) {
    const { groupDetail } = data || {};
    this.baseFormComponent.model = groupDetail;
  }

  getConfig(): FormConfig {
    return {
      title: "New Group",
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
          title: this.translator.instant("Group Details"),
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
                key: "GroupName",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: this.translator.instant("Group Name"),
                  required: true,
                },
              },
              {
                key: "Description",
                type: "input",
                templateOptions: {
                  type: "text",
                  label: this.translator.instant("Description"),
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ];
  }

  ngOnInit(): void { }
}
