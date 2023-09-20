import { describe, expect, it } from 'vitest';

import { I18N } from '../src';

describe('intl', () => {
  const intl = new I18N();
  const t = intl.getT<any>('dde-earth');
  it('should switch to en-US', () => {
    expect(intl.locale).toBe('en-US');
  });

  it('should get en-US string', () => {
    expect(t('dde')).toBe('Deep-time Digital Earth');
  });

  it('should get undefined', () => {
    expect(t('dde.a')).toBeUndefined();
  });

  it('should be replaced successfully', () => {
    const msg = {
      'dde-earth': {
        dde: 'dde {a}',
        test: 'test',
      },
    };
    intl.extend({
      'en-US': msg,
    });
    intl.locale = 'en-US';
    expect(t('dde', { a: 1 })).toBe('dde 1');
    expect(t('dde', { b: 1 })).toBe('dde {a}');
    expect(t('test')).toBe('test');
  });

  it('should switch to zh-CN', () => {
    intl.locale = 'zh-CN';
    expect(intl.locale).toBe('zh-CN');
  });

  it('should get zh-CN string', () => {
    expect(t('dde')).toBe('深时数字地球');
  });

  it('should throw error when switch to en-EU', () => {
    expect(() => (intl.locale = 'en-EU' as any)).toThrowError(
      `Can't find locale "en-EU", do you mean "en-US"?`,
    );
  });

  it('should be extend successfully', () => {
    intl.extend({
      'de-DE': {
        'dde-earth': {
          dde: 'Tiefe-Zeit-Digitale Erde',
        },
      },
    });
    expect(intl.locales.includes('de-DE')).toBeTruthy();
  });
  it('should get de-DE string', () => {
    intl.locale = 'de-DE' as any;
    expect(t('dde')).toBe('Tiefe-Zeit-Digitale Erde');
  });

  it('should get de-DE fallback en-US', () => {
    expect(t('test')).toBe('test');
  });
});
