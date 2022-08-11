import logoSrc from "#assets/images/pokesearch-logo.png";

const Logo = ({ className = "" }) => (
  <div>
    <img src={logoSrc} alt="Pokesearch" className={className} />
  </div>
);
export default Logo;
