import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import {
  IGetImagesDeLActeParams,
  useGetImagesDeLActe
} from "../../../../views/common/hook/acte/GetImagesDeLActeApiHook";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const params: IGetImagesDeLActeParams = {
  idActe: "abcdc2b2-03b6-4b80-a90d-7f96e7807788"
};
const HookConsumerUseGetImagesDeLActe: React.FC = () => {
  const resultat = useGetImagesDeLActe(params);

  return (
    <div>{`${resultat?.imagesBase64[0]}, ${resultat?.imagesBase64[1]}`}</div>
  );
};
test("Attendu: le hook useGetImagesDeLActe fonctionne correctement", async () => {
  await act(async () => {
    render(<HookConsumerUseGetImagesDeLActe />);
  });

  await waitFor(() => {
    expect(screen.getByText("imgBase64_1, imgBase64_2")).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
