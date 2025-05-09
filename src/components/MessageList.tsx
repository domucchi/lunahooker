import type { Message } from '../types/message';

type MessageListProps = {
  messages: Message[];
  isConnected: boolean;
}

export const MessageList = ({ messages, isConnected }: MessageListProps) => {
  if (messages.length === 0) {
    return <p>{isConnected ? "Listening..." : "WebSocket is not connected."}</p>;
  }

  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index} className="pb-8">
          {msg.text}
        </li>
      ))}
    </ul>
  );
}; 