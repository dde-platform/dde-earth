import { Earth } from "dde-earth";

import { Subscriber } from "./Subscriber";

declare module "dde-earth" {
  interface Earth {
    isSubscriberEnabled: () => boolean;
    toggleSubscriber: (enable: boolean) => Earth;
    getSubscriber: () => Subscriber | undefined;
  }
  namespace Earth {
    interface Events
      extends Record<
        Subscriber.EventType,
        [movement: Subscriber.EventArgs, result?: any]
      > {}
  }
}

Earth.prototype.isSubscriberEnabled = function () {
  const subscriber = this.getPlugin(Subscriber);
  if (subscriber) {
    return subscriber.enable;
  }
  return false;
};

Earth.prototype.toggleSubscriber = function (enable: boolean) {
  const subscriber = this.getPlugin(Subscriber);
  if (subscriber) {
    subscriber.enable = enable;
  }
  return this;
};

Earth.prototype.getSubscriber = function () {
  const subscriber = this.getPlugin<Subscriber>(Subscriber);
  return subscriber;
};
