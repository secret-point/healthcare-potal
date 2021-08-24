import { FC } from "react";

import Dropdown from "./Dropdown";
import RadioField from "./RadioField";
import SingleInstance from "./SingleInstance";
import MultiInstance from "./MultiInstance";
import TextInput from "./TextInput";
import { FieldType, TCustomField } from "../types/general";

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
        />
      );

    case FieldType.RADIO_GROUP:
      return (
        <RadioField
          layout={{ xs: 12 }}
          name={field.path}
          label={field.label}
          required={field.required}
          options={field.options || []}
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
          required={field.required}
          addButton={field.addButton}
          properties={field.properties || []}
        />
      );

    case FieldType.TEXT:
    case FieldType.DATE:
    default:
      return (
        <TextInput
          name={field.path}
          label={field.label}
          variant={field.variant || variant || "standard"}
          required={field.required}
          placeholder={field.placeholder}
          type={field.type === FieldType.DATE ? "date" : "text"}
          InputLabelProps={{
            shrink: field.shrink || false || field.type === FieldType.DATE,
          }}
        />
      );
  }
};

export default FieldComponent;
