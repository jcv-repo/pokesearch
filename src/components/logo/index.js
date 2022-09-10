import logoSrc from "#assets/images/pokesearch-logo.png";
import miniSrc from "#assets/images/pokesearch-mini.png";

export const Logo = ({ showMini = false, className = "" }) => {
  return (
    <img
      src={showMini ? miniSrc : logoSrc}
      alt="Pokesearch"
      className={className}
    />
  );
};
