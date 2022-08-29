import { ReactComponent as SearchIcon } from "#assets/images/search_icon.svg";

export const SearchButton = ({ onClick, showIcon = false, message = "" }) => {
  const hasMessage = message.length > 0;
  const hasBothIconAndMessage = showIcon && hasMessage;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        hasBothIconAndMessage
          ? "px-4 py-2 rounded-full"
          : showIcon
          ? "w-9 h-9 rounded-xl"
          : hasMessage && "px-6 py-2 rounded-full"
      } bg-gradient-to-l 
          from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two font-roboto-condensed font-bold leading-4 text-black`}
    >
      {showIcon && (
        <SearchIcon
          className={`inline-block ${hasBothIconAndMessage && "w-6 pr-2"}`}
        />
      )}
      {hasMessage && <span className="inline-block ">{message}</span>}
    </button>
  );
};
