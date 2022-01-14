
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

/**
 * Validate ngày cấp GPKD lần đầu phải nhỏ hơn contact date
 * @param form 
 * @returns 
 */
export function CompareRegistrationDateWithContactDateValidator(form: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value && form?.sme_admin?.controls?.contactDate?.value) {
            const toDay = moment(control.value);
            const dateCheck = moment(form.sme_admin.controls.contactDate.value)
            if(dateCheck && dateCheck.diff(toDay, 'days', true) < 0){
                return { errorCompareRegistrationDateWithContactDate: true }
            }
            return null;
        }
        
    };
}