import { SECTOR, SECTORLV3, SECTORLV1, SECTORLV2 } from './../../features/customer/customer-detail/constants';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


export function existingSectorValidator(customerService, processID): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const value = control.value && control.value.trim();
        const params = {
            processId: processID
        }
        return customerService.checkChange(params).pipe(
            map((res: any) => {
                if (res && res.data && res.data.customerFieldChange && res.data.customerFieldChange.length > 0) {
                    const sector = res.data.customerFieldChange.find(x => x.fieldName === 'sector');
                    if (value != SECTORLV3 && sector && sector.newValue === SECTORLV3 &&
                        (sector.oldValue === SECTOR || sector.oldValue === SECTORLV1 || sector.oldValue === SECTORLV2)) {
                        return { 'existingSector': true }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            })
        );
    }
}
