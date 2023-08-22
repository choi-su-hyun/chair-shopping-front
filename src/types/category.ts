type Category = string;

// interface Product extends Partial<Category> {
//   productName: string;
// }

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

type CategoryName = string;

export type { Category };
