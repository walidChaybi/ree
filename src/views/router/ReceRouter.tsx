/* v8 ignore start */
import { Body } from "@core/body/Body";
import { Header } from "@core/header/Header";
import { PageMessage } from "@core/login/PageMessage";
import { IRoute } from "@util/route/IRoute";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import ReceRoute from "./ReceRoute";
import { routesRece } from "./ReceRoutes";
import { URL_CONTEXT_APP, URL_DECONNEXION } from "./ReceUrls";

export const receRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={URL_CONTEXT_APP}
        element={
          <>
            <Header />
            <Body />
          </>
        }
      >
        {routesRece.map((route: IRoute, index: number) => {
          return (
            <Route
              key={route.libelle}
              {...(route.url.length ? { path: route.url } : { index: true })}
              element={
                <ReceRoute route={route}>
                  <route.component {...route.props} />
                </ReceRoute>
              }
            />
          );
        })}
      </Route>
      <Route path={URL_DECONNEXION} element={<PageMessage />} />
      <Route path="*" element={<Navigate to={URL_CONTEXT_APP} />} />
    </>
  )
);
/* v8 ignore start */
