import {
  DeepPartial,
  NestedIds,
  NestedKeys,
  deepMerge,
  findMostSimilarString,
} from '../utils';
import intlMessages from './messages';

export class I18N {
  private _locale: I18N.Languages;
  private _localeMessages: any;
  private _messages: I18N.IntlMessages;
  options: I18N.Options;

  get locales() {
    return Object.keys(this._localeMessages);
  }

  get locale() {
    return this._locale;
  }

  set locale(val: I18N.Languages) {
    if (!this.locales.includes(val)) {
      const similarKey = findMostSimilarString(this.locales, val);
      const msg =
        `Can't find locale "${val}"` +
        (similarKey ? `, do you mean "${similarKey}"?` : '');
      throw new Error(msg);
    }
    this._locale = val;
    this._messages = this._localeMessages[val];
  }

  constructor(options?: Partial<I18N.Options>) {
    this.options = {
      ...I18N.defaultOptions,
      ...options,
    };
    if (this.options.fallBackLanguage === undefined) {
      this.options.fallBackLanguage = this.options.defaultLanguage;
    }
    this._locale = this.options.defaultLanguage;
    this._localeMessages = intlMessages;
    this._messages = this._localeMessages[this.locale];
  }

  getT<
    Intl = I18N.IntlMessages,
    NestedKey extends NestedKeys<Intl> = NestedKeys<Intl>,
  >(namespace?: NestedKey) {
    return (id: NestedIds<Intl, NestedKey>, values?: Record<string, any>) => {
      const newId = namespace ? `${namespace}.${String(id)}` : id;
      const val = this._translateFunc(this._messages, newId, values);

      const { fallBackLanguage } = this.options;
      if (!val && this.locale !== fallBackLanguage && fallBackLanguage) {
        console.warn(
          `Can not find "${this.locale}" translation with id: "${id}" , use "${fallBackLanguage}" replaced`,
        );
        return this._translateFunc(
          this._localeMessages[fallBackLanguage],
          newId,
          values,
        );
      }
      return val;
    };
  }

  private _replaceValues(str: string, values?: Record<string, any>): any {
    if (!values) {
      return str;
    }

    if (/\{.+?\}/g.test(str)) {
      const regex = /\{(.+?)\}/g;
      return str.replace(regex, (match, p1) => values[p1] ?? match);
    } else return str;
  }

  private _translateFunc(
    messages: any,
    id: string,
    values?: Record<string, any>,
  ): string | undefined {
    const keys = id.split('.');
    let value = messages;
    for (const key of keys) {
      if (typeof value !== 'object') {
        return undefined;
      }
      value = value[key];
    }
    const val = this._replaceValues(value, values);
    return val;
  }

  extend(messages: any) {
    deepMerge(this._localeMessages, messages);
  }
}

export namespace I18N {
  export type IntlMessages = (typeof intlMessages)['en-US'];

  export interface LocaleMessages
    extends Record<keyof typeof intlMessages, any> {}

  export type Languages = keyof LocaleMessages;

  export type ExtendMessages<Intl = any> = {
    [key in Languages]?: DeepPartial<Intl>;
  };

  export const defaultOptions: Options = {
    defaultLanguage: 'en-US',
  };

  export interface Options {
    defaultLanguage: Languages;
    fallBackLanguage?: Languages | undefined | null;
    onLocaleChanged?(locale: string): void;
  }
}
