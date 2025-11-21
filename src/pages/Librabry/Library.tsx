import { useEffect, useState } from "react"
import { useAuth } from "../../features/auth/AuthContext"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../lib/firebase"
import * as S from "./Library.style"
import { useNavigate } from "react-router-dom"

type Album = {
    id: string,
    title: string,
    coverUrl: string | null
}

export const Library = () => {
    const { user, logout } = useAuth()
    const [albums, setAlbums] = useState<Album[]>([])

    const navigate = useNavigate()
    const email = user?.email ?? ""

    useEffect(() => {
        if (!email) return

            ; (async () => {

                const q = query(
                    collection(db, "albums"),
                    where("clientEmails", "array-contains", email)
                )

                const snap = await getDocs(q)
                const rows: Album[] = snap.docs.map(docSnap => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = docSnap.data() as any
                    return {
                        id: docSnap.id,
                        title: data.title ?? "",
                        coverUrl: data.coverUrl ?? null,
                    }
                })
                setAlbums(rows)
            })()
    }, [email])

    return (
        <>
            <S.Grid>
                {albums.map(album => (
                    <S.Tile key={album.id} title={album.title} onClick={() => navigate(`/album/${album.id}`)} >
                        {album.coverUrl ? (
                            <S.Cover style={{ backgroundImage: `url(${album.coverUrl})` }} />
                        ) : (<S.Cover />)}
                        <S.TileTitle>{album.title}</S.TileTitle>
                    </S.Tile>
                ))}

                {albums.length === 0 && (<S.Tile>Nie masz jeszcze albumów</S.Tile>)}
            </S.Grid>
            <S.Grid>
                <S.Button onClick={logout}>Wyloguj</S.Button>
                <S.Button onClick={() => navigate("/admin")}>Admin</S.Button>
            </S.Grid>
        </>
    )
}


