import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TOutilRetoucheImage } from "../../../../../../composants/commun/retoucheImage/barreOutils/BarreOutils";
import AffichageSelection from "../../../../../../composants/commun/retoucheImage/barreOutils/selection/AffichageSelection";
import { TCoordonnees } from "../../../../../../composants/commun/retoucheImage/Canvas";

const rendreComposant = ({
  outilSelectionne,
  zoom = 1,
  offset = { x: 0, y: 0 },
  debutSelectionRectangulaire = null,
  finSelectionRectangulaire = null,
  positionSouris = null,
  pointsSelectionPolygonale = []
}: {
  outilSelectionne: TOutilRetoucheImage;
  zoom?: number;
  offset?: TCoordonnees;
  debutSelectionRectangulaire?: TCoordonnees | null;
  finSelectionRectangulaire?: TCoordonnees | null;
  positionSouris?: TCoordonnees | null;
  pointsSelectionPolygonale?: TCoordonnees[];
}) => {
  return render(
    <AffichageSelection
      zoom={zoom}
      offset={offset}
      outilSelectionne={outilSelectionne}
      debutSelectionRectangulaire={debutSelectionRectangulaire}
      finSelectionRectangulaire={finSelectionRectangulaire}
      positionSouris={positionSouris}
      pointsSelectionPolygonale={pointsSelectionPolygonale}
    />
  );
};

describe("Test du composant AffichageSelection", () => {
  test("Lorsque j'ai une sélection rectangulaire en cours de création, un aperçu s'affiche entre le point de départ et la position de ma souris", () => {
    const { container } = rendreComposant({
      outilSelectionne: "selectionRectangulaire",
      debutSelectionRectangulaire: { x: 10, y: 25 },
      positionSouris: { x: 40, y: 65 }
    });

    const selectionRectangulaireTemporaire = container.querySelector("#selection-rectangulaire-temporaire") as HTMLDivElement;

    expect(selectionRectangulaireTemporaire.style.top).toBe("25px");
    expect(selectionRectangulaireTemporaire.style.left).toBe("10px");
    expect(selectionRectangulaireTemporaire.style.width).toBe("30px");
    expect(selectionRectangulaireTemporaire.style.height).toBe("40px");
  });

  test("Lorsque j'ai une sélection rectangulaire terminée, celle-ci s'affiche selon les coordonnées passées en props", () => {
    const { container } = rendreComposant({
      outilSelectionne: "deplacement",
      debutSelectionRectangulaire: { x: 10, y: 25 },
      finSelectionRectangulaire: { x: 55, y: 85 }
    });

    const selectionRectangulaire = container.querySelector("#selection-rectangulaire") as HTMLDivElement;

    expect(selectionRectangulaire.style.top).toBe("25px");
    expect(selectionRectangulaire.style.left).toBe("10px");
    expect(selectionRectangulaire.style.width).toBe("45px");
    expect(selectionRectangulaire.style.height).toBe("60px");
  });

  test("Lorsque j'ai une sélection polygonale en cours de création, les côtés créés sont affichés", () => {
    const { container } = rendreComposant({
      outilSelectionne: "selectionPolygonale",
      pointsSelectionPolygonale: [
        { x: 10, y: 25 },
        { x: 32, y: 23 },
        { x: 28, y: 9 }
      ]
    });

    const selectionPolygonaleTemporaire = container.querySelector("#selection-polygonale-temporaire") as SVGElement;

    const lignes = selectionPolygonaleTemporaire.querySelectorAll("line");

    expect(lignes).toHaveLength(2);
  });

  test("Lorsque j'ai une sélection polygonale terminée, celle-ci s'affiche selon les coordonnées passées en props", () => {
    const { container } = rendreComposant({
      outilSelectionne: "deplacement",
      pointsSelectionPolygonale: [
        { x: 10, y: 25 },
        { x: 32, y: 23 },
        { x: 28, y: 9 },
        { x: 9, y: 25 }
      ]
    });

    const selectionPolygonaleTemporaire = container.querySelector("#selection-polygonale") as SVGElement;

    const polygone = selectionPolygonaleTemporaire.querySelector("polygon");

    expect(polygone).not.toBeNull();
  });

  test("Lorsque je n'ai aucune sélection en cours ou terminée, le composant retourne null", () => {
    const { container } = rendreComposant({
      outilSelectionne: "deplacement"
    });

    expect(container.firstChild).toBeNull();
  });
});
