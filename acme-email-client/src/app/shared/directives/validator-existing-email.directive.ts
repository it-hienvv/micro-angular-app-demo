
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Status } from '@core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



export function existingEmailValidator(validationService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const value = control.value.trim();
        const objValidatiton = {
            email: value
        }
        return validationService.validate(objValidatiton).pipe(
            map((res: any) => {
                if (res && res.code !== Status.SUCCESS) {
                    return { 'ebanking.invalid.2015': true };
                } else {
                    return null;
                }
            }),
            catchError(error => {
                if (error && error.status === 404) {
                    return of(null)
                } else {
                    return of({ 'ebanking.invalid.2015': true })
                }
            })
        )
    }
    
}

export function HeadEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length > 0 && /^-?[\d.]+(?:e-?\d+)?$/.test(value.charAt(0))) {
            return { errorHeadEmail: true }
        } else {
            return null;
        }
    };
}

export function EmailFullValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length > 0 && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            return { errorFullEmail: true }
        } else {
            return null;
        }
    };
}
// Validate Email sổ phụ chỉ đc chưa các ký tự đặc biệc ! # $ % & ' ( ) * +  - .  : ; < = > @ [ ] _
export function MultiEmailFullValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length > 0) {
            if (value && value.length > 3) {
                return { errorLengthEmail: true }
            } else {
                let isValid = false;
                value.forEach((email: any) => {
                    if (email && typeof email === 'string' || email instanceof String) {
                        if (!/^(([^\?/\|\\,\{\}\s@"]+(\.[^\?/\|\\,\{\}\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toString())) {
                            isValid = true;
                            return;
                        }
                    } else {
                        if (!/^(([^\?/\|\\,\{\}\s@"]+(\.[^\?/\|\\,\{\}\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.label)) {
                            isValid = true;
                            return;
                        }
                    }
                });
                if (isValid) {
                    return { errorFullEmail: true }
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    };
}