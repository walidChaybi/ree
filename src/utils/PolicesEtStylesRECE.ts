const POLICES = ["Marianne-Regular", "Marianne-Regular_Italic", "Marianne-Bold", "Marianne-Bold_Italic"];

const LIBERATION = [
  { nom: "Regular", style: "normal", weight: "400" },
  { nom: "Italic", style: "italic", weight: "400" },
  { nom: "Bold", style: "normal", weight: "700" },
  { nom: "BoldItalic", style: "italic", weight: "700" }
];

class PolicesEtStylesRECE {
  static chargerPolices() {
    const publicUrl = import.meta.env.BASE_URL;

    POLICES.forEach(police =>
      new FontFace(police, `url('${publicUrl}/fonts/Marianne/${police}.woff')`)
        .load()
        .then(policeChargee => document.fonts.add(policeChargee))
        .catch(() => console.error(`Erreur lors du chargement de la police "${police}".`))
    );

    LIBERATION.forEach(policeLiberation =>
      new FontFace("Liberation Mono", `url('${publicUrl}/fonts/Liberation/LiberationMono-${policeLiberation.nom}.ttf')`, {
        style: policeLiberation.style,
        weight: policeLiberation.weight
      })
        .load()
        .then(policeChargee => document.fonts.add(policeChargee))
        .catch(() => console.error(`Erreur lors du chargement de la police "Liberation ${policeLiberation.nom}".`))
    );
  }

  static copieDansFenetreExterne(autreFenetre: Window) {
    document.fonts?.forEach(police => autreFenetre.document.fonts.add(police));

    Array.from(document.styleSheets || []).forEach(styleSheet => {
      if (!styleSheet.cssRules) return;

      const elementStyle = document.createElement("style");
      Array.from(styleSheet.cssRules).forEach(cssRule => {
        elementStyle.appendChild(document.createTextNode(cssRule.cssText));
      });
      autreFenetre.document.head.appendChild(elementStyle);
    });
  }
}

export default PolicesEtStylesRECE;
