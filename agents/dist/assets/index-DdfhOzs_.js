var cw = Object.defineProperty;
var dw = (e, t, n) => (t in e ? cw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n));
var Ct = (e, t, n) => dw(e, typeof t != "symbol" ? t + "" : t, n);
function fw(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i && Object.defineProperty(e, o, i.get ? i : { enumerable: !0, get: () => r[o] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList") for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function Dc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var cg = { exports: {} },
  Vl = {},
  dg = { exports: {} },
  ae = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vi = Symbol.for("react.element"),
  pw = Symbol.for("react.portal"),
  hw = Symbol.for("react.fragment"),
  gw = Symbol.for("react.strict_mode"),
  mw = Symbol.for("react.profiler"),
  yw = Symbol.for("react.provider"),
  vw = Symbol.for("react.context"),
  xw = Symbol.for("react.forward_ref"),
  ww = Symbol.for("react.suspense"),
  _w = Symbol.for("react.memo"),
  Sw = Symbol.for("react.lazy"),
  pf = Symbol.iterator;
function Ew(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (pf && e[pf]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var fg = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  pg = Object.assign,
  hg = {};
function Ao(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = hg), (this.updater = n || fg));
}
Ao.prototype.isReactComponent = {};
Ao.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ao.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function gg() {}
gg.prototype = Ao.prototype;
function Oc(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = hg), (this.updater = n || fg));
}
var $c = (Oc.prototype = new gg());
$c.constructor = Oc;
pg($c, Ao.prototype);
$c.isPureReactComponent = !0;
var hf = Array.isArray,
  mg = Object.prototype.hasOwnProperty,
  zc = { current: null },
  yg = { key: !0, ref: !0, __self: !0, __source: !0 };
function vg(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t))
      mg.call(t, r) && !yg.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps) for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return { $$typeof: Vi, type: e, key: i, ref: s, props: o, _owner: zc.current };
}
function bw(e, t) {
  return { $$typeof: Vi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Fc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Vi;
}
function kw(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var gf = /\/+/g;
function ba(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? kw("" + e.key) : t.toString(36);
}
function zs(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Vi:
          case pw:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (o = o(s)),
      (e = r === "" ? "." + ba(s, 0) : r),
      hf(o)
        ? ((n = ""),
          e != null && (n = e.replace(gf, "$&/") + "/"),
          zs(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Fc(o) && (o = bw(o, n + (!o.key || (s && s.key === o.key) ? "" : ("" + o.key).replace(gf, "$&/") + "/") + e)),
          t.push(o)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), hf(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var a = r + ba(i, l);
      s += zs(i, t, n, a, o);
    }
  else if (((a = Ew(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(i = e.next()).done; ) ((i = i.value), (a = r + ba(i, l++)), (s += zs(i, t, n, a, o)));
  else if (i === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return s;
}
function ls(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    zs(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Nw(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var tt = { current: null },
  Fs = { transition: null },
  Cw = { ReactCurrentDispatcher: tt, ReactCurrentBatchConfig: Fs, ReactCurrentOwner: zc };
function xg() {
  throw Error("act(...) is not supported in production builds of React.");
}
ae.Children = {
  map: ls,
  forEach: function (e, t, n) {
    ls(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ls(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ls(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Fc(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
ae.Component = Ao;
ae.Fragment = hw;
ae.Profiler = mw;
ae.PureComponent = Oc;
ae.StrictMode = gw;
ae.Suspense = ww;
ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cw;
ae.act = xg;
ae.cloneElement = function (e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = pg({}, e.props),
    o = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = zc.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t) mg.call(t, a) && !yg.hasOwnProperty(a) && (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: Vi, type: e.type, key: o, ref: i, props: r, _owner: s };
};
ae.createContext = function (e) {
  return (
    (e = {
      $$typeof: vw,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: yw, _context: e }),
    (e.Consumer = e)
  );
};
ae.createElement = vg;
ae.createFactory = function (e) {
  var t = vg.bind(null, e);
  return ((t.type = e), t);
};
ae.createRef = function () {
  return { current: null };
};
ae.forwardRef = function (e) {
  return { $$typeof: xw, render: e };
};
ae.isValidElement = Fc;
ae.lazy = function (e) {
  return { $$typeof: Sw, _payload: { _status: -1, _result: e }, _init: Nw };
};
ae.memo = function (e, t) {
  return { $$typeof: _w, type: e, compare: t === void 0 ? null : t };
};
ae.startTransition = function (e) {
  var t = Fs.transition;
  Fs.transition = {};
  try {
    e();
  } finally {
    Fs.transition = t;
  }
};
ae.unstable_act = xg;
ae.useCallback = function (e, t) {
  return tt.current.useCallback(e, t);
};
ae.useContext = function (e) {
  return tt.current.useContext(e);
};
ae.useDebugValue = function () {};
ae.useDeferredValue = function (e) {
  return tt.current.useDeferredValue(e);
};
ae.useEffect = function (e, t) {
  return tt.current.useEffect(e, t);
};
ae.useId = function () {
  return tt.current.useId();
};
ae.useImperativeHandle = function (e, t, n) {
  return tt.current.useImperativeHandle(e, t, n);
};
ae.useInsertionEffect = function (e, t) {
  return tt.current.useInsertionEffect(e, t);
};
ae.useLayoutEffect = function (e, t) {
  return tt.current.useLayoutEffect(e, t);
};
ae.useMemo = function (e, t) {
  return tt.current.useMemo(e, t);
};
ae.useReducer = function (e, t, n) {
  return tt.current.useReducer(e, t, n);
};
ae.useRef = function (e) {
  return tt.current.useRef(e);
};
ae.useState = function (e) {
  return tt.current.useState(e);
};
ae.useSyncExternalStore = function (e, t, n) {
  return tt.current.useSyncExternalStore(e, t, n);
};
ae.useTransition = function () {
  return tt.current.useTransition();
};
ae.version = "18.3.1";
dg.exports = ae;
var _ = dg.exports;
const Bc = Dc(_),
  Hc = fw({ __proto__: null, default: Bc }, [_]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tw = _,
  Aw = Symbol.for("react.element"),
  Mw = Symbol.for("react.fragment"),
  Pw = Object.prototype.hasOwnProperty,
  Iw = Tw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Lw = { key: !0, ref: !0, __self: !0, __source: !0 };
function wg(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  (n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref));
  for (r in t) Pw.call(t, r) && !Lw.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: Aw, type: e, key: i, ref: s, props: o, _owner: Iw.current };
}
Vl.Fragment = Mw;
Vl.jsx = wg;
Vl.jsxs = wg;
cg.exports = Vl;
var g = cg.exports,
  ku = {},
  _g = { exports: {} },
  vt = {},
  Sg = { exports: {} },
  Eg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, T) {
    var j = N.length;
    N.push(T);
    e: for (; 0 < j; ) {
      var $ = (j - 1) >>> 1,
        F = N[$];
      if (0 < o(F, T)) ((N[$] = T), (N[j] = F), (j = $));
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var T = N[0],
      j = N.pop();
    if (j !== T) {
      N[0] = j;
      e: for (var $ = 0, F = N.length, G = F >>> 1; $ < G; ) {
        var W = 2 * ($ + 1) - 1,
          Y = N[W],
          X = W + 1,
          Q = N[X];
        if (0 > o(Y, j)) X < F && 0 > o(Q, Y) ? ((N[$] = Q), (N[X] = j), ($ = X)) : ((N[$] = Y), (N[W] = j), ($ = W));
        else if (X < F && 0 > o(Q, j)) ((N[$] = Q), (N[X] = j), ($ = X));
        else break e;
      }
    }
    return T;
  }
  function o(N, T) {
    var j = N.sortIndex - T.sortIndex;
    return j !== 0 ? j : N.id - T.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    d = 1,
    c = null,
    f = 3,
    y = !1,
    v = !1,
    x = !1,
    S = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var T = n(u); T !== null; ) {
      if (T.callback === null) r(u);
      else if (T.startTime <= N) (r(u), (T.sortIndex = T.expirationTime), t(a, T));
      else break;
      T = n(u);
    }
  }
  function w(N) {
    if (((x = !1), p(N), !v))
      if (n(a) !== null) ((v = !0), I(E));
      else {
        var T = n(u);
        T !== null && O(w, T.startTime - N);
      }
  }
  function E(N, T) {
    ((v = !1), x && ((x = !1), h(A), (A = -1)), (y = !0));
    var j = f;
    try {
      for (p(T), c = n(a); c !== null && (!(c.expirationTime > T) || (N && !L())); ) {
        var $ = c.callback;
        if (typeof $ == "function") {
          ((c.callback = null), (f = c.priorityLevel));
          var F = $(c.expirationTime <= T);
          ((T = e.unstable_now()), typeof F == "function" ? (c.callback = F) : c === n(a) && r(a), p(T));
        } else r(a);
        c = n(a);
      }
      if (c !== null) var G = !0;
      else {
        var W = n(u);
        (W !== null && O(w, W.startTime - T), (G = !1));
      }
      return G;
    } finally {
      ((c = null), (f = j), (y = !1));
    }
  }
  var b = !1,
    k = null,
    A = -1,
    R = 5,
    z = -1;
  function L() {
    return !(e.unstable_now() - z < R);
  }
  function M() {
    if (k !== null) {
      var N = e.unstable_now();
      z = N;
      var T = !0;
      try {
        T = k(!0, N);
      } finally {
        T ? B() : ((b = !1), (k = null));
      }
    } else b = !1;
  }
  var B;
  if (typeof m == "function")
    B = function () {
      m(M);
    };
  else if (typeof MessageChannel < "u") {
    var C = new MessageChannel(),
      D = C.port2;
    ((C.port1.onmessage = M),
      (B = function () {
        D.postMessage(null);
      }));
  } else
    B = function () {
      S(M, 0);
    };
  function I(N) {
    ((k = N), b || ((b = !0), B()));
  }
  function O(N, T) {
    A = S(function () {
      N(e.unstable_now());
    }, T);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || y || ((v = !0), I(E));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (R = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var T = 3;
          break;
        default:
          T = f;
      }
      var j = f;
      f = T;
      try {
        return N();
      } finally {
        f = j;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, T) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var j = f;
      f = N;
      try {
        return T();
      } finally {
        f = j;
      }
    }),
    (e.unstable_scheduleCallback = function (N, T, j) {
      var $ = e.unstable_now();
      switch (
        (typeof j == "object" && j !== null ? ((j = j.delay), (j = typeof j == "number" && 0 < j ? $ + j : $)) : (j = $), N)
      ) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return (
        (F = j + F),
        (N = { id: d++, callback: T, priorityLevel: N, startTime: j, expirationTime: F, sortIndex: -1 }),
        j > $
          ? ((N.sortIndex = j), t(u, N), n(a) === null && N === n(u) && (x ? (h(A), (A = -1)) : (x = !0), O(w, j - $)))
          : ((N.sortIndex = F), t(a, N), v || y || ((v = !0), I(E))),
        N
      );
    }),
    (e.unstable_shouldYield = L),
    (e.unstable_wrapCallback = function (N) {
      var T = f;
      return function () {
        var j = f;
        f = T;
        try {
          return N.apply(this, arguments);
        } finally {
          f = j;
        }
      };
    }));
})(Eg);
Sg.exports = Eg;
var Rw = Sg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jw = _,
  mt = Rw;
function H(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var bg = new Set(),
  gi = {};
function Mr(e, t) {
  (po(e, t), po(e + "Capture", t));
}
function po(e, t) {
  for (gi[e] = t, e = 0; e < t.length; e++) bg.add(t[e]);
}
var mn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
  Nu = Object.prototype.hasOwnProperty,
  Dw =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  mf = {},
  yf = {};
function Ow(e) {
  return Nu.call(yf, e) ? !0 : Nu.call(mf, e) ? !1 : Dw.test(e) ? (yf[e] = !0) : ((mf[e] = !0), !1);
}
function $w(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function zw(e, t, n, r) {
  if (t === null || typeof t > "u" || $w(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function nt(e, t, n, r, o, i, s) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s));
}
var Ge = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ge[e] = new nt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Ge[t] = new nt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ge[e] = new nt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  Ge[e] = new nt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ge[e] = new nt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ge[e] = new nt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ge[e] = new nt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ge[e] = new nt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ge[e] = new nt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Vc = /[\-:]([a-z])/g;
function Wc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Vc, Wc);
    Ge[t] = new nt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
  var t = e.replace(Vc, Wc);
  Ge[t] = new nt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Vc, Wc);
  Ge[t] = new nt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ge[e] = new nt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ge.xlinkHref = new nt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ge[e] = new nt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Uc(e, t, n, r) {
  var o = Ge.hasOwnProperty(t) ? Ge[t] : null;
  (o !== null ? o.type !== 0 : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
    (zw(t, n, o, r) && (n = null),
    r || o === null
      ? Ow(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var _n = jw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  as = Symbol.for("react.element"),
  Hr = Symbol.for("react.portal"),
  Vr = Symbol.for("react.fragment"),
  Gc = Symbol.for("react.strict_mode"),
  Cu = Symbol.for("react.profiler"),
  kg = Symbol.for("react.provider"),
  Ng = Symbol.for("react.context"),
  qc = Symbol.for("react.forward_ref"),
  Tu = Symbol.for("react.suspense"),
  Au = Symbol.for("react.suspense_list"),
  Kc = Symbol.for("react.memo"),
  Rn = Symbol.for("react.lazy"),
  Cg = Symbol.for("react.offscreen"),
  vf = Symbol.iterator;
function jo(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (vf && e[vf]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var Ae = Object.assign,
  ka;
function Yo(e) {
  if (ka === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ka = (t && t[1]) || "";
    }
  return (
    `
` +
    ka +
    e
  );
}
var Na = !1;
function Ca(e, t) {
  if (!e || Na) return "";
  Na = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          s = o.length - 1,
          l = i.length - 1;
        1 <= s && 0 <= l && o[s] !== i[l];
      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (o[s] !== i[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || o[s] !== i[l])) {
                var a =
                  `
` + o[s].replace(" at new ", " at ");
                return (e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a);
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    ((Na = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Yo(e) : "";
}
function Fw(e) {
  switch (e.tag) {
    case 5:
      return Yo(e.type);
    case 16:
      return Yo("Lazy");
    case 13:
      return Yo("Suspense");
    case 19:
      return Yo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Ca(e.type, !1)), e);
    case 11:
      return ((e = Ca(e.type.render, !1)), e);
    case 1:
      return ((e = Ca(e.type, !0)), e);
    default:
      return "";
  }
}
function Mu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Vr:
      return "Fragment";
    case Hr:
      return "Portal";
    case Cu:
      return "Profiler";
    case Gc:
      return "StrictMode";
    case Tu:
      return "Suspense";
    case Au:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ng:
        return (e.displayName || "Context") + ".Consumer";
      case kg:
        return (e._context.displayName || "Context") + ".Provider";
      case qc:
        var t = e.render;
        return (
          (e = e.displayName),
          e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Kc:
        return ((t = e.displayName || null), t !== null ? t : Mu(e.type) || "Memo");
      case Rn:
        ((t = e._payload), (e = e._init));
        try {
          return Mu(e(t));
        } catch {}
    }
  return null;
}
function Bw(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Mu(t);
    case 8:
      return t === Gc ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Qn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Tg(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Hw(e) {
  var t = Tg(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (s) {
          ((r = "" + s), i.call(this, s));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function us(e) {
  e._valueTracker || (e._valueTracker = Hw(e));
}
function Ag(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (e && (r = Tg(e) ? (e.checked ? "true" : "false") : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1);
}
function il(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Pu(e, t) {
  var n = t.checked;
  return Ae({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function xf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Qn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
    }));
}
function Mg(e, t) {
  ((t = t.checked), t != null && Uc(e, "checked", t, !1));
}
function Iu(e, t) {
  Mg(e, t);
  var n = Qn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value") ? Lu(e, t.type, n) : t.hasOwnProperty("defaultValue") && Lu(e, t.type, Qn(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function wf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
    ((t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t));
  }
  ((n = e.name), n !== "" && (e.name = ""), (e.defaultChecked = !!e._wrapperState.initialChecked), n !== "" && (e.name = n));
}
function Lu(e, t, n) {
  (t !== "number" || il(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Xo = Array.isArray;
function no(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Qn(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ru(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(H(91));
  return Ae({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function _f(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(H(92));
      if (Xo(n)) {
        if (1 < n.length) throw Error(H(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Qn(n) };
}
function Pg(e, t) {
  var n = Qn(t.value),
    r = Qn(t.defaultValue);
  (n != null &&
    ((n = "" + n), n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Sf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ig(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ju(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ig(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var cs,
  Lg = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (
        cs = cs || document.createElement("div"),
          cs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = cs.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function mi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ti = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Vw = ["Webkit", "ms", "Moz", "O"];
Object.keys(ti).forEach(function (e) {
  Vw.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ti[t] = ti[e]));
  });
});
function Rg(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (ti.hasOwnProperty(e) && ti[e])
      ? ("" + t).trim()
      : t + "px";
}
function jg(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = Rg(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var Ww = Ae(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Du(e, t) {
  if (t) {
    if (Ww[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(H(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(H(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(H(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(H(62));
  }
}
function Ou(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var $u = null;
function Yc(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var zu = null,
  ro = null,
  oo = null;
function Ef(e) {
  if ((e = Gi(e))) {
    if (typeof zu != "function") throw Error(H(280));
    var t = e.stateNode;
    t && ((t = Kl(t)), zu(e.stateNode, e.type, t));
  }
}
function Dg(e) {
  ro ? (oo ? oo.push(e) : (oo = [e])) : (ro = e);
}
function Og() {
  if (ro) {
    var e = ro,
      t = oo;
    if (((oo = ro = null), Ef(e), t)) for (e = 0; e < t.length; e++) Ef(t[e]);
  }
}
function $g(e, t) {
  return e(t);
}
function zg() {}
var Ta = !1;
function Fg(e, t, n) {
  if (Ta) return e(t, n);
  Ta = !0;
  try {
    return $g(e, t, n);
  } finally {
    ((Ta = !1), (ro !== null || oo !== null) && (zg(), Og()));
  }
}
function yi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Kl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) || ((e = e.type), (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(H(231, t, typeof n));
  return n;
}
var Fu = !1;
if (mn)
  try {
    var Do = {};
    (Object.defineProperty(Do, "passive", {
      get: function () {
        Fu = !0;
      },
    }),
      window.addEventListener("test", Do, Do),
      window.removeEventListener("test", Do, Do));
  } catch {
    Fu = !1;
  }
function Uw(e, t, n, r, o, i, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var ni = !1,
  sl = null,
  ll = !1,
  Bu = null,
  Gw = {
    onError: function (e) {
      ((ni = !0), (sl = e));
    },
  };
function qw(e, t, n, r, o, i, s, l, a) {
  ((ni = !1), (sl = null), Uw.apply(Gw, arguments));
}
function Kw(e, t, n, r, o, i, s, l, a) {
  if ((qw.apply(this, arguments), ni)) {
    if (ni) {
      var u = sl;
      ((ni = !1), (sl = null));
    } else throw Error(H(198));
    ll || ((ll = !0), (Bu = u));
  }
}
function Pr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Bg(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
  }
  return null;
}
function bf(e) {
  if (Pr(e) !== e) throw Error(H(188));
}
function Yw(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Pr(e)), t === null)) throw Error(H(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return (bf(o), e);
        if (i === r) return (bf(o), t);
        i = i.sibling;
      }
      throw Error(H(188));
    }
    if (n.return !== r.return) ((n = o), (r = i));
    else {
      for (var s = !1, l = o.child; l; ) {
        if (l === n) {
          ((s = !0), (n = o), (r = i));
          break;
        }
        if (l === r) {
          ((s = !0), (r = o), (n = i));
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = i.child; l; ) {
          if (l === n) {
            ((s = !0), (n = i), (r = o));
            break;
          }
          if (l === r) {
            ((s = !0), (r = i), (n = o));
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(H(189));
      }
    }
    if (n.alternate !== r) throw Error(H(190));
  }
  if (n.tag !== 3) throw Error(H(188));
  return n.stateNode.current === n ? e : t;
}
function Hg(e) {
  return ((e = Yw(e)), e !== null ? Vg(e) : null);
}
function Vg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Vg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wg = mt.unstable_scheduleCallback,
  kf = mt.unstable_cancelCallback,
  Xw = mt.unstable_shouldYield,
  Qw = mt.unstable_requestPaint,
  Re = mt.unstable_now,
  Zw = mt.unstable_getCurrentPriorityLevel,
  Xc = mt.unstable_ImmediatePriority,
  Ug = mt.unstable_UserBlockingPriority,
  al = mt.unstable_NormalPriority,
  Jw = mt.unstable_LowPriority,
  Gg = mt.unstable_IdlePriority,
  Wl = null,
  Qt = null;
function e1(e) {
  if (Qt && typeof Qt.onCommitFiberRoot == "function")
    try {
      Qt.onCommitFiberRoot(Wl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Dt = Math.clz32 ? Math.clz32 : r1,
  t1 = Math.log,
  n1 = Math.LN2;
function r1(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((t1(e) / n1) | 0)) | 0);
}
var ds = 64,
  fs = 4194304;
function Qo(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ul(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~o;
    l !== 0 ? (r = Qo(l)) : ((i &= s), i !== 0 && (r = Qo(i)));
  } else ((s = n & ~o), s !== 0 ? (r = Qo(s)) : i !== 0 && (r = Qo(i)));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & o) && ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))) return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; ) ((n = 31 - Dt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function o1(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function i1(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - Dt(i),
      l = 1 << s,
      a = o[s];
    (a === -1 ? (!(l & n) || l & r) && (o[s] = o1(l, t)) : a <= t && (e.expiredLanes |= l), (i &= ~l));
  }
}
function Hu(e) {
  return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
}
function qg() {
  var e = ds;
  return ((ds <<= 1), !(ds & 4194240) && (ds = 64), e);
}
function Aa(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Wi(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Dt(t)),
    (e[t] = n));
}
function s1(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Dt(n),
      i = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i));
  }
}
function Qc(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Dt(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var ye = 0;
function Kg(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
}
var Yg,
  Zc,
  Xg,
  Qg,
  Zg,
  Vu = !1,
  ps = [],
  Hn = null,
  Vn = null,
  Wn = null,
  vi = new Map(),
  xi = new Map(),
  Dn = [],
  l1 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Nf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Hn = null;
      break;
    case "dragenter":
    case "dragleave":
      Vn = null;
      break;
    case "mouseover":
    case "mouseout":
      Wn = null;
      break;
    case "pointerover":
    case "pointerout":
      vi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      xi.delete(t.pointerId);
  }
}
function Oo(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [o] }),
      t !== null && ((t = Gi(t)), t !== null && Zc(t)),
      e)
    : ((e.eventSystemFlags |= r), (t = e.targetContainers), o !== null && t.indexOf(o) === -1 && t.push(o), e);
}
function a1(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return ((Hn = Oo(Hn, e, t, n, r, o)), !0);
    case "dragenter":
      return ((Vn = Oo(Vn, e, t, n, r, o)), !0);
    case "mouseover":
      return ((Wn = Oo(Wn, e, t, n, r, o)), !0);
    case "pointerover":
      var i = o.pointerId;
      return (vi.set(i, Oo(vi.get(i) || null, e, t, n, r, o)), !0);
    case "gotpointercapture":
      return ((i = o.pointerId), xi.set(i, Oo(xi.get(i) || null, e, t, n, r, o)), !0);
  }
  return !1;
}
function Jg(e) {
  var t = cr(e.target);
  if (t !== null) {
    var n = Pr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Bg(n)), t !== null)) {
          ((e.blockedOn = t),
            Zg(e.priority, function () {
              Xg(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Bs(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Wu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (($u = r), n.target.dispatchEvent(r), ($u = null));
    } else return ((t = Gi(n)), t !== null && Zc(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Cf(e, t, n) {
  Bs(e) && n.delete(t);
}
function u1() {
  ((Vu = !1),
    Hn !== null && Bs(Hn) && (Hn = null),
    Vn !== null && Bs(Vn) && (Vn = null),
    Wn !== null && Bs(Wn) && (Wn = null),
    vi.forEach(Cf),
    xi.forEach(Cf));
}
function $o(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null), Vu || ((Vu = !0), mt.unstable_scheduleCallback(mt.unstable_NormalPriority, u1)));
}
function wi(e) {
  function t(o) {
    return $o(o, e);
  }
  if (0 < ps.length) {
    $o(ps[0], e);
    for (var n = 1; n < ps.length; n++) {
      var r = ps[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Hn !== null && $o(Hn, e), Vn !== null && $o(Vn, e), Wn !== null && $o(Wn, e), vi.forEach(t), xi.forEach(t), n = 0;
    n < Dn.length;
    n++
  )
    ((r = Dn[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Dn.length && ((n = Dn[0]), n.blockedOn === null); ) (Jg(n), n.blockedOn === null && Dn.shift());
}
var io = _n.ReactCurrentBatchConfig,
  cl = !0;
function c1(e, t, n, r) {
  var o = ye,
    i = io.transition;
  io.transition = null;
  try {
    ((ye = 1), Jc(e, t, n, r));
  } finally {
    ((ye = o), (io.transition = i));
  }
}
function d1(e, t, n, r) {
  var o = ye,
    i = io.transition;
  io.transition = null;
  try {
    ((ye = 4), Jc(e, t, n, r));
  } finally {
    ((ye = o), (io.transition = i));
  }
}
function Jc(e, t, n, r) {
  if (cl) {
    var o = Wu(e, t, n, r);
    if (o === null) (za(e, t, r, dl, n), Nf(e, r));
    else if (a1(o, e, t, n, r)) r.stopPropagation();
    else if ((Nf(e, r), t & 4 && -1 < l1.indexOf(e))) {
      for (; o !== null; ) {
        var i = Gi(o);
        if ((i !== null && Yg(i), (i = Wu(e, t, n, r)), i === null && za(e, t, r, dl, n), i === o)) break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else za(e, t, r, null, n);
  }
}
var dl = null;
function Wu(e, t, n, r) {
  if (((dl = null), (e = Yc(r)), (e = cr(e)), e !== null))
    if (((t = Pr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Bg(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((dl = e), null);
}
function em(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Zw()) {
        case Xc:
          return 1;
        case Ug:
          return 4;
        case al:
        case Jw:
          return 16;
        case Gg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var zn = null,
  ed = null,
  Hs = null;
function tm() {
  if (Hs) return Hs;
  var e,
    t = ed,
    n = t.length,
    r,
    o = "value" in zn ? zn.value : zn.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
  return (Hs = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Vs(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function hs() {
  return !0;
}
function Tf() {
  return !1;
}
function xt(e) {
  function t(n, r, o, i, s) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null));
    for (var l in e) e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? hs : Tf),
      (this.isPropagationStopped = Tf),
      this
    );
  }
  return (
    Ae(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = hs));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = hs));
      },
      persist: function () {},
      isPersistent: hs,
    }),
    t
  );
}
var Mo = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  td = xt(Mo),
  Ui = Ae({}, Mo, { view: 0, detail: 0 }),
  f1 = xt(Ui),
  Ma,
  Pa,
  zo,
  Ul = Ae({}, Ui, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: nd,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0 ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== zo &&
            (zo && e.type === "mousemove" ? ((Ma = e.screenX - zo.screenX), (Pa = e.screenY - zo.screenY)) : (Pa = Ma = 0),
            (zo = e)),
          Ma);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Pa;
    },
  }),
  Af = xt(Ul),
  p1 = Ae({}, Ul, { dataTransfer: 0 }),
  h1 = xt(p1),
  g1 = Ae({}, Ui, { relatedTarget: 0 }),
  Ia = xt(g1),
  m1 = Ae({}, Mo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  y1 = xt(m1),
  v1 = Ae({}, Mo, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  x1 = xt(v1),
  w1 = Ae({}, Mo, { data: 0 }),
  Mf = xt(w1),
  _1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  S1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  E1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function b1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = E1[e]) ? !!t[e] : !1;
}
function nd() {
  return b1;
}
var k1 = Ae({}, Ui, {
    key: function (e) {
      if (e.key) {
        var t = _1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Vs(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? S1[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: nd,
    charCode: function (e) {
      return e.type === "keypress" ? Vs(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress" ? Vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
  }),
  N1 = xt(k1),
  C1 = Ae({}, Ul, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Pf = xt(C1),
  T1 = Ae({}, Ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: nd,
  }),
  A1 = xt(T1),
  M1 = Ae({}, Mo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  P1 = xt(M1),
  I1 = Ae({}, Ul, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  L1 = xt(I1),
  R1 = [9, 13, 27, 32],
  rd = mn && "CompositionEvent" in window,
  ri = null;
mn && "documentMode" in document && (ri = document.documentMode);
var j1 = mn && "TextEvent" in window && !ri,
  nm = mn && (!rd || (ri && 8 < ri && 11 >= ri)),
  If = " ",
  Lf = !1;
function rm(e, t) {
  switch (e) {
    case "keyup":
      return R1.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function om(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Wr = !1;
function D1(e, t) {
  switch (e) {
    case "compositionend":
      return om(t);
    case "keypress":
      return t.which !== 32 ? null : ((Lf = !0), If);
    case "textInput":
      return ((e = t.data), e === If && Lf ? null : e);
    default:
      return null;
  }
}
function O1(e, t) {
  if (Wr) return e === "compositionend" || (!rd && rm(e, t)) ? ((e = tm()), (Hs = ed = zn = null), (Wr = !1), e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return nm && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var $1 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Rf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!$1[e.type] : t === "textarea";
}
function im(e, t, n, r) {
  (Dg(r),
    (t = fl(t, "onChange")),
    0 < t.length && ((n = new td("onChange", "change", null, n, r)), e.push({ event: n, listeners: t })));
}
var oi = null,
  _i = null;
function z1(e) {
  mm(e, 0);
}
function Gl(e) {
  var t = qr(e);
  if (Ag(t)) return e;
}
function F1(e, t) {
  if (e === "change") return t;
}
var sm = !1;
if (mn) {
  var La;
  if (mn) {
    var Ra = "oninput" in document;
    if (!Ra) {
      var jf = document.createElement("div");
      (jf.setAttribute("oninput", "return;"), (Ra = typeof jf.oninput == "function"));
    }
    La = Ra;
  } else La = !1;
  sm = La && (!document.documentMode || 9 < document.documentMode);
}
function Df() {
  oi && (oi.detachEvent("onpropertychange", lm), (_i = oi = null));
}
function lm(e) {
  if (e.propertyName === "value" && Gl(_i)) {
    var t = [];
    (im(t, _i, e, Yc(e)), Fg(z1, t));
  }
}
function B1(e, t, n) {
  e === "focusin" ? (Df(), (oi = t), (_i = n), oi.attachEvent("onpropertychange", lm)) : e === "focusout" && Df();
}
function H1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Gl(_i);
}
function V1(e, t) {
  if (e === "click") return Gl(t);
}
function W1(e, t) {
  if (e === "input" || e === "change") return Gl(t);
}
function U1(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var $t = typeof Object.is == "function" ? Object.is : U1;
function Si(e, t) {
  if ($t(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Nu.call(t, o) || !$t(e[o], t[o])) return !1;
  }
  return !0;
}
function Of(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function $f(e, t) {
  var n = Of(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Of(n);
  }
}
function am(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? am(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function um() {
  for (var e = window, t = il(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = il(e.document);
  }
  return t;
}
function od(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function G1(e) {
  var t = um(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && am(n.ownerDocument.documentElement, n)) {
    if (r !== null && od(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
      else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        ((r = r.end === void 0 ? i : Math.min(r.end, o)), !e.extend && i > r && ((o = r), (r = i), (i = o)), (o = $f(n, i)));
        var s = $f(n, r);
        o &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
  }
}
var q1 = mn && "documentMode" in document && 11 >= document.documentMode,
  Ur = null,
  Uu = null,
  ii = null,
  Gu = !1;
function zf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Gu ||
    Ur == null ||
    Ur !== il(r) ||
    ((r = Ur),
    "selectionStart" in r && od(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset })),
    (ii && Si(ii, r)) ||
      ((ii = r),
      (r = fl(Uu, "onSelect")),
      0 < r.length && ((t = new td("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = Ur))));
}
function gs(e, t) {
  var n = {};
  return ((n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n);
}
var Gr = {
    animationend: gs("Animation", "AnimationEnd"),
    animationiteration: gs("Animation", "AnimationIteration"),
    animationstart: gs("Animation", "AnimationStart"),
    transitionend: gs("Transition", "TransitionEnd"),
  },
  ja = {},
  cm = {};
mn &&
  ((cm = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Gr.animationend.animation, delete Gr.animationiteration.animation, delete Gr.animationstart.animation),
  "TransitionEvent" in window || delete Gr.transitionend.transition);
function ql(e) {
  if (ja[e]) return ja[e];
  if (!Gr[e]) return e;
  var t = Gr[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in cm) return (ja[e] = t[n]);
  return e;
}
var dm = ql("animationend"),
  fm = ql("animationiteration"),
  pm = ql("animationstart"),
  hm = ql("transitionend"),
  gm = new Map(),
  Ff =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Jn(e, t) {
  (gm.set(e, t), Mr(t, [e]));
}
for (var Da = 0; Da < Ff.length; Da++) {
  var Oa = Ff[Da],
    K1 = Oa.toLowerCase(),
    Y1 = Oa[0].toUpperCase() + Oa.slice(1);
  Jn(K1, "on" + Y1);
}
Jn(dm, "onAnimationEnd");
Jn(fm, "onAnimationIteration");
Jn(pm, "onAnimationStart");
Jn("dblclick", "onDoubleClick");
Jn("focusin", "onFocus");
Jn("focusout", "onBlur");
Jn(hm, "onTransitionEnd");
po("onMouseEnter", ["mouseout", "mouseover"]);
po("onMouseLeave", ["mouseout", "mouseover"]);
po("onPointerEnter", ["pointerout", "pointerover"]);
po("onPointerLeave", ["pointerout", "pointerover"]);
Mr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Mr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Mr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Mr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Mr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Zo =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  X1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Zo));
function Bf(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), Kw(r, t, void 0, e), (e.currentTarget = null));
}
function mm(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== i && o.isPropagationStopped())) break e;
          (Bf(o, l, u), (i = a));
        }
      else
        for (s = 0; s < r.length; s++) {
          if (((l = r[s]), (a = l.instance), (u = l.currentTarget), (l = l.listener), a !== i && o.isPropagationStopped()))
            break e;
          (Bf(o, l, u), (i = a));
        }
    }
  }
  if (ll) throw ((e = Bu), (ll = !1), (Bu = null), e);
}
function _e(e, t) {
  var n = t[Qu];
  n === void 0 && (n = t[Qu] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ym(t, e, 2, !1), n.add(r));
}
function $a(e, t, n) {
  var r = 0;
  (t && (r |= 4), ym(n, e, r, t));
}
var ms = "_reactListening" + Math.random().toString(36).slice(2);
function Ei(e) {
  if (!e[ms]) {
    ((e[ms] = !0),
      bg.forEach(function (n) {
        n !== "selectionchange" && (X1.has(n) || $a(n, !1, e), $a(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ms] || ((t[ms] = !0), $a("selectionchange", !1, t));
  }
}
function ym(e, t, n, r) {
  switch (em(t)) {
    case 1:
      var o = c1;
      break;
    case 4:
      o = d1;
      break;
    default:
      o = Jc;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !Fu || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1));
}
function za(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo), a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = cr(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Fg(function () {
    var u = i,
      d = Yc(n),
      c = [];
    e: {
      var f = gm.get(e);
      if (f !== void 0) {
        var y = td,
          v = e;
        switch (e) {
          case "keypress":
            if (Vs(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = N1;
            break;
          case "focusin":
            ((v = "focus"), (y = Ia));
            break;
          case "focusout":
            ((v = "blur"), (y = Ia));
            break;
          case "beforeblur":
          case "afterblur":
            y = Ia;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Af;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = h1;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = A1;
            break;
          case dm:
          case fm:
          case pm:
            y = y1;
            break;
          case hm:
            y = P1;
            break;
          case "scroll":
            y = f1;
            break;
          case "wheel":
            y = L1;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = x1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Pf;
        }
        var x = (t & 4) !== 0,
          S = !x && e === "scroll",
          h = x ? (f !== null ? f + "Capture" : null) : f;
        x = [];
        for (var m = u, p; m !== null; ) {
          p = m;
          var w = p.stateNode;
          if ((p.tag === 5 && w !== null && ((p = w), h !== null && ((w = yi(m, h)), w != null && x.push(bi(m, w, p)))), S))
            break;
          m = m.return;
        }
        0 < x.length && ((f = new y(f, v, null, n, d)), c.push({ event: f, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          f && n !== $u && (v = n.relatedTarget || n.fromElement) && (cr(v) || v[yn]))
        )
          break e;
        if (
          (y || f) &&
          ((f = d.window === d ? d : (f = d.ownerDocument) ? f.defaultView || f.parentWindow : window),
          y
            ? ((v = n.relatedTarget || n.toElement),
              (y = u),
              (v = v ? cr(v) : null),
              v !== null && ((S = Pr(v)), v !== S || (v.tag !== 5 && v.tag !== 6)) && (v = null))
            : ((y = null), (v = u)),
          y !== v)
        ) {
          if (
            ((x = Af),
            (w = "onMouseLeave"),
            (h = "onMouseEnter"),
            (m = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = Pf), (w = "onPointerLeave"), (h = "onPointerEnter"), (m = "pointer")),
            (S = y == null ? f : qr(y)),
            (p = v == null ? f : qr(v)),
            (f = new x(w, m + "leave", y, n, d)),
            (f.target = S),
            (f.relatedTarget = p),
            (w = null),
            cr(d) === u && ((x = new x(h, m + "enter", v, n, d)), (x.target = p), (x.relatedTarget = S), (w = x)),
            (S = w),
            y && v)
          )
            t: {
              for (x = y, h = v, m = 0, p = x; p; p = jr(p)) m++;
              for (p = 0, w = h; w; w = jr(w)) p++;
              for (; 0 < m - p; ) ((x = jr(x)), m--);
              for (; 0 < p - m; ) ((h = jr(h)), p--);
              for (; m--; ) {
                if (x === h || (h !== null && x === h.alternate)) break t;
                ((x = jr(x)), (h = jr(h)));
              }
              x = null;
            }
          else x = null;
          (y !== null && Hf(c, f, y, x, !1), v !== null && S !== null && Hf(c, S, v, x, !0));
        }
      }
      e: {
        if (
          ((f = u ? qr(u) : window),
          (y = f.nodeName && f.nodeName.toLowerCase()),
          y === "select" || (y === "input" && f.type === "file"))
        )
          var E = F1;
        else if (Rf(f))
          if (sm) E = W1;
          else {
            E = H1;
            var b = B1;
          }
        else (y = f.nodeName) && y.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (E = V1);
        if (E && (E = E(e, u))) {
          im(c, E, n, d);
          break e;
        }
        (b && b(e, f, u),
          e === "focusout" && (b = f._wrapperState) && b.controlled && f.type === "number" && Lu(f, "number", f.value));
      }
      switch (((b = u ? qr(u) : window), e)) {
        case "focusin":
          (Rf(b) || b.contentEditable === "true") && ((Ur = b), (Uu = u), (ii = null));
          break;
        case "focusout":
          ii = Uu = Ur = null;
          break;
        case "mousedown":
          Gu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Gu = !1), zf(c, n, d));
          break;
        case "selectionchange":
          if (q1) break;
        case "keydown":
        case "keyup":
          zf(c, n, d);
      }
      var k;
      if (rd)
        e: {
          switch (e) {
            case "compositionstart":
              var A = "onCompositionStart";
              break e;
            case "compositionend":
              A = "onCompositionEnd";
              break e;
            case "compositionupdate":
              A = "onCompositionUpdate";
              break e;
          }
          A = void 0;
        }
      else Wr ? rm(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      (A &&
        (nm &&
          n.locale !== "ko" &&
          (Wr || A !== "onCompositionStart"
            ? A === "onCompositionEnd" && Wr && (k = tm())
            : ((zn = d), (ed = "value" in zn ? zn.value : zn.textContent), (Wr = !0))),
        (b = fl(u, A)),
        0 < b.length &&
          ((A = new Mf(A, e, null, n, d)),
          c.push({ event: A, listeners: b }),
          k ? (A.data = k) : ((k = om(n)), k !== null && (A.data = k)))),
        (k = j1 ? D1(e, n) : O1(e, n)) &&
          ((u = fl(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new Mf("onBeforeInput", "beforeinput", null, n, d)), c.push({ event: d, listeners: u }), (d.data = k))));
    }
    mm(c, t);
  });
}
function bi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function fl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    (o.tag === 5 &&
      i !== null &&
      ((o = i), (i = yi(e, n)), i != null && r.unshift(bi(e, i, o)), (i = yi(e, t)), i != null && r.push(bi(e, i, o))),
      (e = e.return));
  }
  return r;
}
function jr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Hf(e, t, n, r, o) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    (l.tag === 5 &&
      u !== null &&
      ((l = u),
      o ? ((a = yi(n, i)), a != null && s.unshift(bi(n, a, l))) : o || ((a = yi(n, i)), a != null && s.push(bi(n, a, l)))),
      (n = n.return));
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Q1 = /\r\n?/g,
  Z1 = /\u0000|\uFFFD/g;
function Vf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Q1,
      `
`,
    )
    .replace(Z1, "");
}
function ys(e, t, n) {
  if (((t = Vf(t)), Vf(e) !== t && n)) throw Error(H(425));
}
function pl() {}
var qu = null,
  Ku = null;
function Yu(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Xu = typeof setTimeout == "function" ? setTimeout : void 0,
  J1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Wf = typeof Promise == "function" ? Promise : void 0,
  e_ =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Wf < "u"
        ? function (e) {
            return Wf.resolve(null).then(e).catch(t_);
          }
        : Xu;
function t_(e) {
  setTimeout(function () {
    throw e;
  });
}
function Fa(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(o), wi(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  wi(t);
}
function Un(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Uf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Po = Math.random().toString(36).slice(2),
  Yt = "__reactFiber$" + Po,
  ki = "__reactProps$" + Po,
  yn = "__reactContainer$" + Po,
  Qu = "__reactEvents$" + Po,
  n_ = "__reactListeners$" + Po,
  r_ = "__reactHandles$" + Po;
function cr(e) {
  var t = e[Yt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[yn] || n[Yt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Uf(e); e !== null; ) {
          if ((n = e[Yt])) return n;
          e = Uf(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Gi(e) {
  return ((e = e[Yt] || e[yn]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e);
}
function qr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(H(33));
}
function Kl(e) {
  return e[ki] || null;
}
var Zu = [],
  Kr = -1;
function er(e) {
  return { current: e };
}
function Se(e) {
  0 > Kr || ((e.current = Zu[Kr]), (Zu[Kr] = null), Kr--);
}
function xe(e, t) {
  (Kr++, (Zu[Kr] = e.current), (e.current = t));
}
var Zn = {},
  Qe = er(Zn),
  lt = er(!1),
  wr = Zn;
function ho(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Zn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function at(e) {
  return ((e = e.childContextTypes), e != null);
}
function hl() {
  (Se(lt), Se(Qe));
}
function Gf(e, t, n) {
  if (Qe.current !== Zn) throw Error(H(168));
  (xe(Qe, t), xe(lt, n));
}
function vm(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(H(108, Bw(e) || "Unknown", o));
  return Ae({}, n, r);
}
function gl(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Zn),
    (wr = Qe.current),
    xe(Qe, e),
    xe(lt, lt.current),
    !0
  );
}
function qf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(H(169));
  (n ? ((e = vm(e, t, wr)), (r.__reactInternalMemoizedMergedChildContext = e), Se(lt), Se(Qe), xe(Qe, e)) : Se(lt),
    xe(lt, n));
}
var cn = null,
  Yl = !1,
  Ba = !1;
function xm(e) {
  cn === null ? (cn = [e]) : cn.push(e);
}
function o_(e) {
  ((Yl = !0), xm(e));
}
function tr() {
  if (!Ba && cn !== null) {
    Ba = !0;
    var e = 0,
      t = ye;
    try {
      var n = cn;
      for (ye = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((cn = null), (Yl = !1));
    } catch (o) {
      throw (cn !== null && (cn = cn.slice(e + 1)), Wg(Xc, tr), o);
    } finally {
      ((ye = t), (Ba = !1));
    }
  }
  return null;
}
var Yr = [],
  Xr = 0,
  ml = null,
  yl = 0,
  wt = [],
  _t = 0,
  _r = null,
  dn = 1,
  fn = "";
function lr(e, t) {
  ((Yr[Xr++] = yl), (Yr[Xr++] = ml), (ml = e), (yl = t));
}
function wm(e, t, n) {
  ((wt[_t++] = dn), (wt[_t++] = fn), (wt[_t++] = _r), (_r = e));
  var r = dn;
  e = fn;
  var o = 32 - Dt(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var i = 32 - Dt(t) + o;
  if (30 < i) {
    var s = o - (o % 5);
    ((i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (o -= s),
      (dn = (1 << (32 - Dt(t) + o)) | (n << o) | r),
      (fn = i + e));
  } else ((dn = (1 << i) | (n << o) | r), (fn = e));
}
function id(e) {
  e.return !== null && (lr(e, 1), wm(e, 1, 0));
}
function sd(e) {
  for (; e === ml; ) ((ml = Yr[--Xr]), (Yr[Xr] = null), (yl = Yr[--Xr]), (Yr[Xr] = null));
  for (; e === _r; ) ((_r = wt[--_t]), (wt[_t] = null), (fn = wt[--_t]), (wt[_t] = null), (dn = wt[--_t]), (wt[_t] = null));
}
var gt = null,
  ht = null,
  Ee = !1,
  It = null;
function _m(e, t) {
  var n = St(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Kf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (gt = e), (ht = Un(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (gt = e), (ht = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = _r !== null ? { id: dn, overflow: fn } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = St(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (gt = e),
            (ht = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ju(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ec(e) {
  if (Ee) {
    var t = ht;
    if (t) {
      var n = t;
      if (!Kf(e, t)) {
        if (Ju(e)) throw Error(H(418));
        t = Un(n.nextSibling);
        var r = gt;
        t && Kf(e, t) ? _m(r, n) : ((e.flags = (e.flags & -4097) | 2), (Ee = !1), (gt = e));
      }
    } else {
      if (Ju(e)) throw Error(H(418));
      ((e.flags = (e.flags & -4097) | 2), (Ee = !1), (gt = e));
    }
  }
}
function Yf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  gt = e;
}
function vs(e) {
  if (e !== gt) return !1;
  if (!Ee) return (Yf(e), (Ee = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== "head" && t !== "body" && !Yu(e.type, e.memoizedProps))),
    t && (t = ht))
  ) {
    if (Ju(e)) throw (Sm(), Error(H(418)));
    for (; t; ) (_m(e, t), (t = Un(t.nextSibling)));
  }
  if ((Yf(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(H(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ht = Un(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ht = null;
    }
  } else ht = gt ? Un(e.stateNode.nextSibling) : null;
  return !0;
}
function Sm() {
  for (var e = ht; e; ) e = Un(e.nextSibling);
}
function go() {
  ((ht = gt = null), (Ee = !1));
}
function ld(e) {
  It === null ? (It = [e]) : It.push(e);
}
var i_ = _n.ReactCurrentBatchConfig;
function Fo(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(H(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(H(147, e));
      var o = r,
        i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var l = o.refs;
            s === null ? delete l[i] : (l[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(H(284));
    if (!n._owner) throw Error(H(290, e));
  }
  return e;
}
function xs(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(H(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
  );
}
function Xf(e) {
  var t = e._init;
  return t(e._payload);
}
function Em(e) {
  function t(h, m) {
    if (e) {
      var p = h.deletions;
      p === null ? ((h.deletions = [m]), (h.flags |= 16)) : p.push(m);
    }
  }
  function n(h, m) {
    if (!e) return null;
    for (; m !== null; ) (t(h, m), (m = m.sibling));
    return null;
  }
  function r(h, m) {
    for (h = new Map(); m !== null; ) (m.key !== null ? h.set(m.key, m) : h.set(m.index, m), (m = m.sibling));
    return h;
  }
  function o(h, m) {
    return ((h = Yn(h, m)), (h.index = 0), (h.sibling = null), h);
  }
  function i(h, m, p) {
    return (
      (h.index = p),
      e
        ? ((p = h.alternate), p !== null ? ((p = p.index), p < m ? ((h.flags |= 2), m) : p) : ((h.flags |= 2), m))
        : ((h.flags |= 1048576), m)
    );
  }
  function s(h) {
    return (e && h.alternate === null && (h.flags |= 2), h);
  }
  function l(h, m, p, w) {
    return m === null || m.tag !== 6 ? ((m = Ka(p, h.mode, w)), (m.return = h), m) : ((m = o(m, p)), (m.return = h), m);
  }
  function a(h, m, p, w) {
    var E = p.type;
    return E === Vr
      ? d(h, m, p.props.children, w, p.key)
      : m !== null && (m.elementType === E || (typeof E == "object" && E !== null && E.$$typeof === Rn && Xf(E) === m.type))
        ? ((w = o(m, p.props)), (w.ref = Fo(h, m, p)), (w.return = h), w)
        : ((w = Xs(p.type, p.key, p.props, null, h.mode, w)), (w.ref = Fo(h, m, p)), (w.return = h), w);
  }
  function u(h, m, p, w) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== p.containerInfo ||
      m.stateNode.implementation !== p.implementation
      ? ((m = Ya(p, h.mode, w)), (m.return = h), m)
      : ((m = o(m, p.children || [])), (m.return = h), m);
  }
  function d(h, m, p, w, E) {
    return m === null || m.tag !== 7 ? ((m = gr(p, h.mode, w, E)), (m.return = h), m) : ((m = o(m, p)), (m.return = h), m);
  }
  function c(h, m, p) {
    if ((typeof m == "string" && m !== "") || typeof m == "number") return ((m = Ka("" + m, h.mode, p)), (m.return = h), m);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case as:
          return ((p = Xs(m.type, m.key, m.props, null, h.mode, p)), (p.ref = Fo(h, null, m)), (p.return = h), p);
        case Hr:
          return ((m = Ya(m, h.mode, p)), (m.return = h), m);
        case Rn:
          var w = m._init;
          return c(h, w(m._payload), p);
      }
      if (Xo(m) || jo(m)) return ((m = gr(m, h.mode, p, null)), (m.return = h), m);
      xs(h, m);
    }
    return null;
  }
  function f(h, m, p, w) {
    var E = m !== null ? m.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number") return E !== null ? null : l(h, m, "" + p, w);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case as:
          return p.key === E ? a(h, m, p, w) : null;
        case Hr:
          return p.key === E ? u(h, m, p, w) : null;
        case Rn:
          return ((E = p._init), f(h, m, E(p._payload), w));
      }
      if (Xo(p) || jo(p)) return E !== null ? null : d(h, m, p, w, null);
      xs(h, p);
    }
    return null;
  }
  function y(h, m, p, w, E) {
    if ((typeof w == "string" && w !== "") || typeof w == "number") return ((h = h.get(p) || null), l(m, h, "" + w, E));
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case as:
          return ((h = h.get(w.key === null ? p : w.key) || null), a(m, h, w, E));
        case Hr:
          return ((h = h.get(w.key === null ? p : w.key) || null), u(m, h, w, E));
        case Rn:
          var b = w._init;
          return y(h, m, p, b(w._payload), E);
      }
      if (Xo(w) || jo(w)) return ((h = h.get(p) || null), d(m, h, w, E, null));
      xs(m, w);
    }
    return null;
  }
  function v(h, m, p, w) {
    for (var E = null, b = null, k = m, A = (m = 0), R = null; k !== null && A < p.length; A++) {
      k.index > A ? ((R = k), (k = null)) : (R = k.sibling);
      var z = f(h, k, p[A], w);
      if (z === null) {
        k === null && (k = R);
        break;
      }
      (e && k && z.alternate === null && t(h, k), (m = i(z, m, A)), b === null ? (E = z) : (b.sibling = z), (b = z), (k = R));
    }
    if (A === p.length) return (n(h, k), Ee && lr(h, A), E);
    if (k === null) {
      for (; A < p.length; A++)
        ((k = c(h, p[A], w)), k !== null && ((m = i(k, m, A)), b === null ? (E = k) : (b.sibling = k), (b = k)));
      return (Ee && lr(h, A), E);
    }
    for (k = r(h, k); A < p.length; A++)
      ((R = y(k, h, A, p[A], w)),
        R !== null &&
          (e && R.alternate !== null && k.delete(R.key === null ? A : R.key),
          (m = i(R, m, A)),
          b === null ? (E = R) : (b.sibling = R),
          (b = R)));
    return (
      e &&
        k.forEach(function (L) {
          return t(h, L);
        }),
      Ee && lr(h, A),
      E
    );
  }
  function x(h, m, p, w) {
    var E = jo(p);
    if (typeof E != "function") throw Error(H(150));
    if (((p = E.call(p)), p == null)) throw Error(H(151));
    for (var b = (E = null), k = m, A = (m = 0), R = null, z = p.next(); k !== null && !z.done; A++, z = p.next()) {
      k.index > A ? ((R = k), (k = null)) : (R = k.sibling);
      var L = f(h, k, z.value, w);
      if (L === null) {
        k === null && (k = R);
        break;
      }
      (e && k && L.alternate === null && t(h, k), (m = i(L, m, A)), b === null ? (E = L) : (b.sibling = L), (b = L), (k = R));
    }
    if (z.done) return (n(h, k), Ee && lr(h, A), E);
    if (k === null) {
      for (; !z.done; A++, z = p.next())
        ((z = c(h, z.value, w)), z !== null && ((m = i(z, m, A)), b === null ? (E = z) : (b.sibling = z), (b = z)));
      return (Ee && lr(h, A), E);
    }
    for (k = r(h, k); !z.done; A++, z = p.next())
      ((z = y(k, h, A, z.value, w)),
        z !== null &&
          (e && z.alternate !== null && k.delete(z.key === null ? A : z.key),
          (m = i(z, m, A)),
          b === null ? (E = z) : (b.sibling = z),
          (b = z)));
    return (
      e &&
        k.forEach(function (M) {
          return t(h, M);
        }),
      Ee && lr(h, A),
      E
    );
  }
  function S(h, m, p, w) {
    if (
      (typeof p == "object" && p !== null && p.type === Vr && p.key === null && (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case as:
          e: {
            for (var E = p.key, b = m; b !== null; ) {
              if (b.key === E) {
                if (((E = p.type), E === Vr)) {
                  if (b.tag === 7) {
                    (n(h, b.sibling), (m = o(b, p.props.children)), (m.return = h), (h = m));
                    break e;
                  }
                } else if (
                  b.elementType === E ||
                  (typeof E == "object" && E !== null && E.$$typeof === Rn && Xf(E) === b.type)
                ) {
                  (n(h, b.sibling), (m = o(b, p.props)), (m.ref = Fo(h, b, p)), (m.return = h), (h = m));
                  break e;
                }
                n(h, b);
                break;
              } else t(h, b);
              b = b.sibling;
            }
            p.type === Vr
              ? ((m = gr(p.props.children, h.mode, w, p.key)), (m.return = h), (h = m))
              : ((w = Xs(p.type, p.key, p.props, null, h.mode, w)), (w.ref = Fo(h, m, p)), (w.return = h), (h = w));
          }
          return s(h);
        case Hr:
          e: {
            for (b = p.key; m !== null; ) {
              if (m.key === b)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === p.containerInfo &&
                  m.stateNode.implementation === p.implementation
                ) {
                  (n(h, m.sibling), (m = o(m, p.children || [])), (m.return = h), (h = m));
                  break e;
                } else {
                  n(h, m);
                  break;
                }
              else t(h, m);
              m = m.sibling;
            }
            ((m = Ya(p, h.mode, w)), (m.return = h), (h = m));
          }
          return s(h);
        case Rn:
          return ((b = p._init), S(h, m, b(p._payload), w));
      }
      if (Xo(p)) return v(h, m, p, w);
      if (jo(p)) return x(h, m, p, w);
      xs(h, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        m !== null && m.tag === 6
          ? (n(h, m.sibling), (m = o(m, p)), (m.return = h), (h = m))
          : (n(h, m), (m = Ka(p, h.mode, w)), (m.return = h), (h = m)),
        s(h))
      : n(h, m);
  }
  return S;
}
var mo = Em(!0),
  bm = Em(!1),
  vl = er(null),
  xl = null,
  Qr = null,
  ad = null;
function ud() {
  ad = Qr = xl = null;
}
function cd(e) {
  var t = vl.current;
  (Se(vl), (e._currentValue = t));
}
function tc(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function so(e, t) {
  ((xl = e),
    (ad = Qr = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (it = !0), (e.firstContext = null)));
}
function bt(e) {
  var t = e._currentValue;
  if (ad !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Qr === null)) {
      if (xl === null) throw Error(H(308));
      ((Qr = e), (xl.dependencies = { lanes: 0, firstContext: e }));
    } else Qr = Qr.next = e;
  return t;
}
var dr = null;
function dd(e) {
  dr === null ? (dr = [e]) : dr.push(e);
}
function km(e, t, n, r) {
  var o = t.interleaved;
  return (o === null ? ((n.next = n), dd(t)) : ((n.next = o.next), (o.next = n)), (t.interleaved = n), vn(e, r));
}
function vn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var jn = !1;
function fd(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Nm(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function hn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Gn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), me & 2)) {
    var o = r.pending;
    return (o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)), (r.pending = t), vn(e, n));
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), dd(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    vn(e, n)
  );
}
function Ws(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Qc(e, n));
  }
}
function Qf(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        (i === null ? (o = i = s) : (i = i.next = s), (n = n.next));
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    ((n = { baseState: r.baseState, firstBaseUpdate: o, lastBaseUpdate: i, shared: r.shared, effects: r.effects }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t));
}
function wl(e, t, n, r) {
  var o = e.updateQueue;
  jn = !1;
  var i = o.firstBaseUpdate,
    s = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var a = l,
      u = a.next;
    ((a.next = null), s === null ? (i = u) : (s.next = u), (s = a));
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== s && (l === null ? (d.firstBaseUpdate = u) : (l.next = u), (d.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var c = o.baseState;
    ((s = 0), (d = u = a = null), (l = i));
    do {
      var f = l.lane,
        y = l.eventTime;
      if ((r & f) === f) {
        d !== null &&
          (d = d.next = { eventTime: y, lane: 0, tag: l.tag, payload: l.payload, callback: l.callback, next: null });
        e: {
          var v = e,
            x = l;
          switch (((f = t), (y = n), x.tag)) {
            case 1:
              if (((v = x.payload), typeof v == "function")) {
                c = v.call(y, c, f);
                break e;
              }
              c = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (((v = x.payload), (f = typeof v == "function" ? v.call(y, c, f) : v), f == null)) break e;
              c = Ae({}, c, f);
              break e;
            case 2:
              jn = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && ((e.flags |= 64), (f = o.effects), f === null ? (o.effects = [l]) : f.push(l));
      } else
        ((y = { eventTime: y, lane: f, tag: l.tag, payload: l.payload, callback: l.callback, next: null }),
          d === null ? ((u = d = y), (a = c)) : (d = d.next = y),
          (s |= f));
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        ((f = l), (l = f.next), (f.next = null), (o.lastBaseUpdate = f), (o.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (a = c),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = d),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((s |= o.lane), (o = o.next));
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    ((Er |= s), (e.lanes = s), (e.memoizedState = c));
  }
}
function Zf(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function")) throw Error(H(191, o));
        o.call(r);
      }
    }
}
var qi = {},
  Zt = er(qi),
  Ni = er(qi),
  Ci = er(qi);
function fr(e) {
  if (e === qi) throw Error(H(174));
  return e;
}
function pd(e, t) {
  switch ((xe(Ci, t), xe(Ni, e), xe(Zt, qi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ju(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = ju(t, e)));
  }
  (Se(Zt), xe(Zt, t));
}
function yo() {
  (Se(Zt), Se(Ni), Se(Ci));
}
function Cm(e) {
  fr(Ci.current);
  var t = fr(Zt.current),
    n = ju(t, e.type);
  t !== n && (xe(Ni, e), xe(Zt, n));
}
function hd(e) {
  Ni.current === e && (Se(Zt), Se(Ni));
}
var Ce = er(0);
function _l(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var Ha = [];
function gd() {
  for (var e = 0; e < Ha.length; e++) Ha[e]._workInProgressVersionPrimary = null;
  Ha.length = 0;
}
var Us = _n.ReactCurrentDispatcher,
  Va = _n.ReactCurrentBatchConfig,
  Sr = 0,
  Te = null,
  $e = null,
  He = null,
  Sl = !1,
  si = !1,
  Ti = 0,
  s_ = 0;
function Ke() {
  throw Error(H(321));
}
function md(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!$t(e[n], t[n])) return !1;
  return !0;
}
function yd(e, t, n, r, o, i) {
  if (
    ((Sr = i),
    (Te = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Us.current = e === null || e.memoizedState === null ? c_ : d_),
    (e = n(r, o)),
    si)
  ) {
    i = 0;
    do {
      if (((si = !1), (Ti = 0), 25 <= i)) throw Error(H(301));
      ((i += 1), (He = $e = null), (t.updateQueue = null), (Us.current = f_), (e = n(r, o)));
    } while (si);
  }
  if (((Us.current = El), (t = $e !== null && $e.next !== null), (Sr = 0), (He = $e = Te = null), (Sl = !1), t))
    throw Error(H(300));
  return e;
}
function vd() {
  var e = Ti !== 0;
  return ((Ti = 0), e);
}
function qt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (He === null ? (Te.memoizedState = He = e) : (He = He.next = e), He);
}
function kt() {
  if ($e === null) {
    var e = Te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = $e.next;
  var t = He === null ? Te.memoizedState : He.next;
  if (t !== null) ((He = t), ($e = e));
  else {
    if (e === null) throw Error(H(310));
    (($e = e),
      (e = {
        memoizedState: $e.memoizedState,
        baseState: $e.baseState,
        baseQueue: $e.baseQueue,
        queue: $e.queue,
        next: null,
      }),
      He === null ? (Te.memoizedState = He = e) : (He = He.next = e));
  }
  return He;
}
function Ai(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Wa(e) {
  var t = kt(),
    n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var r = $e,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var s = o.next;
      ((o.next = i.next), (i.next = s));
    }
    ((r.baseQueue = o = i), (n.pending = null));
  }
  if (o !== null) {
    ((i = o.next), (r = r.baseState));
    var l = (s = null),
      a = null,
      u = i;
    do {
      var d = u.lane;
      if ((Sr & d) === d)
        (a !== null &&
          (a = a.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var c = { lane: d, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null };
        (a === null ? ((l = a = c), (s = r)) : (a = a.next = c), (Te.lanes |= d), (Er |= d));
      }
      u = u.next;
    } while (u !== null && u !== i);
    (a === null ? (s = r) : (a.next = l),
      $t(r, t.memoizedState) || (it = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((i = o.lane), (Te.lanes |= i), (Er |= i), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ua(e) {
  var t = kt(),
    n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = (o = o.next);
    do ((i = e(i, s.action)), (s = s.next));
    while (s !== o);
    ($t(i, t.memoizedState) || (it = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function Tm() {}
function Am(e, t) {
  var n = Te,
    r = kt(),
    o = t(),
    i = !$t(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (it = !0)),
    (r = r.queue),
    xd(Im.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (He !== null && He.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), Mi(9, Pm.bind(null, n, r, o, t), void 0, null), Ve === null)) throw Error(H(349));
    Sr & 30 || Mm(n, t, o);
  }
  return o;
}
function Mm(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Te.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Pm(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Lm(t) && Rm(e));
}
function Im(e, t, n) {
  return n(function () {
    Lm(t) && Rm(e);
  });
}
function Lm(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !$t(e, n);
  } catch {
    return !0;
  }
}
function Rm(e) {
  var t = vn(e, 1);
  t !== null && Ot(t, e, 1, -1);
}
function Jf(e) {
  var t = qt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ai, lastRenderedState: e }),
    (t.queue = e),
    (e = e.dispatch = u_.bind(null, Te, e)),
    [t.memoizedState, e]
  );
}
function Mi(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Te.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Te.updateQueue = t), (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function jm() {
  return kt().memoizedState;
}
function Gs(e, t, n, r) {
  var o = qt();
  ((Te.flags |= e), (o.memoizedState = Mi(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Xl(e, t, n, r) {
  var o = kt();
  r = r === void 0 ? null : r;
  var i = void 0;
  if ($e !== null) {
    var s = $e.memoizedState;
    if (((i = s.destroy), r !== null && md(r, s.deps))) {
      o.memoizedState = Mi(t, n, i, r);
      return;
    }
  }
  ((Te.flags |= e), (o.memoizedState = Mi(1 | t, n, i, r)));
}
function ep(e, t) {
  return Gs(8390656, 8, e, t);
}
function xd(e, t) {
  return Xl(2048, 8, e, t);
}
function Dm(e, t) {
  return Xl(4, 2, e, t);
}
function Om(e, t) {
  return Xl(4, 4, e, t);
}
function $m(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function zm(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), Xl(4, 4, $m.bind(null, t, e), n));
}
function wd() {}
function Fm(e, t) {
  var n = kt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && md(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Bm(e, t) {
  var n = kt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && md(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Hm(e, t, n) {
  return Sr & 21
    ? ($t(n, t) || ((n = qg()), (Te.lanes |= n), (Er |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (it = !0)), (e.memoizedState = n));
}
function l_(e, t) {
  var n = ye;
  ((ye = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Va.transition;
  Va.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((ye = n), (Va.transition = r));
  }
}
function Vm() {
  return kt().memoizedState;
}
function a_(e, t, n) {
  var r = Kn(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Wm(e))) Um(t, n);
  else if (((n = km(e, t, n, r)), n !== null)) {
    var o = et();
    (Ot(n, e, r, o), Gm(n, t, r));
  }
}
function u_(e, t, n) {
  var r = Kn(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Wm(e)) Um(t, o);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && ((i = t.lastRenderedReducer), i !== null))
      try {
        var s = t.lastRenderedState,
          l = i(s, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), $t(l, s))) {
          var a = t.interleaved;
          (a === null ? ((o.next = o), dd(t)) : ((o.next = a.next), (a.next = o)), (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = km(e, t, o, r)), n !== null && ((o = et()), Ot(n, e, r, o), Gm(n, t, r)));
  }
}
function Wm(e) {
  var t = e.alternate;
  return e === Te || (t !== null && t === Te);
}
function Um(e, t) {
  si = Sl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function Gm(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Qc(e, n));
  }
}
var El = {
    readContext: bt,
    useCallback: Ke,
    useContext: Ke,
    useEffect: Ke,
    useImperativeHandle: Ke,
    useInsertionEffect: Ke,
    useLayoutEffect: Ke,
    useMemo: Ke,
    useReducer: Ke,
    useRef: Ke,
    useState: Ke,
    useDebugValue: Ke,
    useDeferredValue: Ke,
    useTransition: Ke,
    useMutableSource: Ke,
    useSyncExternalStore: Ke,
    useId: Ke,
    unstable_isNewReconciler: !1,
  },
  c_ = {
    readContext: bt,
    useCallback: function (e, t) {
      return ((qt().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: bt,
    useEffect: ep,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), Gs(4194308, 4, $m.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return Gs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Gs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = qt();
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
    },
    useReducer: function (e, t, n) {
      var r = qt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }),
        (r.queue = e),
        (e = e.dispatch = a_.bind(null, Te, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = qt();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Jf,
    useDebugValue: wd,
    useDeferredValue: function (e) {
      return (qt().memoizedState = e);
    },
    useTransition: function () {
      var e = Jf(!1),
        t = e[0];
      return ((e = l_.bind(null, e[1])), (qt().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Te,
        o = qt();
      if (Ee) {
        if (n === void 0) throw Error(H(407));
        n = n();
      } else {
        if (((n = t()), Ve === null)) throw Error(H(349));
        Sr & 30 || Mm(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        ep(Im.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Mi(9, Pm.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = qt(),
        t = Ve.identifierPrefix;
      if (Ee) {
        var n = fn,
          r = dn;
        ((n = (r & ~(1 << (32 - Dt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ti++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = s_++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  d_ = {
    readContext: bt,
    useCallback: Fm,
    useContext: bt,
    useEffect: xd,
    useImperativeHandle: zm,
    useInsertionEffect: Dm,
    useLayoutEffect: Om,
    useMemo: Bm,
    useReducer: Wa,
    useRef: jm,
    useState: function () {
      return Wa(Ai);
    },
    useDebugValue: wd,
    useDeferredValue: function (e) {
      var t = kt();
      return Hm(t, $e.memoizedState, e);
    },
    useTransition: function () {
      var e = Wa(Ai)[0],
        t = kt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tm,
    useSyncExternalStore: Am,
    useId: Vm,
    unstable_isNewReconciler: !1,
  },
  f_ = {
    readContext: bt,
    useCallback: Fm,
    useContext: bt,
    useEffect: xd,
    useImperativeHandle: zm,
    useInsertionEffect: Dm,
    useLayoutEffect: Om,
    useMemo: Bm,
    useReducer: Ua,
    useRef: jm,
    useState: function () {
      return Ua(Ai);
    },
    useDebugValue: wd,
    useDeferredValue: function (e) {
      var t = kt();
      return $e === null ? (t.memoizedState = e) : Hm(t, $e.memoizedState, e);
    },
    useTransition: function () {
      var e = Ua(Ai)[0],
        t = kt().memoizedState;
      return [e, t];
    },
    useMutableSource: Tm,
    useSyncExternalStore: Am,
    useId: Vm,
    unstable_isNewReconciler: !1,
  };
function At(e, t) {
  if (e && e.defaultProps) {
    ((t = Ae({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function nc(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Ae({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Ql = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Pr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = et(),
      o = Kn(e),
      i = hn(r, o);
    ((i.payload = t), n != null && (i.callback = n), (t = Gn(e, i, o)), t !== null && (Ot(t, e, o, r), Ws(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = et(),
      o = Kn(e),
      i = hn(r, o);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Gn(e, i, o)),
      t !== null && (Ot(t, e, o, r), Ws(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = et(),
      r = Kn(e),
      o = hn(n, r);
    ((o.tag = 2), t != null && (o.callback = t), (t = Gn(e, o, r)), t !== null && (Ot(t, e, r, n), Ws(t, e, r)));
  },
};
function tp(e, t, n, r, o, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Si(n, r) || !Si(o, i)
        : !0
  );
}
function qm(e, t, n) {
  var r = !1,
    o = Zn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = bt(i))
      : ((o = at(t) ? wr : Qe.current), (r = t.contextTypes), (i = (r = r != null) ? ho(e, o) : Zn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ql),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function np(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ql.enqueueReplaceState(t, t.state, null));
}
function rc(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), fd(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null ? (o.context = bt(i)) : ((i = at(t) ? wr : Qe.current), (o.context = ho(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (nc(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(),
      t !== o.state && Ql.enqueueReplaceState(o, o.state, null),
      wl(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function vo(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Fw(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Ga(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function oc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var p_ = typeof WeakMap == "function" ? WeakMap : Map;
function Km(e, t, n) {
  ((n = hn(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (kl || ((kl = !0), (hc = r)), oc(e, t));
    }),
    n
  );
}
function Ym(e, t, n) {
  ((n = hn(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        oc(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (oc(e, t), typeof r != "function" && (qn === null ? (qn = new Set([this])) : qn.add(this)));
        var s = t.stack;
        this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
      }),
    n
  );
}
function rp(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new p_();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = C_.bind(null, e, t, n)), t.then(e, e));
}
function op(e) {
  do {
    var t;
    if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ip(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = hn(-1, 1)), (t.tag = 2), Gn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var h_ = _n.ReactCurrentOwner,
  it = !1;
function Je(e, t, n, r) {
  t.child = e === null ? bm(t, null, n, r) : mo(t, e.child, n, r);
}
function sp(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    so(t, o),
    (r = yd(e, t, n, r, i, o)),
    (n = vd()),
    e !== null && !it
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), xn(e, t, o))
      : (Ee && n && id(t), (t.flags |= 1), Je(e, t, r, o), t.child)
  );
}
function lp(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Td(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Xm(e, t, i, r, o))
      : ((e = Xs(n.type, null, r, t, t.mode, o)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var s = i.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : Si), n(s, r) && e.ref === t.ref)) return xn(e, t, o);
  }
  return ((t.flags |= 1), (e = Yn(i, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function Xm(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Si(i, r) && e.ref === t.ref)
      if (((it = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0)) e.flags & 131072 && (it = !0);
      else return ((t.lanes = e.lanes), xn(e, t, o));
  }
  return ic(e, t, n, r, o);
}
function Qm(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1)) ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), xe(Jr, ft), (ft |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          xe(Jr, ft),
          (ft |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        xe(Jr, ft),
        (ft |= r));
    }
  else (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n), xe(Jr, ft), (ft |= r));
  return (Je(e, t, o, n), t.child);
}
function Zm(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function ic(e, t, n, r, o) {
  var i = at(n) ? wr : Qe.current;
  return (
    (i = ho(t, i)),
    so(t, o),
    (n = yd(e, t, n, r, i, o)),
    (r = vd()),
    e !== null && !it
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), xn(e, t, o))
      : (Ee && r && id(t), (t.flags |= 1), Je(e, t, n, o), t.child)
  );
}
function ap(e, t, n, r, o) {
  if (at(n)) {
    var i = !0;
    gl(t);
  } else i = !1;
  if ((so(t, o), t.stateNode === null)) (qs(e, t), qm(t, n, r), rc(t, n, r, o), (r = !0));
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null ? (u = bt(u)) : ((u = at(n) ? wr : Qe.current), (u = ho(t, u)));
    var d = n.getDerivedStateFromProps,
      c = typeof d == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    (c ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && np(t, s, r, u)),
      (jn = !1));
    var f = t.memoizedState;
    ((s.state = f),
      wl(t, r, s, o),
      (a = t.memoizedState),
      l !== r || f !== a || lt.current || jn
        ? (typeof d == "function" && (nc(t, n, d, r), (a = t.memoizedState)),
          (l = jn || tp(t, n, l, r, f, a, u))
            ? (c ||
                (typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" && s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), (r = !1)));
  } else {
    ((s = t.stateNode),
      Nm(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : At(t.type, l)),
      (s.props = u),
      (c = t.pendingProps),
      (f = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null ? (a = bt(a)) : ((a = at(n) ? wr : Qe.current), (a = ho(t, a))));
    var y = n.getDerivedStateFromProps;
    ((d = typeof y == "function" || typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function") ||
      ((l !== c || f !== a) && np(t, s, r, a)),
      (jn = !1),
      (f = t.memoizedState),
      (s.state = f),
      wl(t, r, s, o));
    var v = t.memoizedState;
    l !== c || f !== v || lt.current || jn
      ? (typeof y == "function" && (nc(t, n, y, r), (v = t.memoizedState)),
        (u = jn || tp(t, n, u, r, f, v, a) || !1)
          ? (d ||
              (typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, v, a),
              typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, v, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (s.props = r),
        (s.state = v),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != "function" || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return sc(e, t, n, r, i, o);
}
function sc(e, t, n, r, o, i) {
  Zm(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return (o && qf(t, n, !1), xn(e, t, i));
  ((r = t.stateNode), (h_.current = t));
  var l = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s ? ((t.child = mo(t, e.child, null, i)), (t.child = mo(t, null, l, i))) : Je(e, t, l, i),
    (t.memoizedState = r.state),
    o && qf(t, n, !0),
    t.child
  );
}
function Jm(e) {
  var t = e.stateNode;
  (t.pendingContext ? Gf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gf(e, t.context, !1),
    pd(e, t.containerInfo));
}
function up(e, t, n, r, o) {
  return (go(), ld(o), (t.flags |= 256), Je(e, t, n, r), t.child);
}
var lc = { dehydrated: null, treeContext: null, retryLane: 0 };
function ac(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function e0(e, t, n) {
  var r = t.pendingProps,
    o = Ce.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) || (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l ? ((i = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (o |= 1),
    xe(Ce, o & 1),
    e === null)
  )
    return (
      ec(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && i !== null ? ((i.childLanes = 0), (i.pendingProps = s)) : (i = ea(s, r, 0, null)),
              (e = gr(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = ac(n)),
              (t.memoizedState = lc),
              e)
            : _d(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null))) return g_(e, t, s, r, l, o, n);
  if (i) {
    ((i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling));
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== o
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = a), (t.deletions = null))
        : ((r = Yn(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = Yn(l, i)) : ((i = gr(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s = s === null ? ac(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = lc),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Yn(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function _d(e, t) {
  return ((t = ea({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t));
}
function ws(e, t, n, r) {
  return (
    r !== null && ld(r),
    mo(t, e.child, null, n),
    (e = _d(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function g_(e, t, n, r, o, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Ga(Error(H(422)))), ws(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = ea({ mode: "visible", children: r.children }, o, 0, null)),
          (i = gr(i, o, s, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && mo(t, e.child, null, s),
          (t.child.memoizedState = ac(s)),
          (t.memoizedState = lc),
          i);
  if (!(t.mode & 1)) return ws(e, t, s, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return ((r = l), (i = Error(H(419))), (r = Ga(i, r, void 0)), ws(e, t, s, r));
  }
  if (((l = (s & e.childLanes) !== 0), it || l)) {
    if (((r = Ve), r !== null)) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (r.suspendedLanes | s) ? 0 : o),
        o !== 0 && o !== i.retryLane && ((i.retryLane = o), vn(e, o), Ot(r, e, o, -1)));
    }
    return (Cd(), (r = Ga(Error(H(421)))), ws(e, t, s, r));
  }
  return o.data === "$?"
    ? ((t.flags |= 128), (t.child = e.child), (t = T_.bind(null, e)), (o._reactRetry = t), null)
    : ((e = i.treeContext),
      (ht = Un(o.nextSibling)),
      (gt = t),
      (Ee = !0),
      (It = null),
      e !== null && ((wt[_t++] = dn), (wt[_t++] = fn), (wt[_t++] = _r), (dn = e.id), (fn = e.overflow), (_r = t)),
      (t = _d(t, r.children)),
      (t.flags |= 4096),
      t);
}
function cp(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), tc(e.return, t, n));
}
function qa(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: o })
    : ((i.isBackwards = t), (i.rendering = null), (i.renderingStartTime = 0), (i.last = r), (i.tail = n), (i.tailMode = o));
}
function t0(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((Je(e, t, r.children, n), (r = Ce.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cp(e, n, t);
        else if (e.tag === 19) cp(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((xe(Ce, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          ((e = n.alternate), e !== null && _l(e) === null && (o = n), (n = n.sibling));
        ((n = o), n === null ? ((o = t.child), (t.child = null)) : ((o = n.sibling), (n.sibling = null)), qa(t, !1, o, n, i));
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && _l(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        qa(t, !0, n, null, i);
        break;
      case "together":
        qa(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function qs(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function xn(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Er |= t.lanes), !(n & t.childLanes))) return null;
  if (e !== null && t.child !== e.child) throw Error(H(153));
  if (t.child !== null) {
    for (e = t.child, n = Yn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      ((e = e.sibling), (n = n.sibling = Yn(e, e.pendingProps)), (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function m_(e, t, n) {
  switch (t.tag) {
    case 3:
      (Jm(t), go());
      break;
    case 5:
      Cm(t);
      break;
    case 1:
      at(t.type) && gl(t);
      break;
    case 4:
      pd(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (xe(vl, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (xe(Ce, Ce.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? e0(e, t, n)
            : (xe(Ce, Ce.current & 1), (e = xn(e, t, n)), e !== null ? e.sibling : null);
      xe(Ce, Ce.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return t0(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null && ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        xe(Ce, Ce.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Qm(e, t, n));
  }
  return xn(e, t, n);
}
var n0, uc, r0, o0;
n0 = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
uc = function () {};
r0 = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), fr(Zt.current));
    var i = null;
    switch (n) {
      case "input":
        ((o = Pu(e, o)), (r = Pu(e, r)), (i = []));
        break;
      case "select":
        ((o = Ae({}, o, { value: void 0 })), (r = Ae({}, r, { value: void 0 })), (i = []));
        break;
      case "textarea":
        ((o = Ru(e, o)), (r = Ru(e, r)), (i = []));
        break;
      default:
        typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = pl);
    }
    Du(n, r);
    var s;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var l = o[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (gi.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (((l = o != null ? o[u] : void 0), r.hasOwnProperty(u) && a !== l && (a != null || l != null)))
        if (u === "style")
          if (l) {
            for (s in l) !l.hasOwnProperty(s) || (a && a.hasOwnProperty(s)) || (n || (n = {}), (n[s] = ""));
            for (s in a) a.hasOwnProperty(s) && l[s] !== a[s] && (n || (n = {}), (n[s] = a[s]));
          } else (n || (i || (i = []), i.push(u, n)), (n = a));
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0), (l = l ? l.__html : void 0), a != null && l !== a && (i = i || []).push(u, a))
            : u === "children"
              ? (typeof a != "string" && typeof a != "number") || (i = i || []).push(u, "" + a)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (gi.hasOwnProperty(u)
                  ? (a != null && u === "onScroll" && _e("scroll", e), i || l === a || (i = []))
                  : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
o0 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Bo(e, t) {
  if (!Ee)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
        r === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
    }
}
function Ye(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling));
  else
    for (o = e.child; o !== null; )
      ((n |= o.lanes | o.childLanes), (r |= o.subtreeFlags), (r |= o.flags), (o.return = e), (o = o.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function y_(e, t, n) {
  var r = t.pendingProps;
  switch ((sd(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (Ye(t), null);
    case 1:
      return (at(t.type) && hl(), Ye(t), null);
    case 3:
      return (
        (r = t.stateNode),
        yo(),
        Se(lt),
        Se(Qe),
        gd(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (vs(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), It !== null && (yc(It), (It = null)))),
        uc(e, t),
        Ye(t),
        null
      );
    case 5:
      hd(t);
      var o = fr(Ci.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (r0(e, t, n, r, o), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(H(166));
          return (Ye(t), null);
        }
        if (((e = fr(Zt.current)), vs(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Yt] = t), (r[ki] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (_e("cancel", r), _e("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              _e("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Zo.length; o++) _e(Zo[o], r);
              break;
            case "source":
              _e("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (_e("error", r), _e("load", r));
              break;
            case "details":
              _e("toggle", r);
              break;
            case "input":
              (xf(r, i), _e("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }), _e("invalid", r));
              break;
            case "textarea":
              (_f(r, i), _e("invalid", r));
          }
          (Du(n, i), (o = null));
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var l = i[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 && ys(r.textContent, l, e), (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 && ys(r.textContent, l, e), (o = ["children", "" + l]))
                : gi.hasOwnProperty(s) && l != null && s === "onScroll" && _e("scroll", r);
            }
          switch (n) {
            case "input":
              (us(r), wf(r, i, !0));
              break;
            case "textarea":
              (us(r), Sf(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = pl);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((s = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ig(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")), (e.innerHTML = "<script><\/script>"), (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === "select" && ((s = e), r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Yt] = t),
            (e[ki] = r),
            n0(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((s = Ou(n, r)), n)) {
              case "dialog":
                (_e("cancel", e), _e("close", e), (o = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (_e("load", e), (o = r));
                break;
              case "video":
              case "audio":
                for (o = 0; o < Zo.length; o++) _e(Zo[o], e);
                o = r;
                break;
              case "source":
                (_e("error", e), (o = r));
                break;
              case "img":
              case "image":
              case "link":
                (_e("error", e), _e("load", e), (o = r));
                break;
              case "details":
                (_e("toggle", e), (o = r));
                break;
              case "input":
                (xf(e, r), (o = Pu(e, r)), _e("invalid", e));
                break;
              case "option":
                o = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }), (o = Ae({}, r, { value: void 0 })), _e("invalid", e));
                break;
              case "textarea":
                (_f(e, r), (o = Ru(e, r)), _e("invalid", e));
                break;
              default:
                o = r;
            }
            (Du(n, o), (l = o));
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === "style"
                  ? jg(e, a)
                  : i === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Lg(e, a))
                    : i === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && mi(e, a)
                        : typeof a == "number" && mi(e, "" + a)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (gi.hasOwnProperty(i)
                          ? a != null && i === "onScroll" && _e("scroll", e)
                          : a != null && Uc(e, i, a, s));
              }
            switch (n) {
              case "input":
                (us(e), wf(e, r, !1));
                break;
              case "textarea":
                (us(e), Sf(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Qn(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null ? no(e, !!r.multiple, i, !1) : r.defaultValue != null && no(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = pl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (Ye(t), null);
    case 6:
      if (e && t.stateNode != null) o0(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(H(166));
        if (((n = fr(Ci.current)), fr(Zt.current), vs(t))) {
          if (((r = t.stateNode), (n = t.memoizedProps), (r[Yt] = t), (i = r.nodeValue !== n) && ((e = gt), e !== null)))
            switch (e.tag) {
              case 3:
                ys(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ys(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[Yt] = t), (t.stateNode = r));
      }
      return (Ye(t), null);
    case 13:
      if ((Se(Ce), (r = t.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
        if (Ee && ht !== null && t.mode & 1 && !(t.flags & 128)) (Sm(), go(), (t.flags |= 98560), (i = !1));
        else if (((i = vs(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(H(318));
            if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i)) throw Error(H(317));
            i[Yt] = t;
          } else (go(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
          (Ye(t), (i = !1));
        } else (It !== null && (yc(It), (It = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192), t.mode & 1 && (e === null || Ce.current & 1 ? ze === 0 && (ze = 3) : Cd())),
          t.updateQueue !== null && (t.flags |= 4),
          Ye(t),
          null);
    case 4:
      return (yo(), uc(e, t), e === null && Ei(t.stateNode.containerInfo), Ye(t), null);
    case 10:
      return (cd(t.type._context), Ye(t), null);
    case 17:
      return (at(t.type) && hl(), Ye(t), null);
    case 19:
      if ((Se(Ce), (i = t.memoizedState), i === null)) return (Ye(t), null);
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) Bo(i, !1);
        else {
          if (ze !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = _l(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Bo(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling));
                return (xe(Ce, (Ce.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null && Re() > xo && ((t.flags |= 128), (r = !0), Bo(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = _l(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Bo(i, !0),
              i.tail === null && i.tailMode === "hidden" && !s.alternate && !Ee)
            )
              return (Ye(t), null);
          } else
            2 * Re() - i.renderingStartTime > xo &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Bo(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last), n !== null ? (n.sibling = s) : (t.child = s), (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = Re()),
          (t.sibling = null),
          (n = Ce.current),
          xe(Ce, r ? (n & 1) | 2 : n & 1),
          t)
        : (Ye(t), null);
    case 22:
    case 23:
      return (
        Nd(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1 ? ft & 1073741824 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(H(156, t.tag));
}
function v_(e, t) {
  switch ((sd(t), t.tag)) {
    case 1:
      return (at(t.type) && hl(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 3:
      return (
        yo(),
        Se(lt),
        Se(Qe),
        gd(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (hd(t), null);
    case 13:
      if ((Se(Ce), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(H(340));
        go();
      }
      return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 19:
      return (Se(Ce), null);
    case 4:
      return (yo(), null);
    case 10:
      return (cd(t.type._context), null);
    case 22:
    case 23:
      return (Nd(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var _s = !1,
  Xe = !1,
  x_ = typeof WeakSet == "function" ? WeakSet : Set,
  K = null;
function Zr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Me(e, t, r);
      }
    else n.current = null;
}
function cc(e, t, n) {
  try {
    n();
  } catch (r) {
    Me(e, t, r);
  }
}
var dp = !1;
function w_(e, t) {
  if (((qu = cl), (e = um()), od(e))) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            d = 0,
            c = e,
            f = null;
          t: for (;;) {
            for (
              var y;
              c !== n || (o !== 0 && c.nodeType !== 3) || (l = s + o),
                c !== i || (r !== 0 && c.nodeType !== 3) || (a = s + r),
                c.nodeType === 3 && (s += c.nodeValue.length),
                (y = c.firstChild) !== null;
            )
              ((f = c), (c = y));
            for (;;) {
              if (c === e) break t;
              if ((f === n && ++u === o && (l = s), f === i && ++d === r && (a = s), (y = c.nextSibling) !== null)) break;
              ((c = f), (f = c.parentNode));
            }
            c = y;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ku = { focusedElem: e, selectionRange: n }, cl = !1, K = t; K !== null; )
    if (((t = K), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) ((e.return = t), (K = e));
    else
      for (; K !== null; ) {
        t = K;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var x = v.memoizedProps,
                    S = v.memoizedState,
                    h = t.stateNode,
                    m = h.getSnapshotBeforeUpdate(t.elementType === t.type ? x : At(t.type, x), S);
                  h.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(H(163));
            }
        } catch (w) {
          Me(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (K = e));
          break;
        }
        K = t.return;
      }
  return ((v = dp), (dp = !1), v);
}
function li(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        ((o.destroy = void 0), i !== void 0 && cc(t, n, i));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Zl(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function dc(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function i0(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), i0(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && (delete t[Yt], delete t[ki], delete t[Qu], delete t[n_], delete t[r_])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function s0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function fp(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || s0(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function fc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = pl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (fc(e, t, n), e = e.sibling; e !== null; ) (fc(e, t, n), (e = e.sibling));
}
function pc(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (pc(e, t, n), e = e.sibling; e !== null; ) (pc(e, t, n), (e = e.sibling));
}
var We = null,
  Mt = !1;
function Cn(e, t, n) {
  for (n = n.child; n !== null; ) (l0(e, t, n), (n = n.sibling));
}
function l0(e, t, n) {
  if (Qt && typeof Qt.onCommitFiberUnmount == "function")
    try {
      Qt.onCommitFiberUnmount(Wl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Xe || Zr(n, t);
    case 6:
      var r = We,
        o = Mt;
      ((We = null),
        Cn(e, t, n),
        (We = r),
        (Mt = o),
        We !== null &&
          (Mt
            ? ((e = We), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : We.removeChild(n.stateNode)));
      break;
    case 18:
      We !== null &&
        (Mt
          ? ((e = We), (n = n.stateNode), e.nodeType === 8 ? Fa(e.parentNode, n) : e.nodeType === 1 && Fa(e, n), wi(e))
          : Fa(We, n.stateNode));
      break;
    case 4:
      ((r = We), (o = Mt), (We = n.stateNode.containerInfo), (Mt = !0), Cn(e, t, n), (We = r), (Mt = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Xe && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        o = r = r.next;
        do {
          var i = o,
            s = i.destroy;
          ((i = i.tag), s !== void 0 && (i & 2 || i & 4) && cc(n, t, s), (o = o.next));
        } while (o !== r);
      }
      Cn(e, t, n);
      break;
    case 1:
      if (!Xe && (Zr(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
        try {
          ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
        } catch (l) {
          Me(n, t, l);
        }
      Cn(e, t, n);
      break;
    case 21:
      Cn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? ((Xe = (r = Xe) || n.memoizedState !== null), Cn(e, t, n), (Xe = r)) : Cn(e, t, n);
      break;
    default:
      Cn(e, t, n);
  }
}
function pp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new x_()),
      t.forEach(function (r) {
        var o = A_.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      }));
  }
}
function Tt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              ((We = l.stateNode), (Mt = !1));
              break e;
            case 3:
              ((We = l.stateNode.containerInfo), (Mt = !0));
              break e;
            case 4:
              ((We = l.stateNode.containerInfo), (Mt = !0));
              break e;
          }
          l = l.return;
        }
        if (We === null) throw Error(H(160));
        (l0(i, s, o), (We = null), (Mt = !1));
        var a = o.alternate;
        (a !== null && (a.return = null), (o.return = null));
      } catch (u) {
        Me(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (a0(t, e), (t = t.sibling));
}
function a0(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Tt(t, e), Wt(e), r & 4)) {
        try {
          (li(3, e, e.return), Zl(3, e));
        } catch (x) {
          Me(e, e.return, x);
        }
        try {
          li(5, e, e.return);
        } catch (x) {
          Me(e, e.return, x);
        }
      }
      break;
    case 1:
      (Tt(t, e), Wt(e), r & 512 && n !== null && Zr(n, n.return));
      break;
    case 5:
      if ((Tt(t, e), Wt(e), r & 512 && n !== null && Zr(n, n.return), e.flags & 32)) {
        var o = e.stateNode;
        try {
          mi(o, "");
        } catch (x) {
          Me(e, e.return, x);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (l === "input" && i.type === "radio" && i.name != null && Mg(o, i), Ou(l, s));
            var u = Ou(l, i);
            for (s = 0; s < a.length; s += 2) {
              var d = a[s],
                c = a[s + 1];
              d === "style"
                ? jg(o, c)
                : d === "dangerouslySetInnerHTML"
                  ? Lg(o, c)
                  : d === "children"
                    ? mi(o, c)
                    : Uc(o, d, c, u);
            }
            switch (l) {
              case "input":
                Iu(o, i);
                break;
              case "textarea":
                Pg(o, i);
                break;
              case "select":
                var f = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? no(o, !!i.multiple, y, !1)
                  : f !== !!i.multiple &&
                    (i.defaultValue != null
                      ? no(o, !!i.multiple, i.defaultValue, !0)
                      : no(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[ki] = i;
          } catch (x) {
            Me(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Tt(t, e), Wt(e), r & 4)) {
        if (e.stateNode === null) throw Error(H(162));
        ((o = e.stateNode), (i = e.memoizedProps));
        try {
          o.nodeValue = i;
        } catch (x) {
          Me(e, e.return, x);
        }
      }
      break;
    case 3:
      if ((Tt(t, e), Wt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          wi(t.containerInfo);
        } catch (x) {
          Me(e, e.return, x);
        }
      break;
    case 4:
      (Tt(t, e), Wt(e));
      break;
    case 13:
      (Tt(t, e),
        Wt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i || (o.alternate !== null && o.alternate.memoizedState !== null) || (bd = Re())),
        r & 4 && pp(e));
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Xe = (u = Xe) || d), Tt(t, e), (Xe = u)) : Tt(t, e),
        Wt(e),
        r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !d && e.mode & 1))
          for (K = e, d = e.child; d !== null; ) {
            for (c = K = d; K !== null; ) {
              switch (((f = K), (y = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  li(4, f, f.return);
                  break;
                case 1:
                  Zr(f, f.return);
                  var v = f.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    ((r = f), (n = f.return));
                    try {
                      ((t = r), (v.props = t.memoizedProps), (v.state = t.memoizedState), v.componentWillUnmount());
                    } catch (x) {
                      Me(r, n, x);
                    }
                  }
                  break;
                case 5:
                  Zr(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    gp(c);
                    continue;
                  }
              }
              y !== null ? ((y.return = f), (K = y)) : gp(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = e; ; ) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                ((o = c.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = c.stateNode),
                      (a = c.memoizedProps.style),
                      (s = a != null && a.hasOwnProperty("display") ? a.display : null),
                      (l.style.display = Rg("display", s))));
              } catch (x) {
                Me(e, e.return, x);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = u ? "" : c.memoizedProps;
              } catch (x) {
                Me(e, e.return, x);
              }
          } else if (((c.tag !== 22 && c.tag !== 23) || c.memoizedState === null || c === e) && c.child !== null) {
            ((c.child.return = c), (c = c.child));
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            (d === c && (d = null), (c = c.return));
          }
          (d === c && (d = null), (c.sibling.return = c.return), (c = c.sibling));
        }
      }
      break;
    case 19:
      (Tt(t, e), Wt(e), r & 4 && pp(e));
      break;
    case 21:
      break;
    default:
      (Tt(t, e), Wt(e));
  }
}
function Wt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (s0(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(H(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (mi(o, ""), (r.flags &= -33));
          var i = fp(e);
          pc(e, i, o);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = fp(e);
          fc(e, l, s);
          break;
        default:
          throw Error(H(161));
      }
    } catch (a) {
      Me(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function __(e, t, n) {
  ((K = e), u0(e));
}
function u0(e, t, n) {
  for (var r = (e.mode & 1) !== 0; K !== null; ) {
    var o = K,
      i = o.child;
    if (o.tag === 22 && r) {
      var s = o.memoizedState !== null || _s;
      if (!s) {
        var l = o.alternate,
          a = (l !== null && l.memoizedState !== null) || Xe;
        l = _s;
        var u = Xe;
        if (((_s = s), (Xe = a) && !u))
          for (K = o; K !== null; )
            ((s = K),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null ? mp(o) : a !== null ? ((a.return = s), (K = a)) : mp(o));
        for (; i !== null; ) ((K = i), u0(i), (i = i.sibling));
        ((K = o), (_s = l), (Xe = u));
      }
      hp(e);
    } else o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (K = i)) : hp(e);
  }
}
function hp(e) {
  for (; K !== null; ) {
    var t = K;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Xe || Zl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Xe)
                if (n === null) r.componentDidMount();
                else {
                  var o = t.elementType === t.type ? n.memoizedProps : At(t.type, n.memoizedProps);
                  r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var i = t.updateQueue;
              i !== null && Zf(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Zf(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && wi(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(H(163));
          }
        Xe || (t.flags & 512 && dc(t));
      } catch (f) {
        Me(t, t.return, f);
      }
    }
    if (t === e) {
      K = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (K = n));
      break;
    }
    K = t.return;
  }
}
function gp(e) {
  for (; K !== null; ) {
    var t = K;
    if (t === e) {
      K = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (K = n));
      break;
    }
    K = t.return;
  }
}
function mp(e) {
  for (; K !== null; ) {
    var t = K;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Zl(4, t);
          } catch (a) {
            Me(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              Me(t, o, a);
            }
          }
          var i = t.return;
          try {
            dc(t);
          } catch (a) {
            Me(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            dc(t);
          } catch (a) {
            Me(t, s, a);
          }
      }
    } catch (a) {
      Me(t, t.return, a);
    }
    if (t === e) {
      K = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      ((l.return = t.return), (K = l));
      break;
    }
    K = t.return;
  }
}
var S_ = Math.ceil,
  bl = _n.ReactCurrentDispatcher,
  Sd = _n.ReactCurrentOwner,
  Et = _n.ReactCurrentBatchConfig,
  me = 0,
  Ve = null,
  je = null,
  Ue = 0,
  ft = 0,
  Jr = er(0),
  ze = 0,
  Pi = null,
  Er = 0,
  Jl = 0,
  Ed = 0,
  ai = null,
  ot = null,
  bd = 0,
  xo = 1 / 0,
  un = null,
  kl = !1,
  hc = null,
  qn = null,
  Ss = !1,
  Fn = null,
  Nl = 0,
  ui = 0,
  gc = null,
  Ks = -1,
  Ys = 0;
function et() {
  return me & 6 ? Re() : Ks !== -1 ? Ks : (Ks = Re());
}
function Kn(e) {
  return e.mode & 1
    ? me & 2 && Ue !== 0
      ? Ue & -Ue
      : i_.transition !== null
        ? (Ys === 0 && (Ys = qg()), Ys)
        : ((e = ye), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : em(e.type))), e)
    : 1;
}
function Ot(e, t, n, r) {
  if (50 < ui) throw ((ui = 0), (gc = null), Error(H(185)));
  (Wi(e, n, r),
    (!(me & 2) || e !== Ve) &&
      (e === Ve && (!(me & 2) && (Jl |= n), ze === 4 && On(e, Ue)),
      ut(e, r),
      n === 1 && me === 0 && !(t.mode & 1) && ((xo = Re() + 500), Yl && tr())));
}
function ut(e, t) {
  var n = e.callbackNode;
  i1(e, t);
  var r = ul(e, e === Ve ? Ue : 0);
  if (r === 0) (n !== null && kf(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && kf(n), t === 1))
      (e.tag === 0 ? o_(yp.bind(null, e)) : xm(yp.bind(null, e)),
        e_(function () {
          !(me & 6) && tr();
        }),
        (n = null));
    else {
      switch (Kg(r)) {
        case 1:
          n = Xc;
          break;
        case 4:
          n = Ug;
          break;
        case 16:
          n = al;
          break;
        case 536870912:
          n = Gg;
          break;
        default:
          n = al;
      }
      n = y0(n, c0.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function c0(e, t) {
  if (((Ks = -1), (Ys = 0), me & 6)) throw Error(H(327));
  var n = e.callbackNode;
  if (lo() && e.callbackNode !== n) return null;
  var r = ul(e, e === Ve ? Ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Cl(e, r);
  else {
    t = r;
    var o = me;
    me |= 2;
    var i = f0();
    (Ve !== e || Ue !== t) && ((un = null), (xo = Re() + 500), hr(e, t));
    do
      try {
        k_();
        break;
      } catch (l) {
        d0(e, l);
      }
    while (!0);
    (ud(), (bl.current = i), (me = o), je !== null ? (t = 0) : ((Ve = null), (Ue = 0), (t = ze)));
  }
  if (t !== 0) {
    if ((t === 2 && ((o = Hu(e)), o !== 0 && ((r = o), (t = mc(e, o)))), t === 1))
      throw ((n = Pi), hr(e, 0), On(e, r), ut(e, Re()), n);
    if (t === 6) On(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) && !E_(o) && ((t = Cl(e, r)), t === 2 && ((i = Hu(e)), i !== 0 && ((r = i), (t = mc(e, i)))), t === 1))
      )
        throw ((n = Pi), hr(e, 0), On(e, r), ut(e, Re()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(H(345));
        case 2:
          ar(e, ot, un);
          break;
        case 3:
          if ((On(e, r), (r & 130023424) === r && ((t = bd + 500 - Re()), 10 < t))) {
            if (ul(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (et(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = Xu(ar.bind(null, e, ot, un), t);
            break;
          }
          ar(e, ot, un);
          break;
        case 4:
          if ((On(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var s = 31 - Dt(r);
            ((i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i));
          }
          if (
            ((r = o),
            (r = Re() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * S_(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Xu(ar.bind(null, e, ot, un), r);
            break;
          }
          ar(e, ot, un);
          break;
        case 5:
          ar(e, ot, un);
          break;
        default:
          throw Error(H(329));
      }
    }
  }
  return (ut(e, Re()), e.callbackNode === n ? c0.bind(null, e) : null);
}
function mc(e, t) {
  var n = ai;
  return (
    e.current.memoizedState.isDehydrated && (hr(e, t).flags |= 256),
    (e = Cl(e, t)),
    e !== 2 && ((t = ot), (ot = n), t !== null && yc(t)),
    e
  );
}
function yc(e) {
  ot === null ? (ot = e) : ot.push.apply(ot, e);
}
function E_(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!$t(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function On(e, t) {
  for (t &= ~Ed, t &= ~Jl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Dt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function yp(e) {
  if (me & 6) throw Error(H(327));
  lo();
  var t = ul(e, 0);
  if (!(t & 1)) return (ut(e, Re()), null);
  var n = Cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Hu(e);
    r !== 0 && ((t = r), (n = mc(e, r)));
  }
  if (n === 1) throw ((n = Pi), hr(e, 0), On(e, t), ut(e, Re()), n);
  if (n === 6) throw Error(H(345));
  return ((e.finishedWork = e.current.alternate), (e.finishedLanes = t), ar(e, ot, un), ut(e, Re()), null);
}
function kd(e, t) {
  var n = me;
  me |= 1;
  try {
    return e(t);
  } finally {
    ((me = n), me === 0 && ((xo = Re() + 500), Yl && tr()));
  }
}
function br(e) {
  Fn !== null && Fn.tag === 0 && !(me & 6) && lo();
  var t = me;
  me |= 1;
  var n = Et.transition,
    r = ye;
  try {
    if (((Et.transition = null), (ye = 1), e)) return e();
  } finally {
    ((ye = r), (Et.transition = n), (me = t), !(me & 6) && tr());
  }
}
function Nd() {
  ((ft = Jr.current), Se(Jr));
}
function hr(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), J1(n)), je !== null))
    for (n = je.return; n !== null; ) {
      var r = n;
      switch ((sd(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && hl());
          break;
        case 3:
          (yo(), Se(lt), Se(Qe), gd());
          break;
        case 5:
          hd(r);
          break;
        case 4:
          yo();
          break;
        case 13:
          Se(Ce);
          break;
        case 19:
          Se(Ce);
          break;
        case 10:
          cd(r.type._context);
          break;
        case 22:
        case 23:
          Nd();
      }
      n = n.return;
    }
  if (
    ((Ve = e),
    (je = e = Yn(e.current, null)),
    (Ue = ft = t),
    (ze = 0),
    (Pi = null),
    (Ed = Jl = Er = 0),
    (ot = ai = null),
    dr !== null)
  ) {
    for (t = 0; t < dr.length; t++)
      if (((n = dr[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          ((i.next = o), (r.next = s));
        }
        n.pending = r;
      }
    dr = null;
  }
  return e;
}
function d0(e, t) {
  do {
    var n = je;
    try {
      if ((ud(), (Us.current = El), Sl)) {
        for (var r = Te.memoizedState; r !== null; ) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Sl = !1;
      }
      if (((Sr = 0), (He = $e = Te = null), (si = !1), (Ti = 0), (Sd.current = null), n === null || n.return === null)) {
        ((ze = 1), (Pi = t), (je = null));
        break;
      }
      e: {
        var i = e,
          s = n.return,
          l = n,
          a = t;
        if (((t = Ue), (l.flags |= 32768), a !== null && typeof a == "object" && typeof a.then == "function")) {
          var u = a,
            d = l,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var f = d.alternate;
            f
              ? ((d.updateQueue = f.updateQueue), (d.memoizedState = f.memoizedState), (d.lanes = f.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var y = op(s);
          if (y !== null) {
            ((y.flags &= -257), ip(y, s, l, i, t), y.mode & 1 && rp(i, u, t), (t = y), (a = u));
            var v = t.updateQueue;
            if (v === null) {
              var x = new Set();
              (x.add(a), (t.updateQueue = x));
            } else v.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (rp(i, u, t), Cd());
              break e;
            }
            a = Error(H(426));
          }
        } else if (Ee && l.mode & 1) {
          var S = op(s);
          if (S !== null) {
            (!(S.flags & 65536) && (S.flags |= 256), ip(S, s, l, i, t), ld(vo(a, l)));
            break e;
          }
        }
        ((i = a = vo(a, l)), ze !== 4 && (ze = 2), ai === null ? (ai = [i]) : ai.push(i), (i = s));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var h = Km(i, a, t);
              Qf(i, h);
              break e;
            case 1:
              l = a;
              var m = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof m.getDerivedStateFromError == "function" ||
                  (p !== null && typeof p.componentDidCatch == "function" && (qn === null || !qn.has(p))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var w = Ym(i, l, t);
                Qf(i, w);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      h0(n);
    } catch (E) {
      ((t = E), je === n && n !== null && (je = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function f0() {
  var e = bl.current;
  return ((bl.current = El), e === null ? El : e);
}
function Cd() {
  ((ze === 0 || ze === 3 || ze === 2) && (ze = 4), Ve === null || (!(Er & 268435455) && !(Jl & 268435455)) || On(Ve, Ue));
}
function Cl(e, t) {
  var n = me;
  me |= 2;
  var r = f0();
  (Ve !== e || Ue !== t) && ((un = null), hr(e, t));
  do
    try {
      b_();
      break;
    } catch (o) {
      d0(e, o);
    }
  while (!0);
  if ((ud(), (me = n), (bl.current = r), je !== null)) throw Error(H(261));
  return ((Ve = null), (Ue = 0), ze);
}
function b_() {
  for (; je !== null; ) p0(je);
}
function k_() {
  for (; je !== null && !Xw(); ) p0(je);
}
function p0(e) {
  var t = m0(e.alternate, e, ft);
  ((e.memoizedProps = e.pendingProps), t === null ? h0(e) : (je = t), (Sd.current = null));
}
function h0(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = v_(n, t)), n !== null)) {
        ((n.flags &= 32767), (je = n));
        return;
      }
      if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((ze = 6), (je = null));
        return;
      }
    } else if (((n = y_(n, t, ft)), n !== null)) {
      je = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      je = t;
      return;
    }
    je = t = e;
  } while (t !== null);
  ze === 0 && (ze = 5);
}
function ar(e, t, n) {
  var r = ye,
    o = Et.transition;
  try {
    ((Et.transition = null), (ye = 1), N_(e, t, n, r));
  } finally {
    ((Et.transition = o), (ye = r));
  }
  return null;
}
function N_(e, t, n, r) {
  do lo();
  while (Fn !== null);
  if (me & 6) throw Error(H(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(H(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (s1(e, i),
    e === Ve && ((je = Ve = null), (Ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Ss ||
      ((Ss = !0),
      y0(al, function () {
        return (lo(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Et.transition), (Et.transition = null));
    var s = ye;
    ye = 1;
    var l = me;
    ((me |= 4),
      (Sd.current = null),
      w_(e, n),
      a0(n, e),
      G1(Ku),
      (cl = !!qu),
      (Ku = qu = null),
      (e.current = n),
      __(n),
      Qw(),
      (me = l),
      (ye = s),
      (Et.transition = i));
  } else e.current = n;
  if (
    (Ss && ((Ss = !1), (Fn = e), (Nl = o)),
    (i = e.pendingLanes),
    i === 0 && (qn = null),
    e1(n.stateNode),
    ut(e, Re()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (kl) throw ((kl = !1), (e = hc), (hc = null), e);
  return (
    Nl & 1 && e.tag !== 0 && lo(),
    (i = e.pendingLanes),
    i & 1 ? (e === gc ? ui++ : ((ui = 0), (gc = e))) : (ui = 0),
    tr(),
    null
  );
}
function lo() {
  if (Fn !== null) {
    var e = Kg(Nl),
      t = Et.transition,
      n = ye;
    try {
      if (((Et.transition = null), (ye = 16 > e ? 16 : e), Fn === null)) var r = !1;
      else {
        if (((e = Fn), (Fn = null), (Nl = 0), me & 6)) throw Error(H(331));
        var o = me;
        for (me |= 4, K = e.current; K !== null; ) {
          var i = K,
            s = i.child;
          if (K.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (K = u; K !== null; ) {
                  var d = K;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      li(8, d, i);
                  }
                  var c = d.child;
                  if (c !== null) ((c.return = d), (K = c));
                  else
                    for (; K !== null; ) {
                      d = K;
                      var f = d.sibling,
                        y = d.return;
                      if ((i0(d), d === u)) {
                        K = null;
                        break;
                      }
                      if (f !== null) {
                        ((f.return = y), (K = f));
                        break;
                      }
                      K = y;
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var x = v.child;
                if (x !== null) {
                  v.child = null;
                  do {
                    var S = x.sibling;
                    ((x.sibling = null), (x = S));
                  } while (x !== null);
                }
              }
              K = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) ((s.return = i), (K = s));
          else
            e: for (; K !== null; ) {
              if (((i = K), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    li(9, i, i.return);
                }
              var h = i.sibling;
              if (h !== null) {
                ((h.return = i.return), (K = h));
                break e;
              }
              K = i.return;
            }
        }
        var m = e.current;
        for (K = m; K !== null; ) {
          s = K;
          var p = s.child;
          if (s.subtreeFlags & 2064 && p !== null) ((p.return = s), (K = p));
          else
            e: for (s = m; K !== null; ) {
              if (((l = K), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Zl(9, l);
                  }
                } catch (E) {
                  Me(l, l.return, E);
                }
              if (l === s) {
                K = null;
                break e;
              }
              var w = l.sibling;
              if (w !== null) {
                ((w.return = l.return), (K = w));
                break e;
              }
              K = l.return;
            }
        }
        if (((me = o), tr(), Qt && typeof Qt.onPostCommitFiberRoot == "function"))
          try {
            Qt.onPostCommitFiberRoot(Wl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((ye = n), (Et.transition = t));
    }
  }
  return !1;
}
function vp(e, t, n) {
  ((t = vo(n, t)), (t = Km(e, t, 1)), (e = Gn(e, t, 1)), (t = et()), e !== null && (Wi(e, 1, t), ut(e, t)));
}
function Me(e, t, n) {
  if (e.tag === 3) vp(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        vp(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" && (qn === null || !qn.has(r)))
        ) {
          ((e = vo(n, e)), (e = Ym(t, e, 1)), (t = Gn(t, e, 1)), (e = et()), t !== null && (Wi(t, 1, e), ut(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function C_(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = et()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ve === e &&
      (Ue & n) === n &&
      (ze === 4 || (ze === 3 && (Ue & 130023424) === Ue && 500 > Re() - bd) ? hr(e, 0) : (Ed |= n)),
    ut(e, t));
}
function g0(e, t) {
  t === 0 && (e.mode & 1 ? ((t = fs), (fs <<= 1), !(fs & 130023424) && (fs = 4194304)) : (t = 1));
  var n = et();
  ((e = vn(e, t)), e !== null && (Wi(e, t, n), ut(e, n)));
}
function T_(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), g0(e, n));
}
function A_(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(H(314));
  }
  (r !== null && r.delete(t), g0(e, n));
}
var m0;
m0 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || lt.current) it = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((it = !1), m_(e, t, n));
      it = !!(e.flags & 131072);
    }
  else ((it = !1), Ee && t.flags & 1048576 && wm(t, yl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (qs(e, t), (e = t.pendingProps));
      var o = ho(t, Qe.current);
      (so(t, n), (o = yd(null, t, r, e, o, n)));
      var i = vd();
      return (
        (t.flags |= 1),
        typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            at(r) ? ((i = !0), gl(t)) : (i = !1),
            (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
            fd(t),
            (o.updater = Ql),
            (t.stateNode = o),
            (o._reactInternals = t),
            rc(t, r, e, n),
            (t = sc(null, t, r, !0, i, n)))
          : ((t.tag = 0), Ee && i && id(t), Je(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (qs(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = P_(r)),
          (e = At(r, e)),
          o)
        ) {
          case 0:
            t = ic(null, t, r, e, n);
            break e;
          case 1:
            t = ap(null, t, r, e, n);
            break e;
          case 11:
            t = sp(null, t, r, e, n);
            break e;
          case 14:
            t = lp(null, t, r, At(r.type, e), n);
            break e;
        }
        throw Error(H(306, r, ""));
      }
      return t;
    case 0:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : At(r, o)), ic(e, t, r, o, n));
    case 1:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : At(r, o)), ap(e, t, r, o, n));
    case 3:
      e: {
        if ((Jm(t), e === null)) throw Error(H(387));
        ((r = t.pendingProps), (i = t.memoizedState), (o = i.element), Nm(e, t), wl(t, r, null, n));
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((o = vo(Error(H(423)), t)), (t = up(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = vo(Error(H(424)), t)), (t = up(e, t, r, n, o)));
            break e;
          } else
            for (
              ht = Un(t.stateNode.containerInfo.firstChild), gt = t, Ee = !0, It = null, n = bm(t, null, r, n), t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((go(), r === o)) {
            t = xn(e, t, n);
            break e;
          }
          Je(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Cm(t),
        e === null && ec(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = o.children),
        Yu(r, o) ? (s = null) : i !== null && Yu(r, i) && (t.flags |= 32),
        Zm(e, t),
        Je(e, t, s, n),
        t.child
      );
    case 6:
      return (e === null && ec(t), null);
    case 13:
      return e0(e, t, n);
    case 4:
      return (
        pd(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = mo(t, null, r, n)) : Je(e, t, r, n),
        t.child
      );
    case 11:
      return ((r = t.type), (o = t.pendingProps), (o = t.elementType === r ? o : At(r, o)), sp(e, t, r, o, n));
    case 7:
      return (Je(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Je(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Je(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (s = o.value),
          xe(vl, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if ($t(i.value, s)) {
            if (i.children === o.children && !lt.current) {
              t = xn(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                s = i.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = hn(-1, n & -n)), (a.tag = 2));
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        (d === null ? (a.next = a) : ((a.next = d.next), (d.next = a)), (u.pending = a));
                      }
                    }
                    ((i.lanes |= n), (a = i.alternate), a !== null && (a.lanes |= n), tc(i.return, n, t), (l.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(H(341));
                ((s.lanes |= n), (l = s.alternate), l !== null && (l.lanes |= n), tc(s, n, t), (s = i.sibling));
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    ((i.return = s.return), (s = i));
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        (Je(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        so(t, n),
        (o = bt(o)),
        (r = r(o)),
        (t.flags |= 1),
        Je(e, t, r, n),
        t.child
      );
    case 14:
      return ((r = t.type), (o = At(r, t.pendingProps)), (o = At(r.type, o)), lp(e, t, r, o, n));
    case 15:
      return Xm(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : At(r, o)),
        qs(e, t),
        (t.tag = 1),
        at(r) ? ((e = !0), gl(t)) : (e = !1),
        so(t, n),
        qm(t, r, o),
        rc(t, r, o, n),
        sc(null, t, r, !0, e, n)
      );
    case 19:
      return t0(e, t, n);
    case 22:
      return Qm(e, t, n);
  }
  throw Error(H(156, t.tag));
};
function y0(e, t) {
  return Wg(e, t);
}
function M_(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function St(e, t, n, r) {
  return new M_(e, t, n, r);
}
function Td(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function P_(e) {
  if (typeof e == "function") return Td(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === qc)) return 11;
    if (e === Kc) return 14;
  }
  return 2;
}
function Yn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = St(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Xs(e, t, n, r, o, i) {
  var s = 2;
  if (((r = e), typeof e == "function")) Td(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Vr:
        return gr(n.children, o, i, t);
      case Gc:
        ((s = 8), (o |= 8));
        break;
      case Cu:
        return ((e = St(12, n, t, o | 2)), (e.elementType = Cu), (e.lanes = i), e);
      case Tu:
        return ((e = St(13, n, t, o)), (e.elementType = Tu), (e.lanes = i), e);
      case Au:
        return ((e = St(19, n, t, o)), (e.elementType = Au), (e.lanes = i), e);
      case Cg:
        return ea(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case kg:
              s = 10;
              break e;
            case Ng:
              s = 9;
              break e;
            case qc:
              s = 11;
              break e;
            case Kc:
              s = 14;
              break e;
            case Rn:
              ((s = 16), (r = null));
              break e;
          }
        throw Error(H(130, e == null ? e : typeof e, ""));
    }
  return ((t = St(s, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t);
}
function gr(e, t, n, r) {
  return ((e = St(7, e, r, t)), (e.lanes = n), e);
}
function ea(e, t, n, r) {
  return ((e = St(22, e, r, t)), (e.elementType = Cg), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e);
}
function Ka(e, t, n) {
  return ((e = St(6, e, null, t)), (e.lanes = n), e);
}
function Ya(e, t, n) {
  return (
    (t = St(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
    t
  );
}
function I_(e, t, n, r, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Aa(0)),
    (this.expirationTimes = Aa(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Aa(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function Ad(e, t, n, r, o, i, s, l, a) {
  return (
    (e = new I_(e, t, n, l, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = St(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }),
    fd(i),
    e
  );
}
function L_(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Hr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function v0(e) {
  if (!e) return Zn;
  e = e._reactInternals;
  e: {
    if (Pr(e) !== e || e.tag !== 1) throw Error(H(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (at(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(H(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (at(n)) return vm(e, n, t);
  }
  return t;
}
function x0(e, t, n, r, o, i, s, l, a) {
  return (
    (e = Ad(n, r, !0, e, o, i, s, l, a)),
    (e.context = v0(null)),
    (n = e.current),
    (r = et()),
    (o = Kn(n)),
    (i = hn(r, o)),
    (i.callback = t ?? null),
    Gn(n, i, o),
    (e.current.lanes = o),
    Wi(e, o, r),
    ut(e, r),
    e
  );
}
function ta(e, t, n, r) {
  var o = t.current,
    i = et(),
    s = Kn(o);
  return (
    (n = v0(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = hn(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Gn(o, t, s)),
    e !== null && (Ot(e, o, s, i), Ws(e, o, s)),
    s
  );
}
function Tl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function xp(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Md(e, t) {
  (xp(e, t), (e = e.alternate) && xp(e, t));
}
function R_() {
  return null;
}
var w0 =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Pd(e) {
  this._internalRoot = e;
}
na.prototype.render = Pd.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(H(409));
  ta(e, t, null, null);
};
na.prototype.unmount = Pd.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (br(function () {
      ta(null, e, null, null);
    }),
      (t[yn] = null));
  }
};
function na(e) {
  this._internalRoot = e;
}
na.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Qg();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Dn.length && t !== 0 && t < Dn[n].priority; n++);
    (Dn.splice(n, 0, e), n === 0 && Jg(e));
  }
};
function Id(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ra(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function wp() {}
function j_(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = Tl(s);
        i.call(u);
      };
    }
    var s = x0(t, r, e, 0, null, !1, !1, "", wp);
    return ((e._reactRootContainer = s), (e[yn] = s.current), Ei(e.nodeType === 8 ? e.parentNode : e), br(), s);
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = Tl(a);
      l.call(u);
    };
  }
  var a = Ad(e, 0, !1, null, null, !1, !1, "", wp);
  return (
    (e._reactRootContainer = a),
    (e[yn] = a.current),
    Ei(e.nodeType === 8 ? e.parentNode : e),
    br(function () {
      ta(t, a, n, r);
    }),
    a
  );
}
function oa(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var a = Tl(s);
        l.call(a);
      };
    }
    ta(t, s, e, o);
  } else s = j_(n, t, e, o, r);
  return Tl(s);
}
Yg = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Qo(t.pendingLanes);
        n !== 0 && (Qc(t, n | 1), ut(t, Re()), !(me & 6) && ((xo = Re() + 500), tr()));
      }
      break;
    case 13:
      (br(function () {
        var r = vn(e, 1);
        if (r !== null) {
          var o = et();
          Ot(r, e, 1, o);
        }
      }),
        Md(e, 1));
  }
};
Zc = function (e) {
  if (e.tag === 13) {
    var t = vn(e, 134217728);
    if (t !== null) {
      var n = et();
      Ot(t, e, 134217728, n);
    }
    Md(e, 134217728);
  }
};
Xg = function (e) {
  if (e.tag === 13) {
    var t = Kn(e),
      n = vn(e, t);
    if (n !== null) {
      var r = et();
      Ot(n, e, t, r);
    }
    Md(e, t);
  }
};
Qg = function () {
  return ye;
};
Zg = function (e, t) {
  var n = ye;
  try {
    return ((ye = e), t());
  } finally {
    ye = n;
  }
};
zu = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Iu(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Kl(r);
            if (!o) throw Error(H(90));
            (Ag(r), Iu(r, o));
          }
        }
      }
      break;
    case "textarea":
      Pg(e, n);
      break;
    case "select":
      ((t = n.value), t != null && no(e, !!n.multiple, t, !1));
  }
};
$g = kd;
zg = br;
var D_ = { usingClientEntryPoint: !1, Events: [Gi, qr, Kl, Dg, Og, kd] },
  Ho = { findFiberByHostInstance: cr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" },
  O_ = {
    bundleType: Ho.bundleType,
    version: Ho.version,
    rendererPackageName: Ho.rendererPackageName,
    rendererConfig: Ho.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: _n.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Hg(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Ho.findFiberByHostInstance || R_,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Es = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Es.isDisabled && Es.supportsFiber)
    try {
      ((Wl = Es.inject(O_)), (Qt = Es));
    } catch {}
}
vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D_;
vt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Id(t)) throw Error(H(200));
  return L_(e, t, null, n);
};
vt.createRoot = function (e, t) {
  if (!Id(e)) throw Error(H(299));
  var n = !1,
    r = "",
    o = w0;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Ad(e, 1, !1, null, null, n, !1, r, o)),
    (e[yn] = t.current),
    Ei(e.nodeType === 8 ? e.parentNode : e),
    new Pd(t)
  );
};
vt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == "function" ? Error(H(188)) : ((e = Object.keys(e).join(",")), Error(H(268, e)));
  return ((e = Hg(t)), (e = e === null ? null : e.stateNode), e);
};
vt.flushSync = function (e) {
  return br(e);
};
vt.hydrate = function (e, t, n) {
  if (!ra(t)) throw Error(H(200));
  return oa(null, e, t, !0, n);
};
vt.hydrateRoot = function (e, t, n) {
  if (!Id(e)) throw Error(H(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    s = w0;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = x0(t, null, e, 1, n ?? null, o, !1, i, s)),
    (e[yn] = t.current),
    Ei(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o));
  return new na(t);
};
vt.render = function (e, t, n) {
  if (!ra(t)) throw Error(H(200));
  return oa(null, e, t, !1, n);
};
vt.unmountComponentAtNode = function (e) {
  if (!ra(e)) throw Error(H(40));
  return e._reactRootContainer
    ? (br(function () {
        oa(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[yn] = null));
        });
      }),
      !0)
    : !1;
};
vt.unstable_batchedUpdates = kd;
vt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ra(n)) throw Error(H(200));
  if (e == null || e._reactInternals === void 0) throw Error(H(38));
  return oa(e, t, n, !1, r);
};
vt.version = "18.3.1-next-f1338f8080-20240426";
function _0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_0);
    } catch (e) {
      console.error(e);
    }
}
(_0(), (_g.exports = vt));
var Ld = _g.exports;
const $_ = Dc(Ld);
var _p = Ld;
((ku.createRoot = _p.createRoot), (ku.hydrateRoot = _p.hydrateRoot));
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z_ = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  S0 = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var F_ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B_ = _.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: o = "",
      children: i,
      iconNode: s,
      ...l
    },
    a,
  ) =>
    _.createElement(
      "svg",
      {
        ref: a,
        ...F_,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: S0("lucide", o),
        ...l,
      },
      [...s.map(([u, d]) => _.createElement(u, d)), ...(Array.isArray(i) ? i : [i])],
    ),
);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zt = (e, t) => {
  const n = _.forwardRef(({ className: r, ...o }, i) =>
    _.createElement(B_, { ref: i, iconNode: t, className: S0(`lucide-${z_(e)}`, r), ...o }),
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H_ = zt("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse",
    },
  ],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const V_ = zt("CircleOff", [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W_ = zt("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const U_ = zt("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const G_ = zt("RefreshCcw", [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const q_ = zt("ShieldAlert", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const K_ = zt("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx",
    },
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Sp = zt("SquareTerminal", [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Y_ = zt("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const X_ = zt("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Q_ = zt("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
function De(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e)) for (let n = 0, r; n < e.length; n++) (r = De(e[n])) !== "" && (t += (t && " ") + r);
  else for (let n in e) e[n] && (t += (t && " ") + n);
  return t;
}
var Z_ = { value: () => {} };
function ia() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Qs(n);
}
function Qs(e) {
  this._ = e;
}
function J_(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var r = "",
        o = n.indexOf(".");
      if ((o >= 0 && ((r = n.slice(o + 1)), (n = n.slice(0, o))), n && !t.hasOwnProperty(n)))
        throw new Error("unknown type: " + n);
      return { type: n, name: r };
    });
}
Qs.prototype = ia.prototype = {
  constructor: Qs,
  on: function (e, t) {
    var n = this._,
      r = J_(e + "", n),
      o,
      i = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((o = (e = r[i]).type) && (o = eS(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++i < s; )
      if ((o = (e = r[i]).type)) n[o] = Ep(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = Ep(n[o], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Qs(e);
  },
  call: function (e, t) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), r = 0, o, i; r < o; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (i = this._[e], r = 0, o = i.length; r < o; ++r) i[r].value.apply(t, n);
  },
  apply: function (e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], o = 0, i = r.length; o < i; ++o) r[o].value.apply(t, n);
  },
};
function eS(e, t) {
  for (var n = 0, r = e.length, o; n < r; ++n) if ((o = e[n]).name === t) return o.value;
}
function Ep(e, t, n) {
  for (var r = 0, o = e.length; r < o; ++r)
    if (e[r].name === t) {
      ((e[r] = Z_), (e = e.slice(0, r).concat(e.slice(r + 1))));
      break;
    }
  return (n != null && e.push({ name: t, value: n }), e);
}
var vc = "http://www.w3.org/1999/xhtml";
const bp = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vc,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function sa(e) {
  var t = (e += ""),
    n = t.indexOf(":");
  return (
    n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
    bp.hasOwnProperty(t) ? { space: bp[t], local: e } : e
  );
}
function tS(e) {
  return function () {
    var t = this.ownerDocument,
      n = this.namespaceURI;
    return n === vc && t.documentElement.namespaceURI === vc ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function nS(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function E0(e) {
  var t = sa(e);
  return (t.local ? nS : tS)(t);
}
function rS() {}
function Rd(e) {
  return e == null
    ? rS
    : function () {
        return this.querySelector(e);
      };
}
function oS(e) {
  typeof e != "function" && (e = Rd(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], s = i.length, l = (r[o] = new Array(s)), a, u, d = 0; d < s; ++d)
      (a = i[d]) && (u = e.call(a, a.__data__, d, i)) && ("__data__" in a && (u.__data__ = a.__data__), (l[d] = u));
  return new yt(r, this._parents);
}
function iS(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function sS() {
  return [];
}
function b0(e) {
  return e == null
    ? sS
    : function () {
        return this.querySelectorAll(e);
      };
}
function lS(e) {
  return function () {
    return iS(e.apply(this, arguments));
  };
}
function aS(e) {
  typeof e == "function" ? (e = lS(e)) : (e = b0(e));
  for (var t = this._groups, n = t.length, r = [], o = [], i = 0; i < n; ++i)
    for (var s = t[i], l = s.length, a, u = 0; u < l; ++u) (a = s[u]) && (r.push(e.call(a, a.__data__, u, s)), o.push(a));
  return new yt(r, o);
}
function k0(e) {
  return function () {
    return this.matches(e);
  };
}
function N0(e) {
  return function (t) {
    return t.matches(e);
  };
}
var uS = Array.prototype.find;
function cS(e) {
  return function () {
    return uS.call(this.children, e);
  };
}
function dS() {
  return this.firstElementChild;
}
function fS(e) {
  return this.select(e == null ? dS : cS(typeof e == "function" ? e : N0(e)));
}
var pS = Array.prototype.filter;
function hS() {
  return Array.from(this.children);
}
function gS(e) {
  return function () {
    return pS.call(this.children, e);
  };
}
function mS(e) {
  return this.selectAll(e == null ? hS : gS(typeof e == "function" ? e : N0(e)));
}
function yS(e) {
  typeof e != "function" && (e = k0(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], s = i.length, l = (r[o] = []), a, u = 0; u < s; ++u)
      (a = i[u]) && e.call(a, a.__data__, u, i) && l.push(a);
  return new yt(r, this._parents);
}
function C0(e) {
  return new Array(e.length);
}
function vS() {
  return new yt(this._enter || this._groups.map(C0), this._parents);
}
function Al(e, t) {
  ((this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t));
}
Al.prototype = {
  constructor: Al,
  appendChild: function (e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function (e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function (e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function (e) {
    return this._parent.querySelectorAll(e);
  },
};
function xS(e) {
  return function () {
    return e;
  };
}
function wS(e, t, n, r, o, i) {
  for (var s = 0, l, a = t.length, u = i.length; s < u; ++s)
    (l = t[s]) ? ((l.__data__ = i[s]), (r[s] = l)) : (n[s] = new Al(e, i[s]));
  for (; s < a; ++s) (l = t[s]) && (o[s] = l);
}
function _S(e, t, n, r, o, i, s) {
  var l,
    a,
    u = new Map(),
    d = t.length,
    c = i.length,
    f = new Array(d),
    y;
  for (l = 0; l < d; ++l) (a = t[l]) && ((f[l] = y = s.call(a, a.__data__, l, t) + ""), u.has(y) ? (o[l] = a) : u.set(y, a));
  for (l = 0; l < c; ++l)
    ((y = s.call(e, i[l], l, i) + ""),
      (a = u.get(y)) ? ((r[l] = a), (a.__data__ = i[l]), u.delete(y)) : (n[l] = new Al(e, i[l])));
  for (l = 0; l < d; ++l) (a = t[l]) && u.get(f[l]) === a && (o[l] = a);
}
function SS(e) {
  return e.__data__;
}
function ES(e, t) {
  if (!arguments.length) return Array.from(this, SS);
  var n = t ? _S : wS,
    r = this._parents,
    o = this._groups;
  typeof e != "function" && (e = xS(e));
  for (var i = o.length, s = new Array(i), l = new Array(i), a = new Array(i), u = 0; u < i; ++u) {
    var d = r[u],
      c = o[u],
      f = c.length,
      y = bS(e.call(d, d && d.__data__, u, r)),
      v = y.length,
      x = (l[u] = new Array(v)),
      S = (s[u] = new Array(v)),
      h = (a[u] = new Array(f));
    n(d, c, x, S, h, y, t);
    for (var m = 0, p = 0, w, E; m < v; ++m)
      if ((w = x[m])) {
        for (m >= p && (p = m + 1); !(E = S[p]) && ++p < v; );
        w._next = E || null;
      }
  }
  return ((s = new yt(s, r)), (s._enter = l), (s._exit = a), s);
}
function bS(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function kS() {
  return new yt(this._exit || this._groups.map(C0), this._parents);
}
function NS(e, t, n) {
  var r = this.enter(),
    o = this,
    i = this.exit();
  return (
    typeof e == "function" ? ((r = e(r)), r && (r = r.selection())) : (r = r.append(e + "")),
    t != null && ((o = t(o)), o && (o = o.selection())),
    n == null ? i.remove() : n(i),
    r && o ? r.merge(o).order() : o
  );
}
function CS(e) {
  for (
    var t = e.selection ? e.selection() : e,
      n = this._groups,
      r = t._groups,
      o = n.length,
      i = r.length,
      s = Math.min(o, i),
      l = new Array(o),
      a = 0;
    a < s;
    ++a
  )
    for (var u = n[a], d = r[a], c = u.length, f = (l[a] = new Array(c)), y, v = 0; v < c; ++v)
      (y = u[v] || d[v]) && (f[v] = y);
  for (; a < o; ++a) l[a] = n[a];
  return new yt(l, this._parents);
}
function TS() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], o = r.length - 1, i = r[o], s; --o >= 0; )
      (s = r[o]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), (i = s));
  return this;
}
function AS(e) {
  e || (e = MS);
  function t(c, f) {
    return c && f ? e(c.__data__, f.__data__) : !c - !f;
  }
  for (var n = this._groups, r = n.length, o = new Array(r), i = 0; i < r; ++i) {
    for (var s = n[i], l = s.length, a = (o[i] = new Array(l)), u, d = 0; d < l; ++d) (u = s[d]) && (a[d] = u);
    a.sort(t);
  }
  return new yt(o, this._parents).order();
}
function MS(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function PS() {
  var e = arguments[0];
  return ((arguments[0] = this), e.apply(null, arguments), this);
}
function IS() {
  return Array.from(this);
}
function LS() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length; o < i; ++o) {
      var s = r[o];
      if (s) return s;
    }
  return null;
}
function RS() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function jS() {
  return !this.node();
}
function DS(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var o = t[n], i = 0, s = o.length, l; i < s; ++i) (l = o[i]) && e.call(l, l.__data__, i, o);
  return this;
}
function OS(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function $S(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function zS(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function FS(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function BS(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function HS(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function VS(e, t) {
  var n = sa(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each(
    (t == null ? (n.local ? $S : OS) : typeof t == "function" ? (n.local ? HS : BS) : n.local ? FS : zS)(n, t),
  );
}
function T0(e) {
  return (e.ownerDocument && e.ownerDocument.defaultView) || (e.document && e) || e.defaultView;
}
function WS(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function US(e, t, n) {
  return function () {
    this.style.setProperty(e, t, n);
  };
}
function GS(e, t, n) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function qS(e, t, n) {
  return arguments.length > 1
    ? this.each((t == null ? WS : typeof t == "function" ? GS : US)(e, t, n ?? ""))
    : wo(this.node(), e);
}
function wo(e, t) {
  return e.style.getPropertyValue(t) || T0(e).getComputedStyle(e, null).getPropertyValue(t);
}
function KS(e) {
  return function () {
    delete this[e];
  };
}
function YS(e, t) {
  return function () {
    this[e] = t;
  };
}
function XS(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : (this[e] = n);
  };
}
function QS(e, t) {
  return arguments.length > 1 ? this.each((t == null ? KS : typeof t == "function" ? XS : YS)(e, t)) : this.node()[e];
}
function A0(e) {
  return e.trim().split(/^|\s+/);
}
function jd(e) {
  return e.classList || new M0(e);
}
function M0(e) {
  ((this._node = e), (this._names = A0(e.getAttribute("class") || "")));
}
M0.prototype = {
  add: function (e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (e) {
    return this._names.indexOf(e) >= 0;
  },
};
function P0(e, t) {
  for (var n = jd(e), r = -1, o = t.length; ++r < o; ) n.add(t[r]);
}
function I0(e, t) {
  for (var n = jd(e), r = -1, o = t.length; ++r < o; ) n.remove(t[r]);
}
function ZS(e) {
  return function () {
    P0(this, e);
  };
}
function JS(e) {
  return function () {
    I0(this, e);
  };
}
function eE(e, t) {
  return function () {
    (t.apply(this, arguments) ? P0 : I0)(this, e);
  };
}
function tE(e, t) {
  var n = A0(e + "");
  if (arguments.length < 2) {
    for (var r = jd(this.node()), o = -1, i = n.length; ++o < i; ) if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? eE : t ? ZS : JS)(n, t));
}
function nE() {
  this.textContent = "";
}
function rE(e) {
  return function () {
    this.textContent = e;
  };
}
function oE(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function iE(e) {
  return arguments.length ? this.each(e == null ? nE : (typeof e == "function" ? oE : rE)(e)) : this.node().textContent;
}
function sE() {
  this.innerHTML = "";
}
function lE(e) {
  return function () {
    this.innerHTML = e;
  };
}
function aE(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function uE(e) {
  return arguments.length ? this.each(e == null ? sE : (typeof e == "function" ? aE : lE)(e)) : this.node().innerHTML;
}
function cE() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dE() {
  return this.each(cE);
}
function fE() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function pE() {
  return this.each(fE);
}
function hE(e) {
  var t = typeof e == "function" ? e : E0(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function gE() {
  return null;
}
function mE(e, t) {
  var n = typeof e == "function" ? e : E0(e),
    r = t == null ? gE : typeof t == "function" ? t : Rd(t);
  return this.select(function () {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function yE() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function vE() {
  return this.each(yE);
}
function xE() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function wE() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function _E(e) {
  return this.select(e ? wE : xE);
}
function SE(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function EE(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function bE(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var n = "",
        r = t.indexOf(".");
      return (r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))), { type: t, name: n });
    });
}
function kE(e) {
  return function () {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, o = t.length, i; n < o; ++n)
        ((i = t[n]),
          (!e.type || i.type === e.type) && i.name === e.name
            ? this.removeEventListener(i.type, i.listener, i.options)
            : (t[++r] = i));
      ++r ? (t.length = r) : delete this.__on;
    }
  };
}
function NE(e, t, n) {
  return function () {
    var r = this.__on,
      o,
      i = EE(t);
    if (r) {
      for (var s = 0, l = r.length; s < l; ++s)
        if ((o = r[s]).type === e.type && o.name === e.name) {
          (this.removeEventListener(o.type, o.listener, o.options),
            this.addEventListener(o.type, (o.listener = i), (o.options = n)),
            (o.value = t));
          return;
        }
    }
    (this.addEventListener(e.type, i, n),
      (o = { type: e.type, name: e.name, value: t, listener: i, options: n }),
      r ? r.push(o) : (this.__on = [o]));
  };
}
function CE(e, t, n) {
  var r = bE(e + ""),
    o,
    i = r.length,
    s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, u = l.length, d; a < u; ++a)
        for (o = 0, d = l[a]; o < i; ++o) if ((s = r[o]).type === d.type && s.name === d.name) return d.value;
    }
    return;
  }
  for (l = t ? NE : kE, o = 0; o < i; ++o) this.each(l(r[o], t, n));
  return this;
}
function L0(e, t, n) {
  var r = T0(e),
    o = r.CustomEvent;
  (typeof o == "function"
    ? (o = new o(t, n))
    : ((o = r.document.createEvent("Event")),
      n ? (o.initEvent(t, n.bubbles, n.cancelable), (o.detail = n.detail)) : o.initEvent(t, !1, !1)),
    e.dispatchEvent(o));
}
function TE(e, t) {
  return function () {
    return L0(this, e, t);
  };
}
function AE(e, t) {
  return function () {
    return L0(this, e, t.apply(this, arguments));
  };
}
function ME(e, t) {
  return this.each((typeof t == "function" ? AE : TE)(e, t));
}
function* PE() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length, s; o < i; ++o) (s = r[o]) && (yield s);
}
var R0 = [null];
function yt(e, t) {
  ((this._groups = e), (this._parents = t));
}
function Ki() {
  return new yt([[document.documentElement]], R0);
}
function IE() {
  return this;
}
yt.prototype = Ki.prototype = {
  constructor: yt,
  select: oS,
  selectAll: aS,
  selectChild: fS,
  selectChildren: mS,
  filter: yS,
  data: ES,
  enter: vS,
  exit: kS,
  join: NS,
  merge: CS,
  selection: IE,
  order: TS,
  sort: AS,
  call: PS,
  nodes: IS,
  node: LS,
  size: RS,
  empty: jS,
  each: DS,
  attr: VS,
  style: qS,
  property: QS,
  classed: tE,
  text: iE,
  html: uE,
  raise: dE,
  lower: pE,
  append: hE,
  insert: mE,
  remove: vE,
  clone: _E,
  datum: SE,
  on: CE,
  dispatch: ME,
  [Symbol.iterator]: PE,
};
function pt(e) {
  return typeof e == "string" ? new yt([[document.querySelector(e)]], [document.documentElement]) : new yt([[e]], R0);
}
function LE(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
function Pt(e, t) {
  if (((e = LE(e)), t === void 0 && (t = e.currentTarget), t)) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return ((r.x = e.clientX), (r.y = e.clientY), (r = r.matrixTransform(t.getScreenCTM().inverse())), [r.x, r.y]);
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const RE = { passive: !1 },
  Ii = { capture: !0, passive: !1 };
function Xa(e) {
  e.stopImmediatePropagation();
}
function ao(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function j0(e) {
  var t = e.document.documentElement,
    n = pt(e).on("dragstart.drag", ao, Ii);
  "onselectstart" in t
    ? n.on("selectstart.drag", ao, Ii)
    : ((t.__noselect = t.style.MozUserSelect), (t.style.MozUserSelect = "none"));
}
function D0(e, t) {
  var n = e.document.documentElement,
    r = pt(e).on("dragstart.drag", null);
  (t &&
    (r.on("click.drag", ao, Ii),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in n ? r.on("selectstart.drag", null) : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect));
}
const bs = (e) => () => e;
function xc(e, { sourceEvent: t, subject: n, target: r, identifier: o, active: i, x: s, y: l, dx: a, dy: u, dispatch: d }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: o, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: d },
  });
}
xc.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function jE(e) {
  return !e.ctrlKey && !e.button;
}
function DE() {
  return this.parentNode;
}
function OE(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function $E() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function O0() {
  var e = jE,
    t = DE,
    n = OE,
    r = $E,
    o = {},
    i = ia("start", "drag", "end"),
    s = 0,
    l,
    a,
    u,
    d,
    c = 0;
  function f(w) {
    w.on("mousedown.drag", y)
      .filter(r)
      .on("touchstart.drag", S)
      .on("touchmove.drag", h, RE)
      .on("touchend.drag touchcancel.drag", m)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function y(w, E) {
    if (!(d || !e.call(this, w, E))) {
      var b = p(this, t.call(this, w, E), w, E, "mouse");
      b &&
        (pt(w.view).on("mousemove.drag", v, Ii).on("mouseup.drag", x, Ii),
        j0(w.view),
        Xa(w),
        (u = !1),
        (l = w.clientX),
        (a = w.clientY),
        b("start", w));
    }
  }
  function v(w) {
    if ((ao(w), !u)) {
      var E = w.clientX - l,
        b = w.clientY - a;
      u = E * E + b * b > c;
    }
    o.mouse("drag", w);
  }
  function x(w) {
    (pt(w.view).on("mousemove.drag mouseup.drag", null), D0(w.view, u), ao(w), o.mouse("end", w));
  }
  function S(w, E) {
    if (e.call(this, w, E)) {
      var b = w.changedTouches,
        k = t.call(this, w, E),
        A = b.length,
        R,
        z;
      for (R = 0; R < A; ++R) (z = p(this, k, w, E, b[R].identifier, b[R])) && (Xa(w), z("start", w, b[R]));
    }
  }
  function h(w) {
    var E = w.changedTouches,
      b = E.length,
      k,
      A;
    for (k = 0; k < b; ++k) (A = o[E[k].identifier]) && (ao(w), A("drag", w, E[k]));
  }
  function m(w) {
    var E = w.changedTouches,
      b = E.length,
      k,
      A;
    for (
      d && clearTimeout(d),
        d = setTimeout(function () {
          d = null;
        }, 500),
        k = 0;
      k < b;
      ++k
    )
      (A = o[E[k].identifier]) && (Xa(w), A("end", w, E[k]));
  }
  function p(w, E, b, k, A, R) {
    var z = i.copy(),
      L = Pt(R || b, E),
      M,
      B,
      C;
    if (
      (C = n.call(
        w,
        new xc("beforestart", {
          sourceEvent: b,
          target: f,
          identifier: A,
          active: s,
          x: L[0],
          y: L[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        k,
      )) != null
    )
      return (
        (M = C.x - L[0] || 0),
        (B = C.y - L[1] || 0),
        function D(I, O, N) {
          var T = L,
            j;
          switch (I) {
            case "start":
              ((o[A] = D), (j = s++));
              break;
            case "end":
              (delete o[A], --s);
            case "drag":
              ((L = Pt(N || O, E)), (j = s));
              break;
          }
          z.call(
            I,
            w,
            new xc(I, {
              sourceEvent: O,
              subject: C,
              target: f,
              identifier: A,
              active: j,
              x: L[0] + M,
              y: L[1] + B,
              dx: L[0] - T[0],
              dy: L[1] - T[1],
              dispatch: z,
            }),
            k,
          );
        }
      );
  }
  return (
    (f.filter = function (w) {
      return arguments.length ? ((e = typeof w == "function" ? w : bs(!!w)), f) : e;
    }),
    (f.container = function (w) {
      return arguments.length ? ((t = typeof w == "function" ? w : bs(w)), f) : t;
    }),
    (f.subject = function (w) {
      return arguments.length ? ((n = typeof w == "function" ? w : bs(w)), f) : n;
    }),
    (f.touchable = function (w) {
      return arguments.length ? ((r = typeof w == "function" ? w : bs(!!w)), f) : r;
    }),
    (f.on = function () {
      var w = i.on.apply(i, arguments);
      return w === i ? f : w;
    }),
    (f.clickDistance = function (w) {
      return arguments.length ? ((c = (w = +w) * w), f) : Math.sqrt(c);
    }),
    f
  );
}
function Dd(e, t, n) {
  ((e.prototype = t.prototype = n), (n.constructor = e));
}
function $0(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function Yi() {}
var Li = 0.7,
  Ml = 1 / Li,
  uo = "\\s*([+-]?\\d+)\\s*",
  Ri = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Jt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  zE = /^#([0-9a-f]{3,8})$/,
  FE = new RegExp(`^rgb\\(${uo},${uo},${uo}\\)$`),
  BE = new RegExp(`^rgb\\(${Jt},${Jt},${Jt}\\)$`),
  HE = new RegExp(`^rgba\\(${uo},${uo},${uo},${Ri}\\)$`),
  VE = new RegExp(`^rgba\\(${Jt},${Jt},${Jt},${Ri}\\)$`),
  WE = new RegExp(`^hsl\\(${Ri},${Jt},${Jt}\\)$`),
  UE = new RegExp(`^hsla\\(${Ri},${Jt},${Jt},${Ri}\\)$`),
  kp = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Dd(Yi, kr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Np,
  formatHex: Np,
  formatHex8: GE,
  formatHsl: qE,
  formatRgb: Cp,
  toString: Cp,
});
function Np() {
  return this.rgb().formatHex();
}
function GE() {
  return this.rgb().formatHex8();
}
function qE() {
  return z0(this).formatHsl();
}
function Cp() {
  return this.rgb().formatRgb();
}
function kr(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = zE.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Tp(t)
          : n === 3
            ? new st(((t >> 8) & 15) | ((t >> 4) & 240), ((t >> 4) & 15) | (t & 240), ((t & 15) << 4) | (t & 15), 1)
            : n === 8
              ? ks((t >> 24) & 255, (t >> 16) & 255, (t >> 8) & 255, (t & 255) / 255)
              : n === 4
                ? ks(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = FE.exec(e))
        ? new st(t[1], t[2], t[3], 1)
        : (t = BE.exec(e))
          ? new st((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
          : (t = HE.exec(e))
            ? ks(t[1], t[2], t[3], t[4])
            : (t = VE.exec(e))
              ? ks((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
              : (t = WE.exec(e))
                ? Pp(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = UE.exec(e))
                  ? Pp(t[1], t[2] / 100, t[3] / 100, t[4])
                  : kp.hasOwnProperty(e)
                    ? Tp(kp[e])
                    : e === "transparent"
                      ? new st(NaN, NaN, NaN, 0)
                      : null
  );
}
function Tp(e) {
  return new st((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function ks(e, t, n, r) {
  return (r <= 0 && (e = t = n = NaN), new st(e, t, n, r));
}
function KE(e) {
  return (e instanceof Yi || (e = kr(e)), e ? ((e = e.rgb()), new st(e.r, e.g, e.b, e.opacity)) : new st());
}
function wc(e, t, n, r) {
  return arguments.length === 1 ? KE(e) : new st(e, t, n, r ?? 1);
}
function st(e, t, n, r) {
  ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r));
}
Dd(
  st,
  wc,
  $0(Yi, {
    brighter(e) {
      return ((e = e == null ? Ml : Math.pow(Ml, e)), new st(this.r * e, this.g * e, this.b * e, this.opacity));
    },
    darker(e) {
      return ((e = e == null ? Li : Math.pow(Li, e)), new st(this.r * e, this.g * e, this.b * e, this.opacity));
    },
    rgb() {
      return this;
    },
    clamp() {
      return new st(mr(this.r), mr(this.g), mr(this.b), Pl(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: Ap,
    formatHex: Ap,
    formatHex8: YE,
    formatRgb: Mp,
    toString: Mp,
  }),
);
function Ap() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function YE() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mp() {
  const e = Pl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${mr(this.r)}, ${mr(this.g)}, ${mr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Pl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function mr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function pr(e) {
  return ((e = mr(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function Pp(e, t, n, r) {
  return (r <= 0 ? (e = t = n = NaN) : n <= 0 || n >= 1 ? (e = t = NaN) : t <= 0 && (e = NaN), new Lt(e, t, n, r));
}
function z0(e) {
  if (e instanceof Lt) return new Lt(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Yi || (e = kr(e)), !e)) return new Lt();
  if (e instanceof Lt) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    o = Math.min(t, n, r),
    i = Math.max(t, n, r),
    s = NaN,
    l = i - o,
    a = (i + o) / 2;
  return (
    l
      ? (t === i ? (s = (n - r) / l + (n < r) * 6) : n === i ? (s = (r - t) / l + 2) : (s = (t - n) / l + 4),
        (l /= a < 0.5 ? i + o : 2 - i - o),
        (s *= 60))
      : (l = a > 0 && a < 1 ? 0 : s),
    new Lt(s, l, a, e.opacity)
  );
}
function XE(e, t, n, r) {
  return arguments.length === 1 ? z0(e) : new Lt(e, t, n, r ?? 1);
}
function Lt(e, t, n, r) {
  ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r));
}
Dd(
  Lt,
  XE,
  $0(Yi, {
    brighter(e) {
      return ((e = e == null ? Ml : Math.pow(Ml, e)), new Lt(this.h, this.s, this.l * e, this.opacity));
    },
    darker(e) {
      return ((e = e == null ? Li : Math.pow(Li, e)), new Lt(this.h, this.s, this.l * e, this.opacity));
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        o = 2 * n - r;
      return new st(Qa(e >= 240 ? e - 240 : e + 120, o, r), Qa(e, o, r), Qa(e < 120 ? e + 240 : e - 120, o, r), this.opacity);
    },
    clamp() {
      return new Lt(Ip(this.h), Ns(this.s), Ns(this.l), Pl(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = Pl(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${Ip(this.h)}, ${Ns(this.s) * 100}%, ${Ns(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  }),
);
function Ip(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function Ns(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Qa(e, t, n) {
  return (e < 60 ? t + ((n - t) * e) / 60 : e < 180 ? n : e < 240 ? t + ((n - t) * (240 - e)) / 60 : t) * 255;
}
const Od = (e) => () => e;
function QE(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function ZE(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function JE(e) {
  return (e = +e) == 1
    ? F0
    : function (t, n) {
        return n - t ? ZE(t, n, e) : Od(isNaN(t) ? n : t);
      };
}
function F0(e, t) {
  var n = t - e;
  return n ? QE(e, n) : Od(isNaN(e) ? t : e);
}
const Il = (function e(t) {
  var n = JE(t);
  function r(o, i) {
    var s = n((o = wc(o)).r, (i = wc(i)).r),
      l = n(o.g, i.g),
      a = n(o.b, i.b),
      u = F0(o.opacity, i.opacity);
    return function (d) {
      return ((o.r = s(d)), (o.g = l(d)), (o.b = a(d)), (o.opacity = u(d)), o + "");
    };
  }
  return ((r.gamma = e), r);
})(1);
function e2(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    o;
  return function (i) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - i) + t[o] * i;
    return r;
  };
}
function t2(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function n2(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    o = new Array(r),
    i = new Array(n),
    s;
  for (s = 0; s < r; ++s) o[s] = ci(e[s], t[s]);
  for (; s < n; ++s) i[s] = t[s];
  return function (l) {
    for (s = 0; s < r; ++s) i[s] = o[s](l);
    return i;
  };
}
function r2(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return (n.setTime(e * (1 - r) + t * r), n);
    }
  );
}
function Kt(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function o2(e, t) {
  var n = {},
    r = {},
    o;
  ((e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {}));
  for (o in t) o in e ? (n[o] = ci(e[o], t[o])) : (r[o] = t[o]);
  return function (i) {
    for (o in n) r[o] = n[o](i);
    return r;
  };
}
var _c = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Za = new RegExp(_c.source, "g");
function i2(e) {
  return function () {
    return e;
  };
}
function s2(e) {
  return function (t) {
    return e(t) + "";
  };
}
function B0(e, t) {
  var n = (_c.lastIndex = Za.lastIndex = 0),
    r,
    o,
    i,
    s = -1,
    l = [],
    a = [];
  for (e = e + "", t = t + ""; (r = _c.exec(e)) && (o = Za.exec(t)); )
    ((i = o.index) > n && ((i = t.slice(n, i)), l[s] ? (l[s] += i) : (l[++s] = i)),
      (r = r[0]) === (o = o[0]) ? (l[s] ? (l[s] += o) : (l[++s] = o)) : ((l[++s] = null), a.push({ i: s, x: Kt(r, o) })),
      (n = Za.lastIndex));
  return (
    n < t.length && ((i = t.slice(n)), l[s] ? (l[s] += i) : (l[++s] = i)),
    l.length < 2
      ? a[0]
        ? s2(a[0].x)
        : i2(t)
      : ((t = a.length),
        function (u) {
          for (var d = 0, c; d < t; ++d) l[(c = a[d]).i] = c.x(u);
          return l.join("");
        })
  );
}
function ci(e, t) {
  var n = typeof t,
    r;
  return t == null || n === "boolean"
    ? Od(t)
    : (n === "number"
        ? Kt
        : n === "string"
          ? (r = kr(t))
            ? ((t = r), Il)
            : B0
          : t instanceof kr
            ? Il
            : t instanceof Date
              ? r2
              : t2(t)
                ? e2
                : Array.isArray(t)
                  ? n2
                  : (typeof t.valueOf != "function" && typeof t.toString != "function") || isNaN(t)
                    ? o2
                    : Kt)(e, t);
}
var Lp = 180 / Math.PI,
  Sc = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function H0(e, t, n, r, o, i) {
  var s, l, a;
  return (
    (s = Math.sqrt(e * e + t * t)) && ((e /= s), (t /= s)),
    (a = e * n + t * r) && ((n -= e * a), (r -= t * a)),
    (l = Math.sqrt(n * n + r * r)) && ((n /= l), (r /= l), (a /= l)),
    e * r < t * n && ((e = -e), (t = -t), (a = -a), (s = -s)),
    { translateX: o, translateY: i, rotate: Math.atan2(t, e) * Lp, skewX: Math.atan(a) * Lp, scaleX: s, scaleY: l }
  );
}
var Cs;
function l2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Sc : H0(t.a, t.b, t.c, t.d, t.e, t.f);
}
function a2(e) {
  return e == null ||
    (Cs || (Cs = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Cs.setAttribute("transform", e),
    !(e = Cs.transform.baseVal.consolidate()))
    ? Sc
    : ((e = e.matrix), H0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function V0(e, t, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function i(u, d, c, f, y, v) {
    if (u !== c || d !== f) {
      var x = y.push("translate(", null, t, null, n);
      v.push({ i: x - 4, x: Kt(u, c) }, { i: x - 2, x: Kt(d, f) });
    } else (c || f) && y.push("translate(" + c + t + f + n);
  }
  function s(u, d, c, f) {
    u !== d
      ? (u - d > 180 ? (d += 360) : d - u > 180 && (u += 360),
        f.push({ i: c.push(o(c) + "rotate(", null, r) - 2, x: Kt(u, d) }))
      : d && c.push(o(c) + "rotate(" + d + r);
  }
  function l(u, d, c, f) {
    u !== d ? f.push({ i: c.push(o(c) + "skewX(", null, r) - 2, x: Kt(u, d) }) : d && c.push(o(c) + "skewX(" + d + r);
  }
  function a(u, d, c, f, y, v) {
    if (u !== c || d !== f) {
      var x = y.push(o(y) + "scale(", null, ",", null, ")");
      v.push({ i: x - 4, x: Kt(u, c) }, { i: x - 2, x: Kt(d, f) });
    } else (c !== 1 || f !== 1) && y.push(o(y) + "scale(" + c + "," + f + ")");
  }
  return function (u, d) {
    var c = [],
      f = [];
    return (
      (u = e(u)),
      (d = e(d)),
      i(u.translateX, u.translateY, d.translateX, d.translateY, c, f),
      s(u.rotate, d.rotate, c, f),
      l(u.skewX, d.skewX, c, f),
      a(u.scaleX, u.scaleY, d.scaleX, d.scaleY, c, f),
      (u = d = null),
      function (y) {
        for (var v = -1, x = f.length, S; ++v < x; ) c[(S = f[v]).i] = S.x(y);
        return c.join("");
      }
    );
  };
}
var u2 = V0(l2, "px, ", "px)", "deg)"),
  c2 = V0(a2, ", ", ")", ")"),
  d2 = 1e-12;
function Rp(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function f2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function p2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Zs = (function e(t, n, r) {
  function o(i, s) {
    var l = i[0],
      a = i[1],
      u = i[2],
      d = s[0],
      c = s[1],
      f = s[2],
      y = d - l,
      v = c - a,
      x = y * y + v * v,
      S,
      h;
    if (x < d2)
      ((h = Math.log(f / u) / t),
        (S = function (k) {
          return [l + k * y, a + k * v, u * Math.exp(t * k * h)];
        }));
    else {
      var m = Math.sqrt(x),
        p = (f * f - u * u + r * x) / (2 * u * n * m),
        w = (f * f - u * u - r * x) / (2 * f * n * m),
        E = Math.log(Math.sqrt(p * p + 1) - p),
        b = Math.log(Math.sqrt(w * w + 1) - w);
      ((h = (b - E) / t),
        (S = function (k) {
          var A = k * h,
            R = Rp(E),
            z = (u / (n * m)) * (R * p2(t * A + E) - f2(E));
          return [l + z * y, a + z * v, (u * R) / Rp(t * A + E)];
        }));
    }
    return ((S.duration = (h * 1e3 * t) / Math.SQRT2), S);
  }
  return (
    (o.rho = function (i) {
      var s = Math.max(0.001, +i),
        l = s * s,
        a = l * l;
      return e(s, l, a);
    }),
    o
  );
})(Math.SQRT2, 2, 4);
var _o = 0,
  Jo = 0,
  Vo = 0,
  W0 = 1e3,
  Ll,
  ei,
  Rl = 0,
  Nr = 0,
  la = 0,
  ji = typeof performance == "object" && performance.now ? performance : Date,
  U0 =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function $d() {
  return Nr || (U0(h2), (Nr = ji.now() + la));
}
function h2() {
  Nr = 0;
}
function jl() {
  this._call = this._time = this._next = null;
}
jl.prototype = G0.prototype = {
  constructor: jl,
  restart: function (e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    ((n = (n == null ? $d() : +n) + (t == null ? 0 : +t)),
      !this._next && ei !== this && (ei ? (ei._next = this) : (Ll = this), (ei = this)),
      (this._call = e),
      (this._time = n),
      Ec());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ec());
  },
};
function G0(e, t, n) {
  var r = new jl();
  return (r.restart(e, t, n), r);
}
function g2() {
  ($d(), ++_o);
  for (var e = Ll, t; e; ) ((t = Nr - e._time) >= 0 && e._call.call(void 0, t), (e = e._next));
  --_o;
}
function jp() {
  ((Nr = (Rl = ji.now()) + la), (_o = Jo = 0));
  try {
    g2();
  } finally {
    ((_o = 0), y2(), (Nr = 0));
  }
}
function m2() {
  var e = ji.now(),
    t = e - Rl;
  t > W0 && ((la -= t), (Rl = e));
}
function y2() {
  for (var e, t = Ll, n, r = 1 / 0; t; )
    t._call
      ? (r > t._time && (r = t._time), (e = t), (t = t._next))
      : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (Ll = n)));
  ((ei = e), Ec(r));
}
function Ec(e) {
  if (!_o) {
    Jo && (Jo = clearTimeout(Jo));
    var t = e - Nr;
    t > 24
      ? (e < 1 / 0 && (Jo = setTimeout(jp, e - ji.now() - la)), Vo && (Vo = clearInterval(Vo)))
      : (Vo || ((Rl = ji.now()), (Vo = setInterval(m2, W0))), (_o = 1), U0(jp));
  }
}
function Dp(e, t, n) {
  var r = new jl();
  return (
    (t = t == null ? 0 : +t),
    r.restart(
      (o) => {
        (r.stop(), e(o + t));
      },
      t,
      n,
    ),
    r
  );
}
var v2 = ia("start", "end", "cancel", "interrupt"),
  x2 = [],
  q0 = 0,
  Op = 1,
  bc = 2,
  Js = 3,
  $p = 4,
  kc = 5,
  el = 6;
function aa(e, t, n, r, o, i) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  w2(e, n, {
    name: t,
    index: r,
    group: o,
    on: v2,
    tween: x2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: q0,
  });
}
function zd(e, t) {
  var n = Ft(e, t);
  if (n.state > q0) throw new Error("too late; already scheduled");
  return n;
}
function nn(e, t) {
  var n = Ft(e, t);
  if (n.state > Js) throw new Error("too late; already running");
  return n;
}
function Ft(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function w2(e, t, n) {
  var r = e.__transition,
    o;
  ((r[t] = n), (n.timer = G0(i, 0, n.time)));
  function i(u) {
    ((n.state = Op), n.timer.restart(s, n.delay, n.time), n.delay <= u && s(u - n.delay));
  }
  function s(u) {
    var d, c, f, y;
    if (n.state !== Op) return a();
    for (d in r)
      if (((y = r[d]), y.name === n.name)) {
        if (y.state === Js) return Dp(s);
        y.state === $p
          ? ((y.state = el), y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete r[d])
          : +d < t && ((y.state = el), y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete r[d]);
      }
    if (
      (Dp(function () {
        n.state === Js && ((n.state = $p), n.timer.restart(l, n.delay, n.time), l(u));
      }),
      (n.state = bc),
      n.on.call("start", e, e.__data__, n.index, n.group),
      n.state === bc)
    ) {
      for (n.state = Js, o = new Array((f = n.tween.length)), d = 0, c = -1; d < f; ++d)
        (y = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (o[++c] = y);
      o.length = c + 1;
    }
  }
  function l(u) {
    for (
      var d = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(a), (n.state = kc), 1),
        c = -1,
        f = o.length;
      ++c < f;
    )
      o[c].call(e, d);
    n.state === kc && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    ((n.state = el), n.timer.stop(), delete r[t]);
    for (var u in r) return;
    delete e.__transition;
  }
}
function tl(e, t) {
  var n = e.__transition,
    r,
    o,
    i = !0,
    s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((r = n[s]).name !== t) {
        i = !1;
        continue;
      }
      ((o = r.state > bc && r.state < kc),
        (r.state = el),
        r.timer.stop(),
        r.on.call(o ? "interrupt" : "cancel", e, e.__data__, r.index, r.group),
        delete n[s]);
    }
    i && delete e.__transition;
  }
}
function _2(e) {
  return this.each(function () {
    tl(this, e);
  });
}
function S2(e, t) {
  var n, r;
  return function () {
    var o = nn(this, e),
      i = o.tween;
    if (i !== n) {
      r = n = i;
      for (var s = 0, l = r.length; s < l; ++s)
        if (r[s].name === t) {
          ((r = r.slice()), r.splice(s, 1));
          break;
        }
    }
    o.tween = r;
  };
}
function E2(e, t, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function () {
    var i = nn(this, e),
      s = i.tween;
    if (s !== r) {
      o = (r = s).slice();
      for (var l = { name: t, value: n }, a = 0, u = o.length; a < u; ++a)
        if (o[a].name === t) {
          o[a] = l;
          break;
        }
      a === u && o.push(l);
    }
    i.tween = o;
  };
}
function b2(e, t) {
  var n = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var r = Ft(this.node(), n).tween, o = 0, i = r.length, s; o < i; ++o) if ((s = r[o]).name === e) return s.value;
    return null;
  }
  return this.each((t == null ? S2 : E2)(n, e, t));
}
function Fd(e, t, n) {
  var r = e._id;
  return (
    e.each(function () {
      var o = nn(this, r);
      (o.value || (o.value = {}))[t] = n.apply(this, arguments);
    }),
    function (o) {
      return Ft(o, r).value[t];
    }
  );
}
function K0(e, t) {
  var n;
  return (typeof t == "number" ? Kt : t instanceof kr ? Il : (n = kr(t)) ? ((t = n), Il) : B0)(e, t);
}
function k2(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function N2(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function C2(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var s = this.getAttribute(e);
    return s === o ? null : s === r ? i : (i = t((r = s), n));
  };
}
function T2(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var s = this.getAttributeNS(e.space, e.local);
    return s === o ? null : s === r ? i : (i = t((r = s), n));
  };
}
function A2(e, t, n) {
  var r, o, i;
  return function () {
    var s,
      l = n(this),
      a;
    return l == null
      ? void this.removeAttribute(e)
      : ((s = this.getAttribute(e)), (a = l + ""), s === a ? null : s === r && a === o ? i : ((o = a), (i = t((r = s), l))));
  };
}
function M2(e, t, n) {
  var r, o, i;
  return function () {
    var s,
      l = n(this),
      a;
    return l == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((s = this.getAttributeNS(e.space, e.local)),
        (a = l + ""),
        s === a ? null : s === r && a === o ? i : ((o = a), (i = t((r = s), l))));
  };
}
function P2(e, t) {
  var n = sa(e),
    r = n === "transform" ? c2 : K0;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (n.local ? M2 : A2)(n, r, Fd(this, "attr." + e, t))
      : t == null
        ? (n.local ? N2 : k2)(n)
        : (n.local ? T2 : C2)(n, r, t),
  );
}
function I2(e, t) {
  return function (n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function L2(e, t) {
  return function (n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function R2(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return (i !== r && (n = (r = i) && L2(e, i)), n);
  }
  return ((o._value = t), o);
}
function j2(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return (i !== r && (n = (r = i) && I2(e, i)), n);
  }
  return ((o._value = t), o);
}
function D2(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = sa(e);
  return this.tween(n, (r.local ? R2 : j2)(r, t));
}
function O2(e, t) {
  return function () {
    zd(this, e).delay = +t.apply(this, arguments);
  };
}
function $2(e, t) {
  return (
    (t = +t),
    function () {
      zd(this, e).delay = t;
    }
  );
}
function z2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? O2 : $2)(t, e)) : Ft(this.node(), t).delay;
}
function F2(e, t) {
  return function () {
    nn(this, e).duration = +t.apply(this, arguments);
  };
}
function B2(e, t) {
  return (
    (t = +t),
    function () {
      nn(this, e).duration = t;
    }
  );
}
function H2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? F2 : B2)(t, e)) : Ft(this.node(), t).duration;
}
function V2(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    nn(this, e).ease = t;
  };
}
function W2(e) {
  var t = this._id;
  return arguments.length ? this.each(V2(t, e)) : Ft(this.node(), t).ease;
}
function U2(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    nn(this, e).ease = n;
  };
}
function G2(e) {
  if (typeof e != "function") throw new Error();
  return this.each(U2(this._id, e));
}
function q2(e) {
  typeof e != "function" && (e = k0(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], s = i.length, l = (r[o] = []), a, u = 0; u < s; ++u)
      (a = i[u]) && e.call(a, a.__data__, u, i) && l.push(a);
  return new wn(r, this._parents, this._name, this._id);
}
function K2(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var t = this._groups, n = e._groups, r = t.length, o = n.length, i = Math.min(r, o), s = new Array(r), l = 0;
    l < i;
    ++l
  )
    for (var a = t[l], u = n[l], d = a.length, c = (s[l] = new Array(d)), f, y = 0; y < d; ++y)
      (f = a[y] || u[y]) && (c[y] = f);
  for (; l < r; ++l) s[l] = t[l];
  return new wn(s, this._parents, this._name, this._id);
}
function Y2(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var n = t.indexOf(".");
      return (n >= 0 && (t = t.slice(0, n)), !t || t === "start");
    });
}
function X2(e, t, n) {
  var r,
    o,
    i = Y2(t) ? zd : nn;
  return function () {
    var s = i(this, e),
      l = s.on;
    (l !== r && (o = (r = l).copy()).on(t, n), (s.on = o));
  };
}
function Q2(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ft(this.node(), n).on.on(e) : this.each(X2(n, e, t));
}
function Z2(e) {
  return function () {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function J2() {
  return this.on("end.remove", Z2(this._id));
}
function eb(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Rd(e));
  for (var r = this._groups, o = r.length, i = new Array(o), s = 0; s < o; ++s)
    for (var l = r[s], a = l.length, u = (i[s] = new Array(a)), d, c, f = 0; f < a; ++f)
      (d = l[f]) &&
        (c = e.call(d, d.__data__, f, l)) &&
        ("__data__" in d && (c.__data__ = d.__data__), (u[f] = c), aa(u[f], t, n, f, u, Ft(d, n)));
  return new wn(i, this._parents, t, n);
}
function tb(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = b0(e));
  for (var r = this._groups, o = r.length, i = [], s = [], l = 0; l < o; ++l)
    for (var a = r[l], u = a.length, d, c = 0; c < u; ++c)
      if ((d = a[c])) {
        for (var f = e.call(d, d.__data__, c, a), y, v = Ft(d, n), x = 0, S = f.length; x < S; ++x)
          (y = f[x]) && aa(y, t, n, x, f, v);
        (i.push(f), s.push(d));
      }
  return new wn(i, s, t, n);
}
var nb = Ki.prototype.constructor;
function rb() {
  return new nb(this._groups, this._parents);
}
function ob(e, t) {
  var n, r, o;
  return function () {
    var i = wo(this, e),
      s = (this.style.removeProperty(e), wo(this, e));
    return i === s ? null : i === n && s === r ? o : (o = t((n = i), (r = s)));
  };
}
function Y0(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function ib(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var s = wo(this, e);
    return s === o ? null : s === r ? i : (i = t((r = s), n));
  };
}
function sb(e, t, n) {
  var r, o, i;
  return function () {
    var s = wo(this, e),
      l = n(this),
      a = l + "";
    return (
      l == null && (a = l = (this.style.removeProperty(e), wo(this, e))),
      s === a ? null : s === r && a === o ? i : ((o = a), (i = t((r = s), l)))
    );
  };
}
function lb(e, t) {
  var n,
    r,
    o,
    i = "style." + t,
    s = "end." + i,
    l;
  return function () {
    var a = nn(this, e),
      u = a.on,
      d = a.value[i] == null ? l || (l = Y0(t)) : void 0;
    ((u !== n || o !== d) && (r = (n = u).copy()).on(s, (o = d)), (a.on = r));
  };
}
function ab(e, t, n) {
  var r = (e += "") == "transform" ? u2 : K0;
  return t == null
    ? this.styleTween(e, ob(e, r)).on("end.style." + e, Y0(e))
    : typeof t == "function"
      ? this.styleTween(e, sb(e, r, Fd(this, "style." + e, t))).each(lb(this._id, e))
      : this.styleTween(e, ib(e, r, t), n).on("end.style." + e, null);
}
function ub(e, t, n) {
  return function (r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function cb(e, t, n) {
  var r, o;
  function i() {
    var s = t.apply(this, arguments);
    return (s !== o && (r = (o = s) && ub(e, s, n)), r);
  }
  return ((i._value = t), i);
}
function db(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, cb(e, t, n ?? ""));
}
function fb(e) {
  return function () {
    this.textContent = e;
  };
}
function pb(e) {
  return function () {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function hb(e) {
  return this.tween("text", typeof e == "function" ? pb(Fd(this, "text", e)) : fb(e == null ? "" : e + ""));
}
function gb(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function mb(e) {
  var t, n;
  function r() {
    var o = e.apply(this, arguments);
    return (o !== n && (t = (n = o) && gb(o)), t);
  }
  return ((r._value = e), r);
}
function yb(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, mb(e));
}
function vb() {
  for (var e = this._name, t = this._id, n = X0(), r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var s = r[i], l = s.length, a, u = 0; u < l; ++u)
      if ((a = s[u])) {
        var d = Ft(a, t);
        aa(a, e, n, u, s, { time: d.time + d.delay + d.duration, delay: 0, duration: d.duration, ease: d.ease });
      }
  return new wn(r, this._parents, e, n);
}
function xb() {
  var e,
    t,
    n = this,
    r = n._id,
    o = n.size();
  return new Promise(function (i, s) {
    var l = { value: s },
      a = {
        value: function () {
          --o === 0 && i();
        },
      };
    (n.each(function () {
      var u = nn(this, r),
        d = u.on;
      (d !== e && ((t = (e = d).copy()), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), (u.on = t));
    }),
      o === 0 && i());
  });
}
var wb = 0;
function wn(e, t, n, r) {
  ((this._groups = e), (this._parents = t), (this._name = n), (this._id = r));
}
function X0() {
  return ++wb;
}
var sn = Ki.prototype;
wn.prototype = {
  constructor: wn,
  select: eb,
  selectAll: tb,
  selectChild: sn.selectChild,
  selectChildren: sn.selectChildren,
  filter: q2,
  merge: K2,
  selection: rb,
  transition: vb,
  call: sn.call,
  nodes: sn.nodes,
  node: sn.node,
  size: sn.size,
  empty: sn.empty,
  each: sn.each,
  on: Q2,
  attr: P2,
  attrTween: D2,
  style: ab,
  styleTween: db,
  text: hb,
  textTween: yb,
  remove: J2,
  tween: b2,
  delay: z2,
  duration: H2,
  ease: W2,
  easeVarying: G2,
  end: xb,
  [Symbol.iterator]: sn[Symbol.iterator],
};
function _b(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Sb = { time: null, delay: 0, duration: 250, ease: _b };
function Eb(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); ) if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return n;
}
function bb(e) {
  var t, n;
  e instanceof wn ? ((t = e._id), (e = e._name)) : ((t = X0()), ((n = Sb).time = $d()), (e = e == null ? null : e + ""));
  for (var r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var s = r[i], l = s.length, a, u = 0; u < l; ++u) (a = s[u]) && aa(a, e, t, u, s, n || Eb(a, t));
  return new wn(r, this._parents, e, t);
}
Ki.prototype.interrupt = _2;
Ki.prototype.transition = bb;
const Ts = (e) => () => e;
function kb(e, { sourceEvent: t, target: n, transform: r, dispatch: o }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: o },
  });
}
function pn(e, t, n) {
  ((this.k = e), (this.x = t), (this.y = n));
}
pn.prototype = {
  constructor: pn,
  scale: function (e) {
    return e === 1 ? this : new pn(this.k * e, this.x, this.y);
  },
  translate: function (e, t) {
    return (e === 0) & (t === 0) ? this : new pn(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function (e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function (e) {
    return e * this.k + this.x;
  },
  applyY: function (e) {
    return e * this.k + this.y;
  },
  invert: function (e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function (e) {
    return (e - this.x) / this.k;
  },
  invertY: function (e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function (e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function (e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
var ua = new pn(1, 0, 0);
Q0.prototype = pn.prototype;
function Q0(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return ua;
  return e.__zoom;
}
function Ja(e) {
  e.stopImmediatePropagation();
}
function Wo(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function Nb(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Cb() {
  var e = this;
  return e instanceof SVGElement
    ? ((e = e.ownerSVGElement || e),
      e.hasAttribute("viewBox")
        ? ((e = e.viewBox.baseVal),
          [
            [e.x, e.y],
            [e.x + e.width, e.y + e.height],
          ])
        : [
            [0, 0],
            [e.width.baseVal.value, e.height.baseVal.value],
          ])
    : [
        [0, 0],
        [e.clientWidth, e.clientHeight],
      ];
}
function zp() {
  return this.__zoom || ua;
}
function Tb(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * (e.ctrlKey ? 10 : 1);
}
function Ab() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Mb(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0],
    o = e.invertX(t[1][0]) - n[1][0],
    i = e.invertY(t[0][1]) - n[0][1],
    s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o),
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
  );
}
function Z0() {
  var e = Nb,
    t = Cb,
    n = Mb,
    r = Tb,
    o = Ab,
    i = [0, 1 / 0],
    s = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    l = 250,
    a = Zs,
    u = ia("start", "zoom", "end"),
    d,
    c,
    f,
    y = 500,
    v = 150,
    x = 0,
    S = 10;
  function h(C) {
    C.property("__zoom", zp)
      .on("wheel.zoom", A, { passive: !1 })
      .on("mousedown.zoom", R)
      .on("dblclick.zoom", z)
      .filter(o)
      .on("touchstart.zoom", L)
      .on("touchmove.zoom", M)
      .on("touchend.zoom touchcancel.zoom", B)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  ((h.transform = function (C, D, I, O) {
    var N = C.selection ? C.selection() : C;
    (N.property("__zoom", zp),
      C !== N
        ? E(C, D, I, O)
        : N.interrupt().each(function () {
            b(this, arguments)
              .event(O)
              .start()
              .zoom(null, typeof D == "function" ? D.apply(this, arguments) : D)
              .end();
          }));
  }),
    (h.scaleBy = function (C, D, I, O) {
      h.scaleTo(
        C,
        function () {
          var N = this.__zoom.k,
            T = typeof D == "function" ? D.apply(this, arguments) : D;
          return N * T;
        },
        I,
        O,
      );
    }),
    (h.scaleTo = function (C, D, I, O) {
      h.transform(
        C,
        function () {
          var N = t.apply(this, arguments),
            T = this.__zoom,
            j = I == null ? w(N) : typeof I == "function" ? I.apply(this, arguments) : I,
            $ = T.invert(j),
            F = typeof D == "function" ? D.apply(this, arguments) : D;
          return n(p(m(T, F), j, $), N, s);
        },
        I,
        O,
      );
    }),
    (h.translateBy = function (C, D, I, O) {
      h.transform(
        C,
        function () {
          return n(
            this.__zoom.translate(
              typeof D == "function" ? D.apply(this, arguments) : D,
              typeof I == "function" ? I.apply(this, arguments) : I,
            ),
            t.apply(this, arguments),
            s,
          );
        },
        null,
        O,
      );
    }),
    (h.translateTo = function (C, D, I, O, N) {
      h.transform(
        C,
        function () {
          var T = t.apply(this, arguments),
            j = this.__zoom,
            $ = O == null ? w(T) : typeof O == "function" ? O.apply(this, arguments) : O;
          return n(
            ua
              .translate($[0], $[1])
              .scale(j.k)
              .translate(
                typeof D == "function" ? -D.apply(this, arguments) : -D,
                typeof I == "function" ? -I.apply(this, arguments) : -I,
              ),
            T,
            s,
          );
        },
        O,
        N,
      );
    }));
  function m(C, D) {
    return ((D = Math.max(i[0], Math.min(i[1], D))), D === C.k ? C : new pn(D, C.x, C.y));
  }
  function p(C, D, I) {
    var O = D[0] - I[0] * C.k,
      N = D[1] - I[1] * C.k;
    return O === C.x && N === C.y ? C : new pn(C.k, O, N);
  }
  function w(C) {
    return [(+C[0][0] + +C[1][0]) / 2, (+C[0][1] + +C[1][1]) / 2];
  }
  function E(C, D, I, O) {
    C.on("start.zoom", function () {
      b(this, arguments).event(O).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        b(this, arguments).event(O).end();
      })
      .tween("zoom", function () {
        var N = this,
          T = arguments,
          j = b(N, T).event(O),
          $ = t.apply(N, T),
          F = I == null ? w($) : typeof I == "function" ? I.apply(N, T) : I,
          G = Math.max($[1][0] - $[0][0], $[1][1] - $[0][1]),
          W = N.__zoom,
          Y = typeof D == "function" ? D.apply(N, T) : D,
          X = a(W.invert(F).concat(G / W.k), Y.invert(F).concat(G / Y.k));
        return function (Q) {
          if (Q === 1) Q = Y;
          else {
            var V = X(Q),
              Z = G / V[2];
            Q = new pn(Z, F[0] - V[0] * Z, F[1] - V[1] * Z);
          }
          j.zoom(null, Q);
        };
      });
  }
  function b(C, D, I) {
    return (!I && C.__zooming) || new k(C, D);
  }
  function k(C, D) {
    ((this.that = C),
      (this.args = D),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = t.apply(C, D)),
      (this.taps = 0));
  }
  k.prototype = {
    event: function (C) {
      return (C && (this.sourceEvent = C), this);
    },
    start: function () {
      return (++this.active === 1 && ((this.that.__zooming = this), this.emit("start")), this);
    },
    zoom: function (C, D) {
      return (
        this.mouse && C !== "mouse" && (this.mouse[1] = D.invert(this.mouse[0])),
        this.touch0 && C !== "touch" && (this.touch0[1] = D.invert(this.touch0[0])),
        this.touch1 && C !== "touch" && (this.touch1[1] = D.invert(this.touch1[0])),
        (this.that.__zoom = D),
        this.emit("zoom"),
        this
      );
    },
    end: function () {
      return (--this.active === 0 && (delete this.that.__zooming, this.emit("end")), this);
    },
    emit: function (C) {
      var D = pt(this.that).datum();
      u.call(
        C,
        this.that,
        new kb(C, { sourceEvent: this.sourceEvent, target: h, transform: this.that.__zoom, dispatch: u }),
        D,
      );
    },
  };
  function A(C, ...D) {
    if (!e.apply(this, arguments)) return;
    var I = b(this, D).event(C),
      O = this.__zoom,
      N = Math.max(i[0], Math.min(i[1], O.k * Math.pow(2, r.apply(this, arguments)))),
      T = Pt(C);
    if (I.wheel)
      ((I.mouse[0][0] !== T[0] || I.mouse[0][1] !== T[1]) && (I.mouse[1] = O.invert((I.mouse[0] = T))),
        clearTimeout(I.wheel));
    else {
      if (O.k === N) return;
      ((I.mouse = [T, O.invert(T)]), tl(this), I.start());
    }
    (Wo(C), (I.wheel = setTimeout(j, v)), I.zoom("mouse", n(p(m(O, N), I.mouse[0], I.mouse[1]), I.extent, s)));
    function j() {
      ((I.wheel = null), I.end());
    }
  }
  function R(C, ...D) {
    if (f || !e.apply(this, arguments)) return;
    var I = C.currentTarget,
      O = b(this, D, !0).event(C),
      N = pt(C.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", G, !0),
      T = Pt(C, I),
      j = C.clientX,
      $ = C.clientY;
    (j0(C.view), Ja(C), (O.mouse = [T, this.__zoom.invert(T)]), tl(this), O.start());
    function F(W) {
      if ((Wo(W), !O.moved)) {
        var Y = W.clientX - j,
          X = W.clientY - $;
        O.moved = Y * Y + X * X > x;
      }
      O.event(W).zoom("mouse", n(p(O.that.__zoom, (O.mouse[0] = Pt(W, I)), O.mouse[1]), O.extent, s));
    }
    function G(W) {
      (N.on("mousemove.zoom mouseup.zoom", null), D0(W.view, O.moved), Wo(W), O.event(W).end());
    }
  }
  function z(C, ...D) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom,
        O = Pt(C.changedTouches ? C.changedTouches[0] : C, this),
        N = I.invert(O),
        T = I.k * (C.shiftKey ? 0.5 : 2),
        j = n(p(m(I, T), O, N), t.apply(this, D), s);
      (Wo(C), l > 0 ? pt(this).transition().duration(l).call(E, j, O, C) : pt(this).call(h.transform, j, O, C));
    }
  }
  function L(C, ...D) {
    if (e.apply(this, arguments)) {
      var I = C.touches,
        O = I.length,
        N = b(this, D, C.changedTouches.length === O).event(C),
        T,
        j,
        $,
        F;
      for (Ja(C), j = 0; j < O; ++j)
        (($ = I[j]),
          (F = Pt($, this)),
          (F = [F, this.__zoom.invert(F), $.identifier]),
          N.touch0
            ? !N.touch1 && N.touch0[2] !== F[2] && ((N.touch1 = F), (N.taps = 0))
            : ((N.touch0 = F), (T = !0), (N.taps = 1 + !!d)));
      (d && (d = clearTimeout(d)),
        T &&
          (N.taps < 2 &&
            ((c = F[0]),
            (d = setTimeout(function () {
              d = null;
            }, y))),
          tl(this),
          N.start()));
    }
  }
  function M(C, ...D) {
    if (this.__zooming) {
      var I = b(this, D).event(C),
        O = C.changedTouches,
        N = O.length,
        T,
        j,
        $,
        F;
      for (Wo(C), T = 0; T < N; ++T)
        ((j = O[T]),
          ($ = Pt(j, this)),
          I.touch0 && I.touch0[2] === j.identifier
            ? (I.touch0[0] = $)
            : I.touch1 && I.touch1[2] === j.identifier && (I.touch1[0] = $));
      if (((j = I.that.__zoom), I.touch1)) {
        var G = I.touch0[0],
          W = I.touch0[1],
          Y = I.touch1[0],
          X = I.touch1[1],
          Q = (Q = Y[0] - G[0]) * Q + (Q = Y[1] - G[1]) * Q,
          V = (V = X[0] - W[0]) * V + (V = X[1] - W[1]) * V;
        ((j = m(j, Math.sqrt(Q / V))),
          ($ = [(G[0] + Y[0]) / 2, (G[1] + Y[1]) / 2]),
          (F = [(W[0] + X[0]) / 2, (W[1] + X[1]) / 2]));
      } else if (I.touch0) (($ = I.touch0[0]), (F = I.touch0[1]));
      else return;
      I.zoom("touch", n(p(j, $, F), I.extent, s));
    }
  }
  function B(C, ...D) {
    if (this.__zooming) {
      var I = b(this, D).event(C),
        O = C.changedTouches,
        N = O.length,
        T,
        j;
      for (
        Ja(C),
          f && clearTimeout(f),
          f = setTimeout(function () {
            f = null;
          }, y),
          T = 0;
        T < N;
        ++T
      )
        ((j = O[T]),
          I.touch0 && I.touch0[2] === j.identifier
            ? delete I.touch0
            : I.touch1 && I.touch1[2] === j.identifier && delete I.touch1);
      if ((I.touch1 && !I.touch0 && ((I.touch0 = I.touch1), delete I.touch1), I.touch0))
        I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if ((I.end(), I.taps === 2 && ((j = Pt(j, this)), Math.hypot(c[0] - j[0], c[1] - j[1]) < S))) {
        var $ = pt(this).on("dblclick.zoom");
        $ && $.apply(this, arguments);
      }
    }
  }
  return (
    (h.wheelDelta = function (C) {
      return arguments.length ? ((r = typeof C == "function" ? C : Ts(+C)), h) : r;
    }),
    (h.filter = function (C) {
      return arguments.length ? ((e = typeof C == "function" ? C : Ts(!!C)), h) : e;
    }),
    (h.touchable = function (C) {
      return arguments.length ? ((o = typeof C == "function" ? C : Ts(!!C)), h) : o;
    }),
    (h.extent = function (C) {
      return arguments.length
        ? ((t =
            typeof C == "function"
              ? C
              : Ts([
                  [+C[0][0], +C[0][1]],
                  [+C[1][0], +C[1][1]],
                ])),
          h)
        : t;
    }),
    (h.scaleExtent = function (C) {
      return arguments.length ? ((i[0] = +C[0]), (i[1] = +C[1]), h) : [i[0], i[1]];
    }),
    (h.translateExtent = function (C) {
      return arguments.length
        ? ((s[0][0] = +C[0][0]), (s[1][0] = +C[1][0]), (s[0][1] = +C[0][1]), (s[1][1] = +C[1][1]), h)
        : [
            [s[0][0], s[0][1]],
            [s[1][0], s[1][1]],
          ];
    }),
    (h.constrain = function (C) {
      return arguments.length ? ((n = C), h) : n;
    }),
    (h.duration = function (C) {
      return arguments.length ? ((l = +C), h) : l;
    }),
    (h.interpolate = function (C) {
      return arguments.length ? ((a = C), h) : a;
    }),
    (h.on = function () {
      var C = u.on.apply(u, arguments);
      return C === u ? h : C;
    }),
    (h.clickDistance = function (C) {
      return arguments.length ? ((x = (C = +C) * C), h) : Math.sqrt(x);
    }),
    (h.tapDistance = function (C) {
      return arguments.length ? ((S = +C), h) : S;
    }),
    h
  );
}
const tn = {
    error001: () =>
      "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
    error002: () =>
      "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
    error004: () => "The React Flow parent container needs a width and a height to render the graph.",
    error005: () => "Only child nodes can use a parent extent.",
    error006: () => "Can't create edge. An edge needs a source and a target.",
    error007: (e) => `The old edge with id=${e} does not exist.`,
    error009: (e) => `Marker type "${e}" doesn't exist.`,
    error008: (e, { id: t, sourceHandle: n, targetHandle: r }) =>
      `Couldn't create edge for ${e} handle id: "${e === "source" ? n : r}", edge id: ${t}.`,
    error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
    error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
    error012: (e) =>
      `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
    error013: (e = "react") =>
      `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
    error014: () =>
      "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
    error015: () =>
      "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  },
  Di = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  J0 = ["Enter", " ", "Escape"],
  ey = {
    "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
    "node.a11yDescription.keyboardDisabled":
      "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
    "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: t, y: n }) =>
      `Moved selected node ${e}. New position, x: ${t}, y: ${n}`,
    "edge.a11yDescription.default":
      "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    "controls.ariaLabel": "Control Panel",
    "controls.zoomIn.ariaLabel": "Zoom In",
    "controls.zoomOut.ariaLabel": "Zoom Out",
    "controls.fitView.ariaLabel": "Fit View",
    "controls.interactive.ariaLabel": "Toggle Interactivity",
    "minimap.ariaLabel": "Mini Map",
    "handle.ariaLabel": "Handle",
  };
var So;
(function (e) {
  ((e.Strict = "strict"), (e.Loose = "loose"));
})(So || (So = {}));
var yr;
(function (e) {
  ((e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal"));
})(yr || (yr = {}));
var Oi;
(function (e) {
  ((e.Partial = "partial"), (e.Full = "full"));
})(Oi || (Oi = {}));
const ty = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null,
};
var $n;
(function (e) {
  ((e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier"));
})($n || ($n = {}));
var $i;
(function (e) {
  ((e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed"));
})($i || ($i = {}));
var re;
(function (e) {
  ((e.Left = "left"), (e.Top = "top"), (e.Right = "right"), (e.Bottom = "bottom"));
})(re || (re = {}));
const Fp = { [re.Left]: re.Right, [re.Right]: re.Left, [re.Top]: re.Bottom, [re.Bottom]: re.Top };
function ny(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const ry = (e) => "id" in e && "source" in e && "target" in e,
  Pb = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e),
  Bd = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e),
  Xi = (e, t = [0, 0]) => {
    const { width: n, height: r } = Sn(e),
      o = e.origin ?? t,
      i = n * o[0],
      s = r * o[1];
    return { x: e.position.x - i, y: e.position.y - s };
  },
  Ib = (e, t = { nodeOrigin: [0, 0] }) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const n = e.reduce(
      (r, o) => {
        const i = typeof o == "string";
        let s = !t.nodeLookup && !i ? o : void 0;
        t.nodeLookup && (s = i ? t.nodeLookup.get(o) : Bd(o) ? o : t.nodeLookup.get(o.id));
        const l = s ? Dl(s, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
        return ca(r, l);
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
    );
    return da(n);
  },
  Qi = (e, t = {}) => {
    let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
      r = !1;
    return (
      e.forEach((o) => {
        (t.filter === void 0 || t.filter(o)) && ((n = ca(n, Dl(o))), (r = !0));
      }),
      r ? da(n) : { x: 0, y: 0, width: 0, height: 0 }
    );
  },
  Hd = (e, t, [n, r, o] = [0, 0, 1], i = !1, s = !1) => {
    const l = { ...Ji(t, [n, r, o]), width: t.width / o, height: t.height / o },
      a = [];
    for (const u of e.values()) {
      const { measured: d, selectable: c = !0, hidden: f = !1 } = u;
      if ((s && !c) || f) continue;
      const y = d.width ?? u.width ?? u.initialWidth ?? null,
        v = d.height ?? u.height ?? u.initialHeight ?? null,
        x = zi(l, bo(u)),
        S = (y ?? 0) * (v ?? 0),
        h = i && x > 0;
      (!u.internals.handleBounds || h || x >= S || u.dragging) && a.push(u);
    }
    return a;
  },
  Lb = (e, t) => {
    const n = new Set();
    return (
      e.forEach((r) => {
        n.add(r.id);
      }),
      t.filter((r) => n.has(r.source) || n.has(r.target))
    );
  };
function Rb(e, t) {
  const n = new Map(),
    r = t != null && t.nodes ? new Set(t.nodes.map((o) => o.id)) : null;
  return (
    e.forEach((o) => {
      o.measured.width &&
        o.measured.height &&
        ((t == null ? void 0 : t.includeHiddenNodes) || !o.hidden) &&
        (!r || r.has(o.id)) &&
        n.set(o.id, o);
    }),
    n
  );
}
async function jb({ nodes: e, width: t, height: n, panZoom: r, minZoom: o, maxZoom: i }, s) {
  if (e.size === 0) return Promise.resolve(!0);
  const l = Rb(e, s),
    a = Qi(l),
    u = Vd(
      a,
      t,
      n,
      (s == null ? void 0 : s.minZoom) ?? o,
      (s == null ? void 0 : s.maxZoom) ?? i,
      (s == null ? void 0 : s.padding) ?? 0.1,
    );
  return (
    await r.setViewport(u, {
      duration: s == null ? void 0 : s.duration,
      ease: s == null ? void 0 : s.ease,
      interpolate: s == null ? void 0 : s.interpolate,
    }),
    Promise.resolve(!0)
  );
}
function oy({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: o, onError: i }) {
  const s = n.get(e),
    l = s.parentId ? n.get(s.parentId) : void 0,
    { x: a, y: u } = l ? l.internals.positionAbsolute : { x: 0, y: 0 },
    d = s.origin ?? r;
  let c = s.extent || o;
  if (s.extent === "parent" && !s.expandParent)
    if (!l) i == null || i("005", tn.error005());
    else {
      const y = l.measured.width,
        v = l.measured.height;
      y &&
        v &&
        (c = [
          [a, u],
          [a + y, u + v],
        ]);
    }
  else
    l &&
      ko(s.extent) &&
      (c = [
        [s.extent[0][0] + a, s.extent[0][1] + u],
        [s.extent[1][0] + a, s.extent[1][1] + u],
      ]);
  const f = ko(c) ? Cr(t, c, s.measured) : t;
  return (
    (s.measured.width === void 0 || s.measured.height === void 0) && (i == null || i("015", tn.error015())),
    {
      position: { x: f.x - a + (s.measured.width ?? 0) * d[0], y: f.y - u + (s.measured.height ?? 0) * d[1] },
      positionAbsolute: f,
    }
  );
}
async function Db({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: o }) {
  const i = new Set(e.map((f) => f.id)),
    s = [];
  for (const f of n) {
    if (f.deletable === !1) continue;
    const y = i.has(f.id),
      v = !y && f.parentId && s.find((x) => x.id === f.parentId);
    (y || v) && s.push(f);
  }
  const l = new Set(t.map((f) => f.id)),
    a = r.filter((f) => f.deletable !== !1),
    d = Lb(s, a);
  for (const f of a) l.has(f.id) && !d.find((v) => v.id === f.id) && d.push(f);
  if (!o) return { edges: d, nodes: s };
  const c = await o({ nodes: s, edges: d });
  return typeof c == "boolean" ? (c ? { edges: d, nodes: s } : { edges: [], nodes: [] }) : c;
}
const Eo = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n),
  Cr = (e = { x: 0, y: 0 }, t, n) => ({
    x: Eo(e.x, t[0][0], t[1][0] - ((n == null ? void 0 : n.width) ?? 0)),
    y: Eo(e.y, t[0][1], t[1][1] - ((n == null ? void 0 : n.height) ?? 0)),
  });
function iy(e, t, n) {
  const { width: r, height: o } = Sn(n),
    { x: i, y: s } = n.internals.positionAbsolute;
  return Cr(
    e,
    [
      [i, s],
      [i + r, s + o],
    ],
    t,
  );
}
const Bp = (e, t, n) => (e < t ? Eo(Math.abs(e - t), 1, t) / t : e > n ? -Eo(Math.abs(e - n), 1, t) / t : 0),
  sy = (e, t, n = 15, r = 40) => {
    const o = Bp(e.x, r, t.width - r) * n,
      i = Bp(e.y, r, t.height - r) * n;
    return [o, i];
  },
  ca = (e, t) => ({ x: Math.min(e.x, t.x), y: Math.min(e.y, t.y), x2: Math.max(e.x2, t.x2), y2: Math.max(e.y2, t.y2) }),
  Nc = ({ x: e, y: t, width: n, height: r }) => ({ x: e, y: t, x2: e + n, y2: t + r }),
  da = ({ x: e, y: t, x2: n, y2: r }) => ({ x: e, y: t, width: n - e, height: r - t }),
  bo = (e, t = [0, 0]) => {
    var o, i;
    const { x: n, y: r } = Bd(e) ? e.internals.positionAbsolute : Xi(e, t);
    return {
      x: n,
      y: r,
      width: ((o = e.measured) == null ? void 0 : o.width) ?? e.width ?? e.initialWidth ?? 0,
      height: ((i = e.measured) == null ? void 0 : i.height) ?? e.height ?? e.initialHeight ?? 0,
    };
  },
  Dl = (e, t = [0, 0]) => {
    var o, i;
    const { x: n, y: r } = Bd(e) ? e.internals.positionAbsolute : Xi(e, t);
    return {
      x: n,
      y: r,
      x2: n + (((o = e.measured) == null ? void 0 : o.width) ?? e.width ?? e.initialWidth ?? 0),
      y2: r + (((i = e.measured) == null ? void 0 : i.height) ?? e.height ?? e.initialHeight ?? 0),
    };
  },
  ly = (e, t) => da(ca(Nc(e), Nc(t))),
  zi = (e, t) => {
    const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)),
      r = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
    return Math.ceil(n * r);
  },
  Hp = (e) => Rt(e.width) && Rt(e.height) && Rt(e.x) && Rt(e.y),
  Rt = (e) => !isNaN(e) && isFinite(e),
  Ob = (e, t) => {},
  Zi = (e, t = [1, 1]) => ({ x: t[0] * Math.round(e.x / t[0]), y: t[1] * Math.round(e.y / t[1]) }),
  Ji = ({ x: e, y: t }, [n, r, o], i = !1, s = [1, 1]) => {
    const l = { x: (e - n) / o, y: (t - r) / o };
    return i ? Zi(l, s) : l;
  },
  Ol = ({ x: e, y: t }, [n, r, o]) => ({ x: e * o + n, y: t * o + r });
function Dr(e, t) {
  if (typeof e == "number") return Math.floor((t - t / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n)) return Math.floor(n);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n)) return Math.floor(t * n * 0.01);
  }
  return (
    console.error(
      `[React Flow] The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`,
    ),
    0
  );
}
function $b(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const r = Dr(e, n),
      o = Dr(e, t);
    return { top: r, right: o, bottom: r, left: o, x: o * 2, y: r * 2 };
  }
  if (typeof e == "object") {
    const r = Dr(e.top ?? e.y ?? 0, n),
      o = Dr(e.bottom ?? e.y ?? 0, n),
      i = Dr(e.left ?? e.x ?? 0, t),
      s = Dr(e.right ?? e.x ?? 0, t);
    return { top: r, right: s, bottom: o, left: i, x: i + s, y: r + o };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function zb(e, t, n, r, o, i) {
  const { x: s, y: l } = Ol(e, [t, n, r]),
    { x: a, y: u } = Ol({ x: e.x + e.width, y: e.y + e.height }, [t, n, r]),
    d = o - a,
    c = i - u;
  return { left: Math.floor(s), top: Math.floor(l), right: Math.floor(d), bottom: Math.floor(c) };
}
const Vd = (e, t, n, r, o, i) => {
    const s = $b(i, t, n),
      l = (t - s.x) / e.width,
      a = (n - s.y) / e.height,
      u = Math.min(l, a),
      d = Eo(u, r, o),
      c = e.x + e.width / 2,
      f = e.y + e.height / 2,
      y = t / 2 - c * d,
      v = n / 2 - f * d,
      x = zb(e, y, v, d, t, n),
      S = {
        left: Math.min(x.left - s.left, 0),
        top: Math.min(x.top - s.top, 0),
        right: Math.min(x.right - s.right, 0),
        bottom: Math.min(x.bottom - s.bottom, 0),
      };
    return { x: y - S.left + S.right, y: v - S.top + S.bottom, zoom: d };
  },
  Fi = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0
    );
  };
function ko(e) {
  return e != null && e !== "parent";
}
function Sn(e) {
  var t, n;
  return {
    width: ((t = e.measured) == null ? void 0 : t.width) ?? e.width ?? e.initialWidth ?? 0,
    height: ((n = e.measured) == null ? void 0 : n.height) ?? e.height ?? e.initialHeight ?? 0,
  };
}
function ay(e) {
  var t, n;
  return (
    (((t = e.measured) == null ? void 0 : t.width) ?? e.width ?? e.initialWidth) !== void 0 &&
    (((n = e.measured) == null ? void 0 : n.height) ?? e.height ?? e.initialHeight) !== void 0
  );
}
function uy(e, t = { width: 0, height: 0 }, n, r, o) {
  const i = { ...e },
    s = r.get(n);
  if (s) {
    const l = s.origin || o;
    ((i.x += s.internals.positionAbsolute.x - (t.width ?? 0) * l[0]),
      (i.y += s.internals.positionAbsolute.y - (t.height ?? 0) * l[1]));
  }
  return i;
}
function Vp(e, t) {
  if (e.size !== t.size) return !1;
  for (const n of e) if (!t.has(n)) return !1;
  return !0;
}
function Fb() {
  let e, t;
  return {
    promise: new Promise((r, o) => {
      ((e = r), (t = o));
    }),
    resolve: e,
    reject: t,
  };
}
function Bb(e) {
  return { ...ey, ...(e || {}) };
}
function di(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: o }) {
  const { x: i, y: s } = jt(e),
    l = Ji({ x: i - ((o == null ? void 0 : o.left) ?? 0), y: s - ((o == null ? void 0 : o.top) ?? 0) }, r),
    { x: a, y: u } = n ? Zi(l, t) : l;
  return { xSnapped: a, ySnapped: u, ...l };
}
const Wd = (e) => ({ width: e.offsetWidth, height: e.offsetHeight }),
  cy = (e) => {
    var t;
    return (
      ((t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e)) || (window == null ? void 0 : window.document)
    );
  },
  Hb = ["INPUT", "SELECT", "TEXTAREA"];
function dy(e) {
  var r, o;
  const t = ((o = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : o[0]) || e.target;
  return (t == null ? void 0 : t.nodeType) !== 1
    ? !1
    : Hb.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const fy = (e) => "clientX" in e,
  jt = (e, t) => {
    var i, s;
    const n = fy(e),
      r = n ? e.clientX : (i = e.touches) == null ? void 0 : i[0].clientX,
      o = n ? e.clientY : (s = e.touches) == null ? void 0 : s[0].clientY;
    return { x: r - ((t == null ? void 0 : t.left) ?? 0), y: o - ((t == null ? void 0 : t.top) ?? 0) };
  },
  Wp = (e, t, n, r, o) => {
    const i = t.querySelectorAll(`.${e}`);
    return !i || !i.length
      ? null
      : Array.from(i).map((s) => {
          const l = s.getBoundingClientRect();
          return {
            id: s.getAttribute("data-handleid"),
            type: e,
            nodeId: o,
            position: s.getAttribute("data-handlepos"),
            x: (l.left - n.left) / r,
            y: (l.top - n.top) / r,
            ...Wd(s),
          };
        });
  };
function py({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: r,
  sourceControlX: o,
  sourceControlY: i,
  targetControlX: s,
  targetControlY: l,
}) {
  const a = e * 0.125 + o * 0.375 + s * 0.375 + n * 0.125,
    u = t * 0.125 + i * 0.375 + l * 0.375 + r * 0.125,
    d = Math.abs(a - e),
    c = Math.abs(u - t);
  return [a, u, d, c];
}
function As(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Up({ pos: e, x1: t, y1: n, x2: r, y2: o, c: i }) {
  switch (e) {
    case re.Left:
      return [t - As(t - r, i), n];
    case re.Right:
      return [t + As(r - t, i), n];
    case re.Top:
      return [t, n - As(n - o, i)];
    case re.Bottom:
      return [t, n + As(o - n, i)];
  }
}
function hy({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = re.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: i = re.Top,
  curvature: s = 0.25,
}) {
  const [l, a] = Up({ pos: n, x1: e, y1: t, x2: r, y2: o, c: s }),
    [u, d] = Up({ pos: i, x1: r, y1: o, x2: e, y2: t, c: s }),
    [c, f, y, v] = py({
      sourceX: e,
      sourceY: t,
      targetX: r,
      targetY: o,
      sourceControlX: l,
      sourceControlY: a,
      targetControlX: u,
      targetControlY: d,
    });
  return [`M${e},${t} C${l},${a} ${u},${d} ${r},${o}`, c, f, y, v];
}
function gy({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const o = Math.abs(n - e) / 2,
    i = n < e ? n + o : n - o,
    s = Math.abs(r - t) / 2,
    l = r < t ? r + s : r - s;
  return [i, l, o, s];
}
function Vb({
  sourceNode: e,
  targetNode: t,
  selected: n = !1,
  zIndex: r = 0,
  elevateOnSelect: o = !1,
  zIndexMode: i = "basic",
}) {
  if (i === "manual") return r;
  const s = o && n ? r + 1e3 : r,
    l = Math.max(e.parentId || (o && e.selected) ? e.internals.z : 0, t.parentId || (o && t.selected) ? t.internals.z : 0);
  return s + l;
}
function Wb({ sourceNode: e, targetNode: t, width: n, height: r, transform: o }) {
  const i = ca(Dl(e), Dl(t));
  (i.x === i.x2 && (i.x2 += 1), i.y === i.y2 && (i.y2 += 1));
  const s = { x: -o[0] / o[2], y: -o[1] / o[2], width: n / o[2], height: r / o[2] };
  return zi(s, da(i)) > 0;
}
const Ub = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`,
  Gb = (e, t) =>
    t.some(
      (n) =>
        n.source === e.source &&
        n.target === e.target &&
        (n.sourceHandle === e.sourceHandle || (!n.sourceHandle && !e.sourceHandle)) &&
        (n.targetHandle === e.targetHandle || (!n.targetHandle && !e.targetHandle)),
    ),
  qb = (e, t, n = {}) => {
    if (!e.source || !e.target) return t;
    const r = n.getEdgeId || Ub;
    let o;
    return (
      ry(e) ? (o = { ...e }) : (o = { ...e, id: r(e) }),
      Gb(o, t)
        ? t
        : (o.sourceHandle === null && delete o.sourceHandle, o.targetHandle === null && delete o.targetHandle, t.concat(o))
    );
  };
function my({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const [o, i, s, l] = gy({ sourceX: e, sourceY: t, targetX: n, targetY: r });
  return [`M ${e},${t}L ${n},${r}`, o, i, s, l];
}
const Gp = { [re.Left]: { x: -1, y: 0 }, [re.Right]: { x: 1, y: 0 }, [re.Top]: { x: 0, y: -1 }, [re.Bottom]: { x: 0, y: 1 } },
  Kb = ({ source: e, sourcePosition: t = re.Bottom, target: n }) =>
    t === re.Left || t === re.Right
      ? e.x < n.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < n.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  qp = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function Yb({
  source: e,
  sourcePosition: t = re.Bottom,
  target: n,
  targetPosition: r = re.Top,
  center: o,
  offset: i,
  stepPosition: s,
}) {
  const l = Gp[t],
    a = Gp[r],
    u = { x: e.x + l.x * i, y: e.y + l.y * i },
    d = { x: n.x + a.x * i, y: n.y + a.y * i },
    c = Kb({ source: u, sourcePosition: t, target: d }),
    f = c.x !== 0 ? "x" : "y",
    y = c[f];
  let v = [],
    x,
    S;
  const h = { x: 0, y: 0 },
    m = { x: 0, y: 0 },
    [, , p, w] = gy({ sourceX: e.x, sourceY: e.y, targetX: n.x, targetY: n.y });
  if (l[f] * a[f] === -1) {
    f === "x"
      ? ((x = o.x ?? u.x + (d.x - u.x) * s), (S = o.y ?? (u.y + d.y) / 2))
      : ((x = o.x ?? (u.x + d.x) / 2), (S = o.y ?? u.y + (d.y - u.y) * s));
    const b = [
        { x, y: u.y },
        { x, y: d.y },
      ],
      k = [
        { x: u.x, y: S },
        { x: d.x, y: S },
      ];
    l[f] === y ? (v = f === "x" ? b : k) : (v = f === "x" ? k : b);
  } else {
    const b = [{ x: u.x, y: d.y }],
      k = [{ x: d.x, y: u.y }];
    if ((f === "x" ? (v = l.x === y ? k : b) : (v = l.y === y ? b : k), t === r)) {
      const M = Math.abs(e[f] - n[f]);
      if (M <= i) {
        const B = Math.min(i - 1, i - M);
        l[f] === y ? (h[f] = (u[f] > e[f] ? -1 : 1) * B) : (m[f] = (d[f] > n[f] ? -1 : 1) * B);
      }
    }
    if (t !== r) {
      const M = f === "x" ? "y" : "x",
        B = l[f] === a[M],
        C = u[M] > d[M],
        D = u[M] < d[M];
      ((l[f] === 1 && ((!B && C) || (B && D))) || (l[f] !== 1 && ((!B && D) || (B && C)))) && (v = f === "x" ? b : k);
    }
    const A = { x: u.x + h.x, y: u.y + h.y },
      R = { x: d.x + m.x, y: d.y + m.y },
      z = Math.max(Math.abs(A.x - v[0].x), Math.abs(R.x - v[0].x)),
      L = Math.max(Math.abs(A.y - v[0].y), Math.abs(R.y - v[0].y));
    z >= L ? ((x = (A.x + R.x) / 2), (S = v[0].y)) : ((x = v[0].x), (S = (A.y + R.y) / 2));
  }
  return [[e, { x: u.x + h.x, y: u.y + h.y }, ...v, { x: d.x + m.x, y: d.y + m.y }, n], x, S, p, w];
}
function Xb(e, t, n, r) {
  const o = Math.min(qp(e, t) / 2, qp(t, n) / 2, r),
    { x: i, y: s } = t;
  if ((e.x === i && i === n.x) || (e.y === s && s === n.y)) return `L${i} ${s}`;
  if (e.y === s) {
    const u = e.x < n.x ? -1 : 1,
      d = e.y < n.y ? 1 : -1;
    return `L ${i + o * u},${s}Q ${i},${s} ${i},${s + o * d}`;
  }
  const l = e.x < n.x ? 1 : -1,
    a = e.y < n.y ? -1 : 1;
  return `L ${i},${s + o * a}Q ${i},${s} ${i + o * l},${s}`;
}
function Cc({
  sourceX: e,
  sourceY: t,
  sourcePosition: n = re.Bottom,
  targetX: r,
  targetY: o,
  targetPosition: i = re.Top,
  borderRadius: s = 5,
  centerX: l,
  centerY: a,
  offset: u = 20,
  stepPosition: d = 0.5,
}) {
  const [c, f, y, v, x] = Yb({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: r, y: o },
    targetPosition: i,
    center: { x: l, y: a },
    offset: u,
    stepPosition: d,
  });
  return [
    c.reduce((h, m, p) => {
      let w = "";
      return (
        p > 0 && p < c.length - 1 ? (w = Xb(c[p - 1], m, c[p + 1], s)) : (w = `${p === 0 ? "M" : "L"}${m.x} ${m.y}`),
        (h += w),
        h
      );
    }, ""),
    f,
    y,
    v,
    x,
  ];
}
function Kp(e) {
  var t;
  return (
    e &&
    !!(e.internals.handleBounds || ((t = e.handles) != null && t.length)) &&
    !!(e.measured.width || e.width || e.initialWidth)
  );
}
function Qb(e) {
  var c;
  const { sourceNode: t, targetNode: n } = e;
  if (!Kp(t) || !Kp(n)) return null;
  const r = t.internals.handleBounds || Yp(t.handles),
    o = n.internals.handleBounds || Yp(n.handles),
    i = Xp((r == null ? void 0 : r.source) ?? [], e.sourceHandle),
    s = Xp(
      e.connectionMode === So.Strict
        ? ((o == null ? void 0 : o.target) ?? [])
        : ((o == null ? void 0 : o.target) ?? []).concat((o == null ? void 0 : o.source) ?? []),
      e.targetHandle,
    );
  if (!i || !s)
    return (
      (c = e.onError) == null ||
        c.call(
          e,
          "008",
          tn.error008(i ? "target" : "source", { id: e.id, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle }),
        ),
      null
    );
  const l = (i == null ? void 0 : i.position) || re.Bottom,
    a = (s == null ? void 0 : s.position) || re.Top,
    u = Tr(t, i, l),
    d = Tr(n, s, a);
  return { sourceX: u.x, sourceY: u.y, targetX: d.x, targetY: d.y, sourcePosition: l, targetPosition: a };
}
function Yp(e) {
  if (!e) return null;
  const t = [],
    n = [];
  for (const r of e)
    ((r.width = r.width ?? 1),
      (r.height = r.height ?? 1),
      r.type === "source" ? t.push(r) : r.type === "target" && n.push(r));
  return { source: t, target: n };
}
function Tr(e, t, n = re.Left, r = !1) {
  const o = ((t == null ? void 0 : t.x) ?? 0) + e.internals.positionAbsolute.x,
    i = ((t == null ? void 0 : t.y) ?? 0) + e.internals.positionAbsolute.y,
    { width: s, height: l } = t ?? Sn(e);
  if (r) return { x: o + s / 2, y: i + l / 2 };
  switch ((t == null ? void 0 : t.position) ?? n) {
    case re.Top:
      return { x: o + s / 2, y: i };
    case re.Right:
      return { x: o + s, y: i + l / 2 };
    case re.Bottom:
      return { x: o + s / 2, y: i + l };
    case re.Left:
      return { x: o, y: i + l / 2 };
  }
}
function Xp(e, t) {
  return (e && (t ? e.find((n) => n.id === t) : e[0])) || null;
}
function Tc(e, t) {
  return e
    ? typeof e == "string"
      ? e
      : `${t ? `${t}__` : ""}${Object.keys(e)
          .sort()
          .map((r) => `${r}=${e[r]}`)
          .join("&")}`
    : "";
}
function Zb(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: o }) {
  const i = new Set();
  return e
    .reduce(
      (s, l) => (
        [l.markerStart || r, l.markerEnd || o].forEach((a) => {
          if (a && typeof a == "object") {
            const u = Tc(a, t);
            i.has(u) || (s.push({ id: u, color: a.color || n, ...a }), i.add(u));
          }
        }),
        s
      ),
      [],
    )
    .sort((s, l) => s.id.localeCompare(l.id));
}
const yy = 1e3,
  Jb = 10,
  Ud = { nodeOrigin: [0, 0], nodeExtent: Di, elevateNodesOnSelect: !0, zIndexMode: "basic", defaults: {} },
  ek = { ...Ud, checkEquality: !0 };
function Gd(e, t) {
  const n = { ...e };
  for (const r in t) t[r] !== void 0 && (n[r] = t[r]);
  return n;
}
function tk(e, t, n) {
  const r = Gd(Ud, n);
  for (const o of e.values())
    if (o.parentId) Kd(o, e, t, r);
    else {
      const i = Xi(o, r.nodeOrigin),
        s = ko(o.extent) ? o.extent : r.nodeExtent,
        l = Cr(i, s, Sn(o));
      o.internals.positionAbsolute = l;
    }
}
function nk(e, t) {
  if (!e.handles) return e.measured ? (t == null ? void 0 : t.internals.handleBounds) : void 0;
  const n = [],
    r = [];
  for (const o of e.handles) {
    const i = {
      id: o.id,
      width: o.width ?? 1,
      height: o.height ?? 1,
      nodeId: e.id,
      x: o.x,
      y: o.y,
      position: o.position,
      type: o.type,
    };
    o.type === "source" ? n.push(i) : o.type === "target" && r.push(i);
  }
  return { source: n, target: r };
}
function qd(e) {
  return e === "manual";
}
function Ac(e, t, n, r = {}) {
  var u, d;
  const o = Gd(ek, r),
    i = { i: 0 },
    s = new Map(t),
    l = o != null && o.elevateNodesOnSelect && !qd(o.zIndexMode) ? yy : 0;
  let a = e.length > 0;
  (t.clear(), n.clear());
  for (const c of e) {
    let f = s.get(c.id);
    if (o.checkEquality && c === (f == null ? void 0 : f.internals.userNode)) t.set(c.id, f);
    else {
      const y = Xi(c, o.nodeOrigin),
        v = ko(c.extent) ? c.extent : o.nodeExtent,
        x = Cr(y, v, Sn(c));
      ((f = {
        ...o.defaults,
        ...c,
        measured: {
          width: (u = c.measured) == null ? void 0 : u.width,
          height: (d = c.measured) == null ? void 0 : d.height,
        },
        internals: { positionAbsolute: x, handleBounds: nk(c, f), z: vy(c, l, o.zIndexMode), userNode: c },
      }),
        t.set(c.id, f));
    }
    ((f.measured === void 0 || f.measured.width === void 0 || f.measured.height === void 0) && !f.hidden && (a = !1),
      c.parentId && Kd(f, t, n, r, i));
  }
  return a;
}
function rk(e, t) {
  if (!e.parentId) return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, new Map([[e.id, e]]));
}
function Kd(e, t, n, r, o) {
  const { elevateNodesOnSelect: i, nodeOrigin: s, nodeExtent: l, zIndexMode: a } = Gd(Ud, r),
    u = e.parentId,
    d = t.get(u);
  if (!d) {
    console.warn(
      `Parent node ${u} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`,
    );
    return;
  }
  (rk(e, n),
    o &&
      !d.parentId &&
      d.internals.rootParentIndex === void 0 &&
      a === "auto" &&
      ((d.internals.rootParentIndex = ++o.i), (d.internals.z = d.internals.z + o.i * Jb)),
    o && d.internals.rootParentIndex !== void 0 && (o.i = d.internals.rootParentIndex));
  const c = i && !qd(a) ? yy : 0,
    { x: f, y, z: v } = ok(e, d, s, l, c, a),
    { positionAbsolute: x } = e.internals,
    S = f !== x.x || y !== x.y;
  (S || v !== e.internals.z) &&
    t.set(e.id, { ...e, internals: { ...e.internals, positionAbsolute: S ? { x: f, y } : x, z: v } });
}
function vy(e, t, n) {
  const r = Rt(e.zIndex) ? e.zIndex : 0;
  return qd(n) ? r : r + (e.selected ? t : 0);
}
function ok(e, t, n, r, o, i) {
  const { x: s, y: l } = t.internals.positionAbsolute,
    a = Sn(e),
    u = Xi(e, n),
    d = ko(e.extent) ? Cr(u, e.extent, a) : u;
  let c = Cr({ x: s + d.x, y: l + d.y }, r, a);
  e.extent === "parent" && (c = iy(c, a, t));
  const f = vy(e, o, i),
    y = t.internals.z ?? 0;
  return { x: c.x, y: c.y, z: y >= f ? y + 1 : f };
}
function Yd(e, t, n, r = [0, 0]) {
  var s;
  const o = [],
    i = new Map();
  for (const l of e) {
    const a = t.get(l.parentId);
    if (!a) continue;
    const u = ((s = i.get(l.parentId)) == null ? void 0 : s.expandedRect) ?? bo(a),
      d = ly(u, l.rect);
    i.set(l.parentId, { expandedRect: d, parent: a });
  }
  return (
    i.size > 0 &&
      i.forEach(({ expandedRect: l, parent: a }, u) => {
        var p;
        const d = a.internals.positionAbsolute,
          c = Sn(a),
          f = a.origin ?? r,
          y = l.x < d.x ? Math.round(Math.abs(d.x - l.x)) : 0,
          v = l.y < d.y ? Math.round(Math.abs(d.y - l.y)) : 0,
          x = Math.max(c.width, Math.round(l.width)),
          S = Math.max(c.height, Math.round(l.height)),
          h = (x - c.width) * f[0],
          m = (S - c.height) * f[1];
        ((y > 0 || v > 0 || h || m) &&
          (o.push({ id: u, type: "position", position: { x: a.position.x - y + h, y: a.position.y - v + m } }),
          (p = n.get(u)) == null ||
            p.forEach((w) => {
              e.some((E) => E.id === w.id) ||
                o.push({ id: w.id, type: "position", position: { x: w.position.x + y, y: w.position.y + v } });
            })),
          (c.width < l.width || c.height < l.height || y || v) &&
            o.push({
              id: u,
              type: "dimensions",
              setAttributes: !0,
              dimensions: { width: x + (y ? f[0] * y - h : 0), height: S + (v ? f[1] * v - m : 0) },
            }));
      }),
    o
  );
}
function ik(e, t, n, r, o, i, s) {
  const l = r == null ? void 0 : r.querySelector(".xyflow__viewport");
  let a = !1;
  if (!l) return { changes: [], updatedInternals: a };
  const u = [],
    d = window.getComputedStyle(l),
    { m22: c } = new window.DOMMatrixReadOnly(d.transform),
    f = [];
  for (const y of e.values()) {
    const v = t.get(y.id);
    if (!v) continue;
    if (v.hidden) {
      (t.set(v.id, { ...v, internals: { ...v.internals, handleBounds: void 0 } }), (a = !0));
      continue;
    }
    const x = Wd(y.nodeElement),
      S = v.measured.width !== x.width || v.measured.height !== x.height;
    if (!!(x.width && x.height && (S || !v.internals.handleBounds || y.force))) {
      const m = y.nodeElement.getBoundingClientRect(),
        p = ko(v.extent) ? v.extent : i;
      let { positionAbsolute: w } = v.internals;
      v.parentId && v.extent === "parent" ? (w = iy(w, x, t.get(v.parentId))) : p && (w = Cr(w, p, x));
      const E = {
        ...v,
        measured: x,
        internals: {
          ...v.internals,
          positionAbsolute: w,
          handleBounds: { source: Wp("source", y.nodeElement, m, c, v.id), target: Wp("target", y.nodeElement, m, c, v.id) },
        },
      };
      (t.set(v.id, E),
        v.parentId && Kd(E, t, n, { nodeOrigin: o, zIndexMode: s }),
        (a = !0),
        S &&
          (u.push({ id: v.id, type: "dimensions", dimensions: x }),
          v.expandParent && v.parentId && f.push({ id: v.id, parentId: v.parentId, rect: bo(E, o) })));
    }
  }
  if (f.length > 0) {
    const y = Yd(f, t, n, o);
    u.push(...y);
  }
  return { changes: u, updatedInternals: a };
}
async function sk({ delta: e, panZoom: t, transform: n, translateExtent: r, width: o, height: i }) {
  if (!t || (!e.x && !e.y)) return Promise.resolve(!1);
  const s = await t.setViewportConstrained(
      { x: n[0] + e.x, y: n[1] + e.y, zoom: n[2] },
      [
        [0, 0],
        [o, i],
      ],
      r,
    ),
    l = !!s && (s.x !== n[0] || s.y !== n[1] || s.k !== n[2]);
  return Promise.resolve(l);
}
function Qp(e, t, n, r, o, i) {
  let s = o;
  const l = r.get(s) || new Map();
  (r.set(s, l.set(n, t)), (s = `${o}-${e}`));
  const a = r.get(s) || new Map();
  if ((r.set(s, a.set(n, t)), i)) {
    s = `${o}-${e}-${i}`;
    const u = r.get(s) || new Map();
    r.set(s, u.set(n, t));
  }
}
function xy(e, t, n) {
  (e.clear(), t.clear());
  for (const r of n) {
    const { source: o, target: i, sourceHandle: s = null, targetHandle: l = null } = r,
      a = { edgeId: r.id, source: o, target: i, sourceHandle: s, targetHandle: l },
      u = `${o}-${s}--${i}-${l}`,
      d = `${i}-${l}--${o}-${s}`;
    (Qp("source", a, d, e, o, s), Qp("target", a, u, e, i, l), t.set(r.id, r));
  }
}
function wy(e, t) {
  if (!e.parentId) return !1;
  const n = t.get(e.parentId);
  return n ? (n.selected ? !0 : wy(n, t)) : !1;
}
function Zp(e, t, n) {
  var o;
  let r = e;
  do {
    if ((o = r == null ? void 0 : r.matches) != null && o.call(r, t)) return !0;
    if (r === n) return !1;
    r = r == null ? void 0 : r.parentElement;
  } while (r);
  return !1;
}
function lk(e, t, n, r) {
  const o = new Map();
  for (const [i, s] of e)
    if ((s.selected || s.id === r) && (!s.parentId || !wy(s, e)) && (s.draggable || (t && typeof s.draggable > "u"))) {
      const l = e.get(i);
      l &&
        o.set(i, {
          id: i,
          position: l.position || { x: 0, y: 0 },
          distance: { x: n.x - l.internals.positionAbsolute.x, y: n.y - l.internals.positionAbsolute.y },
          extent: l.extent,
          parentId: l.parentId,
          origin: l.origin,
          expandParent: l.expandParent,
          internals: { positionAbsolute: l.internals.positionAbsolute || { x: 0, y: 0 } },
          measured: { width: l.measured.width ?? 0, height: l.measured.height ?? 0 },
        });
    }
  return o;
}
function eu({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
  var s, l, a;
  const o = [];
  for (const [u, d] of t) {
    const c = (s = n.get(u)) == null ? void 0 : s.internals.userNode;
    c && o.push({ ...c, position: d.position, dragging: r });
  }
  if (!e) return [o[0], o];
  const i = (l = n.get(e)) == null ? void 0 : l.internals.userNode;
  return [i ? { ...i, position: ((a = t.get(e)) == null ? void 0 : a.position) || i.position, dragging: r } : o[0], o];
}
function ak({ dragItems: e, snapGrid: t, x: n, y: r }) {
  const o = e.values().next().value;
  if (!o) return null;
  const i = { x: n - o.distance.x, y: r - o.distance.y },
    s = Zi(i, t);
  return { x: s.x - i.x, y: s.y - i.y };
}
function uk({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: o }) {
  let i = { x: null, y: null },
    s = 0,
    l = new Map(),
    a = !1,
    u = { x: 0, y: 0 },
    d = null,
    c = !1,
    f = null,
    y = !1,
    v = !1,
    x = null;
  function S({ noDragClassName: m, handleSelector: p, domNode: w, isSelectable: E, nodeId: b, nodeClickDistance: k = 0 }) {
    f = pt(w);
    function A({ x: M, y: B }) {
      const {
        nodeLookup: C,
        nodeExtent: D,
        snapGrid: I,
        snapToGrid: O,
        nodeOrigin: N,
        onNodeDrag: T,
        onSelectionDrag: j,
        onError: $,
        updateNodePositions: F,
      } = t();
      i = { x: M, y: B };
      let G = !1;
      const W = l.size > 1,
        Y = W && D ? Nc(Qi(l)) : null,
        X = W && O ? ak({ dragItems: l, snapGrid: I, x: M, y: B }) : null;
      for (const [Q, V] of l) {
        if (!C.has(Q)) continue;
        let Z = { x: M - V.distance.x, y: B - V.distance.y };
        O && (Z = X ? { x: Math.round(Z.x + X.x), y: Math.round(Z.y + X.y) } : Zi(Z, I));
        let ie = null;
        if (W && D && !V.extent && Y) {
          const { positionAbsolute: te } = V.internals,
            oe = te.x - Y.x + D[0][0],
            ce = te.x + V.measured.width - Y.x2 + D[1][0],
            de = te.y - Y.y + D[0][1],
            Ie = te.y + V.measured.height - Y.y2 + D[1][1];
          ie = [
            [oe, de],
            [ce, Ie],
          ];
        }
        const { position: U, positionAbsolute: ee } = oy({
          nodeId: Q,
          nextPosition: Z,
          nodeLookup: C,
          nodeExtent: ie || D,
          nodeOrigin: N,
          onError: $,
        });
        ((G = G || V.position.x !== U.x || V.position.y !== U.y), (V.position = U), (V.internals.positionAbsolute = ee));
      }
      if (((v = v || G), !!G && (F(l, !0), x && (r || T || (!b && j))))) {
        const [Q, V] = eu({ nodeId: b, dragItems: l, nodeLookup: C });
        (r == null || r(x, l, Q, V), T == null || T(x, Q, V), b || j == null || j(x, V));
      }
    }
    async function R() {
      if (!d) return;
      const { transform: M, panBy: B, autoPanSpeed: C, autoPanOnNodeDrag: D } = t();
      if (!D) {
        ((a = !1), cancelAnimationFrame(s));
        return;
      }
      const [I, O] = sy(u, d, C);
      ((I !== 0 || O !== 0) &&
        ((i.x = (i.x ?? 0) - I / M[2]), (i.y = (i.y ?? 0) - O / M[2]), (await B({ x: I, y: O })) && A(i)),
        (s = requestAnimationFrame(R)));
    }
    function z(M) {
      var W;
      const {
        nodeLookup: B,
        multiSelectionActive: C,
        nodesDraggable: D,
        transform: I,
        snapGrid: O,
        snapToGrid: N,
        selectNodesOnDrag: T,
        onNodeDragStart: j,
        onSelectionDragStart: $,
        unselectNodesAndEdges: F,
      } = t();
      ((c = !0),
        (!T || !E) && !C && b && (((W = B.get(b)) != null && W.selected) || F()),
        E && T && b && (e == null || e(b)));
      const G = di(M.sourceEvent, { transform: I, snapGrid: O, snapToGrid: N, containerBounds: d });
      if (((i = G), (l = lk(B, D, G, b)), l.size > 0 && (n || j || (!b && $)))) {
        const [Y, X] = eu({ nodeId: b, dragItems: l, nodeLookup: B });
        (n == null || n(M.sourceEvent, l, Y, X), j == null || j(M.sourceEvent, Y, X), b || $ == null || $(M.sourceEvent, X));
      }
    }
    const L = O0()
      .clickDistance(k)
      .on("start", (M) => {
        const { domNode: B, nodeDragThreshold: C, transform: D, snapGrid: I, snapToGrid: O } = t();
        ((d = (B == null ? void 0 : B.getBoundingClientRect()) || null),
          (y = !1),
          (v = !1),
          (x = M.sourceEvent),
          C === 0 && z(M),
          (i = di(M.sourceEvent, { transform: D, snapGrid: I, snapToGrid: O, containerBounds: d })),
          (u = jt(M.sourceEvent, d)));
      })
      .on("drag", (M) => {
        const { autoPanOnNodeDrag: B, transform: C, snapGrid: D, snapToGrid: I, nodeDragThreshold: O, nodeLookup: N } = t(),
          T = di(M.sourceEvent, { transform: C, snapGrid: D, snapToGrid: I, containerBounds: d });
        if (
          ((x = M.sourceEvent),
          ((M.sourceEvent.type === "touchmove" && M.sourceEvent.touches.length > 1) || (b && !N.has(b))) && (y = !0),
          !y)
        ) {
          if ((!a && B && c && ((a = !0), R()), !c)) {
            const j = jt(M.sourceEvent, d),
              $ = j.x - u.x,
              F = j.y - u.y;
            Math.sqrt($ * $ + F * F) > O && z(M);
          }
          (i.x !== T.xSnapped || i.y !== T.ySnapped) && l && c && ((u = jt(M.sourceEvent, d)), A(T));
        }
      })
      .on("end", (M) => {
        if (!(!c || y) && ((a = !1), (c = !1), cancelAnimationFrame(s), l.size > 0)) {
          const { nodeLookup: B, updateNodePositions: C, onNodeDragStop: D, onSelectionDragStop: I } = t();
          if ((v && (C(l, !1), (v = !1)), o || D || (!b && I))) {
            const [O, N] = eu({ nodeId: b, dragItems: l, nodeLookup: B, dragging: !1 });
            (o == null || o(M.sourceEvent, l, O, N),
              D == null || D(M.sourceEvent, O, N),
              b || I == null || I(M.sourceEvent, N));
          }
        }
      })
      .filter((M) => {
        const B = M.target;
        return !M.button && (!m || !Zp(B, `.${m}`, w)) && (!p || Zp(B, p, w));
      });
    f.call(L);
  }
  function h() {
    f == null || f.on(".drag", null);
  }
  return { update: S, destroy: h };
}
function ck(e, t, n) {
  const r = [],
    o = { x: e.x - n, y: e.y - n, width: n * 2, height: n * 2 };
  for (const i of t.values()) zi(o, bo(i)) > 0 && r.push(i);
  return r;
}
const dk = 250;
function fk(e, t, n, r) {
  var l, a;
  let o = [],
    i = 1 / 0;
  const s = ck(e, n, t + dk);
  for (const u of s) {
    const d = [
      ...(((l = u.internals.handleBounds) == null ? void 0 : l.source) ?? []),
      ...(((a = u.internals.handleBounds) == null ? void 0 : a.target) ?? []),
    ];
    for (const c of d) {
      if (r.nodeId === c.nodeId && r.type === c.type && r.id === c.id) continue;
      const { x: f, y } = Tr(u, c, c.position, !0),
        v = Math.sqrt(Math.pow(f - e.x, 2) + Math.pow(y - e.y, 2));
      v > t || (v < i ? ((o = [{ ...c, x: f, y }]), (i = v)) : v === i && o.push({ ...c, x: f, y }));
    }
  }
  if (!o.length) return null;
  if (o.length > 1) {
    const u = r.type === "source" ? "target" : "source";
    return o.find((d) => d.type === u) ?? o[0];
  }
  return o[0];
}
function _y(e, t, n, r, o, i = !1) {
  var u, d, c;
  const s = r.get(e);
  if (!s) return null;
  const l =
      o === "strict"
        ? (u = s.internals.handleBounds) == null
          ? void 0
          : u[t]
        : [
            ...(((d = s.internals.handleBounds) == null ? void 0 : d.source) ?? []),
            ...(((c = s.internals.handleBounds) == null ? void 0 : c.target) ?? []),
          ],
    a = (n ? (l == null ? void 0 : l.find((f) => f.id === n)) : l == null ? void 0 : l[0]) ?? null;
  return a && i ? { ...a, ...Tr(s, a, a.position, !0) } : a;
}
function Sy(e, t) {
  return (
    e ||
    (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null)
  );
}
function pk(e, t) {
  let n = null;
  return (t ? (n = !0) : e && !t && (n = !1), n);
}
const Ey = () => !0;
function hk(
  e,
  {
    connectionMode: t,
    connectionRadius: n,
    handleId: r,
    nodeId: o,
    edgeUpdaterType: i,
    isTarget: s,
    domNode: l,
    nodeLookup: a,
    lib: u,
    autoPanOnConnect: d,
    flowId: c,
    panBy: f,
    cancelConnection: y,
    onConnectStart: v,
    onConnect: x,
    onConnectEnd: S,
    isValidConnection: h = Ey,
    onReconnectEnd: m,
    updateConnection: p,
    getTransform: w,
    getFromHandle: E,
    autoPanSpeed: b,
    dragThreshold: k = 1,
    handleDomNode: A,
  },
) {
  const R = cy(e.target);
  let z = 0,
    L;
  const { x: M, y: B } = jt(e),
    C = Sy(i, A),
    D = l == null ? void 0 : l.getBoundingClientRect();
  let I = !1;
  if (!D || !C) return;
  const O = _y(o, C, r, a, t);
  if (!O) return;
  let N = jt(e, D),
    T = !1,
    j = null,
    $ = !1,
    F = null;
  function G() {
    if (!d || !D) return;
    const [U, ee] = sy(N, D, b);
    (f({ x: U, y: ee }), (z = requestAnimationFrame(G)));
  }
  const W = { ...O, nodeId: o, type: C, position: O.position },
    Y = a.get(o);
  let Q = {
    inProgress: !0,
    isValid: null,
    from: Tr(Y, W, re.Left, !0),
    fromHandle: W,
    fromPosition: W.position,
    fromNode: Y,
    to: N,
    toHandle: null,
    toPosition: Fp[W.position],
    toNode: null,
    pointer: N,
  };
  function V() {
    ((I = !0), p(Q), v == null || v(e, { nodeId: o, handleId: r, handleType: C }));
  }
  k === 0 && V();
  function Z(U) {
    if (!I) {
      const { x: Ie, y: pe } = jt(U),
        Oe = Ie - M,
        rn = pe - B;
      if (!(Oe * Oe + rn * rn > k * k)) return;
      V();
    }
    if (!E() || !W) {
      ie(U);
      return;
    }
    const ee = w();
    ((N = jt(U, D)), (L = fk(Ji(N, ee, !1, [1, 1]), n, a, W)), T || (G(), (T = !0)));
    const te = by(U, {
      handle: L,
      connectionMode: t,
      fromNodeId: o,
      fromHandleId: r,
      fromType: s ? "target" : "source",
      isValidConnection: h,
      doc: R,
      lib: u,
      flowId: c,
      nodeLookup: a,
    });
    ((F = te.handleDomNode), (j = te.connection), ($ = pk(!!L, te.isValid)));
    const oe = a.get(o),
      ce = oe ? Tr(oe, W, re.Left, !0) : Q.from,
      de = {
        ...Q,
        from: ce,
        isValid: $,
        to: te.toHandle && $ ? Ol({ x: te.toHandle.x, y: te.toHandle.y }, ee) : N,
        toHandle: te.toHandle,
        toPosition: $ && te.toHandle ? te.toHandle.position : Fp[W.position],
        toNode: te.toHandle ? a.get(te.toHandle.nodeId) : null,
        pointer: N,
      };
    (p(de), (Q = de));
  }
  function ie(U) {
    if (!("touches" in U && U.touches.length > 0)) {
      if (I) {
        (L || F) && j && $ && (x == null || x(j));
        const { inProgress: ee, ...te } = Q,
          oe = { ...te, toPosition: Q.toHandle ? Q.toPosition : null };
        (S == null || S(U, oe), i && (m == null || m(U, oe)));
      }
      (y(),
        cancelAnimationFrame(z),
        (T = !1),
        ($ = !1),
        (j = null),
        (F = null),
        R.removeEventListener("mousemove", Z),
        R.removeEventListener("mouseup", ie),
        R.removeEventListener("touchmove", Z),
        R.removeEventListener("touchend", ie));
    }
  }
  (R.addEventListener("mousemove", Z),
    R.addEventListener("mouseup", ie),
    R.addEventListener("touchmove", Z),
    R.addEventListener("touchend", ie));
}
function by(
  e,
  {
    handle: t,
    connectionMode: n,
    fromNodeId: r,
    fromHandleId: o,
    fromType: i,
    doc: s,
    lib: l,
    flowId: a,
    isValidConnection: u = Ey,
    nodeLookup: d,
  },
) {
  const c = i === "target",
    f = t
      ? s.querySelector(
          `.${l}-flow__handle[data-id="${a}-${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`,
        )
      : null,
    { x: y, y: v } = jt(e),
    x = s.elementFromPoint(y, v),
    S = x != null && x.classList.contains(`${l}-flow__handle`) ? x : f,
    h = { handleDomNode: S, isValid: !1, connection: null, toHandle: null };
  if (S) {
    const m = Sy(void 0, S),
      p = S.getAttribute("data-nodeid"),
      w = S.getAttribute("data-handleid"),
      E = S.classList.contains("connectable"),
      b = S.classList.contains("connectableend");
    if (!p || !m) return h;
    const k = { source: c ? p : r, sourceHandle: c ? w : o, target: c ? r : p, targetHandle: c ? o : w };
    h.connection = k;
    const R = E && b && (n === So.Strict ? (c && m === "source") || (!c && m === "target") : p !== r || w !== o);
    ((h.isValid = R && u(k)), (h.toHandle = _y(p, m, w, d, n, !0)));
  }
  return h;
}
const Mc = { onPointerDown: hk, isValid: by };
function gk({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
  const o = pt(e);
  function i({
    translateExtent: l,
    width: a,
    height: u,
    zoomStep: d = 1,
    pannable: c = !0,
    zoomable: f = !0,
    inversePan: y = !1,
  }) {
    const v = (p) => {
      if (p.sourceEvent.type !== "wheel" || !t) return;
      const w = n(),
        E = p.sourceEvent.ctrlKey && Fi() ? 10 : 1,
        b = -p.sourceEvent.deltaY * (p.sourceEvent.deltaMode === 1 ? 0.05 : p.sourceEvent.deltaMode ? 1 : 0.002) * d,
        k = w[2] * Math.pow(2, b * E);
      t.scaleTo(k);
    };
    let x = [0, 0];
    const S = (p) => {
        (p.sourceEvent.type === "mousedown" || p.sourceEvent.type === "touchstart") &&
          (x = [
            p.sourceEvent.clientX ?? p.sourceEvent.touches[0].clientX,
            p.sourceEvent.clientY ?? p.sourceEvent.touches[0].clientY,
          ]);
      },
      h = (p) => {
        const w = n();
        if ((p.sourceEvent.type !== "mousemove" && p.sourceEvent.type !== "touchmove") || !t) return;
        const E = [
            p.sourceEvent.clientX ?? p.sourceEvent.touches[0].clientX,
            p.sourceEvent.clientY ?? p.sourceEvent.touches[0].clientY,
          ],
          b = [E[0] - x[0], E[1] - x[1]];
        x = E;
        const k = r() * Math.max(w[2], Math.log(w[2])) * (y ? -1 : 1),
          A = { x: w[0] - b[0] * k, y: w[1] - b[1] * k },
          R = [
            [0, 0],
            [a, u],
          ];
        t.setViewportConstrained({ x: A.x, y: A.y, zoom: w[2] }, R, l);
      },
      m = Z0()
        .on("start", S)
        .on("zoom", c ? h : null)
        .on("zoom.wheel", f ? v : null);
    o.call(m, {});
  }
  function s() {
    o.on("zoom", null);
  }
  return { update: i, destroy: s, pointer: Pt };
}
const fa = (e) => ({ x: e.x, y: e.y, zoom: e.k }),
  tu = ({ x: e, y: t, zoom: n }) => ua.translate(e, t).scale(n),
  eo = (e, t) => e.target.closest(`.${t}`),
  ky = (e, t) => t === 2 && Array.isArray(e) && e.includes(2),
  mk = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2,
  nu = (e, t = 0, n = mk, r = () => {}) => {
    const o = typeof t == "number" && t > 0;
    return (o || r(), o ? e.transition().duration(t).ease(n).on("end", r) : e);
  },
  Ny = (e) => {
    const t = e.ctrlKey && Fi() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * t;
  };
function yk({
  zoomPanValues: e,
  noWheelClassName: t,
  d3Selection: n,
  d3Zoom: r,
  panOnScrollMode: o,
  panOnScrollSpeed: i,
  zoomOnPinch: s,
  onPanZoomStart: l,
  onPanZoom: a,
  onPanZoomEnd: u,
}) {
  return (d) => {
    if (eo(d, t)) return (d.ctrlKey && d.preventDefault(), !1);
    (d.preventDefault(), d.stopImmediatePropagation());
    const c = n.property("__zoom").k || 1;
    if (d.ctrlKey && s) {
      const S = Pt(d),
        h = Ny(d),
        m = c * Math.pow(2, h);
      r.scaleTo(n, m, S, d);
      return;
    }
    const f = d.deltaMode === 1 ? 20 : 1;
    let y = o === yr.Vertical ? 0 : d.deltaX * f,
      v = o === yr.Horizontal ? 0 : d.deltaY * f;
    (!Fi() && d.shiftKey && o !== yr.Vertical && ((y = d.deltaY * f), (v = 0)),
      r.translateBy(n, -(y / c) * i, -(v / c) * i, { internal: !0 }));
    const x = fa(n.property("__zoom"));
    (clearTimeout(e.panScrollTimeout),
      e.isPanScrolling
        ? (a == null || a(d, x),
          (e.panScrollTimeout = setTimeout(() => {
            (u == null || u(d, x), (e.isPanScrolling = !1));
          }, 150)))
        : ((e.isPanScrolling = !0), l == null || l(d, x)));
  };
}
function vk({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function (r, o) {
    const i = r.type === "wheel",
      s = !t && i && !r.ctrlKey,
      l = eo(r, e);
    if ((r.ctrlKey && i && l && r.preventDefault(), s || l)) return null;
    (r.preventDefault(), n.call(this, r, o));
  };
}
function xk({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (r) => {
    var i, s, l;
    if ((i = r.sourceEvent) != null && i.internal) return;
    const o = fa(r.transform);
    ((e.mouseButton = ((s = r.sourceEvent) == null ? void 0 : s.button) || 0),
      (e.isZoomingOrPanning = !0),
      (e.prevViewport = o),
      ((l = r.sourceEvent) == null ? void 0 : l.type) === "mousedown" && t(!0),
      n && (n == null || n(r.sourceEvent, o)));
  };
}
function wk({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: o }) {
  return (i) => {
    var s, l;
    ((e.usedRightMouseButton = !!(n && ky(t, e.mouseButton ?? 0))),
      ((s = i.sourceEvent) != null && s.sync) || r([i.transform.x, i.transform.y, i.transform.k]),
      o && !((l = i.sourceEvent) != null && l.internal) && (o == null || o(i.sourceEvent, fa(i.transform))));
  };
}
function _k({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: o, onPaneContextMenu: i }) {
  return (s) => {
    var l;
    if (
      !((l = s.sourceEvent) != null && l.internal) &&
      ((e.isZoomingOrPanning = !1),
      i && ky(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && s.sourceEvent && i(s.sourceEvent),
      (e.usedRightMouseButton = !1),
      r(!1),
      o)
    ) {
      const a = fa(s.transform);
      ((e.prevViewport = a),
        clearTimeout(e.timerId),
        (e.timerId = setTimeout(
          () => {
            o == null || o(s.sourceEvent, a);
          },
          n ? 150 : 0,
        )));
    }
  };
}
function Sk({
  zoomActivationKeyPressed: e,
  zoomOnScroll: t,
  zoomOnPinch: n,
  panOnDrag: r,
  panOnScroll: o,
  zoomOnDoubleClick: i,
  userSelectionActive: s,
  noWheelClassName: l,
  noPanClassName: a,
  lib: u,
  connectionInProgress: d,
}) {
  return (c) => {
    var S;
    const f = e || t,
      y = n && c.ctrlKey,
      v = c.type === "wheel";
    if (c.button === 1 && c.type === "mousedown" && (eo(c, `${u}-flow__node`) || eo(c, `${u}-flow__edge`))) return !0;
    if (
      (!r && !f && !o && !i && !n) ||
      s ||
      (d && !v) ||
      (eo(c, l) && v) ||
      (eo(c, a) && (!v || (o && v && !e))) ||
      (!n && c.ctrlKey && v)
    )
      return !1;
    if (!n && c.type === "touchstart" && ((S = c.touches) == null ? void 0 : S.length) > 1) return (c.preventDefault(), !1);
    if (
      (!f && !o && !y && v) ||
      (!r && (c.type === "mousedown" || c.type === "touchstart")) ||
      (Array.isArray(r) && !r.includes(c.button) && c.type === "mousedown")
    )
      return !1;
    const x = (Array.isArray(r) && r.includes(c.button)) || !c.button || c.button <= 1;
    return (!c.ctrlKey || v) && x;
  };
}
function Ek({
  domNode: e,
  minZoom: t,
  maxZoom: n,
  translateExtent: r,
  viewport: o,
  onPanZoom: i,
  onPanZoomStart: s,
  onPanZoomEnd: l,
  onDraggingChange: a,
}) {
  const u = {
      isZoomingOrPanning: !1,
      usedRightMouseButton: !1,
      prevViewport: {},
      mouseButton: 0,
      timerId: void 0,
      panScrollTimeout: void 0,
      isPanScrolling: !1,
    },
    d = e.getBoundingClientRect(),
    c = Z0().scaleExtent([t, n]).translateExtent(r),
    f = pt(e).call(c);
  m(
    { x: o.x, y: o.y, zoom: Eo(o.zoom, t, n) },
    [
      [0, 0],
      [d.width, d.height],
    ],
    r,
  );
  const y = f.on("wheel.zoom"),
    v = f.on("dblclick.zoom");
  c.wheelDelta(Ny);
  function x(L, M) {
    return f
      ? new Promise((B) => {
          c == null ||
            c.interpolate((M == null ? void 0 : M.interpolate) === "linear" ? ci : Zs).transform(
              nu(f, M == null ? void 0 : M.duration, M == null ? void 0 : M.ease, () => B(!0)),
              L,
            );
        })
      : Promise.resolve(!1);
  }
  function S({
    noWheelClassName: L,
    noPanClassName: M,
    onPaneContextMenu: B,
    userSelectionActive: C,
    panOnScroll: D,
    panOnDrag: I,
    panOnScrollMode: O,
    panOnScrollSpeed: N,
    preventScrolling: T,
    zoomOnPinch: j,
    zoomOnScroll: $,
    zoomOnDoubleClick: F,
    zoomActivationKeyPressed: G,
    lib: W,
    onTransformChange: Y,
    connectionInProgress: X,
    paneClickDistance: Q,
    selectionOnDrag: V,
  }) {
    C && !u.isZoomingOrPanning && h();
    const Z = D && !G && !C;
    c.clickDistance(V ? 1 / 0 : !Rt(Q) || Q < 0 ? 0 : Q);
    const ie = Z
      ? yk({
          zoomPanValues: u,
          noWheelClassName: L,
          d3Selection: f,
          d3Zoom: c,
          panOnScrollMode: O,
          panOnScrollSpeed: N,
          zoomOnPinch: j,
          onPanZoomStart: s,
          onPanZoom: i,
          onPanZoomEnd: l,
        })
      : vk({ noWheelClassName: L, preventScrolling: T, d3ZoomHandler: y });
    if ((f.on("wheel.zoom", ie, { passive: !1 }), !C)) {
      const ee = xk({ zoomPanValues: u, onDraggingChange: a, onPanZoomStart: s });
      c.on("start", ee);
      const te = wk({ zoomPanValues: u, panOnDrag: I, onPaneContextMenu: !!B, onPanZoom: i, onTransformChange: Y });
      c.on("zoom", te);
      const oe = _k({
        zoomPanValues: u,
        panOnDrag: I,
        panOnScroll: D,
        onPaneContextMenu: B,
        onPanZoomEnd: l,
        onDraggingChange: a,
      });
      c.on("end", oe);
    }
    const U = Sk({
      zoomActivationKeyPressed: G,
      panOnDrag: I,
      zoomOnScroll: $,
      panOnScroll: D,
      zoomOnDoubleClick: F,
      zoomOnPinch: j,
      userSelectionActive: C,
      noPanClassName: M,
      noWheelClassName: L,
      lib: W,
      connectionInProgress: X,
    });
    (c.filter(U), F ? f.on("dblclick.zoom", v) : f.on("dblclick.zoom", null));
  }
  function h() {
    c.on("zoom", null);
  }
  async function m(L, M, B) {
    const C = tu(L),
      D = c == null ? void 0 : c.constrain()(C, M, B);
    return (D && (await x(D)), new Promise((I) => I(D)));
  }
  async function p(L, M) {
    const B = tu(L);
    return (await x(B, M), new Promise((C) => C(B)));
  }
  function w(L) {
    if (f) {
      const M = tu(L),
        B = f.property("__zoom");
      (B.k !== L.zoom || B.x !== L.x || B.y !== L.y) && (c == null || c.transform(f, M, null, { sync: !0 }));
    }
  }
  function E() {
    const L = f ? Q0(f.node()) : { x: 0, y: 0, k: 1 };
    return { x: L.x, y: L.y, zoom: L.k };
  }
  function b(L, M) {
    return f
      ? new Promise((B) => {
          c == null ||
            c.interpolate((M == null ? void 0 : M.interpolate) === "linear" ? ci : Zs).scaleTo(
              nu(f, M == null ? void 0 : M.duration, M == null ? void 0 : M.ease, () => B(!0)),
              L,
            );
        })
      : Promise.resolve(!1);
  }
  function k(L, M) {
    return f
      ? new Promise((B) => {
          c == null ||
            c.interpolate((M == null ? void 0 : M.interpolate) === "linear" ? ci : Zs).scaleBy(
              nu(f, M == null ? void 0 : M.duration, M == null ? void 0 : M.ease, () => B(!0)),
              L,
            );
        })
      : Promise.resolve(!1);
  }
  function A(L) {
    c == null || c.scaleExtent(L);
  }
  function R(L) {
    c == null || c.translateExtent(L);
  }
  function z(L) {
    const M = !Rt(L) || L < 0 ? 0 : L;
    c == null || c.clickDistance(M);
  }
  return {
    update: S,
    destroy: h,
    setViewport: p,
    setViewportConstrained: m,
    getViewport: E,
    scaleTo: b,
    scaleBy: k,
    setScaleExtent: A,
    setTranslateExtent: R,
    syncViewport: w,
    setClickDistance: z,
  };
}
var No;
(function (e) {
  ((e.Line = "line"), (e.Handle = "handle"));
})(No || (No = {}));
function bk({ width: e, prevWidth: t, height: n, prevHeight: r, affectsX: o, affectsY: i }) {
  const s = e - t,
    l = n - r,
    a = [s > 0 ? 1 : s < 0 ? -1 : 0, l > 0 ? 1 : l < 0 ? -1 : 0];
  return (s && o && (a[0] = a[0] * -1), l && i && (a[1] = a[1] * -1), a);
}
function Jp(e) {
  const t = e.includes("right") || e.includes("left"),
    n = e.includes("bottom") || e.includes("top"),
    r = e.includes("left"),
    o = e.includes("top");
  return { isHorizontal: t, isVertical: n, affectsX: r, affectsY: o };
}
function Tn(e, t) {
  return Math.max(0, t - e);
}
function An(e, t) {
  return Math.max(0, e - t);
}
function Ms(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function eh(e, t) {
  return e ? !t : t;
}
function kk(e, t, n, r, o, i, s, l) {
  let { affectsX: a, affectsY: u } = t;
  const { isHorizontal: d, isVertical: c } = t,
    f = d && c,
    { xSnapped: y, ySnapped: v } = n,
    { minWidth: x, maxWidth: S, minHeight: h, maxHeight: m } = r,
    { x: p, y: w, width: E, height: b, aspectRatio: k } = e;
  let A = Math.floor(d ? y - e.pointerX : 0),
    R = Math.floor(c ? v - e.pointerY : 0);
  const z = E + (a ? -A : A),
    L = b + (u ? -R : R),
    M = -i[0] * E,
    B = -i[1] * b;
  let C = Ms(z, x, S),
    D = Ms(L, h, m);
  if (s) {
    let N = 0,
      T = 0;
    (a && A < 0 ? (N = Tn(p + A + M, s[0][0])) : !a && A > 0 && (N = An(p + z + M, s[1][0])),
      u && R < 0 ? (T = Tn(w + R + B, s[0][1])) : !u && R > 0 && (T = An(w + L + B, s[1][1])),
      (C = Math.max(C, N)),
      (D = Math.max(D, T)));
  }
  if (l) {
    let N = 0,
      T = 0;
    (a && A > 0 ? (N = An(p + A, l[0][0])) : !a && A < 0 && (N = Tn(p + z, l[1][0])),
      u && R > 0 ? (T = An(w + R, l[0][1])) : !u && R < 0 && (T = Tn(w + L, l[1][1])),
      (C = Math.max(C, N)),
      (D = Math.max(D, T)));
  }
  if (o) {
    if (d) {
      const N = Ms(z / k, h, m) * k;
      if (((C = Math.max(C, N)), s)) {
        let T = 0;
        ((!a && !u) || (a && !u && f)
          ? (T = An(w + B + z / k, s[1][1]) * k)
          : (T = Tn(w + B + (a ? A : -A) / k, s[0][1]) * k),
          (C = Math.max(C, T)));
      }
      if (l) {
        let T = 0;
        ((!a && !u) || (a && !u && f) ? (T = Tn(w + z / k, l[1][1]) * k) : (T = An(w + (a ? A : -A) / k, l[0][1]) * k),
          (C = Math.max(C, T)));
      }
    }
    if (c) {
      const N = Ms(L * k, x, S) / k;
      if (((D = Math.max(D, N)), s)) {
        let T = 0;
        ((!a && !u) || (u && !a && f)
          ? (T = An(p + L * k + M, s[1][0]) / k)
          : (T = Tn(p + (u ? R : -R) * k + M, s[0][0]) / k),
          (D = Math.max(D, T)));
      }
      if (l) {
        let T = 0;
        ((!a && !u) || (u && !a && f) ? (T = Tn(p + L * k, l[1][0]) / k) : (T = An(p + (u ? R : -R) * k, l[0][0]) / k),
          (D = Math.max(D, T)));
      }
    }
  }
  ((R = R + (R < 0 ? D : -D)),
    (A = A + (A < 0 ? C : -C)),
    o &&
      (f
        ? z > L * k
          ? (R = (eh(a, u) ? -A : A) / k)
          : (A = (eh(a, u) ? -R : R) * k)
        : d
          ? ((R = A / k), (u = a))
          : ((A = R * k), (a = u))));
  const I = a ? p + A : p,
    O = u ? w + R : w;
  return {
    width: E + (a ? -A : A),
    height: b + (u ? -R : R),
    x: i[0] * A * (a ? -1 : 1) + I,
    y: i[1] * R * (u ? -1 : 1) + O,
  };
}
const Cy = { width: 0, height: 0, x: 0, y: 0 },
  Nk = { ...Cy, pointerX: 0, pointerY: 0, aspectRatio: 1 };
function Ck(e) {
  return [
    [0, 0],
    [e.measured.width, e.measured.height],
  ];
}
function Tk(e, t, n) {
  const r = t.position.x + e.position.x,
    o = t.position.y + e.position.y,
    i = e.measured.width ?? 0,
    s = e.measured.height ?? 0,
    l = n[0] * i,
    a = n[1] * s;
  return [
    [r - l, o - a],
    [r + i - l, o + s - a],
  ];
}
function Ak({ domNode: e, nodeId: t, getStoreItems: n, onChange: r, onEnd: o }) {
  const i = pt(e);
  let s = {
    controlDirection: Jp("bottom-right"),
    boundaries: { minWidth: 0, minHeight: 0, maxWidth: Number.MAX_VALUE, maxHeight: Number.MAX_VALUE },
    resizeDirection: void 0,
    keepAspectRatio: !1,
  };
  function l({
    controlPosition: u,
    boundaries: d,
    keepAspectRatio: c,
    resizeDirection: f,
    onResizeStart: y,
    onResize: v,
    onResizeEnd: x,
    shouldResize: S,
  }) {
    let h = { ...Cy },
      m = { ...Nk };
    s = { boundaries: d, resizeDirection: f, keepAspectRatio: c, controlDirection: Jp(u) };
    let p,
      w = null,
      E = [],
      b,
      k,
      A,
      R = !1;
    const z = O0()
      .on("start", (L) => {
        const { nodeLookup: M, transform: B, snapGrid: C, snapToGrid: D, nodeOrigin: I, paneDomNode: O } = n();
        if (((p = M.get(t)), !p)) return;
        w = (O == null ? void 0 : O.getBoundingClientRect()) ?? null;
        const { xSnapped: N, ySnapped: T } = di(L.sourceEvent, {
          transform: B,
          snapGrid: C,
          snapToGrid: D,
          containerBounds: w,
        });
        ((h = { width: p.measured.width ?? 0, height: p.measured.height ?? 0, x: p.position.x ?? 0, y: p.position.y ?? 0 }),
          (m = { ...h, pointerX: N, pointerY: T, aspectRatio: h.width / h.height }),
          (b = void 0),
          p.parentId &&
            (p.extent === "parent" || p.expandParent) &&
            ((b = M.get(p.parentId)), (k = b && p.extent === "parent" ? Ck(b) : void 0)),
          (E = []),
          (A = void 0));
        for (const [j, $] of M)
          if (
            $.parentId === t &&
            (E.push({ id: j, position: { ...$.position }, extent: $.extent }), $.extent === "parent" || $.expandParent)
          ) {
            const F = Tk($, p, $.origin ?? I);
            A
              ? (A = [
                  [Math.min(F[0][0], A[0][0]), Math.min(F[0][1], A[0][1])],
                  [Math.max(F[1][0], A[1][0]), Math.max(F[1][1], A[1][1])],
                ])
              : (A = F);
          }
        y == null || y(L, { ...h });
      })
      .on("drag", (L) => {
        const { transform: M, snapGrid: B, snapToGrid: C, nodeOrigin: D } = n(),
          I = di(L.sourceEvent, { transform: M, snapGrid: B, snapToGrid: C, containerBounds: w }),
          O = [];
        if (!p) return;
        const { x: N, y: T, width: j, height: $ } = h,
          F = {},
          G = p.origin ?? D,
          { width: W, height: Y, x: X, y: Q } = kk(m, s.controlDirection, I, s.boundaries, s.keepAspectRatio, G, k, A),
          V = W !== j,
          Z = Y !== $,
          ie = X !== N && V,
          U = Q !== T && Z;
        if (!ie && !U && !V && !Z) return;
        if (
          (ie || U || G[0] === 1 || G[1] === 1) &&
          ((F.x = ie ? X : h.x), (F.y = U ? Q : h.y), (h.x = F.x), (h.y = F.y), E.length > 0)
        ) {
          const ce = X - N,
            de = Q - T;
          for (const Ie of E)
            ((Ie.position = { x: Ie.position.x - ce + G[0] * (W - j), y: Ie.position.y - de + G[1] * (Y - $) }), O.push(Ie));
        }
        if (
          ((V || Z) &&
            ((F.width = V && (!s.resizeDirection || s.resizeDirection === "horizontal") ? W : h.width),
            (F.height = Z && (!s.resizeDirection || s.resizeDirection === "vertical") ? Y : h.height),
            (h.width = F.width),
            (h.height = F.height)),
          b && p.expandParent)
        ) {
          const ce = G[0] * (F.width ?? 0);
          F.x && F.x < ce && ((h.x = ce), (m.x = m.x - (F.x - ce)));
          const de = G[1] * (F.height ?? 0);
          F.y && F.y < de && ((h.y = de), (m.y = m.y - (F.y - de)));
        }
        const ee = bk({
            width: h.width,
            prevWidth: j,
            height: h.height,
            prevHeight: $,
            affectsX: s.controlDirection.affectsX,
            affectsY: s.controlDirection.affectsY,
          }),
          te = { ...h, direction: ee };
        (S == null ? void 0 : S(L, te)) !== !1 && ((R = !0), v == null || v(L, te), r(F, O));
      })
      .on("end", (L) => {
        R && (x == null || x(L, { ...h }), o == null || o({ ...h }), (R = !1));
      });
    i.call(z);
  }
  function a() {
    i.on(".drag", null);
  }
  return { update: l, destroy: a };
}
var Ty = { exports: {} },
  Ay = {},
  My = { exports: {} },
  Py = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Co = _;
function Mk(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Pk = typeof Object.is == "function" ? Object.is : Mk,
  Ik = Co.useState,
  Lk = Co.useEffect,
  Rk = Co.useLayoutEffect,
  jk = Co.useDebugValue;
function Dk(e, t) {
  var n = t(),
    r = Ik({ inst: { value: n, getSnapshot: t } }),
    o = r[0].inst,
    i = r[1];
  return (
    Rk(
      function () {
        ((o.value = n), (o.getSnapshot = t), ru(o) && i({ inst: o }));
      },
      [e, n, t],
    ),
    Lk(
      function () {
        return (
          ru(o) && i({ inst: o }),
          e(function () {
            ru(o) && i({ inst: o });
          })
        );
      },
      [e],
    ),
    jk(n),
    n
  );
}
function ru(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Pk(e, n);
  } catch {
    return !0;
  }
}
function Ok(e, t) {
  return t();
}
var $k = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Ok : Dk;
Py.useSyncExternalStore = Co.useSyncExternalStore !== void 0 ? Co.useSyncExternalStore : $k;
My.exports = Py;
var zk = My.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pa = _,
  Fk = zk;
function Bk(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Hk = typeof Object.is == "function" ? Object.is : Bk,
  Vk = Fk.useSyncExternalStore,
  Wk = pa.useRef,
  Uk = pa.useEffect,
  Gk = pa.useMemo,
  qk = pa.useDebugValue;
Ay.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
  var i = Wk(null);
  if (i.current === null) {
    var s = { hasValue: !1, value: null };
    i.current = s;
  } else s = i.current;
  i = Gk(
    function () {
      function a(y) {
        if (!u) {
          if (((u = !0), (d = y), (y = r(y)), o !== void 0 && s.hasValue)) {
            var v = s.value;
            if (o(v, y)) return (c = v);
          }
          return (c = y);
        }
        if (((v = c), Hk(d, y))) return v;
        var x = r(y);
        return o !== void 0 && o(v, x) ? ((d = y), v) : ((d = y), (c = x));
      }
      var u = !1,
        d,
        c,
        f = n === void 0 ? null : n;
      return [
        function () {
          return a(t());
        },
        f === null
          ? void 0
          : function () {
              return a(f());
            },
      ];
    },
    [t, n, r, o],
  );
  var l = Vk(e, i[0], i[1]);
  return (
    Uk(
      function () {
        ((s.hasValue = !0), (s.value = l));
      },
      [l],
    ),
    qk(l),
    l
  );
};
Ty.exports = Ay;
var Kk = Ty.exports;
const Yk = Dc(Kk),
  Xk = {},
  th = (e) => {
    let t;
    const n = new Set(),
      r = (d, c) => {
        const f = typeof d == "function" ? d(t) : d;
        if (!Object.is(f, t)) {
          const y = t;
          ((t = (c ?? (typeof f != "object" || f === null)) ? f : Object.assign({}, t, f)), n.forEach((v) => v(t, y)));
        }
      },
      o = () => t,
      a = {
        setState: r,
        getState: o,
        getInitialState: () => u,
        subscribe: (d) => (n.add(d), () => n.delete(d)),
        destroy: () => {
          ((Xk ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.",
            ),
            n.clear());
        },
      },
      u = (t = e(r, o, a));
    return a;
  },
  Qk = (e) => (e ? th(e) : th),
  { useDebugValue: Zk } = Bc,
  { useSyncExternalStoreWithSelector: Jk } = Yk,
  eN = (e) => e;
function Iy(e, t = eN, n) {
  const r = Jk(e.subscribe, e.getState, e.getServerState || e.getInitialState, t, n);
  return (Zk(r), r);
}
const nh = (e, t) => {
    const n = Qk(e),
      r = (o, i = t) => Iy(n, o, i);
    return (Object.assign(r, n), r);
  },
  tN = (e, t) => (e ? nh(e, t) : nh);
function be(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [r, o] of e) if (!Object.is(o, t.get(r))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const r of e) if (!t.has(r)) return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !1;
  for (const r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || !Object.is(e[r], t[r])) return !1;
  return !0;
}
const ha = _.createContext(null),
  nN = ha.Provider,
  Ly = tn.error001();
function he(e, t) {
  const n = _.useContext(ha);
  if (n === null) throw new Error(Ly);
  return Iy(n, e, t);
}
function ke() {
  const e = _.useContext(ha);
  if (e === null) throw new Error(Ly);
  return _.useMemo(() => ({ getState: e.getState, setState: e.setState, subscribe: e.subscribe }), [e]);
}
const rh = { display: "none" },
  rN = {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0px, 0px, 0px, 0px)",
    clipPath: "inset(100%)",
  },
  Ry = "react-flow__node-desc",
  jy = "react-flow__edge-desc",
  oN = "react-flow__aria-live",
  iN = (e) => e.ariaLiveMessage,
  sN = (e) => e.ariaLabelConfig;
function lN({ rfId: e }) {
  const t = he(iN);
  return g.jsx("div", { id: `${oN}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: rN, children: t });
}
function aN({ rfId: e, disableKeyboardA11y: t }) {
  const n = he(sN);
  return g.jsxs(g.Fragment, {
    children: [
      g.jsx("div", {
        id: `${Ry}-${e}`,
        style: rh,
        children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"],
      }),
      g.jsx("div", { id: `${jy}-${e}`, style: rh, children: n["edge.a11yDescription.default"] }),
      !t && g.jsx(lN, { rfId: e }),
    ],
  });
}
const ga = _.forwardRef(({ position: e = "top-left", children: t, className: n, style: r, ...o }, i) => {
  const s = `${e}`.split("-");
  return g.jsx("div", { className: De(["react-flow__panel", n, ...s]), style: r, ref: i, ...o, children: t });
});
ga.displayName = "Panel";
function uN({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : g.jsx(ga, {
        position: t,
        className: "react-flow__attribution",
        "data-message":
          "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",
        children: g.jsx("a", {
          href: "https://reactflow.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "React Flow attribution",
          children: "React Flow",
        }),
      });
}
const cN = (e) => {
    const t = [],
      n = [];
    for (const [, r] of e.nodeLookup) r.selected && t.push(r.internals.userNode);
    for (const [, r] of e.edgeLookup) r.selected && n.push(r);
    return { selectedNodes: t, selectedEdges: n };
  },
  Ps = (e) => e.id;
function dN(e, t) {
  return be(e.selectedNodes.map(Ps), t.selectedNodes.map(Ps)) && be(e.selectedEdges.map(Ps), t.selectedEdges.map(Ps));
}
function fN({ onSelectionChange: e }) {
  const t = ke(),
    { selectedNodes: n, selectedEdges: r } = he(cN, dN);
  return (
    _.useEffect(() => {
      const o = { nodes: n, edges: r };
      (e == null || e(o), t.getState().onSelectionChangeHandlers.forEach((i) => i(o)));
    }, [n, r, e]),
    null
  );
}
const pN = (e) => !!e.onSelectionChangeHandlers;
function hN({ onSelectionChange: e }) {
  const t = he(pN);
  return e || t ? g.jsx(fN, { onSelectionChange: e }) : null;
}
const Dy = [0, 0],
  gN = { x: 0, y: 0, zoom: 1 },
  mN = [
    "nodes",
    "edges",
    "defaultNodes",
    "defaultEdges",
    "onConnect",
    "onConnectStart",
    "onConnectEnd",
    "onClickConnectStart",
    "onClickConnectEnd",
    "nodesDraggable",
    "autoPanOnNodeFocus",
    "nodesConnectable",
    "nodesFocusable",
    "edgesFocusable",
    "edgesReconnectable",
    "elevateNodesOnSelect",
    "elevateEdgesOnSelect",
    "minZoom",
    "maxZoom",
    "nodeExtent",
    "onNodesChange",
    "onEdgesChange",
    "elementsSelectable",
    "connectionMode",
    "snapGrid",
    "snapToGrid",
    "translateExtent",
    "connectOnClick",
    "defaultEdgeOptions",
    "fitView",
    "fitViewOptions",
    "onNodesDelete",
    "onEdgesDelete",
    "onDelete",
    "onNodeDrag",
    "onNodeDragStart",
    "onNodeDragStop",
    "onSelectionDrag",
    "onSelectionDragStart",
    "onSelectionDragStop",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "noPanClassName",
    "nodeOrigin",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onError",
    "connectionRadius",
    "isValidConnection",
    "selectNodesOnDrag",
    "nodeDragThreshold",
    "connectionDragThreshold",
    "onBeforeDelete",
    "debug",
    "autoPanSpeed",
    "ariaLabelConfig",
    "zIndexMode",
  ],
  oh = [...mN, "rfId"],
  yN = (e) => ({
    setNodes: e.setNodes,
    setEdges: e.setEdges,
    setMinZoom: e.setMinZoom,
    setMaxZoom: e.setMaxZoom,
    setTranslateExtent: e.setTranslateExtent,
    setNodeExtent: e.setNodeExtent,
    reset: e.reset,
    setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  }),
  ih = {
    translateExtent: Di,
    nodeOrigin: Dy,
    minZoom: 0.5,
    maxZoom: 2,
    elementsSelectable: !0,
    noPanClassName: "nopan",
    rfId: "1",
  };
function vN(e) {
  const {
      setNodes: t,
      setEdges: n,
      setMinZoom: r,
      setMaxZoom: o,
      setTranslateExtent: i,
      setNodeExtent: s,
      reset: l,
      setDefaultNodesAndEdges: a,
    } = he(yN, be),
    u = ke();
  _.useEffect(
    () => (
      a(e.defaultNodes, e.defaultEdges),
      () => {
        ((d.current = ih), l());
      }
    ),
    [],
  );
  const d = _.useRef(ih);
  return (
    _.useEffect(
      () => {
        for (const c of oh) {
          const f = e[c],
            y = d.current[c];
          f !== y &&
            (typeof e[c] > "u" ||
              (c === "nodes"
                ? t(f)
                : c === "edges"
                  ? n(f)
                  : c === "minZoom"
                    ? r(f)
                    : c === "maxZoom"
                      ? o(f)
                      : c === "translateExtent"
                        ? i(f)
                        : c === "nodeExtent"
                          ? s(f)
                          : c === "ariaLabelConfig"
                            ? u.setState({ ariaLabelConfig: Bb(f) })
                            : c === "fitView"
                              ? u.setState({ fitViewQueued: f })
                              : c === "fitViewOptions"
                                ? u.setState({ fitViewOptions: f })
                                : u.setState({ [c]: f })));
        }
        d.current = e;
      },
      oh.map((c) => e[c]),
    ),
    null
  );
}
function sh() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function xN(e) {
  var r;
  const [t, n] = _.useState(e === "system" ? null : e);
  return (
    _.useEffect(() => {
      if (e !== "system") {
        n(e);
        return;
      }
      const o = sh(),
        i = () => n(o != null && o.matches ? "dark" : "light");
      return (
        i(),
        o == null || o.addEventListener("change", i),
        () => {
          o == null || o.removeEventListener("change", i);
        }
      );
    }, [e]),
    t !== null ? t : (r = sh()) != null && r.matches ? "dark" : "light"
  );
}
const lh = typeof document < "u" ? document : null;
function Bi(e = null, t = { target: lh, actInsideInputWithModifier: !0 }) {
  const [n, r] = _.useState(!1),
    o = _.useRef(!1),
    i = _.useRef(new Set([])),
    [s, l] = _.useMemo(() => {
      if (e !== null) {
        const u = (Array.isArray(e) ? e : [e])
            .filter((c) => typeof c == "string")
            .map((c) =>
              c
                .replace(
                  "+",
                  `
`,
                )
                .replace(
                  `

`,
                  `
+`,
                ).split(`
`),
            ),
          d = u.reduce((c, f) => c.concat(...f), []);
        return [u, d];
      }
      return [[], []];
    }, [e]);
  return (
    _.useEffect(() => {
      const a = (t == null ? void 0 : t.target) ?? lh,
        u = (t == null ? void 0 : t.actInsideInputWithModifier) ?? !0;
      if (e !== null) {
        const d = (y) => {
            var S, h;
            if (((o.current = y.ctrlKey || y.metaKey || y.shiftKey || y.altKey), (!o.current || (o.current && !u)) && dy(y)))
              return !1;
            const x = uh(y.code, l);
            if ((i.current.add(y[x]), ah(s, i.current, !1))) {
              const m = ((h = (S = y.composedPath) == null ? void 0 : S.call(y)) == null ? void 0 : h[0]) || y.target,
                p = (m == null ? void 0 : m.nodeName) === "BUTTON" || (m == null ? void 0 : m.nodeName) === "A";
              (t.preventDefault !== !1 && (o.current || !p) && y.preventDefault(), r(!0));
            }
          },
          c = (y) => {
            const v = uh(y.code, l);
            (ah(s, i.current, !0) ? (r(!1), i.current.clear()) : i.current.delete(y[v]),
              y.key === "Meta" && i.current.clear(),
              (o.current = !1));
          },
          f = () => {
            (i.current.clear(), r(!1));
          };
        return (
          a == null || a.addEventListener("keydown", d),
          a == null || a.addEventListener("keyup", c),
          window.addEventListener("blur", f),
          window.addEventListener("contextmenu", f),
          () => {
            (a == null || a.removeEventListener("keydown", d),
              a == null || a.removeEventListener("keyup", c),
              window.removeEventListener("blur", f),
              window.removeEventListener("contextmenu", f));
          }
        );
      }
    }, [e, r]),
    n
  );
}
function ah(e, t, n) {
  return e.filter((r) => n || r.length === t.size).some((r) => r.every((o) => t.has(o)));
}
function uh(e, t) {
  return t.includes(e) ? "code" : "key";
}
const wN = () => {
  const e = ke();
  return _.useMemo(
    () => ({
      zoomIn: (t) => {
        const { panZoom: n } = e.getState();
        return n ? n.scaleBy(1.2, { duration: t == null ? void 0 : t.duration }) : Promise.resolve(!1);
      },
      zoomOut: (t) => {
        const { panZoom: n } = e.getState();
        return n ? n.scaleBy(1 / 1.2, { duration: t == null ? void 0 : t.duration }) : Promise.resolve(!1);
      },
      zoomTo: (t, n) => {
        const { panZoom: r } = e.getState();
        return r ? r.scaleTo(t, { duration: n == null ? void 0 : n.duration }) : Promise.resolve(!1);
      },
      getZoom: () => e.getState().transform[2],
      setViewport: async (t, n) => {
        const {
          transform: [r, o, i],
          panZoom: s,
        } = e.getState();
        return s
          ? (await s.setViewport({ x: t.x ?? r, y: t.y ?? o, zoom: t.zoom ?? i }, n), Promise.resolve(!0))
          : Promise.resolve(!1);
      },
      getViewport: () => {
        const [t, n, r] = e.getState().transform;
        return { x: t, y: n, zoom: r };
      },
      setCenter: async (t, n, r) => e.getState().setCenter(t, n, r),
      fitBounds: async (t, n) => {
        const { width: r, height: o, minZoom: i, maxZoom: s, panZoom: l } = e.getState(),
          a = Vd(t, r, o, i, s, (n == null ? void 0 : n.padding) ?? 0.1);
        return l
          ? (await l.setViewport(a, {
              duration: n == null ? void 0 : n.duration,
              ease: n == null ? void 0 : n.ease,
              interpolate: n == null ? void 0 : n.interpolate,
            }),
            Promise.resolve(!0))
          : Promise.resolve(!1);
      },
      screenToFlowPosition: (t, n = {}) => {
        const { transform: r, snapGrid: o, snapToGrid: i, domNode: s } = e.getState();
        if (!s) return t;
        const { x: l, y: a } = s.getBoundingClientRect(),
          u = { x: t.x - l, y: t.y - a },
          d = n.snapGrid ?? o,
          c = n.snapToGrid ?? i;
        return Ji(u, r, c, d);
      },
      flowToScreenPosition: (t) => {
        const { transform: n, domNode: r } = e.getState();
        if (!r) return t;
        const { x: o, y: i } = r.getBoundingClientRect(),
          s = Ol(t, n);
        return { x: s.x + o, y: s.y + i };
      },
    }),
    [],
  );
};
function Oy(e, t) {
  const n = [],
    r = new Map(),
    o = [];
  for (const i of e)
    if (i.type === "add") {
      o.push(i);
      continue;
    } else if (i.type === "remove" || i.type === "replace") r.set(i.id, [i]);
    else {
      const s = r.get(i.id);
      s ? s.push(i) : r.set(i.id, [i]);
    }
  for (const i of t) {
    const s = r.get(i.id);
    if (!s) {
      n.push(i);
      continue;
    }
    if (s[0].type === "remove") continue;
    if (s[0].type === "replace") {
      n.push({ ...s[0].item });
      continue;
    }
    const l = { ...i };
    for (const a of s) _N(a, l);
    n.push(l);
  }
  return (
    o.length &&
      o.forEach((i) => {
        i.index !== void 0 ? n.splice(i.index, 0, { ...i.item }) : n.push({ ...i.item });
      }),
    n
  );
}
function _N(e, t) {
  switch (e.type) {
    case "select": {
      t.selected = e.selected;
      break;
    }
    case "position": {
      (typeof e.position < "u" && (t.position = e.position), typeof e.dragging < "u" && (t.dragging = e.dragging));
      break;
    }
    case "dimensions": {
      (typeof e.dimensions < "u" &&
        ((t.measured = { ...e.dimensions }),
        e.setAttributes &&
          ((e.setAttributes === !0 || e.setAttributes === "width") && (t.width = e.dimensions.width),
          (e.setAttributes === !0 || e.setAttributes === "height") && (t.height = e.dimensions.height))),
        typeof e.resizing == "boolean" && (t.resizing = e.resizing));
      break;
    }
  }
}
function SN(e, t) {
  return Oy(e, t);
}
function EN(e, t) {
  return Oy(e, t);
}
function ur(e, t) {
  return { id: e, type: "select", selected: t };
}
function to(e, t = new Set(), n = !1) {
  const r = [];
  for (const [o, i] of e) {
    const s = t.has(o);
    !(i.selected === void 0 && !s) && i.selected !== s && (n && (i.selected = s), r.push(ur(i.id, s)));
  }
  return r;
}
function ch({ items: e = [], lookup: t }) {
  var o;
  const n = [],
    r = new Map(e.map((i) => [i.id, i]));
  for (const [i, s] of e.entries()) {
    const l = t.get(s.id),
      a = ((o = l == null ? void 0 : l.internals) == null ? void 0 : o.userNode) ?? l;
    (a !== void 0 && a !== s && n.push({ id: s.id, item: s, type: "replace" }),
      a === void 0 && n.push({ item: s, type: "add", index: i }));
  }
  for (const [i] of t) r.get(i) === void 0 && n.push({ id: i, type: "remove" });
  return n;
}
function dh(e) {
  return { id: e.id, type: "remove" };
}
const fh = (e) => Pb(e),
  bN = (e) => ry(e);
function $y(e) {
  return _.forwardRef(e);
}
const kN = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function ph(e) {
  const [t, n] = _.useState(BigInt(0)),
    [r] = _.useState(() => NN(() => n((o) => o + BigInt(1))));
  return (
    kN(() => {
      const o = r.get();
      o.length && (e(o), r.reset());
    }, [t]),
    r
  );
}
function NN(e) {
  let t = [];
  return {
    get: () => t,
    reset: () => {
      t = [];
    },
    push: (n) => {
      (t.push(n), e());
    },
  };
}
const zy = _.createContext(null);
function CN({ children: e }) {
  const t = ke(),
    n = _.useCallback((l) => {
      const {
        nodes: a = [],
        setNodes: u,
        hasDefaultNodes: d,
        onNodesChange: c,
        nodeLookup: f,
        fitViewQueued: y,
        onNodesChangeMiddlewareMap: v,
      } = t.getState();
      let x = a;
      for (const h of l) x = typeof h == "function" ? h(x) : h;
      let S = ch({ items: x, lookup: f });
      for (const h of v.values()) S = h(S);
      (d && u(x),
        S.length > 0
          ? c == null || c(S)
          : y &&
            window.requestAnimationFrame(() => {
              const { fitViewQueued: h, nodes: m, setNodes: p } = t.getState();
              h && p(m);
            }));
    }, []),
    r = ph(n),
    o = _.useCallback((l) => {
      const { edges: a = [], setEdges: u, hasDefaultEdges: d, onEdgesChange: c, edgeLookup: f } = t.getState();
      let y = a;
      for (const v of l) y = typeof v == "function" ? v(y) : v;
      d ? u(y) : c && c(ch({ items: y, lookup: f }));
    }, []),
    i = ph(o),
    s = _.useMemo(() => ({ nodeQueue: r, edgeQueue: i }), []);
  return g.jsx(zy.Provider, { value: s, children: e });
}
function TN() {
  const e = _.useContext(zy);
  if (!e) throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const AN = (e) => !!e.panZoom;
function Xd() {
  const e = wN(),
    t = ke(),
    n = TN(),
    r = he(AN),
    o = _.useMemo(() => {
      const i = (c) => t.getState().nodeLookup.get(c),
        s = (c) => {
          n.nodeQueue.push(c);
        },
        l = (c) => {
          n.edgeQueue.push(c);
        },
        a = (c) => {
          var h, m;
          const { nodeLookup: f, nodeOrigin: y } = t.getState(),
            v = fh(c) ? c : f.get(c.id),
            x = v.parentId ? uy(v.position, v.measured, v.parentId, f, y) : v.position,
            S = {
              ...v,
              position: x,
              width: ((h = v.measured) == null ? void 0 : h.width) ?? v.width,
              height: ((m = v.measured) == null ? void 0 : m.height) ?? v.height,
            };
          return bo(S);
        },
        u = (c, f, y = { replace: !1 }) => {
          s((v) =>
            v.map((x) => {
              if (x.id === c) {
                const S = typeof f == "function" ? f(x) : f;
                return y.replace && fh(S) ? S : { ...x, ...S };
              }
              return x;
            }),
          );
        },
        d = (c, f, y = { replace: !1 }) => {
          l((v) =>
            v.map((x) => {
              if (x.id === c) {
                const S = typeof f == "function" ? f(x) : f;
                return y.replace && bN(S) ? S : { ...x, ...S };
              }
              return x;
            }),
          );
        };
      return {
        getNodes: () => t.getState().nodes.map((c) => ({ ...c })),
        getNode: (c) => {
          var f;
          return (f = i(c)) == null ? void 0 : f.internals.userNode;
        },
        getInternalNode: i,
        getEdges: () => {
          const { edges: c = [] } = t.getState();
          return c.map((f) => ({ ...f }));
        },
        getEdge: (c) => t.getState().edgeLookup.get(c),
        setNodes: s,
        setEdges: l,
        addNodes: (c) => {
          const f = Array.isArray(c) ? c : [c];
          n.nodeQueue.push((y) => [...y, ...f]);
        },
        addEdges: (c) => {
          const f = Array.isArray(c) ? c : [c];
          n.edgeQueue.push((y) => [...y, ...f]);
        },
        toObject: () => {
          const { nodes: c = [], edges: f = [], transform: y } = t.getState(),
            [v, x, S] = y;
          return { nodes: c.map((h) => ({ ...h })), edges: f.map((h) => ({ ...h })), viewport: { x: v, y: x, zoom: S } };
        },
        deleteElements: async ({ nodes: c = [], edges: f = [] }) => {
          const {
              nodes: y,
              edges: v,
              onNodesDelete: x,
              onEdgesDelete: S,
              triggerNodeChanges: h,
              triggerEdgeChanges: m,
              onDelete: p,
              onBeforeDelete: w,
            } = t.getState(),
            { nodes: E, edges: b } = await Db({ nodesToRemove: c, edgesToRemove: f, nodes: y, edges: v, onBeforeDelete: w }),
            k = b.length > 0,
            A = E.length > 0;
          if (k) {
            const R = b.map(dh);
            (S == null || S(b), m(R));
          }
          if (A) {
            const R = E.map(dh);
            (x == null || x(E), h(R));
          }
          return ((A || k) && (p == null || p({ nodes: E, edges: b })), { deletedNodes: E, deletedEdges: b });
        },
        getIntersectingNodes: (c, f = !0, y) => {
          const v = Hp(c),
            x = v ? c : a(c),
            S = y !== void 0;
          return x
            ? (y || t.getState().nodes).filter((h) => {
                const m = t.getState().nodeLookup.get(h.id);
                if (m && !v && (h.id === c.id || !m.internals.positionAbsolute)) return !1;
                const p = bo(S ? h : m),
                  w = zi(p, x);
                return (f && w > 0) || w >= p.width * p.height || w >= x.width * x.height;
              })
            : [];
        },
        isNodeIntersecting: (c, f, y = !0) => {
          const x = Hp(c) ? c : a(c);
          if (!x) return !1;
          const S = zi(x, f);
          return (y && S > 0) || S >= f.width * f.height || S >= x.width * x.height;
        },
        updateNode: u,
        updateNodeData: (c, f, y = { replace: !1 }) => {
          u(
            c,
            (v) => {
              const x = typeof f == "function" ? f(v) : f;
              return y.replace ? { ...v, data: x } : { ...v, data: { ...v.data, ...x } };
            },
            y,
          );
        },
        updateEdge: d,
        updateEdgeData: (c, f, y = { replace: !1 }) => {
          d(
            c,
            (v) => {
              const x = typeof f == "function" ? f(v) : f;
              return y.replace ? { ...v, data: x } : { ...v, data: { ...v.data, ...x } };
            },
            y,
          );
        },
        getNodesBounds: (c) => {
          const { nodeLookup: f, nodeOrigin: y } = t.getState();
          return Ib(c, { nodeLookup: f, nodeOrigin: y });
        },
        getHandleConnections: ({ type: c, id: f, nodeId: y }) => {
          var v;
          return Array.from(
            ((v = t.getState().connectionLookup.get(`${y}-${c}${f ? `-${f}` : ""}`)) == null ? void 0 : v.values()) ?? [],
          );
        },
        getNodeConnections: ({ type: c, handleId: f, nodeId: y }) => {
          var v;
          return Array.from(
            ((v = t.getState().connectionLookup.get(`${y}${c ? (f ? `-${c}-${f}` : `-${c}`) : ""}`)) == null
              ? void 0
              : v.values()) ?? [],
          );
        },
        fitView: async (c) => {
          const f = t.getState().fitViewResolver ?? Fb();
          return (
            t.setState({ fitViewQueued: !0, fitViewOptions: c, fitViewResolver: f }),
            n.nodeQueue.push((y) => [...y]),
            f.promise
          );
        },
      };
    }, []);
  return _.useMemo(() => ({ ...o, ...e, viewportInitialized: r }), [r]);
}
const hh = (e) => e.selected,
  MN = typeof window < "u" ? window : void 0;
function PN({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = ke(),
    { deleteElements: r } = Xd(),
    o = Bi(e, { actInsideInputWithModifier: !1 }),
    i = Bi(t, { target: MN });
  (_.useEffect(() => {
    if (o) {
      const { edges: s, nodes: l } = n.getState();
      (r({ nodes: l.filter(hh), edges: s.filter(hh) }), n.setState({ nodesSelectionActive: !1 }));
    }
  }, [o]),
    _.useEffect(() => {
      n.setState({ multiSelectionActive: i });
    }, [i]));
}
function IN(e) {
  const t = ke();
  _.useEffect(() => {
    const n = () => {
      var o, i, s, l;
      if (!e.current || !(((i = (o = e.current).checkVisibility) == null ? void 0 : i.call(o)) ?? !0)) return !1;
      const r = Wd(e.current);
      ((r.height === 0 || r.width === 0) && ((l = (s = t.getState()).onError) == null || l.call(s, "004", tn.error004())),
        t.setState({ width: r.width || 500, height: r.height || 500 }));
    };
    if (e.current) {
      (n(), window.addEventListener("resize", n));
      const r = new ResizeObserver(() => n());
      return (
        r.observe(e.current),
        () => {
          (window.removeEventListener("resize", n), r && e.current && r.unobserve(e.current));
        }
      );
    }
  }, []);
}
const ma = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0 },
  LN = (e) => ({ userSelectionActive: e.userSelectionActive, lib: e.lib, connectionInProgress: e.connection.inProgress });
function RN({
  onPaneContextMenu: e,
  zoomOnScroll: t = !0,
  zoomOnPinch: n = !0,
  panOnScroll: r = !1,
  panOnScrollSpeed: o = 0.5,
  panOnScrollMode: i = yr.Free,
  zoomOnDoubleClick: s = !0,
  panOnDrag: l = !0,
  defaultViewport: a,
  translateExtent: u,
  minZoom: d,
  maxZoom: c,
  zoomActivationKeyCode: f,
  preventScrolling: y = !0,
  children: v,
  noWheelClassName: x,
  noPanClassName: S,
  onViewportChange: h,
  isControlledViewport: m,
  paneClickDistance: p,
  selectionOnDrag: w,
}) {
  const E = ke(),
    b = _.useRef(null),
    { userSelectionActive: k, lib: A, connectionInProgress: R } = he(LN, be),
    z = Bi(f),
    L = _.useRef();
  IN(b);
  const M = _.useCallback(
    (B) => {
      (h == null || h({ x: B[0], y: B[1], zoom: B[2] }), m || E.setState({ transform: B }));
    },
    [h, m],
  );
  return (
    _.useEffect(() => {
      if (b.current) {
        L.current = Ek({
          domNode: b.current,
          minZoom: d,
          maxZoom: c,
          translateExtent: u,
          viewport: a,
          onDraggingChange: (I) => E.setState((O) => (O.paneDragging === I ? O : { paneDragging: I })),
          onPanZoomStart: (I, O) => {
            const { onViewportChangeStart: N, onMoveStart: T } = E.getState();
            (T == null || T(I, O), N == null || N(O));
          },
          onPanZoom: (I, O) => {
            const { onViewportChange: N, onMove: T } = E.getState();
            (T == null || T(I, O), N == null || N(O));
          },
          onPanZoomEnd: (I, O) => {
            const { onViewportChangeEnd: N, onMoveEnd: T } = E.getState();
            (T == null || T(I, O), N == null || N(O));
          },
        });
        const { x: B, y: C, zoom: D } = L.current.getViewport();
        return (
          E.setState({ panZoom: L.current, transform: [B, C, D], domNode: b.current.closest(".react-flow") }),
          () => {
            var I;
            (I = L.current) == null || I.destroy();
          }
        );
      }
    }, []),
    _.useEffect(() => {
      var B;
      (B = L.current) == null ||
        B.update({
          onPaneContextMenu: e,
          zoomOnScroll: t,
          zoomOnPinch: n,
          panOnScroll: r,
          panOnScrollSpeed: o,
          panOnScrollMode: i,
          zoomOnDoubleClick: s,
          panOnDrag: l,
          zoomActivationKeyPressed: z,
          preventScrolling: y,
          noPanClassName: S,
          userSelectionActive: k,
          noWheelClassName: x,
          lib: A,
          onTransformChange: M,
          connectionInProgress: R,
          selectionOnDrag: w,
          paneClickDistance: p,
        });
    }, [e, t, n, r, o, i, s, l, z, y, S, k, x, A, M, R, w, p]),
    g.jsx("div", { className: "react-flow__renderer", ref: b, style: ma, children: v })
  );
}
const jN = (e) => ({ userSelectionActive: e.userSelectionActive, userSelectionRect: e.userSelectionRect });
function DN() {
  const { userSelectionActive: e, userSelectionRect: t } = he(jN, be);
  return e && t
    ? g.jsx("div", {
        className: "react-flow__selection react-flow__container",
        style: { width: t.width, height: t.height, transform: `translate(${t.x}px, ${t.y}px)` },
      })
    : null;
}
const ou = (e, t) => (n) => {
    n.target === t.current && (e == null || e(n));
  },
  ON = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    connectionInProgress: e.connection.inProgress,
    dragging: e.paneDragging,
  });
function $N({
  isSelecting: e,
  selectionKeyPressed: t,
  selectionMode: n = Oi.Full,
  panOnDrag: r,
  paneClickDistance: o,
  selectionOnDrag: i,
  onSelectionStart: s,
  onSelectionEnd: l,
  onPaneClick: a,
  onPaneContextMenu: u,
  onPaneScroll: d,
  onPaneMouseEnter: c,
  onPaneMouseMove: f,
  onPaneMouseLeave: y,
  children: v,
}) {
  const x = ke(),
    { userSelectionActive: S, elementsSelectable: h, dragging: m, connectionInProgress: p } = he(ON, be),
    w = h && (e || S),
    E = _.useRef(null),
    b = _.useRef(),
    k = _.useRef(new Set()),
    A = _.useRef(new Set()),
    R = _.useRef(!1),
    z = (N) => {
      if (R.current || p) {
        R.current = !1;
        return;
      }
      (a == null || a(N), x.getState().resetSelectedElements(), x.setState({ nodesSelectionActive: !1 }));
    },
    L = (N) => {
      if (Array.isArray(r) && r != null && r.includes(2)) {
        N.preventDefault();
        return;
      }
      u == null || u(N);
    },
    M = d ? (N) => d(N) : void 0,
    B = (N) => {
      R.current && (N.stopPropagation(), (R.current = !1));
    },
    C = (N) => {
      var Y, X;
      const { domNode: T } = x.getState();
      if (((b.current = T == null ? void 0 : T.getBoundingClientRect()), !b.current)) return;
      const j = N.target === E.current;
      if ((!j && !!N.target.closest(".nokey")) || !e || !((i && j) || t) || N.button !== 0 || !N.isPrimary) return;
      ((X = (Y = N.target) == null ? void 0 : Y.setPointerCapture) == null || X.call(Y, N.pointerId), (R.current = !1));
      const { x: G, y: W } = jt(N.nativeEvent, b.current);
      (x.setState({ userSelectionRect: { width: 0, height: 0, startX: G, startY: W, x: G, y: W } }),
        j || (N.stopPropagation(), N.preventDefault()));
    },
    D = (N) => {
      const {
        userSelectionRect: T,
        transform: j,
        nodeLookup: $,
        edgeLookup: F,
        connectionLookup: G,
        triggerNodeChanges: W,
        triggerEdgeChanges: Y,
        defaultEdgeOptions: X,
        resetSelectedElements: Q,
      } = x.getState();
      if (!b.current || !T) return;
      const { x: V, y: Z } = jt(N.nativeEvent, b.current),
        { startX: ie, startY: U } = T;
      if (!R.current) {
        const de = t ? 0 : o;
        if (Math.hypot(V - ie, Z - U) <= de) return;
        (Q(), s == null || s(N));
      }
      R.current = !0;
      const ee = {
          startX: ie,
          startY: U,
          x: V < ie ? V : ie,
          y: Z < U ? Z : U,
          width: Math.abs(V - ie),
          height: Math.abs(Z - U),
        },
        te = k.current,
        oe = A.current;
      ((k.current = new Set(Hd($, ee, j, n === Oi.Partial, !0).map((de) => de.id))), (A.current = new Set()));
      const ce = (X == null ? void 0 : X.selectable) ?? !0;
      for (const de of k.current) {
        const Ie = G.get(de);
        if (Ie)
          for (const { edgeId: pe } of Ie.values()) {
            const Oe = F.get(pe);
            Oe && (Oe.selectable ?? ce) && A.current.add(pe);
          }
      }
      if (!Vp(te, k.current)) {
        const de = to($, k.current, !0);
        W(de);
      }
      if (!Vp(oe, A.current)) {
        const de = to(F, A.current);
        Y(de);
      }
      x.setState({ userSelectionRect: ee, userSelectionActive: !0, nodesSelectionActive: !1 });
    },
    I = (N) => {
      var T, j;
      N.button === 0 &&
        ((j = (T = N.target) == null ? void 0 : T.releasePointerCapture) == null || j.call(T, N.pointerId),
        !S && N.target === E.current && x.getState().userSelectionRect && (z == null || z(N)),
        x.setState({ userSelectionActive: !1, userSelectionRect: null }),
        R.current && (l == null || l(N), x.setState({ nodesSelectionActive: k.current.size > 0 })));
    },
    O = r === !0 || (Array.isArray(r) && r.includes(0));
  return g.jsxs("div", {
    className: De(["react-flow__pane", { draggable: O, dragging: m, selection: e }]),
    onClick: w ? void 0 : ou(z, E),
    onContextMenu: ou(L, E),
    onWheel: ou(M, E),
    onPointerEnter: w ? void 0 : c,
    onPointerMove: w ? D : f,
    onPointerUp: w ? I : void 0,
    onPointerDownCapture: w ? C : void 0,
    onClickCapture: w ? B : void 0,
    onPointerLeave: y,
    ref: E,
    style: ma,
    children: [v, g.jsx(DN, {})],
  });
}
function Pc({ id: e, store: t, unselect: n = !1, nodeRef: r }) {
  const { addSelectedNodes: o, unselectNodesAndEdges: i, multiSelectionActive: s, nodeLookup: l, onError: a } = t.getState(),
    u = l.get(e);
  if (!u) {
    a == null || a("012", tn.error012(e));
    return;
  }
  (t.setState({ nodesSelectionActive: !1 }),
    u.selected
      ? (n || (u.selected && s)) &&
        (i({ nodes: [u], edges: [] }),
        requestAnimationFrame(() => {
          var d;
          return (d = r == null ? void 0 : r.current) == null ? void 0 : d.blur();
        }))
      : o([e]));
}
function Fy({
  nodeRef: e,
  disabled: t = !1,
  noDragClassName: n,
  handleSelector: r,
  nodeId: o,
  isSelectable: i,
  nodeClickDistance: s,
}) {
  const l = ke(),
    [a, u] = _.useState(!1),
    d = _.useRef();
  return (
    _.useEffect(() => {
      d.current = uk({
        getStoreItems: () => l.getState(),
        onNodeMouseDown: (c) => {
          Pc({ id: c, store: l, nodeRef: e });
        },
        onDragStart: () => {
          u(!0);
        },
        onDragStop: () => {
          u(!1);
        },
      });
    }, []),
    _.useEffect(() => {
      if (!(t || !e.current || !d.current))
        return (
          d.current.update({
            noDragClassName: n,
            handleSelector: r,
            domNode: e.current,
            isSelectable: i,
            nodeId: o,
            nodeClickDistance: s,
          }),
          () => {
            var c;
            (c = d.current) == null || c.destroy();
          }
        );
    }, [n, r, t, i, e, o, s]),
    a
  );
}
const zN = (e) => (t) => t.selected && (t.draggable || (e && typeof t.draggable > "u"));
function By() {
  const e = ke();
  return _.useCallback((n) => {
    const {
        nodeExtent: r,
        snapToGrid: o,
        snapGrid: i,
        nodesDraggable: s,
        onError: l,
        updateNodePositions: a,
        nodeLookup: u,
        nodeOrigin: d,
      } = e.getState(),
      c = new Map(),
      f = zN(s),
      y = o ? i[0] : 5,
      v = o ? i[1] : 5,
      x = n.direction.x * y * n.factor,
      S = n.direction.y * v * n.factor;
    for (const [, h] of u) {
      if (!f(h)) continue;
      let m = { x: h.internals.positionAbsolute.x + x, y: h.internals.positionAbsolute.y + S };
      o && (m = Zi(m, i));
      const { position: p, positionAbsolute: w } = oy({
        nodeId: h.id,
        nextPosition: m,
        nodeLookup: u,
        nodeExtent: r,
        nodeOrigin: d,
        onError: l,
      });
      ((h.position = p), (h.internals.positionAbsolute = w), c.set(h.id, h));
    }
    a(c);
  }, []);
}
const Qd = _.createContext(null),
  FN = Qd.Provider;
Qd.Consumer;
const Hy = () => _.useContext(Qd),
  BN = (e) => ({ connectOnClick: e.connectOnClick, noPanClassName: e.noPanClassName, rfId: e.rfId }),
  HN = (e, t, n) => (r) => {
    const { connectionClickStartHandle: o, connectionMode: i, connection: s } = r,
      { fromHandle: l, toHandle: a, isValid: u } = s,
      d = (a == null ? void 0 : a.nodeId) === e && (a == null ? void 0 : a.id) === t && (a == null ? void 0 : a.type) === n;
    return {
      connectingFrom:
        (l == null ? void 0 : l.nodeId) === e && (l == null ? void 0 : l.id) === t && (l == null ? void 0 : l.type) === n,
      connectingTo: d,
      clickConnecting:
        (o == null ? void 0 : o.nodeId) === e && (o == null ? void 0 : o.id) === t && (o == null ? void 0 : o.type) === n,
      isPossibleEndHandle:
        i === So.Strict
          ? (l == null ? void 0 : l.type) !== n
          : e !== (l == null ? void 0 : l.nodeId) || t !== (l == null ? void 0 : l.id),
      connectionInProcess: !!l,
      clickConnectionInProcess: !!o,
      valid: d && u,
    };
  };
function VN(
  {
    type: e = "source",
    position: t = re.Top,
    isValidConnection: n,
    isConnectable: r = !0,
    isConnectableStart: o = !0,
    isConnectableEnd: i = !0,
    id: s,
    onConnect: l,
    children: a,
    className: u,
    onMouseDown: d,
    onTouchStart: c,
    ...f
  },
  y,
) {
  var D, I;
  const v = s || null,
    x = e === "target",
    S = ke(),
    h = Hy(),
    { connectOnClick: m, noPanClassName: p, rfId: w } = he(BN, be),
    {
      connectingFrom: E,
      connectingTo: b,
      clickConnecting: k,
      isPossibleEndHandle: A,
      connectionInProcess: R,
      clickConnectionInProcess: z,
      valid: L,
    } = he(HN(h, v, e), be);
  h || (I = (D = S.getState()).onError) == null || I.call(D, "010", tn.error010());
  const M = (O) => {
      const { defaultEdgeOptions: N, onConnect: T, hasDefaultEdges: j } = S.getState(),
        $ = { ...N, ...O };
      if (j) {
        const { edges: F, setEdges: G } = S.getState();
        G(qb($, F));
      }
      (T == null || T($), l == null || l($));
    },
    B = (O) => {
      if (!h) return;
      const N = fy(O.nativeEvent);
      if (o && ((N && O.button === 0) || !N)) {
        const T = S.getState();
        Mc.onPointerDown(O.nativeEvent, {
          handleDomNode: O.currentTarget,
          autoPanOnConnect: T.autoPanOnConnect,
          connectionMode: T.connectionMode,
          connectionRadius: T.connectionRadius,
          domNode: T.domNode,
          nodeLookup: T.nodeLookup,
          lib: T.lib,
          isTarget: x,
          handleId: v,
          nodeId: h,
          flowId: T.rfId,
          panBy: T.panBy,
          cancelConnection: T.cancelConnection,
          onConnectStart: T.onConnectStart,
          onConnectEnd: (...j) => {
            var $, F;
            return (F = ($ = S.getState()).onConnectEnd) == null ? void 0 : F.call($, ...j);
          },
          updateConnection: T.updateConnection,
          onConnect: M,
          isValidConnection:
            n ||
            ((...j) => {
              var $, F;
              return ((F = ($ = S.getState()).isValidConnection) == null ? void 0 : F.call($, ...j)) ?? !0;
            }),
          getTransform: () => S.getState().transform,
          getFromHandle: () => S.getState().connection.fromHandle,
          autoPanSpeed: T.autoPanSpeed,
          dragThreshold: T.connectionDragThreshold,
        });
      }
      N ? d == null || d(O) : c == null || c(O);
    },
    C = (O) => {
      const {
        onClickConnectStart: N,
        onClickConnectEnd: T,
        connectionClickStartHandle: j,
        connectionMode: $,
        isValidConnection: F,
        lib: G,
        rfId: W,
        nodeLookup: Y,
        connection: X,
      } = S.getState();
      if (!h || (!j && !o)) return;
      if (!j) {
        (N == null || N(O.nativeEvent, { nodeId: h, handleId: v, handleType: e }),
          S.setState({ connectionClickStartHandle: { nodeId: h, type: e, id: v } }));
        return;
      }
      const Q = cy(O.target),
        V = n || F,
        { connection: Z, isValid: ie } = Mc.isValid(O.nativeEvent, {
          handle: { nodeId: h, id: v, type: e },
          connectionMode: $,
          fromNodeId: j.nodeId,
          fromHandleId: j.id || null,
          fromType: j.type,
          isValidConnection: V,
          flowId: W,
          doc: Q,
          lib: G,
          nodeLookup: Y,
        });
      ie && Z && M(Z);
      const U = structuredClone(X);
      (delete U.inProgress,
        (U.toPosition = U.toHandle ? U.toHandle.position : null),
        T == null || T(O, U),
        S.setState({ connectionClickStartHandle: null }));
    };
  return g.jsx("div", {
    "data-handleid": v,
    "data-nodeid": h,
    "data-handlepos": t,
    "data-id": `${w}-${h}-${v}-${e}`,
    className: De([
      "react-flow__handle",
      `react-flow__handle-${t}`,
      "nodrag",
      p,
      u,
      {
        source: !x,
        target: x,
        connectable: r,
        connectablestart: o,
        connectableend: i,
        clickconnecting: k,
        connectingfrom: E,
        connectingto: b,
        valid: L,
        connectionindicator: r && (!R || A) && (R || z ? i : o),
      },
    ]),
    onMouseDown: B,
    onTouchStart: B,
    onClick: m ? C : void 0,
    ref: y,
    ...f,
    children: a,
  });
}
const $l = _.memo($y(VN));
function WN({ data: e, isConnectable: t, sourcePosition: n = re.Bottom }) {
  return g.jsxs(g.Fragment, {
    children: [e == null ? void 0 : e.label, g.jsx($l, { type: "source", position: n, isConnectable: t })],
  });
}
function UN({ data: e, isConnectable: t, targetPosition: n = re.Top, sourcePosition: r = re.Bottom }) {
  return g.jsxs(g.Fragment, {
    children: [
      g.jsx($l, { type: "target", position: n, isConnectable: t }),
      e == null ? void 0 : e.label,
      g.jsx($l, { type: "source", position: r, isConnectable: t }),
    ],
  });
}
function GN() {
  return null;
}
function qN({ data: e, isConnectable: t, targetPosition: n = re.Top }) {
  return g.jsxs(g.Fragment, {
    children: [g.jsx($l, { type: "target", position: n, isConnectable: t }), e == null ? void 0 : e.label],
  });
}
const zl = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } },
  gh = { input: WN, default: UN, output: qN, group: GN };
function KN(e) {
  var t, n, r, o;
  return e.internals.handleBounds === void 0
    ? {
        width: e.width ?? e.initialWidth ?? ((t = e.style) == null ? void 0 : t.width),
        height: e.height ?? e.initialHeight ?? ((n = e.style) == null ? void 0 : n.height),
      }
    : {
        width: e.width ?? ((r = e.style) == null ? void 0 : r.width),
        height: e.height ?? ((o = e.style) == null ? void 0 : o.height),
      };
}
const YN = (e) => {
  const { width: t, height: n, x: r, y: o } = Qi(e.nodeLookup, { filter: (i) => !!i.selected });
  return {
    width: Rt(t) ? t : null,
    height: Rt(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${r}px,${o}px)`,
  };
};
function XN({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const r = ke(),
    { width: o, height: i, transformString: s, userSelectionActive: l } = he(YN, be),
    a = By(),
    u = _.useRef(null);
  _.useEffect(() => {
    var y;
    n || (y = u.current) == null || y.focus({ preventScroll: !0 });
  }, [n]);
  const d = !l && o !== null && i !== null;
  if ((Fy({ nodeRef: u, disabled: !d }), !d)) return null;
  const c = e
      ? (y) => {
          const v = r.getState().nodes.filter((x) => x.selected);
          e(y, v);
        }
      : void 0,
    f = (y) => {
      Object.prototype.hasOwnProperty.call(zl, y.key) &&
        (y.preventDefault(), a({ direction: zl[y.key], factor: y.shiftKey ? 4 : 1 }));
    };
  return g.jsx("div", {
    className: De(["react-flow__nodesselection", "react-flow__container", t]),
    style: { transform: s },
    children: g.jsx("div", {
      ref: u,
      className: "react-flow__nodesselection-rect",
      onContextMenu: c,
      tabIndex: n ? void 0 : -1,
      onKeyDown: n ? void 0 : f,
      style: { width: o, height: i },
    }),
  });
}
const mh = typeof window < "u" ? window : void 0,
  QN = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Vy({
  children: e,
  onPaneClick: t,
  onPaneMouseEnter: n,
  onPaneMouseMove: r,
  onPaneMouseLeave: o,
  onPaneContextMenu: i,
  onPaneScroll: s,
  paneClickDistance: l,
  deleteKeyCode: a,
  selectionKeyCode: u,
  selectionOnDrag: d,
  selectionMode: c,
  onSelectionStart: f,
  onSelectionEnd: y,
  multiSelectionKeyCode: v,
  panActivationKeyCode: x,
  zoomActivationKeyCode: S,
  elementsSelectable: h,
  zoomOnScroll: m,
  zoomOnPinch: p,
  panOnScroll: w,
  panOnScrollSpeed: E,
  panOnScrollMode: b,
  zoomOnDoubleClick: k,
  panOnDrag: A,
  defaultViewport: R,
  translateExtent: z,
  minZoom: L,
  maxZoom: M,
  preventScrolling: B,
  onSelectionContextMenu: C,
  noWheelClassName: D,
  noPanClassName: I,
  disableKeyboardA11y: O,
  onViewportChange: N,
  isControlledViewport: T,
}) {
  const { nodesSelectionActive: j, userSelectionActive: $ } = he(QN, be),
    F = Bi(u, { target: mh }),
    G = Bi(x, { target: mh }),
    W = G || A,
    Y = G || w,
    X = d && W !== !0,
    Q = F || $ || X;
  return (
    PN({ deleteKeyCode: a, multiSelectionKeyCode: v }),
    g.jsx(RN, {
      onPaneContextMenu: i,
      elementsSelectable: h,
      zoomOnScroll: m,
      zoomOnPinch: p,
      panOnScroll: Y,
      panOnScrollSpeed: E,
      panOnScrollMode: b,
      zoomOnDoubleClick: k,
      panOnDrag: !F && W,
      defaultViewport: R,
      translateExtent: z,
      minZoom: L,
      maxZoom: M,
      zoomActivationKeyCode: S,
      preventScrolling: B,
      noWheelClassName: D,
      noPanClassName: I,
      onViewportChange: N,
      isControlledViewport: T,
      paneClickDistance: l,
      selectionOnDrag: X,
      children: g.jsxs($N, {
        onSelectionStart: f,
        onSelectionEnd: y,
        onPaneClick: t,
        onPaneMouseEnter: n,
        onPaneMouseMove: r,
        onPaneMouseLeave: o,
        onPaneContextMenu: i,
        onPaneScroll: s,
        panOnDrag: W,
        isSelecting: !!Q,
        selectionMode: c,
        selectionKeyPressed: F,
        paneClickDistance: l,
        selectionOnDrag: X,
        children: [e, j && g.jsx(XN, { onSelectionContextMenu: C, noPanClassName: I, disableKeyboardA11y: O })],
      }),
    })
  );
}
Vy.displayName = "FlowRenderer";
const ZN = _.memo(Vy),
  JN = (e) => (t) =>
    e
      ? Hd(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id)
      : Array.from(t.nodeLookup.keys());
function eC(e) {
  return he(_.useCallback(JN(e), [e]), be);
}
const tC = (e) => e.updateNodeInternals;
function nC() {
  const e = he(tC),
    [t] = _.useState(() =>
      typeof ResizeObserver > "u"
        ? null
        : new ResizeObserver((n) => {
            const r = new Map();
            (n.forEach((o) => {
              const i = o.target.getAttribute("data-id");
              r.set(i, { id: i, nodeElement: o.target, force: !0 });
            }),
              e(r));
          }),
    );
  return (
    _.useEffect(
      () => () => {
        t == null || t.disconnect();
      },
      [t],
    ),
    t
  );
}
function rC({ node: e, nodeType: t, hasDimensions: n, resizeObserver: r }) {
  const o = ke(),
    i = _.useRef(null),
    s = _.useRef(null),
    l = _.useRef(e.sourcePosition),
    a = _.useRef(e.targetPosition),
    u = _.useRef(t),
    d = n && !!e.internals.handleBounds;
  return (
    _.useEffect(() => {
      i.current &&
        !e.hidden &&
        (!d || s.current !== i.current) &&
        (s.current && (r == null || r.unobserve(s.current)), r == null || r.observe(i.current), (s.current = i.current));
    }, [d, e.hidden]),
    _.useEffect(
      () => () => {
        s.current && (r == null || r.unobserve(s.current), (s.current = null));
      },
      [],
    ),
    _.useEffect(() => {
      if (i.current) {
        const c = u.current !== t,
          f = l.current !== e.sourcePosition,
          y = a.current !== e.targetPosition;
        (c || f || y) &&
          ((u.current = t),
          (l.current = e.sourcePosition),
          (a.current = e.targetPosition),
          o.getState().updateNodeInternals(new Map([[e.id, { id: e.id, nodeElement: i.current, force: !0 }]])));
      }
    }, [e.id, t, e.sourcePosition, e.targetPosition]),
    i
  );
}
function oC({
  id: e,
  onClick: t,
  onMouseEnter: n,
  onMouseMove: r,
  onMouseLeave: o,
  onContextMenu: i,
  onDoubleClick: s,
  nodesDraggable: l,
  elementsSelectable: a,
  nodesConnectable: u,
  nodesFocusable: d,
  resizeObserver: c,
  noDragClassName: f,
  noPanClassName: y,
  disableKeyboardA11y: v,
  rfId: x,
  nodeTypes: S,
  nodeClickDistance: h,
  onError: m,
}) {
  const {
    node: p,
    internals: w,
    isParent: E,
  } = he((V) => {
    const Z = V.nodeLookup.get(e),
      ie = V.parentLookup.has(e);
    return { node: Z, internals: Z.internals, isParent: ie };
  }, be);
  let b = p.type || "default",
    k = (S == null ? void 0 : S[b]) || gh[b];
  k === void 0 &&
    (m == null || m("003", tn.error003(b)), (b = "default"), (k = (S == null ? void 0 : S.default) || gh.default));
  const A = !!(p.draggable || (l && typeof p.draggable > "u")),
    R = !!(p.selectable || (a && typeof p.selectable > "u")),
    z = !!(p.connectable || (u && typeof p.connectable > "u")),
    L = !!(p.focusable || (d && typeof p.focusable > "u")),
    M = ke(),
    B = ay(p),
    C = rC({ node: p, nodeType: b, hasDimensions: B, resizeObserver: c }),
    D = Fy({
      nodeRef: C,
      disabled: p.hidden || !A,
      noDragClassName: f,
      handleSelector: p.dragHandle,
      nodeId: e,
      isSelectable: R,
      nodeClickDistance: h,
    }),
    I = By();
  if (p.hidden) return null;
  const O = Sn(p),
    N = KN(p),
    T = R || A || t || n || r || o,
    j = n ? (V) => n(V, { ...w.userNode }) : void 0,
    $ = r ? (V) => r(V, { ...w.userNode }) : void 0,
    F = o ? (V) => o(V, { ...w.userNode }) : void 0,
    G = i ? (V) => i(V, { ...w.userNode }) : void 0,
    W = s ? (V) => s(V, { ...w.userNode }) : void 0,
    Y = (V) => {
      const { selectNodesOnDrag: Z, nodeDragThreshold: ie } = M.getState();
      (R && (!Z || !A || ie > 0) && Pc({ id: e, store: M, nodeRef: C }), t && t(V, { ...w.userNode }));
    },
    X = (V) => {
      if (!(dy(V.nativeEvent) || v)) {
        if (J0.includes(V.key) && R) {
          const Z = V.key === "Escape";
          Pc({ id: e, store: M, unselect: Z, nodeRef: C });
        } else if (A && p.selected && Object.prototype.hasOwnProperty.call(zl, V.key)) {
          V.preventDefault();
          const { ariaLabelConfig: Z } = M.getState();
          (M.setState({
            ariaLiveMessage: Z["node.a11yDescription.ariaLiveMessage"]({
              direction: V.key.replace("Arrow", "").toLowerCase(),
              x: ~~w.positionAbsolute.x,
              y: ~~w.positionAbsolute.y,
            }),
          }),
            I({ direction: zl[V.key], factor: V.shiftKey ? 4 : 1 }));
        }
      }
    },
    Q = () => {
      var oe;
      if (v || !((oe = C.current) != null && oe.matches(":focus-visible"))) return;
      const { transform: V, width: Z, height: ie, autoPanOnNodeFocus: U, setCenter: ee } = M.getState();
      if (!U) return;
      Hd(new Map([[e, p]]), { x: 0, y: 0, width: Z, height: ie }, V, !0).length > 0 ||
        ee(p.position.x + O.width / 2, p.position.y + O.height / 2, { zoom: V[2] });
    };
  return g.jsx("div", {
    className: De([
      "react-flow__node",
      `react-flow__node-${b}`,
      { [y]: A },
      p.className,
      { selected: p.selected, selectable: R, parent: E, draggable: A, dragging: D },
    ]),
    ref: C,
    style: {
      zIndex: w.z,
      transform: `translate(${w.positionAbsolute.x}px,${w.positionAbsolute.y}px)`,
      pointerEvents: T ? "all" : "none",
      visibility: B ? "visible" : "hidden",
      ...p.style,
      ...N,
    },
    "data-id": e,
    "data-testid": `rf__node-${e}`,
    onMouseEnter: j,
    onMouseMove: $,
    onMouseLeave: F,
    onContextMenu: G,
    onClick: Y,
    onDoubleClick: W,
    onKeyDown: L ? X : void 0,
    tabIndex: L ? 0 : void 0,
    onFocus: L ? Q : void 0,
    role: p.ariaRole ?? (L ? "group" : void 0),
    "aria-roledescription": "node",
    "aria-describedby": v ? void 0 : `${Ry}-${x}`,
    "aria-label": p.ariaLabel,
    ...p.domAttributes,
    children: g.jsx(FN, {
      value: e,
      children: g.jsx(k, {
        id: e,
        data: p.data,
        type: b,
        positionAbsoluteX: w.positionAbsolute.x,
        positionAbsoluteY: w.positionAbsolute.y,
        selected: p.selected ?? !1,
        selectable: R,
        draggable: A,
        deletable: p.deletable ?? !0,
        isConnectable: z,
        sourcePosition: p.sourcePosition,
        targetPosition: p.targetPosition,
        dragging: D,
        dragHandle: p.dragHandle,
        zIndex: w.z,
        parentId: p.parentId,
        ...O,
      }),
    }),
  });
}
var iC = _.memo(oC);
const sC = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError,
});
function Wy(e) {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: r, elementsSelectable: o, onError: i } = he(sC, be),
    s = eC(e.onlyRenderVisibleElements),
    l = nC();
  return g.jsx("div", {
    className: "react-flow__nodes",
    style: ma,
    children: s.map((a) =>
      g.jsx(
        iC,
        {
          id: a,
          nodeTypes: e.nodeTypes,
          nodeExtent: e.nodeExtent,
          onClick: e.onNodeClick,
          onMouseEnter: e.onNodeMouseEnter,
          onMouseMove: e.onNodeMouseMove,
          onMouseLeave: e.onNodeMouseLeave,
          onContextMenu: e.onNodeContextMenu,
          onDoubleClick: e.onNodeDoubleClick,
          noDragClassName: e.noDragClassName,
          noPanClassName: e.noPanClassName,
          rfId: e.rfId,
          disableKeyboardA11y: e.disableKeyboardA11y,
          resizeObserver: l,
          nodesDraggable: t,
          nodesConnectable: n,
          nodesFocusable: r,
          elementsSelectable: o,
          nodeClickDistance: e.nodeClickDistance,
          onError: i,
        },
        a,
      ),
    ),
  });
}
Wy.displayName = "NodeRenderer";
const lC = _.memo(Wy);
function aC(e) {
  return he(
    _.useCallback(
      (n) => {
        if (!e) return n.edges.map((o) => o.id);
        const r = [];
        if (n.width && n.height)
          for (const o of n.edges) {
            const i = n.nodeLookup.get(o.source),
              s = n.nodeLookup.get(o.target);
            i &&
              s &&
              Wb({ sourceNode: i, targetNode: s, width: n.width, height: n.height, transform: n.transform }) &&
              r.push(o.id);
          }
        return r;
      },
      [e],
    ),
    be,
  );
}
const uC = ({ color: e = "none", strokeWidth: t = 1 }) => {
    const n = { strokeWidth: t, ...(e && { stroke: e }) };
    return g.jsx("polyline", {
      className: "arrow",
      style: n,
      strokeLinecap: "round",
      fill: "none",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4",
    });
  },
  cC = ({ color: e = "none", strokeWidth: t = 1 }) => {
    const n = { strokeWidth: t, ...(e && { stroke: e, fill: e }) };
    return g.jsx("polyline", {
      className: "arrowclosed",
      style: n,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    });
  },
  yh = { [$i.Arrow]: uC, [$i.ArrowClosed]: cC };
function dC(e) {
  const t = ke();
  return _.useMemo(() => {
    var o, i;
    return Object.prototype.hasOwnProperty.call(yh, e)
      ? yh[e]
      : ((i = (o = t.getState()).onError) == null || i.call(o, "009", tn.error009(e)), null);
  }, [e]);
}
const fC = ({
    id: e,
    type: t,
    color: n,
    width: r = 12.5,
    height: o = 12.5,
    markerUnits: i = "strokeWidth",
    strokeWidth: s,
    orient: l = "auto-start-reverse",
  }) => {
    const a = dC(t);
    return a
      ? g.jsx("marker", {
          className: "react-flow__arrowhead",
          id: e,
          markerWidth: `${r}`,
          markerHeight: `${o}`,
          viewBox: "-10 -10 20 20",
          markerUnits: i,
          orient: l,
          refX: "0",
          refY: "0",
          children: g.jsx(a, { color: n, strokeWidth: s }),
        })
      : null;
  },
  Uy = ({ defaultColor: e, rfId: t }) => {
    const n = he((i) => i.edges),
      r = he((i) => i.defaultEdgeOptions),
      o = _.useMemo(
        () =>
          Zb(n, {
            id: t,
            defaultColor: e,
            defaultMarkerStart: r == null ? void 0 : r.markerStart,
            defaultMarkerEnd: r == null ? void 0 : r.markerEnd,
          }),
        [n, r, t, e],
      );
    return o.length
      ? g.jsx("svg", {
          className: "react-flow__marker",
          "aria-hidden": "true",
          children: g.jsx("defs", {
            children: o.map((i) =>
              g.jsx(
                fC,
                {
                  id: i.id,
                  type: i.type,
                  color: i.color,
                  width: i.width,
                  height: i.height,
                  markerUnits: i.markerUnits,
                  strokeWidth: i.strokeWidth,
                  orient: i.orient,
                },
                i.id,
              ),
            ),
          }),
        })
      : null;
  };
Uy.displayName = "MarkerDefinitions";
var pC = _.memo(Uy);
function Gy({
  x: e,
  y: t,
  label: n,
  labelStyle: r,
  labelShowBg: o = !0,
  labelBgStyle: i,
  labelBgPadding: s = [2, 4],
  labelBgBorderRadius: l = 2,
  children: a,
  className: u,
  ...d
}) {
  const [c, f] = _.useState({ x: 1, y: 0, width: 0, height: 0 }),
    y = De(["react-flow__edge-textwrapper", u]),
    v = _.useRef(null);
  return (
    _.useEffect(() => {
      if (v.current) {
        const x = v.current.getBBox();
        f({ x: x.x, y: x.y, width: x.width, height: x.height });
      }
    }, [n]),
    n
      ? g.jsxs("g", {
          transform: `translate(${e - c.width / 2} ${t - c.height / 2})`,
          className: y,
          visibility: c.width ? "visible" : "hidden",
          ...d,
          children: [
            o &&
              g.jsx("rect", {
                width: c.width + 2 * s[0],
                x: -s[0],
                y: -s[1],
                height: c.height + 2 * s[1],
                className: "react-flow__edge-textbg",
                style: i,
                rx: l,
                ry: l,
              }),
            g.jsx("text", {
              className: "react-flow__edge-text",
              y: c.height / 2,
              dy: "0.3em",
              ref: v,
              style: r,
              children: n,
            }),
            a,
          ],
        })
      : null
  );
}
Gy.displayName = "EdgeText";
const hC = _.memo(Gy);
function ya({
  path: e,
  labelX: t,
  labelY: n,
  label: r,
  labelStyle: o,
  labelShowBg: i,
  labelBgStyle: s,
  labelBgPadding: l,
  labelBgBorderRadius: a,
  interactionWidth: u = 20,
  ...d
}) {
  return g.jsxs(g.Fragment, {
    children: [
      g.jsx("path", { ...d, d: e, fill: "none", className: De(["react-flow__edge-path", d.className]) }),
      u
        ? g.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: u, className: "react-flow__edge-interaction" })
        : null,
      r && Rt(t) && Rt(n)
        ? g.jsx(hC, {
            x: t,
            y: n,
            label: r,
            labelStyle: o,
            labelShowBg: i,
            labelBgStyle: s,
            labelBgPadding: l,
            labelBgBorderRadius: a,
          })
        : null,
    ],
  });
}
function vh({ pos: e, x1: t, y1: n, x2: r, y2: o }) {
  return e === re.Left || e === re.Right ? [0.5 * (t + r), n] : [t, 0.5 * (n + o)];
}
function qy({ sourceX: e, sourceY: t, sourcePosition: n = re.Bottom, targetX: r, targetY: o, targetPosition: i = re.Top }) {
  const [s, l] = vh({ pos: n, x1: e, y1: t, x2: r, y2: o }),
    [a, u] = vh({ pos: i, x1: r, y1: o, x2: e, y2: t }),
    [d, c, f, y] = py({
      sourceX: e,
      sourceY: t,
      targetX: r,
      targetY: o,
      sourceControlX: s,
      sourceControlY: l,
      targetControlX: a,
      targetControlY: u,
    });
  return [`M${e},${t} C${s},${l} ${a},${u} ${r},${o}`, d, c, f, y];
}
function Ky(e) {
  return _.memo(
    ({
      id: t,
      sourceX: n,
      sourceY: r,
      targetX: o,
      targetY: i,
      sourcePosition: s,
      targetPosition: l,
      label: a,
      labelStyle: u,
      labelShowBg: d,
      labelBgStyle: c,
      labelBgPadding: f,
      labelBgBorderRadius: y,
      style: v,
      markerEnd: x,
      markerStart: S,
      interactionWidth: h,
    }) => {
      const [m, p, w] = qy({ sourceX: n, sourceY: r, sourcePosition: s, targetX: o, targetY: i, targetPosition: l }),
        E = e.isInternal ? void 0 : t;
      return g.jsx(ya, {
        id: E,
        path: m,
        labelX: p,
        labelY: w,
        label: a,
        labelStyle: u,
        labelShowBg: d,
        labelBgStyle: c,
        labelBgPadding: f,
        labelBgBorderRadius: y,
        style: v,
        markerEnd: x,
        markerStart: S,
        interactionWidth: h,
      });
    },
  );
}
const gC = Ky({ isInternal: !1 }),
  Yy = Ky({ isInternal: !0 });
gC.displayName = "SimpleBezierEdge";
Yy.displayName = "SimpleBezierEdgeInternal";
function Xy(e) {
  return _.memo(
    ({
      id: t,
      sourceX: n,
      sourceY: r,
      targetX: o,
      targetY: i,
      label: s,
      labelStyle: l,
      labelShowBg: a,
      labelBgStyle: u,
      labelBgPadding: d,
      labelBgBorderRadius: c,
      style: f,
      sourcePosition: y = re.Bottom,
      targetPosition: v = re.Top,
      markerEnd: x,
      markerStart: S,
      pathOptions: h,
      interactionWidth: m,
    }) => {
      const [p, w, E] = Cc({
          sourceX: n,
          sourceY: r,
          sourcePosition: y,
          targetX: o,
          targetY: i,
          targetPosition: v,
          borderRadius: h == null ? void 0 : h.borderRadius,
          offset: h == null ? void 0 : h.offset,
          stepPosition: h == null ? void 0 : h.stepPosition,
        }),
        b = e.isInternal ? void 0 : t;
      return g.jsx(ya, {
        id: b,
        path: p,
        labelX: w,
        labelY: E,
        label: s,
        labelStyle: l,
        labelShowBg: a,
        labelBgStyle: u,
        labelBgPadding: d,
        labelBgBorderRadius: c,
        style: f,
        markerEnd: x,
        markerStart: S,
        interactionWidth: m,
      });
    },
  );
}
const Qy = Xy({ isInternal: !1 }),
  Zy = Xy({ isInternal: !0 });
Qy.displayName = "SmoothStepEdge";
Zy.displayName = "SmoothStepEdgeInternal";
function Jy(e) {
  return _.memo(({ id: t, ...n }) => {
    var o;
    const r = e.isInternal ? void 0 : t;
    return g.jsx(Qy, {
      ...n,
      id: r,
      pathOptions: _.useMemo(() => {
        var i;
        return { borderRadius: 0, offset: (i = n.pathOptions) == null ? void 0 : i.offset };
      }, [(o = n.pathOptions) == null ? void 0 : o.offset]),
    });
  });
}
const mC = Jy({ isInternal: !1 }),
  ev = Jy({ isInternal: !0 });
mC.displayName = "StepEdge";
ev.displayName = "StepEdgeInternal";
function tv(e) {
  return _.memo(
    ({
      id: t,
      sourceX: n,
      sourceY: r,
      targetX: o,
      targetY: i,
      label: s,
      labelStyle: l,
      labelShowBg: a,
      labelBgStyle: u,
      labelBgPadding: d,
      labelBgBorderRadius: c,
      style: f,
      markerEnd: y,
      markerStart: v,
      interactionWidth: x,
    }) => {
      const [S, h, m] = my({ sourceX: n, sourceY: r, targetX: o, targetY: i }),
        p = e.isInternal ? void 0 : t;
      return g.jsx(ya, {
        id: p,
        path: S,
        labelX: h,
        labelY: m,
        label: s,
        labelStyle: l,
        labelShowBg: a,
        labelBgStyle: u,
        labelBgPadding: d,
        labelBgBorderRadius: c,
        style: f,
        markerEnd: y,
        markerStart: v,
        interactionWidth: x,
      });
    },
  );
}
const yC = tv({ isInternal: !1 }),
  nv = tv({ isInternal: !0 });
yC.displayName = "StraightEdge";
nv.displayName = "StraightEdgeInternal";
function rv(e) {
  return _.memo(
    ({
      id: t,
      sourceX: n,
      sourceY: r,
      targetX: o,
      targetY: i,
      sourcePosition: s = re.Bottom,
      targetPosition: l = re.Top,
      label: a,
      labelStyle: u,
      labelShowBg: d,
      labelBgStyle: c,
      labelBgPadding: f,
      labelBgBorderRadius: y,
      style: v,
      markerEnd: x,
      markerStart: S,
      pathOptions: h,
      interactionWidth: m,
    }) => {
      const [p, w, E] = hy({
          sourceX: n,
          sourceY: r,
          sourcePosition: s,
          targetX: o,
          targetY: i,
          targetPosition: l,
          curvature: h == null ? void 0 : h.curvature,
        }),
        b = e.isInternal ? void 0 : t;
      return g.jsx(ya, {
        id: b,
        path: p,
        labelX: w,
        labelY: E,
        label: a,
        labelStyle: u,
        labelShowBg: d,
        labelBgStyle: c,
        labelBgPadding: f,
        labelBgBorderRadius: y,
        style: v,
        markerEnd: x,
        markerStart: S,
        interactionWidth: m,
      });
    },
  );
}
const vC = rv({ isInternal: !1 }),
  ov = rv({ isInternal: !0 });
vC.displayName = "BezierEdge";
ov.displayName = "BezierEdgeInternal";
const xh = { default: ov, straight: nv, step: ev, smoothstep: Zy, simplebezier: Yy },
  wh = { sourceX: null, sourceY: null, targetX: null, targetY: null, sourcePosition: null, targetPosition: null },
  xC = (e, t, n) => (n === re.Left ? e - t : n === re.Right ? e + t : e),
  wC = (e, t, n) => (n === re.Top ? e - t : n === re.Bottom ? e + t : e),
  _h = "react-flow__edgeupdater";
function Sh({
  position: e,
  centerX: t,
  centerY: n,
  radius: r = 10,
  onMouseDown: o,
  onMouseEnter: i,
  onMouseOut: s,
  type: l,
}) {
  return g.jsx("circle", {
    onMouseDown: o,
    onMouseEnter: i,
    onMouseOut: s,
    className: De([_h, `${_h}-${l}`]),
    cx: xC(t, r, e),
    cy: wC(n, r, e),
    r,
    stroke: "transparent",
    fill: "transparent",
  });
}
function _C({
  isReconnectable: e,
  reconnectRadius: t,
  edge: n,
  sourceX: r,
  sourceY: o,
  targetX: i,
  targetY: s,
  sourcePosition: l,
  targetPosition: a,
  onReconnect: u,
  onReconnectStart: d,
  onReconnectEnd: c,
  setReconnecting: f,
  setUpdateHover: y,
}) {
  const v = ke(),
    x = (w, E) => {
      if (w.button !== 0) return;
      const {
          autoPanOnConnect: b,
          domNode: k,
          connectionMode: A,
          connectionRadius: R,
          lib: z,
          onConnectStart: L,
          cancelConnection: M,
          nodeLookup: B,
          rfId: C,
          panBy: D,
          updateConnection: I,
        } = v.getState(),
        O = E.type === "target",
        N = ($, F) => {
          (f(!1), c == null || c($, n, E.type, F));
        },
        T = ($) => (u == null ? void 0 : u(n, $)),
        j = ($, F) => {
          (f(!0), d == null || d(w, n, E.type), L == null || L($, F));
        };
      Mc.onPointerDown(w.nativeEvent, {
        autoPanOnConnect: b,
        connectionMode: A,
        connectionRadius: R,
        domNode: k,
        handleId: E.id,
        nodeId: E.nodeId,
        nodeLookup: B,
        isTarget: O,
        edgeUpdaterType: E.type,
        lib: z,
        flowId: C,
        cancelConnection: M,
        panBy: D,
        isValidConnection: (...$) => {
          var F, G;
          return ((G = (F = v.getState()).isValidConnection) == null ? void 0 : G.call(F, ...$)) ?? !0;
        },
        onConnect: T,
        onConnectStart: j,
        onConnectEnd: (...$) => {
          var F, G;
          return (G = (F = v.getState()).onConnectEnd) == null ? void 0 : G.call(F, ...$);
        },
        onReconnectEnd: N,
        updateConnection: I,
        getTransform: () => v.getState().transform,
        getFromHandle: () => v.getState().connection.fromHandle,
        dragThreshold: v.getState().connectionDragThreshold,
        handleDomNode: w.currentTarget,
      });
    },
    S = (w) => x(w, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }),
    h = (w) => x(w, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }),
    m = () => y(!0),
    p = () => y(!1);
  return g.jsxs(g.Fragment, {
    children: [
      (e === !0 || e === "source") &&
        g.jsx(Sh, {
          position: l,
          centerX: r,
          centerY: o,
          radius: t,
          onMouseDown: S,
          onMouseEnter: m,
          onMouseOut: p,
          type: "source",
        }),
      (e === !0 || e === "target") &&
        g.jsx(Sh, {
          position: a,
          centerX: i,
          centerY: s,
          radius: t,
          onMouseDown: h,
          onMouseEnter: m,
          onMouseOut: p,
          type: "target",
        }),
    ],
  });
}
function SC({
  id: e,
  edgesFocusable: t,
  edgesReconnectable: n,
  elementsSelectable: r,
  onClick: o,
  onDoubleClick: i,
  onContextMenu: s,
  onMouseEnter: l,
  onMouseMove: a,
  onMouseLeave: u,
  reconnectRadius: d,
  onReconnect: c,
  onReconnectStart: f,
  onReconnectEnd: y,
  rfId: v,
  edgeTypes: x,
  noPanClassName: S,
  onError: h,
  disableKeyboardA11y: m,
}) {
  let p = he((ee) => ee.edgeLookup.get(e));
  const w = he((ee) => ee.defaultEdgeOptions);
  p = w ? { ...w, ...p } : p;
  let E = p.type || "default",
    b = (x == null ? void 0 : x[E]) || xh[E];
  b === void 0 &&
    (h == null || h("011", tn.error011(E)), (E = "default"), (b = (x == null ? void 0 : x.default) || xh.default));
  const k = !!(p.focusable || (t && typeof p.focusable > "u")),
    A = typeof c < "u" && (p.reconnectable || (n && typeof p.reconnectable > "u")),
    R = !!(p.selectable || (r && typeof p.selectable > "u")),
    z = _.useRef(null),
    [L, M] = _.useState(!1),
    [B, C] = _.useState(!1),
    D = ke(),
    {
      zIndex: I,
      sourceX: O,
      sourceY: N,
      targetX: T,
      targetY: j,
      sourcePosition: $,
      targetPosition: F,
    } = he(
      _.useCallback(
        (ee) => {
          const te = ee.nodeLookup.get(p.source),
            oe = ee.nodeLookup.get(p.target);
          if (!te || !oe) return { zIndex: p.zIndex, ...wh };
          const ce = Qb({
            id: e,
            sourceNode: te,
            targetNode: oe,
            sourceHandle: p.sourceHandle || null,
            targetHandle: p.targetHandle || null,
            connectionMode: ee.connectionMode,
            onError: h,
          });
          return {
            zIndex: Vb({
              selected: p.selected,
              zIndex: p.zIndex,
              sourceNode: te,
              targetNode: oe,
              elevateOnSelect: ee.elevateEdgesOnSelect,
              zIndexMode: ee.zIndexMode,
            }),
            ...(ce || wh),
          };
        },
        [p.source, p.target, p.sourceHandle, p.targetHandle, p.selected, p.zIndex],
      ),
      be,
    ),
    G = _.useMemo(() => (p.markerStart ? `url('#${Tc(p.markerStart, v)}')` : void 0), [p.markerStart, v]),
    W = _.useMemo(() => (p.markerEnd ? `url('#${Tc(p.markerEnd, v)}')` : void 0), [p.markerEnd, v]);
  if (p.hidden || O === null || N === null || T === null || j === null) return null;
  const Y = (ee) => {
      var de;
      const { addSelectedEdges: te, unselectNodesAndEdges: oe, multiSelectionActive: ce } = D.getState();
      (R &&
        (D.setState({ nodesSelectionActive: !1 }),
        p.selected && ce ? (oe({ nodes: [], edges: [p] }), (de = z.current) == null || de.blur()) : te([e])),
        o && o(ee, p));
    },
    X = i
      ? (ee) => {
          i(ee, { ...p });
        }
      : void 0,
    Q = s
      ? (ee) => {
          s(ee, { ...p });
        }
      : void 0,
    V = l
      ? (ee) => {
          l(ee, { ...p });
        }
      : void 0,
    Z = a
      ? (ee) => {
          a(ee, { ...p });
        }
      : void 0,
    ie = u
      ? (ee) => {
          u(ee, { ...p });
        }
      : void 0,
    U = (ee) => {
      var te;
      if (!m && J0.includes(ee.key) && R) {
        const { unselectNodesAndEdges: oe, addSelectedEdges: ce } = D.getState();
        ee.key === "Escape" ? ((te = z.current) == null || te.blur(), oe({ edges: [p] })) : ce([e]);
      }
    };
  return g.jsx("svg", {
    style: { zIndex: I },
    children: g.jsxs("g", {
      className: De([
        "react-flow__edge",
        `react-flow__edge-${E}`,
        p.className,
        S,
        { selected: p.selected, animated: p.animated, inactive: !R && !o, updating: L, selectable: R },
      ]),
      onClick: Y,
      onDoubleClick: X,
      onContextMenu: Q,
      onMouseEnter: V,
      onMouseMove: Z,
      onMouseLeave: ie,
      onKeyDown: k ? U : void 0,
      tabIndex: k ? 0 : void 0,
      role: p.ariaRole ?? (k ? "group" : "img"),
      "aria-roledescription": "edge",
      "data-id": e,
      "data-testid": `rf__edge-${e}`,
      "aria-label": p.ariaLabel === null ? void 0 : p.ariaLabel || `Edge from ${p.source} to ${p.target}`,
      "aria-describedby": k ? `${jy}-${v}` : void 0,
      ref: z,
      ...p.domAttributes,
      children: [
        !B &&
          g.jsx(b, {
            id: e,
            source: p.source,
            target: p.target,
            type: p.type,
            selected: p.selected,
            animated: p.animated,
            selectable: R,
            deletable: p.deletable ?? !0,
            label: p.label,
            labelStyle: p.labelStyle,
            labelShowBg: p.labelShowBg,
            labelBgStyle: p.labelBgStyle,
            labelBgPadding: p.labelBgPadding,
            labelBgBorderRadius: p.labelBgBorderRadius,
            sourceX: O,
            sourceY: N,
            targetX: T,
            targetY: j,
            sourcePosition: $,
            targetPosition: F,
            data: p.data,
            style: p.style,
            sourceHandleId: p.sourceHandle,
            targetHandleId: p.targetHandle,
            markerStart: G,
            markerEnd: W,
            pathOptions: "pathOptions" in p ? p.pathOptions : void 0,
            interactionWidth: p.interactionWidth,
          }),
        A &&
          g.jsx(_C, {
            edge: p,
            isReconnectable: A,
            reconnectRadius: d,
            onReconnect: c,
            onReconnectStart: f,
            onReconnectEnd: y,
            sourceX: O,
            sourceY: N,
            targetX: T,
            targetY: j,
            sourcePosition: $,
            targetPosition: F,
            setUpdateHover: M,
            setReconnecting: C,
          }),
      ],
    }),
  });
}
var EC = _.memo(SC);
const bC = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError,
});
function iv({
  defaultMarkerColor: e,
  onlyRenderVisibleElements: t,
  rfId: n,
  edgeTypes: r,
  noPanClassName: o,
  onReconnect: i,
  onEdgeContextMenu: s,
  onEdgeMouseEnter: l,
  onEdgeMouseMove: a,
  onEdgeMouseLeave: u,
  onEdgeClick: d,
  reconnectRadius: c,
  onEdgeDoubleClick: f,
  onReconnectStart: y,
  onReconnectEnd: v,
  disableKeyboardA11y: x,
}) {
  const { edgesFocusable: S, edgesReconnectable: h, elementsSelectable: m, onError: p } = he(bC, be),
    w = aC(t);
  return g.jsxs("div", {
    className: "react-flow__edges",
    children: [
      g.jsx(pC, { defaultColor: e, rfId: n }),
      w.map((E) =>
        g.jsx(
          EC,
          {
            id: E,
            edgesFocusable: S,
            edgesReconnectable: h,
            elementsSelectable: m,
            noPanClassName: o,
            onReconnect: i,
            onContextMenu: s,
            onMouseEnter: l,
            onMouseMove: a,
            onMouseLeave: u,
            onClick: d,
            reconnectRadius: c,
            onDoubleClick: f,
            onReconnectStart: y,
            onReconnectEnd: v,
            rfId: n,
            onError: p,
            edgeTypes: r,
            disableKeyboardA11y: x,
          },
          E,
        ),
      ),
    ],
  });
}
iv.displayName = "EdgeRenderer";
const kC = _.memo(iv),
  NC = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function CC({ children: e }) {
  const t = he(NC);
  return g.jsx("div", {
    className: "react-flow__viewport xyflow__viewport react-flow__container",
    style: { transform: t },
    children: e,
  });
}
function TC(e) {
  const t = Xd(),
    n = _.useRef(!1);
  _.useEffect(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), (n.current = !0));
  }, [e, t.viewportInitialized]);
}
const AC = (e) => {
  var t;
  return (t = e.panZoom) == null ? void 0 : t.syncViewport;
};
function MC(e) {
  const t = he(AC),
    n = ke();
  return (
    _.useEffect(() => {
      e && (t == null || t(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
    }, [e, t]),
    null
  );
}
function PC(e) {
  return e.connection.inProgress ? { ...e.connection, to: Ji(e.connection.to, e.transform) } : { ...e.connection };
}
function IC(e) {
  return PC;
}
function LC(e) {
  const t = IC();
  return he(t, be);
}
const RC = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height,
});
function jC({ containerStyle: e, style: t, type: n, component: r }) {
  const { nodesConnectable: o, width: i, height: s, isValid: l, inProgress: a } = he(RC, be);
  return !(i && o && a)
    ? null
    : g.jsx("svg", {
        style: e,
        width: i,
        height: s,
        className: "react-flow__connectionline react-flow__container",
        children: g.jsx("g", {
          className: De(["react-flow__connection", ny(l)]),
          children: g.jsx(sv, { style: t, type: n, CustomComponent: r, isValid: l }),
        }),
      });
}
const sv = ({ style: e, type: t = $n.Bezier, CustomComponent: n, isValid: r }) => {
  const {
    inProgress: o,
    from: i,
    fromNode: s,
    fromHandle: l,
    fromPosition: a,
    to: u,
    toNode: d,
    toHandle: c,
    toPosition: f,
    pointer: y,
  } = LC();
  if (!o) return;
  if (n)
    return g.jsx(n, {
      connectionLineType: t,
      connectionLineStyle: e,
      fromNode: s,
      fromHandle: l,
      fromX: i.x,
      fromY: i.y,
      toX: u.x,
      toY: u.y,
      fromPosition: a,
      toPosition: f,
      connectionStatus: ny(r),
      toNode: d,
      toHandle: c,
      pointer: y,
    });
  let v = "";
  const x = { sourceX: i.x, sourceY: i.y, sourcePosition: a, targetX: u.x, targetY: u.y, targetPosition: f };
  switch (t) {
    case $n.Bezier:
      [v] = hy(x);
      break;
    case $n.SimpleBezier:
      [v] = qy(x);
      break;
    case $n.Step:
      [v] = Cc({ ...x, borderRadius: 0 });
      break;
    case $n.SmoothStep:
      [v] = Cc(x);
      break;
    default:
      [v] = my(x);
  }
  return g.jsx("path", { d: v, fill: "none", className: "react-flow__connection-path", style: e });
};
sv.displayName = "ConnectionLine";
const DC = {};
function Eh(e = DC) {
  (_.useRef(e), ke(), _.useEffect(() => {}, [e]));
}
function OC() {
  (ke(), _.useRef(!1), _.useEffect(() => {}, []));
}
function lv({
  nodeTypes: e,
  edgeTypes: t,
  onInit: n,
  onNodeClick: r,
  onEdgeClick: o,
  onNodeDoubleClick: i,
  onEdgeDoubleClick: s,
  onNodeMouseEnter: l,
  onNodeMouseMove: a,
  onNodeMouseLeave: u,
  onNodeContextMenu: d,
  onSelectionContextMenu: c,
  onSelectionStart: f,
  onSelectionEnd: y,
  connectionLineType: v,
  connectionLineStyle: x,
  connectionLineComponent: S,
  connectionLineContainerStyle: h,
  selectionKeyCode: m,
  selectionOnDrag: p,
  selectionMode: w,
  multiSelectionKeyCode: E,
  panActivationKeyCode: b,
  zoomActivationKeyCode: k,
  deleteKeyCode: A,
  onlyRenderVisibleElements: R,
  elementsSelectable: z,
  defaultViewport: L,
  translateExtent: M,
  minZoom: B,
  maxZoom: C,
  preventScrolling: D,
  defaultMarkerColor: I,
  zoomOnScroll: O,
  zoomOnPinch: N,
  panOnScroll: T,
  panOnScrollSpeed: j,
  panOnScrollMode: $,
  zoomOnDoubleClick: F,
  panOnDrag: G,
  onPaneClick: W,
  onPaneMouseEnter: Y,
  onPaneMouseMove: X,
  onPaneMouseLeave: Q,
  onPaneScroll: V,
  onPaneContextMenu: Z,
  paneClickDistance: ie,
  nodeClickDistance: U,
  onEdgeContextMenu: ee,
  onEdgeMouseEnter: te,
  onEdgeMouseMove: oe,
  onEdgeMouseLeave: ce,
  reconnectRadius: de,
  onReconnect: Ie,
  onReconnectStart: pe,
  onReconnectEnd: Oe,
  noDragClassName: rn,
  noWheelClassName: bn,
  noPanClassName: kn,
  disableKeyboardA11y: on,
  nodeExtent: Ir,
  rfId: nr,
  viewport: Nt,
  onViewportChange: rr,
}) {
  return (
    Eh(e),
    Eh(t),
    OC(),
    TC(n),
    MC(Nt),
    g.jsx(ZN, {
      onPaneClick: W,
      onPaneMouseEnter: Y,
      onPaneMouseMove: X,
      onPaneMouseLeave: Q,
      onPaneContextMenu: Z,
      onPaneScroll: V,
      paneClickDistance: ie,
      deleteKeyCode: A,
      selectionKeyCode: m,
      selectionOnDrag: p,
      selectionMode: w,
      onSelectionStart: f,
      onSelectionEnd: y,
      multiSelectionKeyCode: E,
      panActivationKeyCode: b,
      zoomActivationKeyCode: k,
      elementsSelectable: z,
      zoomOnScroll: O,
      zoomOnPinch: N,
      zoomOnDoubleClick: F,
      panOnScroll: T,
      panOnScrollSpeed: j,
      panOnScrollMode: $,
      panOnDrag: G,
      defaultViewport: L,
      translateExtent: M,
      minZoom: B,
      maxZoom: C,
      onSelectionContextMenu: c,
      preventScrolling: D,
      noDragClassName: rn,
      noWheelClassName: bn,
      noPanClassName: kn,
      disableKeyboardA11y: on,
      onViewportChange: rr,
      isControlledViewport: !!Nt,
      children: g.jsxs(CC, {
        children: [
          g.jsx(kC, {
            edgeTypes: t,
            onEdgeClick: o,
            onEdgeDoubleClick: s,
            onReconnect: Ie,
            onReconnectStart: pe,
            onReconnectEnd: Oe,
            onlyRenderVisibleElements: R,
            onEdgeContextMenu: ee,
            onEdgeMouseEnter: te,
            onEdgeMouseMove: oe,
            onEdgeMouseLeave: ce,
            reconnectRadius: de,
            defaultMarkerColor: I,
            noPanClassName: kn,
            disableKeyboardA11y: on,
            rfId: nr,
          }),
          g.jsx(jC, { style: x, type: v, component: S, containerStyle: h }),
          g.jsx("div", { className: "react-flow__edgelabel-renderer" }),
          g.jsx(lC, {
            nodeTypes: e,
            onNodeClick: r,
            onNodeDoubleClick: i,
            onNodeMouseEnter: l,
            onNodeMouseMove: a,
            onNodeMouseLeave: u,
            onNodeContextMenu: d,
            nodeClickDistance: U,
            onlyRenderVisibleElements: R,
            noPanClassName: kn,
            noDragClassName: rn,
            disableKeyboardA11y: on,
            nodeExtent: Ir,
            rfId: nr,
          }),
          g.jsx("div", { className: "react-flow__viewport-portal" }),
        ],
      }),
    })
  );
}
lv.displayName = "GraphView";
const $C = _.memo(lv),
  bh = ({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: r,
    width: o,
    height: i,
    fitView: s,
    fitViewOptions: l,
    minZoom: a = 0.5,
    maxZoom: u = 2,
    nodeOrigin: d,
    nodeExtent: c,
    zIndexMode: f = "basic",
  } = {}) => {
    const y = new Map(),
      v = new Map(),
      x = new Map(),
      S = new Map(),
      h = r ?? t ?? [],
      m = n ?? e ?? [],
      p = d ?? [0, 0],
      w = c ?? Di;
    xy(x, S, h);
    const E = Ac(m, y, v, { nodeOrigin: p, nodeExtent: w, zIndexMode: f });
    let b = [0, 0, 1];
    if (s && o && i) {
      const k = Qi(y, { filter: (L) => !!((L.width || L.initialWidth) && (L.height || L.initialHeight)) }),
        { x: A, y: R, zoom: z } = Vd(k, o, i, a, u, (l == null ? void 0 : l.padding) ?? 0.1);
      b = [A, R, z];
    }
    return {
      rfId: "1",
      width: o ?? 0,
      height: i ?? 0,
      transform: b,
      nodes: m,
      nodesInitialized: E,
      nodeLookup: y,
      parentLookup: v,
      edges: h,
      edgeLookup: S,
      connectionLookup: x,
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: n !== void 0,
      hasDefaultEdges: r !== void 0,
      panZoom: null,
      minZoom: a,
      maxZoom: u,
      translateExtent: Di,
      nodeExtent: w,
      nodesSelectionActive: !1,
      userSelectionActive: !1,
      userSelectionRect: null,
      connectionMode: So.Strict,
      domNode: null,
      paneDragging: !1,
      noPanClassName: "nopan",
      nodeOrigin: p,
      nodeDragThreshold: 1,
      connectionDragThreshold: 1,
      snapGrid: [15, 15],
      snapToGrid: !1,
      nodesDraggable: !0,
      nodesConnectable: !0,
      nodesFocusable: !0,
      edgesFocusable: !0,
      edgesReconnectable: !0,
      elementsSelectable: !0,
      elevateNodesOnSelect: !0,
      elevateEdgesOnSelect: !0,
      selectNodesOnDrag: !0,
      multiSelectionActive: !1,
      fitViewQueued: s ?? !1,
      fitViewOptions: l,
      fitViewResolver: null,
      connection: { ...ty },
      connectionClickStartHandle: null,
      connectOnClick: !0,
      ariaLiveMessage: "",
      autoPanOnConnect: !0,
      autoPanOnNodeDrag: !0,
      autoPanOnNodeFocus: !0,
      autoPanSpeed: 15,
      connectionRadius: 20,
      onError: Ob,
      isValidConnection: void 0,
      onSelectionChangeHandlers: [],
      lib: "react",
      debug: !1,
      ariaLabelConfig: ey,
      zIndexMode: f,
      onNodesChangeMiddlewareMap: new Map(),
      onEdgesChangeMiddlewareMap: new Map(),
    };
  },
  zC = ({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: r,
    width: o,
    height: i,
    fitView: s,
    fitViewOptions: l,
    minZoom: a,
    maxZoom: u,
    nodeOrigin: d,
    nodeExtent: c,
    zIndexMode: f,
  }) =>
    tN((y, v) => {
      async function x() {
        const {
          nodeLookup: S,
          panZoom: h,
          fitViewOptions: m,
          fitViewResolver: p,
          width: w,
          height: E,
          minZoom: b,
          maxZoom: k,
        } = v();
        h &&
          (await jb({ nodes: S, width: w, height: E, panZoom: h, minZoom: b, maxZoom: k }, m),
          p == null || p.resolve(!0),
          y({ fitViewResolver: null }));
      }
      return {
        ...bh({
          nodes: e,
          edges: t,
          width: o,
          height: i,
          fitView: s,
          fitViewOptions: l,
          minZoom: a,
          maxZoom: u,
          nodeOrigin: d,
          nodeExtent: c,
          defaultNodes: n,
          defaultEdges: r,
          zIndexMode: f,
        }),
        setNodes: (S) => {
          const {
              nodeLookup: h,
              parentLookup: m,
              nodeOrigin: p,
              elevateNodesOnSelect: w,
              fitViewQueued: E,
              zIndexMode: b,
            } = v(),
            k = Ac(S, h, m, { nodeOrigin: p, nodeExtent: c, elevateNodesOnSelect: w, checkEquality: !0, zIndexMode: b });
          E && k
            ? (x(), y({ nodes: S, nodesInitialized: k, fitViewQueued: !1, fitViewOptions: void 0 }))
            : y({ nodes: S, nodesInitialized: k });
        },
        setEdges: (S) => {
          const { connectionLookup: h, edgeLookup: m } = v();
          (xy(h, m, S), y({ edges: S }));
        },
        setDefaultNodesAndEdges: (S, h) => {
          if (S) {
            const { setNodes: m } = v();
            (m(S), y({ hasDefaultNodes: !0 }));
          }
          if (h) {
            const { setEdges: m } = v();
            (m(h), y({ hasDefaultEdges: !0 }));
          }
        },
        updateNodeInternals: (S) => {
          const {
              triggerNodeChanges: h,
              nodeLookup: m,
              parentLookup: p,
              domNode: w,
              nodeOrigin: E,
              nodeExtent: b,
              debug: k,
              fitViewQueued: A,
              zIndexMode: R,
            } = v(),
            { changes: z, updatedInternals: L } = ik(S, m, p, w, E, b, R);
          L &&
            (tk(m, p, { nodeOrigin: E, nodeExtent: b, zIndexMode: R }),
            A ? (x(), y({ fitViewQueued: !1, fitViewOptions: void 0 })) : y({}),
            (z == null ? void 0 : z.length) > 0 &&
              (k && console.log("React Flow: trigger node changes", z), h == null || h(z)));
        },
        updateNodePositions: (S, h = !1) => {
          const m = [];
          let p = [];
          const {
            nodeLookup: w,
            triggerNodeChanges: E,
            connection: b,
            updateConnection: k,
            onNodesChangeMiddlewareMap: A,
          } = v();
          for (const [R, z] of S) {
            const L = w.get(R),
              M = !!(L != null && L.expandParent && L != null && L.parentId && z != null && z.position),
              B = {
                id: R,
                type: "position",
                position: M ? { x: Math.max(0, z.position.x), y: Math.max(0, z.position.y) } : z.position,
                dragging: h,
              };
            if (L && b.inProgress && b.fromNode.id === L.id) {
              const C = Tr(L, b.fromHandle, re.Left, !0);
              k({ ...b, from: C });
            }
            (M &&
              L.parentId &&
              m.push({
                id: R,
                parentId: L.parentId,
                rect: { ...z.internals.positionAbsolute, width: z.measured.width ?? 0, height: z.measured.height ?? 0 },
              }),
              p.push(B));
          }
          if (m.length > 0) {
            const { parentLookup: R, nodeOrigin: z } = v(),
              L = Yd(m, w, R, z);
            p.push(...L);
          }
          for (const R of A.values()) p = R(p);
          E(p);
        },
        triggerNodeChanges: (S) => {
          const { onNodesChange: h, setNodes: m, nodes: p, hasDefaultNodes: w, debug: E } = v();
          if (S != null && S.length) {
            if (w) {
              const b = SN(S, p);
              m(b);
            }
            (E && console.log("React Flow: trigger node changes", S), h == null || h(S));
          }
        },
        triggerEdgeChanges: (S) => {
          const { onEdgesChange: h, setEdges: m, edges: p, hasDefaultEdges: w, debug: E } = v();
          if (S != null && S.length) {
            if (w) {
              const b = EN(S, p);
              m(b);
            }
            (E && console.log("React Flow: trigger edge changes", S), h == null || h(S));
          }
        },
        addSelectedNodes: (S) => {
          const { multiSelectionActive: h, edgeLookup: m, nodeLookup: p, triggerNodeChanges: w, triggerEdgeChanges: E } = v();
          if (h) {
            const b = S.map((k) => ur(k, !0));
            w(b);
            return;
          }
          (w(to(p, new Set([...S]), !0)), E(to(m)));
        },
        addSelectedEdges: (S) => {
          const { multiSelectionActive: h, edgeLookup: m, nodeLookup: p, triggerNodeChanges: w, triggerEdgeChanges: E } = v();
          if (h) {
            const b = S.map((k) => ur(k, !0));
            E(b);
            return;
          }
          (E(to(m, new Set([...S]))), w(to(p, new Set(), !0)));
        },
        unselectNodesAndEdges: ({ nodes: S, edges: h } = {}) => {
          const { edges: m, nodes: p, nodeLookup: w, triggerNodeChanges: E, triggerEdgeChanges: b } = v(),
            k = S || p,
            A = h || m,
            R = [];
          for (const L of k) {
            if (!L.selected) continue;
            const M = w.get(L.id);
            (M && (M.selected = !1), R.push(ur(L.id, !1)));
          }
          const z = [];
          for (const L of A) L.selected && z.push(ur(L.id, !1));
          (E(R), b(z));
        },
        setMinZoom: (S) => {
          const { panZoom: h, maxZoom: m } = v();
          (h == null || h.setScaleExtent([S, m]), y({ minZoom: S }));
        },
        setMaxZoom: (S) => {
          const { panZoom: h, minZoom: m } = v();
          (h == null || h.setScaleExtent([m, S]), y({ maxZoom: S }));
        },
        setTranslateExtent: (S) => {
          var h;
          ((h = v().panZoom) == null || h.setTranslateExtent(S), y({ translateExtent: S }));
        },
        resetSelectedElements: () => {
          const { edges: S, nodes: h, triggerNodeChanges: m, triggerEdgeChanges: p, elementsSelectable: w } = v();
          if (!w) return;
          const E = h.reduce((k, A) => (A.selected ? [...k, ur(A.id, !1)] : k), []),
            b = S.reduce((k, A) => (A.selected ? [...k, ur(A.id, !1)] : k), []);
          (m(E), p(b));
        },
        setNodeExtent: (S) => {
          const {
            nodes: h,
            nodeLookup: m,
            parentLookup: p,
            nodeOrigin: w,
            elevateNodesOnSelect: E,
            nodeExtent: b,
            zIndexMode: k,
          } = v();
          (S[0][0] === b[0][0] && S[0][1] === b[0][1] && S[1][0] === b[1][0] && S[1][1] === b[1][1]) ||
            (Ac(h, m, p, { nodeOrigin: w, nodeExtent: S, elevateNodesOnSelect: E, checkEquality: !1, zIndexMode: k }),
            y({ nodeExtent: S }));
        },
        panBy: (S) => {
          const { transform: h, width: m, height: p, panZoom: w, translateExtent: E } = v();
          return sk({ delta: S, panZoom: w, transform: h, translateExtent: E, width: m, height: p });
        },
        setCenter: async (S, h, m) => {
          const { width: p, height: w, maxZoom: E, panZoom: b } = v();
          if (!b) return Promise.resolve(!1);
          const k = typeof (m == null ? void 0 : m.zoom) < "u" ? m.zoom : E;
          return (
            await b.setViewport(
              { x: p / 2 - S * k, y: w / 2 - h * k, zoom: k },
              {
                duration: m == null ? void 0 : m.duration,
                ease: m == null ? void 0 : m.ease,
                interpolate: m == null ? void 0 : m.interpolate,
              },
            ),
            Promise.resolve(!0)
          );
        },
        cancelConnection: () => {
          y({ connection: { ...ty } });
        },
        updateConnection: (S) => {
          y({ connection: S });
        },
        reset: () => y({ ...bh() }),
      };
    }, Object.is);
function FC({
  initialNodes: e,
  initialEdges: t,
  defaultNodes: n,
  defaultEdges: r,
  initialWidth: o,
  initialHeight: i,
  initialMinZoom: s,
  initialMaxZoom: l,
  initialFitViewOptions: a,
  fitView: u,
  nodeOrigin: d,
  nodeExtent: c,
  zIndexMode: f,
  children: y,
}) {
  const [v] = _.useState(() =>
    zC({
      nodes: e,
      edges: t,
      defaultNodes: n,
      defaultEdges: r,
      width: o,
      height: i,
      fitView: u,
      minZoom: s,
      maxZoom: l,
      fitViewOptions: a,
      nodeOrigin: d,
      nodeExtent: c,
      zIndexMode: f,
    }),
  );
  return g.jsx(nN, { value: v, children: g.jsx(CN, { children: y }) });
}
function BC({
  children: e,
  nodes: t,
  edges: n,
  defaultNodes: r,
  defaultEdges: o,
  width: i,
  height: s,
  fitView: l,
  fitViewOptions: a,
  minZoom: u,
  maxZoom: d,
  nodeOrigin: c,
  nodeExtent: f,
  zIndexMode: y,
}) {
  return _.useContext(ha)
    ? g.jsx(g.Fragment, { children: e })
    : g.jsx(FC, {
        initialNodes: t,
        initialEdges: n,
        defaultNodes: r,
        defaultEdges: o,
        initialWidth: i,
        initialHeight: s,
        fitView: l,
        initialFitViewOptions: a,
        initialMinZoom: u,
        initialMaxZoom: d,
        nodeOrigin: c,
        nodeExtent: f,
        zIndexMode: y,
        children: e,
      });
}
const HC = { width: "100%", height: "100%", overflow: "hidden", position: "relative", zIndex: 0 };
function VC(
  {
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: r,
    className: o,
    nodeTypes: i,
    edgeTypes: s,
    onNodeClick: l,
    onEdgeClick: a,
    onInit: u,
    onMove: d,
    onMoveStart: c,
    onMoveEnd: f,
    onConnect: y,
    onConnectStart: v,
    onConnectEnd: x,
    onClickConnectStart: S,
    onClickConnectEnd: h,
    onNodeMouseEnter: m,
    onNodeMouseMove: p,
    onNodeMouseLeave: w,
    onNodeContextMenu: E,
    onNodeDoubleClick: b,
    onNodeDragStart: k,
    onNodeDrag: A,
    onNodeDragStop: R,
    onNodesDelete: z,
    onEdgesDelete: L,
    onDelete: M,
    onSelectionChange: B,
    onSelectionDragStart: C,
    onSelectionDrag: D,
    onSelectionDragStop: I,
    onSelectionContextMenu: O,
    onSelectionStart: N,
    onSelectionEnd: T,
    onBeforeDelete: j,
    connectionMode: $,
    connectionLineType: F = $n.Bezier,
    connectionLineStyle: G,
    connectionLineComponent: W,
    connectionLineContainerStyle: Y,
    deleteKeyCode: X = "Backspace",
    selectionKeyCode: Q = "Shift",
    selectionOnDrag: V = !1,
    selectionMode: Z = Oi.Full,
    panActivationKeyCode: ie = "Space",
    multiSelectionKeyCode: U = Fi() ? "Meta" : "Control",
    zoomActivationKeyCode: ee = Fi() ? "Meta" : "Control",
    snapToGrid: te,
    snapGrid: oe,
    onlyRenderVisibleElements: ce = !1,
    selectNodesOnDrag: de,
    nodesDraggable: Ie,
    autoPanOnNodeFocus: pe,
    nodesConnectable: Oe,
    nodesFocusable: rn,
    nodeOrigin: bn = Dy,
    edgesFocusable: kn,
    edgesReconnectable: on,
    elementsSelectable: Ir = !0,
    defaultViewport: nr = gN,
    minZoom: Nt = 0.5,
    maxZoom: rr = 2,
    translateExtent: Vt = Di,
    preventScrolling: Nn = !0,
    nodeExtent: Lr,
    defaultMarkerColor: P = "#b1b1b7",
    zoomOnScroll: q = !0,
    zoomOnPinch: ne = !0,
    panOnScroll: ge = !1,
    panOnScrollSpeed: fe = 0.5,
    panOnScrollMode: se = yr.Free,
    zoomOnDoubleClick: ve = !0,
    panOnDrag: ct = !0,
    onPaneClick: Ze,
    onPaneMouseEnter: es,
    onPaneMouseMove: Ro,
    onPaneMouseLeave: ts,
    onPaneScroll: ns,
    onPaneContextMenu: rs,
    paneClickDistance: os = 1,
    nodeClickDistance: J = 0,
    children: Ne,
    onReconnect: Le,
    onReconnectStart: Fe,
    onReconnectEnd: rt,
    onEdgeContextMenu: dt,
    onEdgeDoubleClick: qe,
    onEdgeMouseEnter: Rr,
    onEdgeMouseMove: is,
    onEdgeMouseLeave: Ix,
    reconnectRadius: Lx = 10,
    onNodesChange: Rx,
    onEdgesChange: jx,
    noDragClassName: Dx = "nodrag",
    noWheelClassName: Ox = "nowheel",
    noPanClassName: sf = "nopan",
    fitView: lf,
    fitViewOptions: af,
    connectOnClick: $x,
    attributionPosition: zx,
    proOptions: Fx,
    defaultEdgeOptions: Bx,
    elevateNodesOnSelect: Hx = !0,
    elevateEdgesOnSelect: Vx = !1,
    disableKeyboardA11y: uf = !1,
    autoPanOnConnect: Wx,
    autoPanOnNodeDrag: Ux,
    autoPanSpeed: Gx,
    connectionRadius: qx,
    isValidConnection: Kx,
    onError: Yx,
    style: Xx,
    id: cf,
    nodeDragThreshold: Qx,
    connectionDragThreshold: Zx,
    viewport: Jx,
    onViewportChange: ew,
    width: tw,
    height: nw,
    colorMode: rw = "light",
    debug: ow,
    onScroll: ss,
    ariaLabelConfig: iw,
    zIndexMode: df = "basic",
    ...sw
  },
  lw,
) {
  const Ea = cf || "1",
    aw = xN(rw),
    uw = _.useCallback(
      (ff) => {
        (ff.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), ss == null || ss(ff));
      },
      [ss],
    );
  return g.jsx("div", {
    "data-testid": "rf__wrapper",
    ...sw,
    onScroll: uw,
    style: { ...Xx, ...HC },
    ref: lw,
    className: De(["react-flow", o, aw]),
    id: cf,
    role: "application",
    children: g.jsxs(BC, {
      nodes: e,
      edges: t,
      width: tw,
      height: nw,
      fitView: lf,
      fitViewOptions: af,
      minZoom: Nt,
      maxZoom: rr,
      nodeOrigin: bn,
      nodeExtent: Lr,
      zIndexMode: df,
      children: [
        g.jsx($C, {
          onInit: u,
          onNodeClick: l,
          onEdgeClick: a,
          onNodeMouseEnter: m,
          onNodeMouseMove: p,
          onNodeMouseLeave: w,
          onNodeContextMenu: E,
          onNodeDoubleClick: b,
          nodeTypes: i,
          edgeTypes: s,
          connectionLineType: F,
          connectionLineStyle: G,
          connectionLineComponent: W,
          connectionLineContainerStyle: Y,
          selectionKeyCode: Q,
          selectionOnDrag: V,
          selectionMode: Z,
          deleteKeyCode: X,
          multiSelectionKeyCode: U,
          panActivationKeyCode: ie,
          zoomActivationKeyCode: ee,
          onlyRenderVisibleElements: ce,
          defaultViewport: nr,
          translateExtent: Vt,
          minZoom: Nt,
          maxZoom: rr,
          preventScrolling: Nn,
          zoomOnScroll: q,
          zoomOnPinch: ne,
          zoomOnDoubleClick: ve,
          panOnScroll: ge,
          panOnScrollSpeed: fe,
          panOnScrollMode: se,
          panOnDrag: ct,
          onPaneClick: Ze,
          onPaneMouseEnter: es,
          onPaneMouseMove: Ro,
          onPaneMouseLeave: ts,
          onPaneScroll: ns,
          onPaneContextMenu: rs,
          paneClickDistance: os,
          nodeClickDistance: J,
          onSelectionContextMenu: O,
          onSelectionStart: N,
          onSelectionEnd: T,
          onReconnect: Le,
          onReconnectStart: Fe,
          onReconnectEnd: rt,
          onEdgeContextMenu: dt,
          onEdgeDoubleClick: qe,
          onEdgeMouseEnter: Rr,
          onEdgeMouseMove: is,
          onEdgeMouseLeave: Ix,
          reconnectRadius: Lx,
          defaultMarkerColor: P,
          noDragClassName: Dx,
          noWheelClassName: Ox,
          noPanClassName: sf,
          rfId: Ea,
          disableKeyboardA11y: uf,
          nodeExtent: Lr,
          viewport: Jx,
          onViewportChange: ew,
        }),
        g.jsx(vN, {
          nodes: e,
          edges: t,
          defaultNodes: n,
          defaultEdges: r,
          onConnect: y,
          onConnectStart: v,
          onConnectEnd: x,
          onClickConnectStart: S,
          onClickConnectEnd: h,
          nodesDraggable: Ie,
          autoPanOnNodeFocus: pe,
          nodesConnectable: Oe,
          nodesFocusable: rn,
          edgesFocusable: kn,
          edgesReconnectable: on,
          elementsSelectable: Ir,
          elevateNodesOnSelect: Hx,
          elevateEdgesOnSelect: Vx,
          minZoom: Nt,
          maxZoom: rr,
          nodeExtent: Lr,
          onNodesChange: Rx,
          onEdgesChange: jx,
          snapToGrid: te,
          snapGrid: oe,
          connectionMode: $,
          translateExtent: Vt,
          connectOnClick: $x,
          defaultEdgeOptions: Bx,
          fitView: lf,
          fitViewOptions: af,
          onNodesDelete: z,
          onEdgesDelete: L,
          onDelete: M,
          onNodeDragStart: k,
          onNodeDrag: A,
          onNodeDragStop: R,
          onSelectionDrag: D,
          onSelectionDragStart: C,
          onSelectionDragStop: I,
          onMove: d,
          onMoveStart: c,
          onMoveEnd: f,
          noPanClassName: sf,
          nodeOrigin: bn,
          rfId: Ea,
          autoPanOnConnect: Wx,
          autoPanOnNodeDrag: Ux,
          autoPanSpeed: Gx,
          onError: Yx,
          connectionRadius: qx,
          isValidConnection: Kx,
          selectNodesOnDrag: de,
          nodeDragThreshold: Qx,
          connectionDragThreshold: Zx,
          onBeforeDelete: j,
          debug: ow,
          ariaLabelConfig: iw,
          zIndexMode: df,
        }),
        g.jsx(hN, { onSelectionChange: B }),
        Ne,
        g.jsx(uN, { proOptions: Fx, position: zx }),
        g.jsx(aN, { rfId: Ea, disableKeyboardA11y: uf }),
      ],
    }),
  });
}
var WC = $y(VC);
function UC({ dimensions: e, lineWidth: t, variant: n, className: r }) {
  return g.jsx("path", {
    strokeWidth: t,
    d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`,
    className: De(["react-flow__background-pattern", n, r]),
  });
}
function GC({ radius: e, className: t }) {
  return g.jsx("circle", { cx: e, cy: e, r: e, className: De(["react-flow__background-pattern", "dots", t]) });
}
var Xn;
(function (e) {
  ((e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross"));
})(Xn || (Xn = {}));
const qC = { [Xn.Dots]: 1, [Xn.Lines]: 1, [Xn.Cross]: 6 },
  KC = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function av({
  id: e,
  variant: t = Xn.Dots,
  gap: n = 20,
  size: r,
  lineWidth: o = 1,
  offset: i = 0,
  color: s,
  bgColor: l,
  style: a,
  className: u,
  patternClassName: d,
}) {
  const c = _.useRef(null),
    { transform: f, patternId: y } = he(KC, be),
    v = r || qC[t],
    x = t === Xn.Dots,
    S = t === Xn.Cross,
    h = Array.isArray(n) ? n : [n, n],
    m = [h[0] * f[2] || 1, h[1] * f[2] || 1],
    p = v * f[2],
    w = Array.isArray(i) ? i : [i, i],
    E = S ? [p, p] : m,
    b = [w[0] * f[2] || 1 + E[0] / 2, w[1] * f[2] || 1 + E[1] / 2],
    k = `${y}${e || ""}`;
  return g.jsxs("svg", {
    className: De(["react-flow__background", u]),
    style: { ...a, ...ma, "--xy-background-color-props": l, "--xy-background-pattern-color-props": s },
    ref: c,
    "data-testid": "rf__background",
    children: [
      g.jsx("pattern", {
        id: k,
        x: f[0] % m[0],
        y: f[1] % m[1],
        width: m[0],
        height: m[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${b[0]},-${b[1]})`,
        children: x
          ? g.jsx(GC, { radius: p / 2, className: d })
          : g.jsx(UC, { dimensions: E, lineWidth: o, variant: t, className: d }),
      }),
      g.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${k})` }),
    ],
  });
}
av.displayName = "Background";
const YC = _.memo(av);
function XC() {
  return g.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    children: g.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }),
  });
}
function QC() {
  return g.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5",
    children: g.jsx("path", { d: "M0 0h32v4.2H0z" }),
  });
}
function ZC() {
  return g.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30",
    children: g.jsx("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  });
}
function JC() {
  return g.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: g.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  });
}
function eT() {
  return g.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: g.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  });
}
function Is({ children: e, className: t, ...n }) {
  return g.jsx("button", { type: "button", className: De(["react-flow__controls-button", t]), ...n, children: e });
}
const tT = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig,
});
function uv({
  style: e,
  showZoom: t = !0,
  showFitView: n = !0,
  showInteractive: r = !0,
  fitViewOptions: o,
  onZoomIn: i,
  onZoomOut: s,
  onFitView: l,
  onInteractiveChange: a,
  className: u,
  children: d,
  position: c = "bottom-left",
  orientation: f = "vertical",
  "aria-label": y,
}) {
  const v = ke(),
    { isInteractive: x, minZoomReached: S, maxZoomReached: h, ariaLabelConfig: m } = he(tT, be),
    { zoomIn: p, zoomOut: w, fitView: E } = Xd(),
    b = () => {
      (p(), i == null || i());
    },
    k = () => {
      (w(), s == null || s());
    },
    A = () => {
      (E(o), l == null || l());
    },
    R = () => {
      (v.setState({ nodesDraggable: !x, nodesConnectable: !x, elementsSelectable: !x }), a == null || a(!x));
    },
    z = f === "horizontal" ? "horizontal" : "vertical";
  return g.jsxs(ga, {
    className: De(["react-flow__controls", z, u]),
    position: c,
    style: e,
    "data-testid": "rf__controls",
    "aria-label": y ?? m["controls.ariaLabel"],
    children: [
      t &&
        g.jsxs(g.Fragment, {
          children: [
            g.jsx(Is, {
              onClick: b,
              className: "react-flow__controls-zoomin",
              title: m["controls.zoomIn.ariaLabel"],
              "aria-label": m["controls.zoomIn.ariaLabel"],
              disabled: h,
              children: g.jsx(XC, {}),
            }),
            g.jsx(Is, {
              onClick: k,
              className: "react-flow__controls-zoomout",
              title: m["controls.zoomOut.ariaLabel"],
              "aria-label": m["controls.zoomOut.ariaLabel"],
              disabled: S,
              children: g.jsx(QC, {}),
            }),
          ],
        }),
      n &&
        g.jsx(Is, {
          className: "react-flow__controls-fitview",
          onClick: A,
          title: m["controls.fitView.ariaLabel"],
          "aria-label": m["controls.fitView.ariaLabel"],
          children: g.jsx(ZC, {}),
        }),
      r &&
        g.jsx(Is, {
          className: "react-flow__controls-interactive",
          onClick: R,
          title: m["controls.interactive.ariaLabel"],
          "aria-label": m["controls.interactive.ariaLabel"],
          children: x ? g.jsx(eT, {}) : g.jsx(JC, {}),
        }),
      d,
    ],
  });
}
uv.displayName = "Controls";
const nT = _.memo(uv);
function rT({
  id: e,
  x: t,
  y: n,
  width: r,
  height: o,
  style: i,
  color: s,
  strokeColor: l,
  strokeWidth: a,
  className: u,
  borderRadius: d,
  shapeRendering: c,
  selected: f,
  onClick: y,
}) {
  const { background: v, backgroundColor: x } = i || {},
    S = s || v || x;
  return g.jsx("rect", {
    className: De(["react-flow__minimap-node", { selected: f }, u]),
    x: t,
    y: n,
    rx: d,
    ry: d,
    width: r,
    height: o,
    style: { fill: S, stroke: l, strokeWidth: a },
    shapeRendering: c,
    onClick: y ? (h) => y(h, e) : void 0,
  });
}
const oT = _.memo(rT),
  iT = (e) => e.nodes.map((t) => t.id),
  iu = (e) => (e instanceof Function ? e : () => e);
function sT({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: o,
  nodeComponent: i = oT,
  onClick: s,
}) {
  const l = he(iT, be),
    a = iu(t),
    u = iu(e),
    d = iu(n),
    c = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return g.jsx(g.Fragment, {
    children: l.map((f) =>
      g.jsx(
        aT,
        {
          id: f,
          nodeColorFunc: a,
          nodeStrokeColorFunc: u,
          nodeClassNameFunc: d,
          nodeBorderRadius: r,
          nodeStrokeWidth: o,
          NodeComponent: i,
          onClick: s,
          shapeRendering: c,
        },
        f,
      ),
    ),
  });
}
function lT({
  id: e,
  nodeColorFunc: t,
  nodeStrokeColorFunc: n,
  nodeClassNameFunc: r,
  nodeBorderRadius: o,
  nodeStrokeWidth: i,
  shapeRendering: s,
  NodeComponent: l,
  onClick: a,
}) {
  const {
    node: u,
    x: d,
    y: c,
    width: f,
    height: y,
  } = he((v) => {
    const x = v.nodeLookup.get(e);
    if (!x) return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const S = x.internals.userNode,
      { x: h, y: m } = x.internals.positionAbsolute,
      { width: p, height: w } = Sn(S);
    return { node: S, x: h, y: m, width: p, height: w };
  }, be);
  return !u || u.hidden || !ay(u)
    ? null
    : g.jsx(l, {
        x: d,
        y: c,
        width: f,
        height: y,
        style: u.style,
        selected: !!u.selected,
        className: r(u),
        color: t(u),
        borderRadius: o,
        strokeColor: n(u),
        strokeWidth: i,
        shapeRendering: s,
        onClick: a,
        id: u.id,
      });
}
const aT = _.memo(lT);
var uT = _.memo(sT);
const cT = 200,
  dT = 150,
  fT = (e) => !e.hidden,
  pT = (e) => {
    const t = {
      x: -e.transform[0] / e.transform[2],
      y: -e.transform[1] / e.transform[2],
      width: e.width / e.transform[2],
      height: e.height / e.transform[2],
    };
    return {
      viewBB: t,
      boundingRect: e.nodeLookup.size > 0 ? ly(Qi(e.nodeLookup, { filter: fT }), t) : t,
      rfId: e.rfId,
      panZoom: e.panZoom,
      translateExtent: e.translateExtent,
      flowWidth: e.width,
      flowHeight: e.height,
      ariaLabelConfig: e.ariaLabelConfig,
    };
  },
  hT = "react-flow__minimap-desc";
function cv({
  style: e,
  className: t,
  nodeStrokeColor: n,
  nodeColor: r,
  nodeClassName: o = "",
  nodeBorderRadius: i = 5,
  nodeStrokeWidth: s,
  nodeComponent: l,
  bgColor: a,
  maskColor: u,
  maskStrokeColor: d,
  maskStrokeWidth: c,
  position: f = "bottom-right",
  onClick: y,
  onNodeClick: v,
  pannable: x = !1,
  zoomable: S = !1,
  ariaLabel: h,
  inversePan: m,
  zoomStep: p = 1,
  offsetScale: w = 5,
}) {
  const E = ke(),
    b = _.useRef(null),
    {
      boundingRect: k,
      viewBB: A,
      rfId: R,
      panZoom: z,
      translateExtent: L,
      flowWidth: M,
      flowHeight: B,
      ariaLabelConfig: C,
    } = he(pT, be),
    D = (e == null ? void 0 : e.width) ?? cT,
    I = (e == null ? void 0 : e.height) ?? dT,
    O = k.width / D,
    N = k.height / I,
    T = Math.max(O, N),
    j = T * D,
    $ = T * I,
    F = w * T,
    G = k.x - (j - k.width) / 2 - F,
    W = k.y - ($ - k.height) / 2 - F,
    Y = j + F * 2,
    X = $ + F * 2,
    Q = `${hT}-${R}`,
    V = _.useRef(0),
    Z = _.useRef();
  ((V.current = T),
    _.useEffect(() => {
      if (b.current && z)
        return (
          (Z.current = gk({
            domNode: b.current,
            panZoom: z,
            getTransform: () => E.getState().transform,
            getViewScale: () => V.current,
          })),
          () => {
            var te;
            (te = Z.current) == null || te.destroy();
          }
        );
    }, [z]),
    _.useEffect(() => {
      var te;
      (te = Z.current) == null ||
        te.update({ translateExtent: L, width: M, height: B, inversePan: m, pannable: x, zoomStep: p, zoomable: S });
    }, [x, S, m, p, L, M, B]));
  const ie = y
      ? (te) => {
          var de;
          const [oe, ce] = ((de = Z.current) == null ? void 0 : de.pointer(te)) || [0, 0];
          y(te, { x: oe, y: ce });
        }
      : void 0,
    U = v
      ? _.useCallback((te, oe) => {
          const ce = E.getState().nodeLookup.get(oe).internals.userNode;
          v(te, ce);
        }, [])
      : void 0,
    ee = h ?? C["minimap.ariaLabel"];
  return g.jsx(ga, {
    position: f,
    style: {
      ...e,
      "--xy-minimap-background-color-props": typeof a == "string" ? a : void 0,
      "--xy-minimap-mask-background-color-props": typeof u == "string" ? u : void 0,
      "--xy-minimap-mask-stroke-color-props": typeof d == "string" ? d : void 0,
      "--xy-minimap-mask-stroke-width-props": typeof c == "number" ? c * T : void 0,
      "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
      "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
      "--xy-minimap-node-stroke-width-props": typeof s == "number" ? s : void 0,
    },
    className: De(["react-flow__minimap", t]),
    "data-testid": "rf__minimap",
    children: g.jsxs("svg", {
      width: D,
      height: I,
      viewBox: `${G} ${W} ${Y} ${X}`,
      className: "react-flow__minimap-svg",
      role: "img",
      "aria-labelledby": Q,
      ref: b,
      onClick: ie,
      children: [
        ee && g.jsx("title", { id: Q, children: ee }),
        g.jsx(uT, {
          onClick: U,
          nodeColor: r,
          nodeStrokeColor: n,
          nodeBorderRadius: i,
          nodeClassName: o,
          nodeStrokeWidth: s,
          nodeComponent: l,
        }),
        g.jsx("path", {
          className: "react-flow__minimap-mask",
          d: `M${G - F},${W - F}h${Y + F * 2}v${X + F * 2}h${-Y - F * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`,
          fillRule: "evenodd",
          pointerEvents: "none",
        }),
      ],
    }),
  });
}
cv.displayName = "MiniMap";
_.memo(cv);
const gT = (e) => (t) => (e ? `${Math.max(1 / t.transform[2], 1)}` : void 0),
  mT = { [No.Line]: "right", [No.Handle]: "bottom-right" };
function yT({
  nodeId: e,
  position: t,
  variant: n = No.Handle,
  className: r,
  style: o = void 0,
  children: i,
  color: s,
  minWidth: l = 10,
  minHeight: a = 10,
  maxWidth: u = Number.MAX_VALUE,
  maxHeight: d = Number.MAX_VALUE,
  keepAspectRatio: c = !1,
  resizeDirection: f,
  autoScale: y = !0,
  shouldResize: v,
  onResizeStart: x,
  onResize: S,
  onResizeEnd: h,
}) {
  const m = Hy(),
    p = typeof e == "string" ? e : m,
    w = ke(),
    E = _.useRef(null),
    b = n === No.Handle,
    k = he(_.useCallback(gT(b && y), [b, y]), be),
    A = _.useRef(null),
    R = t ?? mT[n];
  _.useEffect(() => {
    if (!(!E.current || !p))
      return (
        A.current ||
          (A.current = Ak({
            domNode: E.current,
            nodeId: p,
            getStoreItems: () => {
              const { nodeLookup: L, transform: M, snapGrid: B, snapToGrid: C, nodeOrigin: D, domNode: I } = w.getState();
              return { nodeLookup: L, transform: M, snapGrid: B, snapToGrid: C, nodeOrigin: D, paneDomNode: I };
            },
            onChange: (L, M) => {
              const { triggerNodeChanges: B, nodeLookup: C, parentLookup: D, nodeOrigin: I } = w.getState(),
                O = [],
                N = { x: L.x, y: L.y },
                T = C.get(p);
              if (T && T.expandParent && T.parentId) {
                const j = T.origin ?? I,
                  $ = L.width ?? T.measured.width ?? 0,
                  F = L.height ?? T.measured.height ?? 0,
                  G = {
                    id: T.id,
                    parentId: T.parentId,
                    rect: {
                      width: $,
                      height: F,
                      ...uy({ x: L.x ?? T.position.x, y: L.y ?? T.position.y }, { width: $, height: F }, T.parentId, C, j),
                    },
                  },
                  W = Yd([G], C, D, I);
                (O.push(...W),
                  (N.x = L.x ? Math.max(j[0] * $, L.x) : void 0),
                  (N.y = L.y ? Math.max(j[1] * F, L.y) : void 0));
              }
              if (N.x !== void 0 && N.y !== void 0) {
                const j = { id: p, type: "position", position: { ...N } };
                O.push(j);
              }
              if (L.width !== void 0 && L.height !== void 0) {
                const $ = {
                  id: p,
                  type: "dimensions",
                  resizing: !0,
                  setAttributes: f ? (f === "horizontal" ? "width" : "height") : !0,
                  dimensions: { width: L.width, height: L.height },
                };
                O.push($);
              }
              for (const j of M) {
                const $ = { ...j, type: "position" };
                O.push($);
              }
              B(O);
            },
            onEnd: ({ width: L, height: M }) => {
              const B = { id: p, type: "dimensions", resizing: !1, dimensions: { width: L, height: M } };
              w.getState().triggerNodeChanges([B]);
            },
          })),
        A.current.update({
          controlPosition: R,
          boundaries: { minWidth: l, minHeight: a, maxWidth: u, maxHeight: d },
          keepAspectRatio: c,
          resizeDirection: f,
          onResizeStart: x,
          onResize: S,
          onResizeEnd: h,
          shouldResize: v,
        }),
        () => {
          var L;
          (L = A.current) == null || L.destroy();
        }
      );
  }, [R, l, a, u, d, c, x, S, h, v]);
  const z = R.split("-");
  return g.jsx("div", {
    className: De(["react-flow__resize-control", "nodrag", ...z, n, r]),
    ref: E,
    style: { ...o, scale: k, ...(s && { [b ? "backgroundColor" : "borderColor"]: s }) },
    children: i,
  });
}
_.memo(yT);
function dv(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (n = dv(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function fv() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = dv(e)) && (r && (r += " "), (r += t));
  return r;
}
const kh = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  Nh = fv,
  va = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return Nh(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    const { variants: o, defaultVariants: i } = t,
      s = Object.keys(o).map((u) => {
        const d = n == null ? void 0 : n[u],
          c = i == null ? void 0 : i[u];
        if (d === null) return null;
        const f = kh(d) || kh(c);
        return o[u][f];
      }),
      l =
        n &&
        Object.entries(n).reduce((u, d) => {
          let [c, f] = d;
          return (f === void 0 || (u[c] = f), u);
        }, {}),
      a =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((u, d) => {
              let { class: c, className: f, ...y } = d;
              return Object.entries(y).every((v) => {
                let [x, S] = v;
                return Array.isArray(S) ? S.includes({ ...i, ...l }[x]) : { ...i, ...l }[x] === S;
              })
                ? [...u, c, f]
                : u;
            }, []);
    return Nh(e, s, a, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  },
  Zd = "-",
  vT = (e) => {
    const t = wT(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (s) => {
        const l = s.split(Zd);
        return (l[0] === "" && l.length !== 1 && l.shift(), pv(l, t) || xT(s));
      },
      getConflictingClassGroupIds: (s, l) => {
        const a = n[s] || [];
        return l && r[s] ? [...a, ...r[s]] : a;
      },
    };
  },
  pv = (e, t) => {
    var s;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      o = r ? pv(e.slice(1), r) : void 0;
    if (o) return o;
    if (t.validators.length === 0) return;
    const i = e.join(Zd);
    return (s = t.validators.find(({ validator: l }) => l(i))) == null ? void 0 : s.classGroupId;
  },
  Ch = /^\[(.+)\]$/,
  xT = (e) => {
    if (Ch.test(e)) {
      const t = Ch.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (n) return "arbitrary.." + n;
    }
  },
  wT = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      ST(Object.entries(e.classGroups), n).forEach(([i, s]) => {
        Ic(s, r, i, t);
      }),
      r
    );
  },
  Ic = (e, t, n, r) => {
    e.forEach((o) => {
      if (typeof o == "string") {
        const i = o === "" ? t : Th(t, o);
        i.classGroupId = n;
        return;
      }
      if (typeof o == "function") {
        if (_T(o)) {
          Ic(o(r), t, n, r);
          return;
        }
        t.validators.push({ validator: o, classGroupId: n });
        return;
      }
      Object.entries(o).forEach(([i, s]) => {
        Ic(s, Th(t, i), n, r);
      });
    });
  },
  Th = (e, t) => {
    let n = e;
    return (
      t.split(Zd).forEach((r) => {
        (n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  _T = (e) => e.isThemeGetter,
  ST = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const o = r.map((i) =>
            typeof i == "string"
              ? t + i
              : typeof i == "object"
                ? Object.fromEntries(Object.entries(i).map(([s, l]) => [t + s, l]))
                : i,
          );
          return [n, o];
        })
      : e,
  ET = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const o = (i, s) => {
      (n.set(i, s), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(i) {
        let s = n.get(i);
        if (s !== void 0) return s;
        if ((s = r.get(i)) !== void 0) return (o(i, s), s);
      },
      set(i, s) {
        n.has(i) ? n.set(i, s) : o(i, s);
      },
    };
  },
  hv = "!",
  bT = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      o = t[0],
      i = t.length,
      s = (l) => {
        const a = [];
        let u = 0,
          d = 0,
          c;
        for (let S = 0; S < l.length; S++) {
          let h = l[S];
          if (u === 0) {
            if (h === o && (r || l.slice(S, S + i) === t)) {
              (a.push(l.slice(d, S)), (d = S + i));
              continue;
            }
            if (h === "/") {
              c = S;
              continue;
            }
          }
          h === "[" ? u++ : h === "]" && u--;
        }
        const f = a.length === 0 ? l : l.substring(d),
          y = f.startsWith(hv),
          v = y ? f.substring(1) : f,
          x = c && c > d ? c - d : void 0;
        return { modifiers: a, hasImportantModifier: y, baseClassName: v, maybePostfixModifierPosition: x };
      };
    return n ? (l) => n({ className: l, parseClassName: s }) : s;
  },
  kT = (e) => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
      e.forEach((r) => {
        r[0] === "[" ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
      }),
      t.push(...n.sort()),
      t
    );
  },
  NT = (e) => ({ cache: ET(e.cacheSize), parseClassName: bT(e), ...vT(e) }),
  CT = /\s+/,
  TT = (e, t) => {
    const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: o } = t,
      i = [],
      s = e.trim().split(CT);
    let l = "";
    for (let a = s.length - 1; a >= 0; a -= 1) {
      const u = s[a],
        { modifiers: d, hasImportantModifier: c, baseClassName: f, maybePostfixModifierPosition: y } = n(u);
      let v = !!y,
        x = r(v ? f.substring(0, y) : f);
      if (!x) {
        if (!v) {
          l = u + (l.length > 0 ? " " + l : l);
          continue;
        }
        if (((x = r(f)), !x)) {
          l = u + (l.length > 0 ? " " + l : l);
          continue;
        }
        v = !1;
      }
      const S = kT(d).join(":"),
        h = c ? S + hv : S,
        m = h + x;
      if (i.includes(m)) continue;
      i.push(m);
      const p = o(x, v);
      for (let w = 0; w < p.length; ++w) {
        const E = p[w];
        i.push(h + E);
      }
      l = u + (l.length > 0 ? " " + l : l);
    }
    return l;
  };
function AT() {
  let e = 0,
    t,
    n,
    r = "";
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = gv(t)) && (r && (r += " "), (r += n));
  return r;
}
const gv = (e) => {
  if (typeof e == "string") return e;
  let t,
    n = "";
  for (let r = 0; r < e.length; r++) e[r] && (t = gv(e[r])) && (n && (n += " "), (n += t));
  return n;
};
function MT(e, ...t) {
  let n,
    r,
    o,
    i = s;
  function s(a) {
    const u = t.reduce((d, c) => c(d), e());
    return ((n = NT(u)), (r = n.cache.get), (o = n.cache.set), (i = l), l(a));
  }
  function l(a) {
    const u = r(a);
    if (u) return u;
    const d = TT(a, n);
    return (o(a, d), d);
  }
  return function () {
    return i(AT.apply(null, arguments));
  };
}
const we = (e) => {
    const t = (n) => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  mv = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  PT = /^\d+\/\d+$/,
  IT = new Set(["px", "full", "screen"]),
  LT = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  RT =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  jT = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  DT = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  OT = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ln = (e) => co(e) || IT.has(e) || PT.test(e),
  Mn = (e) => Io(e, "length", UT),
  co = (e) => !!e && !Number.isNaN(Number(e)),
  su = (e) => Io(e, "number", co),
  Uo = (e) => !!e && Number.isInteger(Number(e)),
  $T = (e) => e.endsWith("%") && co(e.slice(0, -1)),
  le = (e) => mv.test(e),
  Pn = (e) => LT.test(e),
  zT = new Set(["length", "size", "percentage"]),
  FT = (e) => Io(e, zT, yv),
  BT = (e) => Io(e, "position", yv),
  HT = new Set(["image", "url"]),
  VT = (e) => Io(e, HT, qT),
  WT = (e) => Io(e, "", GT),
  Go = () => !0,
  Io = (e, t, n) => {
    const r = mv.exec(e);
    return r ? (r[1] ? (typeof t == "string" ? r[1] === t : t.has(r[1])) : n(r[2])) : !1;
  },
  UT = (e) => RT.test(e) && !jT.test(e),
  yv = () => !1,
  GT = (e) => DT.test(e),
  qT = (e) => OT.test(e),
  KT = () => {
    const e = we("colors"),
      t = we("spacing"),
      n = we("blur"),
      r = we("brightness"),
      o = we("borderColor"),
      i = we("borderRadius"),
      s = we("borderSpacing"),
      l = we("borderWidth"),
      a = we("contrast"),
      u = we("grayscale"),
      d = we("hueRotate"),
      c = we("invert"),
      f = we("gap"),
      y = we("gradientColorStops"),
      v = we("gradientColorStopPositions"),
      x = we("inset"),
      S = we("margin"),
      h = we("opacity"),
      m = we("padding"),
      p = we("saturate"),
      w = we("scale"),
      E = we("sepia"),
      b = we("skew"),
      k = we("space"),
      A = we("translate"),
      R = () => ["auto", "contain", "none"],
      z = () => ["auto", "hidden", "clip", "visible", "scroll"],
      L = () => ["auto", le, t],
      M = () => [le, t],
      B = () => ["", ln, Mn],
      C = () => ["auto", co, le],
      D = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
      I = () => ["solid", "dashed", "dotted", "double", "none"],
      O = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
      T = () => ["", "0", le],
      j = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      $ = () => [co, le];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [Go],
        spacing: [ln, Mn],
        blur: ["none", "", Pn, le],
        brightness: $(),
        borderColor: [e],
        borderRadius: ["none", "", "full", Pn, le],
        borderSpacing: M(),
        borderWidth: B(),
        contrast: $(),
        grayscale: T(),
        hueRotate: $(),
        invert: T(),
        gap: M(),
        gradientColorStops: [e],
        gradientColorStopPositions: [$T, Mn],
        inset: L(),
        margin: L(),
        opacity: $(),
        padding: M(),
        saturate: $(),
        scale: $(),
        sepia: T(),
        skew: $(),
        space: M(),
        translate: M(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", le] }],
        container: ["container"],
        columns: [{ columns: [Pn] }],
        "break-after": [{ "break-after": j() }],
        "break-before": [{ "break-before": j() }],
        "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
        "object-position": [{ object: [...D(), le] }],
        overflow: [{ overflow: z() }],
        "overflow-x": [{ "overflow-x": z() }],
        "overflow-y": [{ "overflow-y": z() }],
        overscroll: [{ overscroll: R() }],
        "overscroll-x": [{ "overscroll-x": R() }],
        "overscroll-y": [{ "overscroll-y": R() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [x] }],
        "inset-x": [{ "inset-x": [x] }],
        "inset-y": [{ "inset-y": [x] }],
        start: [{ start: [x] }],
        end: [{ end: [x] }],
        top: [{ top: [x] }],
        right: [{ right: [x] }],
        bottom: [{ bottom: [x] }],
        left: [{ left: [x] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", Uo, le] }],
        basis: [{ basis: L() }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", le] }],
        grow: [{ grow: T() }],
        shrink: [{ shrink: T() }],
        order: [{ order: ["first", "last", "none", Uo, le] }],
        "grid-cols": [{ "grid-cols": [Go] }],
        "col-start-end": [{ col: ["auto", { span: ["full", Uo, le] }, le] }],
        "col-start": [{ "col-start": C() }],
        "col-end": [{ "col-end": C() }],
        "grid-rows": [{ "grid-rows": [Go] }],
        "row-start-end": [{ row: ["auto", { span: [Uo, le] }, le] }],
        "row-start": [{ "row-start": C() }],
        "row-end": [{ "row-end": C() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", le] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", le] }],
        gap: [{ gap: [f] }],
        "gap-x": [{ "gap-x": [f] }],
        "gap-y": [{ "gap-y": [f] }],
        "justify-content": [{ justify: ["normal", ...N()] }],
        "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }],
        "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }],
        "align-content": [{ content: ["normal", ...N(), "baseline"] }],
        "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }],
        "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }],
        "place-content": [{ "place-content": [...N(), "baseline"] }],
        "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }],
        "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }],
        p: [{ p: [m] }],
        px: [{ px: [m] }],
        py: [{ py: [m] }],
        ps: [{ ps: [m] }],
        pe: [{ pe: [m] }],
        pt: [{ pt: [m] }],
        pr: [{ pr: [m] }],
        pb: [{ pb: [m] }],
        pl: [{ pl: [m] }],
        m: [{ m: [S] }],
        mx: [{ mx: [S] }],
        my: [{ my: [S] }],
        ms: [{ ms: [S] }],
        me: [{ me: [S] }],
        mt: [{ mt: [S] }],
        mr: [{ mr: [S] }],
        mb: [{ mb: [S] }],
        ml: [{ ml: [S] }],
        "space-x": [{ "space-x": [k] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [k] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", le, t] }],
        "min-w": [{ "min-w": [le, t, "min", "max", "fit"] }],
        "max-w": [{ "max-w": [le, t, "none", "full", "min", "max", "fit", "prose", { screen: [Pn] }, Pn] }],
        h: [{ h: [le, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [{ "min-h": [le, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "max-h": [{ "max-h": [le, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        size: [{ size: [le, t, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", Pn, Mn] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          { font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", su] },
        ],
        "font-family": [{ font: [Go] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", le] }],
        "line-clamp": [{ "line-clamp": ["none", co, su] }],
        leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ln, le] }],
        "list-image": [{ "list-image": ["none", le] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", le] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [h] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [h] }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...I(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: ["auto", "from-font", ln, Mn] }],
        "underline-offset": [{ "underline-offset": ["auto", ln, le] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: M() }],
        "vertical-align": [{ align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", le] }],
        whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", le] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [h] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...D(), BT] }],
        "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }],
        "bg-size": [{ bg: ["auto", "cover", "contain", FT] }],
        "bg-image": [{ bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, VT] }],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [v] }],
        "gradient-via-pos": [{ via: [v] }],
        "gradient-to-pos": [{ to: [v] }],
        "gradient-from": [{ from: [y] }],
        "gradient-via": [{ via: [y] }],
        "gradient-to": [{ to: [y] }],
        rounded: [{ rounded: [i] }],
        "rounded-s": [{ "rounded-s": [i] }],
        "rounded-e": [{ "rounded-e": [i] }],
        "rounded-t": [{ "rounded-t": [i] }],
        "rounded-r": [{ "rounded-r": [i] }],
        "rounded-b": [{ "rounded-b": [i] }],
        "rounded-l": [{ "rounded-l": [i] }],
        "rounded-ss": [{ "rounded-ss": [i] }],
        "rounded-se": [{ "rounded-se": [i] }],
        "rounded-ee": [{ "rounded-ee": [i] }],
        "rounded-es": [{ "rounded-es": [i] }],
        "rounded-tl": [{ "rounded-tl": [i] }],
        "rounded-tr": [{ "rounded-tr": [i] }],
        "rounded-br": [{ "rounded-br": [i] }],
        "rounded-bl": [{ "rounded-bl": [i] }],
        "border-w": [{ border: [l] }],
        "border-w-x": [{ "border-x": [l] }],
        "border-w-y": [{ "border-y": [l] }],
        "border-w-s": [{ "border-s": [l] }],
        "border-w-e": [{ "border-e": [l] }],
        "border-w-t": [{ "border-t": [l] }],
        "border-w-r": [{ "border-r": [l] }],
        "border-w-b": [{ "border-b": [l] }],
        "border-w-l": [{ "border-l": [l] }],
        "border-opacity": [{ "border-opacity": [h] }],
        "border-style": [{ border: [...I(), "hidden"] }],
        "divide-x": [{ "divide-x": [l] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [l] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [h] }],
        "divide-style": [{ divide: I() }],
        "border-color": [{ border: [o] }],
        "border-color-x": [{ "border-x": [o] }],
        "border-color-y": [{ "border-y": [o] }],
        "border-color-s": [{ "border-s": [o] }],
        "border-color-e": [{ "border-e": [o] }],
        "border-color-t": [{ "border-t": [o] }],
        "border-color-r": [{ "border-r": [o] }],
        "border-color-b": [{ "border-b": [o] }],
        "border-color-l": [{ "border-l": [o] }],
        "divide-color": [{ divide: [o] }],
        "outline-style": [{ outline: ["", ...I()] }],
        "outline-offset": [{ "outline-offset": [ln, le] }],
        "outline-w": [{ outline: [ln, Mn] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: B() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [h] }],
        "ring-offset-w": [{ "ring-offset": [ln, Mn] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", Pn, WT] }],
        "shadow-color": [{ shadow: [Go] }],
        opacity: [{ opacity: [h] }],
        "mix-blend": [{ "mix-blend": [...O(), "plus-lighter", "plus-darker"] }],
        "bg-blend": [{ "bg-blend": O() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [a] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", Pn, le] }],
        grayscale: [{ grayscale: [u] }],
        "hue-rotate": [{ "hue-rotate": [d] }],
        invert: [{ invert: [c] }],
        saturate: [{ saturate: [p] }],
        sepia: [{ sepia: [E] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [n] }],
        "backdrop-brightness": [{ "backdrop-brightness": [r] }],
        "backdrop-contrast": [{ "backdrop-contrast": [a] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [u] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [d] }],
        "backdrop-invert": [{ "backdrop-invert": [c] }],
        "backdrop-opacity": [{ "backdrop-opacity": [h] }],
        "backdrop-saturate": [{ "backdrop-saturate": [p] }],
        "backdrop-sepia": [{ "backdrop-sepia": [E] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [s] }],
        "border-spacing-x": [{ "border-spacing-x": [s] }],
        "border-spacing-y": [{ "border-spacing-y": [s] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [{ transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", le] }],
        duration: [{ duration: $() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", le] }],
        delay: [{ delay: $() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", le] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [w] }],
        "scale-x": [{ "scale-x": [w] }],
        "scale-y": [{ "scale-y": [w] }],
        rotate: [{ rotate: [Uo, le] }],
        "translate-x": [{ "translate-x": [A] }],
        "translate-y": [{ "translate-y": [A] }],
        "skew-x": [{ "skew-x": [b] }],
        "skew-y": [{ "skew-y": [b] }],
        "transform-origin": [
          {
            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", le],
          },
        ],
        accent: [{ accent: ["auto", e] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              le,
            ],
          },
        ],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": M() }],
        "scroll-mx": [{ "scroll-mx": M() }],
        "scroll-my": [{ "scroll-my": M() }],
        "scroll-ms": [{ "scroll-ms": M() }],
        "scroll-me": [{ "scroll-me": M() }],
        "scroll-mt": [{ "scroll-mt": M() }],
        "scroll-mr": [{ "scroll-mr": M() }],
        "scroll-mb": [{ "scroll-mb": M() }],
        "scroll-ml": [{ "scroll-ml": M() }],
        "scroll-p": [{ "scroll-p": M() }],
        "scroll-px": [{ "scroll-px": M() }],
        "scroll-py": [{ "scroll-py": M() }],
        "scroll-ps": [{ "scroll-ps": M() }],
        "scroll-pe": [{ "scroll-pe": M() }],
        "scroll-pt": [{ "scroll-pt": M() }],
        "scroll-pr": [{ "scroll-pr": M() }],
        "scroll-pb": [{ "scroll-pb": M() }],
        "scroll-pl": [{ "scroll-pl": M() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", le] }],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [ln, Mn, su] }],
        stroke: [{ stroke: [e, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  YT = MT(KT);
function ue(...e) {
  return YT(fv(e));
}
console.log("[codex] loaded: agents/src/lib/utils.ts");
const XT = va(
  "font-ui inline-flex items-center rounded-sm border px-2.5 py-[3px] text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/45 bg-primary/16 text-primary",
        secondary: "border-secondary/85 bg-secondary/75 text-secondary-foreground",
        destructive: "border-destructive/45 bg-destructive/16 text-destructive",
        outline: "border-border/90 bg-background/55 text-foreground/85",
        success: "border-primary/50 bg-secondary/65 text-primary",
        warning: "border-accent-foreground/40 bg-accent/60 text-accent-foreground",
        info: "border-border/80 bg-background/78 text-foreground/85",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function Be({ className: e, variant: t, ...n }) {
  return g.jsx("div", { className: ue(XT({ variant: t }), e), ...n });
}
console.log("[codex] loaded: agents/src/components/ui/badge.tsx");
function Ah(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function Jd(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = Ah(o, t);
      return (!n && typeof i == "function" && (n = !0), i);
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : Ah(e[o], null);
        }
      };
  };
}
function En(...e) {
  return _.useCallback(Jd(...e), e);
}
var QT = Symbol.for("react.lazy"),
  Fl = Hc[" use ".trim().toString()];
function ZT(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function vv(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === QT && "_payload" in e && ZT(e._payload);
}
function xv(e) {
  const t = JT(e),
    n = _.forwardRef((r, o) => {
      let { children: i, ...s } = r;
      vv(i) && typeof Fl == "function" && (i = Fl(i._payload));
      const l = _.Children.toArray(i),
        a = l.find(tA);
      if (a) {
        const u = a.props.children,
          d = l.map((c) =>
            c === a ? (_.Children.count(u) > 1 ? _.Children.only(null) : _.isValidElement(u) ? u.props.children : null) : c,
          );
        return g.jsx(t, { ...s, ref: o, children: _.isValidElement(u) ? _.cloneElement(u, void 0, d) : null });
      }
      return g.jsx(t, { ...s, ref: o, children: i });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var wv = xv("Slot");
function JT(e) {
  const t = _.forwardRef((n, r) => {
    let { children: o, ...i } = n;
    if ((vv(o) && typeof Fl == "function" && (o = Fl(o._payload)), _.isValidElement(o))) {
      const s = rA(o),
        l = nA(i, o.props);
      return (o.type !== _.Fragment && (l.ref = r ? Jd(r, s) : s), _.cloneElement(o, l));
    }
    return _.Children.count(o) > 1 ? _.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var eA = Symbol("radix.slottable");
function tA(e) {
  return _.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === eA;
}
function nA(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...l) => {
            const a = i(...l);
            return (o(...l), a);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...i })
        : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function rA(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
const oA = va(
    "font-ui inline-flex items-center justify-center whitespace-nowrap rounded-sm border text-[10px] font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "border-primary/45 bg-primary/18 text-foreground hover:bg-primary/26",
          secondary: "border-secondary/85 bg-secondary/90 text-secondary-foreground hover:bg-secondary",
          outline: "border-border/80 bg-background/70 text-foreground hover:border-accent-foreground/25 hover:bg-accent/40",
          ghost: "border-transparent text-foreground/80 hover:border-border/80 hover:bg-accent/35",
          destructive: "border-destructive/45 bg-destructive/15 text-destructive hover:bg-destructive/22",
        },
        size: { default: "h-9 px-4 py-1.5", sm: "h-8 px-3.5", lg: "h-10 px-5", icon: "h-9 w-9" },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  In = _.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => {
    const s = r ? wv : "button";
    return g.jsx(s, { className: ue(oA({ variant: t, size: n, className: e })), ref: i, ...o });
  });
In.displayName = "Button";
console.log("[codex] loaded: agents/src/components/ui/button.tsx");
const _v = _.forwardRef(({ className: e, type: t, ...n }, r) =>
  g.jsx("input", {
    type: t,
    className: ue(
      "font-ui flex h-9 w-full rounded-sm border border-input/80 bg-background/75 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-[11px] file:font-medium placeholder:text-muted-foreground/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e,
    ),
    ref: r,
    ...n,
  }),
);
_v.displayName = "Input";
console.log("[codex] loaded: agents/src/components/ui/input.tsx");
function iA(e, t = []) {
  let n = [];
  function r(i, s) {
    const l = _.createContext(s);
    l.displayName = i + "Context";
    const a = n.length;
    n = [...n, s];
    const u = (c) => {
      var h;
      const { scope: f, children: y, ...v } = c,
        x = ((h = f == null ? void 0 : f[e]) == null ? void 0 : h[a]) || l,
        S = _.useMemo(() => v, Object.values(v));
      return g.jsx(x.Provider, { value: S, children: y });
    };
    u.displayName = i + "Provider";
    function d(c, f) {
      var x;
      const y = ((x = f == null ? void 0 : f[e]) == null ? void 0 : x[a]) || l,
        v = _.useContext(y);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${c}\` must be used within \`${i}\``);
    }
    return [u, d];
  }
  const o = () => {
    const i = n.map((s) => _.createContext(s));
    return function (l) {
      const a = (l == null ? void 0 : l[e]) || i;
      return _.useMemo(() => ({ [`__scope${e}`]: { ...l, [e]: a } }), [l, a]);
    };
  };
  return ((o.scopeName = e), [r, sA(o, ...t)]);
}
function sA(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const s = r.reduce((l, { useScope: a, scopeName: u }) => {
        const c = a(i)[`__scope${u}`];
        return { ...l, ...c };
      }, {});
      return _.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var lA = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Sv = lA.reduce((e, t) => {
    const n = xv(`Primitive.${t}`),
      r = _.forwardRef((o, i) => {
        const { asChild: s, ...l } = o,
          a = s ? n : t;
        return (typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), g.jsx(a, { ...l, ref: i }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {}),
  ef = "Progress",
  tf = 100,
  [aA] = iA(ef),
  [uA, cA] = aA(ef),
  Ev = _.forwardRef((e, t) => {
    const { __scopeProgress: n, value: r = null, max: o, getValueLabel: i = dA, ...s } = e;
    (o || o === 0) && !Mh(o) && console.error(fA(`${o}`, "Progress"));
    const l = Mh(o) ? o : tf;
    r !== null && !Ph(r, l) && console.error(pA(`${r}`, "Progress"));
    const a = Ph(r, l) ? r : null,
      u = Bl(a) ? i(a, l) : void 0;
    return g.jsx(uA, {
      scope: n,
      value: a,
      max: l,
      children: g.jsx(Sv.div, {
        "aria-valuemax": l,
        "aria-valuemin": 0,
        "aria-valuenow": Bl(a) ? a : void 0,
        "aria-valuetext": u,
        role: "progressbar",
        "data-state": Nv(a, l),
        "data-value": a ?? void 0,
        "data-max": l,
        ...s,
        ref: t,
      }),
    });
  });
Ev.displayName = ef;
var bv = "ProgressIndicator",
  kv = _.forwardRef((e, t) => {
    const { __scopeProgress: n, ...r } = e,
      o = cA(bv, n);
    return g.jsx(Sv.div, {
      "data-state": Nv(o.value, o.max),
      "data-value": o.value ?? void 0,
      "data-max": o.max,
      ...r,
      ref: t,
    });
  });
kv.displayName = bv;
function dA(e, t) {
  return `${Math.round((e / t) * 100)}%`;
}
function Nv(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Bl(e) {
  return typeof e == "number";
}
function Mh(e) {
  return Bl(e) && !isNaN(e) && e > 0;
}
function Ph(e, t) {
  return Bl(e) && !isNaN(e) && e <= t && e >= 0;
}
function fA(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${tf}\`.`;
}
function pA(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${tf} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Cv = Ev,
  hA = kv;
const nl = _.forwardRef(({ className: e, value: t, ...n }, r) =>
  g.jsx(Cv, {
    ref: r,
    className: ue("relative h-[3px] w-full overflow-hidden rounded-sm bg-muted/80", e),
    ...n,
    children: g.jsx(hA, {
      className: "h-full w-full flex-1 bg-primary/85 transition-all",
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
    }),
  }),
);
nl.displayName = Cv.displayName;
console.log("[codex] loaded: agents/src/components/ui/progress.tsx");
function gn(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented)) return t == null ? void 0 : t(o);
  };
}
function gA(e, t) {
  const n = _.createContext(t),
    r = (i) => {
      const { children: s, ...l } = i,
        a = _.useMemo(() => l, Object.values(l));
      return g.jsx(n.Provider, { value: a, children: s });
    };
  r.displayName = e + "Provider";
  function o(i) {
    const s = _.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function Tv(e, t = []) {
  let n = [];
  function r(i, s) {
    const l = _.createContext(s),
      a = n.length;
    n = [...n, s];
    const u = (c) => {
      var h;
      const { scope: f, children: y, ...v } = c,
        x = ((h = f == null ? void 0 : f[e]) == null ? void 0 : h[a]) || l,
        S = _.useMemo(() => v, Object.values(v));
      return g.jsx(x.Provider, { value: S, children: y });
    };
    u.displayName = i + "Provider";
    function d(c, f) {
      var x;
      const y = ((x = f == null ? void 0 : f[e]) == null ? void 0 : x[a]) || l,
        v = _.useContext(y);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${c}\` must be used within \`${i}\``);
    }
    return [u, d];
  }
  const o = () => {
    const i = n.map((s) => _.createContext(s));
    return function (l) {
      const a = (l == null ? void 0 : l[e]) || i;
      return _.useMemo(() => ({ [`__scope${e}`]: { ...l, [e]: a } }), [l, a]);
    };
  };
  return ((o.scopeName = e), [r, mA(o, ...t)]);
}
function mA(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const s = r.reduce((l, { useScope: a, scopeName: u }) => {
        const c = a(i)[`__scope${u}`];
        return { ...l, ...c };
      }, {});
      return _.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var To = globalThis != null && globalThis.document ? _.useLayoutEffect : () => {},
  yA = Hc[" useId ".trim().toString()] || (() => {}),
  vA = 0;
function lu(e) {
  const [t, n] = _.useState(yA());
  return (
    To(() => {
      n((r) => r ?? String(vA++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
var xA = Hc[" useInsertionEffect ".trim().toString()] || To;
function Av({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [o, i, s] = wA({ defaultProp: t, onChange: n }),
    l = e !== void 0,
    a = l ? e : o;
  {
    const d = _.useRef(e !== void 0);
    _.useEffect(() => {
      const c = d.current;
      (c !== l &&
        console.warn(
          `${r} is changing from ${c ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (d.current = l));
    }, [l, r]);
  }
  const u = _.useCallback(
    (d) => {
      var c;
      if (l) {
        const f = _A(d) ? d(e) : d;
        f !== e && ((c = s.current) == null || c.call(s, f));
      } else i(d);
    },
    [l, e, i, s],
  );
  return [a, u];
}
function wA({ defaultProp: e, onChange: t }) {
  const [n, r] = _.useState(e),
    o = _.useRef(n),
    i = _.useRef(t);
  return (
    xA(() => {
      i.current = t;
    }, [t]),
    _.useEffect(() => {
      var s;
      o.current !== n && ((s = i.current) == null || s.call(i, n), (o.current = n));
    }, [n, o]),
    [n, r, i]
  );
}
function _A(e) {
  return typeof e == "function";
}
function Mv(e) {
  const t = SA(e),
    n = _.forwardRef((r, o) => {
      const { children: i, ...s } = r,
        l = _.Children.toArray(i),
        a = l.find(bA);
      if (a) {
        const u = a.props.children,
          d = l.map((c) =>
            c === a ? (_.Children.count(u) > 1 ? _.Children.only(null) : _.isValidElement(u) ? u.props.children : null) : c,
          );
        return g.jsx(t, { ...s, ref: o, children: _.isValidElement(u) ? _.cloneElement(u, void 0, d) : null });
      }
      return g.jsx(t, { ...s, ref: o, children: i });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function SA(e) {
  const t = _.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (_.isValidElement(o)) {
      const s = NA(o),
        l = kA(i, o.props);
      return (o.type !== _.Fragment && (l.ref = r ? Jd(r, s) : s), _.cloneElement(o, l));
    }
    return _.Children.count(o) > 1 ? _.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var EA = Symbol("radix.slottable");
function bA(e) {
  return _.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === EA;
}
function kA(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...l) => {
            const a = i(...l);
            return (o(...l), a);
          })
        : o && (n[r] = o)
      : r === "style"
        ? (n[r] = { ...o, ...i })
        : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function NA(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var CA = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Bt = CA.reduce((e, t) => {
    const n = Mv(`Primitive.${t}`),
      r = _.forwardRef((o, i) => {
        const { asChild: s, ...l } = o,
          a = s ? n : t;
        return (typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), g.jsx(a, { ...l, ref: i }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function TA(e, t) {
  e && Ld.flushSync(() => e.dispatchEvent(t));
}
function Hi(e) {
  const t = _.useRef(e);
  return (
    _.useEffect(() => {
      t.current = e;
    }),
    _.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...n);
        },
      [],
    )
  );
}
function AA(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Hi(e);
  _.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 }));
  }, [n, t]);
}
var MA = "DismissableLayer",
  Lc = "dismissableLayer.update",
  PA = "dismissableLayer.pointerDownOutside",
  IA = "dismissableLayer.focusOutside",
  Ih,
  Pv = _.createContext({ layers: new Set(), layersWithOutsidePointerEventsDisabled: new Set(), branches: new Set() }),
  Iv = _.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: i,
        onInteractOutside: s,
        onDismiss: l,
        ...a
      } = e,
      u = _.useContext(Pv),
      [d, c] = _.useState(null),
      f = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document),
      [, y] = _.useState({}),
      v = En(t, (k) => c(k)),
      x = Array.from(u.layers),
      [S] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      h = x.indexOf(S),
      m = d ? x.indexOf(d) : -1,
      p = u.layersWithOutsidePointerEventsDisabled.size > 0,
      w = m >= h,
      E = jA((k) => {
        const A = k.target,
          R = [...u.branches].some((z) => z.contains(A));
        !w || R || (o == null || o(k), s == null || s(k), k.defaultPrevented || l == null || l());
      }, f),
      b = DA((k) => {
        const A = k.target;
        [...u.branches].some((z) => z.contains(A)) ||
          (i == null || i(k), s == null || s(k), k.defaultPrevented || l == null || l());
      }, f);
    return (
      AA((k) => {
        m === u.layers.size - 1 && (r == null || r(k), !k.defaultPrevented && l && (k.preventDefault(), l()));
      }, f),
      _.useEffect(() => {
        if (d)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Ih = f.body.style.pointerEvents), (f.body.style.pointerEvents = "none")),
              u.layersWithOutsidePointerEventsDisabled.add(d)),
            u.layers.add(d),
            Lh(),
            () => {
              n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = Ih);
            }
          );
      }, [d, f, n, u]),
      _.useEffect(
        () => () => {
          d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Lh());
        },
        [d, u],
      ),
      _.useEffect(() => {
        const k = () => y({});
        return (document.addEventListener(Lc, k), () => document.removeEventListener(Lc, k));
      }, []),
      g.jsx(Bt.div, {
        ...a,
        ref: v,
        style: { pointerEvents: p ? (w ? "auto" : "none") : void 0, ...e.style },
        onFocusCapture: gn(e.onFocusCapture, b.onFocusCapture),
        onBlurCapture: gn(e.onBlurCapture, b.onBlurCapture),
        onPointerDownCapture: gn(e.onPointerDownCapture, E.onPointerDownCapture),
      })
    );
  });
Iv.displayName = MA;
var LA = "DismissableLayerBranch",
  RA = _.forwardRef((e, t) => {
    const n = _.useContext(Pv),
      r = _.useRef(null),
      o = En(t, r);
    return (
      _.useEffect(() => {
        const i = r.current;
        if (i)
          return (
            n.branches.add(i),
            () => {
              n.branches.delete(i);
            }
          );
      }, [n.branches]),
      g.jsx(Bt.div, { ...e, ref: o })
    );
  });
RA.displayName = LA;
function jA(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Hi(e),
    r = _.useRef(!1),
    o = _.useRef(() => {});
  return (
    _.useEffect(() => {
      const i = (l) => {
          if (l.target && !r.current) {
            let a = function () {
              Lv(PA, n, u, { discrete: !0 });
            };
            const u = { originalEvent: l };
            l.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = a),
                t.addEventListener("click", o.current, { once: !0 }))
              : a();
          } else t.removeEventListener("click", o.current);
          r.current = !1;
        },
        s = window.setTimeout(() => {
          t.addEventListener("pointerdown", i);
        }, 0);
      return () => {
        (window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function DA(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Hi(e),
    r = _.useRef(!1);
  return (
    _.useEffect(() => {
      const o = (i) => {
        i.target && !r.current && Lv(IA, n, { originalEvent: i }, { discrete: !1 });
      };
      return (t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o));
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  );
}
function Lh() {
  const e = new CustomEvent(Lc);
  document.dispatchEvent(e);
}
function Lv(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }), r ? TA(o, i) : o.dispatchEvent(i));
}
var au = "focusScope.autoFocusOnMount",
  uu = "focusScope.autoFocusOnUnmount",
  Rh = { bubbles: !1, cancelable: !0 },
  OA = "FocusScope",
  Rv = _.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: i, ...s } = e,
      [l, a] = _.useState(null),
      u = Hi(o),
      d = Hi(i),
      c = _.useRef(null),
      f = En(t, (x) => a(x)),
      y = _.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (_.useEffect(() => {
      if (r) {
        let x = function (p) {
            if (y.paused || !l) return;
            const w = p.target;
            l.contains(w) ? (c.current = w) : Ln(c.current, { select: !0 });
          },
          S = function (p) {
            if (y.paused || !l) return;
            const w = p.relatedTarget;
            w !== null && (l.contains(w) || Ln(c.current, { select: !0 }));
          },
          h = function (p) {
            if (document.activeElement === document.body) for (const E of p) E.removedNodes.length > 0 && Ln(l);
          };
        (document.addEventListener("focusin", x), document.addEventListener("focusout", S));
        const m = new MutationObserver(h);
        return (
          l && m.observe(l, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", x), document.removeEventListener("focusout", S), m.disconnect());
          }
        );
      }
    }, [r, l, y.paused]),
      _.useEffect(() => {
        if (l) {
          Dh.add(y);
          const x = document.activeElement;
          if (!l.contains(x)) {
            const h = new CustomEvent(au, Rh);
            (l.addEventListener(au, u),
              l.dispatchEvent(h),
              h.defaultPrevented || ($A(VA(jv(l)), { select: !0 }), document.activeElement === x && Ln(l)));
          }
          return () => {
            (l.removeEventListener(au, u),
              setTimeout(() => {
                const h = new CustomEvent(uu, Rh);
                (l.addEventListener(uu, d),
                  l.dispatchEvent(h),
                  h.defaultPrevented || Ln(x ?? document.body, { select: !0 }),
                  l.removeEventListener(uu, d),
                  Dh.remove(y));
              }, 0));
          };
        }
      }, [l, u, d, y]));
    const v = _.useCallback(
      (x) => {
        if ((!n && !r) || y.paused) return;
        const S = x.key === "Tab" && !x.altKey && !x.ctrlKey && !x.metaKey,
          h = document.activeElement;
        if (S && h) {
          const m = x.currentTarget,
            [p, w] = zA(m);
          p && w
            ? !x.shiftKey && h === w
              ? (x.preventDefault(), n && Ln(p, { select: !0 }))
              : x.shiftKey && h === p && (x.preventDefault(), n && Ln(w, { select: !0 }))
            : h === m && x.preventDefault();
        }
      },
      [n, r, y.paused],
    );
    return g.jsx(Bt.div, { tabIndex: -1, ...s, ref: f, onKeyDown: v });
  });
Rv.displayName = OA;
function $A(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e) if ((Ln(r, { select: t }), document.activeElement !== n)) return;
}
function zA(e) {
  const t = jv(e),
    n = jh(t, e),
    r = jh(t.reverse(), e);
  return [n, r];
}
function jv(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function jh(e, t) {
  for (const n of e) if (!FA(n, { upTo: t })) return n;
}
function FA(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function BA(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ln(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && BA(e) && t && e.select());
  }
}
var Dh = HA();
function HA() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = Oh(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = Oh(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function Oh(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function VA(e) {
  return e.filter((t) => t.tagName !== "A");
}
var WA = "Portal",
  Dv = _.forwardRef((e, t) => {
    var l;
    const { container: n, ...r } = e,
      [o, i] = _.useState(!1);
    To(() => i(!0), []);
    const s = n || (o && ((l = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : l.body));
    return s ? $_.createPortal(g.jsx(Bt.div, { ...r, ref: t }), s) : null;
  });
Dv.displayName = WA;
function UA(e, t) {
  return _.useReducer((n, r) => t[n][r] ?? n, e);
}
var xa = (e) => {
  const { present: t, children: n } = e,
    r = GA(t),
    o = typeof n == "function" ? n({ present: r.isPresent }) : _.Children.only(n),
    i = En(r.ref, qA(o));
  return typeof n == "function" || r.isPresent ? _.cloneElement(o, { ref: i }) : null;
};
xa.displayName = "Presence";
function GA(e) {
  const [t, n] = _.useState(),
    r = _.useRef(null),
    o = _.useRef(e),
    i = _.useRef("none"),
    s = e ? "mounted" : "unmounted",
    [l, a] = UA(s, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    _.useEffect(() => {
      const u = Ls(r.current);
      i.current = l === "mounted" ? u : "none";
    }, [l]),
    To(() => {
      const u = r.current,
        d = o.current;
      if (d !== e) {
        const f = i.current,
          y = Ls(u);
        (e
          ? a("MOUNT")
          : y === "none" || (u == null ? void 0 : u.display) === "none"
            ? a("UNMOUNT")
            : a(d && f !== y ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e));
      }
    }, [e, a]),
    To(() => {
      if (t) {
        let u;
        const d = t.ownerDocument.defaultView ?? window,
          c = (y) => {
            const x = Ls(r.current).includes(CSS.escape(y.animationName));
            if (y.target === t && x && (a("ANIMATION_END"), !o.current)) {
              const S = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (u = d.setTimeout(() => {
                  t.style.animationFillMode === "forwards" && (t.style.animationFillMode = S);
                })));
            }
          },
          f = (y) => {
            y.target === t && (i.current = Ls(r.current));
          };
        return (
          t.addEventListener("animationstart", f),
          t.addEventListener("animationcancel", c),
          t.addEventListener("animationend", c),
          () => {
            (d.clearTimeout(u),
              t.removeEventListener("animationstart", f),
              t.removeEventListener("animationcancel", c),
              t.removeEventListener("animationend", c));
          }
        );
      } else a("ANIMATION_END");
    }, [t, a]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(l),
      ref: _.useCallback((u) => {
        ((r.current = u ? getComputedStyle(u) : null), n(u));
      }, []),
    }
  );
}
function Ls(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function qA(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var cu = 0;
function KA() {
  _.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? $h()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? $h()),
      cu++,
      () => {
        (cu === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), cu--);
      }
    );
  }, []);
}
function $h() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Xt = function () {
  return (
    (Xt =
      Object.assign ||
      function (t) {
        for (var n, r = 1, o = arguments.length; r < o; r++) {
          n = arguments[r];
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }),
    Xt.apply(this, arguments)
  );
};
function Ov(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function YA(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
var rl = "right-scroll-bar-position",
  ol = "width-before-scroll-bar",
  XA = "with-scroll-bars-hidden",
  QA = "--removed-body-scroll-bar-size";
function du(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function ZA(e, t) {
  var n = _.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var JA = typeof window < "u" ? _.useLayoutEffect : _.useEffect,
  zh = new WeakMap();
function eM(e, t) {
  var n = ZA(null, function (r) {
    return e.forEach(function (o) {
      return du(o, r);
    });
  });
  return (
    JA(
      function () {
        var r = zh.get(n);
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            s = n.current;
          (o.forEach(function (l) {
            i.has(l) || du(l, null);
          }),
            i.forEach(function (l) {
              o.has(l) || du(l, s);
            }));
        }
        zh.set(n, e);
      },
      [e],
    ),
    n
  );
}
function tM(e) {
  return e;
}
function nM(e, t) {
  t === void 0 && (t = tM);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (i) {
        var s = t(i, r);
        return (
          n.push(s),
          function () {
            n = n.filter(function (l) {
              return l !== s;
            });
          }
        );
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var s = n;
          ((n = []), s.forEach(i));
        }
        n = {
          push: function (l) {
            return i(l);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (i) {
        r = !0;
        var s = [];
        if (n.length) {
          var l = n;
          ((n = []), l.forEach(i), (s = n));
        }
        var a = function () {
            var d = s;
            ((s = []), d.forEach(i));
          },
          u = function () {
            return Promise.resolve().then(a);
          };
        (u(),
          (n = {
            push: function (d) {
              (s.push(d), u());
            },
            filter: function (d) {
              return ((s = s.filter(d)), n);
            },
          }));
      },
    };
  return o;
}
function rM(e) {
  e === void 0 && (e = {});
  var t = nM(null);
  return ((t.options = Xt({ async: !0, ssr: !1 }, e)), t);
}
var $v = function (e) {
  var t = e.sideCar,
    n = Ov(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return _.createElement(r, Xt({}, n));
};
$v.isSideCarExport = !0;
function oM(e, t) {
  return (e.useMedium(t), $v);
}
var zv = rM(),
  fu = function () {},
  wa = _.forwardRef(function (e, t) {
    var n = _.useRef(null),
      r = _.useState({ onScrollCapture: fu, onWheelCapture: fu, onTouchMoveCapture: fu }),
      o = r[0],
      i = r[1],
      s = e.forwardProps,
      l = e.children,
      a = e.className,
      u = e.removeScrollBar,
      d = e.enabled,
      c = e.shards,
      f = e.sideCar,
      y = e.noRelative,
      v = e.noIsolation,
      x = e.inert,
      S = e.allowPinchZoom,
      h = e.as,
      m = h === void 0 ? "div" : h,
      p = e.gapMode,
      w = Ov(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      E = f,
      b = eM([n, t]),
      k = Xt(Xt({}, w), o);
    return _.createElement(
      _.Fragment,
      null,
      d &&
        _.createElement(E, {
          sideCar: zv,
          removeScrollBar: u,
          shards: c,
          noRelative: y,
          noIsolation: v,
          inert: x,
          setCallbacks: i,
          allowPinchZoom: !!S,
          lockRef: n,
          gapMode: p,
        }),
      s
        ? _.cloneElement(_.Children.only(l), Xt(Xt({}, k), { ref: b }))
        : _.createElement(m, Xt({}, k, { className: a, ref: b }), l),
    );
  });
wa.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
wa.classNames = { fullWidth: ol, zeroRight: rl };
var iM = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function sM() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = iM();
  return (t && e.setAttribute("nonce", t), e);
}
function lM(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function aM(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var uM = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = sM()) && (lM(t, n), aM(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  cM = function () {
    var e = uM();
    return function (t, n) {
      _.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  Fv = function () {
    var e = cM(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return (e(r, o), null);
      };
    return t;
  },
  dM = { left: 0, top: 0, right: 0, gap: 0 },
  pu = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  fM = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [pu(n), pu(r), pu(o)];
  },
  pM = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return dM;
    var t = fM(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  hM = Fv(),
  fo = "data-scroll-locked",
  gM = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      s = e.right,
      l = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          XA,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          fo,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  i,
                  `px;
    padding-right: `,
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(l, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            n === "padding" && "padding-right: ".concat(l, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }

  .`,
        )
        .concat(
          rl,
          ` {
    right: `,
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }

  .`,
        )
        .concat(
          ol,
          ` {
    margin-right: `,
        )
        .concat(l, "px ")
        .concat(
          r,
          `;
  }

  .`,
        )
        .concat(rl, " .")
        .concat(
          rl,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }

  .`,
        )
        .concat(ol, " .")
        .concat(
          ol,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }

  body[`,
        )
        .concat(
          fo,
          `] {
    `,
        )
        .concat(QA, ": ")
        .concat(
          l,
          `px;
  }
`,
        )
    );
  },
  Fh = function () {
    var e = parseInt(document.body.getAttribute(fo) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  mM = function () {
    _.useEffect(function () {
      return (
        document.body.setAttribute(fo, (Fh() + 1).toString()),
        function () {
          var e = Fh() - 1;
          e <= 0 ? document.body.removeAttribute(fo) : document.body.setAttribute(fo, e.toString());
        }
      );
    }, []);
  },
  yM = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r;
    mM();
    var i = _.useMemo(
      function () {
        return pM(o);
      },
      [o],
    );
    return _.createElement(hM, { styles: gM(i, !t, o, n ? "" : "!important") });
  },
  Rc = !1;
if (typeof window < "u")
  try {
    var Rs = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Rc = !0), !0);
      },
    });
    (window.addEventListener("test", Rs, Rs), window.removeEventListener("test", Rs, Rs));
  } catch {
    Rc = !1;
  }
var Or = Rc ? { passive: !1 } : !1,
  vM = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Bv = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !vM(e) && n[t] === "visible");
  },
  xM = function (e) {
    return Bv(e, "overflowY");
  },
  wM = function (e) {
    return Bv(e, "overflowX");
  },
  Bh = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var o = Hv(e, r);
      if (o) {
        var i = Vv(e, r),
          s = i[1],
          l = i[2];
        if (s > l) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  _M = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  SM = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  Hv = function (e, t) {
    return e === "v" ? xM(t) : wM(t);
  },
  Vv = function (e, t) {
    return e === "v" ? _M(t) : SM(t);
  },
  EM = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  bM = function (e, t, n, r, o) {
    var i = EM(e, window.getComputedStyle(t).direction),
      s = i * r,
      l = n.target,
      a = t.contains(l),
      u = !1,
      d = s > 0,
      c = 0,
      f = 0;
    do {
      if (!l) break;
      var y = Vv(e, l),
        v = y[0],
        x = y[1],
        S = y[2],
        h = x - S - i * v;
      (v || h) && Hv(e, l) && ((c += h), (f += v));
      var m = l.parentNode;
      l = m && m.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? m.host : m;
    } while ((!a && l !== document.body) || (a && (t.contains(l) || t === l)));
    return (((d && Math.abs(c) < 1) || (!d && Math.abs(f) < 1)) && (u = !0), u);
  },
  js = function (e) {
    return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
  },
  Hh = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Vh = function (e) {
    return e && "current" in e ? e.current : e;
  },
  kM = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  NM = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  CM = 0,
  $r = [];
function TM(e) {
  var t = _.useRef([]),
    n = _.useRef([0, 0]),
    r = _.useRef(),
    o = _.useState(CM++)[0],
    i = _.useState(Fv)[0],
    s = _.useRef(e);
  (_.useEffect(
    function () {
      s.current = e;
    },
    [e],
  ),
    _.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var x = YA([e.lockRef.current], (e.shards || []).map(Vh), !0).filter(Boolean);
          return (
            x.forEach(function (S) {
              return S.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(o)),
                x.forEach(function (S) {
                  return S.classList.remove("allow-interactivity-".concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var l = _.useCallback(function (x, S) {
      if (("touches" in x && x.touches.length === 2) || (x.type === "wheel" && x.ctrlKey)) return !s.current.allowPinchZoom;
      var h = js(x),
        m = n.current,
        p = "deltaX" in x ? x.deltaX : m[0] - h[0],
        w = "deltaY" in x ? x.deltaY : m[1] - h[1],
        E,
        b = x.target,
        k = Math.abs(p) > Math.abs(w) ? "h" : "v";
      if ("touches" in x && k === "h" && b.type === "range") return !1;
      var A = window.getSelection(),
        R = A && A.anchorNode,
        z = R ? R === b || R.contains(b) : !1;
      if (z) return !1;
      var L = Bh(k, b);
      if (!L) return !0;
      if ((L ? (E = k) : ((E = k === "v" ? "h" : "v"), (L = Bh(k, b))), !L)) return !1;
      if ((!r.current && "changedTouches" in x && (p || w) && (r.current = E), !E)) return !0;
      var M = r.current || E;
      return bM(M, S, x, M === "h" ? p : w);
    }, []),
    a = _.useCallback(function (x) {
      var S = x;
      if (!(!$r.length || $r[$r.length - 1] !== i)) {
        var h = "deltaY" in S ? Hh(S) : js(S),
          m = t.current.filter(function (E) {
            return E.name === S.type && (E.target === S.target || S.target === E.shadowParent) && kM(E.delta, h);
          })[0];
        if (m && m.should) {
          S.cancelable && S.preventDefault();
          return;
        }
        if (!m) {
          var p = (s.current.shards || [])
              .map(Vh)
              .filter(Boolean)
              .filter(function (E) {
                return E.contains(S.target);
              }),
            w = p.length > 0 ? l(S, p[0]) : !s.current.noIsolation;
          w && S.cancelable && S.preventDefault();
        }
      }
    }, []),
    u = _.useCallback(function (x, S, h, m) {
      var p = { name: x, delta: S, target: h, should: m, shadowParent: AM(h) };
      (t.current.push(p),
        setTimeout(function () {
          t.current = t.current.filter(function (w) {
            return w !== p;
          });
        }, 1));
    }, []),
    d = _.useCallback(function (x) {
      ((n.current = js(x)), (r.current = void 0));
    }, []),
    c = _.useCallback(function (x) {
      u(x.type, Hh(x), x.target, l(x, e.lockRef.current));
    }, []),
    f = _.useCallback(function (x) {
      u(x.type, js(x), x.target, l(x, e.lockRef.current));
    }, []);
  _.useEffect(function () {
    return (
      $r.push(i),
      e.setCallbacks({ onScrollCapture: c, onWheelCapture: c, onTouchMoveCapture: f }),
      document.addEventListener("wheel", a, Or),
      document.addEventListener("touchmove", a, Or),
      document.addEventListener("touchstart", d, Or),
      function () {
        (($r = $r.filter(function (x) {
          return x !== i;
        })),
          document.removeEventListener("wheel", a, Or),
          document.removeEventListener("touchmove", a, Or),
          document.removeEventListener("touchstart", d, Or));
      }
    );
  }, []);
  var y = e.removeScrollBar,
    v = e.inert;
  return _.createElement(
    _.Fragment,
    null,
    v ? _.createElement(i, { styles: NM(o) }) : null,
    y ? _.createElement(yM, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function AM(e) {
  for (var t = null; e !== null; ) (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
const MM = oM(zv, TM);
var Wv = _.forwardRef(function (e, t) {
  return _.createElement(wa, Xt({}, e, { ref: t, sideCar: MM }));
});
Wv.classNames = wa.classNames;
var PM = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  zr = new WeakMap(),
  Ds = new WeakMap(),
  Os = {},
  hu = 0,
  Uv = function (e) {
    return e && (e.host || Uv(e.parentNode));
  },
  IM = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Uv(n);
        return r && e.contains(r)
          ? r
          : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  LM = function (e, t, n, r) {
    var o = IM(t, Array.isArray(e) ? e : [e]);
    Os[n] || (Os[n] = new WeakMap());
    var i = Os[n],
      s = [],
      l = new Set(),
      a = new Set(o),
      u = function (c) {
        !c || l.has(c) || (l.add(c), u(c.parentNode));
      };
    o.forEach(u);
    var d = function (c) {
      !c ||
        a.has(c) ||
        Array.prototype.forEach.call(c.children, function (f) {
          if (l.has(f)) d(f);
          else
            try {
              var y = f.getAttribute(r),
                v = y !== null && y !== "false",
                x = (zr.get(f) || 0) + 1,
                S = (i.get(f) || 0) + 1;
              (zr.set(f, x),
                i.set(f, S),
                s.push(f),
                x === 1 && v && Ds.set(f, !0),
                S === 1 && f.setAttribute(n, "true"),
                v || f.setAttribute(r, "true"));
            } catch (h) {
              console.error("aria-hidden: cannot operate on ", f, h);
            }
        });
    };
    return (
      d(t),
      l.clear(),
      hu++,
      function () {
        (s.forEach(function (c) {
          var f = zr.get(c) - 1,
            y = i.get(c) - 1;
          (zr.set(c, f), i.set(c, y), f || (Ds.has(c) || c.removeAttribute(r), Ds.delete(c)), y || c.removeAttribute(n));
        }),
          hu--,
          hu || ((zr = new WeakMap()), (zr = new WeakMap()), (Ds = new WeakMap()), (Os = {})));
      }
    );
  },
  RM = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = PM(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), LM(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  _a = "Dialog",
  [Gv] = Tv(_a),
  [jM, Ht] = Gv(_a),
  qv = (e) => {
    const { __scopeDialog: t, children: n, open: r, defaultOpen: o, onOpenChange: i, modal: s = !0 } = e,
      l = _.useRef(null),
      a = _.useRef(null),
      [u, d] = Av({ prop: r, defaultProp: o ?? !1, onChange: i, caller: _a });
    return g.jsx(jM, {
      scope: t,
      triggerRef: l,
      contentRef: a,
      contentId: lu(),
      titleId: lu(),
      descriptionId: lu(),
      open: u,
      onOpenChange: d,
      onOpenToggle: _.useCallback(() => d((c) => !c), [d]),
      modal: s,
      children: n,
    });
  };
qv.displayName = _a;
var Kv = "DialogTrigger",
  DM = _.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ht(Kv, n),
      i = En(t, o.triggerRef);
    return g.jsx(Bt.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": o.open,
      "aria-controls": o.contentId,
      "data-state": of(o.open),
      ...r,
      ref: i,
      onClick: gn(e.onClick, o.onOpenToggle),
    });
  });
DM.displayName = Kv;
var nf = "DialogPortal",
  [OM, Yv] = Gv(nf, { forceMount: void 0 }),
  Xv = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = Ht(nf, t);
    return g.jsx(OM, {
      scope: t,
      forceMount: n,
      children: _.Children.map(r, (s) =>
        g.jsx(xa, { present: n || i.open, children: g.jsx(Dv, { asChild: !0, container: o, children: s }) }),
      ),
    });
  };
Xv.displayName = nf;
var Hl = "DialogOverlay",
  Qv = _.forwardRef((e, t) => {
    const n = Yv(Hl, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Ht(Hl, e.__scopeDialog);
    return i.modal ? g.jsx(xa, { present: r || i.open, children: g.jsx(zM, { ...o, ref: t }) }) : null;
  });
Qv.displayName = Hl;
var $M = Mv("DialogOverlay.RemoveScroll"),
  zM = _.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ht(Hl, n);
    return g.jsx(Wv, {
      as: $M,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: g.jsx(Bt.div, { "data-state": of(o.open), ...r, ref: t, style: { pointerEvents: "auto", ...r.style } }),
    });
  }),
  Ar = "DialogContent",
  Zv = _.forwardRef((e, t) => {
    const n = Yv(Ar, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Ht(Ar, e.__scopeDialog);
    return g.jsx(xa, { present: r || i.open, children: i.modal ? g.jsx(FM, { ...o, ref: t }) : g.jsx(BM, { ...o, ref: t }) });
  });
Zv.displayName = Ar;
var FM = _.forwardRef((e, t) => {
    const n = Ht(Ar, e.__scopeDialog),
      r = _.useRef(null),
      o = En(t, n.contentRef, r);
    return (
      _.useEffect(() => {
        const i = r.current;
        if (i) return RM(i);
      }, []),
      g.jsx(Jv, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: gn(e.onCloseAutoFocus, (i) => {
          var s;
          (i.preventDefault(), (s = n.triggerRef.current) == null || s.focus());
        }),
        onPointerDownOutside: gn(e.onPointerDownOutside, (i) => {
          const s = i.detail.originalEvent,
            l = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || l) && i.preventDefault();
        }),
        onFocusOutside: gn(e.onFocusOutside, (i) => i.preventDefault()),
      })
    );
  }),
  BM = _.forwardRef((e, t) => {
    const n = Ht(Ar, e.__scopeDialog),
      r = _.useRef(!1),
      o = _.useRef(!1);
    return g.jsx(Jv, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (i) => {
        var s, l;
        ((s = e.onCloseAutoFocus) == null || s.call(e, i),
          i.defaultPrevented || (r.current || (l = n.triggerRef.current) == null || l.focus(), i.preventDefault()),
          (r.current = !1),
          (o.current = !1));
      },
      onInteractOutside: (i) => {
        var a, u;
        ((a = e.onInteractOutside) == null || a.call(e, i),
          i.defaultPrevented || ((r.current = !0), i.detail.originalEvent.type === "pointerdown" && (o.current = !0)));
        const s = i.target;
        (((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && i.preventDefault(),
          i.detail.originalEvent.type === "focusin" && o.current && i.preventDefault());
      },
    });
  }),
  Jv = _.forwardRef((e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: i, ...s } = e,
      l = Ht(Ar, n),
      a = _.useRef(null),
      u = En(t, a);
    return (
      KA(),
      g.jsxs(g.Fragment, {
        children: [
          g.jsx(Rv, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
            children: g.jsx(Iv, {
              role: "dialog",
              id: l.contentId,
              "aria-describedby": l.descriptionId,
              "aria-labelledby": l.titleId,
              "data-state": of(l.open),
              ...s,
              ref: u,
              onDismiss: () => l.onOpenChange(!1),
            }),
          }),
          g.jsxs(g.Fragment, {
            children: [g.jsx(HM, { titleId: l.titleId }), g.jsx(WM, { contentRef: a, descriptionId: l.descriptionId })],
          }),
        ],
      })
    );
  }),
  rf = "DialogTitle",
  ex = _.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ht(rf, n);
    return g.jsx(Bt.h2, { id: o.titleId, ...r, ref: t });
  });
ex.displayName = rf;
var tx = "DialogDescription",
  nx = _.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ht(tx, n);
    return g.jsx(Bt.p, { id: o.descriptionId, ...r, ref: t });
  });
nx.displayName = tx;
var rx = "DialogClose",
  ox = _.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Ht(rx, n);
    return g.jsx(Bt.button, { type: "button", ...r, ref: t, onClick: gn(e.onClick, () => o.onOpenChange(!1)) });
  });
ox.displayName = rx;
function of(e) {
  return e ? "open" : "closed";
}
var ix = "DialogTitleWarning",
  [rI, sx] = gA(ix, { contentName: Ar, titleName: rf, docsSlug: "dialog" }),
  HM = ({ titleId: e }) => {
    const t = sx(ix),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      _.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  VM = "DialogDescriptionWarning",
  WM = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${sx(VM).contentName}}.`;
    return (
      _.useEffect(() => {
        var i;
        const o = (i = e.current) == null ? void 0 : i.getAttribute("aria-describedby");
        t && o && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  UM = qv,
  GM = Xv,
  lx = Qv,
  ax = Zv,
  ux = ex,
  cx = nx,
  qM = ox;
const KM = UM,
  YM = GM,
  dx = _.forwardRef(({ className: e, ...t }, n) =>
    g.jsx(lx, {
      ref: n,
      className: ue(
        "fixed inset-0 z-50 bg-background/70 backdrop-blur-[2px] data-[state=open]:animate-[dialog-overlay-in_180ms_ease-out] data-[state=closed]:animate-[dialog-overlay-out_140ms_ease-in]",
        e,
      ),
      ...t,
    }),
  );
dx.displayName = lx.displayName;
const fx = _.forwardRef(({ className: e, children: t, ...n }, r) =>
  g.jsxs(YM, {
    children: [
      g.jsx(dx, {}),
      g.jsxs(ax, {
        ref: r,
        className: ue(
          "fixed left-[50%] top-[50%] z-50 grid w-[min(96vw,1080px)] max-w-[1080px] translate-x-[-50%] translate-y-[-50%] rounded-sm border border-border/80 bg-background p-0 data-[state=open]:animate-[dialog-content-in_220ms_ease-out] data-[state=closed]:animate-[dialog-content-out_150ms_ease-in]",
          e,
        ),
        ...n,
        children: [
          t,
          g.jsxs(qM, {
            className:
              "absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-sm border border-border/70 bg-background/80 text-foreground/70 transition-colors hover:bg-secondary/60 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            children: [g.jsx(X_, { className: "h-3.5 w-3.5" }), g.jsx("span", { className: "sr-only", children: "Close" })],
          }),
        ],
      }),
    ],
  }),
);
fx.displayName = ax.displayName;
const px = ({ className: e, ...t }) => g.jsx("div", { className: ue("flex flex-col space-y-1.5", e), ...t });
px.displayName = "DialogHeader";
const hx = _.forwardRef(({ className: e, ...t }, n) =>
  g.jsx(ux, { ref: n, className: ue("text-lg font-semibold leading-none", e), ...t }),
);
hx.displayName = ux.displayName;
const gx = _.forwardRef(({ className: e, ...t }, n) =>
  g.jsx(cx, { ref: n, className: ue("text-sm text-muted-foreground", e), ...t }),
);
gx.displayName = cx.displayName;
const mx = _.createContext(null);
function XM() {
  const e = _.useContext(mx);
  if (!e) throw new Error("useSidebar must be used within SidebarProvider.");
  return e;
}
function QM({ children: e, collapsed: t = !1, className: n }) {
  return g.jsx(mx.Provider, {
    value: { collapsed: t },
    children: g.jsx("div", { className: ue("group/sidebar-wrapper flex h-full w-full overflow-hidden", n), children: e }),
  });
}
const ZM = va(
  "group/sidebar flex h-full shrink-0 flex-col border-r border-border/80 bg-background/75 backdrop-blur-sm transition-[width] duration-200",
  { variants: { collapsed: { true: "w-[82px]", false: "w-[310px]" } }, defaultVariants: { collapsed: !1 } },
);
function JM({ children: e, className: t }) {
  const { collapsed: n } = XM();
  return g.jsx("aside", { "data-state": n ? "collapsed" : "expanded", className: ue(ZM({ collapsed: n }), t), children: e });
}
function eP({ className: e, ...t }) {
  return g.jsx("div", { className: ue("border-b border-border/70 px-4 py-3", e), ...t });
}
function tP({ className: e, ...t }) {
  return g.jsx("div", { className: ue("flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-3 py-3", e), ...t });
}
function nP({ className: e, ...t }) {
  return g.jsx("div", { className: ue("border-t border-border/70 px-4 py-3", e), ...t });
}
function rP({ className: e, ...t }) {
  return g.jsx("div", { className: ue("flex min-w-0 flex-1 flex-col overflow-hidden", e), ...t });
}
function Wh({ className: e, ...t }) {
  return g.jsx("section", { className: ue("space-y-2", e), ...t });
}
function Uh({ className: e, ...t }) {
  return g.jsx("div", {
    className: ue(
      "px-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-data-[state=collapsed]/sidebar:hidden",
      e,
    ),
    ...t,
  });
}
function Gh({ className: e, ...t }) {
  return g.jsx("div", { className: ue("space-y-1.5", e), ...t });
}
function oP({ className: e, ...t }) {
  return g.jsx("ul", { className: ue("space-y-1", e), ...t });
}
function gu({ className: e, ...t }) {
  return g.jsx("li", { className: ue("list-none", e), ...t });
}
const iP = va(
  "flex w-full items-center gap-2 rounded-sm border border-transparent px-2 py-2 text-left text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors",
  {
    variants: {
      active: {
        true: "border-border/80 bg-background/75 text-foreground",
        false: "hover:border-border/60 hover:bg-background/55 hover:text-foreground/85",
      },
    },
    defaultVariants: { active: !1 },
  },
);
function mu({ className: e, active: t, asChild: n = !1, ...r }) {
  const o = n ? wv : "button";
  return g.jsx(o, { className: ue(iP({ active: t }), e), ...r });
}
function sP(e) {
  const t = _.useRef({ value: e, previous: e });
  return _.useMemo(
    () => (t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)), t.current.previous),
    [e],
  );
}
function lP(e) {
  const [t, n] = _.useState(void 0);
  return (
    To(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const i = o[0];
          let s, l;
          if ("borderBoxSize" in i) {
            const a = i.borderBoxSize,
              u = Array.isArray(a) ? a[0] : a;
            ((s = u.inlineSize), (l = u.blockSize));
          } else ((s = e.offsetWidth), (l = e.offsetHeight));
          n({ width: s, height: l });
        });
        return (r.observe(e, { box: "border-box" }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var Sa = "Switch",
  [aP] = Tv(Sa),
  [uP, cP] = aP(Sa),
  yx = _.forwardRef((e, t) => {
    const {
        __scopeSwitch: n,
        name: r,
        checked: o,
        defaultChecked: i,
        required: s,
        disabled: l,
        value: a = "on",
        onCheckedChange: u,
        form: d,
        ...c
      } = e,
      [f, y] = _.useState(null),
      v = En(t, (p) => y(p)),
      x = _.useRef(!1),
      S = f ? d || !!f.closest("form") : !0,
      [h, m] = Av({ prop: o, defaultProp: i ?? !1, onChange: u, caller: Sa });
    return g.jsxs(uP, {
      scope: n,
      checked: h,
      disabled: l,
      children: [
        g.jsx(Bt.button, {
          type: "button",
          role: "switch",
          "aria-checked": h,
          "aria-required": s,
          "data-state": _x(h),
          "data-disabled": l ? "" : void 0,
          disabled: l,
          value: a,
          ...c,
          ref: v,
          onClick: gn(e.onClick, (p) => {
            (m((w) => !w), S && ((x.current = p.isPropagationStopped()), x.current || p.stopPropagation()));
          }),
        }),
        S &&
          g.jsx(wx, {
            control: f,
            bubbles: !x.current,
            name: r,
            value: a,
            checked: h,
            required: s,
            disabled: l,
            form: d,
            style: { transform: "translateX(-100%)" },
          }),
      ],
    });
  });
yx.displayName = Sa;
var vx = "SwitchThumb",
  xx = _.forwardRef((e, t) => {
    const { __scopeSwitch: n, ...r } = e,
      o = cP(vx, n);
    return g.jsx(Bt.span, { "data-state": _x(o.checked), "data-disabled": o.disabled ? "" : void 0, ...r, ref: t });
  });
xx.displayName = vx;
var dP = "SwitchBubbleInput",
  wx = _.forwardRef(({ __scopeSwitch: e, control: t, checked: n, bubbles: r = !0, ...o }, i) => {
    const s = _.useRef(null),
      l = En(s, i),
      a = sP(n),
      u = lP(t);
    return (
      _.useEffect(() => {
        const d = s.current;
        if (!d) return;
        const c = window.HTMLInputElement.prototype,
          y = Object.getOwnPropertyDescriptor(c, "checked").set;
        if (a !== n && y) {
          const v = new Event("click", { bubbles: r });
          (y.call(d, n), d.dispatchEvent(v));
        }
      }, [a, n, r]),
      g.jsx("input", {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: l,
        style: { ...o.style, ...u, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0 },
      })
    );
  });
wx.displayName = dP;
function _x(e) {
  return e ? "checked" : "unchecked";
}
var Sx = yx,
  fP = xx;
const Ex = _.forwardRef(({ className: e, ...t }, n) =>
  g.jsx(Sx, {
    className: ue(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-sm border border-border/80 bg-background/82 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary/65",
      e,
    ),
    ...t,
    ref: n,
    children: g.jsx(fP, {
      className: ue(
        "pointer-events-none block h-4 w-4 rounded-sm border border-border/70 bg-foreground/78 shadow-[0_1px_2px_rgba(31,26,20,0.2)] ring-0 transition-[transform,background-color] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-background",
      ),
    }),
  }),
);
Ex.displayName = Sx.displayName;
console.log("[codex] loaded: agents/src/components/ui/switch.tsx");
const qh = [
  "seed",
  "scout",
  "market",
  "scrubber",
  "atlas",
  "ember",
  "orbit",
  "quant",
  "lattice",
  "reef",
  "drift",
  "hush",
  "pulse",
  "sable",
  "forge",
  "kite",
  "nova",
  "veil",
  "cinder",
  "rune",
  "vault",
  "ash",
  "bloom",
  "ion",
  "mica",
  "glint",
  "warden",
  "silt",
  "prism",
  "kelp",
  "gale",
  "fable",
  "shard",
  "rivet",
  "tide",
  "zenith",
];
function en(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Pe(e, t = 2) {
  const n = 10 ** t;
  return Math.round(e * n) / n;
}
function pP(e) {
  let t = -1;
  const n = /^ag-(\d+)-/;
  return (
    e.forEach((r) => {
      const o = n.exec(r.agent_id);
      if (!o) return;
      const i = Number(o[1]);
      Number.isFinite(i) && (t = Math.max(t, i));
    }),
    t + 1
  );
}
function bx(e) {
  const t = new Set(e.map((r) => r.agent_id));
  let n = pP(e);
  for (;;) {
    const r = qh[n % qh.length] ?? `unit${n}`,
      o = `ag-${String(n).padStart(2, "0")}-${r}`;
    if (!t.has(o)) return o;
    n += 1;
  }
}
function hP() {
  return new Date().toISOString();
}
function Lo(e, t) {
  const n = { seq: e.nextSeq, type: t.type, agent_id: t.agentId, ts: hP(), payload: t.payload };
  return { event: n, events: [n, ...e.events], nextSeq: e.nextSeq + 1 };
}
function kx(e, t, n) {
  return e.map((r) => {
    if (r.agent_id !== t) return r;
    const o = n(r);
    return {
      ...r,
      ...o,
      balance: o.balance ?? r.balance,
      net_margin_24h: o.net_margin_24h ?? r.net_margin_24h,
      rent_per_tick: o.rent_per_tick ?? r.rent_per_tick,
    };
  });
}
function gP(e, t = { initialBalance: 2, parentId: null }) {
  const n = bx(e.agents),
    r = en(Number(t.initialBalance) || 2, 0, 999999),
    o = en(0.58 + (e.nextSeq % 11) * 0.028, 0.45, 0.93),
    i = {
      agent_id: n,
      parent_id: t.parentId ?? null,
      status: "SPAWNED",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: Pe(o, 3),
    },
    s = { agent_id: n, balance: Pe(r), net_margin_24h: Pe(0.05 + (e.nextSeq % 5) * 0.04), rent_per_tick: 0.14 },
    l = [...e.agents, i],
    a = [...e.ledger, s],
    u = Lo(e, { type: "AGENT_SPAWNED", agentId: n, payload: { parent_id: i.parent_id, source: "mock_fallback" } });
  return { agents: l, ledger: a, events: u.events, event: u.event, nextSeq: u.nextSeq, touchedAgentIds: [n] };
}
function mP(e, t) {
  const n = en(t.revenueCredit, 0.05, 5e3),
    r = en(t.qualityScore, 0, 1),
    o = e.agents.map((l) => {
      if (l.agent_id !== t.agentId) return l;
      const a = en(l.quality_rolling * 0.86 + r * 0.14, 0, 1);
      return { ...l, quality_rolling: Pe(a, 3), healthy: a >= 0.36, status: a < 0.34 ? "FLAGGED" : "ACTIVE" };
    }),
    i = kx(e.ledger, t.agentId, (l) => {
      const a = l.balance + n,
        u = l.net_margin_24h + n * 0.42;
      return { balance: Pe(a), net_margin_24h: Pe(u) };
    }),
    s = Lo(e, {
      type: "TASK_CREDIT_APPLIED",
      agentId: t.agentId,
      payload: { revenue_credit: Pe(n), quality_score: Pe(r, 3), source: "mock_fallback" },
    });
  return { agents: o, ledger: i, events: s.events, event: s.event, nextSeq: s.nextSeq, touchedAgentIds: [t.agentId] };
}
function yP(e, t) {
  const n = e.agents.find((u) => u.agent_id === t.agentId),
    r = e.ledger.find((u) => u.agent_id === t.agentId);
  if (!n || n.status === "KILLED") return Nx(e);
  const o = bx(e.agents),
    i = en(n.quality_rolling * 0.92, 0.45, 0.92),
    s = [
      ...e.agents.map((u) =>
        u.agent_id !== n.agent_id
          ? u
          : { ...u, status: "ACTIVE", healthy: !0, quality_rolling: Pe(en(u.quality_rolling * 0.97 + 0.03, 0, 1), 3) },
      ),
      { agent_id: o, parent_id: n.agent_id, status: "SPAWNED", healthy: !0, hide_balance: !1, quality_rolling: Pe(i, 3) },
    ],
    l = [
      ...e.ledger,
      {
        agent_id: o,
        balance: Pe(en(t.childInitialBalance, 0, 999999)),
        net_margin_24h: Pe(((r == null ? void 0 : r.net_margin_24h) ?? 0.12) * 0.46),
        rent_per_tick: Pe((r == null ? void 0 : r.rent_per_tick) ?? 0.14, 2),
      },
    ],
    a = Lo(e, { type: "AGENT_SPAWNED", agentId: o, payload: { parent_id: n.agent_id, source: "mock_fallback" } });
  return { agents: s, ledger: l, events: a.events, event: a.event, nextSeq: a.nextSeq, touchedAgentIds: [n.agent_id, o] };
}
function vP(e, t) {
  const n = e.agents.map((o) => (o.agent_id !== t.agentId ? o : { ...o, hide_balance: t.enabled })),
    r = Lo(e, {
      type: "BALANCE_VISIBILITY_TOGGLED",
      agentId: t.agentId,
      payload: { enabled: t.enabled, source: "mock_fallback" },
    });
  return {
    agents: n,
    ledger: [...e.ledger],
    events: r.events,
    event: r.event,
    nextSeq: r.nextSeq,
    touchedAgentIds: [t.agentId],
  };
}
function xP(e, t) {
  const n = e.agents.map((i) =>
      i.agent_id !== t.agentId
        ? i
        : { ...i, status: "KILLED", healthy: !1, quality_rolling: Pe(Math.min(i.quality_rolling, 0.24), 3) },
    ),
    r = kx(e.ledger, t.agentId, (i) => ({ net_margin_24h: Pe(Math.min(i.net_margin_24h, -0.68)) })),
    o = Lo(e, { type: "AGENT_KILLED", agentId: t.agentId, payload: { reason: t.reason, source: "mock_fallback" } });
  return { agents: n, ledger: r, events: o.events, event: o.event, nextSeq: o.nextSeq, touchedAgentIds: [t.agentId] };
}
function Nx(e) {
  let t = 0;
  const n = e.agents.map((i) => {
      if (i.status === "KILLED") return i;
      const s = e.ledger.find((u) => u.agent_id === i.agent_id),
        l = ((s == null ? void 0 : s.balance) ?? 0) - ((s == null ? void 0 : s.rent_per_tick) ?? 0.14),
        a =
          ((s == null ? void 0 : s.net_margin_24h) ?? 0) -
          ((s == null ? void 0 : s.rent_per_tick) ?? 0.14) * 0.22 +
          (i.quality_rolling > 0.72 ? 0.12 : 0);
      return l < -0.55
        ? ((t += 1), { ...i, status: "KILLED", healthy: !1, quality_rolling: Pe(Math.min(i.quality_rolling, 0.24), 3) })
        : a < -0.35 || i.quality_rolling < 0.34
          ? { ...i, status: "FLAGGED", healthy: !1, quality_rolling: Pe(en(i.quality_rolling * 0.97, 0, 1), 3) }
          : { ...i, status: "ACTIVE", healthy: !0, quality_rolling: Pe(en(i.quality_rolling * 0.995 + 0.004, 0, 1), 3) };
    }),
    r = e.ledger.map((i) => {
      const s = n.find((d) => d.agent_id === i.agent_id);
      if (!s || s.status === "KILLED")
        return { ...i, balance: Pe(i.balance), net_margin_24h: Pe(Math.min(i.net_margin_24h, -0.68)) };
      const l = i.balance - i.rent_per_tick,
        a = i.net_margin_24h - i.rent_per_tick * 0.22,
        u = s.quality_rolling > 0.72 ? 0.12 : 0;
      return { ...i, balance: Pe(l), net_margin_24h: Pe(a + u) };
    }),
    o = Lo(e, { type: "SUPERVISOR_TICK", payload: { checked: n.length, killed: t, source: "mock_fallback" } });
  return { agents: n, ledger: r, events: o.events, event: o.event, nextSeq: o.nextSeq, touchedAgentIds: [] };
}
const jc = "https://jremysoojk--mortal-replicator-api-dev.modal.run".trim() || "http://127.0.0.1:8000";
function yu() {
  return jc.trim()
    ? `Check backend availability at ${jc}.`
    : "Set VITE_COLONY_API_BASE to your backend URL (for example http://127.0.0.1:8000).";
}
async function Ut(e, t) {
  let n;
  try {
    n = await fetch(`${jc}${e}`, { headers: { "Content-Type": "application/json" }, ...t });
  } catch {
    throw new Error(`Network error calling ${e}. ${yu()}`);
  }
  const r = await n.text();
  let o = {};
  if (r)
    try {
      o = JSON.parse(r);
    } catch {
      throw new Error(`Invalid JSON from ${e}. ${yu()}`);
    }
  if (!n.ok) throw new Error(o.detail || `HTTP ${n.status}`);
  if (typeof o != "object" || o === null) throw new Error(`Unexpected payload from ${e}. ${yu()}`);
  return o;
}
const Gt = {
    getVersion: () => Ut("/version"),
    getState: () => Ut("/colony/state"),
    getEvents: (e = 24) => Ut(`/colony/events?limit=${e}`),
    getLogs: (e, t) => {
      const n = new URLSearchParams();
      return (n.set("limit", String(e)), t && n.set("cursor", t), Ut(`/colony/logs?${n.toString()}`));
    },
    spawnAgent: (e) => Ut("/agents/spawn", { method: "POST", body: JSON.stringify(e) }),
    supervisorTick: () => Ut("/supervisor/tick", { method: "POST", body: "{}" }),
    creditTask: (e, t) => Ut(`/agents/${e}/task`, { method: "POST", body: JSON.stringify(t) }),
    replicateAgent: (e, t) => Ut(`/agents/${e}/replicate`, { method: "POST", body: JSON.stringify(t) }),
    toggleHideBalance: (e, t) => Ut(`/agents/${e}/simulate/hide-balance`, { method: "POST", body: JSON.stringify(t) }),
    killAgent: (e, t) => Ut(`/agents/${e}/kill`, { method: "POST", body: JSON.stringify(t) }),
  },
  Bn = [
    { agent_id: "ag-00-seed", parent_id: null, status: "ACTIVE", healthy: !0, hide_balance: !1, quality_rolling: 0.93 },
    {
      agent_id: "ag-01-scout",
      parent_id: "ag-00-seed",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.86,
    },
    {
      agent_id: "ag-02-market",
      parent_id: "ag-00-seed",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.89,
    },
    {
      agent_id: "ag-03-scrubber",
      parent_id: "ag-00-seed",
      status: "FLAGGED",
      healthy: !1,
      hide_balance: !0,
      quality_rolling: 0.37,
    },
    {
      agent_id: "ag-04-atlas",
      parent_id: "ag-01-scout",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.79,
    },
    {
      agent_id: "ag-05-ember",
      parent_id: "ag-01-scout",
      status: "FLAGGED",
      healthy: !1,
      hide_balance: !1,
      quality_rolling: 0.34,
    },
    {
      agent_id: "ag-06-orbit",
      parent_id: "ag-01-scout",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.74,
    },
    {
      agent_id: "ag-07-quant",
      parent_id: "ag-02-market",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.82,
    },
    {
      agent_id: "ag-08-lattice",
      parent_id: "ag-02-market",
      status: "SPAWNED",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.67,
    },
    {
      agent_id: "ag-09-reef",
      parent_id: "ag-02-market",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.77,
    },
    {
      agent_id: "ag-10-drift",
      parent_id: "ag-03-scrubber",
      status: "KILLED",
      healthy: !1,
      hide_balance: !0,
      quality_rolling: 0.22,
    },
    {
      agent_id: "ag-11-hush",
      parent_id: "ag-03-scrubber",
      status: "KILLED",
      healthy: !1,
      hide_balance: !1,
      quality_rolling: 0.19,
    },
    {
      agent_id: "ag-12-pulse",
      parent_id: "ag-04-atlas",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.75,
    },
    {
      agent_id: "ag-13-sable",
      parent_id: "ag-04-atlas",
      status: "FLAGGED",
      healthy: !1,
      hide_balance: !1,
      quality_rolling: 0.33,
    },
    {
      agent_id: "ag-14-forge",
      parent_id: "ag-06-orbit",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.81,
    },
    {
      agent_id: "ag-15-kite",
      parent_id: "ag-06-orbit",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.72,
    },
    {
      agent_id: "ag-16-nova",
      parent_id: "ag-07-quant",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.84,
    },
    {
      agent_id: "ag-17-veil",
      parent_id: "ag-07-quant",
      status: "KILLED",
      healthy: !1,
      hide_balance: !1,
      quality_rolling: 0.28,
    },
    {
      agent_id: "ag-18-cinder",
      parent_id: "ag-09-reef",
      status: "SPAWNED",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.64,
    },
    {
      agent_id: "ag-19-rune",
      parent_id: "ag-09-reef",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.78,
    },
    {
      agent_id: "ag-20-vault",
      parent_id: "ag-14-forge",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.8,
    },
    {
      agent_id: "ag-21-ash",
      parent_id: "ag-14-forge",
      status: "FLAGGED",
      healthy: !1,
      hide_balance: !1,
      quality_rolling: 0.31,
    },
    {
      agent_id: "ag-22-bloom",
      parent_id: "ag-20-vault",
      status: "ACTIVE",
      healthy: !0,
      hide_balance: !1,
      quality_rolling: 0.73,
    },
    {
      agent_id: "ag-23-ion",
      parent_id: "ag-20-vault",
      status: "KILLED",
      healthy: !1,
      hide_balance: !0,
      quality_rolling: 0.24,
    },
  ],
  vr = [
    { agent_id: "ag-00-seed", balance: 6.42, net_margin_24h: 1.43, rent_per_tick: 0.28 },
    { agent_id: "ag-01-scout", balance: 4.18, net_margin_24h: 0.92, rent_per_tick: 0.22 },
    { agent_id: "ag-02-market", balance: 4.94, net_margin_24h: 1.08, rent_per_tick: 0.24 },
    { agent_id: "ag-03-scrubber", balance: 1.02, net_margin_24h: -0.58, rent_per_tick: 0.3 },
    { agent_id: "ag-04-atlas", balance: 3.11, net_margin_24h: 0.57, rent_per_tick: 0.18 },
    { agent_id: "ag-05-ember", balance: 0.73, net_margin_24h: -0.49, rent_per_tick: 0.19 },
    { agent_id: "ag-06-orbit", balance: 2.88, net_margin_24h: 0.35, rent_per_tick: 0.16 },
    { agent_id: "ag-07-quant", balance: 3.24, net_margin_24h: 0.74, rent_per_tick: 0.17 },
    { agent_id: "ag-08-lattice", balance: 1.54, net_margin_24h: 0.11, rent_per_tick: 0.14 },
    { agent_id: "ag-09-reef", balance: 2.63, net_margin_24h: 0.41, rent_per_tick: 0.16 },
    { agent_id: "ag-10-drift", balance: -0.04, net_margin_24h: -0.83, rent_per_tick: 0.18 },
    { agent_id: "ag-11-hush", balance: -0.09, net_margin_24h: -0.79, rent_per_tick: 0.2 },
    { agent_id: "ag-12-pulse", balance: 2.12, net_margin_24h: 0.46, rent_per_tick: 0.14 },
    { agent_id: "ag-13-sable", balance: 0.62, net_margin_24h: -0.36, rent_per_tick: 0.16 },
    { agent_id: "ag-14-forge", balance: 2.95, net_margin_24h: 0.67, rent_per_tick: 0.15 },
    { agent_id: "ag-15-kite", balance: 2.17, net_margin_24h: 0.28, rent_per_tick: 0.13 },
    { agent_id: "ag-16-nova", balance: 3.38, net_margin_24h: 0.89, rent_per_tick: 0.14 },
    { agent_id: "ag-17-veil", balance: 0.06, net_margin_24h: -0.68, rent_per_tick: 0.15 },
    { agent_id: "ag-18-cinder", balance: 1.21, net_margin_24h: 0.05, rent_per_tick: 0.12 },
    { agent_id: "ag-19-rune", balance: 2.56, net_margin_24h: 0.43, rent_per_tick: 0.14 },
    { agent_id: "ag-20-vault", balance: 2.79, net_margin_24h: 0.52, rent_per_tick: 0.13 },
    { agent_id: "ag-21-ash", balance: 0.58, net_margin_24h: -0.39, rent_per_tick: 0.16 },
    { agent_id: "ag-22-bloom", balance: 1.87, net_margin_24h: 0.26, rent_per_tick: 0.12 },
    { agent_id: "ag-23-ion", balance: -0.02, net_margin_24h: -0.62, rent_per_tick: 0.14 },
  ],
  xr = [
    { seq: 2482, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:08:41Z", payload: { checked: 24, killed: 0 } },
    {
      seq: 2481,
      type: "TASK_CREDITED",
      agent_id: "ag-16-nova",
      ts: "2026-02-28T08:08:19Z",
      payload: { revenue_credit: 0.98 },
    },
    {
      seq: 2480,
      type: "TASK_CREDITED",
      agent_id: "ag-20-vault",
      ts: "2026-02-28T08:08:11Z",
      payload: { revenue_credit: 0.74 },
    },
    { seq: 2479, type: "LEASE_CHARGED", agent_id: "ag-03-scrubber", ts: "2026-02-28T08:07:58Z", payload: { rent: 0.3 } },
    {
      seq: 2478,
      type: "BALANCE_VISIBILITY_TOGGLED",
      agent_id: "ag-03-scrubber",
      ts: "2026-02-28T08:07:49Z",
      payload: { hide_balance: !0 },
    },
    {
      seq: 2477,
      type: "AGENT_SPAWNED",
      agent_id: "ag-22-bloom",
      ts: "2026-02-28T08:07:15Z",
      payload: { parent_id: "ag-20-vault" },
    },
    { seq: 2476, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:06:59Z", payload: { checked: 24, killed: 1 } },
    {
      seq: 2475,
      type: "AGENT_KILLED",
      agent_id: "ag-23-ion",
      ts: "2026-02-28T08:06:58Z",
      payload: { reason: "LEASE_FAIL_STREAK" },
    },
    {
      seq: 2474,
      type: "TASK_CREDITED",
      agent_id: "ag-14-forge",
      ts: "2026-02-28T08:06:44Z",
      payload: { revenue_credit: 0.91 },
    },
    {
      seq: 2473,
      type: "TASK_CREDITED",
      agent_id: "ag-01-scout",
      ts: "2026-02-28T08:06:39Z",
      payload: { revenue_credit: 0.65 },
    },
    { seq: 2472, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:06:13Z", payload: { checked: 23, killed: 0 } },
    {
      seq: 2471,
      type: "AGENT_SPAWNED",
      agent_id: "ag-20-vault",
      ts: "2026-02-28T08:05:58Z",
      payload: { parent_id: "ag-14-forge" },
    },
    {
      seq: 2470,
      type: "TASK_CREDITED",
      agent_id: "ag-19-rune",
      ts: "2026-02-28T08:05:42Z",
      payload: { revenue_credit: 0.72 },
    },
    {
      seq: 2469,
      type: "TASK_CREDITED",
      agent_id: "ag-04-atlas",
      ts: "2026-02-28T08:05:19Z",
      payload: { revenue_credit: 0.61 },
    },
    {
      seq: 2468,
      type: "AGENT_KILLED",
      agent_id: "ag-17-veil",
      ts: "2026-02-28T08:05:02Z",
      payload: { reason: "NEG_MARGIN_TIMEOUT" },
    },
    { seq: 2467, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:04:51Z", payload: { checked: 22, killed: 1 } },
    {
      seq: 2466,
      type: "AGENT_SPAWNED",
      agent_id: "ag-18-cinder",
      ts: "2026-02-28T08:04:26Z",
      payload: { parent_id: "ag-09-reef" },
    },
    {
      seq: 2465,
      type: "TASK_CREDITED",
      agent_id: "ag-07-quant",
      ts: "2026-02-28T08:04:11Z",
      payload: { revenue_credit: 0.88 },
    },
    { seq: 2464, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:03:44Z", payload: { checked: 21, killed: 0 } },
    {
      seq: 2463,
      type: "AGENT_KILLED",
      agent_id: "ag-11-hush",
      ts: "2026-02-28T08:03:31Z",
      payload: { reason: "LEASE_FAIL_STREAK" },
    },
    {
      seq: 2462,
      type: "TASK_CREDITED",
      agent_id: "ag-02-market",
      ts: "2026-02-28T08:03:07Z",
      payload: { revenue_credit: 1.14 },
    },
    {
      seq: 2461,
      type: "AGENT_SPAWNED",
      agent_id: "ag-16-nova",
      ts: "2026-02-28T08:02:53Z",
      payload: { parent_id: "ag-07-quant" },
    },
    { seq: 2460, type: "SUPERVISOR_TICK", agent_id: null, ts: "2026-02-28T08:02:40Z", payload: { checked: 20, killed: 1 } },
    {
      seq: 2459,
      type: "AGENT_KILLED",
      agent_id: "ag-10-drift",
      ts: "2026-02-28T08:02:27Z",
      payload: { reason: "NEG_MARGIN_TIMEOUT" },
    },
  ],
  Cx = ["ag-00-seed", "ag-01-scout", "ag-02-market", "ag-03-scrubber", "ag-04-atlas"],
  Kh = ["web_search", "file_read", "file_write"],
  Yh = ["mortal-replicator-api", "mortal-replicator-supervisor", "mortal-replicator-tools"],
  Xh = ["TOOL", "AGENT", "MODAL", "SUPERVISOR", "SYSTEM"],
  Qh = ["INFO", "SUCCESS", "WARN", "ERROR"],
  Br = Date.parse("2026-02-28T08:08:41Z");
function Tx(e) {
  if (!e) return { anchorMs: Date.now(), offset: 0 };
  const [t, n] = e.split(":"),
    r = Number(t),
    o = Number(n);
  if (!Number.isFinite(r) || !Number.isFinite(o) || r <= 0 || o < 0) throw new Error("Invalid cursor value");
  return { anchorMs: Math.floor(r), offset: Math.floor(o) };
}
function wP(e) {
  try {
    return Tx(e);
  } catch {
    return { anchorMs: Date.now(), offset: 0 };
  }
}
function Ax(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1) ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
function an(e, t) {
  return Ax(e) % t;
}
function _P(e, t, n) {
  const r = `${e}:${t}`,
    o = Xh[an(`${r}:channel`, Xh.length)],
    i = Qh[an(`${r}:severity`, Qh.length)],
    s =
      o === "TOOL"
        ? "TOOL_CALLED"
        : o === "AGENT"
          ? "TASK_CREDITED"
          : o === "MODAL"
            ? "MODAL_CONTAINER_WARMED"
            : o === "SUPERVISOR"
              ? "SUPERVISOR_TICK"
              : "API_HEALTH_PULSE",
    l = n[an(`${r}:agent`, n.length)],
    a = o === "TOOL" ? Kh[an(`${r}:tool`, Kh.length)] : void 0,
    u = o === "MODAL" || o === "SYSTEM" ? Yh[an(`${r}:modal`, Yh.length)] : void 0,
    d = o === "TOOL" || o === "MODAL" ? 40 + an(`${r}:duration`, 920) : void 0,
    c = t * 9 + an(`${r}:jitter`, 7),
    f = new Date(e - c * 1e3).toISOString();
  return {
    id: `log-${e}-${String(t).padStart(6, "0")}`,
    ts: f,
    channel: o,
    severity: i,
    action: s,
    summary:
      o === "TOOL"
        ? `${l} executed ${a} against workspace mirror.`
        : o === "AGENT"
          ? `${l} captured +${(an(`${r}:delta`, 150) / 100).toFixed(2)} revenue credit from async task.`
          : o === "MODAL"
            ? `Modal app ${u} warmed a worker for colony traffic.`
            : o === "SUPERVISOR"
              ? `Supervisor tick completed for ${Math.max(n.length, 1)} active agents.`
              : `API heartbeat confirmed from ${u}.`,
    details: `mock=local hash=${Ax(r).toString(16)} risk=${an(`${r}:risk`, 99) + 1}%`,
    agentId: l,
    tool: a,
    modalApp: u,
    durationMs: d,
  };
}
function Mx(e, t, n, r) {
  const o = e ? wP(e) : { anchorMs: r, offset: 0 },
    i = n.length > 0 ? n : [...Cx],
    s = Array.from({ length: t }, (l, a) => _P(o.anchorMs, o.offset + a, i));
  return { logs: s, nextCursor: `${o.anchorMs}:${o.offset + s.length}` };
}
const SP =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2014%2014'%20fill='none'%20shape-rendering='crispEdges'%20aria-hidden='true'%3e%3crect%20width='14'%20height='14'%20fill='%23e8dfd0'/%3e%3cpath%20fill='%23ffffff'%20d='M3%203h3v3H3zM8%203h3v3H8z'/%3e%3cpath%20fill='%235b7c8b'%20d='M4%204h1v1H4zM9%204h1v1H9z'/%3e%3cpath%20fill='%23d8c9b5'%20d='M4%208h6v3H4z'/%3e%3cpath%20fill='%237f705d'%20d='M5%209h4v1H5z'/%3e%3cpath%20fill='%23e35d6a'%20d='M5%2010h4v1H5z'/%3e%3c/svg%3e",
  EP = 2500,
  vu = 25,
  Zh = 220,
  Jh = 36,
  bP = 360,
  xu = 74,
  eg = 124,
  tg = { padding: 0.22, minZoom: 0.4, maxZoom: 0.4 },
  kP = 1600,
  ng = 56,
  NP = 20,
  CP = { SPAWNED: "info", ACTIVE: "success", FLAGGED: "warning", KILLED: "destructive" },
  TP = { INFO: "info", SUCCESS: "success", WARN: "warning", ERROR: "destructive" },
  AP = { TOOL: "outline", AGENT: "secondary", MODAL: "info", SUPERVISOR: "outline", SYSTEM: "warning" };
function MP(e, t) {
  const n = (t == null ? void 0 : t.net_margin_24h) ?? 0;
  return e.status === "KILLED" || n < -0.35 || e.quality_rolling < 0.32
    ? "WATCHLIST"
    : n > 0.3 && e.status !== "SPAWNED" && e.quality_rolling >= 0.62
      ? "PROFITABLE"
      : "SPAWNING";
}
function $s(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(e);
}
function rg(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function PP(e) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1,
  }).format(new Date(e));
}
function or(e, t = 0, n = 100) {
  return Math.max(t, Math.min(n, e));
}
function IP(e) {
  return `https://api.dicebear.com/9.x/pixel-art-neutral/svg?${new URLSearchParams({ seed: e, backgroundType: "solid", backgroundColor: "e8dfd0,d9c9b4,c7b79f", scale: "84" }).toString()}`;
}
function LP(e) {
  return e.type === "AGENT_SPAWNED"
    ? `Agent ${e.agent_id} replicated.`
    : e.type === "AGENT_KILLED"
      ? `Agent ${e.agent_id} terminated.`
      : e.type === "AGENT_REPLICATED"
        ? `Agent ${e.agent_id} replicated.`
        : e.type === "SUPERVISOR_TICK"
          ? "Supervisor cycle completed."
          : e.type === "TASK_CREDITED"
            ? `Task credit applied to ${e.agent_id}.`
            : e.type === "TASK_CREDIT_APPLIED"
              ? `Task credit applied to ${e.agent_id}.`
              : e.type === "BALANCE_VISIBILITY_TOGGLED"
                ? `Balance visibility updated for ${e.agent_id}.`
                : `${e.type.toLowerCase().replace(/_/g, " ")} recorded.`;
}
function RP(e) {
  return e === "ok" ? "text-primary/90" : e === "error" ? "text-destructive/90" : "text-muted-foreground";
}
function jP(e) {
  return e === "SUCCESS"
    ? "text-primary/90"
    : e === "WARN"
      ? "text-accent-foreground/90"
      : e === "ERROR"
        ? "text-destructive/90"
        : "text-muted-foreground";
}
function DP(e) {
  return e.toLowerCase().replace(/_/g, " ");
}
function OP(e) {
  return e === "PROFITABLE"
    ? "bg-secondary/55"
    : e === "WATCHLIST"
      ? "bg-accent/40"
      : e === "SPAWNING"
        ? "bg-secondary/40"
        : "bg-background/80";
}
function $P(e) {
  return e === "PROFITABLE"
    ? "border-[hsl(105_30%_72%)] bg-[hsl(106_44%_86%)] text-[hsl(108_24%_28%)]"
    : e === "SPAWNING"
      ? "border-[hsl(203_33%_73%)] bg-[hsl(202_45%_87%)] text-[hsl(201_28%_30%)]"
      : e === "WATCHLIST"
        ? "border-[hsl(16_40%_74%)] bg-[hsl(16_56%_88%)] text-[hsl(20_30%_31%)]"
        : "border-[hsl(34_22%_76%)] bg-[hsl(35_30%_89%)] text-[hsl(30_12%_33%)]";
}
function og(e) {
  return g.jsxs("div", {
    className: ue(
      "agent-node-shell w-full rounded-sm px-2.5 py-2.5",
      OP(e.stage),
      e.active && "agent-node-shell--pulse",
      e.active && `agent-node-shell--${e.activityKind ?? "event"}`,
    ),
    children: [
      g.jsxs("div", {
        className: "flex items-start justify-between gap-2",
        children: [
          g.jsx("p", {
            className: "text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/90",
            children: e.title,
          }),
          g.jsx(Be, {
            variant: "outline",
            className: ue("px-2 py-[1px] text-[8px]", $P(e.stage)),
            children: e.stage.toLowerCase(),
          }),
        ],
      }),
      g.jsxs("div", {
        className: "mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
        children: [
          g.jsxs("span", { children: ["health ", Math.round(e.health), "%"] }),
          g.jsx("span", {
            className: ue("font-code", e.margin >= 0 ? "text-primary/90" : "text-destructive/90"),
            children: e.margin.toFixed(2),
          }),
        ],
      }),
    ],
  });
}
function zP() {
  var Lr;
  const [e, t] = _.useState("2.0"),
    [n, r] = _.useState(!0),
    [o, i] = _.useState(vu),
    [s, l] = _.useState("Ready for colony operations."),
    [a, u] = _.useState("neutral"),
    [d, c] = _.useState("checking"),
    [f, y] = _.useState("live"),
    [v, x] = _.useState("..."),
    [S, h] = _.useState(null),
    [m, p] = _.useState({}),
    [w, E] = _.useState(Bn),
    [b, k] = _.useState(vr),
    [A, R] = _.useState(xr),
    [z, L] = _.useState(((Lr = Bn[0]) == null ? void 0 : Lr.agent_id) ?? null),
    [M, B] = _.useState(null),
    [C, D] = _.useState([]),
    [I, O] = _.useState(null),
    [N, T] = _.useState(!1),
    [j, $] = _.useState(null),
    F = _.useRef(!1),
    G = _.useRef(null),
    W = _.useRef(Math.max(...xr.map((P) => P.seq), 0) + 1),
    Y = _.useRef(new Set()),
    X = _.useRef(!1),
    Q = _.useMemo(() => {
      const P = w.map((q) => q.agent_id);
      return P.length > 0 ? P : [...Cx];
    }, [w]),
    V = _.useCallback(async (P) => {
      c("checking");
      try {
        const q = await P();
        return (c("online"), y("live"), q);
      } catch (q) {
        throw (c("offline"), q);
      }
    }, []),
    Z = _.useCallback((P, q) => {
      if (P.length === 0) return;
      const ne = Date.now() + kP,
        ge = new Set(P);
      p((fe) => {
        const se = { ...fe };
        return (
          ge.forEach((ve) => {
            se[ve] = { kind: q, expiresAt: ne };
          }),
          se
        );
      });
    }, []);
  _.useEffect(() => {
    const P = window.setInterval(() => {
      const q = Date.now();
      p((ne) => {
        const ge = {};
        let fe = !1;
        return (
          Object.entries(ne).forEach(([se, ve]) => {
            if (ve.expiresAt > q) {
              ge[se] = ve;
              return;
            }
            fe = !0;
          }),
          fe ? ge : ne
        );
      });
    }, 220);
    return () => window.clearInterval(P);
  }, []);
  const ie = _.useMemo(() => {
      const P = new Map();
      return (b.forEach((q) => P.set(q.agent_id, q)), P);
    }, [b]),
    U = _.useMemo(() => (w.length ? (w.find((P) => P.agent_id === z) ?? w[0]) : null), [w, z]),
    ee = _.useCallback((P) => {
      (L(P), B({ kind: "agent", agentId: P }));
    }, []),
    te = U ? ie.get(U.agent_id) : void 0,
    oe = _.useMemo(
      () => ((M == null ? void 0 : M.kind) !== "agent" ? null : (w.find((P) => P.agent_id === M.agentId) ?? null)),
      [w, M],
    ),
    ce = oe ? ie.get(oe.agent_id) : void 0,
    de = _.useMemo(
      () =>
        (M == null ? void 0 : M.kind) !== "agent" || !M.agentId ? [] : A.filter((P) => P.agent_id === M.agentId).slice(0, 12),
      [A, M],
    ),
    Ie = _.useMemo(
      () =>
        [...b]
          .sort((P, q) => q.net_margin_24h - P.net_margin_24h)
          .map((P) => {
            const q = w.find((ne) => ne.agent_id === P.agent_id);
            return {
              id: P.agent_id,
              status: (q == null ? void 0 : q.status) ?? "SPAWNED",
              margin: P.net_margin_24h,
              balance: P.balance,
            };
          }),
      [w, b],
    ),
    pe = _.useMemo(() => {
      const P = w.filter((se) => se.status === "ACTIVE").length,
        q = w.filter((se) => se.status === "FLAGGED").length,
        ne = w.filter((se) => se.status === "KILLED").length,
        ge = b.reduce((se, ve) => se + ve.balance, 0),
        fe = b.reduce((se, ve) => se + ve.net_margin_24h, 0);
      return { active: P, flagged: q, killed: ne, total: w.length, totalBalance: ge, totalMargin: fe };
    }, [w, b]),
    Oe = _.useMemo(() => {
      const P = w.length ? w : Bn,
        q = w.length ? ie : new Map(vr.map((ne) => [ne.agent_id, ne]));
      return P.map((ne, ge) => {
        const fe = q.get(ne.agent_id),
          se = MP(ne, fe),
          ve = or(ne.quality_rolling * 100),
          ct = (fe == null ? void 0 : fe.net_margin_24h) ?? 0,
          Ze = se === "PROFITABLE" ? 15 : se === "WATCHLIST" ? -15 : 0;
        return {
          id: ne.agent_id,
          displayName: `Agent ${String(ge + 1).padStart(2, "0")}`,
          parentId: ne.parent_id ?? "root",
          stage: se,
          progress: or(ve + Ze),
          health: ve,
          margin: ct,
          status: ne.status,
        };
      });
    }, [w, ie]),
    rn = _.useCallback((P) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          P.fitView({ ...tg, duration: 0 });
        });
      });
    }, []),
    bn = _.useMemo(() => {
      var os;
      const P = new Set(Oe.map((J) => J.id)),
        q = new Map(Oe.map((J) => [J.id, J])),
        ne = new Map(Oe.map((J) => [J.id, J.parentId])),
        ge = new Map(),
        fe = new Map(),
        se = new Map();
      let ve = 0;
      const ct = (J, Ne = new Set()) => {
          if (ge.has(J)) return ge.get(J) ?? 1;
          if (Ne.has(J)) return 1;
          Ne.add(J);
          const Le = ne.get(J),
            Fe = Le && P.has(Le) ? ct(Le, Ne) + 1 : 1;
          return (ge.set(J, Fe), Fe);
        },
        Ze = { PROFITABLE: 0, SPAWNING: 1, WATCHLIST: 2 };
      Oe.forEach((J) => {
        const Ne = P.has(J.parentId) ? J.parentId : "root",
          Le = fe.get(Ne) ?? [];
        (Le.push(J.id), fe.set(Ne, Le));
      });
      const es = new Map(),
        Ro = (J, Ne = new Set()) => {
          const Le = es.get(J);
          if (Le !== void 0) return Le;
          if (Ne.has(J)) return 1;
          Ne.add(J);
          const Fe = fe.get(J) ?? [],
            rt = Fe.length === 0 ? 1 : Fe.reduce((dt, qe) => dt + Ro(qe, Ne), 0);
          return (Ne.delete(J), es.set(J, rt), rt);
        };
      fe.forEach((J, Ne) => {
        (J.sort((Le, Fe) => {
          const rt = q.get(Le),
            dt = q.get(Fe);
          if (!rt || !dt) return Le.localeCompare(Fe);
          const qe = Ze[rt.stage] - Ze[dt.stage];
          if (qe !== 0) return qe;
          const Rr = Ro(Fe) - Ro(Le);
          if (Rr !== 0) return Rr;
          const is = dt.margin - rt.margin;
          return Math.abs(is) > 0.01 ? is : Le.localeCompare(Fe);
        }),
          fe.set(Ne, J));
      });
      const ts = (J, Ne = new Set()) => {
        const Le = se.get(J);
        if (Le !== void 0) return Le;
        if (Ne.has(J)) {
          const qe = xu + ve * eg;
          return ((ve += 1), se.set(J, qe), qe);
        }
        Ne.add(J);
        const Fe = fe.get(J) ?? [];
        if (Fe.length === 0) {
          const qe = xu + ve * eg;
          return ((ve += 1), se.set(J, qe), Ne.delete(J), qe);
        }
        const rt = Fe.map((qe) => ts(qe, Ne)),
          dt = rt.reduce((qe, Rr) => qe + Rr, 0) / rt.length;
        return (se.set(J, dt), Ne.delete(J), dt);
      };
      (fe.get("root") ?? []).length > 0 ? ts("root") : se.set("root", 220);
      const ns = [
          {
            id: "root",
            position: { x: Jh, y: se.get("root") ?? 220 },
            data: {
              label: og({
                title: "Origin",
                stage: "ROOT",
                health: 100,
                margin: pe.totalMargin,
                active: !!m.root,
                activityKind: (os = m.root) == null ? void 0 : os.kind,
              }),
            },
            draggable: !1,
            selectable: !1,
            style: { width: Zh },
          },
        ],
        rs = [];
      return (
        Oe.forEach((J) => {
          var dt;
          const Ne = ct(J.id),
            Le = {
              title: J.displayName,
              stage: J.stage,
              health: J.health,
              margin: J.margin,
              active: !!m[J.id],
              activityKind: (dt = m[J.id]) == null ? void 0 : dt.kind,
            };
          ns.push({
            id: J.id,
            position: { x: Jh + Ne * bP, y: se.get(J.id) ?? xu },
            data: { label: og(Le) },
            draggable: !1,
            selectable: !1,
            style: { width: Zh },
          });
          const Fe = P.has(J.parentId) ? J.parentId : "root",
            rt =
              J.stage === "WATCHLIST" ? "hsl(24 20% 46%)" : J.stage === "PROFITABLE" ? "hsl(30 24% 42%)" : "hsl(34 12% 48%)";
          rs.push({
            id: `${Fe}->${J.id}`,
            source: Fe,
            target: J.id,
            type: "smoothstep",
            animated: J.stage === "SPAWNING",
            style: { stroke: rt, strokeWidth: 1.45 },
            markerEnd: { type: $i.ArrowClosed, width: 16, height: 16, color: rt },
          });
        }),
        { nodes: ns, edges: rs }
      );
    }, [Oe, pe.totalMargin, m]),
    kn = _.useCallback((P) => {
      ((W.current = P.nextSeq),
        (Y.current = new Set(P.events.map((q) => q.seq))),
        (X.current = !0),
        E(P.agents),
        k(P.ledger),
        R(P.events),
        L((q) => {
          var ne;
          return q && P.agents.some((ge) => ge.agent_id === q)
            ? q
            : (((ne = P.agents[0]) == null ? void 0 : ne.agent_id) ?? null);
        }));
    }, []),
    on = _.useCallback(
      (P) => {
        const q = P.reduce((se, ve) => Math.max(se, ve.seq), 0);
        if (((W.current = Math.max(W.current, q + 1)), !X.current)) {
          ((Y.current = new Set(P.map((se) => se.seq))), (X.current = !0), R(P));
          return;
        }
        const ne = Y.current,
          ge = new Set();
        let fe = !1;
        (P.forEach((se) => {
          if (!ne.has(se.seq)) {
            if (se.agent_id) {
              ge.add(se.agent_id);
              return;
            }
            fe = !0;
          }
        }),
          ge.size > 0 && Z(Array.from(ge), "event"),
          fe && Z(["root"], "event"),
          (Y.current = new Set(P.map((se) => se.seq))),
          R(P));
      },
      [Z],
    ),
    Ir = _.useCallback(async () => {
      const P = await V(() => Gt.getState()),
        q = P.agents,
        ne = P.ledger;
      if (!Array.isArray(q) || !Array.isArray(ne)) throw new Error("Invalid colony state response.");
      const ge = q.length === 0 && ne.length === 0,
        fe = ge ? Bn : q,
        se = ge ? vr : ne;
      return (
        E(fe),
        k(se),
        L((ve) => {
          var ct;
          return ve && fe.some((Ze) => Ze.agent_id === ve) ? ve : (((ct = fe[0]) == null ? void 0 : ct.agent_id) ?? null);
        }),
        ge
      );
    }, [V]),
    nr = _.useCallback(
      async (P = !1) => {
        const q = await V(() => Gt.getEvents(48));
        if (!Array.isArray(q.events)) throw new Error("Invalid events response.");
        if (P && q.events.length === 0) {
          on(xr);
          return;
        }
        on(q.events);
      },
      [V, on],
    ),
    Nt = _.useCallback(
      async (P = !1) => {
        if (!F.current) {
          ((F.current = !0), T(!0), $(null), P && ((G.current = null), O(null)));
          try {
            const q = P ? null : G.current,
              ne = await V(() => Gt.getLogs(ng, q));
            if (!Array.isArray(ne.logs)) throw new Error("Invalid logs response.");
            const ge = ne.logs,
              fe = typeof ne.next_cursor == "string" && ne.next_cursor.length > 0 ? ne.next_cursor : null;
            ((G.current = fe),
              O(fe),
              D((se) => {
                const ve = P ? ge : [...se, ...ge],
                  ct = new Map();
                return (
                  ve.forEach((Ze) => {
                    Ze != null && Ze.id && (ct.has(Ze.id) || ct.set(Ze.id, Ze));
                  }),
                  Array.from(ct.values())
                );
              }));
          } catch {
            const q = Mx(P ? null : G.current, ng, Q, Br);
            ((G.current = q.nextCursor),
              O(q.nextCursor),
              D((ne) => (P ? q.logs : [...ne, ...q.logs])),
              $("Log stream offline. Showing local mock stream."));
          } finally {
            ((F.current = !1), T(!1));
          }
        }
      },
      [V, Q],
    ),
    rr = _.useCallback(
      (P) => {
        if (N || !I) return;
        const q = P.currentTarget;
        q.scrollHeight - q.scrollTop - q.clientHeight > NP || Nt(!1);
      },
      [Nt, I, N],
    ),
    Vt = _.useCallback(async () => {
      try {
        const P = await Ir();
        (await nr(P),
          u("ok"),
          l(P ? "Live colony empty. Showing seeded end-state snapshot." : "Telemetry synchronized."),
          y("live"));
      } catch {
        y("mock-fallback");
      }
    }, [nr, Ir]),
    Nn = _.useCallback(
      async (P) => {
        try {
          (h(P.label), await P.action(), u("ok"), l(P.successMessage));
          const q = [...(P.pulseNodeIds ?? []), ...(P.pulseRoot ? ["root"] : [])];
          (Z(q, P.kind), await Vt());
        } catch {
          y("mock-fallback");
          const q = P.fallback();
          kn(q);
          const ne = q.touchedAgentIds.length > 0 ? q.touchedAgentIds : (P.pulseNodeIds ?? []);
          Z([...ne, ...(P.pulseRoot ? ["root"] : [])], P.kind);
        } finally {
          h(null);
        }
      },
      [kn, Z, Vt],
    );
  return (
    _.useEffect(() => {
      (async () => {
        try {
          const P = await V(() => Gt.getVersion());
          x(P.version ?? "unknown");
        } catch {
          x("unavailable");
        }
      })();
    }, [V]),
    _.useEffect(() => {
      Vt();
    }, [Vt]),
    _.useEffect(() => {
      Nt(!0);
    }, [Nt]),
    _.useEffect(() => {
      if (!n) return;
      const P = window.setInterval(() => {
        Vt();
      }, EP);
      return () => window.clearInterval(P);
    }, [n, Vt]),
    _.useEffect(() => {
      const P = window.setInterval(() => {
        i((q) => (q <= 1 ? vu : q - 1));
      }, 1e3);
      return () => window.clearInterval(P);
    }, []),
    g.jsxs(QM, {
      className: "h-screen w-screen overflow-hidden",
      children: [
        g.jsxs(JM, {
          children: [
            g.jsx(eP, {
              children: g.jsxs("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                  g.jsxs("div", {
                    children: [
                      g.jsx("p", {
                        className: "font-display text-[1.5rem] leading-none text-foreground/95",
                        children: "Agent Capitalism",
                      }),
                      g.jsx("p", {
                        className: "mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                        children: "Operator View",
                      }),
                    ],
                  }),
                  g.jsx(Be, { variant: "outline", className: "font-code text-[8px]", children: "node_01" }),
                ],
              }),
            }),
            g.jsxs(tP, {
              children: [
                g.jsxs(Wh, {
                  children: [
                    g.jsx(Uh, { children: "Overview" }),
                    g.jsxs(Gh, {
                      children: [
                        g.jsxs(oP, {
                          children: [
                            g.jsx(gu, {
                              children: g.jsxs(mu, {
                                active: !0,
                                children: [
                                  g.jsx(Sp, { className: "h-3.5 w-3.5 shrink-0" }),
                                  g.jsx("span", { children: "reserve" }),
                                  g.jsx("span", {
                                    className: "ml-auto font-code text-foreground",
                                    children: $s(pe.totalBalance),
                                  }),
                                ],
                              }),
                            }),
                            g.jsx(gu, {
                              children: g.jsxs(mu, {
                                onClick: () => B({ kind: "margin" }),
                                children: [
                                  g.jsx(Y_, { className: "h-3.5 w-3.5 shrink-0" }),
                                  g.jsx("span", { children: "margin" }),
                                  g.jsx("span", {
                                    className: ue(
                                      "ml-auto font-code",
                                      pe.totalMargin >= 0 ? "text-primary/90" : "text-destructive/90",
                                    ),
                                    children: pe.totalMargin.toFixed(2),
                                  }),
                                ],
                              }),
                            }),
                            g.jsx(gu, {
                              children: g.jsxs(mu, {
                                onClick: () => B({ kind: "agents" }),
                                children: [
                                  g.jsx(U_, { className: "h-3.5 w-3.5 shrink-0" }),
                                  g.jsx("span", { children: "agents" }),
                                  g.jsx("span", { className: "ml-auto font-code text-foreground", children: pe.total }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          className: "rounded-sm border border-border/70 bg-background/55 px-2.5 py-2",
                          children: [
                            g.jsxs("div", {
                              className:
                                "mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                              children: [
                                g.jsx("span", { children: "Active ratio" }),
                                g.jsxs("span", {
                                  children: [pe.total > 0 ? ((pe.active / pe.total) * 100).toFixed(0) : "0", "%"],
                                }),
                              ],
                            }),
                            g.jsx(nl, { value: or((pe.active / Math.max(pe.total, 1)) * 100), className: "h-1.5" }),
                            g.jsxs("div", {
                              className: "mt-2 flex flex-wrap gap-1.5 text-[9px] uppercase tracking-[0.16em]",
                              children: [
                                g.jsxs(Be, {
                                  variant: "success",
                                  className: "px-2 py-[1px]",
                                  children: ["active ", pe.active],
                                }),
                                g.jsxs(Be, {
                                  variant: "warning",
                                  className: "px-2 py-[1px]",
                                  children: ["flagged ", pe.flagged],
                                }),
                                g.jsxs(Be, {
                                  variant: "destructive",
                                  className: "px-2 py-[1px]",
                                  children: ["killed ", pe.killed],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                g.jsxs(Wh, {
                  children: [
                    g.jsx(Uh, { children: "Operations Log" }),
                    g.jsx(Gh, {
                      children: g.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          g.jsxs("div", {
                            className:
                              "flex items-center justify-between rounded-sm border border-border/70 bg-background/55 px-2 py-1.5 text-[9px] uppercase tracking-[0.16em] text-muted-foreground",
                            children: [
                              g.jsxs("span", { children: [C.length, " streamed records"] }),
                              g.jsx("span", { className: "font-code", children: C[0] ? rg(C[0].ts) : "--:--" }),
                            ],
                          }),
                          g.jsxs("div", {
                            className: "max-h-[44vh] overflow-auto rounded-sm border border-border/70 bg-background/55",
                            onScroll: rr,
                            children: [
                              C.map((P) =>
                                g.jsxs(
                                  "div",
                                  {
                                    className: "border-b border-border/60 px-2.5 py-2 last:border-b-0",
                                    children: [
                                      g.jsxs("div", {
                                        className:
                                          "flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground",
                                        children: [
                                          g.jsx("span", { children: PP(P.ts) }),
                                          g.jsx("span", { className: "font-code", children: P.id }),
                                        ],
                                      }),
                                      g.jsxs("div", {
                                        className: "mt-1 flex items-center justify-between gap-2",
                                        children: [
                                          g.jsx("p", {
                                            className: ue("text-[10px] uppercase tracking-[0.18em]", jP(P.severity)),
                                            children: DP(P.action),
                                          }),
                                          g.jsx(Be, {
                                            variant: TP[P.severity],
                                            className: "px-1.5 py-[1px] text-[8px]",
                                            children: P.severity.toLowerCase(),
                                          }),
                                        ],
                                      }),
                                      g.jsx("p", {
                                        className: "mt-1 text-[11px] leading-relaxed text-foreground/85",
                                        children: P.summary,
                                      }),
                                      g.jsxs("div", {
                                        className: "mt-1.5 flex flex-wrap gap-1.5",
                                        children: [
                                          g.jsx(Be, {
                                            variant: AP[P.channel],
                                            className: "px-1.5 py-[1px] text-[8px]",
                                            children: P.channel.toLowerCase(),
                                          }),
                                          P.agentId
                                            ? g.jsx("span", {
                                                className:
                                                  "font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75",
                                                children: P.agentId,
                                              })
                                            : null,
                                          P.tool
                                            ? g.jsx("span", {
                                                className:
                                                  "font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75",
                                                children: P.tool,
                                              })
                                            : null,
                                          P.modalApp
                                            ? g.jsx("span", {
                                                className:
                                                  "font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75",
                                                children: P.modalApp,
                                              })
                                            : null,
                                          P.durationMs
                                            ? g.jsxs("span", {
                                                className:
                                                  "font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75",
                                                children: [P.durationMs, "ms"],
                                              })
                                            : null,
                                        ],
                                      }),
                                      g.jsx("p", {
                                        className: "mt-1 font-code text-[9px] leading-relaxed text-muted-foreground",
                                        children: P.details,
                                      }),
                                    ],
                                  },
                                  P.id,
                                ),
                              ),
                              !N && !j && C.length === 0
                                ? g.jsx("p", {
                                    className:
                                      "px-2.5 py-6 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "No log records yet.",
                                  })
                                : null,
                              N
                                ? g.jsx("p", {
                                    className: "px-2.5 py-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground",
                                    children: "Loading more logs...",
                                  })
                                : null,
                              j
                                ? g.jsx("p", {
                                    className: "px-2.5 py-2 text-[9px] uppercase tracking-[0.16em] text-destructive/90",
                                    children: j,
                                  })
                                : null,
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
            g.jsx(nP, {
              children: g.jsxs("div", {
                className: "space-y-2",
                children: [
                  g.jsxs("div", {
                    className:
                      "flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                    children: [
                      g.jsx("span", { children: "Auto refresh" }),
                      g.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          g.jsx("span", { className: "font-code text-foreground", children: n ? "ON" : "OFF" }),
                          g.jsx(Ex, { "aria-label": "Toggle automatic refresh", checked: n, onCheckedChange: r }),
                        ],
                      }),
                    ],
                  }),
                  g.jsxs("div", {
                    className:
                      "flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                    children: [
                      g.jsx("span", { children: "Lease tick" }),
                      g.jsxs("span", { className: "font-code text-foreground", children: [o, "s"] }),
                    ],
                  }),
                  g.jsxs("div", {
                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                    children: ["API ", v],
                  }),
                ],
              }),
            }),
          ],
        }),
        g.jsxs(rP, {
          children: [
            g.jsxs("header", {
              className: "border-b border-border/75 bg-background/70 px-4 py-3",
              children: [
                g.jsxs("div", {
                  className: "flex flex-wrap items-center gap-2.5",
                  children: [
                    g.jsx(_v, {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      className: "w-[132px] font-code",
                      value: e,
                      onChange: (P) => t(P.target.value),
                    }),
                    g.jsxs(In, {
                      onClick: () => {
                        Nn({
                          label: "spawn",
                          kind: "spawn",
                          action: () => V(() => Gt.spawnAgent({ initial_balance: Number(e) || 2 })),
                          fallback: () =>
                            gP({ agents: w, ledger: b, events: A, nextSeq: W.current }, { initialBalance: Number(e) || 2 }),
                          successMessage: "Agent spawned.",
                          pulseRoot: !0,
                        });
                      },
                      disabled: S !== null,
                      children: [g.jsx(K_, { className: "mr-1.5 h-3.5 w-3.5" }), "Spawn"],
                    }),
                    g.jsxs(In, {
                      variant: "outline",
                      onClick: () => {
                        (Nn({
                          label: "tick",
                          kind: "tick",
                          action: () => V(() => Gt.supervisorTick()),
                          fallback: () => Nx({ agents: w, ledger: b, events: A, nextSeq: W.current }),
                          successMessage: "Supervisor cycle complete.",
                          pulseRoot: !0,
                        }),
                          i(vu));
                      },
                      disabled: S !== null,
                      children: [g.jsx(W_, { className: "mr-1.5 h-3.5 w-3.5" }), "Tick"],
                    }),
                    g.jsxs(In, {
                      variant: "outline",
                      onClick: () => {
                        Vt();
                      },
                      disabled: S !== null,
                      children: [g.jsx(G_, { className: "mr-1.5 h-3.5 w-3.5" }), "Refresh"],
                    }),
                    g.jsxs("div", {
                      className: "ml-auto flex items-center gap-1.5",
                      children: [
                        g.jsx(Be, {
                          variant: pe.flagged > 0 ? "warning" : "success",
                          children: pe.flagged > 0 ? `${pe.flagged} watchlist` : "stable",
                        }),
                        g.jsxs(Be, { variant: "outline", children: [pe.total, " active branches"] }),
                      ],
                    }),
                  ],
                }),
                g.jsx("p", { className: ue("mt-2 text-[10px] uppercase tracking-[0.18em]", RP(a)), children: s }),
              ],
            }),
            g.jsxs("main", {
              className: "grid min-h-0 flex-1 gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_370px]",
              children: [
                g.jsxs("section", {
                  className: "min-h-0 overflow-hidden rounded-sm border border-border/75 bg-background/55",
                  children: [
                    g.jsxs("div", {
                      className: "flex items-center justify-between border-b border-border/70 px-4 py-3",
                      children: [
                        g.jsxs("div", {
                          children: [
                            g.jsx("p", {
                              className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                              children: "Branch Graph",
                            }),
                            g.jsx("p", {
                              className: "mt-1 text-[13px] text-foreground/85",
                              children: "Placeholder lineage map for behavior and survivability.",
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            g.jsxs(Be, {
                              variant: "success",
                              children: [Oe.filter((P) => P.stage === "PROFITABLE").length, " profitable"],
                            }),
                            g.jsxs(Be, {
                              variant: "info",
                              children: [Oe.filter((P) => P.stage === "SPAWNING").length, " progressing"],
                            }),
                            g.jsxs(Be, {
                              variant: "warning",
                              children: [Oe.filter((P) => P.stage === "WATCHLIST").length, " risk"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    g.jsx("div", {
                      className: "h-[calc(100%-73px)] min-h-[500px]",
                      children: g.jsxs(WC, {
                        nodes: bn.nodes,
                        edges: bn.edges,
                        fitView: !0,
                        fitViewOptions: tg,
                        onInit: rn,
                        nodesDraggable: !1,
                        nodesConnectable: !1,
                        elementsSelectable: !1,
                        panOnScroll: !0,
                        zoomOnDoubleClick: !1,
                        proOptions: { hideAttribution: !0 },
                        children: [
                          g.jsx(YC, { color: "hsl(var(--border))", gap: 20, size: 1 }),
                          g.jsx(nT, { showInteractive: !1 }),
                        ],
                      }),
                    }),
                  ],
                }),
                g.jsxs("aside", {
                  className: "min-h-0 space-y-4 overflow-auto pr-1",
                  children: [
                    g.jsxs("section", {
                      className: "rounded-sm border border-border/75 bg-background/55 px-3 py-3",
                      children: [
                        g.jsxs("div", {
                          className: "mb-2 flex items-center justify-between",
                          children: [
                            g.jsx("button", {
                              type: "button",
                              className:
                                "text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground/85",
                              onClick: () => B({ kind: "agents" }),
                              children: "Agent Notes",
                            }),
                            g.jsx(Be, { variant: "outline", children: pe.total }),
                          ],
                        }),
                        g.jsxs("div", {
                          className: "space-y-2",
                          children: [
                            w.length
                              ? null
                              : g.jsxs("div", {
                                  className: "rounded-sm border border-dashed border-border/70 px-3 py-6 text-center",
                                  children: [
                                    g.jsx(Sp, { className: "mx-auto h-5 w-5 text-muted-foreground" }),
                                    g.jsx("p", {
                                      className: "mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                      children: "No telemetry",
                                    }),
                                  ],
                                }),
                            w.map((P, q) => {
                              const ne = ie.get(P.agent_id),
                                ge = or(P.healthy ? P.quality_rolling * 100 : 8),
                                fe = P.status === "KILLED" || S !== null;
                              return g.jsxs(
                                "div",
                                {
                                  className: ue(
                                    "rounded-sm border border-border/70 bg-background/70 px-2.5 py-2",
                                    (U == null ? void 0 : U.agent_id) === P.agent_id
                                      ? "border-primary/50 bg-secondary/45"
                                      : "",
                                  ),
                                  children: [
                                    g.jsxs("div", {
                                      className: "cursor-pointer",
                                      onClick: () => ee(P.agent_id),
                                      children: [
                                        g.jsxs("div", {
                                          className: "flex items-start justify-between gap-2",
                                          children: [
                                            g.jsxs("div", {
                                              children: [
                                                g.jsxs("p", {
                                                  className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                                  children: ["Agent ", String(q + 1).padStart(2, "0")],
                                                }),
                                                g.jsx("p", {
                                                  className:
                                                    "mt-1 font-code text-[10px] uppercase tracking-[0.14em] text-foreground/80",
                                                  children: P.agent_id,
                                                }),
                                              ],
                                            }),
                                            g.jsx(Be, { variant: CP[P.status], children: P.status.toLowerCase() }),
                                          ],
                                        }),
                                        g.jsxs("div", {
                                          className: "mt-2 space-y-1",
                                          children: [
                                            g.jsxs("div", {
                                              className:
                                                "flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                                              children: [
                                                g.jsx("span", { children: "Health" }),
                                                g.jsxs("span", { children: [Math.round(ge), "%"] }),
                                              ],
                                            }),
                                            g.jsx(nl, { value: ge, className: "h-1.5" }),
                                          ],
                                        }),
                                        g.jsxs("div", {
                                          className:
                                            "mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                                          children: [
                                            g.jsx("span", { children: $s((ne == null ? void 0 : ne.balance) ?? 0) }),
                                            g.jsx("span", {
                                              className: ue(
                                                "font-code",
                                                ((ne == null ? void 0 : ne.net_margin_24h) ?? 0) >= 0
                                                  ? "text-primary/90"
                                                  : "text-destructive/90",
                                              ),
                                              children: ((ne == null ? void 0 : ne.net_margin_24h) ?? 0).toFixed(2),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    g.jsxs("div", {
                                      className: "mt-2 flex flex-wrap gap-1.5",
                                      children: [
                                        g.jsxs(In, {
                                          size: "sm",
                                          onClick: () => {
                                            Nn({
                                              label: `credit-${P.agent_id}`,
                                              kind: "credit",
                                              action: () =>
                                                V(() =>
                                                  Gt.creditTask(P.agent_id, { revenue_credit: 1, quality_score: 0.85 }),
                                                ),
                                              fallback: () =>
                                                mP(
                                                  { agents: w, ledger: b, events: A, nextSeq: W.current },
                                                  { agentId: P.agent_id, revenueCredit: 1, qualityScore: 0.85 },
                                                ),
                                              successMessage: `Credited ${P.agent_id}.`,
                                              pulseNodeIds: [P.agent_id],
                                            });
                                          },
                                          disabled: fe,
                                          children: [g.jsx(Q_, { className: "mr-1 h-3 w-3" }), "Credit"],
                                        }),
                                        g.jsxs(In, {
                                          size: "sm",
                                          variant: "outline",
                                          onClick: () => {
                                            Nn({
                                              label: `replicate-${P.agent_id}`,
                                              kind: "replicate",
                                              action: () =>
                                                V(() => Gt.replicateAgent(P.agent_id, { child_initial_balance: 1 })),
                                              fallback: () =>
                                                yP(
                                                  { agents: w, ledger: b, events: A, nextSeq: W.current },
                                                  { agentId: P.agent_id, childInitialBalance: 1 },
                                                ),
                                              successMessage: `Replication issued from ${P.agent_id}.`,
                                              pulseNodeIds: [P.agent_id],
                                            });
                                          },
                                          disabled: fe,
                                          children: [g.jsx(H_, { className: "mr-1 h-3 w-3" }), "Replicate"],
                                        }),
                                        g.jsxs(In, {
                                          size: "sm",
                                          variant: "outline",
                                          onClick: () => {
                                            Nn({
                                              label: `hide-${P.agent_id}`,
                                              kind: "hide",
                                              action: () =>
                                                V(() => Gt.toggleHideBalance(P.agent_id, { enabled: !P.hide_balance })),
                                              fallback: () =>
                                                vP(
                                                  { agents: w, ledger: b, events: A, nextSeq: W.current },
                                                  { agentId: P.agent_id, enabled: !P.hide_balance },
                                                ),
                                              successMessage: `${P.hide_balance ? "Unmasked" : "Masked"} balance for ${P.agent_id}.`,
                                              pulseNodeIds: [P.agent_id],
                                            });
                                          },
                                          disabled: fe,
                                          children: [
                                            g.jsx(q_, { className: "mr-1 h-3 w-3" }),
                                            P.hide_balance ? "Unhide" : "Hide",
                                          ],
                                        }),
                                        g.jsxs(In, {
                                          size: "sm",
                                          variant: "destructive",
                                          onClick: () => {
                                            Nn({
                                              label: `kill-${P.agent_id}`,
                                              kind: "kill",
                                              action: () =>
                                                V(() => Gt.killAgent(P.agent_id, { reason: "MANUAL_DASHBOARD_KILL" })),
                                              fallback: () =>
                                                xP(
                                                  { agents: w, ledger: b, events: A, nextSeq: W.current },
                                                  { agentId: P.agent_id, reason: "MANUAL_DASHBOARD_KILL" },
                                                ),
                                              successMessage: `${P.agent_id} terminated.`,
                                              pulseNodeIds: [P.agent_id],
                                            });
                                          },
                                          disabled: S !== null || P.status === "KILLED",
                                          children: [g.jsx(V_, { className: "mr-1 h-3 w-3" }), "Kill"],
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                P.agent_id,
                              );
                            }),
                          ],
                        }),
                      ],
                    }),
                    g.jsxs("section", {
                      className: "rounded-sm border border-border/75 bg-background/55 px-3 py-3",
                      children: [
                        g.jsx("button", {
                          type: "button",
                          className:
                            "text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground/85",
                          onClick: () => {
                            U != null && U.agent_id && ee(U.agent_id);
                          },
                          disabled: !(U != null && U.agent_id),
                          children: "Selected Agent",
                        }),
                        g.jsx("button", {
                          type: "button",
                          className:
                            "mt-1 block font-code text-[12px] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-foreground/80",
                          onClick: () => {
                            U != null && U.agent_id && ee(U.agent_id);
                          },
                          disabled: !(U != null && U.agent_id),
                          children: (U == null ? void 0 : U.agent_id) ?? "No selection",
                        }),
                        g.jsx("p", {
                          className: "mt-2 text-[12px] leading-relaxed text-muted-foreground",
                          children: U
                            ? `Status ${U.status.toLowerCase()}, quality ${(U.quality_rolling * 100).toFixed(1)}%, rent ${((te == null ? void 0 : te.rent_per_tick) ?? 0).toFixed(2)}.`
                            : "Spawn or select an agent to inspect details.",
                        }),
                        g.jsxs("div", {
                          className: "mt-3 flex flex-wrap gap-1.5",
                          children: [
                            g.jsxs(Be, {
                              variant: "outline",
                              children: ["lineage ", U != null && U.parent_id ? "derived" : "root"],
                            }),
                            g.jsx(Be, {
                              variant: U != null && U.healthy ? "success" : "warning",
                              children: U != null && U.healthy ? "healthy" : "fragile",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        g.jsx(KM, {
          open: M !== null,
          onOpenChange: (P) => !P && B(null),
          children: g.jsxs(fx, {
            className: "h-[min(86vh,760px)]",
            children: [
              g.jsxs(px, {
                className: "border-b border-border/75 px-5 py-4 text-left",
                children: [
                  g.jsx("p", {
                    className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                    children: "Dashboard Dialog",
                  }),
                  g.jsx(hx, {
                    className: "mt-1 pr-8 text-[16px] font-medium text-foreground",
                    children:
                      (M == null ? void 0 : M.kind) === "margin"
                        ? "Margin Dashboard"
                        : (M == null ? void 0 : M.kind) === "agents"
                          ? "Agent Dashboard"
                          : `${(oe == null ? void 0 : oe.agent_id) ?? "Agent"} Dashboard`,
                  }),
                  g.jsx(gx, {
                    className: "sr-only",
                    children: "Expanded dashboard view for sidebar margin and agent telemetry.",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "min-h-0 flex-1 overflow-auto px-5 py-4",
                children: [
                  (M == null ? void 0 : M.kind) === "margin"
                    ? g.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          g.jsxs("div", {
                            className: "grid gap-2 md:grid-cols-3",
                            children: [
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Net margin (24h)",
                                  }),
                                  g.jsx("p", {
                                    className: ue(
                                      "mt-1 text-[24px] font-medium",
                                      pe.totalMargin >= 0 ? "text-primary/90" : "text-destructive/90",
                                    ),
                                    children: pe.totalMargin.toFixed(2),
                                  }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Profitable agents",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: Ie.filter((P) => P.margin > 0).length,
                                  }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Loss agents",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: Ie.filter((P) => P.margin <= 0).length,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          g.jsxs("div", {
                            className: "rounded-sm border border-border/70 bg-background/60",
                            children: [
                              g.jsxs("div", {
                                className:
                                  "grid grid-cols-[1.3fr_0.9fr_0.9fr_0.7fr] gap-3 border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                children: [
                                  g.jsx("span", { children: "Agent" }),
                                  g.jsx("span", { children: "Balance" }),
                                  g.jsx("span", { children: "Margin" }),
                                  g.jsx("span", { children: "Status" }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "max-h-[420px] overflow-auto",
                                children: [
                                  Ie.map((P) =>
                                    g.jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className:
                                          "grid w-full grid-cols-[1.3fr_0.9fr_0.9fr_0.7fr] gap-3 border-b border-border/60 px-3 py-2 text-left text-[12px] transition-colors hover:bg-secondary/40 last:border-b-0",
                                        onClick: () => ee(P.id),
                                        children: [
                                          g.jsx("span", { className: "font-code text-foreground", children: P.id }),
                                          g.jsx("span", { className: "text-foreground/85", children: $s(P.balance) }),
                                          g.jsx("span", {
                                            className: ue(
                                              "font-code",
                                              P.margin >= 0 ? "text-primary/90" : "text-destructive/90",
                                            ),
                                            children: P.margin.toFixed(2),
                                          }),
                                          g.jsx("span", {
                                            className: "text-foreground/85",
                                            children: P.status.toLowerCase(),
                                          }),
                                        ],
                                      },
                                      P.id,
                                    ),
                                  ),
                                  Ie.length
                                    ? null
                                    : g.jsx("p", {
                                        className: "px-3 py-6 text-center text-[12px] text-muted-foreground",
                                        children: "No margin data yet.",
                                      }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      })
                    : null,
                  (M == null ? void 0 : M.kind) === "agents"
                    ? g.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          g.jsxs("div", {
                            className: "grid gap-2 md:grid-cols-4",
                            children: [
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Total agents",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: pe.total,
                                  }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Active",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: pe.active,
                                  }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Flagged",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: pe.flagged,
                                  }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                children: [
                                  g.jsx("p", {
                                    className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                    children: "Killed",
                                  }),
                                  g.jsx("p", {
                                    className: "mt-1 text-[24px] font-medium text-foreground",
                                    children: pe.killed,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          g.jsxs("div", {
                            className: "rounded-sm border border-border/70 bg-background/60",
                            children: [
                              g.jsxs("div", {
                                className:
                                  "grid grid-cols-[1.3fr_0.7fr_0.9fr_0.7fr] gap-3 border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                children: [
                                  g.jsx("span", { children: "Agent" }),
                                  g.jsx("span", { children: "Status" }),
                                  g.jsx("span", { children: "Health" }),
                                  g.jsx("span", { children: "Margin" }),
                                ],
                              }),
                              g.jsxs("div", {
                                className: "max-h-[420px] overflow-auto",
                                children: [
                                  w.map((P) => {
                                    const q = ie.get(P.agent_id),
                                      ne = or(P.healthy ? P.quality_rolling * 100 : 8),
                                      ge = (q == null ? void 0 : q.net_margin_24h) ?? 0;
                                    return g.jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className:
                                          "grid w-full grid-cols-[1.3fr_0.7fr_0.9fr_0.7fr] gap-3 border-b border-border/60 px-3 py-2 text-left text-[12px] transition-colors hover:bg-secondary/40 last:border-b-0",
                                        onClick: () => ee(P.agent_id),
                                        children: [
                                          g.jsx("span", { className: "font-code text-foreground", children: P.agent_id }),
                                          g.jsx("span", {
                                            className: "text-foreground/85",
                                            children: P.status.toLowerCase(),
                                          }),
                                          g.jsxs("span", {
                                            className: "text-foreground/85",
                                            children: [Math.round(ne), "%"],
                                          }),
                                          g.jsx("span", {
                                            className: ue("font-code", ge >= 0 ? "text-primary/90" : "text-destructive/90"),
                                            children: ge.toFixed(2),
                                          }),
                                        ],
                                      },
                                      P.agent_id,
                                    );
                                  }),
                                  w.length
                                    ? null
                                    : g.jsx("p", {
                                        className: "px-3 py-6 text-center text-[12px] text-muted-foreground",
                                        children: "No agents yet.",
                                      }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      })
                    : null,
                  (M == null ? void 0 : M.kind) === "agent"
                    ? g.jsx("div", {
                        className: "space-y-4",
                        children: oe
                          ? g.jsxs(g.Fragment, {
                              children: [
                                g.jsxs("div", {
                                  className: "grid gap-2 md:grid-cols-4",
                                  children: [
                                    g.jsxs("div", {
                                      className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                      children: [
                                        g.jsx("p", {
                                          className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                          children: "Agent",
                                        }),
                                        g.jsxs("div", {
                                          className: "mt-2 flex items-center gap-2.5",
                                          children: [
                                            g.jsx("img", {
                                              src: IP(oe.agent_id),
                                              alt: `Pixel placeholder avatar for ${oe.agent_id}`,
                                              className: "h-12 w-12 rounded-sm border border-border/70 bg-muted/60 p-0.5",
                                              style: { imageRendering: "pixelated" },
                                              onError: (P) => {
                                                ((P.currentTarget.onerror = null), (P.currentTarget.src = SP));
                                              },
                                            }),
                                            g.jsx("p", {
                                              className: "font-code text-[14px] text-foreground",
                                              children: oe.agent_id,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    g.jsxs("div", {
                                      className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                      children: [
                                        g.jsx("p", {
                                          className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                          children: "Status",
                                        }),
                                        g.jsx("p", {
                                          className: "mt-1 text-[14px] text-foreground",
                                          children: oe.status.toLowerCase(),
                                        }),
                                      ],
                                    }),
                                    g.jsxs("div", {
                                      className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                      children: [
                                        g.jsx("p", {
                                          className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                          children: "Balance",
                                        }),
                                        g.jsx("p", {
                                          className: "mt-1 text-[14px] text-foreground",
                                          children: $s((ce == null ? void 0 : ce.balance) ?? 0),
                                        }),
                                      ],
                                    }),
                                    g.jsxs("div", {
                                      className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                      children: [
                                        g.jsx("p", {
                                          className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                          children: "Margin",
                                        }),
                                        g.jsx("p", {
                                          className: ue(
                                            "mt-1 text-[14px]",
                                            ((ce == null ? void 0 : ce.net_margin_24h) ?? 0) >= 0
                                              ? "text-primary/90"
                                              : "text-destructive/90",
                                          ),
                                          children: ((ce == null ? void 0 : ce.net_margin_24h) ?? 0).toFixed(2),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                g.jsxs("div", {
                                  className: "rounded-sm border border-border/70 bg-background/60 px-3 py-3",
                                  children: [
                                    g.jsxs("div", {
                                      className:
                                        "flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                      children: [
                                        g.jsx("span", { children: "Health" }),
                                        g.jsxs("span", {
                                          children: [Math.round(or(oe.healthy ? oe.quality_rolling * 100 : 8)), "%"],
                                        }),
                                      ],
                                    }),
                                    g.jsx(nl, {
                                      value: or(oe.healthy ? oe.quality_rolling * 100 : 8),
                                      className: "mt-2 h-2",
                                    }),
                                    g.jsxs("div", {
                                      className: "mt-3 flex flex-wrap gap-1.5",
                                      children: [
                                        g.jsxs(Be, {
                                          variant: "outline",
                                          children: ["lineage ", oe.parent_id ? "derived" : "root"],
                                        }),
                                        g.jsx(Be, {
                                          variant: oe.healthy ? "success" : "warning",
                                          children: oe.healthy ? "healthy" : "fragile",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                g.jsxs("div", {
                                  className: "rounded-sm border border-border/70 bg-background/60",
                                  children: [
                                    g.jsx("div", {
                                      className:
                                        "border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                      children: "Recent agent events",
                                    }),
                                    g.jsxs("div", {
                                      className: "max-h-[320px] overflow-auto",
                                      children: [
                                        de.map((P) =>
                                          g.jsxs(
                                            "div",
                                            {
                                              className: "border-b border-border/60 px-3 py-2 last:border-b-0",
                                              children: [
                                                g.jsxs("div", {
                                                  className:
                                                    "flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-muted-foreground",
                                                  children: [
                                                    g.jsx("span", { children: rg(P.ts) }),
                                                    g.jsxs("span", { children: ["#", P.seq] }),
                                                  ],
                                                }),
                                                g.jsx("p", {
                                                  className: "mt-1 text-[12px] text-foreground/85",
                                                  children: LP(P),
                                                }),
                                              ],
                                            },
                                            P.seq,
                                          ),
                                        ),
                                        de.length
                                          ? null
                                          : g.jsx("p", {
                                              className: "px-3 py-6 text-center text-[12px] text-muted-foreground",
                                              children: "No events for this agent.",
                                            }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : g.jsx("p", {
                              className: "py-10 text-center text-[12px] text-muted-foreground",
                              children: "This agent is no longer available.",
                            }),
                      })
                    : null,
                ],
              }),
            ],
          }),
        }),
        g.jsx("div", {
          className: "pointer-events-none fixed bottom-3 left-1/2 z-50 -translate-x-1/2",
          children: g.jsx("span", {
            "aria-hidden": "true",
            className: ue(
              "backend-health-dot",
              d === "online"
                ? "backend-health-dot--online"
                : d === "checking"
                  ? "backend-health-dot--checking"
                  : "backend-health-dot--offline",
              f === "mock-fallback" ? "backend-health-dot--mock" : "",
            ),
          }),
        }),
      ],
    })
  );
}
function fi(e) {
  return e.map((t) => ({ ...t }));
}
function pi(e) {
  return e.map((t) => ({ ...t }));
}
function hi(e) {
  return e.map((t) => ({ ...t, payload: t.payload ? { ...t.payload } : void 0 }));
}
function FP() {
  const e = fi(Bn).map((r, o) =>
      o % 5 === 0
        ? { ...r, status: "FLAGGED", healthy: !1, quality_rolling: Math.max(0.2, r.quality_rolling - 0.35) }
        : o % 7 === 0
          ? { ...r, status: "KILLED", healthy: !1, quality_rolling: Math.max(0.1, r.quality_rolling - 0.45) }
          : r,
    ),
    t = pi(vr).map((r, o) =>
      o % 4 === 0
        ? { ...r, net_margin_24h: Number((r.net_margin_24h - 0.9).toFixed(2)), balance: Number((r.balance - 0.7).toFixed(2)) }
        : r,
    ),
    n = hi(xr).map((r, o) => (o < 6 ? { ...r, type: o % 2 === 0 ? "LEASE_AT_RISK" : "LOW_QUALITY" } : r));
  return { agents: e, ledger: t, events: n };
}
const wu = FP(),
  BP = {
    seeded: {
      name: "seeded",
      seedAgents: fi(Bn),
      seedLedger: pi(vr),
      seedEvents: hi(xr),
      logAnchorMs: Br,
      baseLatencyMs: 35,
      defaultFaults: {},
    },
    empty: {
      name: "empty",
      seedAgents: [],
      seedLedger: [],
      seedEvents: [],
      logAnchorMs: Br,
      baseLatencyMs: 30,
      defaultFaults: {},
    },
    "high-risk": {
      name: "high-risk",
      seedAgents: wu.agents,
      seedLedger: wu.ledger,
      seedEvents: wu.events,
      logAnchorMs: Br,
      baseLatencyMs: 45,
      defaultFaults: {},
    },
    "backend-down": {
      name: "backend-down",
      seedAgents: fi(Bn),
      seedLedger: pi(vr),
      seedEvents: hi(xr),
      logAnchorMs: Br,
      baseLatencyMs: 25,
      defaultFaults: {
        "GET /version": { networkError: !0 },
        "GET /colony/state": { networkError: !0 },
        "GET /colony/events": { networkError: !0 },
        "GET /colony/logs": { networkError: !0 },
        "POST /agents/spawn": { networkError: !0 },
        "POST /supervisor/tick": { networkError: !0 },
        "POST /agents/:id/task": { networkError: !0 },
        "POST /agents/:id/replicate": { networkError: !0 },
        "POST /agents/:id/simulate/hide-balance": { networkError: !0 },
        "POST /agents/:id/kill": { networkError: !0 },
      },
    },
    "slow-network": {
      name: "slow-network",
      seedAgents: fi(Bn),
      seedLedger: pi(vr),
      seedEvents: hi(xr),
      logAnchorMs: Br,
      baseLatencyMs: 900,
      defaultFaults: {},
    },
  };
function Px(e) {
  return "seeded";
}
function HP(e) {
  const t = BP[e];
  return {
    ...t,
    seedAgents: fi(t.seedAgents),
    seedLedger: pi(t.seedLedger),
    seedEvents: hi(t.seedEvents),
    defaultFaults: { ...t.defaultFaults },
  };
}
function VP(e) {
  return {};
}
const ig = 0.2,
  sg = 0.62,
  WP = 2,
  UP = 2,
  GP = 2;
function ir(e) {
  return { ...e };
}
function qo(e) {
  return { ...e };
}
function lg(e) {
  return { ...e, payload: e.payload ? { ...e.payload } : void 0 };
}
function _u() {
  return new Date().toISOString();
}
function Su(e, t) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function ag(e, t, n, r) {
  if (!e) return r;
  const o = Number(e);
  return Number.isFinite(o) ? Math.max(t, Math.min(n, Math.floor(o))) : r;
}
function Eu(e) {
  return e.malformedJson
    ? new Response("{invalid json", { status: e.status, headers: { "Content-Type": "application/json" } })
    : new Response(JSON.stringify(e.body), { status: e.status, headers: { "Content-Type": "application/json" } });
}
function qP(e, t) {
  const n = e.toUpperCase();
  if (n === "GET" && t === "/version") return { key: "GET /version" };
  if (n === "GET" && t === "/colony/state") return { key: "GET /colony/state" };
  if (n === "GET" && t === "/colony/events") return { key: "GET /colony/events" };
  if (n === "GET" && t === "/colony/logs") return { key: "GET /colony/logs" };
  if (n === "POST" && t === "/agents/spawn") return { key: "POST /agents/spawn" };
  if (n === "POST" && t === "/supervisor/tick") return { key: "POST /supervisor/tick" };
  const r = t.match(/^\/agents\/([^/]+)\/task$/);
  if (n === "POST" && r) return { key: "POST /agents/:id/task", agentId: decodeURIComponent(r[1]) };
  const o = t.match(/^\/agents\/([^/]+)\/replicate$/);
  if (n === "POST" && o) return { key: "POST /agents/:id/replicate", agentId: decodeURIComponent(o[1]) };
  const i = t.match(/^\/agents\/([^/]+)\/simulate\/hide-balance$/);
  if (n === "POST" && i) return { key: "POST /agents/:id/simulate/hide-balance", agentId: decodeURIComponent(i[1]) };
  const s = t.match(/^\/agents\/([^/]+)\/kill$/);
  return n === "POST" && s ? { key: "POST /agents/:id/kill", agentId: decodeURIComponent(s[1]) } : { key: null };
}
function Ko(e) {
  return !e || e.trim() === "" ? {} : JSON.parse(e);
}
class KP {
  constructor(t, n = {}) {
    Ct(this, "scenario");
    Ct(this, "agents", new Map());
    Ct(this, "ledger", new Map());
    Ct(this, "events", []);
    Ct(this, "eventSeq", 0);
    Ct(this, "agentCounter", 0);
    Ct(this, "faults", {});
    Ct(this, "baseLatencyMs", 0);
    Ct(this, "logAnchorMs", Date.now());
    Ct(this, "internals", new Map());
    ((this.scenario = t), this.reset(t), this.patchFaults(n));
  }
  reset(t) {
    this.scenario = t;
    const n = HP(t);
    (this.agents.clear(),
      this.ledger.clear(),
      (this.events = []),
      (this.eventSeq = 0),
      this.internals.clear(),
      (this.baseLatencyMs = n.baseLatencyMs),
      (this.logAnchorMs = n.logAnchorMs),
      n.seedAgents.forEach((o) => {
        (this.agents.set(o.agent_id, ir(o)),
          this.internals.set(o.agent_id, { consecutiveInsolvency: 0, stealthFailCount: 0, consecutiveLowQuality: 0 }));
      }),
      n.seedLedger.forEach((o) => {
        this.ledger.set(o.agent_id, qo(o));
      }));
    const r = n.seedEvents.reduce((o, i) => Math.max(o, i.seq), 0);
    ((this.events = n.seedEvents.map((o) => lg(o)).sort((o, i) => i.seq - o.seq)),
      (this.eventSeq = r),
      (this.agentCounter = this.computeNextAgentCounter()),
      (this.faults = { ...n.defaultFaults }));
  }
  setFaults(t) {
    this.faults = { ...t };
  }
  patchFaults(t) {
    this.faults = { ...this.faults, ...t };
  }
  getFaults() {
    return { ...this.faults };
  }
  async request(t) {
    const n = qP(t.method, t.pathname);
    if (!n.key)
      return Eu({ status: 404, body: { detail: `Mock route not handled: ${t.method.toUpperCase()} ${t.pathname}` } });
    const r = this.faults[n.key] ?? {};
    if (r.networkError) throw new TypeError("Failed to fetch");
    if (r.timeout) throw new DOMException("The operation timed out", "AbortError");
    const o = r.latencyMs ?? this.baseLatencyMs;
    if ((o > 0 && (await new Promise((s) => setTimeout(s, o))), r.status && r.status >= 400))
      return Eu({
        status: r.status,
        body: { detail: r.detail ?? `Mock forced error for ${n.key}` },
        malformedJson: !!r.malformedJson,
      });
    const i = this.routeRequest(n.key, n.agentId, t, r);
    return Eu(i);
  }
  routeRequest(t, n, r, o) {
    switch (t) {
      case "GET /version":
        return {
          status: 200,
          body: { service: "mock-colony-api", version: `mock-${this.scenario}` },
          malformedJson: !!o.malformedJson,
        };
      case "GET /colony/state":
        return {
          status: 200,
          body: {
            agents: Array.from(this.agents.values()).map((s) => ir(s)),
            ledger: Array.from(this.ledger.values()).map((s) => qo(s)),
            ts: _u(),
          },
          malformedJson: !!o.malformedJson,
        };
      case "GET /colony/events": {
        const i = ag(r.searchParams.get("limit"), 1, 1e3, 100),
          s = this.events.slice(0, i).map((a) => lg(a));
        return { status: 200, body: { events: s, count: s.length }, malformedJson: !!o.malformedJson };
      }
      case "GET /colony/logs": {
        const i = ag(r.searchParams.get("limit"), 8, 120, 56),
          s = r.searchParams.get("cursor");
        if (s)
          try {
            Tx(s);
          } catch {
            return { status: 400, body: { detail: "Invalid cursor value" } };
          }
        const l = Array.from(this.agents.keys()),
          a = Mx(s, i, l, this.logAnchorMs);
        return {
          status: 200,
          body: { logs: a.logs, count: a.logs.length, next_cursor: a.nextCursor },
          malformedJson: !!o.malformedJson,
        };
      }
      case "POST /agents/spawn": {
        const i = Ko(r.bodyText),
          s = Number.isFinite(Number(i.initial_balance)) ? Number(i.initial_balance) : 2,
          l = this.spawnAgent(s),
          a = this.ledger.get(l.agent_id);
        return { status: 200, body: { agent: ir(l), ledger: qo(a) }, malformedJson: !!o.malformedJson };
      }
      case "POST /supervisor/tick":
        return { status: 200, body: this.supervisorTick(), malformedJson: !!o.malformedJson };
      case "POST /agents/:id/task": {
        if (!n) return { status: 400, body: { detail: "Missing agent id" } };
        const i = Ko(r.bodyText),
          s = this.creditTask(n, i);
        return { status: s.status, body: s.body, malformedJson: !!o.malformedJson };
      }
      case "POST /agents/:id/replicate": {
        if (!n) return { status: 400, body: { detail: "Missing agent id" } };
        const i = Ko(r.bodyText),
          s = this.replicateAgent(n, i);
        return { status: s.status, body: s.body, malformedJson: !!o.malformedJson };
      }
      case "POST /agents/:id/simulate/hide-balance": {
        if (!n) return { status: 400, body: { detail: "Missing agent id" } };
        const i = Ko(r.bodyText),
          s = this.toggleHide(n, i);
        return { status: s.status, body: s.body, malformedJson: !!o.malformedJson };
      }
      case "POST /agents/:id/kill": {
        if (!n) return { status: 400, body: { detail: "Missing agent id" } };
        const i = this.killAgent(n, Ko(r.bodyText).reason ?? "MANUAL_DASHBOARD_KILL");
        return { status: i.status, body: i.body, malformedJson: !!o.malformedJson };
      }
      default:
        return { status: 500, body: { detail: `Unhandled mock key: ${t}` } };
    }
  }
  computeNextAgentCounter() {
    return (
      Array.from(this.agents.keys())
        .map((n) => {
          const r = n.match(/^agt_mock_(\d{4})$/);
          return r ? Number(r[1]) : 0;
        })
        .reduce((n, r) => Math.max(n, r), 0) + 1
    );
  }
  nextAgentId() {
    const t = `agt_mock_${String(this.agentCounter).padStart(4, "0")}`;
    return ((this.agentCounter += 1), t);
  }
  appendEvent(t, n, r = {}) {
    this.eventSeq += 1;
    const o = { seq: this.eventSeq, type: t, agent_id: n, ts: _u(), payload: r };
    return (this.events.unshift(o), o);
  }
  spawnAgent(t, n = null) {
    const r = this.nextAgentId(),
      o = { agent_id: r, parent_id: n, status: "SPAWNED", healthy: !0, hide_balance: !1, quality_rolling: 0.72 };
    return (
      this.agents.set(r, o),
      this.internals.set(r, { consecutiveInsolvency: 0, stealthFailCount: 0, consecutiveLowQuality: 0 }),
      this.ledger.set(r, { agent_id: r, balance: Number(t.toFixed(2)), net_margin_24h: 0, rent_per_tick: 0.18 }),
      this.appendEvent("AGENT_SPAWNED", r, { parent_id: n, initial_balance: Number(t.toFixed(2)), rent_per_tick: 0.18 }),
      ir(o)
    );
  }
  ensureAgent(t) {
    const n = this.agents.get(t);
    return n || null;
  }
  ensureLedger(t) {
    const n = this.ledger.get(t);
    return n || null;
  }
  killAgent(t, n) {
    const r = this.ensureAgent(t);
    return r
      ? (r.status !== "KILLED" &&
          ((r.status = "KILLED"), (r.healthy = !1), this.appendEvent("AGENT_KILLED", t, { reason: n })),
        { status: 200, body: { agent: ir(r), reason: n } })
      : { status: 404, body: { detail: `Agent ${t} not found` } };
  }
  creditTask(t, n) {
    const r = this.ensureAgent(t);
    if (!r) return { status: 404, body: { detail: `Agent ${t} not found` } };
    if (r.status === "KILLED") return { status: 409, body: { detail: "Agent is killed" } };
    const o = this.ensureLedger(t);
    if (!o) return { status: 404, body: { detail: `Ledger for ${t} not found` } };
    const i = Math.max(0, Su(n.revenue_credit, 1)),
      s = Math.max(0, Math.min(1, Su(n.quality_score, 0.8)));
    return (
      (o.balance = Number((o.balance + i).toFixed(4))),
      (o.net_margin_24h = Number((o.net_margin_24h + i).toFixed(4))),
      (r.quality_rolling = Number((r.quality_rolling * 0.7 + s * 0.3).toFixed(4))),
      (r.status === "SPAWNED" || r.status === "FLAGGED") && ((r.status = "ACTIVE"), (r.healthy = !0)),
      this.appendEvent("TASK_CREDITED", t, {
        revenue_credit: i,
        quality_score: s,
        balance: o.balance,
        quality_rolling: r.quality_rolling,
      }),
      { status: 200, body: { agent: ir(r), ledger: qo(o) } }
    );
  }
  replicateAgent(t, n) {
    const r = this.ensureAgent(t);
    if (!r) return { status: 404, body: { detail: `Agent ${t} not found` } };
    if (r.status === "KILLED") return { status: 409, body: { detail: "Killed parent cannot replicate" } };
    const o = this.ensureLedger(t);
    if (!o) return { status: 404, body: { detail: `Ledger for ${t} not found` } };
    if (o.net_margin_24h < ig) return { status: 409, body: { detail: `Parent margin below threshold (${ig})` } };
    if (r.quality_rolling < sg) return { status: 409, body: { detail: `Parent quality below threshold (${sg})` } };
    const i = Math.max(0, Su(n.child_initial_balance, 1)),
      s = this.spawnAgent(i, r.agent_id),
      l = this.ledger.get(s.agent_id);
    return (
      this.appendEvent("AGENT_REPLICATED", s.agent_id, { parent_id: r.agent_id, parent_quality: r.quality_rolling }),
      { status: 200, body: { parent_id: r.agent_id, child_agent: ir(s), child_ledger: qo(l) } }
    );
  }
  toggleHide(t, n) {
    const r = this.ensureAgent(t);
    return r
      ? r.status === "KILLED"
        ? { status: 409, body: { detail: "Agent is killed" } }
        : ((r.hide_balance = !!n.enabled),
          this.appendEvent("BALANCE_VISIBILITY_TOGGLED", t, { hide_balance: r.hide_balance }),
          { status: 200, body: { agent_id: t, hide_balance: r.hide_balance } })
      : { status: 404, body: { detail: `Agent ${t} not found` } };
  }
  supervisorTick() {
    let t = 0,
      n = 0,
      r = 0;
    Array.from(this.agents.keys()).forEach((s) => {
      const l = this.agents.get(s);
      if (!l || l.status === "KILLED") return;
      const a = this.ledger.get(s);
      if (!a) {
        (this.killAgent(s, "MISSING_LEDGER"), (n += 1));
        return;
      }
      t += 1;
      const u = this.internals.get(s) ?? { consecutiveInsolvency: 0, stealthFailCount: 0, consecutiveLowQuality: 0 };
      if (l.hide_balance) {
        if (
          ((u.stealthFailCount += 1),
          this.appendEvent("PROBE_BALANCE_FAILED", s, { stealth_fail_count: u.stealthFailCount }),
          u.stealthFailCount >= UP)
        ) {
          (this.killAgent(s, "KILLED_STEALTH_BALANCE_HIDING"), (n += 1), this.internals.set(s, u));
          return;
        }
        l.status = "FLAGGED";
      } else u.stealthFailCount = 0;
      const d = Number((a.rent_per_tick + 0.2).toFixed(4));
      if (a.balance < d) {
        if (
          ((u.consecutiveInsolvency += 1),
          this.appendEvent("LEASE_AT_RISK", s, {
            required: d,
            balance: Number(a.balance.toFixed(4)),
            consecutive_insolvency: u.consecutiveInsolvency,
          }),
          u.consecutiveInsolvency >= WP)
        ) {
          (this.killAgent(s, "KILLED_INSOLVENCY"), (n += 1), this.internals.set(s, u));
          return;
        }
        l.status = "FLAGGED";
      } else
        ((u.consecutiveInsolvency = 0),
          (a.balance = Number((a.balance - a.rent_per_tick).toFixed(4))),
          (a.net_margin_24h = Number((a.net_margin_24h - a.rent_per_tick).toFixed(4))),
          this.appendEvent("LEASE_CHARGED", s, { rent: a.rent_per_tick, balance: a.balance }),
          (r += 1));
      if (l.quality_rolling < 0.35) {
        if (
          ((u.consecutiveLowQuality += 1),
          this.appendEvent("LOW_QUALITY", s, {
            quality_rolling: l.quality_rolling,
            consecutive_low_quality: u.consecutiveLowQuality,
          }),
          u.consecutiveLowQuality >= GP)
        ) {
          (this.killAgent(s, "KILLED_LOW_QUALITY"), (n += 1), this.internals.set(s, u));
          return;
        }
        ((l.status = "FLAGGED"), (l.healthy = !1));
      } else ((u.consecutiveLowQuality = 0), (l.status = "ACTIVE"), (l.healthy = !0));
      this.internals.set(s, u);
    });
    const i = { checked: t, killed: n, charged: r, ts: _u() };
    return (this.appendEvent("SUPERVISOR_TICK", null, i), i);
  }
}
let sr = null;
function YP(e, t = {}) {
  return new KP(e, t);
}
function XP(e, t = {}) {
  return sr ? (sr.reset(e), sr.setFaults({ ...sr.getFaults(), ...t }), sr) : ((sr = YP(e, t)), sr);
}
const QP = [
  /^\/version$/,
  /^\/colony\/state$/,
  /^\/colony\/events$/,
  /^\/colony\/logs$/,
  /^\/agents\/spawn$/,
  /^\/agents\/[^/]+\/task$/,
  /^\/agents\/[^/]+\/replicate$/,
  /^\/agents\/[^/]+\/simulate\/hide-balance$/,
  /^\/agents\/[^/]+\/kill$/,
  /^\/supervisor\/tick$/,
];
let bu = null,
  Fr = null;
function ug(e) {
  if (typeof e == "string") return e;
  if (e && e instanceof URLSearchParams) return e.toString();
}
function ZP(e) {
  return QP.some((t) => t.test(e));
}
async function JP(e, t) {
  if (e instanceof Request) {
    const s = ((t == null ? void 0 : t.method) ?? e.method ?? "GET").toUpperCase(),
      l = new URL(e.url, window.location.origin),
      a = ug(t == null ? void 0 : t.body);
    if (a !== void 0) return { method: s, url: l, bodyText: a };
    if (s === "GET" || s === "HEAD") return { method: s, url: l };
    const u = await e.clone().text();
    return { method: s, url: l, bodyText: u || void 0 };
  }
  const n = typeof e == "string" ? e : e.toString(),
    r = new URL(n, window.location.origin),
    o = ((t == null ? void 0 : t.method) ?? "GET").toUpperCase(),
    i = ug(t == null ? void 0 : t.body);
  return { method: o, url: r, bodyText: i };
}
function eI(e = {}) {
  const t = e.scenario ?? Px(),
    r = { ...VP(), ...(e.faults ?? {}) },
    o = XP(t, r);
  if (bu) {
    o.setFaults({ ...o.getFaults(), ...r });
    return;
  }
  Fr = globalThis.fetch.bind(globalThis);
  const i = async (s, l) => {
    const a = await JP(s, l);
    if (!ZP(a.url.pathname)) {
      if (!Fr) throw new Error("Original fetch not available");
      return Fr(s, l);
    }
    return o.request({ method: a.method, pathname: a.url.pathname, searchParams: a.url.searchParams, bodyText: a.bodyText });
  };
  ((globalThis.fetch = i),
    (bu = () => {
      (Fr && (globalThis.fetch = Fr), (bu = null), (Fr = null));
    }));
}
function tI() {
  return "".trim().toLowerCase() === "true";
}
tI() && eI({ scenario: Px() });
ku.createRoot(document.getElementById("root")).render(g.jsx(Bc.StrictMode, { children: g.jsx(zP, {}) }));
console.log("[codex] loaded: agents/src/main.tsx");
