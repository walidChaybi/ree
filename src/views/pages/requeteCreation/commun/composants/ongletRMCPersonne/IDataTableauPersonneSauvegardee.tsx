import {
  IPersonnesSauvegardeesParams,
  usePersonnesSauvegardeesApiHook
} from "@hook/personnes/PersonnesSauvegardeesApiHook";
import { IPersonneSauvegardee } from "@model/requete/IPersonneSauvegardee";
import { getValeurOuUndefined, ZERO } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { IPersonneSauvegardeeDto } from "../../../../../../dto/etatcivil/personne/personnesSauvegardees/IPersonneSauvegardeeDto";

export interface IDataTableauPersonneSelectionnee {
  idPersonne: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  sexe?: string;
  role?: string;
}

interface IDataTableauPersonneSelectionneeHook {
  dataPersonnesSauvegardees: IDataTableauPersonneSelectionnee[];
  setDataPersonnesSauvegardees: React.Dispatch<
    React.SetStateAction<IDataTableauPersonneSelectionnee[]>
  >;
}

export function useDataTableauPersonneSauvegardeeHook(
  personnesSauvegardees?: IPersonneSauvegardee[]
): IDataTableauPersonneSelectionneeHook {
  const [dataPersonnesSauvegardees, setDataPersonnesSauvegardees] = useState<
    IDataTableauPersonneSelectionnee[]
  >([]);
  const [personnesSauvegardeesParams, setPersonneSauvegardeeParams] =
    useState<IPersonnesSauvegardeesParams>();
  const resultatPersonnesSauvegardees = usePersonnesSauvegardeesApiHook(
    personnesSauvegardeesParams
  );

  useEffect(() => {
    if (personnesSauvegardees && personnesSauvegardees.length > ZERO) {
      setPersonneSauvegardeeParams({
        idPersonnes: personnesSauvegardees.map(personne => personne.idPersonne)
      });
    }
  }, [personnesSauvegardees]);

  useEffect(() => {
    if (resultatPersonnesSauvegardees && personnesSauvegardees) {
      const data = [...resultatPersonnesSauvegardees];
      setDataPersonnesSauvegardees(
        data.map(dataCourant => ({
          ...mapDataTableauPersonneSelectionnee(dataCourant),
          role: personnesSauvegardees.find(
            personne => personne.idPersonne === dataCourant.idPersonne
          )?.role.libelle
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatPersonnesSauvegardees]);

  return {
    dataPersonnesSauvegardees,
    setDataPersonnesSauvegardees
  };
}

function mapDataTableauPersonneSelectionnee(
  data: IPersonneSauvegardeeDto
): IDataTableauPersonneSelectionnee {
  return {
    ...data,
    sexe: getValeurOuUndefined(data.sexe).libelle.charAt(0)
  };
}
