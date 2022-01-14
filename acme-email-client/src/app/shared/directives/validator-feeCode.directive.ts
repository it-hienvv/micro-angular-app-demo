
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Status } from '@core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export function existingFeeCodeValidator(accountService, _this, calculatorFeeClose, setFeeOfFeeCode, setAsyncValidators_chargeAmt, currencyCode): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const searchValue = control.value && control.value.trim();
        if (searchValue && searchValue != '') {
            return timer(100).pipe(
                switchMap(() => {
                    return accountService.getFeeCode(searchValue.toUpperCase(), currencyCode).pipe(
                        map((res: any) => {
                            if ((res.code !== Status.SUCCESS) || !res.data || (res.data && res.data.length === 0)) {
                                setAsyncValidators_chargeAmt.call(_this);
                                return { 'NotExistingFeeCode': true }
                            }
                            else if (res.code === Status.SUCCESS && res.data && res.data.length > 0) {
                                setFeeOfFeeCode.call(_this, res.data[0].flatAmt ? res.data[0].flatAmt : 0);
                                calculatorFeeClose.call(_this);
                            } else {
                                return of(null);
                            }
                        }),
                        catchError(error => {
                            if (error && error.status === 404) {
                                return of(null)
                            } else {
                                return of({ 'NotExistingFeeCode': true });
                            }
                        })
                    )
                })
            )
        }
        return of(null)
    }
}

export function canculatorChargeAmt(_this, calculatorFeeClose, resetValidate, currencyCode): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        let searchValue = control.value && control.value.trim();
        if (searchValue && searchValue != '') {
            if (currencyCode != 'VND') {
                searchValue = searchValue.replace(/[^0-9,.]*/g, '');
            } else {
                searchValue = searchValue.replace(/[^0-9,]*/g, '');
            }
            // const parts = searchValue.split('.');
            // if (parts[1]) {
            //     parts[1] = parts[1].length > 2 ? parts[1].slice(0, 2) : parts[1];
            // }
            const validateCurrency = /^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]*)*(?:\.[0-9]{1,2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/.test(searchValue);
            if (currencyCode != 'VND' && !validateCurrency) {
                return of({ 'errorCurrency': true });
            } else {
                resetValidate.call(_this, 'chargeAmt', searchValue);
                calculatorFeeClose.call(_this);
                return of(null);
            }
        }
        return of(null)
    }
}

export function accountIdTransferValidator(accountService, accountNameTransfer, currencyCode, accNumber, isQuery = true): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const searchValue = control.value && control.value.trim();
        if (accNumber.trim() === searchValue) {
            return of({ 'errorcCloseCurrenNumber': true });
        }
        if (isQuery && searchValue && searchValue != '') {
            return timer(100).pipe(
                switchMap(() => {
                    return accountService.getAccountByNumber(searchValue).pipe(
                        map((res: any) => {
                            if (res.code === Status.SUCCESS && res.data && res.data.length > 0) {
                                const account = res.data[0];
                                if (account.currencyCode === currencyCode) {
                                    accountNameTransfer.setValue(res.data[0].accName);
                                } else {
                                    return { 'errorcurrencyCodeInValid': true };
                                }
                            } else {
                                return { 'errorNotExistingAccount': true };
                            }
                        }),
                        catchError(error => {
                            if (error && error.status === 404) {
                                return of(null)
                            } else {
                                return of({ 'errorNotExistingAccount': true });
                            }
                        })
                    )
                })
            )
        }
        return of(null)
    }
}