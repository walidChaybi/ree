import { INationalitesForm } from "@model/form/commun/NationalitesForm";
import { useField } from "formik";
import React from "react";
import { MdAddCircle, MdDelete } from "react-icons/md";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

interface IPropsChampNationalite {
  nom: string;
  libelle: string;
  desactive?: boolean;
}

const ChampNationalite: React.FC<IPropsChampNationalite> = ({ nom, libelle, desactive }) => {
  const [champ, , helper] = useField<INationalitesForm>(nom);

  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampTexte
        name={`${nom}.nationalite1`}
        libelle={`${libelle}${champ.value.nationalitesAffichees > 1 ? " 1" : ""}`}
        optionFormatage="PREMIER_MAJUSCULE"
        disabled={desactive}
      />

      <div className="flex items-end gap-4">
        <BoutonIcon
          type="button"
          title="Ajouter une nationalité"
          aria-label="Ajouter une nationalité"
          onClick={() =>
            champ.value.nationalitesAffichees < 3 &&
            helper.setValue({
              ...champ.value,
              nationalitesAffichees: champ.value.nationalitesAffichees + 1
            })
          }
          disabled={champ.value.nationalitesAffichees >= 3}
          styleBouton="principal"
        >
          <div className="flex items-center gap-4 px-2">
            <MdAddCircle aria-hidden />
            <span className="font-marianne text-sm font-bold">{"Ajouter une nationalité"}</span>
          </div>
        </BoutonIcon>
      </div>

      {champ.value.nationalitesAffichees >= 2 && (
        <ChampTexte
          name={`${nom}.nationalite2`}
          libelle={`${libelle} 2`}
          optionFormatage="PREMIER_MAJUSCULE"
          disabled={desactive}
          boutonChamp={{
            composant: (
              <BoutonIcon
                className="group absolute right-0 h-full rounded-l-none bg-transparent"
                type="button"
                title="Supprimer cette nationalité"
                aria-label="Supprimer cette nationalité"
                onClick={() => {
                  helper.setValue({
                    ...champ.value,
                    nationalitesAffichees: champ.value.nationalitesAffichees - 1,
                    nationalite2: champ.value.nationalite3,
                    nationalite3: ""
                  });
                }}
                styleBouton="suppression"
                disabled={desactive}
              >
                <MdDelete
                  className="text-rouge group-hover:text-blanc group-focus:text-blanc"
                  aria-hidden
                />
              </BoutonIcon>
            )
          }}
        />
      )}

      {champ.value.nationalitesAffichees === 3 && (
        <ChampTexte
          name={`${nom}.nationalite3`}
          libelle={`${libelle} 3`}
          optionFormatage="PREMIER_MAJUSCULE"
          disabled={desactive}
          boutonChamp={{
            composant: (
              <BoutonIcon
                className="group absolute right-0 h-full rounded-l-none bg-transparent"
                type="button"
                title="Supprimer cette nationalité"
                aria-label="Supprimer cette nationalité"
                onClick={() =>
                  helper.setValue({
                    ...champ.value,
                    nationalitesAffichees: 2,
                    nationalite3: ""
                  })
                }
                styleBouton="suppression"
                disabled={desactive}
              >
                <MdDelete
                  className="text-rouge group-hover:text-blanc group-focus:text-blanc"
                  aria-hidden
                />
              </BoutonIcon>
            )
          }}
        />
      )}
    </div>
  );
};

export default ChampNationalite;
