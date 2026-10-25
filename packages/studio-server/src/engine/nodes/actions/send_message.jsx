import { Send, Plus } from "lucide-react";

export const registry = {
  "description": "Sends message text, embeds, attachments, and interactive components to a Discord channel",
  "createdAt": "2026-10-21T00:00:00.000Z",
  "type": "action_send_message",
  "category": "Discord Actions",
  "label": "Send Message",
  "color": "#10b981",
  icon: Send,
  "inferredPermissions": [
    "View Channels",
    "Send Messages",
    "Send Messages in Threads"
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
      "id": "thread_id",
      "label": "Thread ID (Optional)",
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
    },
    {
      "id": "file_data",
      "label": "File Data URL / Base64",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "file_name",
      "label": "File Name",
      "type": "string",
      "defaultValue": "image.png"
    },
    {
      "id": "reply_to_message_id",
      "label": "Reply to Message ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "mention_replied_user",
      "label": "Mention Replied User",
      "type": "boolean",
      "defaultValue": false
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
  ui: ui
};

function ui({
  isConnected,
  AttachmentPicker,
  node,
  textEditor,
  FallbackCheckbox,
  authToken
}) {
  const componentsConnected = isConnected("components");
  return <div className="node-config node-config-stack">
    {!isConnected("channel_id") && <label className="node-config-fallback"><span>Channel ID</span><input value={node.data?.channel_id ?? ""} onChange={(event) => update("channel_id", event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Channel ID" /></label>}
    {!isConnected("thread_id") && <label className="node-config-fallback"><span>Thread ID (Optional)</span><input value={node.data?.thread_id ?? ""} onChange={(event) => update("thread_id", event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Overrides Channel ID when set" aria-label="Thread ID" /></label>}
    {!isConnected("content") && <label className="node-config-fallback"><span>Message content</span>{textEditor("content", "Message content", 2000, "Used when unconnected")}</label>}
    {!isConnected("mention_replied_user") && <FallbackCheckbox label="Mention Replied User" checked={node.data?.mention_replied_user ?? (isConnected("reply_to_message_id") || Boolean(node.data?.reply_to_message_id))} onChange={(value) => update("mention_replied_user", value)} />}
    {!isConnected("files") && <AttachmentPicker files={node.data?.files || []} authToken={authToken} onChange={(files) => update("files", files)} />}
    <button type="button" className={`node-config-action ${componentsConnected ? "is-disabled" : ""}`} disabled={componentsConnected} title={componentsConnected ? "Components input is connected. Edit the source node on the canvas instead." : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { if (componentsConnected) return; event.stopPropagation(); onOpenEmbedStudio?.(node); }}><Plus size={12} /> {componentsConnected ? "Components wired (edit source node)" : `Edit message components${node.data?.components?.length ? ` · ${node.data.components.length} rows` : ""}`}</button>
  </div>;
}
