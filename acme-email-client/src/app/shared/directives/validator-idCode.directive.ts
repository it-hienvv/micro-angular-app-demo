
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IGNORE_IDCODE } from '@shared/constants';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';



export function existingIdCodeValidator(customerService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const searchValue = control.value && control.value.trim();
        const paramsSearch = {
            searchValue: searchValue,
            searchType: 'CMT'
        };
        return timer(1000).pipe(
            switchMap(() => {
                if (searchValue) {
                    return customerService.searchIndivCustomer(paramsSearch).pipe(
                        map(res => {
                            return { 'existingIdCode': true }
                        }),
                        catchError(error => {
                            if (error && error.status === 404) {
                                return of(null)
                            } else {
                                return of({ 'existingIdCode': true })
                            }
                        })
                    )
                } else {
                    return of(null);
                }
            })
        )
        
    }
}
/**
 * @author PHUONGPV
 * Validate đầu số căn cước công dân là mã tỉnh
 */
export function StartCodeInIdCodeValidator(cityCode: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value) {
            if (value.length !== 12) {
                return { errorLengthCCCD: true }
            } else if (value && IGNORE_IDCODE.includes(value)) {
                return { errorIgnoreIdCode: true }
            } else {
                const number = value.substring(1, 3);
                const isInculde = cityCode.filter(x => x.key === number);
                if (!isInculde || isInculde.length === 0) {
                    return { errorHeadIdCode: true }
                }
            }
        }
        return null;
    };
}

// export function ErrorCompareDateOfBirthCus(form, isDateOfBirth: boolean): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         if (form && form.controls) {
//             const dateOfBirth = form.controls.legal.get('dateOfBirth').value;
//             const idIssueDate = form.controls.legal.get('idIssueDate').value;
//             if (dateOfBirth && idIssueDate) {
//                 if (idIssueDate < dateOfBirth) {
//                     if (isDateOfBirth && form.controls.legal.get('idIssueDate').hasError('errorDateOfBirth')) {
//                         form.controls.legal.get('idIssueDate').setErrors(null);
//                     }
//                     if (!isDateOfBirth && form.controls.legal.get('dateOfBirth').hasError('errorDateOfBirth')) {
//                         form.controls.legal.get('dateOfBirth').setErrors(null);
//                     }
//                     return { errorDateOfBirth: true }
//                 }
//             }
//         }
//         if (isDateOfBirth && form.controls.legal.get('idIssueDate').hasError('errorDateOfBirth')) {
//             form.controls.legal.get('idIssueDate').setValue(form.controls.legal.get('idIssueDate').value);
//         }
//         if (!isDateOfBirth && form.controls.legal.get('dateOfBirth').hasError('errorDateOfBirth')) {
//             form.controls.legal.get('dateOfBirth').setValue(form.controls.legal.get('dateOfBirth').value);
//         }
//         return null;
//     };
// }

// export function ErrorCompareDateOfBirthWithIssueDate(form, isDateOfBirth: boolean): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         if (form) {
//             const dateOfBirth = form.get('dateOfBirth').value;
//             const idIssueDate = form.get('idIssueDate').value;
//             if (dateOfBirth && idIssueDate) {
//                 if (idIssueDate < dateOfBirth) {
//                     if (isDateOfBirth && form.get('idIssueDate').hasError('errorDateOfBirth')) {
//                         form.controls.get('idIssueDate').setErrors(null);
//                     }
//                     if (!isDateOfBirth && form.get('dateOfBirth').hasError('errorDateOfBirth')) {
//                         form.get('dateOfBirth').setErrors(null);
//                     }
//                     return { errorDateOfBirth: true }
//                 }
//             }
//         }
//         if (isDateOfBirth && form.get('idIssueDate').hasError('errorDateOfBirth')) {
//             form.get('idIssueDate').setValue(form.get('idIssueDate').value);
//         }
//         if (!isDateOfBirth && form.get('dateOfBirth').hasError('errorDateOfBirth')) {
//             form.get('dateOfBirth').setValue(form.get('dateOfBirth').value);
//         }
//         return null;
//     };
// }

/**
 * @author PHUONGPV
 * Validate Mã người giới thiệu không thể trùng với mã khách hàng
 */
export function CustomerIntroducerValidator(introducerCode: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value && introducerCode && introducerCode.trim() === value) {
            return { existingIntroducerCode: true }
        }
        return null;
    }
};

/**
 * @author PHUONGPV
 * Validate Mã số thuế cá nhân
 */
export function ErrorTaxCodeLengthValidator(lstLength: number[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value && !lstLength.includes(value.length)) {
            return { errorTaxCodeLength: true }
        }
        return null;
    }
};

