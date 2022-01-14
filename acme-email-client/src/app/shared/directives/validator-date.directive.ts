
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function ErrorCompareTwoDate(form: any, date1: string, date2: string, isError: Boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateValue1 = typeof form.get(date1)?.value === 'object' ? form.get(date1)?.value?.format('YYYY-MM-DD') : form.get(date1)?.value;
    const dateValue2 = typeof form.get(date2)?.value === 'object' ? form.get(date2)?.value?.format('YYYY-MM-DD') : form.get(date2)?.value;
    const currentDate = new Date();
    if (isError && dateValue1 != '' && moment(dateValue1) > moment()) {
      return { errorFutureDate: true }
    }
    if (!isError && dateValue2 != '' && moment(dateValue2) > moment()) {
      return { errorFutureDate: true }
    }
    const res = {}
    if (dateValue1 && dateValue2) {
      if (moment(dateValue1).isAfter(dateValue2)) {
        if (!isError && form.get(date1).hasError(date1)) {
          form.get(date1).setErrors(null);
        }
        if (isError && form.get(date2).hasError(date2)) {
          form.get(date2).setErrors(null);
        }
        if(!isError){
          res[date2] = true
        } else {
          res[date1] = true
        }
        return res;
      }
    }
    if (!isError && form.get(date1).hasError(date1)) {
      form.get(date1).setValue(form.get(date1).value);
    }
    if (isError && form.get(date2).hasError(date2)) {
      form.get(date2).setValue(form.get(date2).value);
    }
    return null;
  };
}

export function ErrorCompareTwoDateNotFuture(form: any, date1: string, date2: string, isDate1: Boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateValue1 = typeof form.get(date1)?.value === 'object' ? form.get(date1)?.value?.format('YYYY-MM-DD') : form.get(date1)?.value;
    const dateValue2 = typeof form.get(date2)?.value === 'object' ? form.get(date2)?.value?.format('YYYY-MM-DD') : form.get(date2)?.value;
    const res = {}
    if (dateValue1 && dateValue2) {
      if (moment(dateValue1).isAfter(dateValue2)) {
        if (!isDate1 && form.get(date1).hasError(date1)) {
          form.get(date1).setErrors(null);
        }
        if (isDate1 && form.get(date2).hasError(date2)) {
          form.get(date2).setErrors(null);
        }
        if(!isDate1){
          res[date2] = true
        } else {
          res[date1] = true
        }
        return res;
      }
    }
    if (!isDate1 && form.get(date1).hasError(date1)) {
      form.get(date1).setValue(form.get(date1).value);
    }
    if (isDate1 && form.get(date2).hasError(date2)) {
      form.get(date2).setValue(form.get(date2).value);
    }
    return null;
  };
}