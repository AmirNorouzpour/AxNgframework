import { AxTreeComponent } from "./../../../../shared/ax-report/components/ax-tree/ax-tree.component";
import { Subject } from "rxjs";
import {
  Component,
  ComponentRef,
  Injector,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { map } from "rxjs/operators";
import { AxForm } from "shared/ax-form";
import { Authorization } from "../../models/authorization.model";
import { UserService } from "../../services";
import { AuthorizationService } from "../../services/authorization.service";
import { AuthorizationTreeComponent } from "../authorization-tree/authorization-tree.component";
import { TranslateService } from "@ngx-translate/core";
import { SnackBarService } from "shared/services/snack-bar.service";

@Component({
  selector: "app-authorization-form",
  templateUrl: "./authorization-form.component.html",
  styleUrls: ["./authorization-form.component.scss"],
})
export class AuthorizationFormComponent
  extends AxForm<Authorization>
  implements OnInit
{
  $userId: Subject<string> = new Subject<string>();

  constructor(
    public service: AuthorizationService,
    injector: Injector,
    private translator: TranslateService,
    public userService: UserService,
    public snackBarService: SnackBarService
  ) {
    super(service, injector);
  }

  update() {
    this.service
      .savePermissions([1, this.$userId], null)
      .subscribe((result) => {
        this.snackBarService.showSuccessMessage(result.message);
      });
  }

  setModelForCreate(data) {}

  setModelForUpdate(data) {
    const { userDetail } = data || {};
    this.baseFormComponent.model = userDetail;
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
          title: this.translator.instant("Authoriztion"),
        },
        fieldGroup: [
          {
            wrappers: ["row"],
            templateOptions: {
              colSpan: 8,
              colXs: 24,
              colSm: 24,
              colMd: 6,
            },
            fieldGroup: [
              {
                key: "UserId",
                type: "select",
                hooks: {
                  onInit: (field) => {
                    field.form
                      .get("UserId")
                      .valueChanges.subscribe((userId) => {
                        this.$userId.next(userId);
                      });
                  },
                },
                templateOptions: {
                  label: this.translator.instant("Lable/GroupLable"),
                  lazyLoad: true,
                  labelProp: "name",
                  valueProp: "id",
                  groupProp: "groupLabel",
                  required: true,
                  loadData: (searchTerm) => {
                    return this.userService
                      .getUsersAndGroups(null, {
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
          {
            type: "dynamic-field",
            templateOptions: {
              component: AuthorizationTreeComponent,
              onInit: (e: {
                fieldRef: ComponentRef<AuthorizationTreeComponent>;
              }) => {
                this.$userId.subscribe((userId) => {
                  e.fieldRef.instance.userId = userId;
                  e.fieldRef.instance.ngOnChanges();
                  console.log(
                    e.fieldRef.instance.axTreeComponent.onCheckBoxChange.subscribe(
                      (e) => {
                        console.log(e);
                      }
                    )
                  );
                });
              },
            },
          },
        ],
      },
    ];
  }

  ngOnInit(): void {}
}
