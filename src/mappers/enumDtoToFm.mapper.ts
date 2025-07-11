export const enumDtoToFmMapper = <E extends object>(dto: string, enumType: E, enumName: string): E[keyof E] => {
  const enumValues = Object.values(enumType) as (keyof E)[];
  const foundKeyIndex = enumValues.findIndex((key) => key === dto.replaceAll(" ", "_"));

  if (foundKeyIndex !== -1) {
    return enumType[enumValues[foundKeyIndex]];
  }

  if (dto === "Unassigned") {
    return enumType[enumValues[0]];
  }

  throw new Error(`Invalid dto name [${dto.replaceAll(" ", "_")}]: can't found in enum ${enumName}`);
};
