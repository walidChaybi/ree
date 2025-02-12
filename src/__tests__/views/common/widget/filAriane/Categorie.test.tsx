import { URL_REQUETES } from "@api/appels/requeteApi";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_BASE } from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Categorie } from "@widget/filAriane/Categorie";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe.skip("Categorie - ", () => {
  test("renders pas la dernière categorie et clic sur fil ariane", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_BASE}
              message={"accueil.test"}
              last={false}
            />
          )
        },
        {
          path: URL_BASE,
          element: <AccueilPage />
        }
      ],
      [URL_REQUETES]
    );
    const { getByText } = render(<RouterProvider router={router} />);
    waitFor(() => {
      const linkElement = getByText(/accueil.test/);
      expect(linkElement).toBeDefined();
      expect(linkElement.className).toBe("LinkFilAriane");
      fireEvent.click(linkElement);
    });
  });

  test("renders pas la dernière categorie et clic sur element message", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_BASE}
              message={"accueil.test"}
              last={false}
            />
          )
        },
        {
          path: URL_BASE,
          element: <AccueilPage />
        }
      ],
      [URL_REQUETES]
    );
    const { getByText } = render(<RouterProvider router={router} />);
    waitFor(() => {
      expect(router.state.historyAction.length).toBe(3);
    });

    const linkElement = getByText("accueil.test");
    fireEvent.click(linkElement);

    waitFor(() => {
      expect(router.state.historyAction.length).toBe(4);
    });
  });

  test("renders la derniere catégorie", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_BASE}
              message={"accueilString"}
              last={true}
            />
          )
        },
        {
          path: URL_BASE,
          element: <AccueilPage />
        }
      ],
      [URL_REQUETES]
    );
    const { getByText } = render(<RouterProvider router={router} />);
    waitFor(() => {
      const linkElement = getByText("accueilString");
      expect(linkElement).toBeDefined();
      expect(linkElement.className).toBe("TextFilAriane");
    });
  });

  test("renders pas la dernière categorie et clic sur element Accueil", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES,
          element: (
            <Categorie
              url={URL_BASE}
              message={"Accueil"}
              last={false}
            />
          )
        },
        {
          path: URL_BASE,
          element: <AccueilPage />
        }
      ],
      ["/test2", URL_REQUETES]
    );
    const { getAllByText } = render(<RouterProvider router={router} />);

    waitFor(() => {
      expect(router.state.historyAction).toHaveLength(3);
    });

    const linkElement = getAllByText("Accueil");
    fireEvent.click(linkElement[0]);

    waitFor(() => {
      expect(router.state.historyAction).toHaveLength(4);
    });
  });
});
