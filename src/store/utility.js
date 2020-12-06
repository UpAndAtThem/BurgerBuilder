export const updateObject = (original, updatedProps) => {
  return {
    ...original,
    ...updatedProps
  };
}