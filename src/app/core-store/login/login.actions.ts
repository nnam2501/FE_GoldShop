import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ token: string }>()
);
export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Login Page] Logout');
export const logoutSuccess = createAction('[Login Page] Logout Success');
export const logoutFailure = createAction('[Login Page] Logout Failure');
