import { TNumeroInscriptionRcRcaForm } from "@model/form/commun/NumeroInscriptionRcRcaForm";
import AddCircle from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import { useField } from "formik";
import { useMemo } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampNumeroInscriptionRcRca from "./ChampNumeroInscriptionRcRca";

interface IChampsNumeroInscriptionRcRcaProps {
  libelle: string;
  cheminNumeroInscriptionRcRca: string;
  prefixeNumeroInscriptionRcRca: string;
  tailleMax: number;
}

const ChampsNumeroInscriptionRcRca: React.FC<IChampsNumeroInscriptionRcRcaProps> = ({
  libelle,
  cheminNumeroInscriptionRcRca,
  prefixeNumeroInscriptionRcRca,
  tailleMax
}) => {
  const prefixeNomChamp = useMemo(
    () => (cheminNumeroInscriptionRcRca ? `${cheminNumeroInscriptionRcRca}.` : "").concat(prefixeNumeroInscriptionRcRca),
    [cheminNumeroInscriptionRcRca, prefixeNumeroInscriptionRcRca]
  );
  const [champ, , helper] = useField<TNumeroInscriptionRcRcaForm>(cheminNumeroInscriptionRcRca);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampNumeroInscriptionRcRca
        name={`${prefixeNomChamp}1`}
        libelle={libelle}
        type="text"
        className="w-full"
        maxLength={10}
      />
      {tailleMax > 1 && (
        <div className="flex justify-center pt-[1.6rem]">
          <BoutonIcon
            className="h-9 w-1/2"
            type="button"
            title="Ajouter un numéro"
            onClick={() =>
              champ.value?.nombreNumerosAffiches < tailleMax &&
              helper.setValue({ ...champ.value, nombreNumerosAffiches: champ.value?.nombreNumerosAffiches + 1 })
            }
            hidden={champ.value?.nombreNumerosAffiches >= tailleMax}
            styleBouton="secondaire"
          >
            <div className="flex items-center gap-4 px-2">
              <AddCircle />
              <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un numéro"}</span>
            </div>
          </BoutonIcon>
        </div>
      )}
      {Array.from({ length: (champ.value?.nombreNumerosAffiches ?? 1) - 1 }, (_, index) => index + 2).map(indexChamp => (
        <div key={`${indexChamp}`}>
          <ChampNumeroInscriptionRcRca
            name={`${prefixeNomChamp}${indexChamp}`}
            libelle={`${libelle} ${indexChamp}`}
            className="w-full"
            maxLength={10}
          >
            <BoutonIcon
              className="group absolute right-0 h-full rounded-l-none bg-transparent"
              type="button"
              title="Supprimer ce numéro"
              onClick={() =>
                helper.setValue({
                  ...champ.value,
                  nombreNumerosAffiches: champ.value?.nombreNumerosAffiches - 1,
                  ...Array.from({ length: tailleMax + 1 - indexChamp }, (_, index) => index + indexChamp).reduce(
                    (numerosInscriptionRCRCA, indexNumero) => ({
                      ...numerosInscriptionRCRCA,
                      [`ligne${indexNumero}`]: champ.value?.[`ligne${indexNumero + 1}` as keyof TNumeroInscriptionRcRcaForm] ?? ""
                    }),
                    {}
                  )
                })
              }
              styleBouton="suppression"
            >
              <Delete className="text-rouge group-hover:text-blanc group-focus:text-blanc" />
            </BoutonIcon>
          </ChampNumeroInscriptionRcRca>
        </div>
      ))}
    </div>
  );
};

export default ChampsNumeroInscriptionRcRca;
