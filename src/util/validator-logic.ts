namespace App {
  //validation logic for user input
  export interface Validate {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export const validateObject = (validatableInput: Validate) => {
    let isValid = true;
    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
      console.log(`required passed`)
    }
    if (
      validatableInput.minLength != null && 
      typeof validatableInput.value ==='string'
      ) {
      
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
      console.log(`min length test passed`);
      
    } 
    if (
      validatableInput.maxLength != null && 
      typeof validatableInput.value ==='string'
      ) {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
      console.log(`max length passed`);
    }
    if (
      validatableInput.min != null  && 
      typeof validatableInput.value === 'number'
      ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
      console.log(`min number passed`)
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value ==='number'
      ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
      console.log('max number passed')
    }
    return isValid;
  }
}