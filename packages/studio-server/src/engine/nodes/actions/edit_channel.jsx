import { Plus } from "lucide-react";

export const registry = {
  "description": "Changes a channel name, topic, or category. Requires Manage Channels.",
  "type": "action_edit_channel",
  "category": "Discord Actions",
  "label": "Edit Channel",
  "color": "#10b981",
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "channel_id",
      "label": "Channel ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "thread_id",
      "label": "Thread ID (Optional)",
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
      "id": "topic",
      "label": "Topic",
      "type": "string",
      "defaultValue": ""
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
      "id": "rate_limit_per_user",
      "label": "Slowmode (seconds)",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "nsfw",
      "label": "Age restricted",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": "bitrate",
      "label": "Voice bitrate",
      "type": "number",
      "defaultValue": 64000
    },
    {
      "id": "user_limit",
      "label": "Voice user limit",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "rtc_region",
      "label": "Voice region",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "video_quality_mode",
      "label": "Voice video quality mode",
      "type": "number",
      "defaultValue": ""
    },
    {
      "id": "default_auto_archive_duration",
      "label": "Thread auto archive (minutes)",
      "type": "number",
      "defaultValue": ""
    },
    {
      "id": "archived",
      "label": "Archived",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": "locked",
      "label": "Locked",
      "type": "boolean",
      "defaultValue": false
    },
    {
      "id": "invitable",
      "label": "Members can invite",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": "auto_archive_duration",
      "label": "Thread auto archive (minutes)",
      "type": "number",
      "defaultValue": 1440
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
      "id": "channel_id_out",
      "label": "Channel ID",
      "type": "string"
    }
  ],
  ui
};

