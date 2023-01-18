import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (error) {
			console.log('Erro ao criar usuario', error.message)
		}
	}

	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback)
