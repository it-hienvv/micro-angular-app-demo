
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @author PHUONGPV
 * Validate multi khoi
 */
export function validateMultiKhoi(controlGroup?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value) {
            if (controlGroup && controlGroup.controls && controlGroup.controls.length > 0) {
                const control = controlGroup.controls.filter(x => x.getRawValue().khoi == value);
                if (control.length > 1) {
                    controlGroup.controls.forEach(item => {
                        if (item.getRawValue().khoi === value) {
                            item.get('khoi').setErrors({ errorExsitInMultiKhoi: true });
                        } else {
                            if (!item.get('khoi').hasError('required')) {
                                item.get('khoi').setErrors(null);
                            }
                        }
                    });
                    return { errorExsitInMultiKhoi: true };
                } else {
                    const controlInvalidd = controlGroup.controls.filter(x => x.getRawValue().khoi !== value && x.get('khoi').hasError('errorExsitInMultiKhoi'))?.length;
                    if (controlInvalidd && controlInvalidd == 1) {
                        controlGroup.controls.forEach(item => {
                            if (!item.get('khoi').hasError('required')) {
                                item.get('khoi').setErrors(null);
                            }
                        });
                    }
                    return null;
                }
            } else {
                return null;
            }
        }
        return null;
    };
}
export function validateCompareNumber(form: any, fromNumber: string, toNumber: string, isFromNumber: Boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fromValue = form.get(fromNumber)?.value?.replace(/[,]/g, '');
        const toValue = form.get(toNumber)?.value?.replace(/[,]/g, '');
        const res = {}
        if (fromValue && toValue) {
            if (Number(fromValue) > Number(toValue)) {
                if (!isFromNumber && form.get(fromNumber).hasError(fromNumber)) {
                    form.get(fromNumber).setErrors(null);
                }
                if (isFromNumber && form.get(toNumber).hasError(toNumber)) {
                    form.get(toNumber).setErrors(null);
                }
                if (!isFromNumber) {
                    res[toNumber] = true
                } else {
                    res[fromNumber] = true
                }
                return res;
            }
        }
        if (!isFromNumber && form.get(fromNumber).hasError(fromNumber)) {
            form.get(fromNumber).setValue(form.get(fromNumber).value);
        }
        if (isFromNumber && form.get(toNumber).hasError(toNumber)) {
            form.get(toNumber).setValue(form.get(toNumber).value);
        }
        return null;
    };
}

export function validateCompareNumberEQL(form: any, fromNumber: string, toNumber: string, isFromNumber: Boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fromValue = form.get(fromNumber)?.value?.replace(/[,]/g, '');
        const toValue = form.get(toNumber)?.value?.replace(/[,]/g, '');
        const res = {}
        if (fromValue && toValue) {
            if (Number(fromValue) >= Number(toValue)) {
                if (!isFromNumber && form.get(fromNumber).hasError(fromNumber)) {
                    form.get(fromNumber).setErrors(null);
                }
                if (isFromNumber && form.get(toNumber).hasError(toNumber)) {
                    form.get(toNumber).setErrors(null);
                }
                if (!isFromNumber) {
                    res[toNumber] = true
                } else {
                    res[fromNumber] = true
                }
                return res;
            }
        }
        if (!isFromNumber && form.get(fromNumber).hasError(fromNumber)) {
            form.get(fromNumber).setValue(form.get(fromNumber).value);
        }
        if (isFromNumber && form.get(toNumber).hasError(toNumber)) {
            form.get(toNumber).setValue(form.get(toNumber).value);
        }
        return null;
    };
}

export function validateCompareGroupSector(form: any, _this: any, callBack: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fromValue = form.get('fromSector')?.value?.replace(/[,]/g, '');
        const toValue = form.get('toSector')?.value?.replace(/[,]/g, '');
        if (fromValue || toValue) {
            const result = callBack.call(_this, fromValue, toValue);
            if (result) {
                let fromSector = form.get('fromSector');
                if (!fromSector.hasError('required') && !fromSector.hasError('fromSector')) {
                    fromSector.setErrors(null);
                }
                let toSector = form.get('toSector');
                if (!toSector.hasError('required') && !toSector.hasError('toSector')) {
                    toSector.setErrors(null);
                }
                return null;
            } else {
                return { errorExsitRangerContrainValue: true };
            }
        } else {
            return null;
        }
    };
}

/**
 * @author PHUONGPV
 * Validate multi nhóm nghệp vụ vànhomsm kênh
 */
export function validateMultCombo(form: any, controlGroup?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const groupBusiness = form.get('groupBusiness')?.value;
        const groupChannel = form.get('groupChannel')?.value;
        if (groupBusiness && groupChannel) {
            if (controlGroup && controlGroup.controls && controlGroup.controls.length > 0) {
                const control = controlGroup.controls.filter(x => x.getRawValue().groupBusiness == groupBusiness && x.getRawValue().groupChannel == groupChannel);
                if (control.length > 1) {
                    controlGroup.controls.forEach(item => {
                        if (item.getRawValue().groupChannel === groupChannel) {
                            item.get('groupChannel').setErrors({ errorExsitInMultiCombo: true });
                        } else {
                            if (!item.get('groupChannel').hasError('required')) {
                                item.get('groupChannel').setErrors(null);
                            }
                        }
                    });
                    return { errorExsitInMultiCombo: true };
                } else {
                    const controlInvalidd = controlGroup.controls.filter(x => x.get('groupChannel').hasError('errorExsitInMultiCombo'))?.length;
                    if (controlInvalidd && controlInvalidd == 2) {
                        controlGroup.controls.forEach(item => {
                            if (!item.get('groupChannel').hasError('required')) {
                                item.get('groupChannel').setErrors(null);
                            }
                        });
                    }
                    return null;
                }
            } else {
                return null;
            }
        }
        return null;
    };
}

