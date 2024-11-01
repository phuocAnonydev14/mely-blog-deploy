export function cleanObject<T>(obj: T) {
  const cleanObj = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        const cleanedArray = value.filter((el) => el !== null && el !== undefined && el !== '') as any;

        if (cleanedArray.length > 0) {
          cleanObj[key] = cleanedArray;
        } else delete obj[key];
      } else if (value !== null && value !== undefined && value !== '' && !Array.isArray(value)) {
        cleanObj[key] = value;
      } else if (!value) delete obj[key];
    }
  }

  return cleanObj;
}
