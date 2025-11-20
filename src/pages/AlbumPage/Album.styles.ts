import styled from "styled-components"

export const Page = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 100%;
  border-radius:20px;
  overflow: hidden;
  color: white;
`

export const Background = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(5px) brightness(0.45);
  transform: scale(1.15);
  animation: zoomIn 25s ease-in-out infinite alternate;

  @keyframes zoomIn {
    from { transform: scale(1.10); }
    to   { transform: scale(1.20); }
  }
`


export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2),
    rgba(0,0,0,0.8)
  );
`

export const Content = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  z-index: 10;
  max-width: 50%;
  animation: fadeIn 1.2s ease forwards;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 20px;
  text-shadow: 0 0 15px rgba(0,0,0,0.9);
`

export const Loading = styled.div`
  padding: 50px;
  color: white;
`

export const Error = styled.div`
  padding: 50px;
  color: red;
`
export const Poster = styled.div`
  width: 350px;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  transform: perspective(1200px) rotateY(var(--rotY)) rotateX(var(--rotX));
  transition: transform .15s ease-out;
`
export const ButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`

export const NButton = styled.button`
  padding: 12px 28px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.25);
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  transition: background .3s;

  &:hover {
    background: rgba(255,255,255,0.25);
  }
`
