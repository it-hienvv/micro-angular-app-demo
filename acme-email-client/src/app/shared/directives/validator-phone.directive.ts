
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CATALOG, getDataLocalStorageByKey } from '@core';
import { elementAt } from 'rxjs/operators';
import * as  moment from 'moment'; 

/**
 * @issue https://atlassian.mbbank.com.vn/browse/SC-426
 * @description Ngày cấp giấy phép: Không cảnh bảo khi nhập ngày tương lai=>Sửa cảnh báo không cho nhập ngày giá trị tương lai
 */
export function GreatTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if(value && value > moment()) {
            return { errorGreatToday: true }
        }
        return null;
    };
}
export function PhoneNumberValidator(fax?: Boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length > 0 && !value.startsWith('0')) {
            if(fax) {
                return { errorHeadFax: true }
            }
            return { errorPhone: true }
        }
        if (value && value.length >= 10) {
            const fsPh = value.substring(0, 3);
            if (fsPh === '024' || fsPh === '028') {
                return null;
            }
            const numberPhone = value.substring(0, 4);
            const listAllLandlinePhone = getDataLocalStorageByKey('listAllLandlinePhone');
            if (listAllLandlinePhone && listAllLandlinePhone.filter(x => x.id === numberPhone).length === 0) {
                if(fax) {
                    return { errorFax: true }
                }
                return { errorPhone: true };
            }
        }
        return null;
    };
}
/**
 * @author PHUONGPV
 * Validator đầu số điện thoại đi động bắt đầu = 0
 */
export function ZeroHeadPhoneValidator(typeError: string = 'errorHeadPhone'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const res = {}
        if (value && value.length > 0 && !value.startsWith('0')) {
            res[typeError] = true
            return res;
        } else {
            return null;
        }
    };
}

export function HeaderPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && value.length >= 10) {
            const fsPh = value.substring(0, 3);
            const headPhone = CATALOG.getListAllPhonePrefix;
            if (headPhone && !headPhone.includes(fsPh)) {
                return { errorNetworkCodePhone: true };
            }
        }
        return null;
    };
}