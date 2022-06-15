import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import useKeypress from "../helpers/UseKeypress";
import getPronounCheck from "../helpers/GetPronounCheck";
import { getNewParamsString } from "../helpers/GetUrlParams";

const CharacterBox = ({
  character,
  episodeList,
  searchQuery,
  setSearchQuery,
}) => {
  const history = useHistory();
  const setSelectedCharNull = () => {
    setSearchQuery({ ...searchQuery, character: null });
  };
  const boxElement = useRef();

  useKeypress("Escape", setSelectedCharNull);

  useEffect(() => {
    history.push({
      search: getNewParamsString({
        character: searchQuery.character,
      }),
    });

    return () => {
      history.push({
        search: getNewParamsString({
          character: null,
        }),
      });
    };
  }, []);

  useEffect(async () => {
    boxElement.current.scrollIntoView({ behavior: "smooth" });
  }, [searchQuery.character]);

  return (
    <div id="character-box" ref={boxElement}>
      <div id="close-charbox" onClick={setSelectedCharNull}></div>
      <img src={character.image} alt={character.name} />
      <div>
        <h2>
          {character.name}
          <span className="origin">
            from
            {character.origin.name === "unknown"
              ? " Unknown origins"
              : " " + character.origin.name}
          </span>
        </h2>
        {character.gender !== "unknown" && (
          <span className="pronoun">{getPronounCheck(character.gender)}</span>
        )}
        <ul>
          <li className="status">
            {character.status === "unknown"
              ? "Unknown Status"
              : character.status}
          </li>
          <li className="species">
            <span>Species</span> {character.species}
          </li>
          <li> {character.location.name} </li>
          {episodeList.length !== 0 && (
            <li className="episodes">
              <span> Featured episodes </span>
              <ul>
                {episodeList.map((episode) => (
                  <li key={`episode-${episode.id}`}>{episode.episode}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CharacterBox;
