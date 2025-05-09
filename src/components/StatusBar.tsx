import { Pause, Play, Power, PowerOff, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { SettingsSheet } from "./SettingsSheet";
import { useSettings } from "../contexts/SettingsContext";

type StatusBarProps = {
  isConnected: boolean;
  timer: number;
  onToggleConnection: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  onClearStorage: () => void;
  messages: Array<{ text: string }>;
}

export const StatusBar = ({ isConnected, timer, onToggleConnection, isListening, onToggleListening, onClearStorage, messages }: StatusBarProps) => {
  const { settings } = useSettings();
  const { showTimer, showCharCount, showSpeed } = settings;
  const totalChars = messages.reduce((sum, msg) => sum + msg.text.length, 0);
  const charsPerHour = timer > 0 ? Math.round((totalChars / timer) * 3600) : 0;
  
  const hours = Math.floor(timer / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timer % 3600) / 60).toString().padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');

  return (
    <div className="fixed top-0 left-0 w-full flex gap-2 justify-end items-center text-sm text-muted-foreground px-4 py-1 bg-background z-50">
      {showTimer && <span>{hours}:{minutes}:{seconds}</span>}
      {showSpeed && <span>({charsPerHour}/h)</span>}
      {showCharCount && <span>{totalChars}</span>}
      <Button onClick={onToggleConnection} variant="icon" size="icon">
        {isConnected ? <Power className="size-4 text-success hover:bg-none"/> : <PowerOff className="size-4 text-destructive"/>}
      </Button>
      <Button onClick={onToggleListening} variant="icon" size="icon" disabled={!isConnected}>
        {isListening ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>
      <Button onClick={onClearStorage} variant="icon" size="icon">
        <Trash className="size-4" />
      </Button>
      <SettingsSheet />
    </div>
  );
}; 