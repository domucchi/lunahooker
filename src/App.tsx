import React, { useState } from 'react';
import { useSettings } from './contexts/SettingsContext';
import { useWebSocket } from './hooks/useWebSocket';
import { StatusBar } from './components/StatusBar';
import { MessageList } from './components/MessageList';
import { cn } from './lib/utils';
import { Textarea } from './components/ui/textarea';

function App() {
  const { messages, isConnected, timer, toggleConnection, isListening, toggleListening, clearStorage, editMessage } = useWebSocket();
  const { settings } = useSettings();
  const { focusFontSize, enableEditInFocus } = settings;
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [focusEditText, setFocusEditText] = useState('');

  return (
    <div className="relative min-h-screen">
      <header className="relative">
        <StatusBar 
          isConnected={isConnected}
          timer={timer}
          onToggleConnection={toggleConnection}
          isListening={isListening}
          onToggleListening={toggleListening}
          onClearStorage={clearStorage}
          messages={messages}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(prev => !prev)}
        />
      </header>
      <main className={cn("relative mx-auto max-w-screen-2xl px-4 pt-12 pb-4", isFocusMode && "pt-4 h-screen")}>
        {isFocusMode ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {isEditingFocus ? (
              <Textarea
                value={focusEditText}
                onChange={e => setFocusEditText(e.target.value)}
                onBlur={() => {
                  editMessage(messages.length - 1, focusEditText);
                  setIsEditingFocus(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    editMessage(messages.length - 1, focusEditText);
                    setIsEditingFocus(false);
                  } else if (e.key === 'Escape') {
                    setIsEditingFocus(false);
                  }
                }}
                autoFocus
                rows={5}
                className="w-full h-32 p-2 resize-none"
                style={{ fontSize: `${focusFontSize}px` }}
              />
            ) : (
              <div
                style={{ fontSize: `${focusFontSize}px` }}
                onDoubleClick={() => {
                  if (enableEditInFocus) {
                    setFocusEditText(messages[messages.length - 1]?.text || '');
                    setIsEditingFocus(true);
                  }
                }}
              >
                {messages.length > 0 ? messages[messages.length - 1].text : ''}
              </div>
            )}
            <button className="sr-only" onClick={() => setIsFocusMode(false)}>Exit Focus Mode</button>
          </div>
        ) : (
          <MessageList 
            messages={messages}
            isConnected={isConnected}
            onEditMessage={editMessage}
          />
        )}
      </main>
    </div>
  );
}

export default App;
