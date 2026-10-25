export const registry = {
  "description": "Adds or removes a role from a guild member. Requires Manage Roles.",
  "type": "action_member_role",
  "category": "Discord Actions",
  "label": "Set Member Role",
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
      "id": "user_id",
      "label": "User ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "role_id",
      "label": "Role ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "operation",
      "label": "Operation",
      "type": "string",
      "defaultValue": "add"
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
    {textField('guild_id', 'Server ID')}{textField('user_id', 'User ID')}{textField('role_id', 'Role ID')}
    {!isConnected('operation') && <FallbackField label="Operation"><AnimatedDropdown value={node.data?.operation || 'add'} options={[{ value: 'add', label: 'Add role' }, { value: 'remove', label: 'Remove role' }]} onChange={(value) => update('operation', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Role operation" className="node-select" /></FallbackField>}{textField('reason', 'Audit Log Reason')}
  </div>
}
