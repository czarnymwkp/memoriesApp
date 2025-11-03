import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
`

export const Box = styled.form`
  background: ${({ theme }) => theme.colors.card};
  padding: 32px;
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
`

export const Title = styled.h3`
  margin: 0 0 8px 0;
`

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: #1e1e1e;
  color: ${({ theme }) => theme.colors.text};
  outline: 1px solid #2a2a2a;
  &:focus { outline-color: ${({ theme }) => theme.colors.accent}; }
`

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 600;
  &[disabled]{ opacity: .7; cursor: not-allowed; }
`

export const Error = styled.p`
  color: #ff6b6b;
  margin: 4px 0 0;
  font-size: 0.9rem;
`
