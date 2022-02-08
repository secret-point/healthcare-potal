import { FC } from "react";

import { FieldType, TCustomField } from "src/types/general";

import Dropdown from "./Dropdown";
import RadioField from "./RadioField";
import SingleInstance from "./SingleInstance";
import MultiInstance from "./MultiInstance";
import TextInput from "./TextInput";

interface FieldComponentProps {
  field: TCustomField;
  variant?: "standard" | "outlined";
}

const FieldComponent: FC<FieldComponentProps> = ({ field, variant }) => {
  switch (field.type) {
    case FieldType.SELECT:
    case FieldType.MULTI_SELECT:
      return (
        <Dropdown
          name={field.path}
          label={field.label}
          required={field.required}
          options={field.options || []}
          variant={field.variant || variant || "standard"}
          placeholder={field.placeholder}
          multiple={field.type === FieldType.MULTI_SELECT}
          defaultValue={field.type === FieldType.MULTI_SELECT ? [] : ""}
          validator={{ required: field.required }}
        />
      );

    case FieldType.RADIO_GROUP:
      return (
        <RadioField
          layout={{ xs: 12 }}
          name={field.path}
          label={field.label}
          required={field.required}
          isTopLabel={field.isTopLabel}
          options={field.options || []}
          validator={{ required: field.required }}
        />
      );

    case FieldType.SINGLE_INSTANCE:
      return (
        <SingleInstance
          label={field.label}
          path={field.path}
          required={field.required}
          variant={variant}
          properties={field.properties || []}
        />
      );

    case FieldType.MULTI_INSTANCE:
      return (
        <MultiInstance
          label={field.label}
          path={field.path}
          variant={variant}
          limit={field.limit}
          required={field.required}
          addButton={field.addButton}
          deleteButton={field.deleteButton}
          instanceLabel={field.instanceLabel}
          properties={field.properties || []}
        />
      );

    case FieldType.TEXT:
    case FieldType.DATE:
    case FieldType.PASSWORD:
    case FieldType.NUMBER:
    default:
      return (
        <TextInput
          disabled={field.disabled}
          label={field.label}
          name={field.path}
          isTopLabel={field.isTopLabel}
          variant={field.variant || variant || "standard"}
          required={field.required}
          placeholder={field.placeholder}
          type={
            field.type === FieldType.DATE
              ? "date"
              : field.type === FieldType.PASSWORD
              ? "password"
              : field.type === FieldType.NUMBER
              ? "number"
              : "text"
          }
          InputLabelProps={{
            shrink: field.shrink || false || field.type === FieldType.DATE,
          }}
          validator={field.validator || { required: field.required }}
        />
      );
  }
};

export default FieldComponent;
