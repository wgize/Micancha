import {
  RiUserAddLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { HoverButton } from "../../common/HoverButton";

export const HeaderButtons = ({ openOverlay }) => {
  let user = null;

  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined") {
      user = JSON.parse(raw);
    }
  } catch {
    user = null;
  }

  const isAuth = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {!isAuth && (
        <>
          <HoverButton
            icono={RiUserAddLine}
            texto="Registrarse"
            borderColor="white"
            tam="md"
            direccion="derecha"
            onClick={() => openOverlay("register")}
          />
          <HoverButton
            icono={RiLoginCircleLine}
            texto="Loguearse"
            borderColor="white"
            tam="md"
            direccion="derecha"
            onClick={() => openOverlay("login")}
          />
        </>
      )}

      {isAuth && (
        <HoverButton
          icono={RiLogoutCircleLine}
          texto="Cerrar sesión"
          borderColor="white"
          tam="md"
          direccion="derecha"
          onClick={handleLogout}
        />
      )}
    </>
  );
};
