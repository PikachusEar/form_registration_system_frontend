import React from 'react';

function FormField({label, value, onChange, placeholder, name, error, type = "text", options}) {

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-semibold break-words whitespace-normal leading-snug">{label}</span>
            </label>
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`select select-bordered w-full ${error ? 'select-error' : value ? 'select-success' : ''}`}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`input input-bordered w-full ${error ? 'input-error' : value ? 'input-success' : ''}`}
                />
            )}
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error break-words whitespace-normal leading-snug">{error}</span>
                </label>
            )}
        </div>
    );
}
export default FormField;