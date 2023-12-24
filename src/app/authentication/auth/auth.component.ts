import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthState, LogIn, SignUp } from '@shared/states';
import { Forms } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorEnum } from '@shared/enums';
import { map } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  form: FormGroup<Forms.AuthForm>;
  isLogin = true;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private getFormControlByName(
    controlName: keyof Forms.AuthForm,
  ): AbstractControl | null {
    return this.form.get(controlName);
  }

  getControlErrorByName(
    controlName: keyof Forms.AuthForm,
    errorCode: Forms.FormErrors = 'required',
  ): boolean | undefined {
    return this.getFormControlByName(controlName)?.hasError(errorCode);
  }

  private buildForm(): void {
    this.form = this.fb.group<Forms.AuthForm>({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: this.fb.control(null, Validators.minLength(8)),
    });
  }

  onSubmit() {
    this.isLogin ? this.onLogin() : this.signUp();
  }

  private onLogin(): void {
    const { email, password } = this.form.getRawValue();
    if (email && password && password.length >= 8) {
      this.store.dispatch(new LogIn({ email, password })).subscribe({
        error: (err: Error) => {
          if (err.message === AuthErrorEnum.INVALID_CREDENTIAL)
            this.toastr.error(
              'Надані облікові дані автентифікації неправильні, неправильно сформовані або термін дії минув',
            );
        },
      });
      return;
    }
    this.form.markAllAsTouched();
  }

  private signUp(): void {
    const { email, password, repeatPassword } = this.form.getRawValue();
    if (this.form.invalid) return this.form.markAllAsTouched();
    if (email && password) {
      if (repeatPassword && password === repeatPassword) {
        this.store
          .dispatch(new SignUp({ email, password }))
          .pipe(map(() => this.store.selectOnce(AuthState.getCurrentUser)))
          .subscribe({
            next: (user) => {
              if (user !== null) {
                this.store.dispatch(
                  new Navigate(['info'], { verifyEmail: true }),
                );
              }
            },
            error: (err: Error) => {
              if (err.message === AuthErrorEnum.INVALID_EMAIL)
                this.toastr.error('Будь-ласка введіть дісний E-mail');
            },
          });
      } else {
        this.getFormControlByName('repeatPassword')?.setErrors({
          compare: true,
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  changeForm(): void {
    this.isLogin = !this.isLogin;
    this.form.reset();
  }
}
