// src/components/FieldBuilder.tsx
import React from "react";
import type { FieldConfig } from "../types/types";

interface Props {
  config: FieldConfig;
  onChange: (updated: FieldConfig) => void;
}

const FieldBuilder: React.FC<Props> = ({ config, onChange }) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, label: e.target.value });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, required: e.target.checked });
  };

  const handleShortFormToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, displayOnShortForm: e.target.checked });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!config.options) return;
    const newOptions = [...config.options];
    if (typeof newOptions[index] === "string") {
      newOptions[index] = { text: value };
    } else if (typeof newOptions[index] === "object") {
      newOptions[index] = { ...newOptions[index], text: value };
    }
    onChange({ ...config, options: newOptions });
  };

  const addOption = () => {
    const newOption = { text: `Option ${(config.options?.length ?? 0) + 1}` };
    onChange({
      ...config,
      options: [...(config.options || []), newOption],
    });
  };

  const removeOption = (index: number) => {
    if (!config.options) return;
    const newOptions = config.options.filter((_, i) => i !== index);
    onChange({ ...config, options: newOptions });
  };

  return (
    <div>
      {/* Label input for all field types */}
      {[
        "header",
        "label",
        "paragraph",
        "dropdown",
        "tags",
        "checkboxes",
        "multipleChoice",
        "text",
        "number",
      ].includes(config.type) && (
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            type="text"
            className="form-control"
            value={config.label || ""}
            onChange={handleLabelChange}
          />
        </div>
      )}

      {/* Required checkbox */}
      {["dropdown", "text", "number"].includes(config.type) && (
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id={`required-${config.id}`}
            checked={!!config.required}
            onChange={handleRequiredChange}
          />
          <label className="form-check-label" htmlFor={`required-${config.id}`}>
            Required
          </label>
        </div>
      )}

      {/* Show on Short Form */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id={`shortform-${config.id}`}
          checked={!!config.displayOnShortForm}
          onChange={handleShortFormToggle}
        />
        <label className="form-check-label" htmlFor={`shortform-${config.id}`}>
          Show on Short Form
        </label>
      </div>

      {/* Option List Editor */}
      {["dropdown", "tags", "checkboxes", "multipleChoice"].includes(
        config.type
      ) && (
        <div className="mb-3">
          <label className="form-label">Options</label>
          {config.options?.map((opt, idx) => {
            const optText = typeof opt === "string" ? opt : opt.text;
            return (
              <div key={idx} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={optText}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => removeOption(idx)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={addOption}
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldBuilder;
