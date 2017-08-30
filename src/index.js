fi = (function() {
  return {
    libraryMethod: function() {return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'},

    // fi.each(list, callback, [context])
    // fi.each([1, 2, 3], alert);
    // => alerts each number in turn and returns the original list
    // fi.each({one: 1, two: 2, three: 3}, alert);
    // => alerts each number value in turn and returns the original list

    each: function(list, callback) {
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          callback(list[i])
        }
      } else {
        for (const key in list) {
          callback(list[key])
        }
      }
      return list
    },
    // fi.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
    map: function(list, callback) {
      let mapped = []
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          let element = list[i];
          let modifiedElement = callback(element, i, list);
          mapped.push(modifiedElement);
        }
      } else {
        for (const key in list) {
          let value = list[key];
          let modifiedVal = callback(value);
          mapped.push(modifiedVal);
        }
      }
      return mapped;
    },

    //    Team Genius also did this to reconstruct a hash via map:
    //     map: function(list, callback) {

    //   if (Array.isArray(list)) {
    //     let mapped = []
    //     for (let i = 0; i < list.length; i++) {
    //       let element = list[i];
    //       let modifiedElement = callback(element, i, list);
    //       mapped.push(modifiedElement);
    //     }
    //     return mapped;
    //   } else {
    //     let newHash = {}
    //     for (const key in list) {
    //       let value = list[key];
    //       let modifiedVal = callback(value);
    //       // mapped.push(modifiedVal);
    //       newHash[key] = modifiedVal;
    //     }
    //     return newHash
    //   }

    // }

    // var sum = fi.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
    // => 6

    reduce: function (list, callback, memo) {
      for (let i = 0; i < list.length; i++) {
        if (memo === undefined) {
          memo = 0
          continue
        } else {
          memo = callback(memo, list[i])
        }
      }
      return memo
    },

    // var even = fi.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

    find: function (list, callback) {
      for (let i = 0; i < list.length; i++) {
        if (callback(list[i])) {
          return list[i]
        }
      }
    },

    filter: function (list, callback) {
      let returnable = []
      for (let i = 0; i < list.length; i++) {
        if (callback(list[i])) {
           returnable.push(list[i])
        }
      }
      return returnable
    },

    // fi.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
    // => [5, 4, 6, 3, 1, 2]


    // var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    // fi.sortBy(stooges, 'name');
    // => [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
    sortBy: function (list, callback) {
    if (typeof list[0] === 'number') {
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < list.length-1; i++) {
              if (callback(list[i]) > callback(list[i+1])) {
                  var temp = list[i];
                  list[i] = list[i+1];
                  list[i+1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);

    } else {
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < list.length-1; i++) {
              if (list[i][callback] > list[i+1][callback]) {
                  var temp = list[i];
                  list[i] = list[i+1];
                  list[i+1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);
    }
      return list
    },


    size: function(list){
      if (Array.isArray(list)) {
        return list.length
      } else {
        return Object.keys(list).length
      }
    },

    // fi.first([5, 4, 3, 2, 1]); => 5
    first: function(list, n=1) {
      return list.slice(0, n)
    },


    last: function(list, n=1) {
      return list.slice(-n)
    },


// fi.compact([0, 1, false, 2, '', 3]); => [1, 2, 3]
    compact: function(list) {
      let compacted = []
        for (var i = 0; i < list.length; i++) {
          if (list[i]) {compacted.push(list[i])}
        }
      return compacted
    },

  // fi.uniq([1, 2, 1, 4, 1, 3]); => [1, 2, 4, 3]
    uniq: function(list) {
      let uniqElements = []
      for (var i = 0; i < list.length; i++) {
        if (uniqElements.includes(list[i]) === false) {
          uniqElements.push(list[i])
        }
      }
      return uniqElements
    },

// var func = function(greeting){ return greeting + ': ' + this.name };
// func = fi.bind(func, {name: 'moe'}, 'hi');
// func();
  // => 'hi: moe'
    bind: function(func, object, arg) {
        object.func = func;
      return function(){return object.func(arg)};
    },

// fi.keys({one: 1, two: 2, three: 3}); => ["one", "two", "three"]

    keys: function(object) {
      let keys = []
        for (const key in object) {
          keys.push(key)
        }
          return keys
    },


// fi.values({one: 1, two: 2, three: 3}); => [1, 2, 3]
    values: function(object) {
      let values = []
        for (const key in object) {
          values.push(object[key])
        }
          return values
      },


// fi.functions(fi); => ["compact", "each", "filter", "find", "first", "functions", "last", "map", "reduce", "size", "sortBy"]

      functions: function(object) {
        let funcs = this.keys(object)
        let sortedfuncs = []
          for (let i = 0; i < funcs.length; i++) {
            if (typeof object[funcs[i]] === "function") {
              sortedfuncs.push(funcs[i])
            }
          }
        return sortedfuncs.sort()
      }
  }


})()















