export const registry = {
  "description": "Starts a public thread from an existing message in a text channel.",
  "createdAt": "2026-10-21T00:00:00.000Z",
  "type": "action_start_thread_from_message",
  "category": "Discord Actions",
  "label": "Start Thread from Message",
  "color": "#10b981",
  "inferredPermissions": [
    "View Channels",
    "Send Messages",
    "Create Public Threads"
  ],
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "channel_id",
      "label": "Parent Channel ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "message_id",
      "label": "Message ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "name",
      "label": "Thread Name",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "auto_archive_duration",
      "label": "Auto Archive (minutes)",
      "type": "number",
      "defaultValue": 1440
    },
    {
      "id": "rate_limit_per_user",
      "label": "Slowmode (seconds)",
      "type": "number",
      "defaultValue": 0
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
      "id": "thread_id",
      "label": "Thread ID",
      "type": "string"
    },
    {
      "id": "parent_channel_id",
      "label": "Parent Channel ID",
      "type": "string"
    }
  ],
  ui
};

function ui({
  textField,
  FallbackField,
  NodeNumberInput,
  isConnected,
  node,
  numericNodeInputValue,
  update,
  AnimatedDropdown
}) {
  return <div className="node-config node-config-stack">
    {textField('channel_id', 'Parent Channel ID')}{textField('message_id', 'Message ID')}{textField('name', 'Thread name')}
    {!isConnected('auto_archive_duration') && <FallbackField label="Auto archive"><AnimatedDropdown value={String(node.data?.auto_archive_duration ?? 1440)} options={[60, 1440, 4320, 10080].map((value) => ({ value: String(value), label: `${value >= 1440 ? `${value / 1440} day${value > 1440 ? 's' : ''}` : `${value} minutes`}` }))} onChange={(value) => update('auto_archive_duration', Number(value))} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Thread auto archive duration" className="node-select" /></FallbackField>}
    {!isConnected('rate_limit_per_user') && <FallbackField label="Slowmode (seconds)"><NodeNumberInput min="0" max="21600" value={node.data?.rate_limit_per_user ?? 0} onChange={(event) => update('rate_limit_per_user', numericNodeInputValue(event.target.value, { min: 0, max: 21600 }))} onPointerDown={(event) => event.stopPropagation()} /><small className="node-config-hint">0 disables slowmode.</small></FallbackField>}
    {textField('reason', 'Audit Log Reason')}
  </div>
}
