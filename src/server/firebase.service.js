import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const registerWithEmailAndPassword = async (formdata) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    formdata.email,
    formdata.password
  );
  const user = res.user;
  return await addDoc(collection(db, 'users'), {
    uid: user.uid,
    firstname: formdata.firstname,
    lastname: formdata.lastname,
    email: formdata.email,
    authProvider: 'local',
  });
};

export const logout = () => signOut(auth);
