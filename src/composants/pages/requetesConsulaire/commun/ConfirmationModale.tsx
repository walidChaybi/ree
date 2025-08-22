import { useCallback, useState } from "react";
import { MdLoop } from "react-icons/md";

interface IBoutonPopin {
  libelle: string;
  action: () => void | Promise<void>;
  variante?: "primaire" | "secondaire" | "danger" | "succes";
  desactive?: boolean;
  enChargement?: boolean;
  icone?: React.ReactNode;
}

interface IConfigPopin {
  titre?: string;
  messages: string[];
  boutons: IBoutonPopin[];
  typePopin?: "confirmation" | "alerte" | "erreur" | "succes" | "information";
  tailleFenetre?: "petite" | "moyenne" | "grande";
}

export const useModaleConfirmation = () => {
  const [estOuvert, setEstOuvert] = useState(false);
  const [config, setConfig] = useState<IConfigPopin | null>(null);
  const [boutonsEnChargement, setBoutonsEnChargement] = useState<Set<number>>(new Set());

  const fermer = useCallback(() => {
    setEstOuvert(false);
    setBoutonsEnChargement(new Set());
  }, []);

  const ouvrir = useCallback((configPopin: IConfigPopin) => {
    setConfig(configPopin);
    setEstOuvert(true);
  }, []);

  const executerAction = useCallback(
    async (indexBouton: number, action: () => void | Promise<void>) => {
      try {
        setBoutonsEnChargement(prev => new Set([...prev, indexBouton]));
        await action();
        fermer();
      } catch (erreur) {
        console.error("Erreur lors de l'exécution de l'action:", erreur);
      } finally {
        setBoutonsEnChargement(prev => {
          const nouveau = new Set(prev);
          nouveau.delete(indexBouton);
          return nouveau;
        });
      }
    },
    [fermer]
  );

  const getClassesBouton = useCallback((variante: IBoutonPopin["variante"], estDesactive: boolean) => {
    const baseClasses = "px-4 py-2 transition-colors duration-200 flex items-center gap-2";

    if (estDesactive) {
      return `${baseClasses} bg-gray-100 text-gris-sombre cursor-not-allowed`;
    }

    switch (variante) {
      case "primaire":
        return `${baseClasses} bg-bleu text-white hover:bg-bleu/90`;
      case "danger":
        return `${baseClasses} bg-rouge hover:bg-rouge/80 text-white`;
      case "succes":
        return `${baseClasses} bg-green-600 hover:bg-green-700 text-white`;
      default:
        return `${baseClasses} bg-gris hover:bg-gris/80 text-gray-800`;
    }
  }, []);

  const getIconeType = useCallback((type: IConfigPopin["typePopin"]) => {
    switch (type) {
      case "erreur":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-red-600">⚠</span>
          </div>
        );
      case "succes":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl text-green-600">✓</span>
          </div>
        );
      case "alerte":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <span className="text-2xl text-orange-700">!</span>
          </div>
        );
      case "information":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl text-blue-600">i</span>
          </div>
        );
      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl text-gray-600">?</span>
          </div>
        );
    }
  }, []);

  const getClassesTaille = useCallback((taille: IConfigPopin["tailleFenetre"]) => {
    switch (taille) {
      case "petite":
        return "max-w-sm";
      case "grande":
        return "max-w-4xl";
      default:
        return "max-w-md";
    }
  }, []);

  const ModaleAlerte =
    estOuvert && config ? (
      <div className="fixed left-0 top-0 z-[1000] flex h-screen w-screen animate-entree-gauche items-center justify-center bg-black/50">
        <div className="flex">
          <div className={`w-full ${getClassesTaille(config.tailleFenetre)} rounded-lg bg-white shadow-2xl`}>
            <div className="flex-col items-start">
              <div className="flex items-center gap-4 rounded-t-lg bg-gris/20 p-3">
                {getIconeType(config.typePopin)}
                {config.titre && <h2 className="text-xl font-bold text-black">{config.titre}</h2>}
              </div>

              <div className="px-4">
                {config.messages.map((message, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed"
                  >
                    {message}
                  </p>
                ))}
              </div>
            </div>

            <div className="m-2 mt-8 flex justify-end gap-3">
              {config.boutons.map((bouton, index) => {
                const estEnChargement = boutonsEnChargement.has(index);
                const estDesactive = bouton.desactive || estEnChargement;

                return (
                  <button
                    key={index}
                    type="button"
                    title={bouton.libelle}
                    className={getClassesBouton(bouton.variante, estDesactive)}
                    disabled={estDesactive}
                    onClick={() => executerAction(index, bouton.action)}
                  >
                    {bouton.icone}
                    <span>{bouton.libelle}</span>
                    {estEnChargement ? (
                      <MdLoop
                        className="text-md animate-spin"
                        aria-label="Chargement en cours"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return {
    estOuvert,
    ouvrir,
    fermer,
    ModaleAlerte
  };
};

export type { IConfigPopin };
