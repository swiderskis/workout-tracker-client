interface EnumObject {
  key: number;
  value: string;
}

// Receives an id and returns the corresponding name in enum
function useNameFromEnum(id: number, enumObject: EnumObject[]) {
  let name = "";

  enumObject.findIndex((enumObject) => {
    if (enumObject.key === id) name = enumObject.value;
  });

  return name;
}

export default useNameFromEnum;
