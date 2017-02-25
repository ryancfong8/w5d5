const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};



module.exports = Util;
