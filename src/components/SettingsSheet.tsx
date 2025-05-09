import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Settings } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useSettings } from "../contexts/SettingsContext";

export const SettingsSheet = () => {
  const { settings, setSettings, resetSettings } = useSettings();
  const { reverseLines, showTimer, showCharCount, showSpeed, maxLines, fontSize, websocketUrl, messageSpacing } = settings;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="icon" size="icon">
          <Settings className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="sr-only">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Adjust app preferences below.</SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="reverseLines" checked={reverseLines} onCheckedChange={checked => setSettings(prev => ({ ...prev, reverseLines: checked === true }))} />
            <label htmlFor="reverseLines">Reverse Line Order</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="showTimer" checked={showTimer} onCheckedChange={checked => setSettings(prev => ({ ...prev, showTimer: checked === true }))} />
            <label htmlFor="showTimer">Show Timer</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="showCharCount" checked={showCharCount} onCheckedChange={checked => setSettings(prev => ({ ...prev, showCharCount: checked === true }))} />
            <label htmlFor="showCharCount">Show Char Count</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="showSpeed" checked={showSpeed} onCheckedChange={checked => setSettings(prev => ({ ...prev, showSpeed: checked === true }))} />
            <label htmlFor="showSpeed">Show Speed</label>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="wsUrl">WebSocket URL:</label>
            <Input id="wsUrl" type="text" value={websocketUrl} onChange={e => setSettings(prev => ({ ...prev, websocketUrl: e.target.value }))} className="flex-1" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="maxLines">Max Lines:</label>
            <Input id="maxLines" type="number" value={maxLines} onChange={e => setSettings(prev => ({ ...prev, maxLines: Number(e.target.value) }))} className="w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="fontSize">Font Size (px):</label>
            <Input id="fontSize" type="number" value={fontSize} onChange={e => setSettings(prev => ({ ...prev, fontSize: Number(e.target.value) }))} className="w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="messageSpacing">Message Spacing (px):</label>
            <Input id="messageSpacing" type="number" value={messageSpacing} onChange={e => setSettings(prev => ({ ...prev, messageSpacing: Number(e.target.value) }))} className="w-20" />
          </div>
          
        </div>
        <div className="p-4 border-t border-border">
          <Button variant="default" className="w-full" onClick={resetSettings}>
            Reset Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 