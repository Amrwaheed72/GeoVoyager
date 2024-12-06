import { Children, createContext, useContext, useEffect, useReducer, useState } from "react"

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}
const FAKE_USER = {
    name: "Amr",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            throw new Error('unknown action')
    }
}

function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)


    // async function fetchUsers() {
    //     const res = await fetch('https://jsonplaceholder.typicode.com/users')
    //     const data = await res.json()
    //     console.log(data)
    // }
    // fetchUsers()

    function login({ email, password }) {
        // console.log("Input email:", email);
        // console.log("Input password:", password);
        // console.log("Expected email:", FAKE_USER.email);
        // console.log("Expected password:", FAKE_USER.password);
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER })
            console.log('login Succeeded')
        } else {
            console.log("Login failed");
        }
    }
    function logout() {
        dispatch({ type: 'logout' })
        console.log('logout succeeded')
    }
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    // if (context === undefined) throw new Error('you used the context outside the provider')
    return context
}

export { AuthProvider, useAuth }
