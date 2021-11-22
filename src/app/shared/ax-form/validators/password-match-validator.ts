import { AbstractControl } from "@angular/forms";

export function passwordMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value || {};

  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return {
    fieldMatch: { message: "با رمز عبور وارد شده تطابق ندارد" },
  };
}
