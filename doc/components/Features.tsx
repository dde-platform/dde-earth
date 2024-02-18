import { useId } from "react";
import { featuresMap, titleMap } from "translations/text";

import styles from "./Features.module.css";

import { Icons } from "./Icons";
import useLocalesMap from "./use-locales-map";

export function Feature({ text, icon }) {
  return (
    <div className={styles.feature}>
      {icon}
      <h4>{text}</h4>
    </div>
  );
}

export default function Features() {
  const keyId = useId();
  const title = useLocalesMap(titleMap);
  const features = useLocalesMap(featuresMap);

  const FEATURES_LIST = [
    { key: "Lightwight", icon: <Icons.lightweight /> },
    { key: "event", icon: <Icons.lightning /> },
    { key: "internal", icon: <Icons.globalization /> },
    { key: "plugin", icon: <Icons.plugin /> },
    { key: "layer", icon: <Icons.layerManager /> },
    { key: "typescript", icon: <Icons.typescript /> },
  ];

  return (
    <div className="mx-auto max-w-full w-[880px] text-center px-4 mb-10">
      <p className="text-lg mb-2 text-gray-600 md:!text-2xl">{title}</p>
      <div className={styles.features}>
        {FEATURES_LIST.map(({ key, icon }) => (
          <Feature text={features[key]} icon={icon} key={keyId + key} />
        ))}
      </div>
    </div>
  );
}
