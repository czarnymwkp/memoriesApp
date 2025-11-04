import * as S from "./AlbumsTable.styles"
export type AlbumRow = {
    id: string,
    title: string,
    clients: string[],
    createdAt: number,
    coverPreviewUrl: string,
    audioUrl: string
}

export const AlbumsTable = ({ data, onDelete }: { data: AlbumRow[], onDelete: (id: string) => void }) => {
    if (data.length === 0) return <S.Empty>Brak albumu</S.Empty>

    return (
        <S.Table>
            <thead>
                <tr>
                    <th>Okładka</th>
                    <th>Tytuł</th>
                    <th>Klienci</th>
                    <th>utworzono</th>
                    <th>Akcje</th>
                </tr>
                <tbody>
                    {data.map((a => (
                        <tr key={a.id}>
                            <td>{a.coverPreviewUrl ? <S.Cover style={{ backgroundImage: `url(${a.coverPreviewUrl})` }} /> : <S.Cover />}</td>
                            <td>{a.title}</td>
                            <td><S.TagList>{a.clients.map(c => <S.Tag>{c}</S.Tag>)}</S.TagList></td>
                            <td>{new Date(a.createdAt).toLocaleString()}</td>
                            <td><S.Danger onClick={() => onDelete(a.id)} >Usuń</S.Danger></td>
                        </tr>
                    )))}
                </tbody>
            </thead>
        </S.Table>
    )
}