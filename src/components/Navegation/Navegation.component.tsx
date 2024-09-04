import { ITimes } from "../../interfaces/times.interface";
import { NavegationDesktop } from "./desktop/NavegationDesktop.component";
import { NavegationMobile } from "./mobile/NavegationMobile.component";

export function Navegation({
  listSpeedTimes,
  bestTime,
  handleRemoveTime,
  isMobile,
}: {
  listSpeedTimes: ITimes[];
  bestTime: number;
  isMobile: boolean;
  handleRemoveTime: (id: string) => void;
}) {
  if (isMobile) {
    return (
      <NavegationMobile
        listSpeedTimes={listSpeedTimes}
        bestTime={bestTime}
        handleRemoveTime={handleRemoveTime}
      />
    );
  } else {
    return (
      <NavegationDesktop
        listSpeedTimes={listSpeedTimes}
        bestTime={bestTime}
        handleRemoveTime={handleRemoveTime}
      />
    );
  }
}
