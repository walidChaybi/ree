import React from "react";
import { Text } from "../../common/widget/Text";

export const Header: React.FC = () => {
  return (
    <header className="AppHeader">
      <div className="logoBox"></div>
      <h1>
        <Text messageId={"header"} />
      </h1>
    </header>
  );
};
