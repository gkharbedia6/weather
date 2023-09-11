import { DatePipe } from '@angular/common';
import { Validators as NGValidators, AbstractControl } from '@angular/forms';

export class Validators extends NGValidators {
  constructor() {
    super();
  }

  static override required(control: AbstractControl, message?: string) {
    return super.required(control)
      ? { required: message ?? 'Field is required.' }
      : null;
  }

  static override pattern(pattern: string | RegExp, message?: string) {
    return (control: AbstractControl) =>
      super.pattern(pattern)(control)
        ? { pattern: message ?? `Plese match the expression ${pattern}.` }
        : null;
  }
}
