import { TNumeroRcRcaPacsForm } from "@model/form/commun/NumeroRcRcaPacsForm";
import { useField } from "formik";
import { useMemo } from "react";
import { MdAddCircle } from "react-icons/md";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampRcRcaPacs from "./ChampNumeroRcRcaPacs";

interface IChampNumeroRcRcaPacsProps {
  libelle: string;
  cheminNumeroRcRcaPacs: string;
  prefixeNumeroRcRcaPacs: string;
  tailleMax: number;
}

const ChampNumeroRcRcaPacs: React.FC<IChampNumeroRcRcaPacsProps> = ({
  libelle,
  cheminNumeroRcRcaPacs,
  prefixeNumeroRcRcaPacs,
  tailleMax
}) => {
  const prefixeNomChamp = useMemo(
    () => (cheminNumeroRcRcaPacs ? `${cheminNumeroRcRcaPacs}.` : "").concat(prefixeNumeroRcRcaPacs),
    [cheminNumeroRcRcaPacs, prefixeNumeroRcRcaPacs]
  );
  const [champ, , helper] = useField<TNumeroRcRcaPacsForm>(cheminNumeroRcRcaPacs);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampRcRcaPacs
        name={`${prefixeNomChamp}1`}
        libelle={`${libelle}${champ.value?.nombreNumerosAffiches > 1 ? " 1" : ""}`}
      />

      {tailleMax > 1 && (
        <div className="flex justify-center pt-[1.6rem]">
          <BoutonIcon
            className="h-9 w-1/2"
            type="button"
            title="Ajouter un numéro"
            aria-label="Ajouter un numéro"
            onClick={() =>
              champ.value?.nombreNumerosAffiches < tailleMax &&
              helper.setValue({ ...champ.value, nombreNumerosAffiches: champ.value?.nombreNumerosAffiches + 1 })
            }
            hidden={champ.value?.nombreNumerosAffiches >= tailleMax}
            styleBouton="secondaire"
          >
            <div className="flex items-center gap-4 px-2">
              <MdAddCircle aria-hidden />
              <span className="font-marianne text-sm font-bold">{"Ajouter un numéro"}</span>
            </div>
          </BoutonIcon>
        </div>
      )}

      {Array.from({ length: (champ.value?.nombreNumerosAffiches ?? 1) - 1 }, (_, index) => index + 2).map(indexChamp => (
        <div key={`${indexChamp}`}>
          <ChampRcRcaPacs
            name={`${prefixeNomChamp}${indexChamp}`}
            libelle={`${libelle} ${indexChamp}`}
            actionSuppression={() =>
              helper.setValue({
                ...champ.value,
                nombreNumerosAffiches: champ.value?.nombreNumerosAffiches - 1,
                ...Array.from({ length: tailleMax + 1 - indexChamp }, (_, index) => index + indexChamp).reduce(
                  (numerosRcRcaPacs, indexNumero) => ({
                    ...numerosRcRcaPacs,
                    [`ligne${indexNumero}`]: champ.value?.[`ligne${indexNumero + 1}` as keyof TNumeroRcRcaPacsForm] ?? ""
                  }),
                  {}
                )
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ChampNumeroRcRcaPacs;
