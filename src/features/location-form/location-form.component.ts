import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Validators } from 'src/utils/validators/input-validator';

@Component({
  selector: 'location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="weatherForm" (ngSubmit)="formSubmitted()" #form="ngForm">
      <div class="pb-1">
        <label
          for="city"
          class="block text-sm font-medium leading-6 text-gray-900"
          >City</label
        >
        <p class="max-w-4xl text-sm text-gray-500">
          Please enter the desired city name to get location weather.
        </p>
      </div>
      <div class="relative mt-2 flex flex-row w-fit justify-start">
        <input
          type="text"
          name="city"
          id="city"
          formControlName="city"
          class="block w-full border-0 py-1.5 pr-10 text-black-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-gray-900 sm:text-sm sm:leading-6"
          placeholder="Enter a city"
          aria-invalid="true"
          aria-describedby="city-error"
        />

        <p
          *ngIf="
            (weatherForm.controls['city'].dirty || form.submitted) &&
            !weatherForm.controls['city'].valid
          "
          class="absolute top-10 left-0 text-sm text-red-600"
          id="email-error"
        >
          {{ getErrorMessage(weatherForm.controls['city']) }}
        </p>
        <div
          *ngIf="
            (weatherForm.controls['city'].dirty || form.submitted) &&
            !weatherForm.controls['city'].valid
          "
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <svg
            class="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        [disabled]="!form.valid || isLoading"
        class="submit-button mt-8 bg-white px-2.5 py-1.5 text-sm font-semibold outline-none disabled:bg-gray-100 disabled:text-gray-300 text-gray-900 focus:ring-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Get Weather
      </button>
    </form>
  `,
})
export class LocationFormComponent {
  @Input() isLoading!: boolean | null;
  @Output() formSubmitClicked = new EventEmitter<string>();

  weatherForm: FormGroup;

  constructor() {
    this.weatherForm = new FormGroup({
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z A-Z_]*$', 'Please enter only latin symbols.'),
      ]),
    });
  }

  formSubmitted(): void {
    const { city } = this.weatherForm.value;
    this.formSubmitClicked.emit(city);
  }

  getErrorMessage(formControl: AbstractControl): string | void {
    const controlErrors = formControl.errors;
    if (!controlErrors) return;
    const errorKeys = Object.keys(controlErrors)[0];
    return controlErrors[errorKeys];
  }
}
