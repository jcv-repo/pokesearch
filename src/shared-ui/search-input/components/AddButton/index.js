import React from "react";
import { Menu } from "@headlessui/react";
import { AddButtonMenuItem } from "./components/AddButtonMenuItem";
import { ReactComponent as AddIcon } from "#assets/images/add-icon.svg";

export const AddButton = ({ options, callback, isLoading, className = "" }) => {
  return (
    <Menu as="div" className={className}>
      <Menu.Button className="block w-12 h-12" aria-label="Add">
        <AddIcon className="w-12 h-12 p-3" />
      </Menu.Button>
      <Menu.Items className="absolute z-10 px-4 p-3.5 rounded-lg shadow bg-on-tertiary text-tertiary-color">
        <ul className="flex flex-col justify-between whitespace-nowrap">
          {options.map(({ category, label }) => (
            <React.Fragment key={`dropdown-item-${category}`}>
              <AddButtonMenuItem
                category={category}
                label={label}
                callback={callback}
                isLoading={isLoading}
              />
            </React.Fragment>
          ))}
        </ul>
      </Menu.Items>
    </Menu>
  );
};
