export const WS_URL = `ws://localhost:2233/__internalservice/transhistws`;

export const CONTROL_COMMANDS = [
  'showhideorigin',
  'showhidetransname',
  'showhidetrans',
  'showhidetime',
  'addbr',
  'clear',
  'fastinit'
] as const;

export const LUNASHOWHTML_SIGNATURE = 'LUNASHOWHTML'; 