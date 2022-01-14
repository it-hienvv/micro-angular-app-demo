
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from '@core';


export function existingPhoneValidator(validationService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const value = control.value && control.value.trim();
        if(value === 'KHONGCUNGCAP') {
            return of({ 'ebanking.invalid.2012': true })
        } else {
            const objValidatiton = {
                authenDeviceId: 'sms',
                authenDeviceValue: value,
                customerPhone: value
            }
            return validationService.validate(objValidatiton).pipe(
                map((res: any) => {
                    if (res && res.code !== Status.SUCCESS) {
                        return { 'customMesegeError': true, 'errorValue': res.message };
                    } else {
                        return null;
                    }
                }),
                catchError(error => {
                    if (error && error.status === 404) {
                        return of(null)
                    } else {
                        return of({ 'ebanking.invalid.2012': true })
                    }
                })
            )
        }
    }
}