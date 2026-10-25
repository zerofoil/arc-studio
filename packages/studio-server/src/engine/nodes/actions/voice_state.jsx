export const registry = {
  "description": "Requests a Gateway voice-state change. Joining does not create an audio connection or play audio.",
  "type": "action_voice_state",
  "category": "Discord Actions",
  "label": "Request Voice Join / Leave",
  "color": "#10b981",
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "guild_id",
      "label": "Server ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "channel_id",
      "label": "Voice Channel ID (blank leaves)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "self_mute",
      "label": "Self Mute",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": "self_deaf",
      "label": "Self Deafen",
      "type": "boolean",
      "defaultValue": false
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  ui
};

function ui({
  textField,
  isConnected,
  FallbackCheckbox,
  node,
  update
}) {
  return <div className="node-config node-config-stack">
    {textField('guild_id', 'Server ID')}{textField('channel_id', 'Voice channel ID (blank leaves)')}
    {!isConnected('self_mute') && <FallbackCheckbox label="Self Mute" checked={node.data?.self_mute ?? false} onChange={(value) => update('self_mute', value)} />}
    {!isConnected('self_deaf') && <FallbackCheckbox label="Self Deafen" checked={node.data?.self_deaf ?? false} onChange={(value) => update('self_deaf', value)} />}
    <span className="node-config-hint">Requests a Gateway join or leave. It does not stream audio.</span>
  </div>
}
