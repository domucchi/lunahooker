export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
}

export function getTotalChars(messages: Array<{ text: string }>): number {
  return messages.reduce((sum, msg) => sum + msg.text.length, 0);
}

export function getCharsPerHour(messages: Array<{ text: string }>, seconds: number): number {
  const total = getTotalChars(messages);
  return seconds > 0 ? Math.round((total / seconds) * 3600) : 0;
} 