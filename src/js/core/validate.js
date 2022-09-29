export const isCalledByNew = (newTarget, target = "instance") => {
  if (!newTarget)
    throw new SyntaxError(`${target} is must be called with 'new'`);
  return true;
};

export const isValidTypeOfObject = (obj, validObjectType) => {
  if (typeof obj === "object" && typeof validObjectType === "object") {
    const isValid = Object.entries(validObjectType).every(([key, type]) => {
      if (!obj.hasOwnProperty(key)) return false;
      return type === "array"
        ? Array.isArray(obj[key])
        : typeof obj[key] === type;
    });

    if (!isValid) throw new TypeError("property is not valid");

    return obj;
  }
  throw new SyntaxError(`param's type is not 'object'`);
};
