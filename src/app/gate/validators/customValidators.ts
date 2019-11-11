import { FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {
  
  // create a static method for your validation
  static checkNotEmpty(control: FormControl) {
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
     return true
    } else {
      return null;
    }
  }
}