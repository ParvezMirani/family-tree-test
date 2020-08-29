export type Result<T> =
  | { ok: true, value: T }
  | { ok: false, message: string }

export interface Person {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

//extend the person class adding spouse link and valid Child (only once that has id's)
export interface ExtendedPerson extends Person {
  spouse?: Person;
  children1?: ExtendedPerson[];
}

export type NodeComponentProp = {
  node: ExtendedPerson
}

export interface IChartProps {
  tree: Person[];
  NodeComponent: React.FunctionComponent<NodeComponentProp>;
}