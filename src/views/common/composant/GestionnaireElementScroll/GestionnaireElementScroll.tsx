import { Step, StepButton, Stepper } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./scss/GestionnaireElementScroll.scss";

type GestionnaireElementScrollItemProps =
  | {
      element: JSX.Element;
      libelle: string;
    }
  | undefined;

type GestionnaireElementScrollProps = {
  elementListe: GestionnaireElementScrollItemProps[];
};

export const GestionnaireElementScroll: React.FC<
  GestionnaireElementScrollProps
> = props => {
  const refListe = useRef<Array<Element | null>>([]);
  const [etapeActive, setEtapeActive] = React.useState(0);
  const [observer] = useState<IntersectionObserver>(
    new IntersectionObserver(onElementEstVisibleCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.6
    })
  );

  function handleStep(i: number) {
    setEtapeActive(i);
    handleSmoothScroll(i);
  }

  function handleSmoothScroll(index: number) {
    refListe.current[index]?.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth"
    });
  }

  function onElementEstVisibleCallback(entries: IntersectionObserverEntry[]) {
    const tableauRatio = entries.map(entry => entry.intersectionRatio);
    const ratioElementLePlusVisible = Math.max(...tableauRatio);
    const elementChoisi = entries.find(
      en => en.intersectionRatio === ratioElementLePlusVisible
    );
    if (elementChoisi) {
      const index = refListe.current.indexOf(elementChoisi?.target);
      setEtapeActive(index);
    }
  }

  const initObserver = useCallback(() => {
    const tableauRef = refListe.current;

    tableauRef.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      tableauRef.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [observer]);

  useEffect(() => {
    return initObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="selecteursContainer">
        <Stepper nonLinear activeStep={etapeActive}>
          {props.elementListe.map((el, i) => {
            return el ? (
              <Step key={i}>
                <StepButton
                  data-testid={`scrollBouton${el.libelle}`}
                  className="stepperButton"
                  onClick={() => handleStep(i)}
                >
                  {el.libelle}
                </StepButton>
              </Step>
            ) : undefined;
          })}
        </Stepper>
      </div>
      <div className="formDiv">
        {props.elementListe.map((ele, i) => {
          return ele ? (
            <div key={i} ref={elref => (refListe.current[i] = elref)}>
              {ele.element}
            </div>
          ) : undefined;
        })}
      </div>
    </div>
  );
};
