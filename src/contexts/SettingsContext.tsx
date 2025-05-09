import React, { createContext, useContext, useState, useEffect } from 'react';
import { WS_URL } from '../constants/websocket';

// Settings data type
export type AppSettings = {
  reverseLines: boolean;
  showTimer: boolean;
  showCharCount: boolean;
  showSpeed: boolean;
  maxLines: number;
  fontSize: number;
  websocketUrl: string;
  messageSpacing: number;
  enableFocusMode: boolean;
  focusFontSize: number;
  showStatsInFocus: boolean;
  enableEditInFocus: boolean;
};

const SETTINGS_KEY = 'luna_settings';

// Default settings
const defaultSettings: AppSettings = {
  reverseLines: false,
  showTimer: true,
  showCharCount: true,
  showSpeed: true,
  maxLines: 0,
  fontSize: 24,
  websocketUrl: WS_URL,
  messageSpacing: 16,
  enableFocusMode: true,
  focusFontSize: 24,
  showStatsInFocus: true,
  enableEditInFocus: true,
};

type SettingsContextType = {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? (JSON.parse(stored) as AppSettings) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  }, [settings]);

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 