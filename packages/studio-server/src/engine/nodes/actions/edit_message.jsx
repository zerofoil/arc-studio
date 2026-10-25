import { MessageSquareReply, Plus } from "lucide-react";

export const registry = {
  "description": "Edits the content, embed, or components of an existing Discord message",
  "type": "action_edit_message",
  "category": "Discord Actions",
  "label": "Edit Message",
  "color": "#10b981",
  icon: MessageSquareReply,
  "requiredIntents": [],
  "inferredPermissions": [
    "View Channels",
    "Send Messages"
  ],
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
      "id": "message_id",
      "label": "Message ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "content",
      "label": "Content",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "embed",
      "label": "Embed (Optional)",
      "type": "embed"
    },
    {
      "id": "components",
      "label": "Components (Optional)",
      "type": "object"
    },
    {
      "id": "files",
      "label": "Files (optional)",
      "type": "object",
      "defaultValue": []
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "message_id",
      "label": "Message ID",
      "type": "string"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  AttachmentPicker,
  onOpenEmbedStudio,
  update,
  textEditor,
  authToken
}) {
  const componentsConnected = isConnected('components');
  return <div className="node-config node-config-stack">
    {!isConnected('channel_id') && <label className="node-config-fallback"><span>Channel ID</span><input value={node.data?.channel_id ?? ''} onChange={(event) => update('channel_id', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Channel ID" /></label>}
    {!isConnected('message_id') && <label className="node-config-fallback"><span>Message ID</span><input value={node.data?.message_id ?? ''} onChange={(event) => update('message_id', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Message ID" /></label>}
    {!isConnected('content') && <label className="node-config-fallback"><span>New content (Optional)</span>{textEditor('content', 'New content', 2000, 'Leave empty to keep existing')}</label>}
    {!isConnected('files') && <AttachmentPicker files={node.data?.files || []} authToken={authToken} onChange={(files) => update('files', files)} />}
    <button type="button" className={`node-config-action ${componentsConnected ? 'is-disabled' : ''}`} disabled={componentsConnected} title={componentsConnected ? 'Components input is connected. Edit the source node on the canvas instead.' : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { if (componentsConnected) return; event.stopPropagation(); onOpenEmbedStudio?.(node); }}><Plus size={12} /> {componentsConnected ? 'Components wired (edit source node)' : `Edit message components${node.data?.components?.length ? ` · ${node.data.components.length} rows` : ''}`}</button>
  </div>;
}
