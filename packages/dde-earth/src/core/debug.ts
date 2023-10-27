const STYLE = {
  info: 'color: #525252; background-color: #f1f2f2;',
  error: 'color: white; background-color: #f44336;',
  warn: 'color: #525252; background-color: yellow;',
  trace: 'color: white; background-color: #947400;',
};

function getLog(type: keyof typeof STYLE) {
  return function (
    message: string | [scope: string, msg: string],
    ...optionalParams: any[]
  ) {
    const tag = !Array.isArray(message)
      ? '%c[dde-earth]'
      : `%c[dde-earth: ${message[0]}]`;
    const msg = Array.isArray(message) ? message[1] : message;
    console[type](tag, STYLE[type], msg, ...optionalParams);
  };
}

export const Debug = {
  info: getLog('info'),

  warn: getLog('warn'),

  error: getLog('error'),

  trace: getLog('trace'),
};
