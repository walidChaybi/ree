export interface IReponseRequeteInfo {
  id: string;
  libelle: string;
  objet: string;
  complementObjet: string;
  corpsMail: string;
  reponse?: string;
}

export const ReponseRequeteInfo = {
  getNomenclatureReponseRequetInfoFromObjetEtComplementObjet(
    reponseRequeteInfo:
      | IReponseRequeteInfo
      | { objet: string; complementObjet: string },
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): IReponseRequeteInfo | undefined {
    return nomenclatureReponseRequetesInfos.find(
      reponse =>
        reponse.objet === reponseRequeteInfo.objet &&
        reponse.complementObjet === reponseRequeteInfo.complementObjet
    );
  },
  getNomenclatureReponseRequetInfoFromId(
    reponseRequeteInfo: IReponseRequeteInfo,
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): IReponseRequeteInfo | undefined {
    return nomenclatureReponseRequetesInfos.find(
      reponse => reponse.id === reponseRequeteInfo.reponse
    );
  },
  getLibelleNomenclatureReponseRequeteInfoFromId(
    reponseRequeteInfo: IReponseRequeteInfo,
    nomenclatureReponseRequetesInfos: IReponseRequeteInfo[]
  ): string {
    const nomenclatureReponseRequetInfo = this.getNomenclatureReponseRequetInfoFromId(
      reponseRequeteInfo,
      nomenclatureReponseRequetesInfos
    );

    return nomenclatureReponseRequetInfo
      ? nomenclatureReponseRequetInfo.libelle
      : "";
  }
};
