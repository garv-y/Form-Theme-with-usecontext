import React, { useEffect, useState } from "react";
import FieldBuilder from "./FieldBuilder";
import FieldRenderer from "./FieldRenderer";
import type { FieldConfig, FieldType } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface FieldItem {
  id: number;
  config: FieldConfig;
}

const FormBuilder: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [formTitle, setFormTitle] = useState("My Custom Form");
  const [fields, setFields] = useState<FieldItem[]>([]);
  const [formResponses, setFormResponses] = useState<{ [key: number]: any }>(
    {}
  );
  const [submittedData, setSubmittedData] = useState<{
    [key: string]: any;
  } | null>(null);
  const [useShortForm, setUseShortForm] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  const addField = (type: FieldType) => {
    const id = Date.now();
    const newField: FieldItem = {
      id,
      config: {
        id: id.toString(),
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        options: ["dropdown", "tags", "checkboxes", "multipleChoice"].includes(
          type
        )
          ? [{ text: "Option 1" }, { text: "Option 2" }]
          : undefined,
      },
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (id: number, config: FieldConfig) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, config } : f)));
  };

  const removeField = (id: number) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleResponseChange = (id: number, value: any) => {
    setFormResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result: { [key: string]: any } = {};
    fields.forEach((field) => {
      if (!useShortForm || field.config.displayOnShortForm) {
        const value = formResponses[field.id];
        result[field.config.label || `Field ${field.id}`] = value;
      }
    });
    setSubmittedData(result);
    localStorage.setItem("submittedData", JSON.stringify(result));
  };

  return (
    <div className="d-flex">
      <div className="container mt-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Form Builder</h3>
          <button
            className={`btn ${
              theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            } mb-2`}
            onClick={toggleTheme}
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

        <div className="mb-4">
          <label className="form-label">Form Title</label>
          <input
            type="text"
            className="form-control"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 border rounded p-3 dark-bg-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>
                Field #{index + 1} - {field.config.type}
              </h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeField(field.id)}
              >
                Remove
              </button>
            </div>
            <FieldBuilder
              config={field.config}
              onChange={(config) => updateField(field.id, config)}
            />
          </div>
        ))}

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="shortFormToggle"
            checked={useShortForm}
            onChange={(e) => setUseShortForm(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="shortFormToggle">
            Show Short Form Only
          </label>
        </div>

        <div className="p-4 border rounded shadow-sm dark-bg-card form-preview">
          <h4 className="mb-3">Live Preview</h4>
          <h5>{formTitle}</h5>
          <form onSubmit={handleSubmit}>
            {fields
              .filter((f) => !useShortForm || f.config.displayOnShortForm)
              .map((f) => (
                <FieldRenderer
                  key={f.id}
                  field={f.config}
                  value={formResponses[f.id]}
                  onChange={(val: any) => handleResponseChange(f.id, val)}
                  darkMode={theme === "dark"}
                />
              ))}
            <button
              type="submit"
              className={`btn mt-3 ${
                theme === "dark"
                  ? "btn-success text-white"
                  : "btn-outline-success"
              }`}
            >
              Submit
            </button>
          </form>
        </div>

        {submittedData && (
          <div className="mt-4">
            <h5>Submitted Data:</h5>
            <pre className="p-3 border rounded dark-bg-card">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div
        className="toolbox-sidebar border-start p-3 dark-bg-card form-preview"
        style={{ width: "250px" }}
      >
        <h5 className="mb-3 text-muted">Toolbox</h5>
        <ul className="list-unstyled">
          {[
            "header",
            "label",
            "paragraph",
            "linebreak",
            "dropdown",
            "tags",
            "checkboxes",
            "multipleChoice",
            "text",
            "number",
          ].map((type) => (
            <li key={type}>
              <button
                className="btn w-100 mb-2 text-start"
                onClick={() => addField(type as FieldType)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormBuilder;
