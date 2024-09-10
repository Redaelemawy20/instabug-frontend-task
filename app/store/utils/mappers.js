import store from '@Store/index';
import { computed } from 'vue';

const mapState = moduleName => {
  const module = store.state[moduleName];

  return Object.fromEntries(Object.keys(module).map(key => [key, computed(() => module[key])]));
};

const mapActions = moduleName => {
  const module = store._modulesNamespaceMap[`${moduleName}/`];
  const actions = module._rawModule.actions;

  return Object.fromEntries(Object.keys(actions).map(action => [
    action,
    value => module.context.dispatch(action, value),
  ]));
};

export { mapState, mapActions };
