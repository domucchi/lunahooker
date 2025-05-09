import type { Message } from '../types/message';
import { useSettings } from '../contexts/SettingsContext';

type MessageListProps = {
  messages: Message[];
  isConnected: boolean;
};

export const MessageList = ({ messages, isConnected }: MessageListProps) => {
  const { settings } = useSettings();
  const { reverseLines, maxLines, fontSize, messageSpacing } = settings;

  if (messages.length === 0) {
    return <p>{isConnected ? "Listening..." : "WebSocket is not connected."}</p>;
  }

  // Apply reverse and maxLines
  let displayMessages = reverseLines ? [...messages].reverse() : [...messages];
  if (maxLines > 0 && displayMessages.length > maxLines) {
    displayMessages = displayMessages.slice(-maxLines);
  }

  return (
    <ul>
      {displayMessages.map((msg, index) => (
        <li key={index} style={{ fontSize: `${fontSize}px`, marginBottom: `${messageSpacing}px` }}>
          {msg.text}
        </li>
      ))}
    </ul>
  );
}; 