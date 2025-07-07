import React from "react";

export interface DropdownOption {
  text: string;
  value?: string;
}

export interface DropdownConfig {
  label?: string;
  required?: boolean;
  displayOnShortForm?: boolean;
  options?: DropdownOption[];
}

interface Props {
  config: DropdownConfig;
  onChange: (updated: DropdownConfig) => void;
}

const DropdownBuilder: React.FC<Props> = ({ config, onChange }) => {
  const updateOption = (
    index: number,
    key: "text" | "value",
    value: string
  ) => {
    const newOptions = [...(config.options || [])];
    newOptions[index] = {
      ...newOptions[index],
      [key]: value,
    };
    onChange({ ...config, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(config.options || []), { text: "", value: "" }];
    onChange({ ...config, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(config.options || [])];
    newOptions.splice(index, 1);
    onChange({ ...config, options: newOptions });
  };

  return (
    <div>
      <div className="mb-2">
        <label className="form-label">Label</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter label"
          value={config.label || ""}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
        />
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="requiredCheck"
          checked={config.required || false}
          onChange={(e) => onChange({ ...config, required: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="requiredCheck">
          Required
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="shortFormCheck"
          checked={config.displayOnShortForm || false}
          onChange={(e) =>
            onChange({ ...config, displayOnShortForm: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="shortFormCheck">
          Display on Short Form
        </label>
      </div>
      <h6>Options:</h6>
      {(config.options || []).map((opt, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Text"
            value={opt.text}
            onChange={(e) => updateOption(index, "text", e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Value"
            value={opt.value || ""}
            onChange={(e) => updateOption(index, "value", e.target.value)}
          />
          <button
            className="btn btn-outline-danger"
            onClick={() => removeOption(index)}
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-sm btn-outline-primary"
        type="button"
        onClick={addOption}
      >
        Add Option
      </button>
    </div>
  );
};

export default DropdownBuilder;
