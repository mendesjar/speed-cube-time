import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  //TransitionChild,
} from "@headlessui/react";
import moment from "moment";
import { ITimes } from "../../interfaces/times.interface";

export function Drawer({
  open,
  setOpen,
  listSpeedTimes,
  bestTime,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  listSpeedTimes: ITimes[];
  bestTime: number;
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
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                      X
                    </h1>
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <nav>
                    <ul role="list">
                      <li className="relative mt-6 md:mt-0">
                        <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
                          Times
                        </h2>
                        <div className="relative mt-3 pl-2">
                          <ul
                            role="list"
                            className="border-l border-transparent"
                          >
                            {listSpeedTimes.map((speedTime) => (
                              <>
                                {speedTime.time === bestTime ? (
                                  <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
                                ) : (
                                  <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                                )}
                                <li className="relative" key={speedTime.id}>
                                  <div className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                                    <span className="select-none truncate">
                                      {moment
                                        .utc(speedTime.time)
                                        .format("mm:ss,SS")}
                                    </span>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                      </li>
                      <ul role="list" className="sticky bottom-0 z-10 mt-6">
                        <li className="relative py-1">
                          <div className="select-none inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-slate-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 w-full">
                            Average Time:{" "}
                            {moment
                              .utc(
                                listSpeedTimes.reduce(
                                  (acc, val) => acc + val.time,
                                  0
                                ) / listSpeedTimes?.length || 0
                              )
                              .format("mm:ss,SS")}
                          </div>
                        </li>
                        <li className="relative py-1">
                          <div className="select-none inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-slate-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 w-full">
                            Best Time: {moment.utc(bestTime).format("mm:ss,SS")}
                          </div>
                        </li>
                      </ul>
                    </ul>
                  </nav>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
