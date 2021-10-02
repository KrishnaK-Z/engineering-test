import { Person } from "shared/models/person"

// Sorted by field types.
export type FieldName = "first_name" | "last_name";

// Sorting logic.
export function sortItems(items: Person[], fieldName: FieldName, isAsecOrder: boolean) {
  const orderedList =  items?.sort((a,b) =>
    (a[fieldName] > b[fieldName]) ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0)
  ) || [];

  // Change sort order depending upon the flag.
  return isAsecOrder ? orderedList : orderedList.slice().reverse();
}