/**
 * @author PHUONGPV
 * Validate IDcode
 */
export function ErrorIdCodeLengthValidator(lstLength: number[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value && !lstLength.includes(value.length)) {
            return { errorIdCodeLength: true }
        } else if (value && IGNORE_IDCODE.includes(value)) {
            return { errorIgnoreIdCode: true }
        }
        return null;
    }
};

/**
 * @author PHUONGPV
 * Validate IDcode ignore
 */
export function ErrorIgnoreIdCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value && IGNORE_IDCODE.includes(value)) {
            return { errorIgnoreIdCode: true }
        }
        return null;
    }
};

/**
 * @author PHUONGPV
 * Validate đầu số căn cước công dân là mã tỉnh
 */
export function GenderByCCCDValidator(form: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value && control.value.trim();
        if (value && form && form.idCode && form.idCode.value && form.idCode.value.length === 12) {
            const number = form.idCode.value.substring(3, 4);
            if (number % 2 === 1 && value === 'MALE') {
                return { errorGenderFeMale: true }
            }
            if (number % 2 === 0 && value === 'FEMALE') {
                return { errorGenderMale: true }
            }
        }
        return null;
    };
}

/**
 * + Cấu trúc nhập liệu: nhập theo (1) hoặc (2)

    (1) MST+ “/” + STT

    (2) MST

    Trong đó

    ++ MST: Là mã số thuế của khách hàng. Bắt buộc nhập định dạng số, 10 hoặc 14 kí tự. Trường hợp MST là 14 kí tự thì bắt buộc kí tự 11 là dấu “-“ theo định dạng của MST trên hóa đơn, các kí tự còn lại bắt buộc định dạng số.

    ++ / là kí tự duy nhất phân tách trường hợp các đơn vị dùng chung MST, ví dụ như trường hợp Điện lực dùng chung MST với điện lực tỉnh.

    ++ STT: là số thứ tự hoặc số quyết định thành lập của đơn vị phụ thuộc.
 */
export function existingSearchValidator(customerSmeService, searchType): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const searchValue = control.value && control.value.trim();
        const paramsSearch = {
            searchValue: searchValue,
            searchType: searchType
        };
        return timer(1000).pipe(
            switchMap(() => {
                if (searchValue) {
                    return customerSmeService.searchSmeCustomer(paramsSearch).pipe(
                        map(res => {
                            return { 'errorExistingTaxCode': true }
                        }),
                        catchError(error => {
                            if (error && error.status === 404) {
                                return of(null);
                            } else {
                                return of({ 'errorExistingTaxCode': true });
                            }
                        })
                    )
                } else {
                    return of(null);
                }
            })
        )

    }
}

/**
 * @author PHUONGPV
 * Validate MST
 */
export function taxCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const searchValue = control.value && control.value.trim();
        if (searchValue) {
            const lengthValue = searchValue.length;
            const itemCharAt11 = searchValue.charAt(10)
            const itemCharAt15 = searchValue.charAt(14)
            const str1114 = searchValue.slice(11, 14)
            const str1535 = searchValue.slice(15, 35)
            const str1135 = searchValue.slice(11, 35)

            if (lengthValue > 10) {
                if (itemCharAt11 != '-' && itemCharAt11 != '/') {
                    return { 'errorTaxCodeSmeType': true };
                }
                if (str1114.includes('-') || str1114.includes('/') || str1535.includes('-') || str1535.includes('/')) {
                    return { 'errorTaxCodeSmeType': true };
                }
                if (itemCharAt11 == '/' && (str1535.includes('-') || str1535.includes('/') || str1135.includes('-') || str1135.includes('/'))) {
                    return { 'errorTaxCodeSmeType': true };
                }
                if (itemCharAt11 == '/' && str1114.length < 1) {
                    return { 'errorTaxCodeSmeType': true };
                }
                if (itemCharAt11 == '-') {
                    if (str1114.length < 3) {
                        return { 'errorTaxCodeSmeType': true };
                    }
                    if (str1114.length === 3 && (str1114.includes('-') || str1114.includes('/'))) {
                        return { 'errorTaxCodeSmeType': true };
                    }
                    if (lengthValue > 14) {
                        if (itemCharAt15 != '/' || !str1535) {
                            return { 'errorTaxCodeSmeType': true };
                        }
                    }
                }
            }
        }
        return null;
    };
}

export function idCodeCMTNDValidatorType(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const searchValue = control.value && control.value.trim();
        if (searchValue) {
            const charRegex = /^[0-9]+$/;
            if(!charRegex.test(searchValue)) {
                return { 'errorIDCodeCMTNDType': true }
            }
        }
        return null;
    };
}