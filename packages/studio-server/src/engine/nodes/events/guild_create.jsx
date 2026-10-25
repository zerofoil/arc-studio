import { PanelsTopLeft } from "lucide-react";
export const registry = {
  "description": "The app becomes available in a server",
  "type": "event_guild_create",
  "category": "Events",
  "label": "On Server Available",
  "color": "#5865F2",
  icon: PanelsTopLeft,
  "gatewayEvent": "GUILD_CREATE",
  "gatewayIntents": [
    "GUILDS"
  ],
  "inputs": [],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "guild_id",
      "label": "Server ID",
      "type": "string",
      "eventPath": "id"
    },
    {
      "id": "name",
      "label": "Name",
      "type": "string",
      "eventPath": "name"
    },
    {
      "id": "member_count",
      "label": "Member Count",
      "type": "number",
      "eventPath": "member_count"
    }
  ]
};
