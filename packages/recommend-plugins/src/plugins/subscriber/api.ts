import { Earth } from 'dde-earth';

import { Subscriber } from '.';

declare module 'dde-earth' {
  interface Earth {
    isSubscriberEnabled: () => boolean;
    toggleSubscriber: (enable: boolean) => Earth;
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
