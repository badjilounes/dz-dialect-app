import { StorageService } from './storage.service';

export function SessionStorage() {
  return function (target: Object, propertyDescription: string) {
    const key = propertyDescription;
    const service: StorageService = new StorageService();

    Object.defineProperty(target, propertyDescription, {
      get: function () {
        const storageValue = service.tryGet(key);
        return storageValue;
      },
      set: function (value: any) {
        service.set(key, value);
      },
    });
  };
}
