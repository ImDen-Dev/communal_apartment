import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { CheckSession, LogIn, SignOut, SignUp } from './auth.actions';
import { Auth } from '@shared/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, take, tap, throwError } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { DEFAULTS } from './auth.defaults';
import { FirebaseError } from '@angular/fire/app';

@State<Auth.AuthStateModel>({
  name: 'auth',
  defaults: DEFAULTS,
})
@Injectable()
export class AuthState implements NgxsOnInit {
  @Selector()
  static isLoggedIn({ user }: Auth.AuthStateModel): boolean {
    return Boolean(user && user?.isEmailVerified);
  }
  @Selector()
  static getCurrentUser({ user }: Auth.AuthStateModel): Auth.User | null {
    return user;
  }
  constructor(private afAuth: AngularFireAuth) {}

  ngxsOnInit({ dispatch }: StateContext<any>) {
    dispatch(new CheckSession());
  }

  @Action(CheckSession)
  checkSession({ dispatch }: StateContext<Auth.AuthStateModel>) {
    return this.afAuth.authState.pipe(
      take(1),
      tap((user) =>
        dispatch(new Navigate([user?.emailVerified ? 'services' : 'auth'])),
      ),
    );
  }

  @Action(LogIn)
  async login(
    { patchState, dispatch }: StateContext<Auth.AuthStateModel>,
    { payload: { email, password } }: LogIn,
  ) {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      if (user?.emailVerified) {
        patchState({
          user: {
            uid: user.uid,
            email: user?.email,
            isEmailVerified: user.emailVerified,
          },
        });
        dispatch(new Navigate(['services']));
      } else {
        user?.sendEmailVerification();
      }
    } catch (error) {
      patchState({ user: null });
      return this.checkFirebaseErrors(error);
    }
  }

  @Action(SignUp)
  async signUp(
    { patchState }: StateContext<Auth.AuthStateModel>,
    { payload: { email, password } }: SignUp,
  ) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      if (user !== null) {
        patchState({
          user: {
            uid: user.uid,
            email: user?.email,
            isEmailVerified: user.emailVerified,
          },
        });
        user?.sendEmailVerification();
      }
    } catch (error) {
      patchState({ user: null });
      return this.checkFirebaseErrors(error);
    }
  }

  @Action(SignOut)
  signOut({ setState, dispatch }: StateContext<Auth.AuthStateModel>) {
    this.afAuth.signOut().then(() => {
      setState({ user: null });
      dispatch(new Navigate(['auth']));
    });
  }

  checkFirebaseErrors(error: unknown): void | Observable<never> {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      return throwError(() => new Error(errorCode));
    } else {
      return console.log(error);
    }
  }
}
