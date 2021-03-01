export const UUID = new RegExp(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  "i"
);
export const CarateresAutorise = new RegExp(
  /^[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]+$/
);

// Formulaire de recherche (RMC)
export const CarateresAutoriseRecherche = new RegExp(
  /^[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .*-]+$/
);

export const AsterisqueRecherche = new RegExp(
  /^([0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]{1}|[0-9a-zA-ZÂÄÀÊËÉÈÎÏÔÖÛÜÙÇŸæÆœŒâäàêëéèîïôöûüùçÿ' .-]{2,}\*?)$/
);

export const numeroInscription = new RegExp(/^.{4}[-]/);
