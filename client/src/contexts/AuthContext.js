import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
//firebase auth
import { auth } from '../firebase/config'

export const AuthContext = createContext()

//usecontext hook
export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	//signup function
	const signUp = (email, password, name) => {
		return auth.createUserWithEmailAndPassword(email, password).then(user => {
			const userData = {
				email: user.user.email,
				name: name,
			}
			axios
				.post('http://localhost:5000/api/user/create', userData)
				.then(res => console.log({ res }))
		})
	}

	//login / signin function
	const signIn = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	//logout function
	const logout = () => {
		return auth.signOut()
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		localStorage.getItem('isAuthenticated')

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signUp,
		signIn,
		isAuthenticated,
		logout,
		userData,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
