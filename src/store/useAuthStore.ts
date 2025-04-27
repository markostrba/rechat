import { auth, db } from "@/lib/firebase/config"
import { doc, setDoc } from "firebase/firestore";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth"

import {create } from "zustand"
import { mapFirebaseError } from "@/lib/mapFirebaseError";


type TUser = {
  userId: string,
  username: string,
  email: string,
  photoUrl: string,
}

type TAuthState = {
  user: TUser | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  register: (email: string, password: string, username: string) => Promise<{success: boolean, message: string}>,
  logout: () => Promise<void>,
  listenAuthState: () => void,
}

export const useAuthStore = create<TAuthState>()(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  register: async (email, password, username) => {
    set({isLoading: true})
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = res.user;
      const userDocRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userDocRef, {
        userId: firebaseUser.uid,
        username: username,
        photoUrl: "",
      })

      console.log("Sign up successful!");
      return {success: true, message: "Sign up successful."}
    } catch (err: any) {
      console.error("Error inside of register AuthStore", err.message)
      return {success: false, message: mapFirebaseError(err.code)}
    } finally {
      set({isLoading: false})
    }
  },

  logout: async () => {
    set({isLoading: true})
    try {
      await signOut(auth),
      set({user: null,isAuthenticated: false, isLoading: false})
      return "Log out successful"
    } catch (err: any) {
      console.error("Error inside of logout AuthStore", err);
      return err.message
    }
  },

  listenAuthState: () => {},

}))