import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Admin } from "../pages/Admin";
import { AuthGate } from "../features/auth/AuthGate";
import { Album } from "../pages/Album";
import { Library } from "../pages/Librabry/Library";
import { Register } from "../pages/Register/Register";

export const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/library", element: <AuthGate><Library /></AuthGate> },
    { path: "/album/:id", element: <AuthGate><Album /></AuthGate> },
    { path: "/admin", element: <AuthGate><Admin /></AuthGate> },
    { path: "/", element: <Navigate to="/library" replace /> },
    { path: "*", element: <Navigate to="/" replace /> }
])