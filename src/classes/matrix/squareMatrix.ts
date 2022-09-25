import Matrix from "./matrix";

class SquareMatrix<Type> extends Matrix<Type> {
  public diagonal: number;

  constructor(diagonal: number) {
    super(diagonal, diagonal);

    this.diagonal = diagonal;
  }

  static fromVector<T>(v: T[]): SquareMatrix<T> {
    const diagonal = Math.sqrt(v.length);
    const matrix = new SquareMatrix<T>(diagonal);

    let i = 0;

    for (const item of matrix.iter()) {
      item.set(v[i++]);
    }

    return matrix;
  }
}

export default SquareMatrix;
