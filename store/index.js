import { user } from './user';

const authState = (store) => {
  store.on('@init', () => ({ authState: { isSignedIn: false } }));
  store.on('auth/update', ({ authState }, value) => ({
    authState: { ...value },
  }));
};

export const storeonParams = [user, authState];
