import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ForumPage from "../sections/ForumSection/Components/ForumPage";
import { lazy } from "react";
import RoleGuard from "../guards/RoleGuard";

const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage.jsx"));
const CanchaListPage = lazy(() => import("../pages/CanchaListPage.jsx"));
const CanchaDetailPage = lazy(() => import("../pages/CanchaDetailPage.jsx"));
const ReservaPage = lazy(() => import("../pages/ReservaPage.jsx"));
const RegistrarCanchaPage = lazy(() =>
  import("../pages/RegistrarCanchaPage.jsx")
);
const MisCanchasPage = lazy(() => import("../pages/MisCanchasPage.jsx"));
const PanelDueñoPage = lazy(() => import("../pages/PanelDueñoPage.jsx"));
const AdminPage = lazy(() => import("../pages/AdminPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));
const ForbiddenPage = lazy(() => import("../pages/ForbiddenPage.jsx"));
const FavoritosPage = lazy(() => import("../pages/FavoritosPage.jsx"));
const MisReservasPage = lazy(() => import("../pages/MisReservasPage.jsx"));
const EditarCanchaPage = lazy(() => import("../pages/EditarCanchaPage.jsx"));

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "foro", element: <ForumPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/perfil", element: <UserProfilePage /> },
      { path: "canchas", element: <CanchaListPage /> },
      { path: "cancha/:id", element: <CanchaDetailPage /> },
      { path: "reservar/:id", element: <ReservaPage /> },
      { path: "favoritos", element: <FavoritosPage /> },
      { path: "reservas", element: <MisReservasPage /> },
      { path: "mis-canchas", element: <MisCanchasPage /> },
      { path: "panel-dueno", element: <PanelDueñoPage /> },
      { path: "registrar-cancha", element: <RegistrarCanchaPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "forbidden", element: <NotFoundPage /> },
      { path: "mis-canchas/:id/editar", element: <EditarCanchaPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { basename: "/MiCancha" },
]);
