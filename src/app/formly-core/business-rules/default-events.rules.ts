import { Engine } from 'json-rules-engine';

export const addDefaultEventHandler = (engine: Engine) => {
  engine.on('success', (event, almanac, ruleResult) => {
    if (event.type === 'successfulValueCollection'&& event.params?.paramKey && event.params?.factKey && (ruleResult.conditions as any)?.any) {
      const paramKey = event.params.paramKey;
      const factKey = event.params.factKey;
      const successConditions = (ruleResult.conditions as any).filter((c: any) => c.result);

      event.params = {};
      event.params[paramKey] = successConditions.map((sc: any) => sc[factKey]);
    }
  });
}
