const POLICES = ["NotoSansUI-Regular", "NotoSansUI-Italic", "NotoSansUI-Bold", "NotoSansUI-BoldItalic"];

const LIBERATION = [
  { nom: "Regular", style: "normal", weight: "400" },
  { nom: "Italic", style: "italic", weight: "400" },
  { nom: "Bold", style: "normal", weight: "700" },
  { nom: "BoldItalic", style: "italic", weight: "700" }
];

class PolicesRECE {
  static charger() {
    const publicUrl = import.meta.env.BASE_URL;
    POLICES.forEach(police =>
      new FontFace(police, `url('${publicUrl}/fonts/${police}.ttf')`)
        .load()
        .then(policeChargee => document.fonts.add(policeChargee))
        .catch(() => console.error(`Erreur lors du chargement de la police "${police}".`))
    );

    LIBERATION.forEach(policeLiberation =>
      new FontFace("Liberation", `url('${publicUrl}/fonts/Liberation/LiberationMono-${policeLiberation.nom}.ttf')`, {
        style: policeLiberation.style,
        weight: policeLiberation.weight
      })
        .load()
        .then(policeChargee => document.fonts.add(policeChargee))
        .catch(() => console.error(`Erreur lors du chargement de la police "Liberation ${policeLiberation.nom}".`))
    );
  }
}

export default PolicesRECE;
