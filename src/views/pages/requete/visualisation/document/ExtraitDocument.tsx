import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion
} from "reakit/Disclosure";
import { MessageId, Text } from "../../../../common/widget/Text";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import "./sass/DocumentPresentation.scss";
import "../sass/ResumeRequete.scss";
import classNames from "classnames";

interface IExtraitDocumentProps {
  titre: MessageId;
  highlighted?: boolean;
}

// TODO ce composant est à faire entièrement dans la story 102 US72-C, le disclosure n'est pas adapté pour
// ce composant, ici c'est juste pour la démo
export const ExtraitDocument: React.FC<IExtraitDocumentProps> = ({
  titre,
  highlighted
}) => {
  const disclosure = useDisclosureState({ visible: true });

  const titleStyles = classNames({
    title: true,
    SpecificTitle: highlighted
  });
  return (
    <div className="resume-requete extrait">
      <Disclosure
        {...disclosure}
        as={ExpansionPanel}
        className={"DocumentDetailHeader"}
      >
        <ExpansionPanelSummary className={titleStyles}>
          <Text messageId={titre} />
        </ExpansionPanelSummary>
      </Disclosure>
      <DisclosureRegion {...disclosure} as={ExpansionPanelDetails}>
        {props =>
          disclosure.visible && (
            <div {...props} className={"DocumentDetailPanel todo"}>
              TODO
            </div>
          )
        }
      </DisclosureRegion>
    </div>
  );
};
