import { EObjetRequeteInfo } from "./enum/EObjetRequeteInfo";

export interface IReponseRequeteInfo {
  id: string;
  libelle: string;
  objet: string;
  complementObjet: string;
  corpsMail: string;
  reponse?: string;
}

export const ReponseRequeteInfoUtils = {
  getNomenclatureReponseRequeteInfoFromObjetEtComplementObjet(
    reponseRequeteInfo: IReponseRequeteInfo | { objet: keyof typeof EObjetRequeteInfo; complementObjet: string },
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): IReponseRequeteInfo | undefined {
    return nomenclatureReponseRequetesInfos.find(
      reponse => reponse.objet === reponseRequeteInfo.objet && reponse.complementObjet === reponseRequeteInfo.complementObjet
    );
  },
  getNomenclatureReponseRequeteInfoParId(
    reponseRequeteInfo: IReponseRequeteInfo,
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): IReponseRequeteInfo | undefined {
    return nomenclatureReponseRequetesInfos.find(reponse => reponse.id === reponseRequeteInfo.reponse);
  },
  getLibelleNomenclatureReponseRequeteInfoParId(
    reponseRequeteInfo: IReponseRequeteInfo,
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): string {
    const nomenclatureReponseRequetInfo = this.getNomenclatureReponseRequeteInfoParId(reponseRequeteInfo, nomenclatureReponseRequetesInfos);

    return nomenclatureReponseRequetInfo ? nomenclatureReponseRequetInfo.libelle : "";
  }
};
