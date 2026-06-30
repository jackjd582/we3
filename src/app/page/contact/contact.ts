import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  sent = false;

  form!: FormGroup;

  constructor(

    private fb: FormBuilder

  ) {

    this.form = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required
        ]
      ],

      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]

    });

  }

  submit() {

    if (
      this.form.invalid
    ) {

      this.form.markAllAsTouched();

      return;

    }

    console.log(
      this.form.value
    );

    this.sent = true;

    this.form.reset();

  }

  ctrl(
    name: string
  ) {

    return this.form.get(name);

  }

}
