import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { AuthService } from "./../../../auth";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { NzModalService } from "ng-zorro-antd/modal";
import { ChangePasswordComponent } from "src/app/systems/basic/components/change-password/change-password.component";

@Component({
  selector: "ax-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService
      .logout()
      .subscribe((result) => this.router.navigate([environment.authRoute]));
  }
  changePassword() {
    const modal = this.modal.create({
      nzTitle: "تغییر رمز عبور",
      nzContent: ChangePasswordComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => {
        alert("Asdsadasdas a dsad");
      },
      nzFooter: [
        {
          label: "تائید",
          onClick: (componentInstance) => {
            componentInstance!.onSave(0);
          },
        },
      ],
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log("[afterOpen] emitted!"));
    // Return a result when closed
    modal.afterClose.subscribe((result) =>
      console.log("[afterClose] The result is:", result)
    );
  }
}
