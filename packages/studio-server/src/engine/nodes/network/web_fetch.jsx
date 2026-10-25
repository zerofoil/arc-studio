export const registry = {
  "description": "Make a bounded HTTP request with headers and an optional body. Local/private network destinations and redirects are blocked.",
  "type": "action_web_fetch",
  "category": "Web & Network",
  "label": "HTTP Request",
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
      "id": "method",
      "label": "Method",
      "type": "string",
      "defaultValue": "GET"
    },
    {
      "id": "headers",
      "label": "Headers (JSON)",
      "type": "string",
      "defaultValue": "{}"
    },
    {
      "id": "user_agent",
      "label": "User-Agent",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "body",
      "label": "Body",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "timeout_ms",
      "label": "Timeout (ms)",
      "type": "number",
      "defaultValue": 10000
    },
    {
      "id": "max_bytes",
      "label": "Max response bytes",
      "type": "number",
      "defaultValue": 1048576
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "status",
      "label": "Status",
      "type": "number"
    },
    {
      "id": "ok",
      "label": "2xx",
      "type": "boolean"
    },
    {
      "id": "body",
      "label": "Response Body",
      "type": "string"
    },
    {
      "id": "headers",
      "label": "Response Headers (JSON)",
      "type": "string"
    },
    {
      "id": "json",
      "label": "JSON",
      "type": "object"
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
  FallbackCheckbox,
  FallbackField,
  AnimatedDropdown,
  NodeNumberInput,
  numericNodeInputValue,
  update
}) {
  if (node.type === 'action_web_fetch' || node.type === 'action_web_retry') {
    const canRetry = node.type === 'action_web_retry';
    return <div className="node-config node-config-stack">
      {!['url', 'method', 'headers', 'body', 'timeout_ms', 'max_bytes'].every(isConnected) && <span className="node-config-hint">Set a value here or connect a wire.</span>}
      {templateInput('url', 'URL', { inputMode: 'url', maxLength: 4096 })}
      {!isConnected('method') && <FallbackField label="Method"><AnimatedDropdown value={node.data?.method || 'GET'} options={['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'].map((value) => ({ value, label: value }))} onChange={(value) => update('method', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Request method" className="node-select" /></FallbackField>}
      {templateInput('headers', 'Headers (JSON)', { multiline: true, maxLength: 16384, placeholder: '{}' })}
      {templateInput('user_agent', 'User-Agent', { maxLength: 512, placeholder: 'Optional' })}
      {templateInput('body', 'Body', { multiline: true, maxLength: 8192 })}
      {!isConnected('timeout_ms') && <FallbackField label="Timeout (ms)"><NodeNumberInput min="1000" max="30000" value={node.data?.timeout_ms ?? 10000} onChange={(event) => update('timeout_ms', numericNodeInputValue(event.target.value, { min: 1000, max: 30000, fallback: 1000 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Request timeout in milliseconds" /></FallbackField>}
      {!isConnected('max_bytes') && <FallbackField label="Max response bytes"><NodeNumberInput min="1024" max="1048576" value={node.data?.max_bytes ?? 1048576} onChange={(event) => update('max_bytes', numericNodeInputValue(event.target.value, { min: 1024, max: 1048576, integer: true, fallback: 1024 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Maximum response bytes" /></FallbackField>}
      {canRetry && !isConnected('max_attempts') && <FallbackField label="Max attempts"><NodeNumberInput min="1" max="5" value={node.data?.max_attempts ?? 3} onChange={(event) => update('max_attempts', numericNodeInputValue(event.target.value, { min: 1, max: 5, integer: true, fallback: 1 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Maximum request attempts" /></FallbackField>}
      {canRetry && !isConnected('retry_delay_ms') && <FallbackField label="Base retry delay (ms)"><NodeNumberInput min="100" max="10000" value={node.data?.retry_delay_ms ?? 500} onChange={(event) => update('retry_delay_ms', numericNodeInputValue(event.target.value, { min: 100, max: 10000, integer: true, fallback: 100 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Base retry delay in milliseconds" /></FallbackField>}
      {canRetry && !isConnected('retry_non_idempotent') && <FallbackCheckbox label="Retry POST and other non-idempotent methods" checked={node.data?.retry_non_idempotent ?? false} onChange={(value) => update('retry_non_idempotent', value)} />}
    </div>;
  }
}
