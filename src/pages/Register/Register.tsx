import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./Register.styles"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { FirebaseError } from "firebase/app"

export const Register = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (pass.length < 6) { setError("Hasło powinno zawierać min. 6 znaków"); return }
        if (pass !== pass2) { setError("Hasła nie są takie same"); return }
        setLoading(true)
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, pass)
            if (name) await updateProfile(cred.user, { displayName: name })
            try { await sendEmailVerification(cred.user) } catch { /* empty */ }
            navigate("/library", { replace: true })
        }
        catch (err: unknown) {
            if (err instanceof FirebaseError) {
                setError(mapError(err.code))
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <S.Wrapper>
            <S.Box onSubmit={onSubmit}>
                <S.Title>Rejestracja</S.Title>
                <S.Input
                    type="text"
                    placeholder="Imię / nazwa ( opcjonalnie)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <S.Input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <S.Input
                    type="password"
                    placeholder="Hasło"
                    autoComplete="new-password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
                <S.Input
                    type="password"
                    placeholder="Powtórz hasło"
                    autoComplete="new-password"
                    value={pass2}
                    onChange={e => setPass2(e.target.value)}
                />
                <S.Button type="submit" disabled={loading}>
                    {loading ? "Tworzenie konta" : "Utwórz konto"}
                </S.Button>
                <S.Helper>
                    Masz konto? <S.LinkButton to="/login">Zaloguj się</S.LinkButton>
                </S.Helper>
                {error && <S.Error>{error}</S.Error>}
            </S.Box>
        </S.Wrapper>
    )

    function mapError(code?: string) {
        switch (code) {
            case "auth/email-already-in-use": return "Email jest ju zajęty"
            case "auth/invalid-email": return "Nieprawidłowy email"
            case "auth/weak-password": return "Zbyt słabe hasło"
            default: return "Nie udało się utworzyć konta"
        }
    }
}