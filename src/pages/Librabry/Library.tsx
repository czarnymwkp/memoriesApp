import * as S from "./Library.style"
import { useAuth } from "../../features/auth/AuthContext"
export const Library = () => {
    const { user, logout } = useAuth()

    const mockALbum = Array.from({ length: 8 }).map((_, i) => (
        {
            id: String(i + 1),
            title: `Album ${i + 1}`,
            coverUrl: ""
        }
    ))
    return (
        <S.Page>
            <S.HeaderBar>
                <S.Brand>Memories</S.Brand>
                <S.Spacer></S.Spacer>
                <S.User>{user?.email}</S.User>
                <S.Button onClick={logout}>Wyloguj</S.Button>
            </S.HeaderBar>
            <S.SectionTitle>Twój album</S.SectionTitle>
            <S.Grid>
                {mockALbum.map(a => (
                    <S.Tile key={a.id} title={a.title}>
                        <S.Cover />
                        <S.TileTitle>{a.title}</S.TileTitle>
                    </S.Tile>
                ))}
            </S.Grid>
        </S.Page>
    )
}