import { Plus } from "lucide-react";

export const registry = {
  "description": "Creates a role with a name, RGB color number, and mentionable setting. Requires Manage Roles.",
  "type": "action_create_role",
  "category": "Discord Actions",
  "label": "Create Role",
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
      "defaultValue": "new role"
    },
    {
      "id": "color",
      "label": "Color (RGB number)",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "permissions",
      "label": "Permissions Bitfield",
      "type": "string",
      "defaultValue": "0"
    },
    {
      "id": "hoist",
      "label": "Show separately",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": "mentionable",
      "label": "Mentionable",
      "type": "boolean",
      "defaultValue": false
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
      "id": "role_id",
      "label": "Role ID",
      "type": "string"
    }
  ],
  ui
};

function ui({
  textField,
  isConnected,
  FallbackCheckbox,
  FallbackField,
  NodeNumberInput,
  node,
  numericNodeInputValue,
  onOpenPermissionStudio,
  update
}) {
  return <div className="node-config node-config-stack">
    {textField('guild_id', 'Server ID')}
    {textField('name', 'Role name')}
    {!isConnected('color') && <FallbackField label="Color (RGB number)"><NodeNumberInput min="0" max="16777215" value={node.data?.color ?? 0} onChange={(event) => update('color', numericNodeInputValue(event.target.value, { min: 0, max: 16777215, integer: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Role RGB color number" /></FallbackField>}
    {!isConnected('permissions') && <button type="button" className="node-config-action" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onOpenPermissionStudio?.(node); }}><Plus size={12} /> Edit role permissions</button>}
    {isConnected('permissions') && <span className="node-config-hint">Role permissions come from the connected input.</span>}
    {!isConnected('hoist') && <FallbackCheckbox label="Show separately" checked={node.data?.hoist ?? false} onChange={(value) => update('hoist', value)} />}
    {!isConnected('mentionable') && <FallbackCheckbox label="Mentionable" checked={node.data?.mentionable ?? false} onChange={(value) => update('mentionable', value)} />}{textField('reason', 'Audit Log Reason')}
  </div>
}
