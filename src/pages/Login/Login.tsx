import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./Login.styles"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase"
export const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, pass)
            navigate("/library", { replace: true })
        }
        catch {
            setError("Nieprawidłowy email lub hasło")
        }
        finally { setLoading(false) }
    }

    return (
        <S.Wrapper>
            <S.Box onSubmit={onSubmit}>
                <S.Title>Zaloguj się</S.Title>
                <S.Input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <S.Input
                    type="password"
                    placeholder="Hasło"
                    autoComplete="current-password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
                {error && <S.Error>{error}</S.Error>}
                <S.Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logowanie..." : "Zaloguj"}
                </S.Button>
            </S.Box>

        </S.Wrapper>
    )
}