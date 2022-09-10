import { useEffect, useRef, useState } from "react";
import { components } from "react-select";

export const multiValueStyles = ({ backgroundColor, margin, ...provided }) => ({
  provided,
});

export const MultiValue = (props) => {
  // never ask ra men hs salirty
  // never ask a gilr her age
  // never ask a dev why

  //
  // Config
  //

  const scrollCallInterval = 50;
  const scrollEventLastUpdate = useRef({
    date: new Date(),
    timeout: null,
  });

  //
  // useState Declarations
  //

  const [overflow, setOverflow] = useState({
    index: -1,
    count: null,
    values: "",
  });

  //
  // Other Variables
  //

  const currentValues = props.selectProps.value.reduce(
    (acum, { category, match }) => `${acum}${category}:${match}+`,
    ""
  );

  const menuIsOpen = props.selectProps.menuIsOpen;
  const areValuesStillTheSame = currentValues === overflow.values;
  const shouldRenderRemainder =
    overflow.index === props.index && areValuesStillTheSame && !menuIsOpen;
  const shouldDisplayValue =
    menuIsOpen || overflow.index === -1 || overflow.index > props.index;
  const remainderId = "multivalue-remainder";

  //
  // Callbacks
  //

  const doOverflowRoutine = (shouldForce = false) => {
    if (shouldForce === false && areValuesStillTheSame === true) {
      return;
    }

    const multiValueElements =
      props.selectProps.selectProps.multiValueContainerElements.current.filter(
        (element) => element !== null
      );
    const valueContainerElement =
      props.selectProps.selectProps.valueContainerElement.current;

    if (multiValueElements.length > 0 && valueContainerElement !== null) {
      let overflowerIndex = -1;
      let sum = 0;
      const limit = valueContainerElement.offsetWidth;

      for (let i = 0; i < multiValueElements.length; i++) {
        if (multiValueElements[i] === null) {
          continue;
        }

        sum += multiValueElements[i].offsetWidth;
        if (sum > limit) {
          overflowerIndex = i;
          break;
        }
      }

      const newCount =
        overflowerIndex === -1
          ? null
          : multiValueElements.length - overflowerIndex;

      if (overflow.index !== overflowerIndex || overflow.count !== newCount) {
        setOverflow({
          index: overflowerIndex,
          count: newCount,
          values: currentValues,
        });
      }
    }
  };

  const handleResize = () => {
    const currentTime = new Date();

    window.requestAnimationFrame(() => {
      if (
        currentTime - scrollEventLastUpdate.current.date >
        scrollCallInterval
      ) {
        doOverflowRoutine(true);
      } else {
        clearTimeout(scrollEventLastUpdate.current.timeout);
        scrollEventLastUpdate.current.timeout = setTimeout(() => {
          doOverflowRoutine(true);
        }, scrollCallInterval);
      }
    });
  };

  //
  // useEffect declarations
  //

  useEffect(() => {
    doOverflowRoutine();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  //
  //
  //

  return (
    <>
      {shouldRenderRemainder && (
        <div
          id={shouldRenderRemainder ? remainderId : undefined}
          className="px-3 py-2 rounded-full bg-gradient-to-r 
        from-secondary-two to-secondary-one text-on-secondary dark:from-dark-secondary-two dark:to-dark-secondary-one dark:text-dark-on-secondary font-roboto-condensed font-bold leading-4"
        >
          {"+" + overflow.count}
        </div>
      )}
      <div
        ref={(element) => {
          props.selectProps.selectProps.multiValueContainerElements.current[
            props.index
          ] = element;
        }}
        className={shouldDisplayValue ? undefined : "absolute z-[-1] opacity-0"}
      >
        <components.MultiValue {...props} />
      </div>
    </>
  );
};
