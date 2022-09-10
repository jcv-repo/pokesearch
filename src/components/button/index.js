import React from "react";

export const Button = ({ message, onClick, IconComponent, className = "" }) => {
  const hasIcon = IconComponent !== undefined;
  const hasMessage = (message || "").length > 0;
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 min-h-[2.5rem] bg-button text-on-button rounded-md text-shadow font-roboto-condensed font-bold ${className}`}
    >
      {hasIcon && <IconComponent className={hasMessage ? "mr-2" : undefined} />}
      {hasMessage && <span>{message}</span>}
    </button>
  );
};
