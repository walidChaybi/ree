interface IPerimetreDto {
  id?: string;
  nom?: string;
  description?: string;
  estActif?: boolean;
  listePays?: string;
  listeIdTypeRegistre?: string[];
}

export default IPerimetreDto;
