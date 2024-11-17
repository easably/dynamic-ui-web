// interface Field {
//   collection: string;
//   field: string;
//   meta: Meta;
// }

// type Meta =
//   | {
//       field: string;
//       interface: ViewInterface.input;
//       options: InputOptions;
//     }
//   | {
//       field: string;
//       interface: ViewInterface.select;
//       options: SelectOptions;
//     }
//     | {
//       field: string;
//       interface: ViewInterface.button;
//       options: ButtonOptions;
//     };

// enum ViewInterface {
//   input = "input",
//   select = "select",
//   button = 'Button'
// }

// type InputOptions = {
//   value: string;
//   placeholder: string;
// };

// type SelectOptions = {
//   value: string;
//   defaultSelected: string;
//   items: { text: string; value: string }[];
// };

// type ButtonOptions = {
//   title: string;
// };

// // Usage examples
// const f: Field = {
//   collection: "",
//   field: "",
//   meta: {
//     field: "",
//     interface: ViewInterface.select,
//     options: {
//       value: "",
//       defaultSelected: "",
//       items: [{ text: "Option 1", value: "1" }],
//     },
//   },
// };

// const select: Field = {
//   collection: "",
//   field: "",
//   meta: {
//     field: "",
//     interface: ViewInterface.input,
//     options: {
//       value: "",
//       placeholder: "",
//     },
//   },
// };

// const button: Field = {
//   collection: "",
//   field: "",
//   meta: {
//     field: "",
//     interface: ViewInterface.button,
//     options: {
//       title: "asd"
//     },
//   },
// };