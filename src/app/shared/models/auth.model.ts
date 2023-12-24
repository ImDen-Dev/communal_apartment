export namespace Auth {
  export interface AuthStateModel {
    user: User | null;
  }

  export interface User {
    email: string | null;
    uid: string | null;
    isEmailVerified: boolean | null;
  }
}
