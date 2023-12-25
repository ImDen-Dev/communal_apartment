export class LogIn {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class SignUp {
  static readonly type = '[Auth] SignUp';
  constructor(public payload: { email: string; password: string }) {}
}

export class SignOut {
  static readonly type = '[Auth] SignOut';
}

export class CheckSession {
  static readonly type = '[Auth] Check Session';
}
