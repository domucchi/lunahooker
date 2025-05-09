// Allow overriding via VITE_WS_URL env var; otherwise use current host with appropriate protocol
const envWsUrl = import.meta.env.VITE_WS_URL;
// Default to localhost hook service; override with VITE_WS_URL if provided
export const WS_URL = envWsUrl || `ws://localhost:2333/__internalservice/transhistws`;

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