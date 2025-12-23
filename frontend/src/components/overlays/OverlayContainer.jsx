// src/components/overlays/OverlayContainer.jsx
import { useOverlayControl } from "../../hooks/useOverlayControl";
import LoginOverlay from "./LoginOverlay";
import RegisterOverlay from "./RegisterOverlay";
import SupportOverlay from "./SupportOverlay";
import StoreOverlay from "./StoreOverlay";
import ReportOverlay from "./ReportOverlay";
import GuiaOverlay from './GuiaOverlay.jsx'
import ActualizacionesOverlay from './ActualizacionesOverlay.jsx'


export default function OverlayContainer() {
  const { isOpen, type, close } = useOverlayControl();

  return (
    <>
     {type === 'confirmar-reserva' && <ConfirmarReservaOverlay {...close} />}
      {type === 'guia' && <GuiaOverlay isOpen={isOpen} onClose={close} />}
      {type === 'actualizaciones' && <ActualizacionesOverlay isOpen={isOpen} onClose={close} />}
      {type === "login" && <LoginOverlay isOpen={isOpen} onClose={close} />}
      {type === "register" && (
        <RegisterOverlay isOpen={isOpen} onClose={close} />
      )}
      {type === "support" && <SupportOverlay isOpen={isOpen} onClose={close} />}
      {type === "store" && <StoreOverlay isOpen={isOpen} onClose={close} />}
      {type === "report" && <ReportOverlay isOpen={isOpen} onClose={close} />}
    </>
  );
}
