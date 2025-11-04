import { useState } from "react"
import * as S from "./Admin.styles"
import { AlbumsTable, type AlbumRow } from "./AlbumsTable"
import { AlbumForm, type NewAlbum } from "./AlbumForm"

export const Admin = () => {

    const [albums, setAlbums] = useState<AlbumRow[]>([])

    const handleCreate = (data: NewAlbum) => {
        const id = crypto.randomUUID()
        setAlbums(prev => [{ id, title: data.title, clients: data.clients, createdAt: Date.now(), coverPreviewUrl: data.coverFile ? URL.createObjectURL(data.coverFile) : "", audioUrl: data.audioUrl ?? "" }, ...prev])
    }
    const handleDelete = (id: string) => {
        setAlbums(prev => prev.filter(a => a.id !== id))
    }
    return (
        <S.Page>
            <S.Header>Panel Administratora</S.Header>
            <S.Layout>
                <S.Column>
                    <S.Card>
                        <S.CardTitle>Nowy Album</S.CardTitle>
                        <AlbumForm onCreate={handleCreate}></AlbumForm>
                    </S.Card>
                </S.Column>
                <S.Column>
                    <S.Card>
                        <S.CardTitle>Liata Albumów</S.CardTitle>
                        <AlbumsTable data={albums} onDelete={handleDelete}></AlbumsTable>
                    </S.Card>
                </S.Column>
            </S.Layout>
        </S.Page>
    )
}