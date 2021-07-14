import { FC } from "react";

import Dropdown from "./Dropdown";
import TextInput from "./TextInput";
import { FieldType, TCustomField } from "../types/general";

interface FieldComponentProps {
  field: TCustomField;
}

const FieldComponent: FC<FieldComponentProps> = ({ field }) => {
  switch (field.type) {
    case FieldType.SELECT:
      return (
        <Dropdown
          name={field.path}
          label={field.label}
          options={field.options || []}
        />
      );
    default:
      return (
        <TextInput name={field.path} label={field.label} variant="standard" />
      );
  }
};

export default FieldComponent;
