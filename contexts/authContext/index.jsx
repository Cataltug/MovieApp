import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser as firebaseDeleteUser,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, firestore } from "../../config/Firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const tryAutoLogin = async () => {
      const credentialsStr = await AsyncStorage.getItem("user-credentials");
      if (credentialsStr) {
        const { email, password } = JSON.parse(credentialsStr);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.warn("Silent login failed:", e.message);
        }
      }
    };

    tryAutoLogin();

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const uRef = doc(firestore, "users", fbUser.uid);
        const snap = await getDoc(uRef);

        if (!snap.exists()) {
          await setDoc(uRef, {
            email: fbUser.email,
            uid: fbUser.uid,
            favorites: [],
          });
        } else {
          const data = snap.data();
          if (!Array.isArray(data.favorites)) {
            await updateDoc(uRef, { favorites: [] });
          }
        }

        setUser({ uid: fbUser.uid, email: fbUser.email });
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    const uRef = doc(firestore, "users", user.uid);

    const unsubscribe = onSnapshot(uRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          setFavorites([]);
        }
      }
    });

    return unsubscribe;
  }, [user?.uid]);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem(
        "user-credentials",
        JSON.stringify({ email, password })
      );
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("auth/invalid-credential")) msg = "Wrong credentials";
      if (msg.includes("auth/invalid-email")) msg = "Invalid email";
      return { success: false, msg };
    }
  };

  const register = async (email, password) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", resp.user.uid), {
        email: resp.user.email,
        uid: resp.user.uid,
        favorites: [],
      });
      await AsyncStorage.setItem(
        "user-credentials",
        JSON.stringify({ email, password })
      );
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("auth/email-already-in-use"))
        msg = "Email already in use";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("user-credentials");
  };

  const deleteAccount = async () => {
    if (!user?.uid) return;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error("Can not find user information.");
      }

      await deleteDoc(doc(firestore, "users", currentUser.uid));
      await firebaseDeleteUser(currentUser);
      await AsyncStorage.removeItem("user-credentials");

      setUser(null);
      setFavorites([]);
    } catch (e) {
      console.error("Error deleting account:", e);
    }
  };

  const addFavorite = async (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });

    if (user?.uid) {
      const uRef = doc(firestore, "users", user.uid);
      await updateDoc(uRef, {
        favorites: arrayUnion(movie),
      });
    }
  };

  const removeFavorite = async (id) => {
    const target = favorites.find((m) => m.id === id);
    if (!target || !user?.uid) return;

    setFavorites((prev) => prev.filter((m) => m.id !== id));

    const uRef = doc(firestore, "users", user.uid);
    await updateDoc(uRef, {
      favorites: arrayRemove(target),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        login,
        register,
        logout,
        deleteAccount,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
