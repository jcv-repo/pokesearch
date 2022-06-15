import React from "react";
import { withRouter } from "react-router";
import { getNewParamsString, getUrlParams } from "../helpers/GetUrlParams";
import toTitleCase from "../helpers/toTitleCase";
import PokemonTypeLabel from "./PokemonTypeLabel";

class PokemonBox extends React.Component {
  /*
  PROPS ARE:

  pokemon,
  pokemonSpecies,
 */

  constructor(props) {
    super(props);
    this.boxElement = React.createRef();
    this.setSelectedCharNull = this.setSelectedCharNull.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.userHasClosedIt = false;
  }

  currentID = this.props.pokemon.id;
  areBothPokemonFetchesTheSameId = true;

  setSelectedCharNull() {
    // this.userHasClosedIt = true;
    // this.props.setSearchQuery({ ...this.props.searchQuery, pokemon: null });
  }

  escFunction(event) {
    if (event.key === "Escape") {
      // this.setSelectedCharNull();
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.escFunction);
    this.boxElement.current.scrollIntoView({ behavior: "smooth" });
    /* if (getUrlParams("id") != this.props.searchQuery.id) {
      console.log("the thing");
      this.props.history.replace({
        search: getNewParamsString({
          pokemon: this.props.searchQuery.pokemon,
        }),
      });
    }*/
  }

  componentDidUpdate() {
    if (this.currentID !== this.props.pokemon.id) {
      this.boxElement.current.scrollIntoView({ behavior: "smooth" });
      this.currentID = this.props.pokemon.id;
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.escFunction);
    if (this.userHasClosedIt) {
      this.props.history.replace({
        search: getNewParamsString({
          pokemon: null,
        }),
      });
    }
  }

  render() {
    let flavorText, genderLabel, isPokemonSpeciesSynced;

    if (this.props.pokemonSpecies) {
      isPokemonSpeciesSynced =
        this.props.pokemon.id === this.props.pokemonSpecies.id;
    }

    if (this.props.pokemonSpecies) {
      for (
        let i = this.props.pokemonSpecies.flavor_text_entries.length - 1;
        i >= 0;
        i--
      ) {
        if (
          this.props.pokemonSpecies.flavor_text_entries[i].language.name ===
          "en"
        ) {
          flavorText =
            this.props.pokemonSpecies.flavor_text_entries[i].flavor_text;
          break;
        }
      }

      genderLabel = (() => {
        switch (this.props.pokemonSpecies.gender_rate) {
          case -1:
            return "These pokemon are genderless";
          case 1:
            return "These pokemon are always male";
          case 2:
            return "These pokemon are normally male";
          case 3:
            return "These pokemon are sightly more likely to be male";
          case 4:
            return "These pokemon have equal chance of being either male or female";
          case 6:
            return "These pokemon are sightly more likely to be female";
          case 7:
            return "These pokemon are normally female";
          case 8:
            return "These pokemon are always female";
          default:
            return "These pokemon have a gender i have yet to make up";
        }
      })();
    }

    return (
      <div ref={this.boxElement} className="flex flex-col sm:flex-row ">
        <div id="close-charbox" onClick={this.setSelectedCharNull}></div>
        <div
          className="w-full p-4 h-96 mr-10 sm:grow-0 sm:shrink-0 sm:basis-60  md:basis-80 bg-gradient-to-b 
  from-secondary-one to-secondary-two rounded-2xl"
        >
          <div className="flex content-center items-center justify-center relative w-full h-full before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
            <img
              src={
                this.props.pokemon.sprites.other["official-artwork"]
                  .front_default
              }
              alt={`An official artwork of ${this.props.pokemon.name}`}
              className="w-auto max-h-full sm:h-auto p-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <header>
            <h2 className="text-4xl font mb-1">
              {toTitleCase(this.props.pokemon.name)}
              <span className="inline-block align-middle ml-2 text-base">
                #{this.props.pokemon.id}
              </span>
            </h2>
          </header>

          <ul>
            <li className="flex items-center mb-4">
              <div className="mr-2">Type</div>
              {this.props.pokemon.types.map((type, index) => (
                <div className="mr-2" key={`type-${index}`}>
                  <PokemonTypeLabel value={type.type.name} />
                </div>
              ))}
            </li>
            {this.props.pokemonSpecies && isPokemonSpeciesSynced === true ? (
              <>
                <li className="mb-4">
                  <p>{flavorText}</p>
                </li>
                {/*<li>
                  Gender Rate
                  {genderLabel}
            </li>*/}
              </>
            ) : (
              <span>loading...</span>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(PokemonBox);
