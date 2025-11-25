import { getBulletinIdentificationByIdActe } from "@api/appels/etatcivilApi";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";

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

export const useModalBulletinIdentification = (id: string): IModalBulletinIdentificationResultat => {
  const [resultat, setResultat] = useState<IDataBulletinIdentificationResultat>();

  useEffect(() => {
    if (id) {
      getBulletinIdentificationByIdActe(id)
        .then(res => {
          const resultatMapper = mappingBulletinIdentificationDTOToAffichageBulletinIdentification(res.body.data);
          setResultat(resultatMapper);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible de récuperer les informations concernant le bulletin d'identification du titulaire.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
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
    dataBulletinIdentification: resultat || ({} as IDataBulletinIdentificationResultat)
  };
};

const mappingBulletinIdentificationDTOToAffichageBulletinIdentification = (data: any): IDataBulletinIdentificationResultat => {
  return {
    nom: getValeurOuUndefined(data.nom),
    prenoms: getValeurOuUndefined(data.prenoms),
    sexe: Sexe.getEnumFor(getValeurOuUndefined(data.sexe)).libelle,
    dateNaissance: getValeurOuUndefined(data.dateNaissance),
    lieuNaissance: getValeurOuUndefined(data.lieuNaissance)
  };
};
