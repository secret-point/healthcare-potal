import { FC } from "react";

import Dropdown from "./Dropdown";
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
          options={field.options || []}
          variant={field.variant || variant || "standard"}
          placeholder={field.placeholder}
          multiple={field.type === FieldType.MULTI_SELECT}
        />
      );

    case FieldType.RADIO_GROUP:
      return null;

    case FieldType.MULTI_INSTANCE:
      return null;

    case FieldType.SINGLE_INSTANCE:
      return null;

    case FieldType.TEXT:
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
            shrink: field.type === FieldType.DATE,
          }}
        />
      );
  }
};

export default FieldComponent;
