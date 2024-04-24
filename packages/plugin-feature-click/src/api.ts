// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Earth } from "dde-earth";

declare module "dde-earth" {
  namespace Earth {
    interface Events {
      FEATURE_CLICK: [
        reslt: {
          feature: any;
          position?: number[];
          properties: any;
          [key: string]: any;
        },
      ];
    }
  }
}
