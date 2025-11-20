import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../lib/firebase"
import * as S from "./Album.styles"
type Album = {
    title: string,
    coverUrl?: string | null
    audioUrl?: string | null

}
export const AlbumPage = () => {
    const { id } = useParams()
    const [album, setAlbum] = useState<Album | null>(null)
    const [loading, setLoading] = useState(true)
    const [tilt, setTitle] = useState({ x: 0, y: 0 })

    const onMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50
        const y = (e.clientY / window.innerWidth - 0.5) * -10
        setTitle({ x, y })
    }

    useEffect(() => {
        if (!id) return

            ; (async () => {
                const snap = await getDoc(doc(db, "albums", id))
                if (snap.exists()) {
                    setAlbum(snap.data() as Album)
                }
                setLoading(false)
            })()
    }, [id])

    if (loading) return <S.Loading>Ładowanie</S.Loading>
    if (!album) return <S.Loading>Album nie istnieje</S.Loading>

    return (
        <S.Page onMouseMove={onMouseMove}>
            <S.Page>
                <S.Background style={{ backgroundImage: `url(${album?.coverUrl})` }} />
                <S.Overlay />

                <S.Content>
                    <S.Poster
                        style={{
                            backgroundImage: `url(${album.coverUrl})`,
                            "--rotY": `${tilt.x}deg`,
                            "--rotX": `${tilt.y}deg`,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any}
                    />
                    <S.Title>{album?.title}</S.Title>
                    {album?.audioUrl && (<audio controls autoPlay>
                        <source src={album.audioUrl} />
                    </audio>)}
                </S.Content>
                <S.ButtonRow>
                    <S.NButton>Odtwórz album</S.NButton>
                    <S.NButton>Udostępnij</S.NButton>
                </S.ButtonRow>

            </S.Page>
        </S.Page>
    )
}