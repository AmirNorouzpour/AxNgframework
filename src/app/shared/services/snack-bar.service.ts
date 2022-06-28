import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { CustomSnackBarComponent } from "shared/ax-common/components/custom-snack-bar/custom-snack-bar.component";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccessMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["snack-bar_success"],
      politeness: "assertive",
      data: {
        message: message,
        icon: "check_circle",
      },
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["snack-bar_error"],
      politeness: "assertive",
      data: {
        message: message,
      },
    });
  }

  showWarringMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["snack-bar_warning"],
      politeness: "assertive",
      data: {
        message: message,
        icon: "cancel",
      },
    });
  }

  showMessage(message: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 500,
      verticalPosition: "bottom", // 'top' | 'bottom'
      horizontalPosition: "left",
      panelClass: ["snack-bar_success"],
      data: {
        message: message,
      },
    });
  }
}
