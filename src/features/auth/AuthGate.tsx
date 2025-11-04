import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import type { JSX } from "react"

export function AuthGate({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth()
    if (loading) return <div>Ładowanie...</div>
    if (!user) return <Navigate to="/login" replace />
    return children
}
