import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'booking-app/config/environment';
import { helper } from '@ember/component/helper';

import { eq } from '@ember/template';

export default class App extends Application {
  constructor(...args) {
    super(...args);

    const helperNamespace = {
      // Register the eq helper
      eq: helper(eq),
    };

    this.helperNamespace = helperNamespace;
  }
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
