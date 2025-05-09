import { useState, useEffect, useRef } from 'react';
import type { Message } from '../types/message';
import { WS_URL } from '../constants/websocket';
import { parseLunaMessage } from '../utils/messageParser';

type UseWebSocketReturn = {
  messages: Message[];
  isConnected: boolean;
  timer: number;
  toggleConnection: () => void;
  isListening: boolean;
  toggleListening: () => void;
  clearStorage: () => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem("luna_messages");
      return stored ? JSON.parse(stored) as Message[] : [];
    } catch {
      return [];
    }
  });
  const [isConnected, setIsConnected] = useState(false);
  const [timer, setTimer] = useState<number>(() => {
    const stored = localStorage.getItem("luna_timer");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [isListening, setIsListening] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isConnected) {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setIsListening(false);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected. Code:", event.code, "Reason:", event.reason);
        setIsConnected(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current = null;
        }
      };

      return () => {
        console.log("WebSocket useEffect cleanup running.");
        if (wsRef.current) {
          console.log("Closing WebSocket during cleanup.");
          wsRef.current.close();
        }
        if (timerIntervalRef.current) {
          console.log("Clearing timer during cleanup.");
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      };
    } else {
      console.log("isConnected is false. Ensuring WebSocket and timer are stopped.");
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setIsListening(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isListening && isConnected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ function: 'calllunaloadready' }));
      console.log("Sent calllunaloadready");
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isListening, isConnected]);

  // Only add incoming messages to state when listening
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;
    const handler = (event: MessageEvent) => {
      const newMessage = parseLunaMessage(event.data);
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
      }
    };
    if (isListening) {
      ws.addEventListener('message', handler);
    }
    return () => {
      ws.removeEventListener('message', handler);
    };
  }, [isListening]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem("luna_messages", JSON.stringify(messages));
  }, [messages]);

  // Persist timer to localStorage
  useEffect(() => {
    localStorage.setItem("luna_timer", timer.toString());
  }, [timer]);

  // Clear stored messages and timer
  const clearStorage = () => {
    setMessages([]);
    setTimer(0);
    localStorage.removeItem("luna_messages");
    localStorage.removeItem("luna_timer");
    setIsListening(false);
  };

  return {
    messages,
    isConnected,
    timer,
    isListening,
    toggleConnection,
    toggleListening,
    clearStorage
  };
}; 