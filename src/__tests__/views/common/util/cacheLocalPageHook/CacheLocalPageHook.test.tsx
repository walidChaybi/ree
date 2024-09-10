import { render, screen, waitFor } from "@testing-library/react";
import { useCacheLocalPage } from "@util/cacheLocalPageHook/CacheLocalPageHook";
import React, { useEffect, useState } from "react";
import { expect, test, vi } from "vitest";

function useGetValeur(getValeur?: any, cle?: string) {
  const { cacheLocalPage } = useCacheLocalPage<string, string | undefined>(
    (str?: string) => str ?? ""
  );
  let valeur;
  if (cle && getValeur) {
    valeur = cacheLocalPage.get(cle);
    if (!valeur) {
      valeur = getValeur();
      cacheLocalPage.set(cle, valeur);
    }
  }
  return valeur;
}

const HookConsumerCache: React.FC<{ nomCle: string; getValeurMock: any }> = ({
  nomCle,
  getValeurMock
}) => {
  const [paramGetValeur, setParamGetValeur] = useState<{
    getValeurMock: any;
    nomCle: string;
  }>();

  const [valeur2, setValeur2] = useState<string>();

  const valeur = useGetValeur(
    paramGetValeur?.getValeurMock,
    paramGetValeur?.nomCle
  );

  useEffect(() => {
    setParamGetValeur({ nomCle, getValeurMock });
  }, []);

  useEffect(() => {
    setValeur2(valeur);
  }, [valeur]);

  return <div>{`${valeur}-${valeur2}`}</div>;
};

test("useCacheLocalPage DOIT renvoyer le résulat QUAND il est en cache", () => {
  const VALEUR_MOCK = "valeurMock";
  const getValeurMock = vi.fn(() => VALEUR_MOCK);

  render(<HookConsumerCache nomCle="cle1" getValeurMock={getValeurMock} />);

  waitFor(() => {
    expect(getValeurMock).toBeCalledTimes(1);
    expect(screen.getByText(`${VALEUR_MOCK}-${VALEUR_MOCK}`)).toBeDefined();
  });
});
