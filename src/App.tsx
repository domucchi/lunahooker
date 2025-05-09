import { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { StatusBar } from './components/StatusBar';
import { MessageList } from './components/MessageList';
import { cn } from './lib/utils';
import { FocusView } from './components/FocusView';

function App() {
  const { messages, isConnected, timer, toggleConnection, isListening, toggleListening, clearStorage, editMessage } = useWebSocket();
  const [isFocusMode, setIsFocusMode] = useState(false);

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
      <main className={cn("relative mx-auto max-w-screen-2xl px-4 pt-12 pb-4", isFocusMode && "h-screen")}>
        {isFocusMode ? (
          <FocusView
            messages={messages}
            timer={timer}
            editMessage={(index, text) => editMessage(index, text)}
            onClose={() => setIsFocusMode(false)}
          />
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
