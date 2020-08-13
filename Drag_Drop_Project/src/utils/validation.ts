namespace App {
    export interface applyValidate {
        value: string | number;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        required?: boolean
    }

    export function validate(applyValidateInput: applyValidate) {
        let isValid = true;
        if (applyValidateInput.required) {
            isValid = isValid && applyValidateInput.value.toString().trim().length !== 0;
        }
        if (applyValidateInput.minLength != null &&
            typeof applyValidateInput.value === "string") {
            isValid = isValid && applyValidateInput.value.length >= applyValidateInput.minLength;
        }
        if (applyValidateInput.maxLength != null &&
            typeof applyValidateInput.value === "string") {
            isValid = isValid && applyValidateInput.value.length <= applyValidateInput.maxLength;
        }
        if (applyValidateInput.min != null &&
            typeof applyValidateInput.value === "number") {
            isValid = isValid && applyValidateInput.value >= applyValidateInput.min;
        }
        if (applyValidateInput.max != null &&
            typeof applyValidateInput.value === "number") {
            isValid = isValid && applyValidateInput.value <= applyValidateInput.max;
        }
        return isValid;
    }
}