import { Menu } from "@headlessui/react";

export const AddButtonMenuItem = ({ category, label, callback, isLoading }) => {
  const passCallback = () => {
    callback(category);
  };

  return (
    <Menu.Item
      className={`my-0.5 ${
        isLoading ? "text-slate-500 cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={isLoading}
    >
      {({ active }) => (
        <div onClick={passCallback} className={`${active && "bg-blue-500"} `}>
          {label}
        </div>
      )}
    </Menu.Item>
  );
};
