// interface Product extends Partial<Category> {
//   productName: string;
// }
interface ICategoryObject {
  idx: string;
  category_name: string;
}
interface ISumString {
  prevString: string;
  nextString: string;
}
const sumStringAndRemoveBlank = ({ prevString, nextString }: ISumString) => {
  const result = `${prevString}${nextString}`;
  const processedResult = result.replace(/ /gi, '');

  return result;
};

sumStringAndRemoveBlank({ prevString: 'a', nextString: 'b' });

export type { ICategoryObject };
