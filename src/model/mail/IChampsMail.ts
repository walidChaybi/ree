//|         |                            |
//|         |    Mail reponse Req Info   |
//|---------|----------------------------|
//| champ 1 | "Sous-type demande"        |
//| champ 2 | "Objet demande"            |
//| champ 3 | "Complément objet demande" |
//| champ 4 | "Référence demande"        |
//| champ 5 | "Date création demande"    |
//| champ 6 | "Contenu"                  |
//|---------|----------------------------|

export interface IChampsMail {
  champ1: string;
  champ2: string;
  champ3: string;
  champ4: string;
  champ5: string;
  champ6: string;
}
