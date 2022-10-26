import { SelectionOptionType, FormBuilderSelectionOption } from '../models/builder-form-state';

export * as BuilderFunctions from './state-functions';
export * as FunctionHelpers from './state-functions';
export * from './model-to-json-schema-builder';


const buildObject = (parent: FormBuilderSelectionOption | null, item: FormBuilderSelectionOption, type: SelectionOptionType): FormBuilderSelectionOption[] => {
  const result = item.options?.map(x => buildObject(item, x, type)) ?? [] as FormBuilderSelectionOption[][];
  const itemsToReturn: FormBuilderSelectionOption[] = ([] as FormBuilderSelectionOption[]).concat(...result);

  if (item.type === type) {
    itemsToReturn.push({
      ...item,
      category: item.category ?? parent?.value
    });
  }

  return itemsToReturn;
}

export const buildSelectionOptions = (item: FormBuilderSelectionOption, type: SelectionOptionType): FormBuilderSelectionOption[] => {
  const options = buildObject(null, item, type);

  return options.filter(x => x.value);
}
