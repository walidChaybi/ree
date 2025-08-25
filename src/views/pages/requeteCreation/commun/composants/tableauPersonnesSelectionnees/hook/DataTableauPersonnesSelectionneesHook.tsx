import { IPersonnesSauvegardeesParams, usePersonnesSauvegardeesApiHook } from "@hook/personnes/PersonnesSauvegardeesApiHook";
import { IPersonneSauvegardeeDto } from "@model/etatcivil/personne/IPersonneSauvegardeeDto";
import { IPersonneSauvegardee } from "@model/requete/IPersonneSauvegardee";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { getValeurOuUndefined } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { IDataTableauPersonneSelectionnee } from "../IDataTableauPersonneSelectionne";

interface IDataTableauPersonnesSelectionneesHook {
  dataPersonnesSelectionnees?: IDataTableauPersonneSelectionnee[];
  setDataPersonnesSelectionnees: React.Dispatch<React.SetStateAction<IDataTableauPersonneSelectionnee[] | undefined>>;
}

export function useDataTableauPersonnesSelectionneesHook(
  personnesSauvegardees?: IPersonneSauvegardee[],
  sousTypeRequete?: SousTypeCreation
): IDataTableauPersonnesSelectionneesHook {
  const [dataPersonnesSelectionnees, setDataPersonnesSelectionnees] = useState<IDataTableauPersonneSelectionnee[]>();
  const [personnesSauvegardeesParams, setPersonneSauvegardeeParams] = useState<IPersonnesSauvegardeesParams>();
  const resultatPersonnesSauvegardees = usePersonnesSauvegardeesApiHook(personnesSauvegardeesParams);

  useEffect(() => {
    if (personnesSauvegardees?.length) {
      setPersonneSauvegardeeParams({
        idPersonnes: personnesSauvegardees.map(personne => personne.idPersonne)
      });
    }
  }, [personnesSauvegardees]);

  useEffect(() => {
    if (resultatPersonnesSauvegardees && !SousTypeCreation.estSousTypeEtablissement(sousTypeRequete)) {
      setDataPersonnesSelectionnees(
        personnesSauvegardees
          ? [...resultatPersonnesSauvegardees].map(dataCourant => ({
              ...mapDataTableauPersonneSelectionnee(dataCourant),
              role: personnesSauvegardees.find(personne => personne.idPersonne === dataCourant.idPersonne)?.role.libelle
            }))
          : []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatPersonnesSauvegardees]);

  return {
    dataPersonnesSelectionnees,
    setDataPersonnesSelectionnees
  };
}

function mapDataTableauPersonneSelectionnee(data: IPersonneSauvegardeeDto): IDataTableauPersonneSelectionnee {
  return {
    ...data,
    sexe: getValeurOuUndefined(data.sexe).libelle.charAt(0)
  };
}
