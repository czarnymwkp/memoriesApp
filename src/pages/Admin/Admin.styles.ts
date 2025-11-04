import styled from "styled-components"

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`

export const Header = styled.h1`
  margin: 0;
  padding: 16px;
  font-size: 1.4rem;
`

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 0 16px 24px;

  @media (max-width: ${({ theme }) => ("bp" in theme ? (theme as any).bp.md : "768px")}) {
    grid-template-columns: 1fr;
  }
`

export const Column = styled.div``

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px;
`

export const CardTitle = styled.h3`
  margin: 0 0 12px 0;
`
