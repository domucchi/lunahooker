export type Message = {
  type: 'origin' | 'trans';
  time: string;
  text: string;
  api?: string;
}

export type WebSocketMessage = {
  function: string;
} 