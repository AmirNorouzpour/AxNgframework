import { Subject } from "rxjs";
import { Component, ComponentRef, Injector, OnInit } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { map } from "rxjs/operators";
import { AxForm } from "shared/ax-form";
import { Authorization } from "../../models/authorization.model";
import { UserService } from "../../services";
import { AuthorizationService } from "../../services/authorization.service";
import { AuthorizationTreeComponent } from "../authorization-tree/authorization-tree.component";
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
  data: Authorization[];
  userId = 0;
  ugtype = 0;

  constructor(
    public service: AuthorizationService,
    injector: Injector,
    private snackBarService: SnackBarService,
    public userService: UserService
  ) {
    super(service, injector);
  }

  update() {
    this.service
      .savePermissions([this.ugtype, this.userId], this.data)
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
          title: "حقوق دسترسی",
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
                key: "userId",
                type: "select",
                hooks: {
                  onInit: (field) => {
                    field.form.get("userId").valueChanges.subscribe((user) => {
                      debugger;
                      this.$userId.next(user.id);
                      this.userId = user.id;
                      this.ugtype = user.type;
                    });
                  },
                },
                templateOptions: {
                  label: "کاربر یا گروه کاربری",
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
                      (d) => {
                        // var aaaaa =
                        //   e.fieldRef.instance.axTreeComponent.getCheckedNodeList(e);
                        this.data = e.fieldRef.instance.data;
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
