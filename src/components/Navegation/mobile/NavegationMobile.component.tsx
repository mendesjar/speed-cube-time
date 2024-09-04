import moment from "moment";
import { ITimes } from "../../../interfaces/times.interface";
import { SwipeDelete } from "../../SwipeDelete/SwipeDelete.component";

export function NavegationMobile({
  listSpeedTimes,
  bestTime,
  handleRemoveTime,
}: {
  listSpeedTimes: ITimes[];
  bestTime: number;
  handleRemoveTime: (id: string) => void;
}) {
  return (
    <nav>
      <ul role="list">
        <li className="relative mt-6 md:mt-0">
          <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
            Times
          </h2>
          <div className="relative mt-3 pl-2">
            <ul role="list" className="border-l border-transparent">
              {listSpeedTimes.map((speedTime) => (
                <>
                  {speedTime.time === bestTime ? (
                    <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
                  ) : (
                    <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                  )}
                  <SwipeDelete
                    onDelete={() => handleRemoveTime(speedTime.id)}
                    key={speedTime.id}
                    height={"auto"}
                  >
                    <div className="bg-white flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      <span className="select-none truncate">
                        {moment.utc(speedTime.time).format("mm:ss,SS")}
                      </span>
                    </div>
                  </SwipeDelete>
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
                  listSpeedTimes.reduce((acc, val) => acc + val.time, 0) /
                    listSpeedTimes?.length || 0
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
  );
}
