import { useEffect, useRef } from "react";
import { ModalAbilityLabel } from "./ModalAbilityLabel";
import { getGroupLabel } from "../utils/getGroupLabel";

export const ListOfAbilities = ({
  selectedValues,
  setSelectedValues,
  abilityGroups,
  letterGroupOnScreen,
  setLetterGroupOnScreen,
  letterGroupElements,
  scrollCallInterval,
  firstRender,
  className,
}) => {
  const selectedAbilityElement = useRef(null);
  const shouldScroll = useRef(true);
  const scrollLetterGroupLastUpdate = useRef({
    date: new Date(),
    timeout: null,
  });

  const doScrollRoutine = (element) => {
    const currentTime = new Date();
    scrollLetterGroupLastUpdate.current.date = currentTime;

    const height = element.clientHeight;
    const scrollTop = element.scrollTop;

    if (letterGroupElements.current.length < 0) {
      return;
    }

    const letterGroupOffsets = letterGroupElements.current.map(
      ({ offsetTop }) => offsetTop
    );

    let indexOnScreen = 0;
    for (let i = letterGroupOffsets.length - 1; i > 0; i--) {
      const offsetTop = letterGroupOffsets[i];
      if (scrollTop > offsetTop - height / 2) {
        indexOnScreen = i;
        break;
      }
    }

    if (indexOnScreen !== letterGroupOnScreen) {
      setLetterGroupOnScreen(indexOnScreen);
    }
  };

  const handleScroll = ({ target: element }) => {
    const currentTime = new Date();

    window.requestAnimationFrame(() => {
      if (
        currentTime - scrollLetterGroupLastUpdate.current.date >
        scrollCallInterval
      ) {
        doScrollRoutine(element);
      } else {
        clearTimeout(scrollLetterGroupLastUpdate.current.timeout);
        scrollLetterGroupLastUpdate.current.timeout = setTimeout(() => {
          doScrollRoutine(element);
        }, scrollCallInterval);
      }
    });
  };

  useEffect(() => {
    if (selectedAbilityElement.current === null) {
      return;
    }

    if (firstRender.current) {
      selectedAbilityElement.current.scrollIntoView({ behavior: "auto" });
      return;
    }

    if (shouldScroll.current === true) {
      selectedAbilityElement.current.scrollIntoView({ behavior: "smooth" });
    }

    shouldScroll.current = true;
  }, [selectedValues]);

  return (
    <ol className={className} onScroll={handleScroll}>
      {abilityGroups.current.map((letterGroup, index) => {
        const start = letterGroup.start;
        const end = letterGroup.end;
        const groupLabel = getGroupLabel(start, end);
        const titleID = `letter-group-title-${start}-${end}`;
        return (
          <li
            key={`letter-group-${groupLabel}`}
            ref={(element) => (letterGroupElements.current[index] = element)}
            aria-labelledby={titleID}
            className="mb-8 last:mb-0"
          >
            <h4 id={titleID} className="text-4xl font-roboto-condensed mb-2">
              {groupLabel}
            </h4>
            <ol className="flex flex-row flex-wrap">
              {letterGroup.matches.map((ability) => {
                const isSelected = selectedValues.includes(ability);
                return (
                  <ModalAbilityLabel
                    key={`ability-${ability}`}
                    ability={ability}
                    isSelected={isSelected}
                    setSelectedValues={setSelectedValues}
                    elementRef={isSelected ? selectedAbilityElement : null}
                    shouldScroll={shouldScroll}
                    className={`basis-1/2 mb-1 }`}
                  />
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};
