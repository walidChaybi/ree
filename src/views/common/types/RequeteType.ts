export interface ITitulaire {
  idTitulaire: string;
  position: number;
  nomNaissance: string;
  nomUsage: string;
  prenom1: string;
  prenom2?: string;
  prenom3?: string;
  jourNaissance?: number;
  moisNaissance?: number;
  anneeNaissance?: number;
  villeNaissance?: string;
  paysNaissance?: string;
  parent1?: string;
  parent2?: string;
  requete: string;
}

export interface IPieceJustificative {
  idPieceJustificative: string;
  nom: string;
  mimeType: string;
  taille: number;
  identifiantSwift: string;
}

export interface IDocumentDelivre {
  idDocumentDelivre: string;
  nom: string;
  conteneurSwift: string;
  contenu: string;
  mimeType: string;
  typeDocument: string;
  taille: number;
  identifiantSwift: string;
  reponse: any;
  avecCtv: boolean;
}
