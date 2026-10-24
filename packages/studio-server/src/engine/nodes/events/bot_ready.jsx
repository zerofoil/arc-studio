import { Power } from "lucide-react";
export const register = {
  "description": "Runs when the bot connects",
  "type": "event_bot_ready",
  "category": "Events",
  "label": "On Bot Ready",
  "color": "#5865F2",
  icon: Power,
  "gatewayEvent": "READY",
  "gatewayIntents": [],
  "inputs": [],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ]
};
