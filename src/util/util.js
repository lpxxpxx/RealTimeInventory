const util = {}
util.install = (Vue, options) => {
  Vue.prototype.$toThousands = (num) => {
    let x = (num + '').split('.'),
        res = (x[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    res += x[1] ? '.' + x[1] : '';
    return res;
  }
}

export {util}