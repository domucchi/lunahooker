import { useState } from 'react';
import type { Message } from '../types/message';
import { useSettings } from '../contexts/SettingsContext';
import { Textarea } from './ui/textarea';

type FocusViewProps = {
  messages: Message[];
  timer: number;
  editMessage: (index: number, newText: string) => void;
  onClose: () => void;
};

export const FocusView = ({ messages, editMessage }: FocusViewProps) => {
  const { settings } = useSettings();
  const { focusFontSize, enableEditInFocus } = settings;

  const [isEditing, setIsEditing] = useState(false);
  const latestIndex = messages.length - 1;
  const [text, setText] = useState<string>(messages[latestIndex]?.text || '');

  return (
    <div className="flex flex-col items-top w-full h-full">
      {isEditing ? (
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => {
            editMessage(latestIndex, text);
            setIsEditing(false);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              editMessage(latestIndex, text);
              setIsEditing(false);
            } else if (e.key === 'Escape') {
              setIsEditing(false);
            }
          }}
          autoFocus
          rows={5}
          className="w-full h-32 p-2 resize-none text-center"
          style={{ fontSize: `${focusFontSize}px` }}
        />
      ) : (
        <div
          style={{ fontSize: `${focusFontSize}px` }}
          onDoubleClick={() => enableEditInFocus && setIsEditing(true)}
          className="text-center w-full"
        >
          {messages[latestIndex]?.text || ''}
        </div>
      )}
    </div>
  );
}; 