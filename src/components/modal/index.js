import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "#components/button";

export const Modal = ({
  children,
  isOpen,
  toggle,
  title,
  description,
  callback,
  shouldContentScroll = true,
  showDoneButton = true,
  showCancelButton = true,
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" onClose={toggle} className="relative z-20">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4
            text-center"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="flex flex-col rounded-md borderw-full max-h-[80vh] max-w-md transform 
                overflow-hidden rounded-2xl bg-white p-6 text-left align-middle
                shadow-xl transition-all"
            >
              {typeof title === "string" && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
              )}

              {typeof description === "string" && (
                <p className="mb-4 text-sm text-gray-500">{description}</p>
              )}

              <div
                className={`flex flex-col grow justify-center mb-4 ${
                  shouldContentScroll
                    ? "" /* overflow-scroll*/
                    : "overflow-hidden"
                }`}
              >
                {children}
              </div>

              {(showCancelButton || showDoneButton) && (
                <div className="flex flex-row justify-center">
                  {showCancelButton && (
                    <Button
                      message="Cancel"
                      onClick={toggle}
                      className="mr-2"
                    />
                  )}

                  {showDoneButton && (
                    <Button
                      message="Done"
                      onClick={callback}
                      className="bg-gradient-to-l 
                      from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two"
                    />
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
