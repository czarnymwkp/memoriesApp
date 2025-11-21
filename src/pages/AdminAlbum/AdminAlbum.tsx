import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db, storage } from "../../lib/firebase"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"


type Asset = {
    id: string,
    url: string,
    storagePath: string
}
export const AdminAlbum = () => {

    const { id: albumId } = useParams()
    const [assets, setAssets] = useState<Asset[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!albumId) return

        const load = async () => {
            const snap = await getDocs(collection(db, "albums", albumId, "assets"))
            const rows = snap.docs.map(doc => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = doc.data() as any
                return {
                    id: doc.id,
                    url: data.url,
                    storagePath: data.storagePath
                }
            })
            setAssets(rows)
        }
        load()
    }, [albumId])

    const handleUpload = async (file: File) => {
        if (!albumId) return
        try {
            const safeName = file.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.\-_]/g, "_")
                .toLowerCase()

            const path = `albums/${albumId}/photos/${safeName}`
            const storageRef = ref(storage, path)

            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)

            const assetDoc = await addDoc(collection(db, "albums", albumId, "asset"), {
                url,
                storagePaath: path,
                createAt: serverTimestamp()
            })
            setAssets(prev => [
                ...prev,
                { id: assetDoc.id, url, storagePath: path }
            ])

        }
        finally {
            setLoading(false)
        }
    }

    const handleDelte = async (asset: Asset) => {
        if (!albumId) return

        await deleteObject(ref(storage, asset.storagePath))
        await deleteDoc(doc(db, "albums", albumId, "assets", asset.id))

        setAssets(prev => prev.filter(a => a.id !== asset.id))
    }
    return (
        <p></p>
    )
}
