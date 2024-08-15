import moment from "moment";
import LogoMarca from "../../assets/logo-marca.svg";
import { ITimes } from "../../interfaces/times.interface";
import { useEffect, useState } from "react";

interface IHeader {
  listSpeedTimes: ITimes[];
}

export function Header({ listSpeedTimes }: IHeader) {
  const [bestTime, setBestTime] = useState<number>(0);

  useEffect(() => {
    if (listSpeedTimes.length) {
      const listTimes = listSpeedTimes.map((speedTime) => speedTime.time);
      setBestTime(Math.min(...listTimes));
    }
  }, [listSpeedTimes]);

  return (
    <header className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
      <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
        <div className="hidden lg:flex">
          <a aria-label="Home" href="/">
            <img src={LogoMarca} alt="Logo Marca" />
          </a>
        </div>
        <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]">
          <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
          <div className="flex items-center gap-5 lg:hidden">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              aria-label="Toggle navigation"
            >
              <svg
                viewBox="0 0 10 9"
                fill="none"
                stroke-linecap="round"
                aria-hidden="true"
                className="w-2.5 stroke-zinc-900 dark:stroke-white"
              >
                <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
              </svg>
            </button>
            <a aria-label="Home" href="/">
              <img src={LogoMarca} alt="Logo Marca" className="h-6" />
            </a>
          </div>
        </div>
        <nav className="hidden lg:mt-10 lg:block">
          <ul role="list">
            <li className="relative mt-6 md:mt-0">
              <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
                Times
              </h2>
              <div className="relative mt-3 pl-2">
                {/* <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
                <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                <div className="absolute left-2 h-6 w-px bg-emerald-500"></div> */}
                <ul role="list" className="border-l border-transparent">
                  {listSpeedTimes.map((speedTime) => (
                    <li className="relative">
                      <div className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                        <span className="truncate">
                          {moment.utc(speedTime.time).format("mm:ss,S")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="sticky bottom-0 z-10 mt-6">
              <a
                className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 w-full"
                href="#"
              >
                Best Time: {moment.utc(bestTime).format("mm:ss,S")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
