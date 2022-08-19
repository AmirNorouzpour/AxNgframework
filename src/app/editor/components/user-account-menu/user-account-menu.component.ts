import { Component, OnInit } from "@angular/core";

@Component({
  selector: "user-account-menu",
  templateUrl: "./user-account-menu.component.html",
  styleUrls: ["./user-account-menu.component.scss"],
})
export class UserAccountMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logout() {
    // this.authService
    //   .logout()
    //   .subscribe((result) => this.router.navigate([environment.authRoute]));
  }
}