/**
 * @author PHUONGPV
 * Validate multi fee code
 */
// export function validateMultiFeeCode(controlGroup?: any): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         const value = control.value;
//         if (value) {
//             if (controlGroup && controlGroup.controls && controlGroup.controls.length > 0) {
//                 let countValid = 0;
//                 controlGroup?.controls.forEach(feeBusiness => {
//                     feeBusiness?.controls?.fee?.controls.forEach(feeControl => {
//                         if (feeControl.get('feeCode')?.value == value) {
//                             feeControl.get('feeCode')?.setErrors({ errorExsitInMultiFeeCode: true });
//                             countValid += 1;
//                         } else {
//                             if (!feeControl.get('feeCode')?.hasError('required')) {
//                                 feeControl.get('feeCode')?.setErrors(null);
//                             }
//                         }
//                     });
//                 });
//                 if (countValid > 1) {
//                     return { errorExsitInMultiFeeCode: true };
//                 } else {
//                     return null;
//                 }
//             } else {
//                 return null;
//             }
//         }
//         return null;
//     };
// }
export function validateMultiFeeCode(controlGroup?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value) {
            if (controlGroup && controlGroup.controls && controlGroup.controls.length > 0) {
                const control = controlGroup.controls.filter(x => x.getRawValue().feeCode == value);
                if (control.length > 1) {
                    controlGroup.controls.forEach(item => {
                        if (item.getRawValue().feeCode === value) {
                            item.get('feeCode').setErrors({ errorExsitInMultiFeeCode: true });
                        } else {
                            if (!item.get('feeCode').hasError('required')) {
                                item.get('feeCode').setErrors(null);
                            }
                        }
                    });
                    return { errorExsitInMultiFeeCode: true };
                } else {
                    const controlInvalidd = controlGroup.controls.filter(x => x.get('feeCode').hasError('errorExsitInMultiFeeCode'))?.length;
                    if (controlInvalidd && controlInvalidd == 2) {
                        controlGroup.controls.forEach(item => {
                            if (!item.get('feeCode').hasError('required')) {
                                item.get('feeCode').setErrors(null);
                            }
                        });
                    }
                    return null;
                }
            } else {
                return null;
            }
        }
        return null;
    };
}


/**
 * @author PHUONGPV
 * Validate multi fee code
 */
export function validateCompareUptoAmy(controlGroup?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value) {
            if (controlGroup && controlGroup.controls && controlGroup.controls.length > 1) {
                for (let i = 0; i < controlGroup.controls.length - 1; i++) {
                    const ValueIndex = Number(controlGroup.controls[i].getRawValue().uptoAmt?.replace(/[,]/g, ''));
                    const ValueIndex_Left = controlGroup.controls[i - 1] ? controlGroup.controls[i - 1].getRawValue().uptoAmt?.replace(/[,]/g, '') : '';
                    const ValueIndex_Right = controlGroup.controls[i + 1] ? controlGroup.controls[i + 1].getRawValue().uptoAmt?.replace(/[,]/g, '') : '';
                    if ((ValueIndex_Left && ValueIndex <= Number(ValueIndex_Left)) || (ValueIndex_Right && ValueIndex >= Number(ValueIndex_Right))) {
                        controlGroup.controls[i].get('uptoAmt')?.setErrors({ errorCompareUptoAmt: true });
                        if (ValueIndex_Left && ValueIndex <= Number(ValueIndex_Left)) {
                            controlGroup.controls[i - 1].get('uptoAmt')?.setErrors({ errorCompareUptoAmt: true });
                        }
                        if (ValueIndex_Right && ValueIndex >= Number(ValueIndex_Right)) {
                            controlGroup.controls[i + 1].get('uptoAmt')?.setErrors({ errorCompareUptoAmt: true });
                        }
                        return { errorCompareUptoAmt: true }
                    } else {
                        if (ValueIndex_Left && ValueIndex > Number(ValueIndex_Left)) {
                            if (!controlGroup.controls[i - 1].get('uptoAmt')?.hasError('required')) {
                                controlGroup.controls[i - 1].get('uptoAmt')?.setErrors(null);
                            }
                        }
                        if (ValueIndex_Right && ValueIndex < Number(ValueIndex_Right)) {
                            if (!controlGroup.controls[i + 1].get('uptoAmt')?.hasError('required')) {
                                controlGroup.controls[i + 1].get('uptoAmt')?.setErrors(null);
                            }
                        }
                        if (!controlGroup.controls[i].get('uptoAmt')?.hasError('required')) {
                            controlGroup.controls[i].get('uptoAmt')?.setErrors(null);
                        }
                    }
                }
            } else {
                return null;
            }
        }
        return null;
    };
}

export function validateCompareSameOrLess(maxValue?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim() ? control.value?.trim().replace(/[,]/g, '') : '';
        if (value && maxValue) {
            if (Number(value) > Number(maxValue)) {
                return { errorValidateSameOrLess: true };
            } else {
                return null;
            }
        }
        return null;
    };
}

