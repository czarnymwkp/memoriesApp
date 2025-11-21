import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Admin } from "../pages/Admin/Admin";
import { AuthGate } from "../features/auth/AuthGate";
import { Library } from "../pages/Librabry/Library";
import { Register } from "../pages/Register/Register";
import { Reset } from "../pages/Reset/Reset";
import { AlbumPage } from "../pages/AlbumPage/Album";
import { AdminAlbum } from "../pages/AdminAlbum/AdminAlbum";

export const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/reset", element: <Reset /> },
    { path: "/library", element: <AuthGate><Library /></AuthGate> },
    { path: "/album/:id", element: <AuthGate><AlbumPage /></AuthGate> },
    { path: "/admin/albums/:id", element: <AdminAlbum></AdminAlbum> },
    { path: "/admin", element: <AuthGate><Admin /></AuthGate> },
    { path: "/", element: <Navigate to="/library" replace /> },
    { path: "*", element: <Navigate to="/" replace /> }

])