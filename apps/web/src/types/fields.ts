export type Field = {
  id: string | null;
  value: string | File;
};

export type FieldMap = {
  [key: string]: Field;
};
