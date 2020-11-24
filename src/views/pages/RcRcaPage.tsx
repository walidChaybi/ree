import React from "react";
import { AccordionRece } from "../common/widget/accordion/AccordionRece";
import { useRcRcaHook } from "./hook/RcRcaHook";

export const RcRcaPage: React.FC = () => {
  const { rc } = useRcRcaHook();
  return (
    <div>
      <AccordionRece panels={rc} />
    </div>
  );
};
