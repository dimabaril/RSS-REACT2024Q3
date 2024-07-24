export const createBlobURL = (content: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  return URL.createObjectURL(blob);
};
