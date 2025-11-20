import { useState } from "react"
import * as S from "./Admin.styles"

import { AlbumsTable, type AlbumRow } from "./AlbumsTable"
import { AlbumForm, type NewAlbum } from "./AlbumForm"

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../lib/firebase"

import {
    doc,
    setDoc,
    serverTimestamp
} from "firebase/firestore"

export const Admin = () => {
    const [albums, setAlbums] = useState<AlbumRow[]>([])

    const handleCreate = async (data: NewAlbum) => {
        console.log("START HANDLE CREATE", data)

        const albumId = crypto.randomUUID()

        let coverUrl: string | null = null

        try {
            if (data.coverFile) {
                console.log("START UPLOAD", data.coverFile)

                const path = `albums/${albumId}/cover/${data.coverFile.name}`
                const storageRef = ref(storage, path)

                await uploadBytes(storageRef, data.coverFile)

                console.log("UPLOAD DONE")

                coverUrl = await getDownloadURL(storageRef)
                console.log("DOWNLOAD URL", coverUrl)
            }

            console.log("BEFORE FIRESTORE WRITE")

            await setDoc(doc(db, "albums", albumId), {
                title: data.title,
                clientEmails: data.clients,
                coverUrl,
                audioUrl: data.audioUrl ?? null,
                createdAt: serverTimestamp()
            })

            console.log("FIRESTORE DONE")

            setAlbums(prev => [
                {
                    id: albumId,
                    title: data.title,
                    clients: data.clients,
                    createdAt: Date.now(),
                    coverPreviewUrl: coverUrl
                        ? coverUrl
                        : data.coverFile
                            ? URL.createObjectURL(data.coverFile)
                            : "",
                    audioUrl: data.audioUrl ?? ""
                },
                ...prev
            ])

            console.log("UI UPDATED")

        } catch (err) {
            console.error("FIREBASE ERROR:", err)
        }
    }


    const handleDelete = async (id: string) => {
        setAlbums(prev => prev.filter(a => a.id !== id))
    }

    return (
        <S.Page>
            <S.Header>Panel Administratora</S.Header>
            <S.Layout>
                <S.Column>
                    <S.Card>
                        <S.CardTitle>Nowy Album</S.CardTitle>
                        <AlbumForm onCreate={handleCreate} />
                    </S.Card>
                </S.Column>

                <S.Column>
                    <S.Card>
                        <S.CardTitle>Lista Albumów</S.CardTitle>
                        <AlbumsTable data={albums} onDelete={handleDelete} />
                    </S.Card>
                </S.Column>
            </S.Layout>
        </S.Page>
    )
}
