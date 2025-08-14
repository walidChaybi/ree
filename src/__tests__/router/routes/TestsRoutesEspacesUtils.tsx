import { render } from "@testing-library/react";
import { Link, Outlet, RouteObject, RouterProvider, createMemoryRouter } from "react-router";
import { TInfoPageRECE } from "../../../router/infoPages/InfoPageRECE";

export const TITRE_DEPART = "Départ";

export const renderRouterEspace = <TUrl extends string>(routes: RouteObject[], infosPages: { [cle: string]: TInfoPageRECE<TUrl> }) => {
  const router = createMemoryRouter([
    {
      path: "",
      element: (
        <div>
          <Outlet />
          {Object.values(infosPages).map(infoPage => (
            <Link
              key={infoPage.titre}
              title={infoPage.titre}
              to={infoPage.url}
            />
          ))}
        </div>
      ),
      children: [
        {
          index: true,
          element: <h1>{TITRE_DEPART}</h1>
        },
        ...routes.map(route => ({
          ...route,
          element: (
            <>
              <h2>{route.path}</h2>
              {route.element}
            </>
          )
        }))
      ]
    }
  ]);

  return render(<RouterProvider router={router} />);
};
