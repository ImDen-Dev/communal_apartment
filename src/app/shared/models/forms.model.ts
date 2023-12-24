import { FormControl } from '@angular/forms';

export namespace Forms {
  export interface AuthForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    repeatPassword: FormControl<string | null>;
  }
  export type FormErrors = 'minlength' | 'required' | 'email' | 'compare';
}
