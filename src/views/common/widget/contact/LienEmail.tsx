import React from "react";

export interface LienEmailProps {
  email?: string;
}

export const LienEmail: React.FC<LienEmailProps> = props => {
  return <a href={`mailto:${props.email}`}>{props.email}</a>;
};