function ui({
  textField,
  isConnected,
  node,
  FallbackCheckbox,
  FallbackField,
  NodeNumberInput,
  AnimatedDropdown,
  update,
  onOpenPermissionStudio,
  numericNodeInputValue
}) {
  return <div className="node-config node-config-stack">
    {textField('thread_id', 'Thread ID (optional)')}
    {isConnected('thread_id') || String(node.data?.thread_id || '').trim() ? <>
      {textField('name', 'New name')}
      {!isConnected('rate_limit_per_user') && <FallbackField label="Slowmode (seconds)"><NodeNumberInput allowEmpty min="0" max="21600" value={node.data?.rate_limit_per_user ?? ''} onChange={(event) => update('rate_limit_per_user', numericNodeInputValue(event.target.value, { min: 0, max: 21600, allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} placeholder="Leave unchanged" /><small className="node-config-hint">0–21,600 seconds · blank keeps the current value</small></FallbackField>}
      {!isConnected('archived') && <FallbackField label="Archive state"><AnimatedDropdown value={node.data?.archived === true ? 'true' : node.data?.archived === false ? 'false' : ''} onChange={(value) => update('archived', value === '' ? '' : value === 'true')} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Thread archive state" options={[{ value: '', label: 'Leave unchanged' }, { value: 'true', label: 'Archive thread' }, { value: 'false', label: 'Unarchive thread' }]} className="node-select" /></FallbackField>}
      {!isConnected('locked') && <FallbackField label="Lock state"><AnimatedDropdown value={node.data?.locked === true ? 'true' : node.data?.locked === false ? 'false' : ''} onChange={(value) => update('locked', value === '' ? '' : value === 'true')} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Thread lock state" options={[{ value: '', label: 'Leave unchanged' }, { value: 'true', label: 'Lock thread' }, { value: 'false', label: 'Unlock thread' }]} className="node-select" /></FallbackField>}
      {!isConnected('invitable') && <FallbackField label="Invites (private threads only)"><AnimatedDropdown value={node.data?.invitable === true ? 'true' : node.data?.invitable === false ? 'false' : ''} onChange={(value) => update('invitable', value === '' ? '' : value === 'true')} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Thread invitations" options={[{ value: '', label: 'Leave unchanged' }, { value: 'true', label: 'Allow invites' }, { value: 'false', label: 'Disallow invites' }]} className="node-select" /></FallbackField>}
      {!isConnected('auto_archive_duration') && <FallbackField label="Auto archive"><AnimatedDropdown value={String(node.data?.auto_archive_duration ?? '')} onChange={(value) => update('auto_archive_duration', value === '' ? '' : Number(value))} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Thread auto archive duration" options={[{ value: '', label: 'Leave unchanged' }, ...[60, 1440, 4320, 10080].map((value) => ({ value: String(value), label: `${value >= 1440 ? `${value / 1440} day${value > 1440 ? 's' : ''}` : `${value} minutes`}` }))]} className="node-select" /></FallbackField>}
    </> : <>
      {textField('channel_id', 'Channel ID')}{textField('name', 'New name')}{textField('topic', 'Description / topic')}{textField('parent_id', 'New category ID')}
      {!isConnected('rate_limit_per_user') && <FallbackField label="Slowmode (seconds)"><NodeNumberInput allowEmpty min="0" max="21600" value={node.data?.rate_limit_per_user ?? ''} onChange={(event) => update('rate_limit_per_user', numericNodeInputValue(event.target.value, { min: 0, max: 21600, allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} placeholder="Leave unchanged" /><small className="node-config-hint">0–21,600 seconds · blank keeps the current value</small></FallbackField>}
      {!isConnected('nsfw') && <FallbackCheckbox label="Age restricted" checked={Boolean(node.data?.nsfw)} onChange={(value) => update('nsfw', value)} />}
      {!isConnected('permission_overwrites') && <button type="button" className="node-config-action node-config-studio-action" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onOpenPermissionStudio?.({ ...node, type: 'data_permission_overwrites', label: 'Channel Permission Overwrites' }); }}><Plus size={12} /> Edit channel permissions</button>}
      {!isConnected('bitrate') && <FallbackField label="Voice bitrate (bits/sec)"><NodeNumberInput allowEmpty min="8000" max="384000" step="1" value={node.data?.bitrate ?? ''} onChange={(event) => update('bitrate', numericNodeInputValue(event.target.value, { min: 8000, max: 384000, allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} placeholder="Leave unchanged" /><small className="node-config-hint">Custom values: 8,000–384,000. The server tier sets the actual cap; Stage channels cap at 64,000.</small></FallbackField>}
      {!isConnected('user_limit') && <FallbackField label="User limit (0 = unlimited)"><NodeNumberInput allowEmpty min="0" max="10000" step="1" value={node.data?.user_limit ?? ''} onChange={(event) => update('user_limit', numericNodeInputValue(event.target.value, { min: 0, max: 10000, integer: true, allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} placeholder="Leave unchanged" /><small className="node-config-hint">Voice channels: 0–99 · Stage channels: up to 10,000</small></FallbackField>}
      {textField('rtc_region', 'Voice region (blank = automatic)')}
      {!isConnected('video_quality_mode') && <FallbackField label="Voice video quality"><AnimatedDropdown value={String(node.data?.video_quality_mode ?? '')} onChange={(value) => update('video_quality_mode', value === '' ? '' : Number(value))} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Voice video quality" options={[{ value: '', label: 'Leave unchanged' }, { value: '1', label: 'Automatic' }, { value: '2', label: '720p' }]} className="node-select" /></FallbackField>}
      {!isConnected('default_auto_archive_duration') && <FallbackField label="Default thread archive"><AnimatedDropdown value={String(node.data?.default_auto_archive_duration ?? '')} onChange={(value) => update('default_auto_archive_duration', value === '' ? '' : Number(value))} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Default thread archive duration" options={[{ value: '', label: 'Leave unchanged' }, ...[60, 1440, 4320, 10080].map((value) => ({ value: String(value), label: `${value >= 1440 ? value / 1440 + ' day' + (value > 1440 ? 's' : '') : value + ' minutes'}` }))]} className="node-select" /></FallbackField>}
    </>}
    {textField('reason', 'Audit Log Reason')}
  </div>
}
