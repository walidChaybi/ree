import React from "react";
import { Text } from "../../common/widget/Text";

interface TitleProps {
  titleId: string;
}

export const Title: React.FC<TitleProps> = ({ titleId }) => {
  return (
    <>
      <title>
        <Text messageId={titleId} />
      </title>
      <h2>
        <Text messageId={titleId} />
      </h2>
    </>
  );
};
