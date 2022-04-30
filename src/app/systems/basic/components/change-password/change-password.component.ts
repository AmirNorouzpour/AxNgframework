import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/operators";
import { SnackBarService } from "shared/services/snack-bar.service";
import { UserService } from "../../services";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  oldPwd = "";
  newPwd = "";
  reNewPwd = "";
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      newPwd: [null, [Validators.required]],
      reNewPwd: [null, [Validators.required]],
    });
  }

  onSave(id) {
    this.validateForm.value;
    var data = {
      Id: id.value,
      Password: this.validateForm.value.newPwd,
      RePassword: this.validateForm.value.reNewPwd,
    };
    return this.userService.changePassword(data).subscribe((result) => {
      if (result.isSuccess) {
        this.snackBarService.showSuccessMessage(result.data);
        this.modal.close();
      } else this.snackBarService.showErrorMessage(result.data);
    });
  }
}
