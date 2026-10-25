import { Activity } from "lucide-react";
export const registry = {
  "description": "Updates live app status and activity message",
  "type": "action_set_presence",
  "category": "Discord Actions",
  "label": "Set Bot Presence",
  "color": "#10b981",
  icon: Activity,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "status",
      "label": "Status (online/dnd/idle)",
      "type": "string",
      "defaultValue": "online"
    },
    {
      "id": "activity_text",
      "label": "Activity Text",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "activity_type",
      "label": "Activity Type",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "stream_url",
      "label": "Stream URL",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  ui: ui
};

function ui({
  node,
  isConnected,
  update,
  FallbackField,
  AnimatedDropdown
}) {
  const activityTypes = [{ value: '0', label: 'Playing' }, { value: '1', label: 'Streaming' }, { value: '2', label: 'Listening' }, { value: '3', label: 'Watching' }, { value: '5', label: 'Competing' }];
  const statuses = [{ value: 'online', label: 'Online' }, { value: 'idle', label: 'Idle' }, { value: 'dnd', label: 'Do not disturb' }, { value: 'invisible', label: 'Invisible' }];
  return <div className="node-config node-config-stack">
    {!isConnected('activity_text') && <FallbackField label="Activity text"><input value={node.data?.activity_text ?? ""} maxLength={128} onChange={(event) => update('activity_text', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="ARC Studio" aria-label="Presence activity text" /></FallbackField>}
    {!isConnected('activity_type') && <FallbackField label="Activity type"><AnimatedDropdown value={String(node.data?.activity_type ?? 0)} options={activityTypes} onChange={(value) => update('activity_type', Number(value))} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Presence activity type" className="node-select" /></FallbackField>}
    {Number(node.data?.activity_type) === 1 && !isConnected('stream_url') && <FallbackField label="Stream URL"><input type="url" value={node.data?.stream_url ?? ''} maxLength={2048} onChange={(event) => update('stream_url', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="https://twitch.tv/your-channel" aria-label="Streaming activity URL" /></FallbackField>}
    {!isConnected('status') && <FallbackField label="Status"><AnimatedDropdown value={node.data?.status ?? 'online'} options={statuses} onChange={(value) => update('status', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Bot presence status" className="node-select" /></FallbackField>}
  </div>;
}
