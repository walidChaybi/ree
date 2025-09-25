import { creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto } from "@mock/data/etatcivil/acte/mockAnalyseMarginale";
import { MOCK_EVENEMENT } from "@mock/data/etatcivil/acte/mockIEvenement";
import { MOCK_REGISTRE_ACQ } from "@mock/data/etatcivil/acte/mockRegistre";
import { MOCK_DEUX_TITULAIRES_ACTE, MOCK_TITULAIRE_ACTE } from "@mock/data/etatcivil/acte/mockTitulaireActe";
import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { FicheActe, IFicheActeDto } from "@model/etatcivil/acte/FicheActe";
import { ETypeActe } from "@model/etatcivil/enum/ETypeActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";

const ficheActeDtoMinimal: IFicheActeDto = {
  id: "idFicheActe",
  registre: MOCK_REGISTRE_ACQ,
  nature: "INCONNUE",
  visibiliteArchiviste: "NON",
  origine: "SCEC_DOCS",
  type: "INCONNU",
  statut: "SIGNE",
  numero: "1",
  referenceActe: "ACQ.X.1970.1.1",
  evenement: MOCK_EVENEMENT,
  titulaires: [MOCK_TITULAIRE_ACTE],
  mentions: [],
  personnes: [],
  alerteActes: [],
  analyseMarginales: [],
  corpsExtraitRectifications: []
};

export class MockFicheActeBuilder {
  private readonly ficheActeDto: IFicheActeDto;

  public constructor(private readonly ficheActeDtoSaisie: Partial<IFicheActeDto> = {}) {
    this.ficheActeDto = { ...ficheActeDtoMinimal };
  }

  public readonly deType = (typeActe: keyof typeof ETypeActe): this => {
    this.ficheActeDto.type = typeActe;

    switch (typeActe) {
      case "IMAGE":
        this.ficheActeDto.corpsTexte = undefined;
        this.ficheActeDto.corpsImage = { images: [{ contenu: imagePngVideBase64, noPage: 1 }] };
        break;
      case "TEXTE":
        this.ficheActeDto.corpsTexte = { texte: "Corps texte" };
        this.ficheActeDto.corpsImage = undefined;
        break;
      case "INCONNU":
        this.ficheActeDto.corpsTexte = undefined;
        this.ficheActeDto.corpsImage = undefined;
        break;
    }

    return this;
  };

  public readonly deNature = (natureActe: keyof typeof ENatureActe): this => {
    this.ficheActeDto.nature = natureActe;

    switch (natureActe) {
      case "MARIAGE":
        this.ficheActeDto.detailMariage = { contrat: "Contrat Mariage", existenceContrat: "OUI" };
        this.ficheActeDto.titulaires = MOCK_DEUX_TITULAIRES_ACTE;
        break;
      case "NAISSANCE":
      case "DECES":
      case "DIVORCE":
      case "SEPARATION":
      case "ADOPTION_SIMPLE":
      case "ABSENCE":
      case "RECONNAISSANCE":
      case "DIVERS":
      case "ADOPTION_PLENIERE":
      case "ADOPTION":
      case "ENFANT_SANS_VIE":
      case "INCONNUE":
        break;
    }

    return this;
  };

  public readonly deFamille = (familleRegistre: keyof typeof EFamilleRegistre): this => {
    switch (familleRegistre) {
      case "ACQ":
        this.ficheActeDto.registre = MOCK_REGISTRE_ACQ;
        this.ficheActeDto.referenceActe = "ACQ.X.1970.1.1";
        break;
      case "CSL":
      case "DEP":
      case "COL":
      case "AR2":
      case "AR3":
      case "OP2":
      case "OP3":
      case "JUG":
      case "MAR":
      case "CPN":
        break;
    }

    return this;
  };

  public readonly generer = (): FicheActe | null => {
    const ficheActeDtoFinale = { ...this.ficheActeDto, ...this.ficheActeDtoSaisie };

    if (!ficheActeDtoFinale.analyseMarginales.length)
      ficheActeDtoFinale.analyseMarginales = creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto(ficheActeDtoFinale.titulaires);

    return FicheActe.depuisDto(ficheActeDtoFinale);
  };

  public readonly genererDto = (): IFicheActeDto => {
    const ficheActeDtoFinale = { ...this.ficheActeDto, ...this.ficheActeDtoSaisie };

    if (!ficheActeDtoFinale.analyseMarginales.length)
      ficheActeDtoFinale.analyseMarginales = creerMockAnalyseMarginaleDtoDepuisTitulaireActeDto(ficheActeDtoFinale.titulaires);

    return ficheActeDtoFinale;
  };
}
