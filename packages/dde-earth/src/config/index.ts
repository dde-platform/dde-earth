export const Config = {
  prefixCls: 'dde',

  prefix(suffix: string) {
    return `${Config.prefixCls}-${suffix}`;
  },
};
