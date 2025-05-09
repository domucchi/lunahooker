import { useState } from 'react';
import type { Message } from '../types/message';
import { Textarea } from './ui/textarea';
import { useSettings } from '../contexts/SettingsContext';

type MessageListProps = {
  messages: Message[];
  isConnected: boolean;
  onEditMessage: (index: number, newText: string) => void;
};

export const MessageList = ({ messages, isConnected, onEditMessage }: MessageListProps) => {
  const { settings } = useSettings();
  const { reverseLines, maxLines, fontSize, messageSpacing } = settings;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

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
        <li
          key={index}
          style={{ fontSize: `${fontSize}px`, marginBottom: `${messageSpacing}px` }}
          onDoubleClick={() => {
            setEditingIndex(index);
            setEditText(msg.text);
          }}
        >
          {editingIndex === index ? (
            <Textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onBlur={() => {
                onEditMessage(index, editText);
                setEditingIndex(null);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  onEditMessage(index, editText);
                  setEditingIndex(null);
                } else if (e.key === 'Escape') {
                  setEditingIndex(null);
                }
              }}
              autoFocus
              rows={3}
              className="w-full resize-none"
              style={{ fontSize: `${fontSize}px` }}
            />
          ) : (
            msg.text
          )}
        </li>
      ))}
    </ul>
  );
}; 