import React from "react";
import type { FieldConfig } from "../types/types";

interface Props {
  field: FieldConfig;
  value: any;
  onChange: (val: any) => void;
  darkMode?: boolean;
}

const FieldRenderer: React.FC<Props> = ({ field, value, onChange }) => {
  const { label, type, required, options } = field;

  switch (type) {
    case "header":
      return (
        <div className="mb-3">
          <h4
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange(e.currentTarget.textContent || "")}
          >
            {value || label}
          </h4>
          <input type="hidden" value={value || label} />
        </div>
      );

    case "label":
      return (
        <div className="mb-3">
          <label
            className="form-label fw-bold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange(e.currentTarget.textContent || "")}
          >
            {value || label}
          </label>
          <input type="hidden" value={value || label} />
        </div>
      );

    case "paragraph":
      return (
        <div className="mb-3">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange(e.currentTarget.textContent || "")}
          >
            {value || label}
          </p>
          <input type="hidden" value={value || label} />
        </div>
      );

    case "linebreak":
      return <hr />;

    case "dropdown":
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <select
            className="form-select"
            required={required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">-- Select --</option>
            {options?.map((opt, idx) => {
              const optValue =
                typeof opt === "string" ? opt : opt.value ?? opt.text;
              const optText = typeof opt === "string" ? opt : opt.text;
              return (
                <option key={idx} value={optValue}>
                  {optText}
                </option>
              );
            })}
          </select>
        </div>
      );

    case "tags":
      return (
        <div className="mb-3">
          <label className="form-label d-block">{label}</label>
          <div className="d-flex flex-wrap gap-2">
            {options?.map((opt, idx) => {
              const optText = typeof opt === "string" ? opt : opt.text;
              const selected = Array.isArray(value) && value.includes(optText);
              return (
                <span
                  key={idx}
                  className={`badge rounded-pill px-3 py-2 ${
                    selected ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const newVal = Array.isArray(value) ? [...value] : [];
                    if (selected) {
                      onChange(newVal.filter((v) => v !== optText));
                    } else {
                      onChange([...newVal, optText]);
                    }
                  }}
                >
                  {optText}
                </span>
              );
            })}
          </div>
        </div>
      );

    case "checkboxes":
      return (
        <div className="mb-3">
          <label className="form-label d-block">{label}</label>
          {options?.map((opt, idx) => {
            const optText = typeof opt === "string" ? opt : opt.text;
            return (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(optText)}
                  onChange={(e) => {
                    const newVal = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      newVal.push(optText);
                    } else {
                      const i = newVal.indexOf(optText);
                      if (i !== -1) newVal.splice(i, 1);
                    }
                    onChange(newVal);
                  }}
                />
                <label className="form-check-label">{optText}</label>
              </div>
            );
          })}
        </div>
      );

    case "multipleChoice":
      return (
        <div className="mb-3">
          <label className="form-label d-block">{label}</label>
          {options?.map((opt, idx) => {
            const optText = typeof opt === "string" ? opt : opt.text;
            return (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={field.id}
                  value={optText}
                  checked={value === optText}
                  onChange={() => onChange(optText)}
                />
                <label className="form-check-label">{optText}</label>
              </div>
            );
          })}
        </div>
      );

    case "text":
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            type="text"
            className="form-control"
            required={required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case "number":
      return (
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            type="number"
            className="form-control"
            required={required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    default:
      return null;
  }
};

export default FieldRenderer;
