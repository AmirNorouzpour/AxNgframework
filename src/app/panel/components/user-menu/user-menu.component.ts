import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "./../../../auth";
import { Router } from "@angular/router";
import { environment } from "environments/environment";

@Component({
  selector: "ax-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService
      .logout()
      .subscribe((result) => this.router.navigate([environment.authRoute]));
  }
}
