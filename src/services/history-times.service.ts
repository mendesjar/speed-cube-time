import { StorageHelper } from "../helpers";
import { ITimes } from "../interfaces/times.interface";

export class HistoryTimesService {
  private readonly STORAGE_KEY = "times";
  private storageHelper = new StorageHelper();

  private read(): ITimes[] {
    const data = this.storageHelper.getLocal(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private write(times: ITimes[]): void {
    this.storageHelper.setLocal(this.STORAGE_KEY, JSON.stringify(times));
  }

  getTimes(): ITimes[] {
    return this.read();
  }

  setTime(newTime: ITimes): ITimes[] {
    const storageTimes = this.read();
    const newTimes = [...storageTimes, newTime];
    this.write(newTimes);
    return newTimes;
  }

  removeTime(id: string): ITimes[] {
    const newTimes = this.read().filter((time) => time.id !== id);
    this.write(newTimes);
    return newTimes;
  }
}
