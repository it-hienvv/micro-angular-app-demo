
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

/**
 * Validate thông tin được chọn phải nằm trong droplist
 * @param form 
 * @returns 
 */
export function ValidateItemOnList(listItem: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value) {
            return null;
            // const toDay = moment(control.value);
            // const dateCheck = moment(form.sme_admin.controls.contactDate.value)
            // if(dateCheck && dateCheck.diff(toDay, 'days', true) < 0){
            //     return { errorCompareRegistrationDateWithContactDate: true }
            // }
            // return null;
        }
    };
}