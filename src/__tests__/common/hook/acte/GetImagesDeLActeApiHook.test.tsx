import {
    IGetImagesDeLActeParams,
    useGetImagesDeLActe
} from "@hook/acte/GetImagesDeLActeApiHook";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";

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


