
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { ACCTYPE, HttpOptions, PATH, Status } from '../../core';
import { environment } from '../../../../src/environments/environment';
import { DwAccountList } from '@models';
import { Observable, of } from 'rxjs';
import { SmeEbankingService } from '@features/customer-sme/services/smeEbanking.service';

export function UserIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        // const options: HttpOptions = {
        //     url: environment.urlEbanking,
        //     path: PATH.EBANKING.UPDATE,
        //     body: this.form.getRawValue()
        // };
        // this.indicator.showActivityIndicator();
        // this.httpClient.post(options).pipe(
        // takeUntil(this.ngUnsubscribe),
        // finalize(() => this.indicator.hideActivityIndicator())
        // ).subscribe((res: any) => {
        //     if (res && res.code === Status.SUCCESS) {
        //         return { errorEMBUserId: true };
        //     } else {
        //         return null;
        //     }
        // });
        return null;
    };
}

export function PhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        // const options: HttpOptions = {
        //     url: environment.urlEbanking,
        //     path: PATH.EBANKING.UPDATE,
        //     body: this.form.getRawValue()
        // };
        // this.indicator.showActivityIndicator();
        // this.httpClient.post(options).pipe(
        // takeUntil(this.ngUnsubscribe),
        // finalize(() => this.indicator.hideActivityIndicator())
        // ).subscribe((res: any) => {
        //     if (res && res.code === Status.SUCCESS) {
        //         return { errorEMBPhone: true };
        //     } else {
        //         return null;
        //     }
        // });
        return null;
    };
}

export function AccountValidator(accountError, lstAccount: DwAccountList[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === accountError) {
            return { errorEMBAccountId: true };
        } else if (lstAccount && lstAccount.length > 0) {
            const acc = lstAccount.filter(x => x.dwAccountId === value);
            if (acc && acc.length > 0 && acc[0].accType !== ACCTYPE.TGTT) {
                return { errorNotAccountPay: true };
            }
        }
        return null;
    };
}

export function userIdValidator(lstUserId: string[], curUserId: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length > 0 && lstUserId && lstUserId.length > 0) {
            if (lstUserId.includes(value.toUpperCase()) && (!curUserId || (curUserId && value.toUpperCase() !== curUserId))) {
                return { errorExistUserId: true };
            }
        }
        return null;
    };
}

export function existingCorpCodeValidator(smeEbankingService: SmeEbankingService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const searchValue = control.value && control.value.trim();
        return smeEbankingService.checkExistCorpCompany(searchValue.toUpperCase()).pipe(
            map((res: any) => {
                if (res.code !== Status.SUCCESS) {
                    return { 'errorExistingCorpCode': true }
                }
            }),
            catchError(error => {
                if (error && error.status === 404) {
                    return of(null)
                } else {
                    return of({ 'errorExistingCorpCode': true })
                }
            })
        )
    }
}