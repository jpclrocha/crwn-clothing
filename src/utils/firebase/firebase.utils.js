import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCl2F0q2K94usPMtU7iHwohx2Rs7QNsIa8',
	authDomain: 'crwn-clothing-db-d4667.firebaseapp.com',
	projectId: 'crwn-clothing-db-d4667',
	storageBucket: 'crwn-clothing-db-d4667.appspot.com',
	messagingSenderId: '330024124481',
	appId: '1:330024124481:web:6661109b14b8e56d5f46c0',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)

	console.log(userSnapshot)
	console.log(userSnapshot.exists())

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			})
		} catch (error) {
			console.log('Erro ao criar usuario', error.message)
		}
	}

	return userDocRef
}
