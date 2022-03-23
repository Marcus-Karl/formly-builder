
export enum DependencyType {
  AllOf = 'AllOf',
  AnyOf = 'AnyOf',
  OneOf = 'OneOf',
}

export type Dependency = {
  includeReferenceIds: string[];
  matchValue: string;
  _order: number;
  referenceId: string;
  type: DependencyType;
}
