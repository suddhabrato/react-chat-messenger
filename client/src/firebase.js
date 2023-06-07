import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoq1bn3K99qmhLo07Q-sROYLtiEQtGLHg",
  authDomain: "fir-auth-server-56490.firebaseapp.com",
  projectId: "fir-auth-server-56490",
  storageBucket: "fir-auth-server-56490.appspot.com",
  messagingSenderId: "517413963197",
  appId: "1:517413963197:web:8a8ab49de85a2e3d3dbed4",
  measurementId: "G-ZDFDDL7VPG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await auth?.currentUser?.getIdToken(true);
    localStorage.setItem("@token", token);
  }
});
