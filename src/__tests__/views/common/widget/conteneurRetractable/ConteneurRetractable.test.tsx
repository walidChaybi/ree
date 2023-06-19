import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";

const renderConteneurRetractable = async () => {
  const Wrapper = () => {
    return (
      <ConteneurRetractable titre="testConteneur" initConteneurFerme={false} />
    );
  };

  await act(async () => {
    render(<Wrapper />);
  });
};

test("Attendu: Un clic sur un conteneur retractable fait apparaitre/disparaitre son contenu", async () => {
  await renderConteneurRetractable();

  const conteneurRetractable = screen.getByText("testConteneur");

  await waitFor(() => {
    expect(conteneurRetractable.classList.contains("vertical")).toBeFalsy();
  });

  act(() => {
    fireEvent.click(conteneurRetractable);
  });

  await waitFor(() => {
    expect(conteneurRetractable.classList.contains("vertical")).toBeTruthy();
  });
});
