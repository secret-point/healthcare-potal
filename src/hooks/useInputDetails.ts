import { useFormContext } from "react-hook-form";

export function useInputDetails({ fields }: { fields: string[] }) {
  const {
    formState: { errors, dirtyFields },
  } = useFormContext();
  const inputErrors = fields
    .map((field) => errors[field]?.message)
    .filter((error) => error);
  const editedFields = fields.filter((field) => dirtyFields[field]);
  return { inputErrors, editedFields };
}
