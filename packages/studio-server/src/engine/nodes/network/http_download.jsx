export const registry = {
  "description": "Downloads a public file over HTTP or HTTPS as a bounded binary attachment. Connect File to a message or interaction reply Files input.",
  "type": "action_http_download",
  "category": "Web & Network",
  "label": "HTTP Download File",
  "color": "#0ea5e9",
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "url",
      "label": "URL",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "user_agent",
      "label": "User-Agent",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "timeout_ms",
      "label": "Timeout (ms)",
      "type": "number",
      "defaultValue": 20000
    },
    {
      "id": "max_bytes",
      "label": "Max file bytes",
      "type": "number",
      "defaultValue": 20971520
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "file",
      "label": "File",
      "type": "object"
    },
    {
      "id": "filename",
      "label": "File Name",
      "type": "string"
    },
    {
      "id": "content_type",
      "label": "Content Type",
      "type": "string"
    },
    {
      "id": "byte_size",
      "label": "Bytes",
      "type": "number"
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
  node,
  templateInput,
  isConnected,
  FallbackField,
  NodeNumberInput,
  numericNodeInputValue,
  update
}) {
  if (node.type === 'action_http_download') {
    return <div className="node-config node-config-stack">
      {templateInput('url', 'URL', { inputMode: 'url', maxLength: 4096, placeholder: 'Direct public file URL' })}
      {templateInput('user_agent', 'User-Agent', { maxLength: 512, placeholder: 'Optional' })}
      {!isConnected('timeout_ms') && <FallbackField label="Timeout (ms)"><NodeNumberInput min="1000" max="30000" value={node.data?.timeout_ms ?? 20000} onChange={(event) => update('timeout_ms', numericNodeInputValue(event.target.value, { min: 1000, max: 30000, fallback: 1000 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="File download timeout in milliseconds" /></FallbackField>}
      {!isConnected('max_bytes') && <FallbackField label="Max file bytes"><NodeNumberInput min="1024" max="20971520" value={node.data?.max_bytes ?? 20971520} onChange={(event) => update('max_bytes', numericNodeInputValue(event.target.value, { min: 1024, max: 20971520, integer: true, fallback: 1024 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Maximum file size in bytes" /></FallbackField>}
      <span className="node-config-hint">Connect File to a message or interaction reply Files input. Maximum file size is 20 MiB.</span>
    </div>;
  }
}
