import { ConfigOption } from '@ngx-formly/core';

import { GenericSetupExtension } from './generic-setup.extention';

export const registerExtensions = () => {

  const extenstionConfig: ConfigOption = {
    extensions: [
      {
        name: 'generic-setup',
        extension: new GenericSetupExtension()
      }
    ],
  };

  return extenstionConfig;
}
