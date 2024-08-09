export const concertObjectToCsv = <T extends object>(array: T[]) => {
  if (!array.length) return "";

  const header = Object.keys(array[0]).join(",");

  const rows = array.map((row) => {
    return Object.values(row)
      .map((value) => {
        if (Array.isArray(value)) {
          return value.join('", "');
        }
        return value.replaceAll(",", '", "');
      })
      .join(",");
  });

  return [header, ...rows].join("\n");
};
