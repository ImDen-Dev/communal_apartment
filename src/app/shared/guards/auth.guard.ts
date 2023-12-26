import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@shared/states';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private store: Store) {}

  canActivate() {
    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);
    !isLoggedIn && this.store.dispatch(new Navigate(['auth']));
    return isLoggedIn;
  }
}
