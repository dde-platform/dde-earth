/* eslint-disable no-prototype-builtins */
import { useRouter } from "next/router";

import type { NextRouter as NextRout } from "next/router";

export type DefaultLocale = "en-US";
export type Locale =
  | "en-US"
  | "zh-CN"
  | "es-ES"
  | "fr-FR"
  | "pt-BR"
  | "ja"
  | "ko"
  | "ru";
export type TypedRouter = {
  locale?: Locale | undefined;
  locales?: Locale[] | undefined;
  defaultLocale?: DefaultLocale | undefined;
};

export type NextRouter = Omit<
  NextRout,
  "locale" | "locales" | "defaultLocale"
> &
  TypedRouter;

export default function useLocalesMap<T>(localesMap: Record<string, T>): T {
  const router: NextRouter = useRouter() as any;
  const { locale, defaultLocale } = router;
  if (!localesMap) {
    throw new Error("Pass a locales map as argument to useLocalesMap");
  }

  if (!isObject(localesMap)) {
    throw new Error("Locales map must be an object");
  }

  if (!localesMap.hasOwnProperty(defaultLocale)) {
    throw new Error(
      `Locales map must contain default locale "${defaultLocale}"`,
    );
  }

  if (
    localesMap.hasOwnProperty(locale) &&
    typeof localesMap[locale] !== typeof localesMap[defaultLocale]
  ) {
    throw new Error(
      `Invalid locales map: Shape of "${locale}" must be the same as "${defaultLocale}"`,
    );
  }

  if (
    ["string", "number", "symbol"].includes(typeof localesMap[defaultLocale])
  ) {
    return localesMap[locale] || localesMap[defaultLocale];
  }

  const target = JSON.parse(JSON.stringify(localesMap[defaultLocale]));
  return mergeDeep(target, localesMap[locale] as Record<string, any>) as any;
}

/**
 * Simple object check.
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 */
function mergeDeep<T extends Record<string, any>>(
  target: Record<string, T>,
  ...sources: Record<string, T>[]
): Record<string, T> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
