import { useEffect, useRef, useState } from "react";
import { Header, Kbd } from "./components";
import moment from "moment";
import { ITimes } from "./interfaces/times.interface";
import { faker } from "@faker-js/faker";
import { shuffleCube } from "./helpers";
import { detectMob } from "./utils";

function App() {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [bestTime, setBestTime] = useState<number>(0);
  const [patternShuffle, setPatternShuffle] = useState<string>("");
  const [iniciado, setIniciado] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [listSpeedTimes, setListSpeedTimes] = useState<ITimes[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const areaTouch = document.getElementById("area-touch");

  useEffect(() => {
    const shuffle = shuffleCube();
    setPatternShuffle(shuffle);
    setIsMobile(detectMob());
  }, []);

  document.body.onkeydown = function (e) {
    if ((e.key == " " || e.code == "Space" || e.code == "32") && !isMobile) {
      startTimerCount();
    }
  };

  document.body.onkeyup = function (e) {
    if ((e.key == " " || e.code == "Space" || e.code == "32") && !isMobile) {
      endTimerCount();
    }
  };

  if (areaTouch)
    areaTouch.ontouchend = function () {
      if (isMobile) {
        endTimerCount();
      }
    };

  if (areaTouch)
    areaTouch.ontouchstart = function () {
      if (isMobile) {
        startTimerCount();
      }
    };

  const startTimerCount = () => {
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
      const isRecord = tempoDecorrido - bestTime < 0;
      setIsRecord(isRecord);
      setTempoDecorrido(0);
      setPatternShuffle(shuffleCube());
    } else if (time) {
      time.style.color = "red";
    }
  };

  const endTimerCount = () => {
    const time = document.getElementById("time");
    if (time) {
      time.style.color = "green";
      if (!iniciado) return iniciarCronometro();
      time.style.color = "";
    }
    setIniciado(false);
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
        <Header
          listSpeedTimes={listSpeedTimes}
          setListSpeedTimes={setListSpeedTimes}
          bestTime={bestTime}
          isMobile={isMobile}
        />
        <div
          id="area-touch"
          className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8"
        >
          <main className="flex-auto">
            <article className="flex h-full flex-col pb-10 pt-16">
              <div className="text-slate-900 flex-auto prose dark:prose-invert [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl">
                <div className="w-full">
                  <p className="select-none tracking-widest">
                    {patternShuffle}
                  </p>
                  <div className="flex items-end">
                    <h1
                      id="time"
                      className="select-none font-extrabold text-4xl xs:text-6xl sm:text-9xl lg:text-9xl xl:text-[9rem] 2xl:text-[11rem]"
                    >
                      {moment.utc(tempoDecorrido).format("mm:ss,SS")}
                    </h1>
                    {!isMobile && !iniciado ? <Kbd label="Spacebar" /> : null}
                  </div>
                </div>
              </div>
              <footer>
                <div className="group not-prose w-fit mb-16 mt-6 flex flex-wrap gap-3 items-start transition-transform hover:skew-y-1">
                  <div className="select-none inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 text-slate-900 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                    Difference Between Best Time:{" "}
                    {moment
                      .utc(
                        (listSpeedTimes[listSpeedTimes.length - 1]?.time || 0) -
                          bestTime
                      )
                      .format("mm:ss,SS")}
                  </div>
                  {isRecord && (
                    <div className="flex items-start">
                      <div className="select-none inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 bg-green-500 text-white ring-1 ring-inset ring-zinc-900/10 hover:bg-green-600 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                        New Record
                      </div>
                      <div className="select-none touch-none pointer-events-none">
                        <iframe
                          src="https://giphy.com/embed/ehz3LfVj7NvpY8jYUY"
                          className="max-w-10 h-8 ml-3 transition-transform group-hover:ml-4 group-hover:scale-150"
                          allowFullScreen
                        ></iframe>
                      </div>
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
