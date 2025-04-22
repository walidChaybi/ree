export const UUID = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, "i");
export const CaracteresAutorises = new RegExp(/^[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]+$/);

export const CaracteresAutorisesAvecVirgule = new RegExp(/^[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ', .-]+$/);

// Formulaire de recherche (RMC)
export const CaracteresAutorisesRecherche = new RegExp(/^[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .*-]+$/);

export const AsterisqueRecherche = new RegExp(
  /^([0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]|[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]{2,}\*?)$/
);

export const NumeroInscription = new RegExp(/^\d{4}(-\d+)?$/);

export const CaracteresAlphanumeriques = new RegExp(/^[0-9a-zA-Z]+$/);

export const NumeroTelephone = new RegExp(/^[+]*[(]?\d{1,4}[)]?[-\s./0-9]*$/);
