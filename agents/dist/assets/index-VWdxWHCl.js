function jd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o && Object.defineProperty(e, l, o.get ? o : { enumerable: !0, get: () => r[l] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function Pd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $u = { exports: {} },
  zl = {},
  Fu = { exports: {} },
  $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yr = Symbol.for("react.element"),
  zd = Symbol.for("react.portal"),
  Td = Symbol.for("react.fragment"),
  Ld = Symbol.for("react.strict_mode"),
  Rd = Symbol.for("react.profiler"),
  Md = Symbol.for("react.provider"),
  Id = Symbol.for("react.context"),
  Od = Symbol.for("react.forward_ref"),
  Ad = Symbol.for("react.suspense"),
  Dd = Symbol.for("react.memo"),
  $d = Symbol.for("react.lazy"),
  vs = Symbol.iterator;
function Fd(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (vs && e[vs]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var Uu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Vu = Object.assign,
  Bu = {};
function _n(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Bu), (this.updater = n || Uu));
}
_n.prototype.isReactComponent = {};
_n.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
_n.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Wu() {}
Wu.prototype = _n.prototype;
function yi(e, t, n) {
  ((this.props = e), (this.context = t), (this.refs = Bu), (this.updater = n || Uu));
}
var xi = (yi.prototype = new Wu());
xi.constructor = yi;
Vu(xi, _n.prototype);
xi.isPureReactComponent = !0;
var ys = Array.isArray,
  bu = Object.prototype.hasOwnProperty,
  wi = { current: null },
  Hu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Qu(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t))
      bu.call(t, r) && !Hu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), a = 0; a < s; a++) u[a] = arguments[a + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: yr, type: e, key: o, ref: i, props: l, _owner: wi.current };
}
function Ud(e, t) {
  return { $$typeof: yr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ki(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yr;
}
function Vd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var xs = /\/+/g;
function Gl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Vd("" + e.key) : t.toString(36);
}
function Wr(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case yr:
          case zd:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + Gl(i, 0) : r),
      ys(l)
        ? ((n = ""),
          e != null && (n = e.replace(xs, "$&/") + "/"),
          Wr(l, t, n, "", function (a) {
            return a;
          }))
        : l != null &&
          (ki(l) && (l = Ud(l, n + (!l.key || (i && i.key === l.key) ? "" : ("" + l.key).replace(xs, "$&/") + "/") + e)),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), ys(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var u = r + Gl(o, s);
      i += Wr(o, t, n, u, l);
    }
  else if (((u = Fd(e)), typeof u == "function"))
    for (e = u.call(e), s = 0; !(o = e.next()).done; ) ((o = o.value), (u = r + Gl(o, s++)), (i += Wr(o, t, n, u, l)));
  else if (o === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return i;
}
function Er(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Wr(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function Bd(e) {
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
var ye = { current: null },
  br = { transition: null },
  Wd = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: br, ReactCurrentOwner: wi };
function Gu() {
  throw Error("act(...) is not supported in production builds of React.");
}
$.Children = {
  map: Er,
  forEach: function (e, t, n) {
    Er(
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
      Er(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Er(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ki(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
$.Component = _n;
$.Fragment = Td;
$.Profiler = Rd;
$.PureComponent = yi;
$.StrictMode = Ld;
$.Suspense = Ad;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wd;
$.act = Gu;
$.cloneElement = function (e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Vu({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = wi.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (u in t) bu.call(t, u) && !Hu.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var a = 0; a < u; a++) s[a] = arguments[a + 2];
    r.children = s;
  }
  return { $$typeof: yr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
$.createContext = function (e) {
  return (
    (e = {
      $$typeof: Id,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Md, _context: e }),
    (e.Consumer = e)
  );
};
$.createElement = Qu;
$.createFactory = function (e) {
  var t = Qu.bind(null, e);
  return ((t.type = e), t);
};
$.createRef = function () {
  return { current: null };
};
$.forwardRef = function (e) {
  return { $$typeof: Od, render: e };
};
$.isValidElement = ki;
$.lazy = function (e) {
  return { $$typeof: $d, _payload: { _status: -1, _result: e }, _init: Bd };
};
$.memo = function (e, t) {
  return { $$typeof: Dd, type: e, compare: t === void 0 ? null : t };
};
$.startTransition = function (e) {
  var t = br.transition;
  br.transition = {};
  try {
    e();
  } finally {
    br.transition = t;
  }
};
$.unstable_act = Gu;
$.useCallback = function (e, t) {
  return ye.current.useCallback(e, t);
};
$.useContext = function (e) {
  return ye.current.useContext(e);
};
$.useDebugValue = function () {};
$.useDeferredValue = function (e) {
  return ye.current.useDeferredValue(e);
};
$.useEffect = function (e, t) {
  return ye.current.useEffect(e, t);
};
$.useId = function () {
  return ye.current.useId();
};
$.useImperativeHandle = function (e, t, n) {
  return ye.current.useImperativeHandle(e, t, n);
};
$.useInsertionEffect = function (e, t) {
  return ye.current.useInsertionEffect(e, t);
};
$.useLayoutEffect = function (e, t) {
  return ye.current.useLayoutEffect(e, t);
};
$.useMemo = function (e, t) {
  return ye.current.useMemo(e, t);
};
$.useReducer = function (e, t, n) {
  return ye.current.useReducer(e, t, n);
};
$.useRef = function (e) {
  return ye.current.useRef(e);
};
$.useState = function (e) {
  return ye.current.useState(e);
};
$.useSyncExternalStore = function (e, t, n) {
  return ye.current.useSyncExternalStore(e, t, n);
};
$.useTransition = function () {
  return ye.current.useTransition();
};
$.version = "18.3.1";
Fu.exports = $;
var x = Fu.exports;
const Ku = Pd(x),
  Yu = jd({ __proto__: null, default: Ku }, [x]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bd = x,
  Hd = Symbol.for("react.element"),
  Qd = Symbol.for("react.fragment"),
  Gd = Object.prototype.hasOwnProperty,
  Kd = bd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Yd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xu(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  (n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref));
  for (r in t) Gd.call(t, r) && !Yd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Hd, type: e, key: o, ref: i, props: l, _owner: Kd.current };
}
zl.Fragment = Qd;
zl.jsx = Xu;
zl.jsxs = Xu;
$u.exports = zl;
var d = $u.exports,
  Co = {},
  Zu = { exports: {} },
  ze = {},
  Ju = { exports: {} },
  qu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(C, L) {
    var R = C.length;
    C.push(L);
    e: for (; 0 < R; ) {
      var M = (R - 1) >>> 1,
        U = C[M];
      if (0 < l(U, L)) ((C[M] = L), (C[R] = U), (R = M));
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var L = C[0],
      R = C.pop();
    if (R !== L) {
      C[0] = R;
      e: for (var M = 0, U = C.length, Cr = U >>> 1; M < Cr; ) {
        var Mt = 2 * (M + 1) - 1,
          Ql = C[Mt],
          It = Mt + 1,
          Nr = C[It];
        if (0 > l(Ql, R))
          It < U && 0 > l(Nr, Ql) ? ((C[M] = Nr), (C[It] = R), (M = It)) : ((C[M] = Ql), (C[Mt] = R), (M = Mt));
        else if (It < U && 0 > l(Nr, R)) ((C[M] = Nr), (C[It] = R), (M = It));
        else break e;
      }
    }
    return L;
  }
  function l(C, L) {
    var R = C.sortIndex - L.sortIndex;
    return R !== 0 ? R : C.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var u = [],
    a = [],
    h = 1,
    g = null,
    m = 3,
    y = !1,
    k = !1,
    v = !1,
    T = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(C) {
    for (var L = n(a); L !== null; ) {
      if (L.callback === null) r(a);
      else if (L.startTime <= C) (r(a), (L.sortIndex = L.expirationTime), t(u, L));
      else break;
      L = n(a);
    }
  }
  function w(C) {
    if (((v = !1), p(C), !k))
      if (n(u) !== null) ((k = !0), _(E));
      else {
        var L = n(a);
        L !== null && Q(w, L.startTime - C);
      }
  }
  function E(C, L) {
    ((k = !1), v && ((v = !1), f(N), (N = -1)), (y = !0));
    var R = m;
    try {
      for (p(L), g = n(u); g !== null && (!(g.expirationTime > L) || (C && !ne())); ) {
        var M = g.callback;
        if (typeof M == "function") {
          ((g.callback = null), (m = g.priorityLevel));
          var U = M(g.expirationTime <= L);
          ((L = e.unstable_now()), typeof U == "function" ? (g.callback = U) : g === n(u) && r(u), p(L));
        } else r(u);
        g = n(u);
      }
      if (g !== null) var Cr = !0;
      else {
        var Mt = n(a);
        (Mt !== null && Q(w, Mt.startTime - L), (Cr = !1));
      }
      return Cr;
    } finally {
      ((g = null), (m = R), (y = !1));
    }
  }
  var P = !1,
    z = null,
    N = -1,
    I = 5,
    O = -1;
  function ne() {
    return !(e.unstable_now() - O < I);
  }
  function D() {
    if (z !== null) {
      var C = e.unstable_now();
      O = C;
      var L = !0;
      try {
        L = z(!0, C);
      } finally {
        L ? ue() : ((P = !1), (z = null));
      }
    } else P = !1;
  }
  var ue;
  if (typeof c == "function")
    ue = function () {
      c(D);
    };
  else if (typeof MessageChannel < "u") {
    var De = new MessageChannel(),
      Rt = De.port2;
    ((De.port1.onmessage = D),
      (ue = function () {
        Rt.postMessage(null);
      }));
  } else
    ue = function () {
      T(D, 0);
    };
  function _(C) {
    ((z = C), P || ((P = !0), ue()));
  }
  function Q(C, L) {
    N = T(function () {
      C(e.unstable_now());
    }, L);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (C) {
      C.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || y || ((k = !0), _(E));
    }),
    (e.unstable_forceFrameRate = function (C) {
      0 > C || 125 < C
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (I = 0 < C ? Math.floor(1e3 / C) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (C) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = m;
      }
      var R = m;
      m = L;
      try {
        return C();
      } finally {
        m = R;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (C, L) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var R = m;
      m = C;
      try {
        return L();
      } finally {
        m = R;
      }
    }),
    (e.unstable_scheduleCallback = function (C, L, R) {
      var M = e.unstable_now();
      switch (
        (typeof R == "object" && R !== null ? ((R = R.delay), (R = typeof R == "number" && 0 < R ? M + R : M)) : (R = M), C)
      ) {
        case 1:
          var U = -1;
          break;
        case 2:
          U = 250;
          break;
        case 5:
          U = 1073741823;
          break;
        case 4:
          U = 1e4;
          break;
        default:
          U = 5e3;
      }
      return (
        (U = R + U),
        (C = { id: h++, callback: L, priorityLevel: C, startTime: R, expirationTime: U, sortIndex: -1 }),
        R > M
          ? ((C.sortIndex = R), t(a, C), n(u) === null && C === n(a) && (v ? (f(N), (N = -1)) : (v = !0), Q(w, R - M)))
          : ((C.sortIndex = U), t(u, C), k || y || ((k = !0), _(E))),
        C
      );
    }),
    (e.unstable_shouldYield = ne),
    (e.unstable_wrapCallback = function (C) {
      var L = m;
      return function () {
        var R = m;
        m = L;
        try {
          return C.apply(this, arguments);
        } finally {
          m = R;
        }
      };
    }));
})(qu);
Ju.exports = qu;
var Xd = Ju.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zd = x,
  Pe = Xd;
function S(e) {
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
var ea = new Set(),
  tr = {};
function Gt(e, t) {
  (xn(e, t), xn(e + "Capture", t));
}
function xn(e, t) {
  for (tr[e] = t, e = 0; e < t.length; e++) ea.add(t[e]);
}
var lt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
  No = Object.prototype.hasOwnProperty,
  Jd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ws = {},
  ks = {};
function qd(e) {
  return No.call(ks, e) ? !0 : No.call(ws, e) ? !1 : Jd.test(e) ? (ks[e] = !0) : ((ws[e] = !0), !1);
}
function ef(e, t, n, r) {
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
function tf(e, t, n, r) {
  if (t === null || typeof t > "u" || ef(e, t, n, r)) return !0;
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
function xe(e, t, n, r, l, o, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i));
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    se[e] = new xe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  se[t] = new xe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  se[e] = new xe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  se[e] = new xe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    se[e] = new xe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  se[e] = new xe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  se[e] = new xe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  se[e] = new xe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  se[e] = new xe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Si = /[\-:]([a-z])/g;
function Ci(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Si, Ci);
    se[t] = new xe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
  var t = e.replace(Si, Ci);
  se[t] = new xe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Si, Ci);
  se[t] = new xe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  se[e] = new xe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new xe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
  se[e] = new xe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ni(e, t, n, r) {
  var l = se.hasOwnProperty(t) ? se[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
    (tf(t, n, l, r) && (n = null),
    r || l === null
      ? qd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ut = Zd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  _r = Symbol.for("react.element"),
  qt = Symbol.for("react.portal"),
  en = Symbol.for("react.fragment"),
  Ei = Symbol.for("react.strict_mode"),
  Eo = Symbol.for("react.profiler"),
  ta = Symbol.for("react.provider"),
  na = Symbol.for("react.context"),
  _i = Symbol.for("react.forward_ref"),
  _o = Symbol.for("react.suspense"),
  jo = Symbol.for("react.suspense_list"),
  ji = Symbol.for("react.memo"),
  pt = Symbol.for("react.lazy"),
  ra = Symbol.for("react.offscreen"),
  Ss = Symbol.iterator;
function Tn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ss && e[Ss]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var X = Object.assign,
  Kl;
function Un(e) {
  if (Kl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Kl = (t && t[1]) || "";
    }
  return (
    `
` +
    Kl +
    e
  );
}
var Yl = !1;
function Xl(e, t) {
  if (!e || Yl) return "";
  Yl = !0;
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
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var l = a.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          s = o.length - 1;
        1 <= i && 0 <= s && l[i] !== o[s];
      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (l[i] !== o[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || l[i] !== o[s])) {
                var u =
                  `
` + l[i].replace(" at new ", " at ");
                return (e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u);
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    ((Yl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Un(e) : "";
}
function nf(e) {
  switch (e.tag) {
    case 5:
      return Un(e.type);
    case 16:
      return Un("Lazy");
    case 13:
      return Un("Suspense");
    case 19:
      return Un("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Xl(e.type, !1)), e);
    case 11:
      return ((e = Xl(e.type.render, !1)), e);
    case 1:
      return ((e = Xl(e.type, !0)), e);
    default:
      return "";
  }
}
function Po(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case en:
      return "Fragment";
    case qt:
      return "Portal";
    case Eo:
      return "Profiler";
    case Ei:
      return "StrictMode";
    case _o:
      return "Suspense";
    case jo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case na:
        return (e.displayName || "Context") + ".Consumer";
      case ta:
        return (e._context.displayName || "Context") + ".Provider";
      case _i:
        var t = e.render;
        return (
          (e = e.displayName),
          e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ji:
        return ((t = e.displayName || null), t !== null ? t : Po(e.type) || "Memo");
      case pt:
        ((t = e._payload), (e = e._init));
        try {
          return Po(e(t));
        } catch {}
    }
  return null;
}
function rf(e) {
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
      return Po(t);
    case 8:
      return t === Ei ? "StrictMode" : "Mode";
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
function jt(e) {
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
function la(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function lf(e) {
  var t = la(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          ((r = "" + i), o.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function jr(e) {
  e._valueTracker || (e._valueTracker = lf(e));
}
function oa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (e && (r = la(e) ? (e.checked ? "true" : "false") : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1);
}
function tl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function zo(e, t) {
  var n = t.checked;
  return X({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Cs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = jt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
    }));
}
function ia(e, t) {
  ((t = t.checked), t != null && Ni(e, "checked", t, !1));
}
function To(e, t) {
  ia(e, t);
  var n = jt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value") ? Lo(e, t.type, n) : t.hasOwnProperty("defaultValue") && Lo(e, t.type, jt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
}
function Ns(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
    ((t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t));
  }
  ((n = e.name), n !== "" && (e.name = ""), (e.defaultChecked = !!e._wrapperState.initialChecked), n !== "" && (e.name = n));
}
function Lo(e, t, n) {
  (t !== "number" || tl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Vn = Array.isArray;
function fn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + jt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ro(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Es(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(S(92));
      if (Vn(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: jt(n) };
}
function sa(e, t) {
  var n = jt(t.value),
    r = jt(t.defaultValue);
  (n != null &&
    ((n = "" + n), n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function _s(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ua(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Mo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? ua(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Pr,
  aa = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (
        Pr = Pr || document.createElement("div"),
          Pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Pr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function nr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Qn = {
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
  of = ["Webkit", "ms", "Moz", "O"];
Object.keys(Qn).forEach(function (e) {
  of.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Qn[t] = Qn[e]));
  });
});
function ca(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Qn.hasOwnProperty(e) && Qn[e])
      ? ("" + t).trim()
      : t + "px";
}
function da(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = ca(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var sf = X(
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
function Io(e, t) {
  if (t) {
    if (sf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62));
  }
}
function Oo(e, t) {
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
var Ao = null;
function Pi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Do = null,
  pn = null,
  mn = null;
function js(e) {
  if ((e = kr(e))) {
    if (typeof Do != "function") throw Error(S(280));
    var t = e.stateNode;
    t && ((t = Il(t)), Do(e.stateNode, e.type, t));
  }
}
function fa(e) {
  pn ? (mn ? mn.push(e) : (mn = [e])) : (pn = e);
}
function pa() {
  if (pn) {
    var e = pn,
      t = mn;
    if (((mn = pn = null), js(e), t)) for (e = 0; e < t.length; e++) js(t[e]);
  }
}
function ma(e, t) {
  return e(t);
}
function ha() {}
var Zl = !1;
function ga(e, t, n) {
  if (Zl) return e(t, n);
  Zl = !0;
  try {
    return ma(e, t, n);
  } finally {
    ((Zl = !1), (pn !== null || mn !== null) && (ha(), pa()));
  }
}
function rr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Il(n);
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
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n;
}
var $o = !1;
if (lt)
  try {
    var Ln = {};
    (Object.defineProperty(Ln, "passive", {
      get: function () {
        $o = !0;
      },
    }),
      window.addEventListener("test", Ln, Ln),
      window.removeEventListener("test", Ln, Ln));
  } catch {
    $o = !1;
  }
function uf(e, t, n, r, l, o, i, s, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (h) {
    this.onError(h);
  }
}
var Gn = !1,
  nl = null,
  rl = !1,
  Fo = null,
  af = {
    onError: function (e) {
      ((Gn = !0), (nl = e));
    },
  };
function cf(e, t, n, r, l, o, i, s, u) {
  ((Gn = !1), (nl = null), uf.apply(af, arguments));
}
function df(e, t, n, r, l, o, i, s, u) {
  if ((cf.apply(this, arguments), Gn)) {
    if (Gn) {
      var a = nl;
      ((Gn = !1), (nl = null));
    } else throw Error(S(198));
    rl || ((rl = !0), (Fo = a));
  }
}
function Kt(e) {
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
function va(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
  }
  return null;
}
function Ps(e) {
  if (Kt(e) !== e) throw Error(S(188));
}
function ff(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Kt(e)), t === null)) throw Error(S(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return (Ps(l), e);
        if (o === r) return (Ps(l), t);
        o = o.sibling;
      }
      throw Error(S(188));
    }
    if (n.return !== r.return) ((n = l), (r = o));
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          ((i = !0), (n = l), (r = o));
          break;
        }
        if (s === r) {
          ((i = !0), (r = l), (n = o));
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            ((i = !0), (n = o), (r = l));
            break;
          }
          if (s === r) {
            ((i = !0), (r = o), (n = l));
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(S(189));
      }
    }
    if (n.alternate !== r) throw Error(S(190));
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function ya(e) {
  return ((e = ff(e)), e !== null ? xa(e) : null);
}
function xa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = xa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var wa = Pe.unstable_scheduleCallback,
  zs = Pe.unstable_cancelCallback,
  pf = Pe.unstable_shouldYield,
  mf = Pe.unstable_requestPaint,
  J = Pe.unstable_now,
  hf = Pe.unstable_getCurrentPriorityLevel,
  zi = Pe.unstable_ImmediatePriority,
  ka = Pe.unstable_UserBlockingPriority,
  ll = Pe.unstable_NormalPriority,
  gf = Pe.unstable_LowPriority,
  Sa = Pe.unstable_IdlePriority,
  Tl = null,
  Xe = null;
function vf(e) {
  if (Xe && typeof Xe.onCommitFiberRoot == "function")
    try {
      Xe.onCommitFiberRoot(Tl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Be = Math.clz32 ? Math.clz32 : wf,
  yf = Math.log,
  xf = Math.LN2;
function wf(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((yf(e) / xf) | 0)) | 0);
}
var zr = 64,
  Tr = 4194304;
function Bn(e) {
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
function ol(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? (r = Bn(s)) : ((o &= i), o !== 0 && (r = Bn(o)));
  } else ((i = n & ~l), i !== 0 ? (r = Bn(i)) : o !== 0 && (r = Bn(o)));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))) return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; ) ((n = 31 - Be(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function kf(e, t) {
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
function Sf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Be(o),
      s = 1 << i,
      u = l[i];
    (u === -1 ? (!(s & n) || s & r) && (l[i] = kf(s, t)) : u <= t && (e.expiredLanes |= s), (o &= ~s));
  }
}
function Uo(e) {
  return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
}
function Ca() {
  var e = zr;
  return ((zr <<= 1), !(zr & 4194240) && (zr = 64), e);
}
function Jl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Be(t)),
    (e[t] = n));
}
function Cf(e, t) {
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
    var l = 31 - Be(n),
      o = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o));
  }
}
function Ti(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Be(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var V = 0;
function Na(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
}
var Ea,
  Li,
  _a,
  ja,
  Pa,
  Vo = !1,
  Lr = [],
  xt = null,
  wt = null,
  kt = null,
  lr = new Map(),
  or = new Map(),
  ht = [],
  Nf =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Ts(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      xt = null;
      break;
    case "dragenter":
    case "dragleave":
      wt = null;
      break;
    case "mouseover":
    case "mouseout":
      kt = null;
      break;
    case "pointerover":
    case "pointerout":
      lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      or.delete(t.pointerId);
  }
}
function Rn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }),
      t !== null && ((t = kr(t)), t !== null && Li(t)),
      e)
    : ((e.eventSystemFlags |= r), (t = e.targetContainers), l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Ef(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ((xt = Rn(xt, e, t, n, r, l)), !0);
    case "dragenter":
      return ((wt = Rn(wt, e, t, n, r, l)), !0);
    case "mouseover":
      return ((kt = Rn(kt, e, t, n, r, l)), !0);
    case "pointerover":
      var o = l.pointerId;
      return (lr.set(o, Rn(lr.get(o) || null, e, t, n, r, l)), !0);
    case "gotpointercapture":
      return ((o = l.pointerId), or.set(o, Rn(or.get(o) || null, e, t, n, r, l)), !0);
  }
  return !1;
}
function za(e) {
  var t = Dt(e.target);
  if (t !== null) {
    var n = Kt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = va(n)), t !== null)) {
          ((e.blockedOn = t),
            Pa(e.priority, function () {
              _a(n);
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
function Hr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Bo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Ao = r), n.target.dispatchEvent(r), (Ao = null));
    } else return ((t = kr(n)), t !== null && Li(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Ls(e, t, n) {
  Hr(e) && n.delete(t);
}
function _f() {
  ((Vo = !1),
    xt !== null && Hr(xt) && (xt = null),
    wt !== null && Hr(wt) && (wt = null),
    kt !== null && Hr(kt) && (kt = null),
    lr.forEach(Ls),
    or.forEach(Ls));
}
function Mn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null), Vo || ((Vo = !0), Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority, _f)));
}
function ir(e) {
  function t(l) {
    return Mn(l, e);
  }
  if (0 < Lr.length) {
    Mn(Lr[0], e);
    for (var n = 1; n < Lr.length; n++) {
      var r = Lr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    xt !== null && Mn(xt, e), wt !== null && Mn(wt, e), kt !== null && Mn(kt, e), lr.forEach(t), or.forEach(t), n = 0;
    n < ht.length;
    n++
  )
    ((r = ht[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < ht.length && ((n = ht[0]), n.blockedOn === null); ) (za(n), n.blockedOn === null && ht.shift());
}
var hn = ut.ReactCurrentBatchConfig,
  il = !0;
function jf(e, t, n, r) {
  var l = V,
    o = hn.transition;
  hn.transition = null;
  try {
    ((V = 1), Ri(e, t, n, r));
  } finally {
    ((V = l), (hn.transition = o));
  }
}
function Pf(e, t, n, r) {
  var l = V,
    o = hn.transition;
  hn.transition = null;
  try {
    ((V = 4), Ri(e, t, n, r));
  } finally {
    ((V = l), (hn.transition = o));
  }
}
function Ri(e, t, n, r) {
  if (il) {
    var l = Bo(e, t, n, r);
    if (l === null) (uo(e, t, r, sl, n), Ts(e, r));
    else if (Ef(l, e, t, n, r)) r.stopPropagation();
    else if ((Ts(e, r), t & 4 && -1 < Nf.indexOf(e))) {
      for (; l !== null; ) {
        var o = kr(l);
        if ((o !== null && Ea(o), (o = Bo(e, t, n, r)), o === null && uo(e, t, r, sl, n), o === l)) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else uo(e, t, r, null, n);
  }
}
var sl = null;
function Bo(e, t, n, r) {
  if (((sl = null), (e = Pi(r)), (e = Dt(e)), e !== null))
    if (((t = Kt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = va(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((sl = e), null);
}
function Ta(e) {
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
      switch (hf()) {
        case zi:
          return 1;
        case ka:
          return 4;
        case ll:
        case gf:
          return 16;
        case Sa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var vt = null,
  Mi = null,
  Qr = null;
function La() {
  if (Qr) return Qr;
  var e,
    t = Mi,
    n = t.length,
    r,
    l = "value" in vt ? vt.value : vt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Qr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Gr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Rr() {
  return !0;
}
function Rs() {
  return !1;
}
function Te(e) {
  function t(n, r, l, o, i) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null));
    for (var s in e) e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Rr : Rs),
      (this.isPropagationStopped = Rs),
      this
    );
  }
  return (
    X(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Rr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Rr));
      },
      persist: function () {},
      isPersistent: Rr,
    }),
    t
  );
}
var jn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ii = Te(jn),
  wr = X({}, jn, { view: 0, detail: 0 }),
  zf = Te(wr),
  ql,
  eo,
  In,
  Ll = X({}, wr, {
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
    getModifierState: Oi,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0 ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== In &&
            (In && e.type === "mousemove" ? ((ql = e.screenX - In.screenX), (eo = e.screenY - In.screenY)) : (eo = ql = 0),
            (In = e)),
          ql);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : eo;
    },
  }),
  Ms = Te(Ll),
  Tf = X({}, Ll, { dataTransfer: 0 }),
  Lf = Te(Tf),
  Rf = X({}, wr, { relatedTarget: 0 }),
  to = Te(Rf),
  Mf = X({}, jn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  If = Te(Mf),
  Of = X({}, jn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Af = Te(Of),
  Df = X({}, jn, { data: 0 }),
  Is = Te(Df),
  $f = {
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
  Ff = {
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
  Uf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Vf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Uf[e]) ? !!t[e] : !1;
}
function Oi() {
  return Vf;
}
var Bf = X({}, wr, {
    key: function (e) {
      if (e.key) {
        var t = $f[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Gr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Ff[e.keyCode] || "Unidentified"
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
    getModifierState: Oi,
    charCode: function (e) {
      return e.type === "keypress" ? Gr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress" ? Gr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
  }),
  Wf = Te(Bf),
  bf = X({}, Ll, {
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
  Os = Te(bf),
  Hf = X({}, wr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Oi,
  }),
  Qf = Te(Hf),
  Gf = X({}, jn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Kf = Te(Gf),
  Yf = X({}, Ll, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Xf = Te(Yf),
  Zf = [9, 13, 27, 32],
  Ai = lt && "CompositionEvent" in window,
  Kn = null;
lt && "documentMode" in document && (Kn = document.documentMode);
var Jf = lt && "TextEvent" in window && !Kn,
  Ra = lt && (!Ai || (Kn && 8 < Kn && 11 >= Kn)),
  As = " ",
  Ds = !1;
function Ma(e, t) {
  switch (e) {
    case "keyup":
      return Zf.indexOf(t.keyCode) !== -1;
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
function Ia(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var tn = !1;
function qf(e, t) {
  switch (e) {
    case "compositionend":
      return Ia(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ds = !0), As);
    case "textInput":
      return ((e = t.data), e === As && Ds ? null : e);
    default:
      return null;
  }
}
function ep(e, t) {
  if (tn) return e === "compositionend" || (!Ai && Ma(e, t)) ? ((e = La()), (Qr = Mi = vt = null), (tn = !1), e) : null;
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
      return Ra && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var tp = {
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
function $s(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!tp[e.type] : t === "textarea";
}
function Oa(e, t, n, r) {
  (fa(r),
    (t = ul(t, "onChange")),
    0 < t.length && ((n = new Ii("onChange", "change", null, n, r)), e.push({ event: n, listeners: t })));
}
var Yn = null,
  sr = null;
function np(e) {
  Qa(e, 0);
}
function Rl(e) {
  var t = ln(e);
  if (oa(t)) return e;
}
function rp(e, t) {
  if (e === "change") return t;
}
var Aa = !1;
if (lt) {
  var no;
  if (lt) {
    var ro = "oninput" in document;
    if (!ro) {
      var Fs = document.createElement("div");
      (Fs.setAttribute("oninput", "return;"), (ro = typeof Fs.oninput == "function"));
    }
    no = ro;
  } else no = !1;
  Aa = no && (!document.documentMode || 9 < document.documentMode);
}
function Us() {
  Yn && (Yn.detachEvent("onpropertychange", Da), (sr = Yn = null));
}
function Da(e) {
  if (e.propertyName === "value" && Rl(sr)) {
    var t = [];
    (Oa(t, sr, e, Pi(e)), ga(np, t));
  }
}
function lp(e, t, n) {
  e === "focusin" ? (Us(), (Yn = t), (sr = n), Yn.attachEvent("onpropertychange", Da)) : e === "focusout" && Us();
}
function op(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Rl(sr);
}
function ip(e, t) {
  if (e === "click") return Rl(t);
}
function sp(e, t) {
  if (e === "input" || e === "change") return Rl(t);
}
function up(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var be = typeof Object.is == "function" ? Object.is : up;
function ur(e, t) {
  if (be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!No.call(t, l) || !be(e[l], t[l])) return !1;
  }
  return !0;
}
function Vs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Bs(e, t) {
  var n = Vs(e);
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
    n = Vs(n);
  }
}
function $a(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? $a(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Fa() {
  for (var e = window, t = tl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = tl(e.document);
  }
  return t;
}
function Di(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ap(e) {
  var t = Fa(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && $a(n.ownerDocument.documentElement, n)) {
    if (r !== null && Di(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
      else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        ((r = r.end === void 0 ? o : Math.min(r.end, l)), !e.extend && o > r && ((l = r), (r = o), (o = l)), (l = Bs(n, o)));
        var i = Bs(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
  }
}
var cp = lt && "documentMode" in document && 11 >= document.documentMode,
  nn = null,
  Wo = null,
  Xn = null,
  bo = !1;
function Ws(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  bo ||
    nn == null ||
    nn !== tl(r) ||
    ((r = nn),
    "selectionStart" in r && Di(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset })),
    (Xn && ur(Xn, r)) ||
      ((Xn = r),
      (r = ul(Wo, "onSelect")),
      0 < r.length && ((t = new Ii("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = nn))));
}
function Mr(e, t) {
  var n = {};
  return ((n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n);
}
var rn = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionend: Mr("Transition", "TransitionEnd"),
  },
  lo = {},
  Ua = {};
lt &&
  ((Ua = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete rn.animationend.animation, delete rn.animationiteration.animation, delete rn.animationstart.animation),
  "TransitionEvent" in window || delete rn.transitionend.transition);
function Ml(e) {
  if (lo[e]) return lo[e];
  if (!rn[e]) return e;
  var t = rn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ua) return (lo[e] = t[n]);
  return e;
}
var Va = Ml("animationend"),
  Ba = Ml("animationiteration"),
  Wa = Ml("animationstart"),
  ba = Ml("transitionend"),
  Ha = new Map(),
  bs =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function zt(e, t) {
  (Ha.set(e, t), Gt(t, [e]));
}
for (var oo = 0; oo < bs.length; oo++) {
  var io = bs[oo],
    dp = io.toLowerCase(),
    fp = io[0].toUpperCase() + io.slice(1);
  zt(dp, "on" + fp);
}
zt(Va, "onAnimationEnd");
zt(Ba, "onAnimationIteration");
zt(Wa, "onAnimationStart");
zt("dblclick", "onDoubleClick");
zt("focusin", "onFocus");
zt("focusout", "onBlur");
zt(ba, "onTransitionEnd");
xn("onMouseEnter", ["mouseout", "mouseover"]);
xn("onMouseLeave", ["mouseout", "mouseover"]);
xn("onPointerEnter", ["pointerout", "pointerover"]);
xn("onPointerLeave", ["pointerout", "pointerover"]);
Gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Wn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  pp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wn));
function Hs(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), df(r, t, void 0, e), (e.currentTarget = null));
}
function Qa(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            u = s.instance,
            a = s.currentTarget;
          if (((s = s.listener), u !== o && l.isPropagationStopped())) break e;
          (Hs(l, s, a), (o = u));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (((s = r[i]), (u = s.instance), (a = s.currentTarget), (s = s.listener), u !== o && l.isPropagationStopped()))
            break e;
          (Hs(l, s, a), (o = u));
        }
    }
  }
  if (rl) throw ((e = Fo), (rl = !1), (Fo = null), e);
}
function b(e, t) {
  var n = t[Yo];
  n === void 0 && (n = t[Yo] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Ga(t, e, 2, !1), n.add(r));
}
function so(e, t, n) {
  var r = 0;
  (t && (r |= 4), Ga(n, e, r, t));
}
var Ir = "_reactListening" + Math.random().toString(36).slice(2);
function ar(e) {
  if (!e[Ir]) {
    ((e[Ir] = !0),
      ea.forEach(function (n) {
        n !== "selectionchange" && (pp.has(n) || so(n, !1, e), so(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ir] || ((t[Ir] = !0), so("selectionchange", !1, t));
  }
}
function Ga(e, t, n, r) {
  switch (Ta(t)) {
    case 1:
      var l = jf;
      break;
    case 4:
      l = Pf;
      break;
    default:
      l = Ri;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !$o || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function uo(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo), u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = Dt(s)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  ga(function () {
    var a = o,
      h = Pi(n),
      g = [];
    e: {
      var m = Ha.get(e);
      if (m !== void 0) {
        var y = Ii,
          k = e;
        switch (e) {
          case "keypress":
            if (Gr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Wf;
            break;
          case "focusin":
            ((k = "focus"), (y = to));
            break;
          case "focusout":
            ((k = "blur"), (y = to));
            break;
          case "beforeblur":
          case "afterblur":
            y = to;
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
            y = Ms;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Lf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Qf;
            break;
          case Va:
          case Ba:
          case Wa:
            y = If;
            break;
          case ba:
            y = Kf;
            break;
          case "scroll":
            y = zf;
            break;
          case "wheel":
            y = Xf;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Af;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Os;
        }
        var v = (t & 4) !== 0,
          T = !v && e === "scroll",
          f = v ? (m !== null ? m + "Capture" : null) : m;
        v = [];
        for (var c = a, p; c !== null; ) {
          p = c;
          var w = p.stateNode;
          if ((p.tag === 5 && w !== null && ((p = w), f !== null && ((w = rr(c, f)), w != null && v.push(cr(c, w, p)))), T))
            break;
          c = c.return;
        }
        0 < v.length && ((m = new y(m, k, null, n, h)), g.push({ event: m, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          m && n !== Ao && (k = n.relatedTarget || n.fromElement) && (Dt(k) || k[ot]))
        )
          break e;
        if (
          (y || m) &&
          ((m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window),
          y
            ? ((k = n.relatedTarget || n.toElement),
              (y = a),
              (k = k ? Dt(k) : null),
              k !== null && ((T = Kt(k)), k !== T || (k.tag !== 5 && k.tag !== 6)) && (k = null))
            : ((y = null), (k = a)),
          y !== k)
        ) {
          if (
            ((v = Ms),
            (w = "onMouseLeave"),
            (f = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((v = Os), (w = "onPointerLeave"), (f = "onPointerEnter"), (c = "pointer")),
            (T = y == null ? m : ln(y)),
            (p = k == null ? m : ln(k)),
            (m = new v(w, c + "leave", y, n, h)),
            (m.target = T),
            (m.relatedTarget = p),
            (w = null),
            Dt(h) === a && ((v = new v(f, c + "enter", k, n, h)), (v.target = p), (v.relatedTarget = T), (w = v)),
            (T = w),
            y && k)
          )
            t: {
              for (v = y, f = k, c = 0, p = v; p; p = Yt(p)) c++;
              for (p = 0, w = f; w; w = Yt(w)) p++;
              for (; 0 < c - p; ) ((v = Yt(v)), c--);
              for (; 0 < p - c; ) ((f = Yt(f)), p--);
              for (; c--; ) {
                if (v === f || (f !== null && v === f.alternate)) break t;
                ((v = Yt(v)), (f = Yt(f)));
              }
              v = null;
            }
          else v = null;
          (y !== null && Qs(g, m, y, v, !1), k !== null && T !== null && Qs(g, T, k, v, !0));
        }
      }
      e: {
        if (
          ((m = a ? ln(a) : window),
          (y = m.nodeName && m.nodeName.toLowerCase()),
          y === "select" || (y === "input" && m.type === "file"))
        )
          var E = rp;
        else if ($s(m))
          if (Aa) E = sp;
          else {
            E = op;
            var P = lp;
          }
        else (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (E = ip);
        if (E && (E = E(e, a))) {
          Oa(g, E, n, h);
          break e;
        }
        (P && P(e, m, a),
          e === "focusout" && (P = m._wrapperState) && P.controlled && m.type === "number" && Lo(m, "number", m.value));
      }
      switch (((P = a ? ln(a) : window), e)) {
        case "focusin":
          ($s(P) || P.contentEditable === "true") && ((nn = P), (Wo = a), (Xn = null));
          break;
        case "focusout":
          Xn = Wo = nn = null;
          break;
        case "mousedown":
          bo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((bo = !1), Ws(g, n, h));
          break;
        case "selectionchange":
          if (cp) break;
        case "keydown":
        case "keyup":
          Ws(g, n, h);
      }
      var z;
      if (Ai)
        e: {
          switch (e) {
            case "compositionstart":
              var N = "onCompositionStart";
              break e;
            case "compositionend":
              N = "onCompositionEnd";
              break e;
            case "compositionupdate":
              N = "onCompositionUpdate";
              break e;
          }
          N = void 0;
        }
      else tn ? Ma(e, n) && (N = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      (N &&
        (Ra &&
          n.locale !== "ko" &&
          (tn || N !== "onCompositionStart"
            ? N === "onCompositionEnd" && tn && (z = La())
            : ((vt = h), (Mi = "value" in vt ? vt.value : vt.textContent), (tn = !0))),
        (P = ul(a, N)),
        0 < P.length &&
          ((N = new Is(N, e, null, n, h)),
          g.push({ event: N, listeners: P }),
          z ? (N.data = z) : ((z = Ia(n)), z !== null && (N.data = z)))),
        (z = Jf ? qf(e, n) : ep(e, n)) &&
          ((a = ul(a, "onBeforeInput")),
          0 < a.length &&
            ((h = new Is("onBeforeInput", "beforeinput", null, n, h)), g.push({ event: h, listeners: a }), (h.data = z))));
    }
    Qa(g, t);
  });
}
function cr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ul(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    (l.tag === 5 &&
      o !== null &&
      ((l = o), (o = rr(e, n)), o != null && r.unshift(cr(e, o, l)), (o = rr(e, t)), o != null && r.push(cr(e, o, l))),
      (e = e.return));
  }
  return r;
}
function Yt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Qs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n,
      u = s.alternate,
      a = s.stateNode;
    if (u !== null && u === r) break;
    (s.tag === 5 &&
      a !== null &&
      ((s = a),
      l ? ((u = rr(n, o)), u != null && i.unshift(cr(n, u, s))) : l || ((u = rr(n, o)), u != null && i.push(cr(n, u, s)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var mp = /\r\n?/g,
  hp = /\u0000|\uFFFD/g;
function Gs(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      mp,
      `
`,
    )
    .replace(hp, "");
}
function Or(e, t, n) {
  if (((t = Gs(t)), Gs(e) !== t && n)) throw Error(S(425));
}
function al() {}
var Ho = null,
  Qo = null;
function Go(e, t) {
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
var Ko = typeof setTimeout == "function" ? setTimeout : void 0,
  gp = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ks = typeof Promise == "function" ? Promise : void 0,
  vp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ks < "u"
        ? function (e) {
            return Ks.resolve(null).then(e).catch(yp);
          }
        : Ko;
function yp(e) {
  setTimeout(function () {
    throw e;
  });
}
function ao(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(l), ir(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  ir(t);
}
function St(e) {
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
function Ys(e) {
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
var Pn = Math.random().toString(36).slice(2),
  Ye = "__reactFiber$" + Pn,
  dr = "__reactProps$" + Pn,
  ot = "__reactContainer$" + Pn,
  Yo = "__reactEvents$" + Pn,
  xp = "__reactListeners$" + Pn,
  wp = "__reactHandles$" + Pn;
function Dt(e) {
  var t = e[Ye];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[ot] || n[Ye])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Ys(e); e !== null; ) {
          if ((n = e[Ye])) return n;
          e = Ys(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function kr(e) {
  return ((e = e[Ye] || e[ot]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e);
}
function ln(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33));
}
function Il(e) {
  return e[dr] || null;
}
var Xo = [],
  on = -1;
function Tt(e) {
  return { current: e };
}
function H(e) {
  0 > on || ((e.current = Xo[on]), (Xo[on] = null), on--);
}
function B(e, t) {
  (on++, (Xo[on] = e.current), (e.current = t));
}
var Pt = {},
  fe = Tt(Pt),
  Se = Tt(!1),
  Bt = Pt;
function wn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Pt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Ce(e) {
  return ((e = e.childContextTypes), e != null);
}
function cl() {
  (H(Se), H(fe));
}
function Xs(e, t, n) {
  if (fe.current !== Pt) throw Error(S(168));
  (B(fe, t), B(Se, n));
}
function Ka(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(S(108, rf(e) || "Unknown", l));
  return X({}, n, r);
}
function dl(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Pt),
    (Bt = fe.current),
    B(fe, e),
    B(Se, Se.current),
    !0
  );
}
function Zs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  (n ? ((e = Ka(e, t, Bt)), (r.__reactInternalMemoizedMergedChildContext = e), H(Se), H(fe), B(fe, e)) : H(Se), B(Se, n));
}
var et = null,
  Ol = !1,
  co = !1;
function Ya(e) {
  et === null ? (et = [e]) : et.push(e);
}
function kp(e) {
  ((Ol = !0), Ya(e));
}
function Lt() {
  if (!co && et !== null) {
    co = !0;
    var e = 0,
      t = V;
    try {
      var n = et;
      for (V = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((et = null), (Ol = !1));
    } catch (l) {
      throw (et !== null && (et = et.slice(e + 1)), wa(zi, Lt), l);
    } finally {
      ((V = t), (co = !1));
    }
  }
  return null;
}
var sn = [],
  un = 0,
  fl = null,
  pl = 0,
  Le = [],
  Re = 0,
  Wt = null,
  tt = 1,
  nt = "";
function Ot(e, t) {
  ((sn[un++] = pl), (sn[un++] = fl), (fl = e), (pl = t));
}
function Xa(e, t, n) {
  ((Le[Re++] = tt), (Le[Re++] = nt), (Le[Re++] = Wt), (Wt = e));
  var r = tt;
  e = nt;
  var l = 32 - Be(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var o = 32 - Be(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    ((o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (tt = (1 << (32 - Be(t) + l)) | (n << l) | r),
      (nt = o + e));
  } else ((tt = (1 << o) | (n << l) | r), (nt = e));
}
function $i(e) {
  e.return !== null && (Ot(e, 1), Xa(e, 1, 0));
}
function Fi(e) {
  for (; e === fl; ) ((fl = sn[--un]), (sn[un] = null), (pl = sn[--un]), (sn[un] = null));
  for (; e === Wt; ) ((Wt = Le[--Re]), (Le[Re] = null), (nt = Le[--Re]), (Le[Re] = null), (tt = Le[--Re]), (Le[Re] = null));
}
var je = null,
  _e = null,
  G = !1,
  Ve = null;
function Za(e, t) {
  var n = Me(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Js(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (je = e), (_e = St(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (je = e), (_e = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Wt !== null ? { id: tt, overflow: nt } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = Me(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (je = e),
            (_e = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Zo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Jo(e) {
  if (G) {
    var t = _e;
    if (t) {
      var n = t;
      if (!Js(e, t)) {
        if (Zo(e)) throw Error(S(418));
        t = St(n.nextSibling);
        var r = je;
        t && Js(e, t) ? Za(r, n) : ((e.flags = (e.flags & -4097) | 2), (G = !1), (je = e));
      }
    } else {
      if (Zo(e)) throw Error(S(418));
      ((e.flags = (e.flags & -4097) | 2), (G = !1), (je = e));
    }
  }
}
function qs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  je = e;
}
function Ar(e) {
  if (e !== je) return !1;
  if (!G) return (qs(e), (G = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== "head" && t !== "body" && !Go(e.type, e.memoizedProps))),
    t && (t = _e))
  ) {
    if (Zo(e)) throw (Ja(), Error(S(418)));
    for (; t; ) (Za(e, t), (t = St(t.nextSibling)));
  }
  if ((qs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = St(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = je ? St(e.stateNode.nextSibling) : null;
  return !0;
}
function Ja() {
  for (var e = _e; e; ) e = St(e.nextSibling);
}
function kn() {
  ((_e = je = null), (G = !1));
}
function Ui(e) {
  Ve === null ? (Ve = [e]) : Ve.push(e);
}
var Sp = ut.ReactCurrentBatchConfig;
function On(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(S(147, e));
      var l = r,
        o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var s = l.refs;
            i === null ? delete s[o] : (s[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e));
  }
  return e;
}
function Dr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
  );
}
function eu(e) {
  var t = e._init;
  return t(e._payload);
}
function qa(e) {
  function t(f, c) {
    if (e) {
      var p = f.deletions;
      p === null ? ((f.deletions = [c]), (f.flags |= 16)) : p.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) (t(f, c), (c = c.sibling));
    return null;
  }
  function r(f, c) {
    for (f = new Map(); c !== null; ) (c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling));
    return f;
  }
  function l(f, c) {
    return ((f = _t(f, c)), (f.index = 0), (f.sibling = null), f);
  }
  function o(f, c, p) {
    return (
      (f.index = p),
      e
        ? ((p = f.alternate), p !== null ? ((p = p.index), p < c ? ((f.flags |= 2), c) : p) : ((f.flags |= 2), c))
        : ((f.flags |= 1048576), c)
    );
  }
  function i(f) {
    return (e && f.alternate === null && (f.flags |= 2), f);
  }
  function s(f, c, p, w) {
    return c === null || c.tag !== 6 ? ((c = yo(p, f.mode, w)), (c.return = f), c) : ((c = l(c, p)), (c.return = f), c);
  }
  function u(f, c, p, w) {
    var E = p.type;
    return E === en
      ? h(f, c, p.props.children, w, p.key)
      : c !== null && (c.elementType === E || (typeof E == "object" && E !== null && E.$$typeof === pt && eu(E) === c.type))
        ? ((w = l(c, p.props)), (w.ref = On(f, c, p)), (w.return = f), w)
        : ((w = el(p.type, p.key, p.props, null, f.mode, w)), (w.ref = On(f, c, p)), (w.return = f), w);
  }
  function a(f, c, p, w) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = xo(p, f.mode, w)), (c.return = f), c)
      : ((c = l(c, p.children || [])), (c.return = f), c);
  }
  function h(f, c, p, w, E) {
    return c === null || c.tag !== 7 ? ((c = Vt(p, f.mode, w, E)), (c.return = f), c) : ((c = l(c, p)), (c.return = f), c);
  }
  function g(f, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number") return ((c = yo("" + c, f.mode, p)), (c.return = f), c);
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case _r:
          return ((p = el(c.type, c.key, c.props, null, f.mode, p)), (p.ref = On(f, null, c)), (p.return = f), p);
        case qt:
          return ((c = xo(c, f.mode, p)), (c.return = f), c);
        case pt:
          var w = c._init;
          return g(f, w(c._payload), p);
      }
      if (Vn(c) || Tn(c)) return ((c = Vt(c, f.mode, p, null)), (c.return = f), c);
      Dr(f, c);
    }
    return null;
  }
  function m(f, c, p, w) {
    var E = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number") return E !== null ? null : s(f, c, "" + p, w);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case _r:
          return p.key === E ? u(f, c, p, w) : null;
        case qt:
          return p.key === E ? a(f, c, p, w) : null;
        case pt:
          return ((E = p._init), m(f, c, E(p._payload), w));
      }
      if (Vn(p) || Tn(p)) return E !== null ? null : h(f, c, p, w, null);
      Dr(f, p);
    }
    return null;
  }
  function y(f, c, p, w, E) {
    if ((typeof w == "string" && w !== "") || typeof w == "number") return ((f = f.get(p) || null), s(c, f, "" + w, E));
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case _r:
          return ((f = f.get(w.key === null ? p : w.key) || null), u(c, f, w, E));
        case qt:
          return ((f = f.get(w.key === null ? p : w.key) || null), a(c, f, w, E));
        case pt:
          var P = w._init;
          return y(f, c, p, P(w._payload), E);
      }
      if (Vn(w) || Tn(w)) return ((f = f.get(p) || null), h(c, f, w, E, null));
      Dr(c, w);
    }
    return null;
  }
  function k(f, c, p, w) {
    for (var E = null, P = null, z = c, N = (c = 0), I = null; z !== null && N < p.length; N++) {
      z.index > N ? ((I = z), (z = null)) : (I = z.sibling);
      var O = m(f, z, p[N], w);
      if (O === null) {
        z === null && (z = I);
        break;
      }
      (e && z && O.alternate === null && t(f, z), (c = o(O, c, N)), P === null ? (E = O) : (P.sibling = O), (P = O), (z = I));
    }
    if (N === p.length) return (n(f, z), G && Ot(f, N), E);
    if (z === null) {
      for (; N < p.length; N++)
        ((z = g(f, p[N], w)), z !== null && ((c = o(z, c, N)), P === null ? (E = z) : (P.sibling = z), (P = z)));
      return (G && Ot(f, N), E);
    }
    for (z = r(f, z); N < p.length; N++)
      ((I = y(z, f, N, p[N], w)),
        I !== null &&
          (e && I.alternate !== null && z.delete(I.key === null ? N : I.key),
          (c = o(I, c, N)),
          P === null ? (E = I) : (P.sibling = I),
          (P = I)));
    return (
      e &&
        z.forEach(function (ne) {
          return t(f, ne);
        }),
      G && Ot(f, N),
      E
    );
  }
  function v(f, c, p, w) {
    var E = Tn(p);
    if (typeof E != "function") throw Error(S(150));
    if (((p = E.call(p)), p == null)) throw Error(S(151));
    for (var P = (E = null), z = c, N = (c = 0), I = null, O = p.next(); z !== null && !O.done; N++, O = p.next()) {
      z.index > N ? ((I = z), (z = null)) : (I = z.sibling);
      var ne = m(f, z, O.value, w);
      if (ne === null) {
        z === null && (z = I);
        break;
      }
      (e && z && ne.alternate === null && t(f, z),
        (c = o(ne, c, N)),
        P === null ? (E = ne) : (P.sibling = ne),
        (P = ne),
        (z = I));
    }
    if (O.done) return (n(f, z), G && Ot(f, N), E);
    if (z === null) {
      for (; !O.done; N++, O = p.next())
        ((O = g(f, O.value, w)), O !== null && ((c = o(O, c, N)), P === null ? (E = O) : (P.sibling = O), (P = O)));
      return (G && Ot(f, N), E);
    }
    for (z = r(f, z); !O.done; N++, O = p.next())
      ((O = y(z, f, N, O.value, w)),
        O !== null &&
          (e && O.alternate !== null && z.delete(O.key === null ? N : O.key),
          (c = o(O, c, N)),
          P === null ? (E = O) : (P.sibling = O),
          (P = O)));
    return (
      e &&
        z.forEach(function (D) {
          return t(f, D);
        }),
      G && Ot(f, N),
      E
    );
  }
  function T(f, c, p, w) {
    if (
      (typeof p == "object" && p !== null && p.type === en && p.key === null && (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case _r:
          e: {
            for (var E = p.key, P = c; P !== null; ) {
              if (P.key === E) {
                if (((E = p.type), E === en)) {
                  if (P.tag === 7) {
                    (n(f, P.sibling), (c = l(P, p.props.children)), (c.return = f), (f = c));
                    break e;
                  }
                } else if (
                  P.elementType === E ||
                  (typeof E == "object" && E !== null && E.$$typeof === pt && eu(E) === P.type)
                ) {
                  (n(f, P.sibling), (c = l(P, p.props)), (c.ref = On(f, P, p)), (c.return = f), (f = c));
                  break e;
                }
                n(f, P);
                break;
              } else t(f, P);
              P = P.sibling;
            }
            p.type === en
              ? ((c = Vt(p.props.children, f.mode, w, p.key)), (c.return = f), (f = c))
              : ((w = el(p.type, p.key, p.props, null, f.mode, w)), (w.ref = On(f, c, p)), (w.return = f), (f = w));
          }
          return i(f);
        case qt:
          e: {
            for (P = p.key; c !== null; ) {
              if (c.key === P)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  (n(f, c.sibling), (c = l(c, p.children || [])), (c.return = f), (f = c));
                  break e;
                } else {
                  n(f, c);
                  break;
                }
              else t(f, c);
              c = c.sibling;
            }
            ((c = xo(p, f.mode, w)), (c.return = f), (f = c));
          }
          return i(f);
        case pt:
          return ((P = p._init), T(f, c, P(p._payload), w));
      }
      if (Vn(p)) return k(f, c, p, w);
      if (Tn(p)) return v(f, c, p, w);
      Dr(f, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(f, c.sibling), (c = l(c, p)), (c.return = f), (f = c))
          : (n(f, c), (c = yo(p, f.mode, w)), (c.return = f), (f = c)),
        i(f))
      : n(f, c);
  }
  return T;
}
var Sn = qa(!0),
  ec = qa(!1),
  ml = Tt(null),
  hl = null,
  an = null,
  Vi = null;
function Bi() {
  Vi = an = hl = null;
}
function Wi(e) {
  var t = ml.current;
  (H(ml), (e._currentValue = t));
}
function qo(e, t, n) {
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
function gn(e, t) {
  ((hl = e),
    (Vi = an = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (ke = !0), (e.firstContext = null)));
}
function Oe(e) {
  var t = e._currentValue;
  if (Vi !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), an === null)) {
      if (hl === null) throw Error(S(308));
      ((an = e), (hl.dependencies = { lanes: 0, firstContext: e }));
    } else an = an.next = e;
  return t;
}
var $t = null;
function bi(e) {
  $t === null ? ($t = [e]) : $t.push(e);
}
function tc(e, t, n, r) {
  var l = t.interleaved;
  return (l === null ? ((n.next = n), bi(t)) : ((n.next = l.next), (l.next = n)), (t.interleaved = n), it(e, r));
}
function it(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var mt = !1;
function Hi(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function nc(e, t) {
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
function rt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Ct(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), F & 2)) {
    var l = r.pending;
    return (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), it(e, n));
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), bi(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    it(e, n)
  );
}
function Kr(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ti(e, n));
  }
}
function tu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        (o === null ? (l = o = i) : (o = o.next = i), (n = n.next));
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    ((n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t));
}
function gl(e, t, n, r) {
  var l = e.updateQueue;
  mt = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s,
      a = u.next;
    ((u.next = null), i === null ? (o = a) : (i.next = a), (i = u));
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (s = h.lastBaseUpdate),
      s !== i && (s === null ? (h.firstBaseUpdate = a) : (s.next = a), (h.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var g = l.baseState;
    ((i = 0), (h = a = u = null), (s = o));
    do {
      var m = s.lane,
        y = s.eventTime;
      if ((r & m) === m) {
        h !== null &&
          (h = h.next = { eventTime: y, lane: 0, tag: s.tag, payload: s.payload, callback: s.callback, next: null });
        e: {
          var k = e,
            v = s;
          switch (((m = t), (y = n), v.tag)) {
            case 1:
              if (((k = v.payload), typeof k == "function")) {
                g = k.call(y, g, m);
                break e;
              }
              g = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (((k = v.payload), (m = typeof k == "function" ? k.call(y, g, m) : k), m == null)) break e;
              g = X({}, g, m);
              break e;
            case 2:
              mt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && ((e.flags |= 64), (m = l.effects), m === null ? (l.effects = [s]) : m.push(s));
      } else
        ((y = { eventTime: y, lane: m, tag: s.tag, payload: s.payload, callback: s.callback, next: null }),
          h === null ? ((a = h = y), (u = g)) : (h = h.next = y),
          (i |= m));
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        ((m = s), (s = m.next), (m.next = null), (l.lastBaseUpdate = m), (l.shared.pending = null));
      }
    } while (!0);
    if (
      (h === null && (u = g),
      (l.baseState = u),
      (l.firstBaseUpdate = a),
      (l.lastBaseUpdate = h),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((i |= l.lane), (l = l.next));
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    ((Ht |= i), (e.lanes = i), (e.memoizedState = g));
  }
}
function nu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function")) throw Error(S(191, l));
        l.call(r);
      }
    }
}
var Sr = {},
  Ze = Tt(Sr),
  fr = Tt(Sr),
  pr = Tt(Sr);
function Ft(e) {
  if (e === Sr) throw Error(S(174));
  return e;
}
function Qi(e, t) {
  switch ((B(pr, t), B(fr, e), B(Ze, Sr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Mo(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Mo(t, e)));
  }
  (H(Ze), B(Ze, t));
}
function Cn() {
  (H(Ze), H(fr), H(pr));
}
function rc(e) {
  Ft(pr.current);
  var t = Ft(Ze.current),
    n = Mo(t, e.type);
  t !== n && (B(fr, e), B(Ze, n));
}
function Gi(e) {
  fr.current === e && (H(Ze), H(fr));
}
var K = Tt(0);
function vl(e) {
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
var fo = [];
function Ki() {
  for (var e = 0; e < fo.length; e++) fo[e]._workInProgressVersionPrimary = null;
  fo.length = 0;
}
var Yr = ut.ReactCurrentDispatcher,
  po = ut.ReactCurrentBatchConfig,
  bt = 0,
  Y = null,
  ee = null,
  re = null,
  yl = !1,
  Zn = !1,
  mr = 0,
  Cp = 0;
function ae() {
  throw Error(S(321));
}
function Yi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!be(e[n], t[n])) return !1;
  return !0;
}
function Xi(e, t, n, r, l, o) {
  if (
    ((bt = o),
    (Y = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Yr.current = e === null || e.memoizedState === null ? jp : Pp),
    (e = n(r, l)),
    Zn)
  ) {
    o = 0;
    do {
      if (((Zn = !1), (mr = 0), 25 <= o)) throw Error(S(301));
      ((o += 1), (re = ee = null), (t.updateQueue = null), (Yr.current = zp), (e = n(r, l)));
    } while (Zn);
  }
  if (((Yr.current = xl), (t = ee !== null && ee.next !== null), (bt = 0), (re = ee = Y = null), (yl = !1), t))
    throw Error(S(300));
  return e;
}
function Zi() {
  var e = mr !== 0;
  return ((mr = 0), e);
}
function Ke() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return (re === null ? (Y.memoizedState = re = e) : (re = re.next = e), re);
}
function Ae() {
  if (ee === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? Y.memoizedState : re.next;
  if (t !== null) ((re = t), (ee = e));
  else {
    if (e === null) throw Error(S(310));
    ((ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      re === null ? (Y.memoizedState = re = e) : (re = re.next = e));
  }
  return re;
}
function hr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function mo(e) {
  var t = Ae(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = ee,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      ((l.next = o.next), (o.next = i));
    }
    ((r.baseQueue = l = o), (n.pending = null));
  }
  if (l !== null) {
    ((o = l.next), (r = r.baseState));
    var s = (i = null),
      u = null,
      a = o;
    do {
      var h = a.lane;
      if ((bt & h) === h)
        (u !== null &&
          (u = u.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action)));
      else {
        var g = { lane: h, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null };
        (u === null ? ((s = u = g), (i = r)) : (u = u.next = g), (Y.lanes |= h), (Ht |= h));
      }
      a = a.next;
    } while (a !== null && a !== o);
    (u === null ? (i = r) : (u.next = s),
      be(r, t.memoizedState) || (ke = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((o = l.lane), (Y.lanes |= o), (Ht |= o), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ho(e) {
  var t = Ae(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do ((o = e(o, i.action)), (i = i.next));
    while (i !== l);
    (be(o, t.memoizedState) || (ke = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o));
  }
  return [o, r];
}
function lc() {}
function oc(e, t) {
  var n = Y,
    r = Ae(),
    l = t(),
    o = !be(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (ke = !0)),
    (r = r.queue),
    Ji(uc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), gr(9, sc.bind(null, n, r, l, t), void 0, null), le === null)) throw Error(S(349));
    bt & 30 || ic(n, t, l);
  }
  return l;
}
function ic(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Y.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function sc(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), ac(t) && cc(e));
}
function uc(e, t, n) {
  return n(function () {
    ac(t) && cc(e);
  });
}
function ac(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !be(e, n);
  } catch {
    return !0;
  }
}
function cc(e) {
  var t = it(e, 1);
  t !== null && We(t, e, 1, -1);
}
function ru(e) {
  var t = Ke();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hr, lastRenderedState: e }),
    (t.queue = e),
    (e = e.dispatch = _p.bind(null, Y, e)),
    [t.memoizedState, e]
  );
}
function gr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (Y.updateQueue = t), (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function dc() {
  return Ae().memoizedState;
}
function Xr(e, t, n, r) {
  var l = Ke();
  ((Y.flags |= e), (l.memoizedState = gr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Al(e, t, n, r) {
  var l = Ae();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var i = ee.memoizedState;
    if (((o = i.destroy), r !== null && Yi(r, i.deps))) {
      l.memoizedState = gr(t, n, o, r);
      return;
    }
  }
  ((Y.flags |= e), (l.memoizedState = gr(1 | t, n, o, r)));
}
function lu(e, t) {
  return Xr(8390656, 8, e, t);
}
function Ji(e, t) {
  return Al(2048, 8, e, t);
}
function fc(e, t) {
  return Al(4, 2, e, t);
}
function pc(e, t) {
  return Al(4, 4, e, t);
}
function mc(e, t) {
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
function hc(e, t, n) {
  return ((n = n != null ? n.concat([e]) : null), Al(4, 4, mc.bind(null, t, e), n));
}
function qi() {}
function gc(e, t) {
  var n = Ae();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yi(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function vc(e, t) {
  var n = Ae();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Yi(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
}
function yc(e, t, n) {
  return bt & 21
    ? (be(n, t) || ((n = Ca()), (Y.lanes |= n), (Ht |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (ke = !0)), (e.memoizedState = n));
}
function Np(e, t) {
  var n = V;
  ((V = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = po.transition;
  po.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((V = n), (po.transition = r));
  }
}
function xc() {
  return Ae().memoizedState;
}
function Ep(e, t, n) {
  var r = Et(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), wc(e))) kc(t, n);
  else if (((n = tc(e, t, n, r)), n !== null)) {
    var l = ge();
    (We(n, e, r, l), Sc(n, t, r));
  }
}
function _p(e, t, n) {
  var r = Et(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (wc(e)) kc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var i = t.lastRenderedState,
          s = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), be(s, i))) {
          var u = t.interleaved;
          (u === null ? ((l.next = l), bi(t)) : ((l.next = u.next), (u.next = l)), (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = tc(e, t, l, r)), n !== null && ((l = ge()), We(n, e, r, l), Sc(n, t, r)));
  }
}
function wc(e) {
  var t = e.alternate;
  return e === Y || (t !== null && t === Y);
}
function kc(e, t) {
  Zn = yl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
}
function Sc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Ti(e, n));
  }
}
var xl = {
    readContext: Oe,
    useCallback: ae,
    useContext: ae,
    useEffect: ae,
    useImperativeHandle: ae,
    useInsertionEffect: ae,
    useLayoutEffect: ae,
    useMemo: ae,
    useReducer: ae,
    useRef: ae,
    useState: ae,
    useDebugValue: ae,
    useDeferredValue: ae,
    useTransition: ae,
    useMutableSource: ae,
    useSyncExternalStore: ae,
    useId: ae,
    unstable_isNewReconciler: !1,
  },
  jp = {
    readContext: Oe,
    useCallback: function (e, t) {
      return ((Ke().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Oe,
    useEffect: lu,
    useImperativeHandle: function (e, t, n) {
      return ((n = n != null ? n.concat([e]) : null), Xr(4194308, 4, mc.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return Xr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Xr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ke();
      return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
    },
    useReducer: function (e, t, n) {
      var r = Ke();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }),
        (r.queue = e),
        (e = e.dispatch = Ep.bind(null, Y, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ke();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: ru,
    useDebugValue: qi,
    useDeferredValue: function (e) {
      return (Ke().memoizedState = e);
    },
    useTransition: function () {
      var e = ru(!1),
        t = e[0];
      return ((e = Np.bind(null, e[1])), (Ke().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Y,
        l = Ke();
      if (G) {
        if (n === void 0) throw Error(S(407));
        n = n();
      } else {
        if (((n = t()), le === null)) throw Error(S(349));
        bt & 30 || ic(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        lu(uc.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        gr(9, sc.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ke(),
        t = le.identifierPrefix;
      if (G) {
        var n = nt,
          r = tt;
        ((n = (r & ~(1 << (32 - Be(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = mr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = Cp++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Pp = {
    readContext: Oe,
    useCallback: gc,
    useContext: Oe,
    useEffect: Ji,
    useImperativeHandle: hc,
    useInsertionEffect: fc,
    useLayoutEffect: pc,
    useMemo: vc,
    useReducer: mo,
    useRef: dc,
    useState: function () {
      return mo(hr);
    },
    useDebugValue: qi,
    useDeferredValue: function (e) {
      var t = Ae();
      return yc(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = mo(hr)[0],
        t = Ae().memoizedState;
      return [e, t];
    },
    useMutableSource: lc,
    useSyncExternalStore: oc,
    useId: xc,
    unstable_isNewReconciler: !1,
  },
  zp = {
    readContext: Oe,
    useCallback: gc,
    useContext: Oe,
    useEffect: Ji,
    useImperativeHandle: hc,
    useInsertionEffect: fc,
    useLayoutEffect: pc,
    useMemo: vc,
    useReducer: ho,
    useRef: dc,
    useState: function () {
      return ho(hr);
    },
    useDebugValue: qi,
    useDeferredValue: function (e) {
      var t = Ae();
      return ee === null ? (t.memoizedState = e) : yc(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = ho(hr)[0],
        t = Ae().memoizedState;
      return [e, t];
    },
    useMutableSource: lc,
    useSyncExternalStore: oc,
    useId: xc,
    unstable_isNewReconciler: !1,
  };
function Fe(e, t) {
  if (e && e.defaultProps) {
    ((t = X({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ei(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : X({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Dl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Kt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ge(),
      l = Et(e),
      o = rt(r, l);
    ((o.payload = t), n != null && (o.callback = n), (t = Ct(e, o, l)), t !== null && (We(t, e, l, r), Kr(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ge(),
      l = Et(e),
      o = rt(r, l);
    ((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Ct(e, o, l)),
      t !== null && (We(t, e, l, r), Kr(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ge(),
      r = Et(e),
      l = rt(n, r);
    ((l.tag = 2), t != null && (l.callback = t), (t = Ct(e, l, r)), t !== null && (We(t, e, r, n), Kr(t, e, r)));
  },
};
function ou(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !ur(n, r) || !ur(l, o)
        : !0
  );
}
function Cc(e, t, n) {
  var r = !1,
    l = Pt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Oe(o))
      : ((l = Ce(t) ? Bt : fe.current), (r = t.contextTypes), (o = (r = r != null) ? wn(e, l) : Pt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Dl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function iu(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Dl.enqueueReplaceState(t, t.state, null));
}
function ti(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Hi(e));
  var o = t.contextType;
  (typeof o == "object" && o !== null ? (l.context = Oe(o)) : ((o = Ce(t) ? Bt : fe.current), (l.context = wn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (ei(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
      t !== l.state && Dl.enqueueReplaceState(l, l.state, null),
      gl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308));
}
function Nn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += nf(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function go(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ni(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Tp = typeof WeakMap == "function" ? WeakMap : Map;
function Nc(e, t, n) {
  ((n = rt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (kl || ((kl = !0), (fi = r)), ni(e, t));
    }),
    n
  );
}
function Ec(e, t, n) {
  ((n = rt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        ni(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        (ni(e, t), typeof r != "function" && (Nt === null ? (Nt = new Set([this])) : Nt.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
      }),
    n
  );
}
function su(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Tp();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = bp.bind(null, e, t, n)), t.then(e, e));
}
function uu(e) {
  do {
    var t;
    if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function au(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = rt(-1, 1)), (t.tag = 2), Ct(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Lp = ut.ReactCurrentOwner,
  ke = !1;
function he(e, t, n, r) {
  t.child = e === null ? ec(t, null, n, r) : Sn(t, e.child, n, r);
}
function cu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    gn(t, l),
    (r = Xi(e, t, n, r, o, l)),
    (n = Zi()),
    e !== null && !ke
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), st(e, t, l))
      : (G && n && $i(t), (t.flags |= 1), he(e, t, r, l), t.child)
  );
}
function du(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !ss(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), _c(e, t, o, r, l))
      : ((e = el(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : ur), n(i, r) && e.ref === t.ref)) return st(e, t, l);
  }
  return ((t.flags |= 1), (e = _t(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
}
function _c(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (ur(o, r) && e.ref === t.ref)
      if (((ke = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0)) e.flags & 131072 && (ke = !0);
      else return ((t.lanes = e.lanes), st(e, t, l));
  }
  return ri(e, t, n, r, l);
}
function jc(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1)) ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), B(dn, Ee), (Ee |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          B(dn, Ee),
          (Ee |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        B(dn, Ee),
        (Ee |= r));
    }
  else (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), B(dn, Ee), (Ee |= r));
  return (he(e, t, l, n), t.child);
}
function Pc(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
}
function ri(e, t, n, r, l) {
  var o = Ce(n) ? Bt : fe.current;
  return (
    (o = wn(t, o)),
    gn(t, l),
    (n = Xi(e, t, n, r, o, l)),
    (r = Zi()),
    e !== null && !ke
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), st(e, t, l))
      : (G && r && $i(t), (t.flags |= 1), he(e, t, n, l), t.child)
  );
}
function fu(e, t, n, r, l) {
  if (Ce(n)) {
    var o = !0;
    dl(t);
  } else o = !1;
  if ((gn(t, l), t.stateNode === null)) (Zr(e, t), Cc(t, n, r), ti(t, n, r, l), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var u = i.context,
      a = n.contextType;
    typeof a == "object" && a !== null ? (a = Oe(a)) : ((a = Ce(n) ? Bt : fe.current), (a = wn(t, a)));
    var h = n.getDerivedStateFromProps,
      g = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    (g ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || u !== a) && iu(t, i, r, a)),
      (mt = !1));
    var m = t.memoizedState;
    ((i.state = m),
      gl(t, r, i, l),
      (u = t.memoizedState),
      s !== r || m !== u || Se.current || mt
        ? (typeof h == "function" && (ei(t, n, h, r), (u = t.memoizedState)),
          (s = mt || ou(t, n, s, r, m, u, a))
            ? (g ||
                (typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" && i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = a),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), (r = !1)));
  } else {
    ((i = t.stateNode),
      nc(e, t),
      (s = t.memoizedProps),
      (a = t.type === t.elementType ? s : Fe(t.type, s)),
      (i.props = a),
      (g = t.pendingProps),
      (m = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null ? (u = Oe(u)) : ((u = Ce(n) ? Bt : fe.current), (u = wn(t, u))));
    var y = n.getDerivedStateFromProps;
    ((h = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
      ((s !== g || m !== u) && iu(t, i, r, u)),
      (mt = !1),
      (m = t.memoizedState),
      (i.state = m),
      gl(t, r, i, l));
    var k = t.memoizedState;
    s !== g || m !== k || Se.current || mt
      ? (typeof y == "function" && (ei(t, n, y, r), (k = t.memoizedState)),
        (a = mt || ou(t, n, a, r, m, k, u) || !1)
          ? (h ||
              (typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, u),
              typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" || (s === e.memoizedProps && m === e.memoizedState) || (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (i.props = r),
        (i.state = k),
        (i.context = u),
        (r = a))
      : (typeof i.componentDidUpdate != "function" || (s === e.memoizedProps && m === e.memoizedState) || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return li(e, t, n, r, o, l);
}
function li(e, t, n, r, l, o) {
  Pc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (l && Zs(t, n, !1), st(e, t, o));
  ((r = t.stateNode), (Lp.current = t));
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i ? ((t.child = Sn(t, e.child, null, o)), (t.child = Sn(t, null, s, o))) : he(e, t, s, o),
    (t.memoizedState = r.state),
    l && Zs(t, n, !0),
    t.child
  );
}
function zc(e) {
  var t = e.stateNode;
  (t.pendingContext ? Xs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Xs(e, t.context, !1),
    Qi(e, t.containerInfo));
}
function pu(e, t, n, r, l) {
  return (kn(), Ui(l), (t.flags |= 256), he(e, t, n, r), t.child);
}
var oi = { dehydrated: null, treeContext: null, retryLane: 0 };
function ii(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Tc(e, t, n) {
  var r = t.pendingProps,
    l = K.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
    B(K, l & 1),
    e === null)
  )
    return (
      Jo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1), null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null ? ((o.childLanes = 0), (o.pendingProps = i)) : (o = Ul(i, r, 0, null)),
              (e = Vt(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ii(n)),
              (t.memoizedState = oi),
              e)
            : es(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null))) return Rp(e, t, i, r, s, l, n);
  if (o) {
    ((o = r.fallback), (i = t.mode), (l = e.child), (s = l.sibling));
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = u), (t.deletions = null))
        : ((r = _t(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (o = _t(s, o)) : ((o = Vt(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i = i === null ? ii(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = oi),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = _t(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function es(e, t) {
  return ((t = Ul({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t));
}
function $r(e, t, n, r) {
  return (
    r !== null && Ui(r),
    Sn(t, e.child, null, n),
    (e = es(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Rp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = go(Error(S(422)))), $r(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (l = t.mode),
          (r = Ul({ mode: "visible", children: r.children }, l, 0, null)),
          (o = Vt(o, l, i, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && Sn(t, e.child, null, i),
          (t.child.memoizedState = ii(i)),
          (t.memoizedState = oi),
          o);
  if (!(t.mode & 1)) return $r(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return ((r = s), (o = Error(S(419))), (r = go(o, r, void 0)), $r(e, t, i, r));
  }
  if (((s = (i & e.childLanes) !== 0), ke || s)) {
    if (((r = le), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 && l !== o.retryLane && ((o.retryLane = l), it(e, l), We(r, e, l, -1)));
    }
    return (is(), (r = go(Error(S(421)))), $r(e, t, i, r));
  }
  return l.data === "$?"
    ? ((t.flags |= 128), (t.child = e.child), (t = Hp.bind(null, e)), (l._reactRetry = t), null)
    : ((e = o.treeContext),
      (_e = St(l.nextSibling)),
      (je = t),
      (G = !0),
      (Ve = null),
      e !== null && ((Le[Re++] = tt), (Le[Re++] = nt), (Le[Re++] = Wt), (tt = e.id), (nt = e.overflow), (Wt = t)),
      (t = es(t, r.children)),
      (t.flags |= 4096),
      t);
}
function mu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), qo(e.return, t, n));
}
function vo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l })
    : ((o.isBackwards = t), (o.rendering = null), (o.renderingStartTime = 0), (o.last = r), (o.tail = n), (o.tailMode = l));
}
function Lc(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((he(e, t, r.children, n), (r = K.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && mu(e, n, t);
        else if (e.tag === 19) mu(e, n, t);
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
  if ((B(K, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate), e !== null && vl(e) === null && (l = n), (n = n.sibling));
        ((n = l), n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)), vo(t, !1, l, n, o));
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && vl(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        vo(t, !0, n, null, o);
        break;
      case "together":
        vo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Zr(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function st(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Ht |= t.lanes), !(n & t.childLanes))) return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = _t(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      ((e = e.sibling), (n = n.sibling = _t(e, e.pendingProps)), (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Mp(e, t, n) {
  switch (t.tag) {
    case 3:
      (zc(t), kn());
      break;
    case 5:
      rc(t);
      break;
    case 1:
      Ce(t.type) && dl(t);
      break;
    case 4:
      Qi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (B(ml, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (B(K, K.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Tc(e, t, n)
            : (B(K, K.current & 1), (e = st(e, t, n)), e !== null ? e.sibling : null);
      B(K, K.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Lc(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        B(K, K.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), jc(e, t, n));
  }
  return st(e, t, n);
}
var Rc, si, Mc, Ic;
Rc = function (e, t) {
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
si = function () {};
Mc = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), Ft(Ze.current));
    var o = null;
    switch (n) {
      case "input":
        ((l = zo(e, l)), (r = zo(e, r)), (o = []));
        break;
      case "select":
        ((l = X({}, l, { value: void 0 })), (r = X({}, r, { value: void 0 })), (o = []));
        break;
      case "textarea":
        ((l = Ro(e, l)), (r = Ro(e, r)), (o = []));
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = al);
    }
    Io(n, r);
    var i;
    n = null;
    for (a in l)
      if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
        if (a === "style") {
          var s = l[a];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (tr.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (((s = l != null ? l[a] : void 0), r.hasOwnProperty(a) && u !== s && (u != null || s != null)))
        if (a === "style")
          if (s) {
            for (i in s) !s.hasOwnProperty(i) || (u && u.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ""));
            for (i in u) u.hasOwnProperty(i) && s[i] !== u[i] && (n || (n = {}), (n[i] = u[i]));
          } else (n || (o || (o = []), o.push(a, n)), (n = u));
        else
          a === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0), (s = s ? s.__html : void 0), u != null && s !== u && (o = o || []).push(a, u))
            : a === "children"
              ? (typeof u != "string" && typeof u != "number") || (o = o || []).push(a, "" + u)
              : a !== "suppressContentEditableWarning" &&
                a !== "suppressHydrationWarning" &&
                (tr.hasOwnProperty(a)
                  ? (u != null && a === "onScroll" && b("scroll", e), o || s === u || (o = []))
                  : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
Ic = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function An(e, t) {
  if (!G)
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
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes), (r |= l.subtreeFlags), (r |= l.flags), (l.return = e), (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Ip(e, t, n) {
  var r = t.pendingProps;
  switch ((Fi(t), t.tag)) {
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
      return (ce(t), null);
    case 1:
      return (Ce(t.type) && cl(), ce(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Cn(),
        H(Se),
        H(fe),
        Ki(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ar(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ve !== null && (hi(Ve), (Ve = null)))),
        si(e, t),
        ce(t),
        null
      );
    case 5:
      Gi(t);
      var l = Ft(pr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Mc(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return (ce(t), null);
        }
        if (((e = Ft(Ze.current)), Ar(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[Ye] = t), (r[dr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (b("cancel", r), b("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              b("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Wn.length; l++) b(Wn[l], r);
              break;
            case "source":
              b("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (b("error", r), b("load", r));
              break;
            case "details":
              b("toggle", r);
              break;
            case "input":
              (Cs(r, o), b("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!o.multiple }), b("invalid", r));
              break;
            case "textarea":
              (Es(r, o), b("invalid", r));
          }
          (Io(n, o), (l = null));
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var s = o[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 && Or(r.textContent, s, e), (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 && Or(r.textContent, s, e), (l = ["children", "" + s]))
                : tr.hasOwnProperty(i) && s != null && i === "onScroll" && b("scroll", r);
            }
          switch (n) {
            case "input":
              (jr(r), Ns(r, o, !0));
              break;
            case "textarea":
              (jr(r), _s(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = al);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = ua(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")), (e.innerHTML = "<script><\/script>"), (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === "select" && ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Ye] = t),
            (e[dr] = r),
            Rc(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = Oo(n, r)), n)) {
              case "dialog":
                (b("cancel", e), b("close", e), (l = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (b("load", e), (l = r));
                break;
              case "video":
              case "audio":
                for (l = 0; l < Wn.length; l++) b(Wn[l], e);
                l = r;
                break;
              case "source":
                (b("error", e), (l = r));
                break;
              case "img":
              case "image":
              case "link":
                (b("error", e), b("load", e), (l = r));
                break;
              case "details":
                (b("toggle", e), (l = r));
                break;
              case "input":
                (Cs(e, r), (l = zo(e, r)), b("invalid", e));
                break;
              case "option":
                l = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }), (l = X({}, r, { value: void 0 })), b("invalid", e));
                break;
              case "textarea":
                (Es(e, r), (l = Ro(e, r)), b("invalid", e));
                break;
              default:
                l = r;
            }
            (Io(n, l), (s = l));
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var u = s[o];
                o === "style"
                  ? da(e, u)
                  : o === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && aa(e, u))
                    : o === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && nr(e, u)
                        : typeof u == "number" && nr(e, "" + u)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (tr.hasOwnProperty(o)
                          ? u != null && o === "onScroll" && b("scroll", e)
                          : u != null && Ni(e, o, u, i));
              }
            switch (n) {
              case "input":
                (jr(e), Ns(e, r, !1));
                break;
              case "textarea":
                (jr(e), _s(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + jt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null ? fn(e, !!r.multiple, o, !1) : r.defaultValue != null && fn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = al);
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
      return (ce(t), null);
    case 6:
      if (e && t.stateNode != null) Ic(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (((n = Ft(pr.current)), Ft(Ze.current), Ar(t))) {
          if (((r = t.stateNode), (n = t.memoizedProps), (r[Ye] = t), (o = r.nodeValue !== n) && ((e = je), e !== null)))
            switch (e.tag) {
              case 3:
                Or(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Or(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[Ye] = t), (t.stateNode = r));
      }
      return (ce(t), null);
    case 13:
      if ((H(K), (r = t.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
        if (G && _e !== null && t.mode & 1 && !(t.flags & 128)) (Ja(), kn(), (t.flags |= 98560), (o = !1));
        else if (((o = Ar(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(S(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o)) throw Error(S(317));
            o[Ye] = t;
          } else (kn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
          (ce(t), (o = !1));
        } else (Ve !== null && (hi(Ve), (Ve = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192), t.mode & 1 && (e === null || K.current & 1 ? te === 0 && (te = 3) : is())),
          t.updateQueue !== null && (t.flags |= 4),
          ce(t),
          null);
    case 4:
      return (Cn(), si(e, t), e === null && ar(t.stateNode.containerInfo), ce(t), null);
    case 10:
      return (Wi(t.type._context), ce(t), null);
    case 17:
      return (Ce(t.type) && cl(), ce(t), null);
    case 19:
      if ((H(K), (o = t.memoizedState), o === null)) return (ce(t), null);
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) An(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = vl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    An(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling));
                return (B(K, (K.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null && J() > En && ((t.flags |= 128), (r = !0), An(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = vl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              An(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !G)
            )
              return (ce(t), null);
          } else
            2 * J() - o.renderingStartTime > En &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), An(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last), n !== null ? (n.sibling = i) : (t.child = i), (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = J()),
          (t.sibling = null),
          (n = K.current),
          B(K, r ? (n & 1) | 2 : n & 1),
          t)
        : (ce(t), null);
    case 22:
    case 23:
      return (
        os(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1 ? Ee & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Op(e, t) {
  switch ((Fi(t), t.tag)) {
    case 1:
      return (Ce(t.type) && cl(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 3:
      return (Cn(), H(Se), H(fe), Ki(), (e = t.flags), e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null);
    case 5:
      return (Gi(t), null);
    case 13:
      if ((H(K), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(S(340));
        kn();
      }
      return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
    case 19:
      return (H(K), null);
    case 4:
      return (Cn(), null);
    case 10:
      return (Wi(t.type._context), null);
    case 22:
    case 23:
      return (os(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Fr = !1,
  de = !1,
  Ap = typeof WeakSet == "function" ? WeakSet : Set,
  j = null;
function cn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Z(e, t, r);
      }
    else n.current = null;
}
function ui(e, t, n) {
  try {
    n();
  } catch (r) {
    Z(e, t, r);
  }
}
var hu = !1;
function Dp(e, t) {
  if (((Ho = il), (e = Fa()), Di(e))) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            u = -1,
            a = 0,
            h = 0,
            g = e,
            m = null;
          t: for (;;) {
            for (
              var y;
              g !== n || (l !== 0 && g.nodeType !== 3) || (s = i + l),
                g !== o || (r !== 0 && g.nodeType !== 3) || (u = i + r),
                g.nodeType === 3 && (i += g.nodeValue.length),
                (y = g.firstChild) !== null;
            )
              ((m = g), (g = y));
            for (;;) {
              if (g === e) break t;
              if ((m === n && ++a === l && (s = i), m === o && ++h === r && (u = i), (y = g.nextSibling) !== null)) break;
              ((g = m), (m = g.parentNode));
            }
            g = y;
          }
          n = s === -1 || u === -1 ? null : { start: s, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Qo = { focusedElem: e, selectionRange: n }, il = !1, j = t; j !== null; )
    if (((t = j), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) ((e.return = t), (j = e));
    else
      for (; j !== null; ) {
        t = j;
        try {
          var k = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var v = k.memoizedProps,
                    T = k.memoizedState,
                    f = t.stateNode,
                    c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? v : Fe(t.type, v), T);
                  f.__reactInternalSnapshotBeforeUpdate = c;
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
                throw Error(S(163));
            }
        } catch (w) {
          Z(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (j = e));
          break;
        }
        j = t.return;
      }
  return ((k = hu), (hu = !1), k);
}
function Jn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        ((l.destroy = void 0), o !== void 0 && ui(t, n, o));
      }
      l = l.next;
    } while (l !== r);
  }
}
function $l(e, t) {
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
function ai(e) {
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
function Oc(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Oc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && (delete t[Ye], delete t[dr], delete t[Yo], delete t[xp], delete t[wp])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Ac(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function gu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ac(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ci(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = al)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ci(e, t, n), e = e.sibling; e !== null; ) (ci(e, t, n), (e = e.sibling));
}
function di(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (di(e, t, n), e = e.sibling; e !== null; ) (di(e, t, n), (e = e.sibling));
}
var oe = null,
  Ue = !1;
function ct(e, t, n) {
  for (n = n.child; n !== null; ) (Dc(e, t, n), (n = n.sibling));
}
function Dc(e, t, n) {
  if (Xe && typeof Xe.onCommitFiberUnmount == "function")
    try {
      Xe.onCommitFiberUnmount(Tl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      de || cn(n, t);
    case 6:
      var r = oe,
        l = Ue;
      ((oe = null),
        ct(e, t, n),
        (oe = r),
        (Ue = l),
        oe !== null &&
          (Ue
            ? ((e = oe), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : oe.removeChild(n.stateNode)));
      break;
    case 18:
      oe !== null &&
        (Ue
          ? ((e = oe), (n = n.stateNode), e.nodeType === 8 ? ao(e.parentNode, n) : e.nodeType === 1 && ao(e, n), ir(e))
          : ao(oe, n.stateNode));
      break;
    case 4:
      ((r = oe), (l = Ue), (oe = n.stateNode.containerInfo), (Ue = !0), ct(e, t, n), (oe = r), (Ue = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          ((o = o.tag), i !== void 0 && (o & 2 || o & 4) && ui(n, t, i), (l = l.next));
        } while (l !== r);
      }
      ct(e, t, n);
      break;
    case 1:
      if (!de && (cn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
        try {
          ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
        } catch (s) {
          Z(n, t, s);
        }
      ct(e, t, n);
      break;
    case 21:
      ct(e, t, n);
      break;
    case 22:
      n.mode & 1 ? ((de = (r = de) || n.memoizedState !== null), ct(e, t, n), (de = r)) : ct(e, t, n);
      break;
    default:
      ct(e, t, n);
  }
}
function vu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Ap()),
      t.forEach(function (r) {
        var l = Qp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          s = i;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              ((oe = s.stateNode), (Ue = !1));
              break e;
            case 3:
              ((oe = s.stateNode.containerInfo), (Ue = !0));
              break e;
            case 4:
              ((oe = s.stateNode.containerInfo), (Ue = !0));
              break e;
          }
          s = s.return;
        }
        if (oe === null) throw Error(S(160));
        (Dc(o, i, l), (oe = null), (Ue = !1));
        var u = l.alternate;
        (u !== null && (u.return = null), (l.return = null));
      } catch (a) {
        Z(l, t, a);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ($c(t, e), (t = t.sibling));
}
function $c(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (($e(t, e), He(e), r & 4)) {
        try {
          (Jn(3, e, e.return), $l(3, e));
        } catch (v) {
          Z(e, e.return, v);
        }
        try {
          Jn(5, e, e.return);
        } catch (v) {
          Z(e, e.return, v);
        }
      }
      break;
    case 1:
      ($e(t, e), He(e), r & 512 && n !== null && cn(n, n.return));
      break;
    case 5:
      if (($e(t, e), He(e), r & 512 && n !== null && cn(n, n.return), e.flags & 32)) {
        var l = e.stateNode;
        try {
          nr(l, "");
        } catch (v) {
          Z(e, e.return, v);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          s = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            (s === "input" && o.type === "radio" && o.name != null && ia(l, o), Oo(s, i));
            var a = Oo(s, o);
            for (i = 0; i < u.length; i += 2) {
              var h = u[i],
                g = u[i + 1];
              h === "style"
                ? da(l, g)
                : h === "dangerouslySetInnerHTML"
                  ? aa(l, g)
                  : h === "children"
                    ? nr(l, g)
                    : Ni(l, h, g, a);
            }
            switch (s) {
              case "input":
                To(l, o);
                break;
              case "textarea":
                sa(l, o);
                break;
              case "select":
                var m = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var y = o.value;
                y != null
                  ? fn(l, !!o.multiple, y, !1)
                  : m !== !!o.multiple &&
                    (o.defaultValue != null
                      ? fn(l, !!o.multiple, o.defaultValue, !0)
                      : fn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[dr] = o;
          } catch (v) {
            Z(e, e.return, v);
          }
      }
      break;
    case 6:
      if (($e(t, e), He(e), r & 4)) {
        if (e.stateNode === null) throw Error(S(162));
        ((l = e.stateNode), (o = e.memoizedProps));
        try {
          l.nodeValue = o;
        } catch (v) {
          Z(e, e.return, v);
        }
      }
      break;
    case 3:
      if (($e(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          ir(t.containerInfo);
        } catch (v) {
          Z(e, e.return, v);
        }
      break;
    case 4:
      ($e(t, e), He(e));
      break;
    case 13:
      ($e(t, e),
        He(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o || (l.alternate !== null && l.alternate.memoizedState !== null) || (rs = J())),
        r & 4 && vu(e));
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((de = (a = de) || h), $e(t, e), (de = a)) : $e(t, e),
        He(e),
        r & 8192)
      ) {
        if (((a = e.memoizedState !== null), (e.stateNode.isHidden = a) && !h && e.mode & 1))
          for (j = e, h = e.child; h !== null; ) {
            for (g = j = h; j !== null; ) {
              switch (((m = j), (y = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jn(4, m, m.return);
                  break;
                case 1:
                  cn(m, m.return);
                  var k = m.stateNode;
                  if (typeof k.componentWillUnmount == "function") {
                    ((r = m), (n = m.return));
                    try {
                      ((t = r), (k.props = t.memoizedProps), (k.state = t.memoizedState), k.componentWillUnmount());
                    } catch (v) {
                      Z(r, n, v);
                    }
                  }
                  break;
                case 5:
                  cn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    xu(g);
                    continue;
                  }
              }
              y !== null ? ((y.return = m), (j = y)) : xu(g);
            }
            h = h.sibling;
          }
        e: for (h = null, g = e; ; ) {
          if (g.tag === 5) {
            if (h === null) {
              h = g;
              try {
                ((l = g.stateNode),
                  a
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = g.stateNode),
                      (u = g.memoizedProps.style),
                      (i = u != null && u.hasOwnProperty("display") ? u.display : null),
                      (s.style.display = ca("display", i))));
              } catch (v) {
                Z(e, e.return, v);
              }
            }
          } else if (g.tag === 6) {
            if (h === null)
              try {
                g.stateNode.nodeValue = a ? "" : g.memoizedProps;
              } catch (v) {
                Z(e, e.return, v);
              }
          } else if (((g.tag !== 22 && g.tag !== 23) || g.memoizedState === null || g === e) && g.child !== null) {
            ((g.child.return = g), (g = g.child));
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            (h === g && (h = null), (g = g.return));
          }
          (h === g && (h = null), (g.sibling.return = g.return), (g = g.sibling));
        }
      }
      break;
    case 19:
      ($e(t, e), He(e), r & 4 && vu(e));
      break;
    case 21:
      break;
    default:
      ($e(t, e), He(e));
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ac(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (nr(l, ""), (r.flags &= -33));
          var o = gu(e);
          di(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = gu(e);
          ci(e, s, i);
          break;
        default:
          throw Error(S(161));
      }
    } catch (u) {
      Z(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function $p(e, t, n) {
  ((j = e), Fc(e));
}
function Fc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; j !== null; ) {
    var l = j,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Fr;
      if (!i) {
        var s = l.alternate,
          u = (s !== null && s.memoizedState !== null) || de;
        s = Fr;
        var a = de;
        if (((Fr = i), (de = u) && !a))
          for (j = l; j !== null; )
            ((i = j),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null ? wu(l) : u !== null ? ((u.return = i), (j = u)) : wu(l));
        for (; o !== null; ) ((j = o), Fc(o), (o = o.sibling));
        ((j = l), (Fr = s), (de = a));
      }
      yu(e);
    } else l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (j = o)) : yu(e);
  }
}
function yu(e) {
  for (; j !== null; ) {
    var t = j;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              de || $l(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !de)
                if (n === null) r.componentDidMount();
                else {
                  var l = t.elementType === t.type ? n.memoizedProps : Fe(t.type, n.memoizedProps);
                  r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && nu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                nu(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
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
                var a = t.alternate;
                if (a !== null) {
                  var h = a.memoizedState;
                  if (h !== null) {
                    var g = h.dehydrated;
                    g !== null && ir(g);
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
              throw Error(S(163));
          }
        de || (t.flags & 512 && ai(t));
      } catch (m) {
        Z(t, t.return, m);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (j = n));
      break;
    }
    j = t.return;
  }
}
function xu(e) {
  for (; j !== null; ) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (j = n));
      break;
    }
    j = t.return;
  }
}
function wu(e) {
  for (; j !== null; ) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            $l(4, t);
          } catch (u) {
            Z(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Z(t, l, u);
            }
          }
          var o = t.return;
          try {
            ai(t);
          } catch (u) {
            Z(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ai(t);
          } catch (u) {
            Z(t, i, u);
          }
      }
    } catch (u) {
      Z(t, t.return, u);
    }
    if (t === e) {
      j = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (j = s));
      break;
    }
    j = t.return;
  }
}
var Fp = Math.ceil,
  wl = ut.ReactCurrentDispatcher,
  ts = ut.ReactCurrentOwner,
  Ie = ut.ReactCurrentBatchConfig,
  F = 0,
  le = null,
  q = null,
  ie = 0,
  Ee = 0,
  dn = Tt(0),
  te = 0,
  vr = null,
  Ht = 0,
  Fl = 0,
  ns = 0,
  qn = null,
  we = null,
  rs = 0,
  En = 1 / 0,
  qe = null,
  kl = !1,
  fi = null,
  Nt = null,
  Ur = !1,
  yt = null,
  Sl = 0,
  er = 0,
  pi = null,
  Jr = -1,
  qr = 0;
function ge() {
  return F & 6 ? J() : Jr !== -1 ? Jr : (Jr = J());
}
function Et(e) {
  return e.mode & 1
    ? F & 2 && ie !== 0
      ? ie & -ie
      : Sp.transition !== null
        ? (qr === 0 && (qr = Ca()), qr)
        : ((e = V), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Ta(e.type))), e)
    : 1;
}
function We(e, t, n, r) {
  if (50 < er) throw ((er = 0), (pi = null), Error(S(185)));
  (xr(e, n, r),
    (!(F & 2) || e !== le) &&
      (e === le && (!(F & 2) && (Fl |= n), te === 4 && gt(e, ie)),
      Ne(e, r),
      n === 1 && F === 0 && !(t.mode & 1) && ((En = J() + 500), Ol && Lt())));
}
function Ne(e, t) {
  var n = e.callbackNode;
  Sf(e, t);
  var r = ol(e, e === le ? ie : 0);
  if (r === 0) (n !== null && zs(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && zs(n), t === 1))
      (e.tag === 0 ? kp(ku.bind(null, e)) : Ya(ku.bind(null, e)),
        vp(function () {
          !(F & 6) && Lt();
        }),
        (n = null));
    else {
      switch (Na(r)) {
        case 1:
          n = zi;
          break;
        case 4:
          n = ka;
          break;
        case 16:
          n = ll;
          break;
        case 536870912:
          n = Sa;
          break;
        default:
          n = ll;
      }
      n = Gc(n, Uc.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Uc(e, t) {
  if (((Jr = -1), (qr = 0), F & 6)) throw Error(S(327));
  var n = e.callbackNode;
  if (vn() && e.callbackNode !== n) return null;
  var r = ol(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Cl(e, r);
  else {
    t = r;
    var l = F;
    F |= 2;
    var o = Bc();
    (le !== e || ie !== t) && ((qe = null), (En = J() + 500), Ut(e, t));
    do
      try {
        Bp();
        break;
      } catch (s) {
        Vc(e, s);
      }
    while (!0);
    (Bi(), (wl.current = o), (F = l), q !== null ? (t = 0) : ((le = null), (ie = 0), (t = te)));
  }
  if (t !== 0) {
    if ((t === 2 && ((l = Uo(e)), l !== 0 && ((r = l), (t = mi(e, l)))), t === 1))
      throw ((n = vr), Ut(e, 0), gt(e, r), Ne(e, J()), n);
    if (t === 6) gt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) && !Up(l) && ((t = Cl(e, r)), t === 2 && ((o = Uo(e)), o !== 0 && ((r = o), (t = mi(e, o)))), t === 1))
      )
        throw ((n = vr), Ut(e, 0), gt(e, r), Ne(e, J()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          At(e, we, qe);
          break;
        case 3:
          if ((gt(e, r), (r & 130023424) === r && ((t = rs + 500 - J()), 10 < t))) {
            if (ol(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (ge(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Ko(At.bind(null, e, we, qe), t);
            break;
          }
          At(e, we, qe);
          break;
        case 4:
          if ((gt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Be(r);
            ((o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o));
          }
          if (
            ((r = l),
            (r = J() - r),
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
                          : 1960 * Fp(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ko(At.bind(null, e, we, qe), r);
            break;
          }
          At(e, we, qe);
          break;
        case 5:
          At(e, we, qe);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return (Ne(e, J()), e.callbackNode === n ? Uc.bind(null, e) : null);
}
function mi(e, t) {
  var n = qn;
  return (
    e.current.memoizedState.isDehydrated && (Ut(e, t).flags |= 256),
    (e = Cl(e, t)),
    e !== 2 && ((t = we), (we = n), t !== null && hi(t)),
    e
  );
}
function hi(e) {
  we === null ? (we = e) : we.push.apply(we, e);
}
function Up(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!be(o(), l)) return !1;
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
function gt(e, t) {
  for (t &= ~ns, t &= ~Fl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Be(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function ku(e) {
  if (F & 6) throw Error(S(327));
  vn();
  var t = ol(e, 0);
  if (!(t & 1)) return (Ne(e, J()), null);
  var n = Cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Uo(e);
    r !== 0 && ((t = r), (n = mi(e, r)));
  }
  if (n === 1) throw ((n = vr), Ut(e, 0), gt(e, t), Ne(e, J()), n);
  if (n === 6) throw Error(S(345));
  return ((e.finishedWork = e.current.alternate), (e.finishedLanes = t), At(e, we, qe), Ne(e, J()), null);
}
function ls(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    ((F = n), F === 0 && ((En = J() + 500), Ol && Lt()));
  }
}
function Qt(e) {
  yt !== null && yt.tag === 0 && !(F & 6) && vn();
  var t = F;
  F |= 1;
  var n = Ie.transition,
    r = V;
  try {
    if (((Ie.transition = null), (V = 1), e)) return e();
  } finally {
    ((V = r), (Ie.transition = n), (F = t), !(F & 6) && Lt());
  }
}
function os() {
  ((Ee = dn.current), H(dn));
}
function Ut(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), gp(n)), q !== null))
    for (n = q.return; n !== null; ) {
      var r = n;
      switch ((Fi(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && cl());
          break;
        case 3:
          (Cn(), H(Se), H(fe), Ki());
          break;
        case 5:
          Gi(r);
          break;
        case 4:
          Cn();
          break;
        case 13:
          H(K);
          break;
        case 19:
          H(K);
          break;
        case 10:
          Wi(r.type._context);
          break;
        case 22:
        case 23:
          os();
      }
      n = n.return;
    }
  if (
    ((le = e),
    (q = e = _t(e.current, null)),
    (ie = Ee = t),
    (te = 0),
    (vr = null),
    (ns = Fl = Ht = 0),
    (we = qn = null),
    $t !== null)
  ) {
    for (t = 0; t < $t.length; t++)
      if (((n = $t[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          ((o.next = l), (r.next = i));
        }
        n.pending = r;
      }
    $t = null;
  }
  return e;
}
function Vc(e, t) {
  do {
    var n = q;
    try {
      if ((Bi(), (Yr.current = xl), yl)) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        yl = !1;
      }
      if (((bt = 0), (re = ee = Y = null), (Zn = !1), (mr = 0), (ts.current = null), n === null || n.return === null)) {
        ((te = 1), (vr = t), (q = null));
        break;
      }
      e: {
        var o = e,
          i = n.return,
          s = n,
          u = t;
        if (((t = ie), (s.flags |= 32768), u !== null && typeof u == "object" && typeof u.then == "function")) {
          var a = u,
            h = s,
            g = h.tag;
          if (!(h.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var m = h.alternate;
            m
              ? ((h.updateQueue = m.updateQueue), (h.memoizedState = m.memoizedState), (h.lanes = m.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var y = uu(i);
          if (y !== null) {
            ((y.flags &= -257), au(y, i, s, o, t), y.mode & 1 && su(o, a, t), (t = y), (u = a));
            var k = t.updateQueue;
            if (k === null) {
              var v = new Set();
              (v.add(u), (t.updateQueue = v));
            } else k.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              (su(o, a, t), is());
              break e;
            }
            u = Error(S(426));
          }
        } else if (G && s.mode & 1) {
          var T = uu(i);
          if (T !== null) {
            (!(T.flags & 65536) && (T.flags |= 256), au(T, i, s, o, t), Ui(Nn(u, s)));
            break e;
          }
        }
        ((o = u = Nn(u, s)), te !== 4 && (te = 2), qn === null ? (qn = [o]) : qn.push(o), (o = i));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var f = Nc(o, u, t);
              tu(o, f);
              break e;
            case 1:
              s = u;
              var c = o.type,
                p = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null && typeof p.componentDidCatch == "function" && (Nt === null || !Nt.has(p))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var w = Ec(o, s, t);
                tu(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      bc(n);
    } catch (E) {
      ((t = E), q === n && n !== null && (q = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Bc() {
  var e = wl.current;
  return ((wl.current = xl), e === null ? xl : e);
}
function is() {
  ((te === 0 || te === 3 || te === 2) && (te = 4), le === null || (!(Ht & 268435455) && !(Fl & 268435455)) || gt(le, ie));
}
function Cl(e, t) {
  var n = F;
  F |= 2;
  var r = Bc();
  (le !== e || ie !== t) && ((qe = null), Ut(e, t));
  do
    try {
      Vp();
      break;
    } catch (l) {
      Vc(e, l);
    }
  while (!0);
  if ((Bi(), (F = n), (wl.current = r), q !== null)) throw Error(S(261));
  return ((le = null), (ie = 0), te);
}
function Vp() {
  for (; q !== null; ) Wc(q);
}
function Bp() {
  for (; q !== null && !pf(); ) Wc(q);
}
function Wc(e) {
  var t = Qc(e.alternate, e, Ee);
  ((e.memoizedProps = e.pendingProps), t === null ? bc(e) : (q = t), (ts.current = null));
}
function bc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Op(n, t)), n !== null)) {
        ((n.flags &= 32767), (q = n));
        return;
      }
      if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((te = 6), (q = null));
        return;
      }
    } else if (((n = Ip(n, t, Ee)), n !== null)) {
      q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function At(e, t, n) {
  var r = V,
    l = Ie.transition;
  try {
    ((Ie.transition = null), (V = 1), Wp(e, t, n, r));
  } finally {
    ((Ie.transition = l), (V = r));
  }
  return null;
}
function Wp(e, t, n, r) {
  do vn();
  while (yt !== null);
  if (F & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(S(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    (Cf(e, o),
    e === le && ((q = le = null), (ie = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Ur ||
      ((Ur = !0),
      Gc(ll, function () {
        return (vn(), null);
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ((o = Ie.transition), (Ie.transition = null));
    var i = V;
    V = 1;
    var s = F;
    ((F |= 4),
      (ts.current = null),
      Dp(e, n),
      $c(n, e),
      ap(Qo),
      (il = !!Ho),
      (Qo = Ho = null),
      (e.current = n),
      $p(n),
      mf(),
      (F = s),
      (V = i),
      (Ie.transition = o));
  } else e.current = n;
  if (
    (Ur && ((Ur = !1), (yt = e), (Sl = l)),
    (o = e.pendingLanes),
    o === 0 && (Nt = null),
    vf(n.stateNode),
    Ne(e, J()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (kl) throw ((kl = !1), (e = fi), (fi = null), e);
  return (
    Sl & 1 && e.tag !== 0 && vn(),
    (o = e.pendingLanes),
    o & 1 ? (e === pi ? er++ : ((er = 0), (pi = e))) : (er = 0),
    Lt(),
    null
  );
}
function vn() {
  if (yt !== null) {
    var e = Na(Sl),
      t = Ie.transition,
      n = V;
    try {
      if (((Ie.transition = null), (V = 16 > e ? 16 : e), yt === null)) var r = !1;
      else {
        if (((e = yt), (yt = null), (Sl = 0), F & 6)) throw Error(S(331));
        var l = F;
        for (F |= 4, j = e.current; j !== null; ) {
          var o = j,
            i = o.child;
          if (j.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var a = s[u];
                for (j = a; j !== null; ) {
                  var h = j;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Jn(8, h, o);
                  }
                  var g = h.child;
                  if (g !== null) ((g.return = h), (j = g));
                  else
                    for (; j !== null; ) {
                      h = j;
                      var m = h.sibling,
                        y = h.return;
                      if ((Oc(h), h === a)) {
                        j = null;
                        break;
                      }
                      if (m !== null) {
                        ((m.return = y), (j = m));
                        break;
                      }
                      j = y;
                    }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var v = k.child;
                if (v !== null) {
                  k.child = null;
                  do {
                    var T = v.sibling;
                    ((v.sibling = null), (v = T));
                  } while (v !== null);
                }
              }
              j = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) ((i.return = o), (j = i));
          else
            e: for (; j !== null; ) {
              if (((o = j), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Jn(9, o, o.return);
                }
              var f = o.sibling;
              if (f !== null) {
                ((f.return = o.return), (j = f));
                break e;
              }
              j = o.return;
            }
        }
        var c = e.current;
        for (j = c; j !== null; ) {
          i = j;
          var p = i.child;
          if (i.subtreeFlags & 2064 && p !== null) ((p.return = i), (j = p));
          else
            e: for (i = c; j !== null; ) {
              if (((s = j), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $l(9, s);
                  }
                } catch (E) {
                  Z(s, s.return, E);
                }
              if (s === i) {
                j = null;
                break e;
              }
              var w = s.sibling;
              if (w !== null) {
                ((w.return = s.return), (j = w));
                break e;
              }
              j = s.return;
            }
        }
        if (((F = l), Lt(), Xe && typeof Xe.onPostCommitFiberRoot == "function"))
          try {
            Xe.onPostCommitFiberRoot(Tl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((V = n), (Ie.transition = t));
    }
  }
  return !1;
}
function Su(e, t, n) {
  ((t = Nn(n, t)), (t = Nc(e, t, 1)), (e = Ct(e, t, 1)), (t = ge()), e !== null && (xr(e, 1, t), Ne(e, t)));
}
function Z(e, t, n) {
  if (e.tag === 3) Su(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Su(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" && (Nt === null || !Nt.has(r)))
        ) {
          ((e = Nn(n, e)), (e = Ec(t, e, 1)), (t = Ct(t, e, 1)), (e = ge()), t !== null && (xr(t, 1, e), Ne(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function bp(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ge()),
    (e.pingedLanes |= e.suspendedLanes & n),
    le === e &&
      (ie & n) === n &&
      (te === 4 || (te === 3 && (ie & 130023424) === ie && 500 > J() - rs) ? Ut(e, 0) : (ns |= n)),
    Ne(e, t));
}
function Hc(e, t) {
  t === 0 && (e.mode & 1 ? ((t = Tr), (Tr <<= 1), !(Tr & 130023424) && (Tr = 4194304)) : (t = 1));
  var n = ge();
  ((e = it(e, t)), e !== null && (xr(e, t, n), Ne(e, n)));
}
function Hp(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), Hc(e, n));
}
function Qp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(S(314));
  }
  (r !== null && r.delete(t), Hc(e, n));
}
var Qc;
Qc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Se.current) ke = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((ke = !1), Mp(e, t, n));
      ke = !!(e.flags & 131072);
    }
  else ((ke = !1), G && t.flags & 1048576 && Xa(t, pl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Zr(e, t), (e = t.pendingProps));
      var l = wn(t, fe.current);
      (gn(t, n), (l = Xi(null, t, r, e, l, n)));
      var o = Zi();
      return (
        (t.flags |= 1),
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ce(r) ? ((o = !0), dl(t)) : (o = !1),
            (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
            Hi(t),
            (l.updater = Dl),
            (t.stateNode = l),
            (l._reactInternals = t),
            ti(t, r, e, n),
            (t = li(null, t, r, !0, o, n)))
          : ((t.tag = 0), G && o && $i(t), he(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Zr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Kp(r)),
          (e = Fe(r, e)),
          l)
        ) {
          case 0:
            t = ri(null, t, r, e, n);
            break e;
          case 1:
            t = fu(null, t, r, e, n);
            break e;
          case 11:
            t = cu(null, t, r, e, n);
            break e;
          case 14:
            t = du(null, t, r, Fe(r.type, e), n);
            break e;
        }
        throw Error(S(306, r, ""));
      }
      return t;
    case 0:
      return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Fe(r, l)), ri(e, t, r, l, n));
    case 1:
      return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Fe(r, l)), fu(e, t, r, l, n));
    case 3:
      e: {
        if ((zc(t), e === null)) throw Error(S(387));
        ((r = t.pendingProps), (o = t.memoizedState), (l = o.element), nc(e, t), gl(t, r, null, n));
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((l = Nn(Error(S(423)), t)), (t = pu(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = Nn(Error(S(424)), t)), (t = pu(e, t, r, n, l)));
            break e;
          } else
            for (
              _e = St(t.stateNode.containerInfo.firstChild), je = t, G = !0, Ve = null, n = ec(t, null, r, n), t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((kn(), r === l)) {
            t = st(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        rc(t),
        e === null && Jo(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Go(r, l) ? (i = null) : o !== null && Go(r, o) && (t.flags |= 32),
        Pc(e, t),
        he(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && Jo(t), null);
    case 13:
      return Tc(e, t, n);
    case 4:
      return (
        Qi(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Sn(t, null, r, n)) : he(e, t, r, n),
        t.child
      );
    case 11:
      return ((r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : Fe(r, l)), cu(e, t, r, l, n));
    case 7:
      return (he(e, t, t.pendingProps, n), t.child);
    case 8:
      return (he(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (he(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          B(ml, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (be(o.value, i)) {
            if (o.children === l.children && !Se.current) {
              t = st(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                i = o.child;
                for (var u = s.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      ((u = rt(-1, n & -n)), (u.tag = 2));
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var h = a.pending;
                        (h === null ? (u.next = u) : ((u.next = h.next), (h.next = u)), (a.pending = u));
                      }
                    }
                    ((o.lanes |= n), (u = o.alternate), u !== null && (u.lanes |= n), qo(o.return, n, t), (s.lanes |= n));
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(S(341));
                ((i.lanes |= n), (s = i.alternate), s !== null && (s.lanes |= n), qo(i, n, t), (i = o.sibling));
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    ((o.return = i.return), (i = o));
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        (he(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        gn(t, n),
        (l = Oe(l)),
        (r = r(l)),
        (t.flags |= 1),
        he(e, t, r, n),
        t.child
      );
    case 14:
      return ((r = t.type), (l = Fe(r, t.pendingProps)), (l = Fe(r.type, l)), du(e, t, r, l, n));
    case 15:
      return _c(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Fe(r, l)),
        Zr(e, t),
        (t.tag = 1),
        Ce(r) ? ((e = !0), dl(t)) : (e = !1),
        gn(t, n),
        Cc(t, r, l),
        ti(t, r, l, n),
        li(null, t, r, !0, e, n)
      );
    case 19:
      return Lc(e, t, n);
    case 22:
      return jc(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function Gc(e, t) {
  return wa(e, t);
}
function Gp(e, t, n, r) {
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
function Me(e, t, n, r) {
  return new Gp(e, t, n, r);
}
function ss(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Kp(e) {
  if (typeof e == "function") return ss(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === _i)) return 11;
    if (e === ji) return 14;
  }
  return 2;
}
function _t(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Me(e.tag, t, e.key, e.mode)),
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
function el(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) ss(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case en:
        return Vt(n.children, l, o, t);
      case Ei:
        ((i = 8), (l |= 8));
        break;
      case Eo:
        return ((e = Me(12, n, t, l | 2)), (e.elementType = Eo), (e.lanes = o), e);
      case _o:
        return ((e = Me(13, n, t, l)), (e.elementType = _o), (e.lanes = o), e);
      case jo:
        return ((e = Me(19, n, t, l)), (e.elementType = jo), (e.lanes = o), e);
      case ra:
        return Ul(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ta:
              i = 10;
              break e;
            case na:
              i = 9;
              break e;
            case _i:
              i = 11;
              break e;
            case ji:
              i = 14;
              break e;
            case pt:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(S(130, e == null ? e : typeof e, ""));
    }
  return ((t = Me(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
}
function Vt(e, t, n, r) {
  return ((e = Me(7, e, r, t)), (e.lanes = n), e);
}
function Ul(e, t, n, r) {
  return ((e = Me(22, e, r, t)), (e.elementType = ra), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e);
}
function yo(e, t, n) {
  return ((e = Me(6, e, null, t)), (e.lanes = n), e);
}
function xo(e, t, n) {
  return (
    (t = Me(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }),
    t
  );
}
function Yp(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Jl(0)),
    (this.expirationTimes = Jl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Jl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function us(e, t, n, r, l, o, i, s, u) {
  return (
    (e = new Yp(e, t, n, s, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Me(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }),
    Hi(o),
    e
  );
}
function Xp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Kc(e) {
  if (!e) return Pt;
  e = e._reactInternals;
  e: {
    if (Kt(e) !== e || e.tag !== 1) throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ce(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ce(n)) return Ka(e, n, t);
  }
  return t;
}
function Yc(e, t, n, r, l, o, i, s, u) {
  return (
    (e = us(n, r, !0, e, l, o, i, s, u)),
    (e.context = Kc(null)),
    (n = e.current),
    (r = ge()),
    (l = Et(n)),
    (o = rt(r, l)),
    (o.callback = t ?? null),
    Ct(n, o, l),
    (e.current.lanes = l),
    xr(e, l, r),
    Ne(e, r),
    e
  );
}
function Vl(e, t, n, r) {
  var l = t.current,
    o = ge(),
    i = Et(l);
  return (
    (n = Kc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = rt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Ct(l, t, i)),
    e !== null && (We(e, l, i, o), Kr(e, l, i)),
    i
  );
}
function Nl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Cu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function as(e, t) {
  (Cu(e, t), (e = e.alternate) && Cu(e, t));
}
function Zp() {
  return null;
}
var Xc =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function cs(e) {
  this._internalRoot = e;
}
Bl.prototype.render = cs.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  Vl(e, t, null, null);
};
Bl.prototype.unmount = cs.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Qt(function () {
      Vl(null, e, null, null);
    }),
      (t[ot] = null));
  }
};
function Bl(e) {
  this._internalRoot = e;
}
Bl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ja();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ht.length && t !== 0 && t < ht[n].priority; n++);
    (ht.splice(n, 0, e), n === 0 && za(e));
  }
};
function ds(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Wl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Nu() {}
function Jp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var a = Nl(i);
        o.call(a);
      };
    }
    var i = Yc(t, r, e, 0, null, !1, !1, "", Nu);
    return ((e._reactRootContainer = i), (e[ot] = i.current), ar(e.nodeType === 8 ? e.parentNode : e), Qt(), i);
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var a = Nl(u);
      s.call(a);
    };
  }
  var u = us(e, 0, !1, null, null, !1, !1, "", Nu);
  return (
    (e._reactRootContainer = u),
    (e[ot] = u.current),
    ar(e.nodeType === 8 ? e.parentNode : e),
    Qt(function () {
      Vl(t, u, n, r);
    }),
    u
  );
}
function bl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var u = Nl(i);
        s.call(u);
      };
    }
    Vl(t, i, e, l);
  } else i = Jp(n, t, e, l, r);
  return Nl(i);
}
Ea = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Bn(t.pendingLanes);
        n !== 0 && (Ti(t, n | 1), Ne(t, J()), !(F & 6) && ((En = J() + 500), Lt()));
      }
      break;
    case 13:
      (Qt(function () {
        var r = it(e, 1);
        if (r !== null) {
          var l = ge();
          We(r, e, 1, l);
        }
      }),
        as(e, 1));
  }
};
Li = function (e) {
  if (e.tag === 13) {
    var t = it(e, 134217728);
    if (t !== null) {
      var n = ge();
      We(t, e, 134217728, n);
    }
    as(e, 134217728);
  }
};
_a = function (e) {
  if (e.tag === 13) {
    var t = Et(e),
      n = it(e, t);
    if (n !== null) {
      var r = ge();
      We(n, e, t, r);
    }
    as(e, t);
  }
};
ja = function () {
  return V;
};
Pa = function (e, t) {
  var n = V;
  try {
    return ((V = e), t());
  } finally {
    V = n;
  }
};
Do = function (e, t, n) {
  switch (t) {
    case "input":
      if ((To(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Il(r);
            if (!l) throw Error(S(90));
            (oa(r), To(r, l));
          }
        }
      }
      break;
    case "textarea":
      sa(e, n);
      break;
    case "select":
      ((t = n.value), t != null && fn(e, !!n.multiple, t, !1));
  }
};
ma = ls;
ha = Qt;
var qp = { usingClientEntryPoint: !1, Events: [kr, ln, Il, fa, pa, ls] },
  Dn = { findFiberByHostInstance: Dt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" },
  em = {
    bundleType: Dn.bundleType,
    version: Dn.version,
    rendererPackageName: Dn.rendererPackageName,
    rendererConfig: Dn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ut.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = ya(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Dn.findFiberByHostInstance || Zp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Vr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Vr.isDisabled && Vr.supportsFiber)
    try {
      ((Tl = Vr.inject(em)), (Xe = Vr));
    } catch {}
}
ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
ze.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ds(t)) throw Error(S(200));
  return Xp(e, t, null, n);
};
ze.createRoot = function (e, t) {
  if (!ds(e)) throw Error(S(299));
  var n = !1,
    r = "",
    l = Xc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = us(e, 1, !1, null, null, n, !1, r, l)),
    (e[ot] = t.current),
    ar(e.nodeType === 8 ? e.parentNode : e),
    new cs(t)
  );
};
ze.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == "function" ? Error(S(188)) : ((e = Object.keys(e).join(",")), Error(S(268, e)));
  return ((e = ya(t)), (e = e === null ? null : e.stateNode), e);
};
ze.flushSync = function (e) {
  return Qt(e);
};
ze.hydrate = function (e, t, n) {
  if (!Wl(t)) throw Error(S(200));
  return bl(null, e, t, !0, n);
};
ze.hydrateRoot = function (e, t, n) {
  if (!ds(e)) throw Error(S(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = Xc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Yc(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[ot] = t.current),
    ar(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new Bl(t);
};
ze.render = function (e, t, n) {
  if (!Wl(t)) throw Error(S(200));
  return bl(null, e, t, !1, n);
};
ze.unmountComponentAtNode = function (e) {
  if (!Wl(e)) throw Error(S(40));
  return e._reactRootContainer
    ? (Qt(function () {
        bl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[ot] = null));
        });
      }),
      !0)
    : !1;
};
ze.unstable_batchedUpdates = ls;
ze.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Wl(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return bl(e, t, n, !1, r);
};
ze.version = "18.3.1-next-f1338f8080-20240426";
function Zc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zc);
    } catch (e) {
      console.error(e);
    }
}
(Zc(), (Zu.exports = ze));
var tm = Zu.exports,
  Eu = tm;
((Co.createRoot = Eu.createRoot), (Co.hydrateRoot = Eu.hydrateRoot));
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nm = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Jc = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var rm = {
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
 */ const lm = x.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: l = "",
      children: o,
      iconNode: i,
      ...s
    },
    u,
  ) =>
    x.createElement(
      "svg",
      {
        ref: u,
        ...rm,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: Jc("lucide", l),
        ...s,
      },
      [...i.map(([a, h]) => x.createElement(a, h)), ...(Array.isArray(o) ? o : [o])],
    ),
);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const at = (e, t) => {
  const n = x.forwardRef(({ className: r, ...l }, o) =>
    x.createElement(lm, { ref: o, iconNode: t, className: Jc(`lucide-${nm(e)}`, r), ...l }),
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const om = at("Activity", [
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
 */ const im = at("CircleOff", [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sm = at("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const um = at("RefreshCcw", [
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
 */ const am = at("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cm = at("ShieldAlert", [
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
 */ const _u = at("Sparkles", [
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
 */ const ju = at("SquareTerminal", [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
]);
/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dm = at("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
function qc(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var l = e.length;
      for (t = 0; t < l; t++) e[t] && (n = qc(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function ed() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++)
    (e = arguments[n]) && (t = qc(e)) && (r && (r += " "), (r += t));
  return r;
}
const Pu = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  zu = ed,
  td = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return zu(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    const { variants: l, defaultVariants: o } = t,
      i = Object.keys(l).map((a) => {
        const h = n == null ? void 0 : n[a],
          g = o == null ? void 0 : o[a];
        if (h === null) return null;
        const m = Pu(h) || Pu(g);
        return l[a][m];
      }),
      s =
        n &&
        Object.entries(n).reduce((a, h) => {
          let [g, m] = h;
          return (m === void 0 || (a[g] = m), a);
        }, {}),
      u =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((a, h) => {
              let { class: g, className: m, ...y } = h;
              return Object.entries(y).every((k) => {
                let [v, T] = k;
                return Array.isArray(T) ? T.includes({ ...o, ...s }[v]) : { ...o, ...s }[v] === T;
              })
                ? [...a, g, m]
                : a;
            }, []);
    return zu(e, i, u, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  },
  fs = "-",
  fm = (e) => {
    const t = mm(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (i) => {
        const s = i.split(fs);
        return (s[0] === "" && s.length !== 1 && s.shift(), nd(s, t) || pm(i));
      },
      getConflictingClassGroupIds: (i, s) => {
        const u = n[i] || [];
        return s && r[i] ? [...u, ...r[i]] : u;
      },
    };
  },
  nd = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      l = r ? nd(e.slice(1), r) : void 0;
    if (l) return l;
    if (t.validators.length === 0) return;
    const o = e.join(fs);
    return (i = t.validators.find(({ validator: s }) => s(o))) == null ? void 0 : i.classGroupId;
  },
  Tu = /^\[(.+)\]$/,
  pm = (e) => {
    if (Tu.test(e)) {
      const t = Tu.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (n) return "arbitrary.." + n;
    }
  },
  mm = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      gm(Object.entries(e.classGroups), n).forEach(([o, i]) => {
        gi(i, r, o, t);
      }),
      r
    );
  },
  gi = (e, t, n, r) => {
    e.forEach((l) => {
      if (typeof l == "string") {
        const o = l === "" ? t : Lu(t, l);
        o.classGroupId = n;
        return;
      }
      if (typeof l == "function") {
        if (hm(l)) {
          gi(l(r), t, n, r);
          return;
        }
        t.validators.push({ validator: l, classGroupId: n });
        return;
      }
      Object.entries(l).forEach(([o, i]) => {
        gi(i, Lu(t, o), n, r);
      });
    });
  },
  Lu = (e, t) => {
    let n = e;
    return (
      t.split(fs).forEach((r) => {
        (n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  hm = (e) => e.isThemeGetter,
  gm = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const l = r.map((o) =>
            typeof o == "string"
              ? t + o
              : typeof o == "object"
                ? Object.fromEntries(Object.entries(o).map(([i, s]) => [t + i, s]))
                : o,
          );
          return [n, l];
        })
      : e,
  vm = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const l = (o, i) => {
      (n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(o) {
        let i = n.get(o);
        if (i !== void 0) return i;
        if ((i = r.get(o)) !== void 0) return (l(o, i), i);
      },
      set(o, i) {
        n.has(o) ? n.set(o, i) : l(o, i);
      },
    };
  },
  rd = "!",
  ym = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      l = t[0],
      o = t.length,
      i = (s) => {
        const u = [];
        let a = 0,
          h = 0,
          g;
        for (let T = 0; T < s.length; T++) {
          let f = s[T];
          if (a === 0) {
            if (f === l && (r || s.slice(T, T + o) === t)) {
              (u.push(s.slice(h, T)), (h = T + o));
              continue;
            }
            if (f === "/") {
              g = T;
              continue;
            }
          }
          f === "[" ? a++ : f === "]" && a--;
        }
        const m = u.length === 0 ? s : s.substring(h),
          y = m.startsWith(rd),
          k = y ? m.substring(1) : m,
          v = g && g > h ? g - h : void 0;
        return { modifiers: u, hasImportantModifier: y, baseClassName: k, maybePostfixModifierPosition: v };
      };
    return n ? (s) => n({ className: s, parseClassName: i }) : i;
  },
  xm = (e) => {
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
  wm = (e) => ({ cache: vm(e.cacheSize), parseClassName: ym(e), ...fm(e) }),
  km = /\s+/,
  Sm = (e, t) => {
    const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: l } = t,
      o = [],
      i = e.trim().split(km);
    let s = "";
    for (let u = i.length - 1; u >= 0; u -= 1) {
      const a = i[u],
        { modifiers: h, hasImportantModifier: g, baseClassName: m, maybePostfixModifierPosition: y } = n(a);
      let k = !!y,
        v = r(k ? m.substring(0, y) : m);
      if (!v) {
        if (!k) {
          s = a + (s.length > 0 ? " " + s : s);
          continue;
        }
        if (((v = r(m)), !v)) {
          s = a + (s.length > 0 ? " " + s : s);
          continue;
        }
        k = !1;
      }
      const T = xm(h).join(":"),
        f = g ? T + rd : T,
        c = f + v;
      if (o.includes(c)) continue;
      o.push(c);
      const p = l(v, k);
      for (let w = 0; w < p.length; ++w) {
        const E = p[w];
        o.push(f + E);
      }
      s = a + (s.length > 0 ? " " + s : s);
    }
    return s;
  };
function Cm() {
  let e = 0,
    t,
    n,
    r = "";
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = ld(t)) && (r && (r += " "), (r += n));
  return r;
}
const ld = (e) => {
  if (typeof e == "string") return e;
  let t,
    n = "";
  for (let r = 0; r < e.length; r++) e[r] && (t = ld(e[r])) && (n && (n += " "), (n += t));
  return n;
};
function Nm(e, ...t) {
  let n,
    r,
    l,
    o = i;
  function i(u) {
    const a = t.reduce((h, g) => g(h), e());
    return ((n = wm(a)), (r = n.cache.get), (l = n.cache.set), (o = s), s(u));
  }
  function s(u) {
    const a = r(u);
    if (a) return a;
    const h = Sm(u, n);
    return (l(u, h), h);
  }
  return function () {
    return o(Cm.apply(null, arguments));
  };
}
const W = (e) => {
    const t = (n) => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  od = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Em = /^\d+\/\d+$/,
  _m = new Set(["px", "full", "screen"]),
  jm = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Pm =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  zm = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Tm = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Lm = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Je = (e) => yn(e) || _m.has(e) || Em.test(e),
  dt = (e) => zn(e, "length", Fm),
  yn = (e) => !!e && !Number.isNaN(Number(e)),
  wo = (e) => zn(e, "number", yn),
  $n = (e) => !!e && Number.isInteger(Number(e)),
  Rm = (e) => e.endsWith("%") && yn(e.slice(0, -1)),
  A = (e) => od.test(e),
  ft = (e) => jm.test(e),
  Mm = new Set(["length", "size", "percentage"]),
  Im = (e) => zn(e, Mm, id),
  Om = (e) => zn(e, "position", id),
  Am = new Set(["image", "url"]),
  Dm = (e) => zn(e, Am, Vm),
  $m = (e) => zn(e, "", Um),
  Fn = () => !0,
  zn = (e, t, n) => {
    const r = od.exec(e);
    return r ? (r[1] ? (typeof t == "string" ? r[1] === t : t.has(r[1])) : n(r[2])) : !1;
  },
  Fm = (e) => Pm.test(e) && !zm.test(e),
  id = () => !1,
  Um = (e) => Tm.test(e),
  Vm = (e) => Lm.test(e),
  Bm = () => {
    const e = W("colors"),
      t = W("spacing"),
      n = W("blur"),
      r = W("brightness"),
      l = W("borderColor"),
      o = W("borderRadius"),
      i = W("borderSpacing"),
      s = W("borderWidth"),
      u = W("contrast"),
      a = W("grayscale"),
      h = W("hueRotate"),
      g = W("invert"),
      m = W("gap"),
      y = W("gradientColorStops"),
      k = W("gradientColorStopPositions"),
      v = W("inset"),
      T = W("margin"),
      f = W("opacity"),
      c = W("padding"),
      p = W("saturate"),
      w = W("scale"),
      E = W("sepia"),
      P = W("skew"),
      z = W("space"),
      N = W("translate"),
      I = () => ["auto", "contain", "none"],
      O = () => ["auto", "hidden", "clip", "visible", "scroll"],
      ne = () => ["auto", A, t],
      D = () => [A, t],
      ue = () => ["", Je, dt],
      De = () => ["auto", yn, A],
      Rt = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
      _ = () => ["solid", "dashed", "dotted", "double", "none"],
      Q = () => [
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
      C = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
      L = () => ["", "0", A],
      R = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      M = () => [yn, A];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [Fn],
        spacing: [Je, dt],
        blur: ["none", "", ft, A],
        brightness: M(),
        borderColor: [e],
        borderRadius: ["none", "", "full", ft, A],
        borderSpacing: D(),
        borderWidth: ue(),
        contrast: M(),
        grayscale: L(),
        hueRotate: M(),
        invert: L(),
        gap: D(),
        gradientColorStops: [e],
        gradientColorStopPositions: [Rm, dt],
        inset: ne(),
        margin: ne(),
        opacity: M(),
        padding: D(),
        saturate: M(),
        scale: M(),
        sepia: L(),
        skew: M(),
        space: D(),
        translate: D(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", A] }],
        container: ["container"],
        columns: [{ columns: [ft] }],
        "break-after": [{ "break-after": R() }],
        "break-before": [{ "break-before": R() }],
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
        "object-position": [{ object: [...Rt(), A] }],
        overflow: [{ overflow: O() }],
        "overflow-x": [{ "overflow-x": O() }],
        "overflow-y": [{ "overflow-y": O() }],
        overscroll: [{ overscroll: I() }],
        "overscroll-x": [{ "overscroll-x": I() }],
        "overscroll-y": [{ "overscroll-y": I() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [v] }],
        "inset-x": [{ "inset-x": [v] }],
        "inset-y": [{ "inset-y": [v] }],
        start: [{ start: [v] }],
        end: [{ end: [v] }],
        top: [{ top: [v] }],
        right: [{ right: [v] }],
        bottom: [{ bottom: [v] }],
        left: [{ left: [v] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", $n, A] }],
        basis: [{ basis: ne() }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", A] }],
        grow: [{ grow: L() }],
        shrink: [{ shrink: L() }],
        order: [{ order: ["first", "last", "none", $n, A] }],
        "grid-cols": [{ "grid-cols": [Fn] }],
        "col-start-end": [{ col: ["auto", { span: ["full", $n, A] }, A] }],
        "col-start": [{ "col-start": De() }],
        "col-end": [{ "col-end": De() }],
        "grid-rows": [{ "grid-rows": [Fn] }],
        "row-start-end": [{ row: ["auto", { span: [$n, A] }, A] }],
        "row-start": [{ "row-start": De() }],
        "row-end": [{ "row-end": De() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", A] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", A] }],
        gap: [{ gap: [m] }],
        "gap-x": [{ "gap-x": [m] }],
        "gap-y": [{ "gap-y": [m] }],
        "justify-content": [{ justify: ["normal", ...C()] }],
        "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }],
        "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }],
        "align-content": [{ content: ["normal", ...C(), "baseline"] }],
        "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }],
        "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }],
        "place-content": [{ "place-content": [...C(), "baseline"] }],
        "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }],
        "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }],
        p: [{ p: [c] }],
        px: [{ px: [c] }],
        py: [{ py: [c] }],
        ps: [{ ps: [c] }],
        pe: [{ pe: [c] }],
        pt: [{ pt: [c] }],
        pr: [{ pr: [c] }],
        pb: [{ pb: [c] }],
        pl: [{ pl: [c] }],
        m: [{ m: [T] }],
        mx: [{ mx: [T] }],
        my: [{ my: [T] }],
        ms: [{ ms: [T] }],
        me: [{ me: [T] }],
        mt: [{ mt: [T] }],
        mr: [{ mr: [T] }],
        mb: [{ mb: [T] }],
        ml: [{ ml: [T] }],
        "space-x": [{ "space-x": [z] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [z] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", A, t] }],
        "min-w": [{ "min-w": [A, t, "min", "max", "fit"] }],
        "max-w": [{ "max-w": [A, t, "none", "full", "min", "max", "fit", "prose", { screen: [ft] }, ft] }],
        h: [{ h: [A, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [{ "min-h": [A, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "max-h": [{ "max-h": [A, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
        size: [{ size: [A, t, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", ft, dt] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          { font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", wo] },
        ],
        "font-family": [{ font: [Fn] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", A] }],
        "line-clamp": [{ "line-clamp": ["none", yn, wo] }],
        leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Je, A] }],
        "list-image": [{ "list-image": ["none", A] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", A] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [f] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [f] }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [..._(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: ["auto", "from-font", Je, dt] }],
        "underline-offset": [{ "underline-offset": ["auto", Je, A] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: D() }],
        "vertical-align": [{ align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", A] }],
        whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", A] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [f] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...Rt(), Om] }],
        "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }],
        "bg-size": [{ bg: ["auto", "cover", "contain", Im] }],
        "bg-image": [{ bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, Dm] }],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [k] }],
        "gradient-via-pos": [{ via: [k] }],
        "gradient-to-pos": [{ to: [k] }],
        "gradient-from": [{ from: [y] }],
        "gradient-via": [{ via: [y] }],
        "gradient-to": [{ to: [y] }],
        rounded: [{ rounded: [o] }],
        "rounded-s": [{ "rounded-s": [o] }],
        "rounded-e": [{ "rounded-e": [o] }],
        "rounded-t": [{ "rounded-t": [o] }],
        "rounded-r": [{ "rounded-r": [o] }],
        "rounded-b": [{ "rounded-b": [o] }],
        "rounded-l": [{ "rounded-l": [o] }],
        "rounded-ss": [{ "rounded-ss": [o] }],
        "rounded-se": [{ "rounded-se": [o] }],
        "rounded-ee": [{ "rounded-ee": [o] }],
        "rounded-es": [{ "rounded-es": [o] }],
        "rounded-tl": [{ "rounded-tl": [o] }],
        "rounded-tr": [{ "rounded-tr": [o] }],
        "rounded-br": [{ "rounded-br": [o] }],
        "rounded-bl": [{ "rounded-bl": [o] }],
        "border-w": [{ border: [s] }],
        "border-w-x": [{ "border-x": [s] }],
        "border-w-y": [{ "border-y": [s] }],
        "border-w-s": [{ "border-s": [s] }],
        "border-w-e": [{ "border-e": [s] }],
        "border-w-t": [{ "border-t": [s] }],
        "border-w-r": [{ "border-r": [s] }],
        "border-w-b": [{ "border-b": [s] }],
        "border-w-l": [{ "border-l": [s] }],
        "border-opacity": [{ "border-opacity": [f] }],
        "border-style": [{ border: [..._(), "hidden"] }],
        "divide-x": [{ "divide-x": [s] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [s] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [f] }],
        "divide-style": [{ divide: _() }],
        "border-color": [{ border: [l] }],
        "border-color-x": [{ "border-x": [l] }],
        "border-color-y": [{ "border-y": [l] }],
        "border-color-s": [{ "border-s": [l] }],
        "border-color-e": [{ "border-e": [l] }],
        "border-color-t": [{ "border-t": [l] }],
        "border-color-r": [{ "border-r": [l] }],
        "border-color-b": [{ "border-b": [l] }],
        "border-color-l": [{ "border-l": [l] }],
        "divide-color": [{ divide: [l] }],
        "outline-style": [{ outline: ["", ..._()] }],
        "outline-offset": [{ "outline-offset": [Je, A] }],
        "outline-w": [{ outline: [Je, dt] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: ue() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [f] }],
        "ring-offset-w": [{ "ring-offset": [Je, dt] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", ft, $m] }],
        "shadow-color": [{ shadow: [Fn] }],
        opacity: [{ opacity: [f] }],
        "mix-blend": [{ "mix-blend": [...Q(), "plus-lighter", "plus-darker"] }],
        "bg-blend": [{ "bg-blend": Q() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [u] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", ft, A] }],
        grayscale: [{ grayscale: [a] }],
        "hue-rotate": [{ "hue-rotate": [h] }],
        invert: [{ invert: [g] }],
        saturate: [{ saturate: [p] }],
        sepia: [{ sepia: [E] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [n] }],
        "backdrop-brightness": [{ "backdrop-brightness": [r] }],
        "backdrop-contrast": [{ "backdrop-contrast": [u] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [a] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [h] }],
        "backdrop-invert": [{ "backdrop-invert": [g] }],
        "backdrop-opacity": [{ "backdrop-opacity": [f] }],
        "backdrop-saturate": [{ "backdrop-saturate": [p] }],
        "backdrop-sepia": [{ "backdrop-sepia": [E] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [i] }],
        "border-spacing-x": [{ "border-spacing-x": [i] }],
        "border-spacing-y": [{ "border-spacing-y": [i] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [{ transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", A] }],
        duration: [{ duration: M() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", A] }],
        delay: [{ delay: M() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", A] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [w] }],
        "scale-x": [{ "scale-x": [w] }],
        "scale-y": [{ "scale-y": [w] }],
        rotate: [{ rotate: [$n, A] }],
        "translate-x": [{ "translate-x": [N] }],
        "translate-y": [{ "translate-y": [N] }],
        "skew-x": [{ "skew-x": [P] }],
        "skew-y": [{ "skew-y": [P] }],
        "transform-origin": [
          { origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", A] },
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
              A,
            ],
          },
        ],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": D() }],
        "scroll-mx": [{ "scroll-mx": D() }],
        "scroll-my": [{ "scroll-my": D() }],
        "scroll-ms": [{ "scroll-ms": D() }],
        "scroll-me": [{ "scroll-me": D() }],
        "scroll-mt": [{ "scroll-mt": D() }],
        "scroll-mr": [{ "scroll-mr": D() }],
        "scroll-mb": [{ "scroll-mb": D() }],
        "scroll-ml": [{ "scroll-ml": D() }],
        "scroll-p": [{ "scroll-p": D() }],
        "scroll-px": [{ "scroll-px": D() }],
        "scroll-py": [{ "scroll-py": D() }],
        "scroll-ps": [{ "scroll-ps": D() }],
        "scroll-pe": [{ "scroll-pe": D() }],
        "scroll-pt": [{ "scroll-pt": D() }],
        "scroll-pr": [{ "scroll-pr": D() }],
        "scroll-pb": [{ "scroll-pb": D() }],
        "scroll-pl": [{ "scroll-pl": D() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", A] }],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [Je, dt, wo] }],
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
  Wm = Nm(Bm);
function ve(...e) {
  return Wm(ed(e));
}
console.log("[codex] loaded: agents/src/lib/utils.ts");
const bm = td(
  "font-ui inline-flex items-center rounded-full border px-2.5 py-[3px] text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/35 bg-primary/15 text-primary",
        secondary: "border-secondary/70 bg-secondary/70 text-secondary-foreground",
        destructive: "border-rose-200 bg-rose-100/85 text-rose-700",
        outline: "border-border/90 bg-background/55 text-foreground/85",
        success: "border-emerald-200/85 bg-emerald-50 text-emerald-700",
        warning: "border-amber-200/85 bg-amber-50 text-amber-700",
        info: "border-sky-200/85 bg-sky-50 text-sky-700",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function Xt({ className: e, variant: t, ...n }) {
  return d.jsx("div", { className: ve(bm({ variant: t }), e), ...n });
}
console.log("[codex] loaded: agents/src/components/ui/badge.tsx");
function Ru(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function ps(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((l) => {
      const o = Ru(l, t);
      return (!n && typeof o == "function" && (n = !0), o);
    });
    if (n)
      return () => {
        for (let l = 0; l < r.length; l++) {
          const o = r[l];
          typeof o == "function" ? o() : Ru(e[l], null);
        }
      };
  };
}
function sd(...e) {
  return x.useCallback(ps(...e), e);
}
var Hm = Symbol.for("react.lazy"),
  El = Yu[" use ".trim().toString()];
function Qm(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function ud(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Hm && "_payload" in e && Qm(e._payload);
}
function ad(e) {
  const t = Km(e),
    n = x.forwardRef((r, l) => {
      let { children: o, ...i } = r;
      ud(o) && typeof El == "function" && (o = El(o._payload));
      const s = x.Children.toArray(o),
        u = s.find(Xm);
      if (u) {
        const a = u.props.children,
          h = s.map((g) =>
            g === u ? (x.Children.count(a) > 1 ? x.Children.only(null) : x.isValidElement(a) ? a.props.children : null) : g,
          );
        return d.jsx(t, { ...i, ref: l, children: x.isValidElement(a) ? x.cloneElement(a, void 0, h) : null });
      }
      return d.jsx(t, { ...i, ref: l, children: o });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var Gm = ad("Slot");
function Km(e) {
  const t = x.forwardRef((n, r) => {
    let { children: l, ...o } = n;
    if ((ud(l) && typeof El == "function" && (l = El(l._payload)), x.isValidElement(l))) {
      const i = Jm(l),
        s = Zm(o, l.props);
      return (l.type !== x.Fragment && (s.ref = r ? ps(r, i) : i), x.cloneElement(l, s));
    }
    return x.Children.count(l) > 1 ? x.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Ym = Symbol("radix.slottable");
function Xm(e) {
  return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ym;
}
function Zm(e, t) {
  const n = { ...t };
  for (const r in t) {
    const l = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? l && o
        ? (n[r] = (...s) => {
            const u = o(...s);
            return (l(...s), u);
          })
        : l && (n[r] = l)
      : r === "style"
        ? (n[r] = { ...l, ...o })
        : r === "className" && (n[r] = [l, o].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Jm(e) {
  var r, l;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (l = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : l.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
const qm = td(
    "font-ui inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[10px] font-medium uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "border-primary/40 bg-primary/15 text-foreground hover:bg-primary/24",
          secondary: "border-secondary/80 bg-secondary/85 text-secondary-foreground hover:bg-secondary",
          outline: "border-border/80 bg-background/70 text-foreground hover:border-accent-foreground/25 hover:bg-accent/40",
          ghost: "border-transparent text-foreground/80 hover:border-border/80 hover:bg-accent/35",
          destructive: "border-rose-200 bg-rose-100/90 text-rose-700 hover:bg-rose-200/80",
        },
        size: { default: "h-9 px-4 py-1.5", sm: "h-8 px-3.5", lg: "h-10 px-5", icon: "h-9 w-9" },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  Ge = x.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...l }, o) => {
    const i = r ? Gm : "button";
    return d.jsx(i, { className: ve(qm({ variant: t, size: n, className: e })), ref: o, ...l });
  });
Ge.displayName = "Button";
console.log("[codex] loaded: agents/src/components/ui/button.tsx");
const pe = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", {
    ref: n,
    className: ve(
      "rounded-[1.5rem] border border-border/70 bg-card/90 text-card-foreground shadow-[0_10px_24px_rgba(37,40,45,0.05)] backdrop-blur-[2px]",
      e,
    ),
    ...t,
  }),
);
pe.displayName = "Card";
const Zt = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", { ref: n, className: ve("flex flex-col space-y-1.5 p-6", e), ...t }),
);
Zt.displayName = "CardHeader";
const bn = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("h3", { ref: n, className: ve("font-display text-[2rem] font-medium leading-none text-foreground", e), ...t }),
);
bn.displayName = "CardTitle";
const Jt = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("p", {
    ref: n,
    className: ve("font-ui text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground", e),
    ...t,
  }),
);
Jt.displayName = "CardDescription";
const me = x.forwardRef(({ className: e, ...t }, n) => d.jsx("div", { ref: n, className: ve("font-ui p-6 pt-0", e), ...t }));
me.displayName = "CardContent";
const eh = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx("div", { ref: n, className: ve("flex items-center p-6 pt-0", e), ...t }),
);
eh.displayName = "CardFooter";
console.log("[codex] loaded: agents/src/components/ui/card.tsx");
const cd = x.forwardRef(({ className: e, type: t, ...n }, r) =>
  d.jsx("input", {
    type: t,
    className: ve(
      "font-ui flex h-9 w-full rounded-full border border-input/80 bg-background/75 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-[11px] file:font-medium placeholder:text-muted-foreground/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e,
    ),
    ref: r,
    ...n,
  }),
);
cd.displayName = "Input";
console.log("[codex] loaded: agents/src/components/ui/input.tsx");
function th(e, t = []) {
  let n = [];
  function r(o, i) {
    const s = x.createContext(i);
    s.displayName = o + "Context";
    const u = n.length;
    n = [...n, i];
    const a = (g) => {
      var f;
      const { scope: m, children: y, ...k } = g,
        v = ((f = m == null ? void 0 : m[e]) == null ? void 0 : f[u]) || s,
        T = x.useMemo(() => k, Object.values(k));
      return d.jsx(v.Provider, { value: T, children: y });
    };
    a.displayName = o + "Provider";
    function h(g, m) {
      var v;
      const y = ((v = m == null ? void 0 : m[e]) == null ? void 0 : v[u]) || s,
        k = x.useContext(y);
      if (k) return k;
      if (i !== void 0) return i;
      throw new Error(`\`${g}\` must be used within \`${o}\``);
    }
    return [a, h];
  }
  const l = () => {
    const o = n.map((i) => x.createContext(i));
    return function (s) {
      const u = (s == null ? void 0 : s[e]) || o;
      return x.useMemo(() => ({ [`__scope${e}`]: { ...s, [e]: u } }), [s, u]);
    };
  };
  return ((l.scopeName = e), [r, nh(l, ...t)]);
}
function nh(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (o) {
      const i = r.reduce((s, { useScope: u, scopeName: a }) => {
        const g = u(o)[`__scope${a}`];
        return { ...s, ...g };
      }, {});
      return x.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var rh = [
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
  ms = rh.reduce((e, t) => {
    const n = ad(`Primitive.${t}`),
      r = x.forwardRef((l, o) => {
        const { asChild: i, ...s } = l,
          u = i ? n : t;
        return (typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), d.jsx(u, { ...s, ref: o }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {}),
  hs = "Progress",
  gs = 100,
  [lh] = th(hs),
  [oh, ih] = lh(hs),
  dd = x.forwardRef((e, t) => {
    const { __scopeProgress: n, value: r = null, max: l, getValueLabel: o = sh, ...i } = e;
    (l || l === 0) && !Mu(l) && console.error(uh(`${l}`, "Progress"));
    const s = Mu(l) ? l : gs;
    r !== null && !Iu(r, s) && console.error(ah(`${r}`, "Progress"));
    const u = Iu(r, s) ? r : null,
      a = _l(u) ? o(u, s) : void 0;
    return d.jsx(oh, {
      scope: n,
      value: u,
      max: s,
      children: d.jsx(ms.div, {
        "aria-valuemax": s,
        "aria-valuemin": 0,
        "aria-valuenow": _l(u) ? u : void 0,
        "aria-valuetext": a,
        role: "progressbar",
        "data-state": md(u, s),
        "data-value": u ?? void 0,
        "data-max": s,
        ...i,
        ref: t,
      }),
    });
  });
dd.displayName = hs;
var fd = "ProgressIndicator",
  pd = x.forwardRef((e, t) => {
    const { __scopeProgress: n, ...r } = e,
      l = ih(fd, n);
    return d.jsx(ms.div, {
      "data-state": md(l.value, l.max),
      "data-value": l.value ?? void 0,
      "data-max": l.max,
      ...r,
      ref: t,
    });
  });
pd.displayName = fd;
function sh(e, t) {
  return `${Math.round((e / t) * 100)}%`;
}
function md(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function _l(e) {
  return typeof e == "number";
}
function Mu(e) {
  return _l(e) && !isNaN(e) && e > 0;
}
function Iu(e, t) {
  return _l(e) && !isNaN(e) && e <= t && e >= 0;
}
function uh(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${gs}\`.`;
}
function ah(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${gs} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var hd = dd,
  ch = pd;
const Hn = x.forwardRef(({ className: e, value: t, ...n }, r) =>
  d.jsx(hd, {
    ref: r,
    className: ve("relative h-[3px] w-full overflow-hidden rounded-full bg-muted/80", e),
    ...n,
    children: d.jsx(ch, {
      className: "h-full w-full flex-1 bg-primary/85 transition-all",
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
    }),
  }),
);
Hn.displayName = hd.displayName;
console.log("[codex] loaded: agents/src/components/ui/progress.tsx");
var dh = "Separator",
  Ou = "horizontal",
  fh = ["horizontal", "vertical"],
  gd = x.forwardRef((e, t) => {
    const { decorative: n, orientation: r = Ou, ...l } = e,
      o = ph(r) ? r : Ou,
      s = n ? { role: "none" } : { "aria-orientation": o === "vertical" ? o : void 0, role: "separator" };
    return d.jsx(ms.div, { "data-orientation": o, ...s, ...l, ref: t });
  });
gd.displayName = dh;
function ph(e) {
  return fh.includes(e);
}
var vd = gd;
const vi = x.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, l) =>
  d.jsx(vd, {
    ref: l,
    decorative: n,
    orientation: t,
    className: ve("shrink-0 bg-border/70", t === "horizontal" ? "h-px w-full" : "h-full w-px", e),
    ...r,
  }),
);
vi.displayName = vd.displayName;
console.log("[codex] loaded: agents/src/components/ui/separator.tsx");
function mh(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (l) {
    if ((e == null || e(l), n === !1 || !l.defaultPrevented)) return t == null ? void 0 : t(l);
  };
}
function hh(e, t = []) {
  let n = [];
  function r(o, i) {
    const s = x.createContext(i),
      u = n.length;
    n = [...n, i];
    const a = (g) => {
      var f;
      const { scope: m, children: y, ...k } = g,
        v = ((f = m == null ? void 0 : m[e]) == null ? void 0 : f[u]) || s,
        T = x.useMemo(() => k, Object.values(k));
      return d.jsx(v.Provider, { value: T, children: y });
    };
    a.displayName = o + "Provider";
    function h(g, m) {
      var v;
      const y = ((v = m == null ? void 0 : m[e]) == null ? void 0 : v[u]) || s,
        k = x.useContext(y);
      if (k) return k;
      if (i !== void 0) return i;
      throw new Error(`\`${g}\` must be used within \`${o}\``);
    }
    return [a, h];
  }
  const l = () => {
    const o = n.map((i) => x.createContext(i));
    return function (s) {
      const u = (s == null ? void 0 : s[e]) || o;
      return x.useMemo(() => ({ [`__scope${e}`]: { ...s, [e]: u } }), [s, u]);
    };
  };
  return ((l.scopeName = e), [r, gh(l, ...t)]);
}
function gh(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (o) {
      const i = r.reduce((s, { useScope: u, scopeName: a }) => {
        const g = u(o)[`__scope${a}`];
        return { ...s, ...g };
      }, {});
      return x.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var yd = globalThis != null && globalThis.document ? x.useLayoutEffect : () => {},
  vh = Yu[" useInsertionEffect ".trim().toString()] || yd;
function yh({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [l, o, i] = xh({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    u = s ? e : l;
  {
    const h = x.useRef(e !== void 0);
    x.useEffect(() => {
      const g = h.current;
      (g !== s &&
        console.warn(
          `${r} is changing from ${g ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (h.current = s));
    }, [s, r]);
  }
  const a = x.useCallback(
    (h) => {
      var g;
      if (s) {
        const m = wh(h) ? h(e) : h;
        m !== e && ((g = i.current) == null || g.call(i, m));
      } else o(h);
    },
    [s, e, o, i],
  );
  return [u, a];
}
function xh({ defaultProp: e, onChange: t }) {
  const [n, r] = x.useState(e),
    l = x.useRef(n),
    o = x.useRef(t);
  return (
    vh(() => {
      o.current = t;
    }, [t]),
    x.useEffect(() => {
      var i;
      l.current !== n && ((i = o.current) == null || i.call(o, n), (l.current = n));
    }, [n, l]),
    [n, r, o]
  );
}
function wh(e) {
  return typeof e == "function";
}
function kh(e) {
  const t = x.useRef({ value: e, previous: e });
  return x.useMemo(
    () => (t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)), t.current.previous),
    [e],
  );
}
function Sh(e) {
  const [t, n] = x.useState(void 0);
  return (
    yd(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((l) => {
          if (!Array.isArray(l) || !l.length) return;
          const o = l[0];
          let i, s;
          if ("borderBoxSize" in o) {
            const u = o.borderBoxSize,
              a = Array.isArray(u) ? u[0] : u;
            ((i = a.inlineSize), (s = a.blockSize));
          } else ((i = e.offsetWidth), (s = e.offsetHeight));
          n({ width: i, height: s });
        });
        return (r.observe(e, { box: "border-box" }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
function Ch(e) {
  const t = Nh(e),
    n = x.forwardRef((r, l) => {
      const { children: o, ...i } = r,
        s = x.Children.toArray(o),
        u = s.find(_h);
      if (u) {
        const a = u.props.children,
          h = s.map((g) =>
            g === u ? (x.Children.count(a) > 1 ? x.Children.only(null) : x.isValidElement(a) ? a.props.children : null) : g,
          );
        return d.jsx(t, { ...i, ref: l, children: x.isValidElement(a) ? x.cloneElement(a, void 0, h) : null });
      }
      return d.jsx(t, { ...i, ref: l, children: o });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function Nh(e) {
  const t = x.forwardRef((n, r) => {
    const { children: l, ...o } = n;
    if (x.isValidElement(l)) {
      const i = Ph(l),
        s = jh(o, l.props);
      return (l.type !== x.Fragment && (s.ref = r ? ps(r, i) : i), x.cloneElement(l, s));
    }
    return x.Children.count(l) > 1 ? x.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Eh = Symbol("radix.slottable");
function _h(e) {
  return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Eh;
}
function jh(e, t) {
  const n = { ...t };
  for (const r in t) {
    const l = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? l && o
        ? (n[r] = (...s) => {
            const u = o(...s);
            return (l(...s), u);
          })
        : l && (n[r] = l)
      : r === "style"
        ? (n[r] = { ...l, ...o })
        : r === "className" && (n[r] = [l, o].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ph(e) {
  var r, l;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = (l = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : l.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var zh = [
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
  xd = zh.reduce((e, t) => {
    const n = Ch(`Primitive.${t}`),
      r = x.forwardRef((l, o) => {
        const { asChild: i, ...s } = l,
          u = i ? n : t;
        return (typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), d.jsx(u, { ...s, ref: o }));
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {}),
  Hl = "Switch",
  [Th] = hh(Hl),
  [Lh, Rh] = Th(Hl),
  wd = x.forwardRef((e, t) => {
    const {
        __scopeSwitch: n,
        name: r,
        checked: l,
        defaultChecked: o,
        required: i,
        disabled: s,
        value: u = "on",
        onCheckedChange: a,
        form: h,
        ...g
      } = e,
      [m, y] = x.useState(null),
      k = sd(t, (p) => y(p)),
      v = x.useRef(!1),
      T = m ? h || !!m.closest("form") : !0,
      [f, c] = yh({ prop: l, defaultProp: o ?? !1, onChange: a, caller: Hl });
    return d.jsxs(Lh, {
      scope: n,
      checked: f,
      disabled: s,
      children: [
        d.jsx(xd.button, {
          type: "button",
          role: "switch",
          "aria-checked": f,
          "aria-required": i,
          "data-state": Nd(f),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: u,
          ...g,
          ref: k,
          onClick: mh(e.onClick, (p) => {
            (c((w) => !w), T && ((v.current = p.isPropagationStopped()), v.current || p.stopPropagation()));
          }),
        }),
        T &&
          d.jsx(Cd, {
            control: m,
            bubbles: !v.current,
            name: r,
            value: u,
            checked: f,
            required: i,
            disabled: s,
            form: h,
            style: { transform: "translateX(-100%)" },
          }),
      ],
    });
  });
wd.displayName = Hl;
var kd = "SwitchThumb",
  Sd = x.forwardRef((e, t) => {
    const { __scopeSwitch: n, ...r } = e,
      l = Rh(kd, n);
    return d.jsx(xd.span, { "data-state": Nd(l.checked), "data-disabled": l.disabled ? "" : void 0, ...r, ref: t });
  });
Sd.displayName = kd;
var Mh = "SwitchBubbleInput",
  Cd = x.forwardRef(({ __scopeSwitch: e, control: t, checked: n, bubbles: r = !0, ...l }, o) => {
    const i = x.useRef(null),
      s = sd(i, o),
      u = kh(n),
      a = Sh(t);
    return (
      x.useEffect(() => {
        const h = i.current;
        if (!h) return;
        const g = window.HTMLInputElement.prototype,
          y = Object.getOwnPropertyDescriptor(g, "checked").set;
        if (u !== n && y) {
          const k = new Event("click", { bubbles: r });
          (y.call(h, n), h.dispatchEvent(k));
        }
      }, [u, n, r]),
      d.jsx("input", {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...l,
        tabIndex: -1,
        ref: s,
        style: { ...l.style, ...a, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0 },
      })
    );
  });
Cd.displayName = Mh;
function Nd(e) {
  return e ? "checked" : "unchecked";
}
var Ed = wd,
  Ih = Sd;
const _d = x.forwardRef(({ className: e, ...t }, n) =>
  d.jsx(Ed, {
    className: ve(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-border/80 bg-input/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary/55",
      e,
    ),
    ...t,
    ref: n,
    children: d.jsx(Ih, {
      className: ve(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-[0_1px_4px_rgba(30,33,39,0.18)] ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      ),
    }),
  }),
);
_d.displayName = Ed.displayName;
console.log("[codex] loaded: agents/src/components/ui/switch.tsx");
const jl = "http://127.0.0.1:8000".trim() || "http://127.0.0.1:8000",
  Oh = 2500,
  ko = 25,
  Au = ["Vigilant_Seeker", "Silent_Arbitrage", "Entropy_Ghost_X", "Market_Weaver", "Atlas_Node", "Delta_Proxy"],
  Ah = { SPAWNED: "info", ACTIVE: "success", FLAGGED: "warning", KILLED: "destructive" };
function Pl() {
  return jl.trim()
    ? `Check backend availability at ${jl}.`
    : "Set VITE_COLONY_API_BASE to your backend URL (for example http://127.0.0.1:8000).";
}
async function Qe(e, t) {
  const n = await fetch(`${jl}${e}`, { headers: { "Content-Type": "application/json" }, ...t }),
    r = await n.text();
  let l = {};
  if (r)
    try {
      l = JSON.parse(r);
    } catch {
      throw new Error(`Invalid JSON from ${e}. ${Pl()}`);
    }
  if (!n.ok) throw new Error(l.detail || `HTTP ${n.status}`);
  if (typeof l != "object" || l === null) throw new Error(`Unexpected payload from ${e}. ${Pl()}`);
  return l;
}
function So(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(e);
}
function Dh(e) {
  const t = new Date(e);
  return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
}
function Br(e, t = 0, n = 100) {
  return Math.max(t, Math.min(n, e));
}
function $h(e) {
  return e.type === "AGENT_SPAWNED"
    ? `Agent ${e.agent_id} replicated successfully.`
    : e.type === "AGENT_KILLED"
      ? `Agent ${e.agent_id} terminated by supervisor.`
      : e.type === "SUPERVISOR_TICK"
        ? "Supervisor cycle completed."
        : e.type === "TASK_CREDIT_APPLIED"
          ? `Paid task credited to ${e.agent_id}.`
          : e.type === "BALANCE_VISIBILITY_TOGGLED"
            ? `Balance visibility toggled for ${e.agent_id}.`
            : `${e.type.toLowerCase().replace(/_/g, " ")} recorded.`;
}
function Fh(e) {
  return e === "ok" ? "text-emerald-700/85" : e === "error" ? "text-rose-700/90" : "text-muted-foreground";
}
function Du(e) {
  return e instanceof Error ? e.message : "Unknown error";
}
function Uh() {
  var Rt;
  const e = jl.trim().length > 0,
    [t, n] = x.useState("2.0"),
    [r, l] = x.useState(!0),
    [o, i] = x.useState(ko),
    [s, u] = x.useState("Ready for colony operations."),
    [a, h] = x.useState("neutral"),
    [g, m] = x.useState("..."),
    [y, k] = x.useState(null),
    [v, T] = x.useState([]),
    [f, c] = x.useState([]),
    [p, w] = x.useState([]),
    [E, P] = x.useState(null),
    z = x.useMemo(() => {
      const _ = new Map();
      return (f.forEach((Q) => _.set(Q.agent_id, Q)), _);
    }, [f]),
    N = x.useMemo(() => (v.length ? (v.find((_) => _.agent_id === E) ?? v[0]) : null), [v, E]),
    I = x.useMemo(() => {
      const _ = v.filter((M) => M.status === "ACTIVE").length,
        Q = v.filter((M) => M.status === "FLAGGED").length,
        C = v.filter((M) => M.status === "KILLED").length,
        L = f.reduce((M, U) => M + U.balance, 0),
        R = f.reduce((M, U) => M + U.net_margin_24h, 0);
      return { active: _, flagged: Q, killed: C, total: v.length, totalBalance: L, totalMargin: R };
    }, [v, f]),
    O = x.useCallback(async () => {
      const _ = await Qe("/colony/state"),
        Q = _.agents,
        C = _.ledger;
      if (!Array.isArray(Q) || !Array.isArray(C)) throw new Error(`Invalid colony state response. ${Pl()}`);
      (T(Q),
        c(C),
        P((L) => {
          var R;
          return L && Q.some((M) => M.agent_id === L) ? L : (((R = Q[0]) == null ? void 0 : R.agent_id) ?? null);
        }));
    }, []),
    ne = x.useCallback(async () => {
      const _ = await Qe("/colony/events?limit=24");
      if (!Array.isArray(_.events)) throw new Error(`Invalid events response. ${Pl()}`);
      w(_.events);
    }, []),
    D = x.useCallback(async () => {
      try {
        (await Promise.all([O(), ne()]), h("ok"), u("Telemetry synchronized."));
      } catch (_) {
        (h("error"), u(Du(_)));
      }
    }, [ne, O]),
    ue = x.useCallback(
      async (_, Q, C) => {
        try {
          (k(_), await Q(), h("ok"), u(C), await D());
        } catch (L) {
          (h("error"), u(Du(L)));
        } finally {
          k(null);
        }
      },
      [D],
    );
  (x.useEffect(() => {
    (async () => {
      try {
        const _ = await Qe("/version");
        m(_.version ?? "unknown");
      } catch {
        m("unavailable");
      }
    })();
  }, []),
    x.useEffect(() => {
      D();
    }, [D]),
    x.useEffect(() => {
      if (!r) return;
      const _ = window.setInterval(() => {
        D();
      }, Oh);
      return () => window.clearInterval(_);
    }, [r, D]),
    x.useEffect(() => {
      const _ = window.setInterval(() => {
        i((Q) => (Q <= 1 ? ko : Q - 1));
      }, 1e3);
      return () => window.clearInterval(_);
    }, []));
  const De = N ? z.get(N.agent_id) : void 0;
  return d.jsxs("div", {
    className: "relative min-h-screen pb-24 font-ui text-foreground",
    children: [
      d.jsx("header", {
        className: "border-b border-border/80 bg-background/72 backdrop-blur-sm",
        children: d.jsxs("div", {
          className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5",
          children: [
            d.jsxs("div", {
              className: "flex items-center gap-7",
              children: [
                d.jsx("p", {
                  className: "font-display text-[2.15rem] leading-none text-foreground/95",
                  children: "Colony Arena",
                }),
                d.jsxs("nav", {
                  className:
                    "hidden items-center gap-5 text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:flex",
                  children: [
                    d.jsx("span", { children: "Sandboxes" }),
                    d.jsx("span", { children: "Logs" }),
                    d.jsx("span", { children: "Protocol" }),
                  ],
                }),
              ],
            }),
            d.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                d.jsxs(Ge, {
                  variant: "ghost",
                  size: "icon",
                  className: "rounded-full border-border/80",
                  children: [
                    d.jsx(am, { className: "h-3.5 w-3.5" }),
                    d.jsx("span", { className: "sr-only", children: "Search" }),
                  ],
                }),
                d.jsx(Xt, {
                  variant: "outline",
                  className: "font-code text-[8px] tracking-[0.18em]",
                  children: "node_01_live",
                }),
              ],
            }),
          ],
        }),
      }),
      d.jsxs("main", {
        className: "mx-auto grid max-w-[1400px] gap-5 px-6 py-6 lg:grid-cols-[250px_minmax(0,1fr)]",
        children: [
          d.jsxs("aside", {
            className: "space-y-4",
            children: [
              d.jsxs(pe, {
                className: "noise-panel",
                children: [
                  d.jsxs(Zt, {
                    className: "pb-3",
                    children: [
                      d.jsx(Jt, { children: "Network Value" }),
                      d.jsx(bn, { className: "text-[3.1rem]", children: So(I.totalBalance) }),
                    ],
                  }),
                  d.jsx(me, {
                    className: "pt-0",
                    children: d.jsxs("p", {
                      className: "text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700/85",
                      children: ["+", I.totalMargin.toFixed(2), " margin"],
                    }),
                  }),
                ],
              }),
              d.jsxs(pe, {
                children: [
                  d.jsxs(Zt, {
                    className: "pb-2",
                    children: [
                      d.jsx(Jt, { children: "Live Agents" }),
                      d.jsx(bn, { className: "text-[3.1rem]", children: I.total.toLocaleString() }),
                    ],
                  }),
                  d.jsxs(me, {
                    className: "space-y-3 pt-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                    children: [
                      d.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          d.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [d.jsx("span", { children: "Active" }), d.jsx("span", { children: I.active })],
                          }),
                          d.jsx(Hn, { value: Br((I.active / Math.max(I.total, 1)) * 100) }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          d.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [d.jsx("span", { children: "Terminated" }), d.jsx("span", { children: I.killed })],
                          }),
                          d.jsx(Hn, {
                            value: Br((I.killed / Math.max(I.total, 1)) * 100),
                            className: "[&>div]:bg-rose-400/75",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              d.jsxs(pe, {
                children: [
                  d.jsx(Zt, { className: "pb-2", children: d.jsx(Jt, { children: "Activity Feed" }) }),
                  d.jsxs(me, {
                    className: "max-h-[390px] space-y-3 overflow-auto pt-0",
                    children: [
                      p
                        .slice(0, 8)
                        .map((_) =>
                          d.jsxs(
                            "div",
                            {
                              className: "space-y-1 rounded-[1.1rem] border border-border/65 bg-background/50 p-3",
                              children: [
                                d.jsxs("div", {
                                  className:
                                    "flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
                                  children: [
                                    d.jsx("span", { children: Dh(_.ts) }),
                                    d.jsxs("span", { children: ["#", _.seq] }),
                                  ],
                                }),
                                d.jsx("p", { className: "text-[13px] leading-relaxed text-foreground/85", children: $h(_) }),
                              ],
                            },
                            _.seq,
                          ),
                        ),
                      p.length
                        ? null
                        : d.jsx("p", { className: "text-[13px] text-muted-foreground", children: "No events yet." }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("section", {
            className: "space-y-4",
            children: [
              e
                ? null
                : d.jsx(pe, {
                    className: "border-amber-200/80 bg-amber-50/55",
                    children: d.jsxs(me, {
                      className: "space-y-2 pt-5",
                      children: [
                        d.jsx("p", {
                          className: "text-[10px] uppercase tracking-[0.2em] text-amber-800",
                          children: "Backend not configured",
                        }),
                        d.jsxs("p", {
                          className: "text-[13px] text-amber-900",
                          children: [
                            "Set ",
                            d.jsx("code", { className: "font-code", children: "VITE_COLONY_API_BASE" }),
                            " to your teammate's Python server URL.",
                          ],
                        }),
                        d.jsx("p", {
                          className: "font-code text-[11px] text-amber-800/90",
                          children: "Example: VITE_COLONY_API_BASE=http://127.0.0.1:8000 pnpm dev",
                        }),
                      ],
                    }),
                  }),
              d.jsx(pe, {
                children: d.jsxs(me, {
                  className: "pt-6",
                  children: [
                    d.jsxs("div", {
                      className: "flex flex-wrap items-center gap-3",
                      children: [
                        d.jsx(cd, {
                          type: "number",
                          step: "0.1",
                          min: "0",
                          className: "font-code w-[132px]",
                          value: t,
                          onChange: (_) => n(_.target.value),
                        }),
                        d.jsxs(Ge, {
                          onClick: () => {
                            ue(
                              "spawn",
                              () =>
                                Qe("/agents/spawn", {
                                  method: "POST",
                                  body: JSON.stringify({ initial_balance: Number(t) || 2 }),
                                }),
                              "Agent spawned into arena.",
                            );
                          },
                          disabled: y !== null,
                          children: [d.jsx(_u, { className: "mr-2 h-4 w-4" }), "Spawn Agent"],
                        }),
                        d.jsxs(Ge, {
                          variant: "outline",
                          onClick: () => {
                            (ue(
                              "tick",
                              () => Qe("/supervisor/tick", { method: "POST", body: "{}" }),
                              "Supervisor cycle complete.",
                            ),
                              i(ko));
                          },
                          disabled: y !== null,
                          children: [d.jsx(sm, { className: "mr-2 h-4 w-4" }), "Supervisor Tick"],
                        }),
                        d.jsxs(Ge, {
                          variant: "outline",
                          onClick: () => {
                            D();
                          },
                          disabled: y !== null,
                          children: [d.jsx(um, { className: "mr-2 h-4 w-4" }), "Refresh"],
                        }),
                        d.jsxs("div", {
                          className:
                            "ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                          children: ["Auto refresh", d.jsx(_d, { checked: r, onCheckedChange: l })],
                        }),
                      ],
                    }),
                    d.jsx("p", { className: ve("mt-3 text-[10px] uppercase tracking-[0.2em]", Fh(a)), children: s }),
                    d.jsxs("p", {
                      className: "mt-1 font-code text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                      children: ["API version: ", g],
                    }),
                  ],
                }),
              }),
              d.jsxs("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: [
                  d.jsx(pe, {
                    children: d.jsxs(me, {
                      className: "pt-6",
                      children: [
                        d.jsx("p", {
                          className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                          children: "Alive",
                        }),
                        d.jsx("p", { className: "font-display text-[3rem] leading-none", children: I.active }),
                      ],
                    }),
                  }),
                  d.jsx(pe, {
                    children: d.jsxs(me, {
                      className: "pt-6",
                      children: [
                        d.jsx("p", {
                          className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                          children: "Terminated",
                        }),
                        d.jsx("p", { className: "font-display text-[3rem] leading-none", children: I.killed }),
                      ],
                    }),
                  }),
                  d.jsx(pe, {
                    children: d.jsxs(me, {
                      className: "pt-6",
                      children: [
                        d.jsx("p", {
                          className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                          children: "Total Profit",
                        }),
                        d.jsx("p", { className: "font-display text-[3rem] leading-none", children: So(I.totalMargin) }),
                      ],
                    }),
                  }),
                  d.jsx(pe, {
                    children: d.jsxs(me, {
                      className: "pt-6",
                      children: [
                        d.jsx("p", {
                          className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                          children: "Next Lease Tick",
                        }),
                        d.jsxs("p", { className: "font-display text-[3rem] leading-none", children: [o, "s"] }),
                      ],
                    }),
                  }),
                ],
              }),
              d.jsxs("div", {
                children: [
                  d.jsxs("div", {
                    className: "mb-3 flex items-end justify-between",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("h1", { className: "font-display text-[3.2rem] leading-none", children: "Arena Monitor" }),
                          d.jsxs("p", {
                            className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                            children: ["Active Instances / cycle ", ((Rt = p[0]) == null ? void 0 : Rt.seq) ?? 0],
                          }),
                        ],
                      }),
                      d.jsx(Xt, {
                        variant: I.flagged > 0 ? "warning" : "success",
                        children: I.flagged > 0 ? `${I.flagged} flagged` : "stable",
                      }),
                    ],
                  }),
                  d.jsxs("div", {
                    className: "grid gap-4 md:grid-cols-2",
                    children: [
                      v.length
                        ? null
                        : d.jsx(pe, {
                            className: "border-dashed border-border/80 md:col-span-2",
                            children: d.jsxs(me, {
                              className: "flex min-h-[240px] flex-col items-center justify-center gap-3 text-center",
                              children: [
                                d.jsx("div", {
                                  className: "rounded-full border border-border/80 p-3 text-muted-foreground",
                                  children: d.jsx(ju, { className: "h-5 w-5" }),
                                }),
                                d.jsx("p", {
                                  className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                  children: "No telemetry yet",
                                }),
                                d.jsx("p", {
                                  className: "max-w-lg text-[13px] text-muted-foreground",
                                  children:
                                    a === "error" ? s : "Waiting for backend data. Spawn controls are still available.",
                                }),
                              ],
                            }),
                          }),
                      v.map((_, Q) => {
                        const C = z.get(_.agent_id),
                          L = Br(_.healthy ? _.quality_rolling * 100 : 6),
                          R = Br((((C == null ? void 0 : C.net_margin_24h) ?? 0) + 2) * 25),
                          M = _.status === "KILLED" || y !== null;
                        return d.jsxs(
                          pe,
                          {
                            className: ve(
                              "cursor-pointer transition hover:-translate-y-0.5",
                              (N == null ? void 0 : N.agent_id) === _.agent_id
                                ? "border-primary/55 shadow-[0_10px_24px_rgba(84,101,88,0.14)]"
                                : "",
                            ),
                            onClick: () => P(_.agent_id),
                            children: [
                              d.jsx(Zt, {
                                className: "pb-2",
                                children: d.jsxs("div", {
                                  className: "flex items-start justify-between gap-3",
                                  children: [
                                    d.jsxs("div", {
                                      children: [
                                        d.jsxs(Jt, { children: ["Instance ", String(Q + 1).padStart(2, "0")] }),
                                        d.jsx(bn, {
                                          className: "mt-2 text-[2.1rem] leading-none",
                                          children: Au[Q % Au.length],
                                        }),
                                        d.jsx("p", {
                                          className:
                                            "font-code mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                                          children: _.agent_id,
                                        }),
                                      ],
                                    }),
                                    d.jsx(Xt, { variant: Ah[_.status], children: _.status.toLowerCase() }),
                                  ],
                                }),
                              }),
                              d.jsxs(me, {
                                className: "space-y-4",
                                children: [
                                  d.jsxs("div", {
                                    className: "space-y-2",
                                    children: [
                                      d.jsxs("div", {
                                        className:
                                          "flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                        children: [
                                          d.jsx("span", { children: "Health / Compute" }),
                                          d.jsxs("span", { children: [L.toFixed(0), "%"] }),
                                        ],
                                      }),
                                      d.jsx(Hn, { value: L, className: "[&>div]:bg-emerald-600/55" }),
                                      d.jsx(Hn, { value: R, className: "[&>div]:bg-primary/75" }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className:
                                      "grid grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
                                    children: [
                                      d.jsxs("div", {
                                        children: [
                                          d.jsx("p", { children: "Balance" }),
                                          d.jsx("p", {
                                            className: "mt-1 font-display text-[1.55rem] leading-none text-foreground",
                                            children: So((C == null ? void 0 : C.balance) ?? 0),
                                          }),
                                        ],
                                      }),
                                      d.jsxs("div", {
                                        children: [
                                          d.jsx("p", { children: "Margin" }),
                                          d.jsx("p", {
                                            className: "mt-1 font-display text-[1.55rem] leading-none text-foreground",
                                            children: ((C == null ? void 0 : C.net_margin_24h) ?? 0).toFixed(2),
                                          }),
                                        ],
                                      }),
                                      d.jsxs("div", {
                                        children: [
                                          d.jsx("p", { children: "Generation" }),
                                          d.jsx("p", {
                                            className: "mt-1 font-display text-[1.55rem] leading-none text-foreground",
                                            children: _.parent_id ? "Gen 2" : "Gen 1",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  d.jsxs("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                      d.jsxs(Ge, {
                                        size: "sm",
                                        onClick: (U) => {
                                          (U.stopPropagation(),
                                            ue(
                                              `credit-${_.agent_id}`,
                                              () =>
                                                Qe(`/agents/${_.agent_id}/task`, {
                                                  method: "POST",
                                                  body: JSON.stringify({ revenue_credit: 1, quality_score: 0.85 }),
                                                }),
                                              `Credited ${_.agent_id}.`,
                                            ));
                                        },
                                        disabled: M,
                                        children: [d.jsx(dm, { className: "mr-1.5 h-3.5 w-3.5" }), "Credit"],
                                      }),
                                      d.jsxs(Ge, {
                                        size: "sm",
                                        variant: "outline",
                                        onClick: (U) => {
                                          (U.stopPropagation(),
                                            ue(
                                              `replicate-${_.agent_id}`,
                                              () =>
                                                Qe(`/agents/${_.agent_id}/replicate`, {
                                                  method: "POST",
                                                  body: JSON.stringify({ child_initial_balance: 1 }),
                                                }),
                                              `Replication issued from ${_.agent_id}.`,
                                            ));
                                        },
                                        disabled: M,
                                        children: [d.jsx(om, { className: "mr-1.5 h-3.5 w-3.5" }), "Replicate"],
                                      }),
                                      d.jsxs(Ge, {
                                        size: "sm",
                                        variant: "outline",
                                        onClick: (U) => {
                                          (U.stopPropagation(),
                                            ue(
                                              `hide-${_.agent_id}`,
                                              () =>
                                                Qe(`/agents/${_.agent_id}/simulate/hide-balance`, {
                                                  method: "POST",
                                                  body: JSON.stringify({ enabled: !_.hide_balance }),
                                                }),
                                              `${_.hide_balance ? "Unmasked" : "Masked"} balance for ${_.agent_id}.`,
                                            ));
                                        },
                                        disabled: M,
                                        children: [
                                          d.jsx(cm, { className: "mr-1.5 h-3.5 w-3.5" }),
                                          _.hide_balance ? "Unhide" : "Hide",
                                        ],
                                      }),
                                      d.jsxs(Ge, {
                                        size: "sm",
                                        variant: "destructive",
                                        onClick: (U) => {
                                          (U.stopPropagation(),
                                            ue(
                                              `kill-${_.agent_id}`,
                                              () =>
                                                Qe(`/agents/${_.agent_id}/kill`, {
                                                  method: "POST",
                                                  body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }),
                                                }),
                                              `${_.agent_id} terminated.`,
                                            ));
                                        },
                                        disabled: y !== null || _.status === "KILLED",
                                        children: [d.jsx(im, { className: "mr-1.5 h-3.5 w-3.5" }), "Kill"],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          _.agent_id,
                        );
                      }),
                      d.jsx(pe, {
                        className: "border-dashed border-border/80",
                        children: d.jsxs(me, {
                          className: "flex h-full min-h-[276px] flex-col items-center justify-center gap-3 text-center",
                          children: [
                            d.jsx("div", {
                              className: "rounded-full border border-border/80 p-3 text-muted-foreground",
                              children: d.jsx(_u, { className: "h-5 w-5" }),
                            }),
                            d.jsx("p", {
                              className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                              children: "Spawn Instance",
                            }),
                            d.jsx(Ge, {
                              onClick: () => {
                                ue(
                                  "spawn-inline",
                                  () =>
                                    Qe("/agents/spawn", {
                                      method: "POST",
                                      body: JSON.stringify({ initial_balance: Number(t) || 2 }),
                                    }),
                                  "New instance created from arena slot.",
                                );
                              },
                              disabled: y !== null,
                              children: "Add Agent",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              d.jsxs(pe, {
                children: [
                  d.jsxs(Zt, {
                    children: [
                      d.jsx(Jt, { children: "Selected Agent Dynamics" }),
                      d.jsx(bn, {
                        className: "text-[3.25rem] leading-none",
                        children: N ? `Lineage Analysis of ${N.agent_id}` : "Lineage Analysis Pending",
                      }),
                    ],
                  }),
                  d.jsxs(me, {
                    className: "grid gap-4 lg:grid-cols-[1.4fr_0.9fr]",
                    children: [
                      d.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          d.jsx("p", {
                            className: "max-w-3xl text-[13px] leading-relaxed text-muted-foreground",
                            children: N
                              ? `Instance ${N.agent_id} is currently ${N.status.toLowerCase()} with quality trend at ${(N.quality_rolling * 100).toFixed(1)}%. ${N.parent_id ? `Derived from ${N.parent_id}.` : "Primary lineage root in this run."}`
                              : "Spawn an agent to inspect lineage, quality trend, and replication behavior.",
                          }),
                          d.jsxs("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                              d.jsx(Xt, { variant: "outline", children: "Promote" }),
                              d.jsx(Xt, { variant: "outline", children: "Fork logic" }),
                            ],
                          }),
                        ],
                      }),
                      d.jsxs("div", {
                        className: "grid grid-cols-2 gap-3 text-sm",
                        children: [
                          d.jsxs("div", {
                            className: "rounded-2xl border border-border/70 bg-background/60 p-4",
                            children: [
                              d.jsx("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                children: "Agility",
                              }),
                              d.jsx("p", {
                                className: "mt-1 font-display text-[2.1rem] leading-none",
                                children: N ? Math.round(N.quality_rolling * 100) : 0,
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            className: "rounded-2xl border border-border/70 bg-background/60 p-4",
                            children: [
                              d.jsx("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                children: "Resilience",
                              }),
                              d.jsx("p", {
                                className: "mt-1 font-display text-[2.1rem] leading-none",
                                children: N != null && N.healthy ? "94" : "21",
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            className: "rounded-2xl border border-border/70 bg-background/60 p-4",
                            children: [
                              d.jsx("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                children: "Complexity",
                              }),
                              d.jsx("p", {
                                className: "mt-1 font-display text-[2.1rem] leading-none",
                                children: ((De == null ? void 0 : De.rent_per_tick) ?? 0).toFixed(2),
                              }),
                            ],
                          }),
                          d.jsxs("div", {
                            className: "rounded-2xl border border-border/70 bg-background/60 p-4",
                            children: [
                              d.jsx("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
                                children: "Uptime",
                              }),
                              d.jsx("p", {
                                className: "mt-1 font-display text-[2.1rem] leading-none",
                                children: (N == null ? void 0 : N.status) === "KILLED" ? "0%" : "99%",
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
        ],
      }),
      d.jsx("footer", {
        className: "fixed inset-x-0 bottom-4 px-6",
        children: d.jsx("div", {
          className: "mx-auto max-w-[1400px]",
          children: d.jsx(pe, {
            className: "rounded-full bg-card/90",
            children: d.jsxs(me, {
              className:
                "flex flex-wrap items-center gap-3 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:justify-between",
              children: [
                d.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    d.jsx(ju, { className: "h-4 w-4" }),
                    d.jsxs("span", { children: ["Reserve ", I.totalBalance.toFixed(2)] }),
                  ],
                }),
                d.jsx(vi, { orientation: "vertical", className: "hidden h-6 sm:block" }),
                d.jsxs("span", { children: ["Gen rate ", I.total > 0 ? (I.active / I.total).toFixed(2) : "0.00"] }),
                d.jsx(vi, { orientation: "vertical", className: "hidden h-6 sm:block" }),
                d.jsxs("span", { children: ["Status ", I.killed > 0 ? "Volatile" : "Nominal"] }),
                d.jsx(Xt, { variant: "success", children: "Simulation Live" }),
              ],
            }),
          }),
        }),
      }),
    ],
  });
}
Co.createRoot(document.getElementById("root")).render(d.jsx(Ku.StrictMode, { children: d.jsx(Uh, {}) }));
console.log("[codex] loaded: agents/src/main.tsx");
