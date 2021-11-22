import { environment } from "environments/environment";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  loginBtnDisabled: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return;
    }

    const { value: formValue } = form;
    const { username, password } = formValue;

    this.loginBtnDisabled = true;
    this.authService.login(username, password).subscribe(
      (result) => {
        this.router.navigate([environment.panelRoute]);
      },
      (e) => {
        this.errorMessage = e.message;
        this.loginBtnDisabled = false;
      },
      () => {
        //this.loginBtnDisabled = false;
      }
    );
  }
}
