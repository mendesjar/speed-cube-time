export class StorageHelper {
  getLocal(key: string) {
    return localStorage.getItem(key);
  }

  setLocal(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  removeLocal(key: string) {
    return localStorage.removeItem(key);
  }
}
