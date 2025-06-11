import React from "react";

type FieldType = "text" | "email" | "password" | "textarea" | "select";

export interface Field {
  label: string;
  name: string;
  type?: FieldType;
  value?: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; 
}

interface CustomFormProps {
  fields: Field[];
  onChange: (name: string, value: string) => void;
}

export default function CustomForm({ fields, onChange }: CustomFormProps) {
  return (
    <form>
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              className="form-control"
              placeholder={field.placeholder || ""}
              value={field.value || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          ) : field.type === "select" ? (
            <select
              className="form-select"
              value={field.value || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            >
              <option value="">Chọn một mục</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              className="form-control"
              placeholder={field.placeholder || ""}
              value={field.value || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
    </form>
  );
}
