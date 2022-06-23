import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetStorage } from "../constants/storage";
import { firebaseConfig } from "../../config/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function handleSignOut() {
  auth.signOut();

  AsyncStorage.removeItem(GetStorage.USER_INFO);
  AsyncStorage.removeItem(GetStorage.USER_FILTERED);
  AsyncStorage.removeItem(GetStorage.MEMBERS_FILTERED);
}
