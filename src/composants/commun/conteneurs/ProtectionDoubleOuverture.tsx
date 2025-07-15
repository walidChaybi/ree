import { useEffect, useState } from "react";
import logoRECE from "../../../img/logo-rece.svg";
import AppChargeur from "../chargeurs/AppChargeur";

const ProtectionDoubleOuverture: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [verification, setVerification] = useState<"en-cours" | "deja_ouverte" | "ok">("en-cours");

  useEffect(() => {
    const DEMANDE_RECE_OUVERT = "demande_RECE_ouvert";
    const RECE_DEJA_OUVERT = "RECE_deja_ouvert";

    const envoyerMessage = (message: typeof DEMANDE_RECE_OUVERT | typeof RECE_DEJA_OUVERT) => {
      localStorage.setItem(message, Date.now().toString());
      localStorage.removeItem(message);
    };

    let autreAppDemarree = false;
    const listenerStorage = (event: StorageEvent) => {
      if (event.key === DEMANDE_RECE_OUVERT && event.newValue) envoyerMessage(RECE_DEJA_OUVERT);

      if (event.key === RECE_DEJA_OUVERT && event.newValue) autreAppDemarree = true;
    };
    window.addEventListener("storage", listenerStorage);

    envoyerMessage(DEMANDE_RECE_OUVERT);

    setTimeout(
      () => {
        autreAppDemarree && window.removeEventListener("storage", listenerStorage);
        setVerification(autreAppDemarree ? "deja_ouverte" : "ok");
      },
      process.env.NODE_ENV === "test" ? 50 : 300
    );
  }, []);

  return (
    <>
      {(() => {
        switch (verification) {
          case "en-cours":
            return <AppChargeur />;
          case "ok":
            return children;
          default:
            return (
              <main className="pt-44 text-center">
                <img
                  src={logoRECE}
                  alt="Logo RECE"
                />
                <h1 className="font-semibold text-bleu-sombre">{"L'application est déjà ouverte sur cet ordinateur"}</h1>
              </main>
            );
        }
      })()}
    </>
  );
};

export default ProtectionDoubleOuverture;
