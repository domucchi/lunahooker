import type { Message } from '../types/message';
import { CONTROL_COMMANDS, LUNASHOWHTML_SIGNATURE } from '../constants/websocket';

export const parseLunaMessage = (data: string): Message | null => {
  try {
    // Handle control commands we don't need to store as messages
    if (CONTROL_COMMANDS.some(cmd => data.startsWith(`${cmd}(`) || data === `${cmd}();`)) {
      return null;
    }

    // Handle clear command by clearing our local state
    if (data === "clear();") {
      console.log("Received clear command. Clearing messages.");
      return null;
    }

    // Handle fastinit - log and ignore for simplicity
    if (data.startsWith("fastinit(")) {
      console.log("Received fastinit data (ignored for message list)");
      return null;
    }

    // Regex to match getnewsentence("time", "sentence");
    const sentenceMatch = data.match(/^getnewsentence\("([^"]*)", ?"([^"]*)"\);$/);
    if (sentenceMatch && sentenceMatch[1] !== undefined && sentenceMatch[2] !== undefined) {
      const time = decodeURIComponent(sentenceMatch[1]);
      const sentence = decodeURIComponent(sentenceMatch[2]);
      return { type: "origin", time, text: sentence };
    }

    // Regex to match getnewtrans("time", "api", "sentence");
    const transMatch = data.match(/^getnewtrans\("([^"]*)", ?"([^"]*)", ?"([^"]*)"\);$/);
    if (transMatch && transMatch[1] !== undefined && transMatch[2] !== undefined && transMatch[3] !== undefined) {
      const time = decodeURIComponent(transMatch[1]);
      const api = decodeURIComponent(transMatch[2]);
      let sentence = decodeURIComponent(transMatch[3]);

      // Handle LUNASHOWHTML signature if present
      if (sentence.startsWith(LUNASHOWHTML_SIGNATURE)) {
        sentence = sentence.substring(LUNASHOWHTML_SIGNATURE.length);
      }
      return { type: "trans", time, api, text: sentence };
    }

    console.warn("Unknown LunaTranslator message format:", data);
    return null;
  } catch (error) {
    console.error("Error parsing LunaTranslator message:", error, "Data:", data);
    return null;
  }
}; 