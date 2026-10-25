import { AlertTriangle } from "lucide-react";

export const registry = {
  "description": "Times out, kicks, bans, or unbans a server member. Route failures through the Failed output.",
  "type": "action_moderate_member",
  "category": "Discord Actions",
  "label": "Moderate Member",
  "color": "#ef4444",
  "inferredPermissions": [
    "Moderate Members",
    "Kick Members",
    "Ban Members"
  ],
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
      "id": "user_id",
      "label": "User ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "operation",
      "label": "Action",
      "type": "string",
      "defaultValue": "timeout"
    },
    {
      "id": "duration_minutes",
      "label": "Timeout (minutes)",
      "type": "number",
      "defaultValue": 10
    },
    {
      "id": "delete_message_seconds",
      "label": "Ban message deletion (seconds)",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "reason",
      "label": "Reason",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Succeeded",
      "type": "exec"
    },
    {
      "id": "failure_exec",
      "label": "Failed",
      "type": "exec"
    },
    {
      "id": "success",
      "label": "Success",
      "type": "boolean"
    },
    {
      "id": "error",
      "label": "Error",
      "type": "string"
    }
  ],
  ui
};

function ui({
  textField,
  isConnected,
  node,
  AnimatedDropdown,
  FallbackField,
  NodeNumberInput,
  numericNodeInputValue,
  update
}) {
  return <div className="node-config node-config-stack">
    {textField('guild_id', 'Server ID')}{textField('user_id', 'Member ID')}
    {!isConnected('operation') && <FallbackField label="Action"><AnimatedDropdown value={node.data?.operation || 'timeout'} options={[{ value: 'timeout', label: 'Timeout' }, { value: 'kick', label: 'Kick' }, { value: 'ban', label: 'Ban' }, { value: 'unban', label: 'Unban' }]} onChange={(value) => update('operation', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Moderation action" className="node-select" /></FallbackField>}
    {node.data?.operation === 'timeout' && !isConnected('duration_minutes') && <FallbackField label="Timeout (minutes)"><NodeNumberInput min="1" max="40320" value={node.data?.duration_minutes ?? 10} onChange={(event) => update('duration_minutes', numericNodeInputValue(event.target.value, { min: 1, max: 40320, integer: true, fallback: 1 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Timeout duration in minutes" /></FallbackField>}
    {node.data?.operation === 'ban' && !isConnected('delete_message_seconds') && <FallbackField label="Delete recent messages (seconds)"><NodeNumberInput min="0" max="604800" value={node.data?.delete_message_seconds ?? 0} onChange={(event) => update('delete_message_seconds', numericNodeInputValue(event.target.value, { min: 0, max: 604800, integer: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Ban message deletion period" /></FallbackField>}
    {textField('reason', 'Audit Log Reason')}
    <span className="node-config-warning"><AlertTriangle size={12} /> Discord checks the bot’s role position and server permissions.</span>
  </div>
}
