import styled from "styled-components"

export const Form = styled.form`
  display: grid;
  gap: 12px;
`

export const Field = styled.div`
  display: grid;
  gap: 8px;
`

export const Label = styled.label`
  font-size: 0.95rem;
  opacity: .9;
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

export const FileInput = styled.input`
  color: ${({ theme }) => theme.colors.text};
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
`

export const SmallBtn = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 600;
`

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Chip = styled.button`
  background: #222;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid #333;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  span { margin-left: 6px; opacity: .8; }
`

export const Hint = styled.div`
  font-size: 0.85rem; opacity: .8;
`

export const Error = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
`

export const Submit = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 600;
`
