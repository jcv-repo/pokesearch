import toTitleCase from "../helpers/toTitleCase";

const CriteriaEntry = ({ match, category }) => (
  <div
    className="px-4 py-2 mr-2 rounded-full bg-gradient-to-r 
  from-secondary-two to-secondary-one text-on-secondary font-roboto-condensed font-bold leading-4"
  >
    {toTitleCase(category) + ": " + toTitleCase(match)}
  </div>
);

export default CriteriaEntry;
