import { ShieldCheck } from "lucide-react";
export const register = {
  "description": "A role is created",
  "type": "event_role_create",
  "category": "Events",
  "label": "On Role Created",
  "color": "#5865F2",
  icon: ShieldCheck,
  "gatewayEvent": "GUILD_ROLE_CREATE",
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
      "id": "role_id",
      "label": "Role ID",
      "type": "string",
      "eventPath": "role.id"
    },
    {
      "id": "guild_id",
      "label": "Server ID",
      "type": "string",
      "eventPath": "guild_id"
    },
    {
      "id": "name",
      "label": "Name",
      "type": "string",
      "eventPath": "role.name"
    },
    {
      "id": "color",
      "label": "Color",
      "type": "number",
      "eventPath": "role.color"
    }
  ]
};
