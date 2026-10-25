export const registry = {
  "description": "Creates a text, voice, category, announcement, or stage channel. Requires Manage Channels.",
  "type": "action_create_channel",
  "category": "Discord Actions",
  "label": "Create Channel",
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
      "id": "name",
      "label": "Name",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "channel_type",
      "label": "Type",
      "type": "string",
      "defaultValue": "text"
    },
    {
      "id": "parent_id",
      "label": "Category ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "permission_overwrites",
      "label": "Permission Overwrites",
      "type": "object",
      "defaultValue": []
    },
    {
      "id": "topic",
      "label": "Topic",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "reason",
      "label": "Audit Log Reason",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "channel_id",
      "label": "Channel ID",
      "type": "string"
    }
  ],
  ui
};

function ui({
  textField,
  isConnected,
  FallbackField,
  AnimatedDropdown,
  node,
  update
}) {
  return <div className="node-config node-config-stack">
    {textField('guild_id', 'Server ID')}{textField('name', 'Channel name')}
    {!isConnected('channel_type') && <FallbackField label="Channel type"><AnimatedDropdown value={node.data?.channel_type || 'text'} options={['text', 'voice', 'category', 'announcement', 'stage'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) }))} onChange={(value) => update('channel_type', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Channel type" className="node-select" /></FallbackField>}
    {textField('parent_id', 'Category ID')}{['text', 'announcement'].includes(node.data?.channel_type || 'text') && textField('topic', 'Topic')}{textField('reason', 'Audit Log Reason')}
  </div>
}
