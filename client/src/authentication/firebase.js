import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBRlKiDGBqGysE4Kt6B-2KJMGXnEFWvNvM",
    authDomain: "baboontrade-90f10.firebaseapp.com",
    projectId: "baboontrade-90f10",
    storageBucket: "baboontrade-90f10.appspot.com",
    messagingSenderId: "242311951677",
    appId: "1:242311951677:web:3ced6d9334f403aed20154"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => {
    auth.signInWithRedirect(provider).then(res => {
        console.log(res.uid)
    }).catch(error => {
        console.log(error.message)
    })
};

export const logout = () => auth.signOut()

// auth.onAuthStateChanged(user => {
//     if(user){
//         console.log(user.uid)
//     }
//     else{
//         console.log("yoot")
//     }
// })

export default firebase;