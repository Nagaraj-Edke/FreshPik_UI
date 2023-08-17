import { AbstractControl, ValidationErrors, ValidatorFn,AsyncValidatorFn, FormControl } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { delay, map } from 'rxjs/operators';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const hasUppercase = uppercaseRegex.test(value);
    const hasLowercase = lowercaseRegex.test(value);
    const hasDigit = digitRegex.test(value);
    const hasSpecialChar = specialCharRegex.test(value);
    const isMinLength = value.length >= 8;

    const errors: ValidationErrors = {};

    if (!hasUppercase) {
      errors['missingUppercase'] = true;
    }

    if (!hasLowercase) {
      errors['missingLowercase'] = true;
    }

    if (!hasDigit) {
      errors['missingDigit'] = true;
    }

    if (!hasSpecialChar) {
      errors['missingSpecialChar'] = true;
    }

    if (!isMinLength) {
      errors['minLength'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };

  
}

// export function asyncUsernameValidator(): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     const value = control.value;
//     return of(null).pipe(
//       delay(1000),
//       map(() => null)
//     );
//   };
// }