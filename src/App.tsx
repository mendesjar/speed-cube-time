import { useRef, useState } from "react";
import { Header } from "./components";
import moment from "moment";
import { ITimes } from "./interfaces/times.interface";
import { faker } from "@faker-js/faker";

function App() {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [iniciado, setIniciado] = useState(false);
  const [listSpeedTimes, setListSpeedTimes] = useState<ITimes[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);

  document.body.onkeydown = function (e) {
    if (e.key == " " || e.code == "Space" || e.code == "32") {
      const time = document.getElementById("time");
      if (iniciado) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
        setListSpeedTimes((prevState) => [
          ...prevState,
          {
            id: faker.string.uuid(),
            time: tempoDecorrido,
          },
        ]);
        setTempoDecorrido(0);
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
      setIniciado(true);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setTempoDecorrido(0);
      setIniciado(false);
    }
  };

  return (
    <div className="w-full">
      <div className="h-full lg:ml-72 xl:ml-80">
        <Header listSpeedTimes={listSpeedTimes} />
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">
            <article className="flex h-full flex-col pb-10 pt-16">
              <footer>
                <div className="text-slate-900 flex-auto prose dark:prose-invert [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl">
                  <div className="w-full">
                    <h1
                      id="time"
                      className="font-extrabold text-7xl md:text-8xl"
                    >
                      {moment.utc(tempoDecorrido).format("mm:ss,S")}
                    </h1>
                  </div>
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
