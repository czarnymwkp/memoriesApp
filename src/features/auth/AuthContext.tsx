import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../../lib/firebase"

type AuthCtx = {
    user: User | null,
    loading: boolean,
    logout: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => {
            setUser(u)
            setLoading(false)
        })
        return unsub
    }, [])

    const logout = () => signOut(auth);

    return (
        <Ctx.Provider value={{ user, loading, logout }}>
            {children}
        </Ctx.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const v = useContext(Ctx)
    if (!v) throw new Error("UseAuth must be used with AuthProvider")
    return v
}