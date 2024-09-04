import LogoMarca from "../../assets/logo-marca.svg";
import { ITimes } from "../../interfaces/times.interface";
import { Dispatch, SetStateAction, useState } from "react";
import { Drawer, Navegation } from "../";

interface IHeader {
  listSpeedTimes: ITimes[];
  setListSpeedTimes: Dispatch<SetStateAction<ITimes[]>>;
  bestTime: number;
  isMobile: boolean;
}

export function Header({
  listSpeedTimes,
  setListSpeedTimes,
  bestTime,
  isMobile,
}: IHeader) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  function handleOpenDrawer() {
    setOpenDrawer(true);
  }

  function handleRemoveTime(id: string) {
    const list = listSpeedTimes.filter((speedTime) => speedTime.id != id);
    setListSpeedTimes(list);
  }

  return (
    <>
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        listSpeedTimes={listSpeedTimes}
        bestTime={bestTime}
        handleRemoveTime={handleRemoveTime}
        isMobile={isMobile}
      />
      <header className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-10 lg:flex">
        <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
          <div className="select-none hidden lg:flex">
            <a aria-label="Home" href="/">
              <img src={LogoMarca} alt="Logo Marca" />
            </a>
          </div>
          <div className="fixed inset-x-0 top-0 z-10 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]">
            <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
            <div className="select-none w-full flex items-center justify-between gap-5 lg:hidden">
              <a aria-label="Home" href="/">
                <img src={LogoMarca} alt="Logo Marca" className="h-6" />
              </a>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                aria-label="Toggle navigation"
                onClick={() => handleOpenDrawer()}
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
            </div>
          </div>
          {!isMobile && (
            <Navegation
              listSpeedTimes={listSpeedTimes}
              bestTime={bestTime}
              handleRemoveTime={handleRemoveTime}
              isMobile={isMobile}
            />
          )}
        </div>
      </header>
    </>
  );
}
