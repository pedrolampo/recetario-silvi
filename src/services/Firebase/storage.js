import { getStorage, ref } from 'firebase/storage';
import { app } from './firebase';

export const storage = getStorage(app);

export const imageListRef = ref(storage, 'images/');
