export const swapKeysAndValues = (obj) => {
  const swappedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      swappedObj[value] = key;
    }
  }
  return swappedObj;
};

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const convertWeight = (weight, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return weight;
  return toUnit === "kg"
    ? Math.round(weight / 2.20462)
    : Math.round(weight * 2.20462);
};

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(func);
      dispatch(func(...args));
    }, wait);
  };
}
