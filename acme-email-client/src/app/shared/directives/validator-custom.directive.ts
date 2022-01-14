
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @author PHUONGPV
 * Validate custom required
 */
export function requiredValidator(error: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const res = {}
        if (!value) {
            res[error] = true
            return res;
        }
        return null;
    };
}