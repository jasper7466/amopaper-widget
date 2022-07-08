/**
 * Выполняет склонение в соответствии с количеством единиц
 * @param value количество
 * @param onePiece значение для одной единицы
 * @param twoPieces значение для двух единиц
 * @param fewPieces значение для нескольких единиц
 * @returns значение с правильным склонением
 */
export const declension = function (
  value: number,
  onePiece: string,
  twoPieces: string,
  fewPieces: string
): string {
  value = Math.abs(value) % 100;

  if (value > 10 && value < 20) {
    return fewPieces;
  }

  value %= 10;

  if (value > 1 && value < 5) {
    return twoPieces;
  }

  if (value === 1) {
    return onePiece;
  }

  return fewPieces;
};
