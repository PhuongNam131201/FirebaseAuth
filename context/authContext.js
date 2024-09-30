import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, db } from "../firebaseConfig"; // Đảm bảo import db
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
    }
  }

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true /*, data: response.user*/ };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email')) msg = 'Email không hợp lệ!!';
      if (msg.includes('(auth/invalid-credential')) msg = 'Sai thông tin email hoặc mật khẩu!!';
      return { success: false, msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      
      // Lưu thông tin người dùng vào Firestore
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        profileUrl,
        userId: response.user.uid
      });
      
      // Gửi email xác nhận
      const actionCodeSettings = {
        url: 'https://fir-auth-87ed6.firebaseapp.com/FinishSignUp', // URL của bạn mà người dùng sẽ được chuyển đến sau khi xác nhận
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email')) msg = 'Email không hợp lệ!!';
      if (msg.includes('(auth/email-already-in-use')) msg = 'Email đã tồn tại!!';      
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return value;
};
