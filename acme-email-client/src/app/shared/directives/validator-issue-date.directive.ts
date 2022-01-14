
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ID_TYPE, LIST_ID_TYPE } from '@core';
import * as moment from 'moment';

/**
 * SC-1752 KHCN - Chặn mở code nếu CMT hết hạn
 * @param issueDate 
 * @returns 
 */
export function ExpireIssueDateValidator(idType: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            const toDay = moment(moment().format('YYYY-MM-DD'));
            const dateCheck = moment(control.value).format('YYYY-MM-DD')
            if (idType.get('idType').value == LIST_ID_TYPE.CMTND && dateCheck && toDay.diff(dateCheck, 'years', true) > 15) {
                return { errorIssueDateExpire: true }
            }
            return null;
        }

    };
}

/**
 * SC-3536 KHCN - PHUONGPV.OS - Thêm validate Chặn mở code nếu CMT/CCCD cấp trước 14 tuổi dateOfBirth - idType - idIssueDate
 * @returns 
 */
 export function ExpireIssueDOBValidator(legal: any, typeKey: Number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const idType_value = legal && legal.get('idType') ? legal.get('idType').value : null;
        const dob_value = legal && legal.get('dateOfBirth') ? legal.get('dateOfBirth').value : null;
        const issueDate_value = legal && legal.get('idIssueDate') ? legal.get('idIssueDate').value : null;
        if (idType_value && dob_value && issueDate_value) {
            if (legal.get('idType').hasError('errorExpireIssueDOB')) {
                legal.get('idType').setErrors(null);
            }
            if (legal.get('idIssueDate').hasError('errorExpireIssueDOB')) {
                legal.get('idIssueDate').setErrors(null);
            }
            if (legal.get('dateOfBirth').hasError('errorExpireIssueDOB')) {
                legal.get('dateOfBirth').setErrors(null);
            }
            if ([LIST_ID_TYPE.CMTND, LIST_ID_TYPE.CAN_CUOC_CD].includes(idType_value) && (moment(issueDate_value).year() - moment(dob_value).year()) < 14) {
                if (typeKey != 2) {
                    return { errorExpireIssueDOB: true }
                } else {
                    legal.get('idIssueDate').setValue(issueDate_value);
                }
            } else {
                return null;
            }
        }
        return null;
    };
}