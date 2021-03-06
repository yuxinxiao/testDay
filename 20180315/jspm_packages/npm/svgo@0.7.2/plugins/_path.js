/* */ 
(function(process) {
  'use strict';
  var regPathInstructions = /([MmLlHhVvCcSsQqTtAaZz])\s*/,
      regPathData = /[-+]?(?:\d*\.\d+|\d+\.?)([eE][-+]?\d+)?/g,
      regNumericValues = /[-+]?(\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/,
      transform2js = require('./_transforms').transform2js,
      transformsMultiply = require('./_transforms').transformsMultiply,
      transformArc = require('./_transforms').transformArc,
      collections = require('./_collections'),
      referencesProps = collections.referencesProps,
      defaultStrokeWidth = collections.attrsGroupsDefaults.presentation['stroke-width'],
      cleanupOutData = require('../lib/svgo/tools').cleanupOutData,
      removeLeadingZero = require('../lib/svgo/tools').removeLeadingZero,
      prevCtrlPoint;
  exports.path2js = function(path) {
    if (path.pathJS)
      return path.pathJS;
    var paramsLength = {
      H: 1,
      V: 1,
      M: 2,
      L: 2,
      T: 2,
      Q: 4,
      S: 4,
      C: 6,
      A: 7,
      h: 1,
      v: 1,
      m: 2,
      l: 2,
      t: 2,
      q: 4,
      s: 4,
      c: 6,
      a: 7
    },
        pathData = [],
        instruction,
        startMoveto = false;
    path.attr('d').value.split(regPathInstructions).forEach(function(data) {
      if (!data)
        return;
      if (!startMoveto) {
        if (data == 'M' || data == 'm') {
          startMoveto = true;
        } else
          return;
      }
      if (regPathInstructions.test(data)) {
        instruction = data;
        if (instruction == 'Z' || instruction == 'z') {
          pathData.push({instruction: 'z'});
        }
      } else {
        data = data.match(regPathData);
        if (!data)
          return;
        data = data.map(Number);
        if (instruction == 'M' || instruction == 'm') {
          pathData.push({
            instruction: pathData.length == 0 ? 'M' : instruction,
            data: data.splice(0, 2)
          });
          instruction = instruction == 'M' ? 'L' : 'l';
        }
        for (var pair = paramsLength[instruction]; data.length; ) {
          pathData.push({
            instruction: instruction,
            data: data.splice(0, pair)
          });
        }
      }
    });
    if (pathData.length && pathData[0].instruction == 'm') {
      pathData[0].instruction = 'M';
    }
    path.pathJS = pathData;
    return pathData;
  };
  var relative2absolute = exports.relative2absolute = function(data) {
    var currentPoint = [0, 0],
        subpathPoint = [0, 0],
        i;
    data = data.map(function(item) {
      var instruction = item.instruction,
          itemData = item.data && item.data.slice();
      if (instruction == 'M') {
        set(currentPoint, itemData);
        set(subpathPoint, itemData);
      } else if ('mlcsqt'.indexOf(instruction) > -1) {
        for (i = 0; i < itemData.length; i++) {
          itemData[i] += currentPoint[i % 2];
        }
        set(currentPoint, itemData);
        if (instruction == 'm') {
          set(subpathPoint, itemData);
        }
      } else if (instruction == 'a') {
        itemData[5] += currentPoint[0];
        itemData[6] += currentPoint[1];
        set(currentPoint, itemData);
      } else if (instruction == 'h') {
        itemData[0] += currentPoint[0];
        currentPoint[0] = itemData[0];
      } else if (instruction == 'v') {
        itemData[0] += currentPoint[1];
        currentPoint[1] = itemData[0];
      } else if ('MZLCSQTA'.indexOf(instruction) > -1) {
        set(currentPoint, itemData);
      } else if (instruction == 'H') {
        currentPoint[0] = itemData[0];
      } else if (instruction == 'V') {
        currentPoint[1] = itemData[0];
      } else if (instruction == 'z') {
        set(currentPoint, subpathPoint);
      }
      return instruction == 'z' ? {instruction: 'z'} : {
        instruction: instruction.toUpperCase(),
        data: itemData
      };
    });
    return data;
  };
  exports.applyTransforms = function(elem, path, params) {
    if (!elem.hasAttr('transform') || !elem.attr('transform').value || elem.someAttr(function(attr) {
      return ~referencesProps.indexOf(attr.name) && ~attr.value.indexOf('url(');
    }))
      return path;
    var matrix = transformsMultiply(transform2js(elem.attr('transform').value)),
        stroke = elem.computedAttr('stroke'),
        id = elem.computedAttr('id'),
        transformPrecision = params.transformPrecision,
        newPoint,
        scale;
    if (stroke && stroke != 'none') {
      if (!params.applyTransformsStroked || (matrix.data[0] != matrix.data[3] || matrix.data[1] != -matrix.data[2]) && (matrix.data[0] != -matrix.data[3] || matrix.data[1] != matrix.data[2]))
        return path;
      if (id) {
        var idElem = elem,
            hasStrokeWidth = false;
        do {
          if (idElem.hasAttr('stroke-width'))
            hasStrokeWidth = true;
        } while (!idElem.hasAttr('id', id) && !hasStrokeWidth && (idElem = idElem.parentNode));
        if (!hasStrokeWidth)
          return path;
      }
      scale = +Math.sqrt(matrix.data[0] * matrix.data[0] + matrix.data[1] * matrix.data[1]).toFixed(transformPrecision);
      if (scale !== 1) {
        var strokeWidth = elem.computedAttr('stroke-width') || defaultStrokeWidth;
        if (elem.hasAttr('stroke-width')) {
          elem.attrs['stroke-width'].value = elem.attrs['stroke-width'].value.trim().replace(regNumericValues, function(num) {
            return removeLeadingZero(num * scale);
          });
        } else {
          elem.addAttr({
            name: 'stroke-width',
            prefix: '',
            local: 'stroke-width',
            value: strokeWidth.replace(regNumericValues, function(num) {
              return removeLeadingZero(num * scale);
            })
          });
        }
      }
    } else if (id) {
      return path;
    }
    path.forEach(function(pathItem) {
      if (pathItem.data) {
        if (pathItem.instruction === 'h') {
          pathItem.instruction = 'l';
          pathItem.data[1] = 0;
        } else if (pathItem.instruction === 'v') {
          pathItem.instruction = 'l';
          pathItem.data[1] = pathItem.data[0];
          pathItem.data[0] = 0;
        }
        if (pathItem.instruction === 'M' && (matrix.data[4] !== 0 || matrix.data[5] !== 0)) {
          newPoint = transformPoint(matrix.data, pathItem.data[0], pathItem.data[1]);
          set(pathItem.data, newPoint);
          set(pathItem.coords, newPoint);
          matrix.data[4] = 0;
          matrix.data[5] = 0;
        } else {
          if (pathItem.instruction == 'a') {
            transformArc(pathItem.data, matrix.data);
            if (Math.abs(pathItem.data[2]) > 80) {
              var a = pathItem.data[0],
                  rotation = pathItem.data[2];
              pathItem.data[0] = pathItem.data[1];
              pathItem.data[1] = a;
              pathItem.data[2] = rotation + (rotation > 0 ? -90 : 90);
            }
            newPoint = transformPoint(matrix.data, pathItem.data[5], pathItem.data[6]);
            pathItem.data[5] = newPoint[0];
            pathItem.data[6] = newPoint[1];
          } else {
            for (var i = 0; i < pathItem.data.length; i += 2) {
              newPoint = transformPoint(matrix.data, pathItem.data[i], pathItem.data[i + 1]);
              pathItem.data[i] = newPoint[0];
              pathItem.data[i + 1] = newPoint[1];
            }
          }
          pathItem.coords[0] = pathItem.base[0] + pathItem.data[pathItem.data.length - 2];
          pathItem.coords[1] = pathItem.base[1] + pathItem.data[pathItem.data.length - 1];
        }
      }
    });
    elem.removeAttr('transform');
    return path;
  };
  function transformPoint(matrix, x, y) {
    return [matrix[0] * x + matrix[2] * y + matrix[4], matrix[1] * x + matrix[3] * y + matrix[5]];
  }
  exports.computeCubicBoundingBox = function(xa, ya, xb, yb, xc, yc, xd, yd) {
    var minx = Number.POSITIVE_INFINITY,
        miny = Number.POSITIVE_INFINITY,
        maxx = Number.NEGATIVE_INFINITY,
        maxy = Number.NEGATIVE_INFINITY,
        ts,
        t,
        x,
        y,
        i;
    if (xa < minx) {
      minx = xa;
    }
    if (xa > maxx) {
      maxx = xa;
    }
    if (xd < minx) {
      minx = xd;
    }
    if (xd > maxx) {
      maxx = xd;
    }
    ts = computeCubicFirstDerivativeRoots(xa, xb, xc, xd);
    for (i = 0; i < ts.length; i++) {
      t = ts[i];
      if (t >= 0 && t <= 1) {
        x = computeCubicBaseValue(t, xa, xb, xc, xd);
        if (x < minx) {
          minx = x;
        }
        if (x > maxx) {
          maxx = x;
        }
      }
    }
    if (ya < miny) {
      miny = ya;
    }
    if (ya > maxy) {
      maxy = ya;
    }
    if (yd < miny) {
      miny = yd;
    }
    if (yd > maxy) {
      maxy = yd;
    }
    ts = computeCubicFirstDerivativeRoots(ya, yb, yc, yd);
    for (i = 0; i < ts.length; i++) {
      t = ts[i];
      if (t >= 0 && t <= 1) {
        y = computeCubicBaseValue(t, ya, yb, yc, yd);
        if (y < miny) {
          miny = y;
        }
        if (y > maxy) {
          maxy = y;
        }
      }
    }
    return {
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy
    };
  };
  function computeCubicBaseValue(t, a, b, c, d) {
    var mt = 1 - t;
    return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
  }
  function computeCubicFirstDerivativeRoots(a, b, c, d) {
    var result = [-1, -1],
        tl = -a + 2 * b - c,
        tr = -Math.sqrt(-a * (c - d) + b * b - b * (c + d) + c * c),
        dn = -a + 3 * b - 3 * c + d;
    if (dn !== 0) {
      result[0] = (tl + tr) / dn;
      result[1] = (tl - tr) / dn;
    }
    return result;
  }
  exports.computeQuadraticBoundingBox = function(xa, ya, xb, yb, xc, yc) {
    var minx = Number.POSITIVE_INFINITY,
        miny = Number.POSITIVE_INFINITY,
        maxx = Number.NEGATIVE_INFINITY,
        maxy = Number.NEGATIVE_INFINITY,
        t,
        x,
        y;
    if (xa < minx) {
      minx = xa;
    }
    if (xa > maxx) {
      maxx = xa;
    }
    if (xc < minx) {
      minx = xc;
    }
    if (xc > maxx) {
      maxx = xc;
    }
    t = computeQuadraticFirstDerivativeRoot(xa, xb, xc);
    if (t >= 0 && t <= 1) {
      x = computeQuadraticBaseValue(t, xa, xb, xc);
      if (x < minx) {
        minx = x;
      }
      if (x > maxx) {
        maxx = x;
      }
    }
    if (ya < miny) {
      miny = ya;
    }
    if (ya > maxy) {
      maxy = ya;
    }
    if (yc < miny) {
      miny = yc;
    }
    if (yc > maxy) {
      maxy = yc;
    }
    t = computeQuadraticFirstDerivativeRoot(ya, yb, yc);
    if (t >= 0 && t <= 1) {
      y = computeQuadraticBaseValue(t, ya, yb, yc);
      if (y < miny) {
        miny = y;
      }
      if (y > maxy) {
        maxy = y;
      }
    }
    return {
      minx: minx,
      miny: miny,
      maxx: maxx,
      maxy: maxy
    };
  };
  function computeQuadraticBaseValue(t, a, b, c) {
    var mt = 1 - t;
    return mt * mt * a + 2 * mt * t * b + t * t * c;
  }
  function computeQuadraticFirstDerivativeRoot(a, b, c) {
    var t = -1,
        denominator = a - 2 * b + c;
    if (denominator !== 0) {
      t = (a - b) / denominator;
    }
    return t;
  }
  exports.js2path = function(path, data, params) {
    path.pathJS = data;
    if (params.collapseRepeated) {
      data = collapseRepeated(data);
    }
    path.attr('d').value = data.reduce(function(pathString, item) {
      return pathString += item.instruction + (item.data ? cleanupOutData(item.data, params) : '');
    }, '');
  };
  function collapseRepeated(data) {
    var prev,
        prevIndex;
    data = data.reduce(function(newPath, item) {
      if (prev && item.data && item.instruction == prev.instruction) {
        if (item.instruction != 'M') {
          prev = newPath[prevIndex] = {
            instruction: prev.instruction,
            data: prev.data.concat(item.data),
            coords: item.coords,
            base: prev.base
          };
        } else {
          prev.data = item.data;
          prev.coords = item.coords;
        }
      } else {
        newPath.push(item);
        prev = item;
        prevIndex = newPath.length - 1;
      }
      return newPath;
    }, []);
    return data;
  }
  function set(dest, source) {
    dest[0] = source[source.length - 2];
    dest[1] = source[source.length - 1];
    return dest;
  }
  exports.intersects = function(path1, path2) {
    if (path1.length < 3 || path2.length < 3)
      return false;
    var points1 = relative2absolute(path1).reduce(gatherPoints, []),
        points2 = relative2absolute(path2).reduce(gatherPoints, []);
    if (points1.maxX <= points2.minX || points2.maxX <= points1.minX || points1.maxY <= points2.minY || points2.maxY <= points1.minY || points1.every(function(set1) {
      return points2.every(function(set2) {
        return set1[set1.maxX][0] <= set2[set2.minX][0] || set2[set2.maxX][0] <= set1[set1.minX][0] || set1[set1.maxY][1] <= set2[set2.minY][1] || set2[set2.maxY][1] <= set1[set1.minY][1];
      });
    }))
      return false;
    var hullNest1 = points1.map(convexHull),
        hullNest2 = points2.map(convexHull);
    return hullNest1.some(function(hull1) {
      if (hull1.length < 3)
        return false;
      return hullNest2.some(function(hull2) {
        if (hull2.length < 3)
          return false;
        var simplex = [getSupport(hull1, hull2, [1, 0])],
            direction = minus(simplex[0]);
        var iterations = 1e4;
        while (true) {
          if (iterations-- == 0) {
            console.error('Error: infinite loop while processing mergePaths plugin.');
            return true;
          }
          simplex.push(getSupport(hull1, hull2, direction));
          if (dot(direction, simplex[simplex.length - 1]) <= 0)
            return false;
          if (processSimplex(simplex, direction))
            return true;
        }
      });
    });
    function getSupport(a, b, direction) {
      return sub(supportPoint(a, direction), supportPoint(b, minus(direction)));
    }
    function supportPoint(polygon, direction) {
      var index = direction[1] >= 0 ? direction[0] < 0 ? polygon.maxY : polygon.maxX : direction[0] < 0 ? polygon.minX : polygon.minY,
          max = -Infinity,
          value;
      while ((value = dot(polygon[index], direction)) > max) {
        max = value;
        index = ++index % polygon.length;
      }
      return polygon[(index || polygon.length) - 1];
    }
  };
  function processSimplex(simplex, direction) {
    if (simplex.length == 2) {
      var a = simplex[1],
          b = simplex[0],
          AO = minus(simplex[1]),
          AB = sub(b, a);
      if (dot(AO, AB) > 0) {
        set(direction, orth(AB, a));
      } else {
        set(direction, AO);
        simplex.shift();
      }
    } else {
      var a = simplex[2],
          b = simplex[1],
          c = simplex[0],
          AB = sub(b, a),
          AC = sub(c, a),
          AO = minus(a),
          ACB = orth(AB, AC),
          ABC = orth(AC, AB);
      if (dot(ACB, AO) > 0) {
        if (dot(AB, AO) > 0) {
          set(direction, ACB);
          simplex.shift();
        } else {
          set(direction, AO);
          simplex.splice(0, 2);
        }
      } else if (dot(ABC, AO) > 0) {
        if (dot(AC, AO) > 0) {
          set(direction, ABC);
          simplex.splice(1, 1);
        } else {
          set(direction, AO);
          simplex.splice(0, 2);
        }
      } else
        return true;
    }
    return false;
  }
  function minus(v) {
    return [-v[0], -v[1]];
  }
  function sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]];
  }
  function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  }
  function orth(v, from) {
    var o = [-v[1], v[0]];
    return dot(o, minus(from)) < 0 ? minus(o) : o;
  }
  function gatherPoints(points, item, index, path) {
    var subPath = points.length && points[points.length - 1],
        prev = index && path[index - 1],
        basePoint = subPath.length && subPath[subPath.length - 1],
        data = item.data,
        ctrlPoint = basePoint;
    switch (item.instruction) {
      case 'M':
        points.push(subPath = []);
        break;
      case 'H':
        addPoint(subPath, [data[0], basePoint[1]]);
        break;
      case 'V':
        addPoint(subPath, [basePoint[0], data[0]]);
        break;
      case 'Q':
        addPoint(subPath, data.slice(0, 2));
        prevCtrlPoint = [data[2] - data[0], data[3] - data[1]];
        break;
      case 'T':
        if (prev.instruction == 'Q' && prev.instruction == 'T') {
          ctrlPoint = [basePoint[0] + prevCtrlPoint[0], basePoint[1] + prevCtrlPoint[1]];
          addPoint(subPath, ctrlPoint);
          prevCtrlPoint = [data[0] - ctrlPoint[0], data[1] - ctrlPoint[1]];
        }
        break;
      case 'C':
        addPoint(subPath, [.5 * (basePoint[0] + data[0]), .5 * (basePoint[1] + data[1])]);
        addPoint(subPath, [.5 * (data[0] + data[2]), .5 * (data[1] + data[3])]);
        addPoint(subPath, [.5 * (data[2] + data[4]), .5 * (data[3] + data[5])]);
        prevCtrlPoint = [data[4] - data[2], data[5] - data[3]];
        break;
      case 'S':
        if (prev.instruction == 'C' && prev.instruction == 'S') {
          addPoint(subPath, [basePoint[0] + .5 * prevCtrlPoint[0], basePoint[1] + .5 * prevCtrlPoint[1]]);
          ctrlPoint = [basePoint[0] + prevCtrlPoint[0], basePoint[1] + prevCtrlPoint[1]];
        }
        addPoint(subPath, [.5 * (ctrlPoint[0] + data[0]), .5 * (ctrlPoint[1] + data[1])]);
        addPoint(subPath, [.5 * (data[0] + data[2]), .5 * (data[1] + data[3])]);
        prevCtrlPoint = [data[2] - data[0], data[3] - data[1]];
        break;
      case 'A':
        var curves = a2c.apply(0, basePoint.concat(data));
        for (var cData; (cData = curves.splice(0, 6).map(toAbsolute)).length; ) {
          addPoint(subPath, [.5 * (basePoint[0] + cData[0]), .5 * (basePoint[1] + cData[1])]);
          addPoint(subPath, [.5 * (cData[0] + cData[2]), .5 * (cData[1] + cData[3])]);
          addPoint(subPath, [.5 * (cData[2] + cData[4]), .5 * (cData[3] + cData[5])]);
          if (curves.length)
            addPoint(subPath, basePoint = cData.slice(-2));
        }
        break;
    }
    if (data && data.length >= 2)
      addPoint(subPath, data.slice(-2));
    return points;
    function toAbsolute(n, i) {
      return n + basePoint[i % 2];
    }
    function addPoint(path, point) {
      if (!path.length || point[1] > path[path.maxY][1]) {
        path.maxY = path.length;
        points.maxY = points.length ? Math.max(point[1], points.maxY) : point[1];
      }
      if (!path.length || point[0] > path[path.maxX][0]) {
        path.maxX = path.length;
        points.maxX = points.length ? Math.max(point[0], points.maxX) : point[0];
      }
      if (!path.length || point[1] < path[path.minY][1]) {
        path.minY = path.length;
        points.minY = points.length ? Math.min(point[1], points.minY) : point[1];
      }
      if (!path.length || point[0] < path[path.minX][0]) {
        path.minX = path.length;
        points.minX = points.length ? Math.min(point[0], points.minX) : point[0];
      }
      path.push(point);
    }
  }
  function convexHull(points) {
    points.sort(function(a, b) {
      return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
    });
    var lower = [],
        minY = 0,
        bottom = 0;
    for (var i = 0; i < points.length; i++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
        lower.pop();
      }
      if (points[i][1] < points[minY][1]) {
        minY = i;
        bottom = lower.length;
      }
      lower.push(points[i]);
    }
    var upper = [],
        maxY = points.length - 1,
        top = 0;
    for (var i = points.length; i--; ) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
        upper.pop();
      }
      if (points[i][1] > points[maxY][1]) {
        maxY = i;
        top = upper.length;
      }
      upper.push(points[i]);
    }
    upper.pop();
    lower.pop();
    var hull = lower.concat(upper);
    hull.minX = 0;
    hull.maxX = lower.length;
    hull.minY = bottom;
    hull.maxY = (lower.length + top) % hull.length;
    return hull;
  }
  function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }
  function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    var _120 = Math.PI * 120 / 180,
        rad = Math.PI / 180 * (+angle || 0),
        res = [],
        rotateX = function(x, y, rad) {
          return x * Math.cos(rad) - y * Math.sin(rad);
        },
        rotateY = function(x, y, rad) {
          return x * Math.sin(rad) + y * Math.cos(rad);
        };
    if (!recursive) {
      x1 = rotateX(x1, y1, -rad);
      y1 = rotateY(x1, y1, -rad);
      x2 = rotateX(x2, y2, -rad);
      y2 = rotateY(x2, y2, -rad);
      var x = (x1 - x2) / 2,
          y = (y1 - y2) / 2;
      var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
      if (h > 1) {
        h = Math.sqrt(h);
        rx = h * rx;
        ry = h * ry;
      }
      var rx2 = rx * rx,
          ry2 = ry * ry,
          k = (large_arc_flag == sweep_flag ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
          cx = k * rx * y / ry + (x1 + x2) / 2,
          cy = k * -ry * x / rx + (y1 + y2) / 2,
          f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
          f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
      f1 = x1 < cx ? Math.PI - f1 : f1;
      f2 = x2 < cx ? Math.PI - f2 : f2;
      f1 < 0 && (f1 = Math.PI * 2 + f1);
      f2 < 0 && (f2 = Math.PI * 2 + f2);
      if (sweep_flag && f1 > f2) {
        f1 = f1 - Math.PI * 2;
      }
      if (!sweep_flag && f2 > f1) {
        f2 = f2 - Math.PI * 2;
      }
    } else {
      f1 = recursive[0];
      f2 = recursive[1];
      cx = recursive[2];
      cy = recursive[3];
    }
    var df = f2 - f1;
    if (Math.abs(df) > _120) {
      var f2old = f2,
          x2old = x2,
          y2old = y2;
      f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
      x2 = cx + rx * Math.cos(f2);
      y2 = cy + ry * Math.sin(f2);
      res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
    }
    df = f2 - f1;
    var c1 = Math.cos(f1),
        s1 = Math.sin(f1),
        c2 = Math.cos(f2),
        s2 = Math.sin(f2),
        t = Math.tan(df / 4),
        hx = 4 / 3 * rx * t,
        hy = 4 / 3 * ry * t,
        m = [-hx * s1, hy * c1, x2 + hx * s2 - x1, y2 - hy * c2 - y1, x2 - x1, y2 - y1];
    if (recursive) {
      return m.concat(res);
    } else {
      res = m.concat(res);
      var newres = [];
      for (var i = 0,
          n = res.length; i < n; i++) {
        newres[i] = i % 2 ? rotateY(res[i - 1], res[i], rad) : rotateX(res[i], res[i + 1], rad);
      }
      return newres;
    }
  }
})(require('process'));
