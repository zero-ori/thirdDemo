import cp from './cp';
import HelloWorld from './HelloWorld';

const comps = {
  cp, HelloWorld
};

export function install(Vue) {
  Object.keys(comps).forEach((key) => {
    Vue.component(key, comps[key]);
  });
}
