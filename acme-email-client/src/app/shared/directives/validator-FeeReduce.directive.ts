
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function feeReduceValidator(fee, type): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value ? control.value.toString().replace(/[,]/g, '') : null;
        let feeCheck = fee ? fee.toString().replace(/[,]/g, '') : null;
        const res = {}
        if (value && !value.includes('%') && feeCheck) {
            if (Number(value) > Number(feeCheck)) {
                res[type] = true
                return res;
            } else {
                return null;
            }
        }
    };
}