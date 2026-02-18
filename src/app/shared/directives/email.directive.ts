import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const emailInput = control.value;
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailInput){
            return null;
        }

        const isValid = emailRegEx.test(emailInput);

        return isValid ? null : { emailInvalid: true };
    }
}
