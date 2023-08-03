import { onAuthStateChanged } from "firebase/auth"
import { createContext,useState, useEffect } from "react"
import {auth } from '../firebase'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user) => {
            setUser(user)
            console.log(user);
        })

        return () => {
            sub()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )

}