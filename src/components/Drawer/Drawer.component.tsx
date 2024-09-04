import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { ITimes } from "../../interfaces/times.interface";
import { Navegation } from "../";

export function Drawer({
  open,
  setOpen,
  listSpeedTimes,
  bestTime,
  handleRemoveTime,
  isMobile,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  listSpeedTimes: ITimes[];
  bestTime: number;
  isMobile: boolean;
  handleRemoveTime: (id: string) => void;
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 top-0 bg-zinc-400/20 backdrop-blur-sm data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-black/40"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="select-none w-full flex items-center justify-end gap-5 px-4 sm:px-6">
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                    aria-label="Toggle navigation"
                    onClick={() => setOpen(false)}
                  >
                    <X className="text-gray-900" />
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <Navegation
                    listSpeedTimes={listSpeedTimes}
                    bestTime={bestTime}
                    handleRemoveTime={handleRemoveTime}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
