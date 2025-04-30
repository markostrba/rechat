import { auth, db } from "@/lib/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "sonner";
import {create } from "zustand"
import { mapFirebaseError } from "@/lib/mapFirebaseError";


export type TUser = {
  userId: string,
  username: string,
  email: string,
  photoUrl: string,
}

type TAuthState = {
  user: TUser | null,
  isAuthenticated: boolean,
  isPageLoading: boolean,
  isFormLoading: boolean,
  register: (email: string, password: string, username: string) => Promise<boolean>,
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => Promise<void>,
  forgotPassword: (email: string) => Promise<void>,
  listenAuthState: () => void,
}

export const useAuthStore = create<TAuthState>()(
    set => ({
      user: null,
      isAuthenticated: false,
      isPageLoading: false,
      isFormLoading: false,
    
      register: async (email, password, username) => {
        set({isFormLoading: true})
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const firebaseUser = res.user;
          const userDocRef = doc(db, "users", firebaseUser.uid);
          await setDoc(userDocRef, {
            userId: firebaseUser.uid,
            username: username,
            photoUrl: "",
          })
    
          toast.success("Sign up successful")
          return true
        } catch (err: any) {
          console.error("Error inside of register AuthStore", err.message)
          toast.error(mapFirebaseError(err.code))
          return false
        } finally {
          set({isFormLoading: false})
        }
      },
      login: async (email, password) => {
        set({isFormLoading: true})
        
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);

          const {uid, email: userEmail} = res.user;


          set({user: {userId: uid, username: "", email: userEmail!, photoUrl: ""}, isAuthenticated: true})
          toast.success("Sign in successful")
          return true
        } catch (err: any) {
          console.error("Error inside of login AuthStore", err.message)
          toast.error(mapFirebaseError(err.code))
          return false
        } finally {
          set({isFormLoading: false})
        }
      },
      logout: async () => {
        set({isFormLoading: true})
        try {
          await signOut(auth),
          set({user: null,isAuthenticated: false, isFormLoading: false})
          return "Log out successful"
        } catch (err: any) {
          console.error("Error inside of logout AuthStore", err);
          return err.message
        } finally {
          set({isFormLoading: false})
        }
      },
      forgotPassword: async (email) => {
        set({isFormLoading: true})
        try {
          await sendPasswordResetEmail(auth, email)
        } catch (err) {
          console.error(err)
        } finally {
          set({isFormLoading: false})
          toast.success("A password reset link has been sent if the email is associated with an account.")
        }
      },
    
      listenAuthState: () => {
        set({isPageLoading: true})
        const unsubcribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (!user) {set({user: null, isAuthenticated: false}); return}    
            const userDocRef = doc(db, "users", user.uid); 
            const docSnap = await getDoc(userDocRef);
            const userData = docSnap.data();

            if (!userData) {
              console.error("No user data found")
              return set({user: null, isAuthenticated: false})
            }

            set({user: {
              userId: user.uid,
              username: userData.username,
              email: user.email!,
              photoUrl: userData.photoUrl
            },isAuthenticated: true})
          } catch (err) {
            console.error("Fsfsf",err)
            toast.error(mapFirebaseError())
          } finally {
            set({isPageLoading: false})
          }
        })
    
        return unsubcribe
      },
    
    }),

)