import { GoogleAuthProvider, signOut } from "firebase/auth"
import { getAuth, signInWithPopup } from "firebase/auth";

export function SignIn() {
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .catch((ex) => {
      console.log('Error on popup: ', ex);
    });
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export function SignOut() {
  const auth = getAuth();

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}