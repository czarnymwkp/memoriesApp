import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./Reset.styles"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { FirebaseError } from "firebase/app"

export const Reset = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!email) { setError("Podaj email"); return }
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth, email,)
            setStatus("sent")
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setStatus("error")
                setError(mapError(error.code))
            }
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <S.Wrapper>
            <S.Box onSubmit={onSubmit}>
                <S.Title>Reset hasła</S.Title>
                {status !== "sent" ? (
                    <>
                        <S.Input
                            type="email"
                            placeholder="Twój email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {error && <S.Error>{error}</S.Error>}
                        <S.Button>{loading ? "Wysyłanie..." : "Wyślij link resetujący"}</S.Button>
                        <S.Helper>Pamiętasz hasło? <S.LinkButton to={"/login"}>Zaloguj się</S.LinkButton></S.Helper>
                    </>
                ) : (
                    <>
                        <S.Success> Wysłaliśmy link do resetu hasła na: <strong>{email}</strong></S.Success>
                        <S.Button type="button" onClick={() => navigate("/login", { replace: true })}>Wróć do logowania</S.Button>
                    </>
                )}
            </S.Box>
        </S.Wrapper>
    )

    function mapError(code?: string) {
        switch (code) {
            case "auth/user-not-found": return "Uzytkownik z tym emailem nie istnieje"
            case "auth/invalid-email": return "Nieprawidłowy email"
            case "auth/too-many-requests": return "Za duzo prób, spóbuj poźniej"
            default: return "Nie udało się wysłać linku resetującego hasło"
        }
    }
}


