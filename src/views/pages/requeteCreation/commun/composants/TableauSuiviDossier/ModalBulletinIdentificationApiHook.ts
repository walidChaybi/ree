import { getBulletinIdentificationByIdActe } from "@api/appels/etatcivilApi";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { logError } from "@util/LogManager";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IDataBulletinIdentificationResultat {
  nom: string;
  prenoms: string;
  sexe: string;
  lieuNaissance: string;
  dateNaissance: string;
}

interface IModalBulletinIdentificationResultat {
  dataBulletinIdentification: IDataBulletinIdentificationResultat;
}

export function useModalBulletinIdentification(
  id: string
): IModalBulletinIdentificationResultat {
  const [resultat, setResultat] =
    useState<IDataBulletinIdentificationResultat>();

  useEffect(() => {
    if (id) {
      getBulletinIdentificationByIdActe(id)
        .then(res => {
          const resultatMapper =
            mappingBulletinIdentificationDTOToAffichageBulletinIdentification(
              res.body.data
            );
          setResultat(resultatMapper);
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récuperer les informations concernant le bulletin d'identification du titulaire.",
            error
          });
        });
    } else {
      setResultat({
        nom: "",
        prenoms: "",
        sexe: "",
        dateNaissance: "",
        lieuNaissance: ""
      });
    }
  }, [id]);

  return {
    dataBulletinIdentification:
      resultat || ({} as IDataBulletinIdentificationResultat)
  };
}

function mappingBulletinIdentificationDTOToAffichageBulletinIdentification(
  data: any
): IDataBulletinIdentificationResultat {
  return {
    nom: getValeurOuUndefined(data.nom),
    prenoms: getValeurOuUndefined(data.prenoms),
    sexe: Sexe.getEnumFor(getValeurOuUndefined(data.sexe)).libelle,
    dateNaissance: getValeurOuUndefined(data.dateNaissance),
    lieuNaissance: getValeurOuUndefined(data.lieuNaissance)
  };
}
