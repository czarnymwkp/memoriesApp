import styled from "styled-components"

export const Empty = styled.div`
  opacity: .8;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead th {
    text-align: left;
    opacity: .85;
    font-weight: 600;
    padding: 8px;
    border-bottom: 1px solid #2a2a2a;
  }
  tbody td {
    padding: 8px;
    border-bottom: 1px solid #1f1f1f;
    vertical-align: top;
  }
`

export const Cover = styled.div`
  width: 120px;
  aspect-ratio: 16/9;
  background: #202020;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
`

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-width: 360px;
`

export const Tag = styled.span`
  background: #222;
  border: 1px solid #333;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.85rem;
`

export const Danger = styled.button`
  background: #b22;
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 600;
`
