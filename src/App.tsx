import { useEffect, useRef, useState } from "react";
import { Header } from "./components";
import moment from "moment";
import { ITimes } from "./interfaces/times.interface";
import { faker } from "@faker-js/faker";
import { shuffleCube } from "./helpers";

function App() {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [bestTime, setBestTime] = useState<number>(0);
  const [patternShuffle, setPatternShuffle] = useState<string>("");
  const [iniciado, setIniciado] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [listSpeedTimes, setListSpeedTimes] = useState<ITimes[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const shuffle = shuffleCube();
    setPatternShuffle(shuffle);
  }, []);

  document.body.onkeydown = function (e) {
    if (e.key == " " || e.code == "Space" || e.code == "32") {
      const time = document.getElementById("time");
      if (iniciado) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
        const listSpeedTimesTemp = [
          ...listSpeedTimes,
          {
            id: faker.string.uuid(),
            time: tempoDecorrido,
          },
        ];
        setListSpeedTimes(listSpeedTimesTemp);
        const isRecord =
          tempoDecorrido - (listSpeedTimes.findLast((e) => e)?.time || 0) < 0;
        setIsRecord(isRecord);
        setTempoDecorrido(0);
        setPatternShuffle(shuffleCube());
      } else if (time) {
        time.style.color = "red";
      }
    }
  };

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.code == "32") {
      const time = document.getElementById("time");
      if (time) time.style.color = "green";
      if (!iniciado) return iniciarCronometro();
      if (time) time.style.color = "";
      setIniciado(false);
    }
  };

  const iniciarCronometro = () => {
    if (!iniciado) {
      const tempoInicial = Date.now();
      intervalRef.current = setInterval(() => {
        const tempoDecorrido = Date.now() - tempoInicial;
        setTempoDecorrido(tempoDecorrido);
      }, 10);
      setIsRecord(false);
      setIniciado(true);
    }
  };

  useEffect(() => {
    if (listSpeedTimes.length) {
      const listTimes = listSpeedTimes.map((speedTime) => speedTime.time);
      setBestTime(Math.min(...listTimes));
    }
  }, [listSpeedTimes]);

  return (
    <div className="w-full">
      <div className="h-full lg:ml-72 xl:ml-80">
        <Header listSpeedTimes={listSpeedTimes} bestTime={bestTime} />
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">
            <article className="flex h-full flex-col pb-10 pt-16">
              <div className="text-slate-900 flex-auto prose dark:prose-invert [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl">
                <div className="w-full">
                  <p className="tracking-widest">{patternShuffle}</p>
                  <h1 id="time" className="font-extrabold text-7xl md:text-8xl">
                    {moment.utc(tempoDecorrido).format("mm:ss,S")}
                  </h1>
                </div>
              </div>
              <footer>
                <div className="not-prose mb-16 mt-6 flex gap-3">
                  <div className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                    Difference Between Best Time:{" "}
                    {moment
                      .utc(
                        (listSpeedTimes[listSpeedTimes.length - 1]?.time || 0) -
                          bestTime
                      )
                      .format("mm:ss,S")}
                  </div>
                  {isRecord && (
                    <div className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 bg-green-500 text-white ring-1 ring-inset ring-zinc-900/10 hover:bg-green-600 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                      New Record
                    </div>
                  )}
                </div>
              </footer>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
