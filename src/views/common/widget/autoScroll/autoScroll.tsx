import React, { useEffect } from "react";

const DELAY = 200;
interface IAutoScrollProps {
  autoScroll?: boolean;
  baliseRef?: any;
}

export const AutoScroll: React.FC<IAutoScrollProps> = props => {
  const scrollToBottom = () => {
    if (props.baliseRef != null && props.baliseRef.current != null) {
      const bodyRect = document.body.getBoundingClientRect();
      const elementRect = props.baliseRef.current.getBoundingClientRect();
      const offset = elementRect.top - bodyRect.top;
      setTimeout(() => {
        window.scroll({
          top: offset,
          left: 0,
          behavior: "smooth"
        });
      }, DELAY);
    }
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoScroll]);

  return <div ref={props.baliseRef}></div>;
};
