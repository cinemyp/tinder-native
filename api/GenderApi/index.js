import { Alert } from 'react-native';
import { firestore } from '../../firebase';

const getGenders = async () => {
  try {
    const collection = await firestore.collection('genders').get();
    let genders = [];
    collection.forEach((doc) => {
      genders.push({ _id: doc.id, ...doc.data() });
    });
    return genders;
  } catch (err) {
    console.log(err);
  }
};

export default { getGenders };
