import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const BASE_API_URL = "http://127.0.0.1:5000"; // 🔁 Replace with your backend URL

  const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updatepassword = (password) => updatePassword(auth.currentUser, password);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          profileCompleted: false,
        });
      }

      return user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return null;
    }
  };

  const setPasswordForGoogleUser = async (email, password) => {
    if (!currentUser) return false;

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);
      console.log("Password set successfully");
      return true;
    } catch (error) {
      console.error("Error linking password:", error.message);
      return false;
    }
  };

  const fetchUserData = async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        return { uid: user.uid, ...userDoc.data() };
      }
    }
    return user;
  };

  const getBearerToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  const authFetch = async (endpoint, options = {}) => {
    const token = await getBearerToken();
    if (!token) throw new Error("User not authenticated");

    const res = await fetch(`${BASE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Request failed");
    }

    return res.json();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const userData = await fetchUserData(user);
      setCurrentUser(userData);
      if (userData) {
        setProfileCompleted(userData.profileCompleted || false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    profileCompleted,
    login,
    logout,
    resetPassword,
    updatepassword,
    signUp,
    signInWithGoogle,
    setPasswordForGoogleUser,
    setProfileCompleted,
    getBearerToken,
    authFetch,
  };

  return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
  );
}
