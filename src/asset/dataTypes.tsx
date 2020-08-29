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

export function validate(obj: Person[]): Result<Person[]> {
  //id must be unique
  let allUniqueId = new Set(obj.map(x => x.id));
  if (allUniqueId.size !== obj.length) {
    return {
      ok: false,
      message: `obj.id must be unique number but found ${obj.length - new Set(obj.map(x => x.id)).size} duplicates`
    }
  }
  //gender should be valid
  if (obj.filter(x => ["male", "female"].includes(x.gender)).length !== obj.length) {
    return {
      ok: false,
      message: `invalid gender entry found valid entries should be male || female`
    }
  }

  //all parents id should have an person
  let allParentId = obj.map(x => x.parents).reduce((prev, curr) =>prev.concat(curr));
  if (!allParentId.some(r=> Array.from(allUniqueId).includes(r))) {
    return {
      ok: false,
      message: `invalid Parents id entry found`
    }
  }
  
  //parents should if 2 || 0
  if (obj.map(x => ([2, 0].includes(x.parents.length))).includes(false)) {
    return {
      ok: false,
      message: `parents should be 0 OR 2`
    }
  }

  return {
    ok: true,
    value: obj
  }
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