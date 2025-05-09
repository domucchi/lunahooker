import { Pause, Play, Power, PowerOff, Trash, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { SettingsSheet } from "./SettingsSheet";
import { useSettings } from "../contexts/SettingsContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { formatDuration, getTotalChars, getCharsPerHour } from "../utils/stats";

type StatusBarProps = {
  isConnected: boolean;
  timer: number;
  onToggleConnection: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  onClearStorage: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  messages: Array<{ text: string }>;
}

export const StatusBar = ({ isConnected, timer, onToggleConnection, isListening, onToggleListening, onClearStorage, isFocusMode, onToggleFocusMode, messages }: StatusBarProps) => {
  const { settings } = useSettings();
  const { showTimer, showCharCount, showSpeed, enableFocusMode } = settings;
  const totalChars = getTotalChars(messages);
  const charsPerHour = getCharsPerHour(messages, timer);
  const formattedTime = formatDuration(timer);
  const lines = messages.length;

    const Stats = () => {
        return (
            <div className="flex justify-center space-x-2 text-lg">
            {(enableFocusMode && settings.showStatsInFocus || !enableFocusMode) && showTimer && <span>{formattedTime}</span>}
            {(enableFocusMode && settings.showStatsInFocus || !enableFocusMode) && showSpeed && <span>({charsPerHour}/h)</span>}
            {(enableFocusMode && settings.showStatsInFocus || !enableFocusMode) && showCharCount && <span>{totalChars} / {lines}</span>}
          </div>
        )
    }
  return (
    <div className="fixed top-0 left-0 w-full grid grid-cols-3 items-center text-sm text-muted-foreground px-8 py-2 bg-background z-50">
      {isFocusMode ? (
        <>
          <div />
            <div className="flex justify-center space-x-2 text-lg">
                <Stats />
            </div>
          <div className="flex justify-end space-x-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onToggleFocusMode} variant="icon" size="icon">
                  <EyeOff className="size-6 text-info" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exit Focus Mode</TooltipContent>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div />
          <Stats />
          <div className="flex justify-end space-x-4 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onToggleConnection} variant="icon" size="icon">
                  {isConnected ? <Power className="size-6 text-success hover:bg-none"/> : <PowerOff className="size-6 text-destructive"/>}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isConnected ? 'Disconnect' : 'Connect'}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onToggleListening} variant="icon" size="icon" disabled={!isConnected}>
                    {isListening ? <Pause className="size-6" /> : <Play className="size-6" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isListening ? 'Stop listening' : 'Start listening'}</TooltipContent>
            </Tooltip>
            {enableFocusMode && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={onToggleFocusMode} variant="icon" size="icon">
                    <Eye className="size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Enter Focus Mode</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onClearStorage} variant="icon" size="icon">
                  <Trash className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear all messages and timer</TooltipContent>
            </Tooltip>
            <SettingsSheet />
          </div>
        </>
      )}
    </div>
  );
}; 