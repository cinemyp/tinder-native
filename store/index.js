import { user } from './user';

const authState = (store) => {
  store.on('@init', () => ({ authState: { registration: false } }));
  store.on('auth/update', ({ authState }, value) => ({
    authState: { ...value },
  }));
};

export const storeonParams = [user, authState];
