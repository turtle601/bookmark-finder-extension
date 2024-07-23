export const getCheckedCategory = (
  categoriesElement: (HTMLInputElement | null)[],
) => {
  return categoriesElement
    .map((element) => {
      return element?.value;
    })
    .filter((v) => v !== undefined);
};
