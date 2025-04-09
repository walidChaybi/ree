import { TPrenomsForm } from "@model/form/commun/PrenomsForm";
import AddCircle from "@mui/icons-material/AddCircle";
import Delete from "@mui/icons-material/Delete";
import { UN } from "@util/Utils";
import { useField } from "formik";
import { useMemo } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

interface IChampsPrenomsProps {
  cheminPrenoms: string;
  prefixePrenom: string;
}

const ChampsPrenoms: React.FC<IChampsPrenomsProps> = ({ cheminPrenoms, prefixePrenom }) => {
  const prefixeNomChamp = useMemo(() => (cheminPrenoms ? `${cheminPrenoms}.` : "").concat(prefixePrenom), [cheminPrenoms, prefixePrenom]);
  const [champ, , helper] = useField<TPrenomsForm>(cheminPrenoms);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampTexte
        name={`${prefixeNomChamp}1`}
        libelle={`Prénom ${champ.value.nombrePrenomsAffiches > UN ? "1" : ""}`.trim()}
        type="text"
        className="w-full"
      />
      <div className="pt-[1.6rem]">
        <BoutonIcon
          type="button"
          title="Ajouter un prénom"
          onClick={() =>
            champ.value.nombrePrenomsAffiches < 15 &&
            helper.setValue({ ...champ.value, nombrePrenomsAffiches: champ.value.nombrePrenomsAffiches + 1 })
          }
          disabled={champ.value.nombrePrenomsAffiches >= 15}
          styleBouton="principal"
        >
          <div className="flex items-center gap-4 px-2">
            <AddCircle />
            <span className="font-noto-sans-ui text-sm font-bold">{"Ajouter un prénom"}</span>
          </div>
        </BoutonIcon>
      </div>

      {Array.from({ length: (champ.value.nombrePrenomsAffiches ?? 1) - 1 }, (_, index) => index + 2).map(indexChamp => (
        <div key={`${prefixeNomChamp}${indexChamp}`}>
          <ChampTexte
            name={`${prefixeNomChamp}${indexChamp}`}
            libelle={`Prénom ${indexChamp}`}
            className="w-full"
            boutonChamp={{
              composant: (
                <BoutonIcon
                  className="group absolute right-0 h-full rounded-l-none bg-transparent"
                  type="button"
                  title="Supprimer ce prénom"
                  onClick={() =>
                    helper.setValue({
                      ...champ.value,
                      nombrePrenomsAffiches: champ.value.nombrePrenomsAffiches - 1,
                      ...Array.from({ length: 16 - indexChamp }, (_, index) => index + indexChamp).reduce(
                        (prenoms, indexPrenom) => ({
                          ...prenoms,
                          [`prenom${indexPrenom}`]: champ.value[`prenom${indexPrenom + 1}` as keyof TPrenomsForm] ?? ""
                        }),
                        {}
                      )
                    })
                  }
                  styleBouton="suppression"
                >
                  <Delete className="text-rouge group-hover:text-blanc group-focus:text-blanc" />
                </BoutonIcon>
              )
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChampsPrenoms;
