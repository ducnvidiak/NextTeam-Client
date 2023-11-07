// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDGLsLox7Zfsf7BeDgYmzq3K5HREmJDsS4',
	authDomain: 'edunext-6c30f.firebaseapp.com',
	projectId: 'edunext-6c30f',
	storageBucket: 'edunext-6c30f.appspot.com',
	messagingSenderId: '1010118954474',
	appId: '1:1010118954474:web:0136ccaf1d91bcda687693',
	measurementId: 'G-2VYDNXPCGK'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const uploadCv = getStorage(app)
