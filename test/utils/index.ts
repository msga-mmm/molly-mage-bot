import { Position } from "classes";

export function areEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length != array2.length) {
    return false;
  }

  // Array pointer
  if (array1 == array2) {
    return true;
  }

  const s1 = new Set<T>();
  const s2 = new Set<T>();

  for (const value of array1) {
    s1.add(value);
  }

  for (const value of array2) {
    s2.add(value);
  }

  for (const value of array1) {
    if (!s2.has(value)) {
      return false;
    }
  }

  for (const value of array2) {
    if (!s1.has(value)) {
      return false;
    }
  }

  return true;
}

export function areEqualPositions(array1: Position[], array2: Position[]) {
  return areEqual(
    array1.map((v) => v.hash()),
    array2.map((v) => v.hash())
  );
}

export function areEqualInOrder<T>(array1: T[], array2: T[]): boolean {
  if (array1.length != array2.length) {
    return false;
  }

  // Array pointer
  if (array1 == array2) {
    return true;
  }

  for (const v1 of array1) {
    for (const v2 of array2) {
      if (v1 != v2) {
        return false;
      }
    }
  }

  return true;
}
