import styled from "styled-components"

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(0,0,0,.75), rgba(0,0,0,0));
  z-index: ${({ theme }) => ("z" in theme ? (theme as any).z.header : 100)};
`

export const Brand = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 800;
  letter-spacing: .5px;
`

export const Spacer = styled.div`
  flex: 1;
`

export const User = styled.div`
  opacity: .85;
  font-size: 0.95rem;
`

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 600;
`

export const SectionTitle = styled.h2`
  margin: 16px;
  font-size: 1.2rem;
`

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  padding: 0 16px 24px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`

export const Tile = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  cursor: pointer;
  transition: transform .18s ease;
  &:hover { transform: scale(1.02); }
`

export const Cover = styled.div`
  aspect-ratio: 16 / 9;
  background: #202020;
`

export const TileTitle = styled.div`
  padding: 8px 10px 10px;
  font-size: 0.95rem;
`
