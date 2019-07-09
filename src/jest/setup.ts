import '@babel/polyfill';

const g = global as any;
if (typeof window !== 'undefined') {
  g.window.resizeTo = function(width: any, height: any) {
    g.window.innerWidth = width || g.window.innerWidth;
    g.window.innerHeight = height || g.window.innerHeight;
    g.window.dispatchEvent(new Event('resize'));
  };
  g.window.scrollTo = function() {};
}

// The built-in requestAnimationFrame and
// cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
g.requestAnimationFrame = function(cb: Function) {
  return setTimeout(cb, 0);
};

g.cancelAnimationFrame = function(timer: number) {
  return clearTimeout(timer);
};
