export const registry = {
  "description": "Formats an ISO date or Unix millisecond timestamp using a locale, time zone, and date/time styles.",
  "type": "data_format_time",
  "category": "Values & Data",
  "label": "Format Date & Time",
  "color": "#06b6d4",
  "inputs": [
    {
      "id": "value",
      "label": "Date / timestamp",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "locale",
      "label": "Locale",
      "type": "string",
      "defaultValue": "en-US"
    },
    {
      "id": "timeZone",
      "label": "Time zone",
      "type": "string",
      "defaultValue": "UTC"
    },
    {
      "id": "dateStyle",
      "label": "Date style",
      "type": "string",
      "defaultValue": "medium"
    },
    {
      "id": "timeStyle",
      "label": "Time style",
      "type": "string",
      "defaultValue": "short"
    }
  ],
  "outputs": [
    {
      "id": "text",
      "label": "Formatted time",
      "type": "string"
    },
    {
      "id": "valid",
      "label": "Valid",
      "type": "boolean"
    }
  ],
  ui
};

function ui({
  node,
  AnimatedDropdown,
  update
}) {
  const styleOptions = [{ value: 'none', label: 'None' }, { value: 'short', label: 'Short' }, { value: 'medium', label: 'Medium' }, { value: 'long', label: 'Long' }, { value: 'full', label: 'Full' }];
  return <div className="node-config node-config-stack">
    <label className="math-precision"><span>Locale</span><input value={node.data?.locale ?? 'en-US'} onChange={(event) => update('locale', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="en-US" /></label>
    <label className="math-precision"><span>Time zone</span><input value={node.data?.timeZone ?? 'UTC'} onChange={(event) => update('timeZone', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="America/New_York" /></label>
    <div className="node-config"><AnimatedDropdown value={node.data?.dateStyle ?? 'medium'} options={styleOptions} onChange={(value) => update('dateStyle', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Date style" className="node-select" /><AnimatedDropdown value={node.data?.timeStyle ?? 'short'} options={styleOptions} onChange={(value) => update('timeStyle', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Time style" className="node-select" /></div>
  </div>;
}
