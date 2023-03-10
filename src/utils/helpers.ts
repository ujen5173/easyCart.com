export const textResizer = (text: string, size = 10): string => {
  return text.length > size ? text.slice(0, size) + "..." : text;
};

export const capitaize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// type ExtendedElement = HTMLInputElement & {
//   target: {
//     name: string;
//     value: string;
//   };
// };

export const handler = (
  e: HTMLInputElement,
  state: object,
  setState: React.Dispatch<React.SetStateAction<unknown>>
) => {
  setState({ ...state, [e.target.name]: e.target.value });
};
