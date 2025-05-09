import { useWebSocket } from './hooks/useWebSocket';
import { StatusBar } from './components/StatusBar';
import { MessageList } from './components/MessageList';

function App() {
  const { messages, isConnected, timer, toggleConnection, isListening, toggleListening, clearStorage } = useWebSocket();

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
        />
      </header>
      <main className="relative mx-auto max-w-screen-lg px-4 py-8">
      <MessageList 
          messages={messages}
          isConnected={isConnected}
        />
      </main>
    </div>
  );
}

export default App;
