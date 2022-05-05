import AuthApi from '../api/AuthApi';
import { getUserAge } from '../utils/date';

export const user = (store) => {
  store.on('@init', () => ({ currentUser: {} }));
  store.on('user/save', ({ currentUser }, user) => ({
    currentUser: { ...user },
  }));
  store.on('user/get', async ({ currentUser }) => {
    // if (currentUser.name) {
    //   return;
    // }
    const { data } = await AuthApi.getMe();
    store.dispatch('user/save', {
      ...data,
      age: getUserAge(data.birthdayDate),
    });
  });
};
