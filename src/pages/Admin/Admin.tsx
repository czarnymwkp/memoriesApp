import { useEffect, useState } from "react"
import * as S from "./Admin.styles"

import { AlbumsTable, type AlbumRow } from "./AlbumsTable"
import { AlbumForm, type NewAlbum } from "./AlbumForm"

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "../../lib/firebase"

import {
    doc,
    setDoc,
    serverTimestamp,
    collection,
    getDocs,
    deleteDoc,
} from "firebase/firestore"

export const Admin = () => {
    const [albums, setAlbums] = useState<AlbumRow[]>([])

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "albums"))
            const rows = snap.docs.map(doc => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = doc.data() as any

                return {
                    id: doc.id,
                    title: data.title,
                    clients: data.clientsEmails ?? [],
                    createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
                    coverPreviewUrl: data.coverUrl ?? "",
                    audioUrl: data.audioUrl ?? ""
                }
            })
            setAlbums(rows)
        }
        load()
    })

    const handleCreate = async (data: NewAlbum) => {
        console.log("START HANDLE CREATE", data)

        const albumId = crypto.randomUUID()

        let coverUrl: string | null = null

        try {
            if (data.coverFile) {
                const safeName = data.coverFile.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-zA-Z0-9.\-_]/g, "_")
                    .toLowerCase()

                const path = `albums/${albumId}/cover/${safeName}`
                const storageRef = ref(storage, path)

                await uploadBytes(storageRef, data.coverFile)
                coverUrl = await getDownloadURL(storageRef)
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
        try {
            const assetsSnap = await getDocs(collection(db, "albums", id, "assets"))

            for (const asset of assetsSnap.docs) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = asset.data() as any

                if (data.storagePath) {
                    console.log("USUWAM ASSET:", data.storagePath)
                    await deleteObject(ref(storage, data.storagePath))
                }

                await deleteDoc(asset.ref)
            }
            const albumSnap = await getDocs(collection(db, "albums"))
            const album = albumSnap.docs.find(d => d.id === id)

            if (album) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = album.data() as any

                if (data.coverUrl) {
                    const url = new URL(data.coverUrl)
                    const raw = url.pathname.split("/o/")[1]
                    const decoded = decodeURIComponent(raw).replace(/^\//, "")

                    console.log("USUWAM OKŁADKĘ:", decoded)

                    await deleteObject(ref(storage, decoded))
                }
            }
            await deleteDoc(doc(db, "albums", id))
            setAlbums(prev => prev.filter(a => a.id !== id))

        } catch (err) {
            console.error("Błąd usuwania albumu:", err)
        }
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
