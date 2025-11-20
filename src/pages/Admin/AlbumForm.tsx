import { useState } from "react"
import * as S from "./AlbumForm.styles"

export type NewAlbum = {
    title: string,
    clients: string[]
    coverFile?: File | null
    audioUrl?: string | null
}

export const AlbumForm = ({ onCreate }: { onCreate: (data: NewAlbum) => void }) => {
    const [title, setTitle] = useState("")
    const [clientInput, setClientInput] = useState("")
    const [clients, setClients] = useState<string[]>([])
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [audioUrl, setAudioUrl] = useState("")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const addClient = () => {
        const v = clientInput.trim().toLowerCase()
        if (!v) return
        if (!isEmail(v)) { setError("Niewłaściwy email"); return }
        if (clients.includes(v)) { setError("Email juz dodany"); return }
        setClients(prev => [...prev, v])
        setClientInput("")
        setError("")
    }

    const removeClient = (email: string) => {
        setClients(prev => prev.filter(c => c !== email))
    }

    const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null
        setCoverFile(f)
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!title.trim()) { setError("Podaj tytuł"); return }
        if (clients.length === 0) { setError("Dodaj co najmniej jednego klienta"); return }

        setSaving(true)
        try {
            onCreate({
                title: title.trim(),
                clients,
                coverFile,
                audioUrl
            })
            setTitle("")
            setClients([])
            setCoverFile(null)
            setAudioUrl("")
        }
        finally {
            setSaving(false)
        }
    }

    return (
        <S.Form onSubmit={submit}>
            <S.Field>
                <S.Label>Tytuł</S.Label>
                <S.Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="np. Jan i Maria"
                />
            </S.Field>
            <S.Field>
                <S.Label>Klienci</S.Label>
                <S.Row>
                    <S.Input
                        value={clientInput}
                        onChange={e => setClientInput(e.target.value)}
                        placeholder="np: karol@domena.pl"
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addClient();
                            }
                        }}

                    />
                    <S.SmallBtn type="button" onClick={addClient}>Dodaj</S.SmallBtn>
                </S.Row>
                {clients.length > 0 && (
                    <S.Chips>
                        {clients.map(mail => (<S.Chip key={mail} onClick={() => removeClient(mail)} title="Usuń">{mail}<span>X</span></S.Chip>))}
                    </S.Chips>
                )}
            </S.Field>
            <S.Field>
                <S.Label>Okładka (jpg/png/webp)</S.Label>
                <S.FileInput type="file" accept="image/*" onChange={onCoverChange} />
                {coverFile && <S.Hint>Wybrano {coverFile.name}</S.Hint>}
            </S.Field>
            <S.Field>
                <S.Label>Audio tła (url - opcjonalnie)</S.Label>
                <S.Input
                    value={audioUrl}
                    onChange={e => setAudioUrl(e.target.value)}
                    placeholder="https://..."
                />
            </S.Field>
            {error && <S.Error>{error}</S.Error>}

            <S.Submit type="submit" disabled={saving}>
                {saving ? "Zapisywanie..." : "Utwórz album"}
            </S.Submit>
        </S.Form>
    )
}

function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}