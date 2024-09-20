const POLICES = [
  "NotoSansUI-Regular",
  "NotoSansUI-Italic",
  "NotoSansUI-Bold",
  "NotoSansUI-BoldItalic"
];

class PolicesRECE {
  static charger() {
    const publicUrl = import.meta.env.BASE_URL;
    POLICES.forEach(police =>
      new FontFace(police, `url('${publicUrl}/fonts/${police}.ttf')`)
        .load()
        .then(policeChargee => document.fonts.add(policeChargee))
        .catch(() =>
          console.error(`Erreur lors du chargement de la police "${police}".`)
        )
    );
  }
}

export default PolicesRECE;
