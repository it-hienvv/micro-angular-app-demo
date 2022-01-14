
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ErrorSameCusName(cusName: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value != null ? control.value.trim() : null;
    // console.log(value, cusName, 'cusNamecusNamecusNamecusName')
    if (value?.toString().toUpperCase() === cusName?.toString().toUpperCase()) {
      return { errorSameCusName: true };
    }
    return null;
  };
}

export function ErrorSameIdentifyId(identifyId: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === identifyId) {
      return { errorSameIdentifyId: true };
    }
    return null;
  };
}

export function ErrorSamePhoneNo(phoneNo: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === phoneNo) {
      return { errorSamePhoneNo: true };
    }
    return null;
  };
}

export function ErrorSameSubCardCusName(listSubCard: any, form): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const idCode = form.get('idCode').value;
    if (idCode) {
      const obj = listSubCard.find(element => element.customerName === value && element.idCode === idCode);
      if (obj) {
        return { errorSameSubCard: true };
      }
    }
    return null;
  };
}

export function ErrorSameSubCardIdCode(listSubCard: any, form): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const cusName = form.get('customerName').value;
    if (cusName) {
      const obj = listSubCard.find(element => element.idCode === value && element.customerName === cusName);
      if (obj) {
        return { errorSameSubCard: true };
      }
    }
    return null;
  };
}

// export function ErrorCompareDateOfBirth(form: any, isDateOfBirth: Boolean): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const dateOfBirth = form.get('dateOfBirth').value;
//     const idIssueDate = form.get('idIssueDate').value;
//     if (dateOfBirth && idIssueDate) {
//       if (idIssueDate < dateOfBirth) {
//         if (isDateOfBirth && form.get('idIssueDate').hasError('errorDateOfBirth')) {
//           form.get('idIssueDate').setErrors(null);
//         }
//         if (!isDateOfBirth && form.get('dateOfBirth').hasError('errorDateOfBirth')) {
//           form.get('dateOfBirth').setErrors(null);
//         }
//         return {errorDateOfBirth: true}
//       }
//     }
//     if (isDateOfBirth && form.get('idIssueDate').hasError('errorDateOfBirth')) {
//       form.get('idIssueDate').setValue(form.get('idIssueDate').value);
//     }
//     if (!isDateOfBirth && form.get('dateOfBirth').hasError('errorDateOfBirth')) {
//       form.get('dateOfBirth').setValue(form.get('dateOfBirth').value);
//     }
//     return null;
//   };
// }

export function ErrorIdCode(form: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const idCode = (form.get('idCode') || form.get('directorIdCode')).value?.trim();
    if(idCode) {
      if (idCode.toString() === '4103000416' || idCode.toString() === '0302311259' ) {
        return {errorIdCode: true}
      }
    }
    return null;
  };
}

export function ErrorFutureDateOfBirth(form: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateOfBirth = form.get('dateOfBirth').value;
    const currentDate = new Date();
    if (dateOfBirth != '' && dateOfBirth > currentDate) {
      return {errorFutureDate: true}
    }
    return null;
  };
}

export function ErrorFutureIssueDate(form: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const idIssueDate = form.get('idIssueDate').value;
    const currentDate = new Date();
    if (idIssueDate != '' && idIssueDate > currentDate)
    {
      return {errorFutureDate: true}
    }
    return null;
  };
}

export function ValidateEmbossedName(control: AbstractControl): { [key: string]: any } | null {
  const _regex = /^(([A-Za-z]*)\s([A-Za-z])*)*[A-Za-z]$/g;
  if (!control?.errors?.maxlength?.requiredLength) {
    if (control.value && !_regex.test(control.value?.trim())) {
      return { 'required': true };
    }

  }
  return null;
}
