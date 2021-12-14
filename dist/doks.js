import * as React from "react";
import { useContext, createContext, useRef, useEffect, useCallback, Children, isValidElement, Fragment, createElement, useMemo, useState, useLayoutEffect, forwardRef, lazy } from "react";
import { u as useTheme, j as jsx, T as ThemeContext, _ as _extends$1, a as useTheme$1, b as ThemeContext$1, c as createTheme, d as jsxs } from "./main.js";
const hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    return mergedTheme;
  }
  return _extends$1({}, outerTheme, localTheme);
}
function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  const theme = React.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, {
    value: theme,
    children
  });
}
function InnerThemeProvider(props) {
  const theme = useTheme$1();
  return /* @__PURE__ */ jsx(ThemeContext$1.Provider, {
    value: typeof theme === "object" ? theme : {},
    children: props.children
  });
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /* @__PURE__ */ jsx(ThemeProvider$1, {
    theme: localTheme,
    children: /* @__PURE__ */ jsx(InnerThemeProvider, {
      children
    })
  });
}
var r, B = r || (r = {});
B.Pop = "POP";
B.Push = "PUSH";
B.Replace = "REPLACE";
var C = function(b) {
  return b;
};
function E(b) {
  b.preventDefault();
  b.returnValue = "";
}
function F() {
  var b = [];
  return { get length() {
    return b.length;
  }, push: function(h) {
    b.push(h);
    return function() {
      b = b.filter(function(k) {
        return k !== h;
      });
    };
  }, call: function(h) {
    b.forEach(function(k) {
      return k && k(h);
    });
  } };
}
function H() {
  return Math.random().toString(36).substr(2, 8);
}
function I(b) {
  var h = b.pathname, k = b.search;
  b = b.hash;
  return (h === void 0 ? "/" : h) + (k === void 0 ? "" : k) + (b === void 0 ? "" : b);
}
function J(b) {
  var h = {};
  if (b) {
    var k = b.indexOf("#");
    0 <= k && (h.hash = b.substr(k), b = b.substr(0, k));
    k = b.indexOf("?");
    0 <= k && (h.search = b.substr(k), b = b.substr(0, k));
    b && (h.pathname = b);
  }
  return h;
}
function createHashHistory(b) {
  function h() {
    var a = J(m.location.hash.substr(1)), e = a.pathname, l = a.search;
    a = a.hash;
    var g = u.state || {};
    return [g.idx, C({ pathname: e === void 0 ? "/" : e, search: l === void 0 ? "" : l, hash: a === void 0 ? "" : a, state: g.usr || null, key: g.key || "default" })];
  }
  function k() {
    if (t)
      c.call(t), t = null;
    else {
      var a = r.Pop, e = h(), l = e[0];
      e = e[1];
      if (c.length)
        if (l != null) {
          var g = q - l;
          g && (t = { action: a, location: e, retry: function() {
            p(-1 * g);
          } }, p(g));
        } else
          ;
      else
        A(a);
    }
  }
  function x(a) {
    var e = document.querySelector("base"), l = "";
    e && e.getAttribute("href") && (e = m.location.href, l = e.indexOf("#"), l = l === -1 ? e : e.slice(0, l));
    return l + "#" + (typeof a === "string" ? a : I(a));
  }
  function z(a, e) {
    e === void 0 && (e = null);
    return C(_extends$1({ pathname: d.pathname, hash: "", search: "" }, typeof a === "string" ? J(a) : a, { state: e, key: H() }));
  }
  function A(a) {
    v = a;
    a = h();
    q = a[0];
    d = a[1];
    f.call({ action: v, location: d });
  }
  function y(a, e) {
    function l() {
      y(a, e);
    }
    var g = r.Push, n = z(a, e);
    if (!c.length || (c.call({ action: g, location: n, retry: l }), false)) {
      var G = [{ usr: n.state, key: n.key, idx: q + 1 }, x(n)];
      n = G[0];
      G = G[1];
      try {
        u.pushState(n, "", G);
      } catch (K) {
        m.location.assign(G);
      }
      A(g);
    }
  }
  function w(a, e) {
    function l() {
      w(a, e);
    }
    var g = r.Replace, n = z(a, e);
    c.length && (c.call({ action: g, location: n, retry: l }), 1) || (n = [{ usr: n.state, key: n.key, idx: q }, x(n)], u.replaceState(n[0], "", n[1]), A(g));
  }
  function p(a) {
    u.go(a);
  }
  b === void 0 && (b = {});
  b = b.window;
  var m = b === void 0 ? document.defaultView : b, u = m.history, t = null;
  m.addEventListener("popstate", k);
  m.addEventListener("hashchange", function() {
    var a = h()[1];
    I(a) !== I(d) && k();
  });
  var v = r.Pop;
  b = h();
  var q = b[0], d = b[1], f = F(), c = F();
  q == null && (q = 0, u.replaceState(_extends$1({}, u.state, { idx: q }), ""));
  return {
    get action() {
      return v;
    },
    get location() {
      return d;
    },
    createHref: x,
    push: y,
    replace: w,
    go: p,
    back: function() {
      p(-1);
    },
    forward: function() {
      p(1);
    },
    listen: function(a) {
      return f.push(a);
    },
    block: function(a) {
      var e = c.push(a);
      c.length === 1 && m.addEventListener("beforeunload", E);
      return function() {
        e();
        c.length || m.removeEventListener("beforeunload", E);
      };
    }
  };
}
/**
 * React Router v6.0.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(cond, message) {
  if (!cond)
    throw new Error(message);
}
const NavigationContext = /* @__PURE__ */ createContext(null);
const LocationContext = /* @__PURE__ */ createContext(null);
const RouteContext = /* @__PURE__ */ createContext({
  outlet: null,
  matches: []
});
function Outlet(_props) {
  return useOutlet();
}
function Route(_props) {
  invariant(false);
}
function Router(_ref3) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = r.Pop,
    navigator,
    static: staticProp = false
  } = _ref3;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = normalizePathname(basenameProp);
  let navigationContext = useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = J(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  if (location == null) {
    return null;
  }
  return /* @__PURE__ */ createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ createElement(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
function Routes(_ref4) {
  let {
    children,
    location
  } = _ref4;
  return useRoutes(createRoutesFromChildren(children), location);
}
function useHref(to) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to);
  let joinedPathname = pathname;
  if (basename !== "/") {
    let toPathname = getToPathname(to);
    let endsWithSlash = toPathname != null && toPathname.endsWith("/");
    joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return useContext(LocationContext).location;
}
function useNavigate() {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = useContext(NavigationContext);
  let {
    matches
  } = useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  let activeRef = useRef(false);
  useEffect(() => {
    activeRef.current = true;
  });
  let navigate = useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
    if (basename !== "/") {
      path.pathname = joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
function useOutlet() {
  return useContext(RouteContext).outlet;
}
function useParams() {
  let {
    matches
  } = useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to) {
  let {
    matches
  } = useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  return useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    matches: parentMatches
  } = useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? J(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
  })), parentMatches);
}
function createRoutesFromChildren(children) {
  let routes = [];
  Children.forEach(children, (element) => {
    if (!/* @__PURE__ */ isValidElement(element)) {
      return;
    }
    if (element.type === Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    let route = {
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }
    routes.push(route);
  });
  return routes;
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? J(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], routes, pathname);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index
    };
    if (meta.relativePath.startsWith("/")) {
      !meta.relativePath.startsWith(parentPath) ? invariant(false) : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      !(route.index !== true) ? invariant(false) : void 0;
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  });
  return branches;
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, routesArg, pathname) {
  let routes = routesArg;
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = routes[meta.childrenIndex];
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
    routes = route.children;
  }
  return matches;
}
function _renderMatches(matches, parentMatches) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null)
    return null;
  return matches.reduceRight((outlet, match, index) => {
    return /* @__PURE__ */ createElement(RouteContext.Provider, {
      children: match.route.element !== void 0 ? match.route.element : /* @__PURE__ */ createElement(Outlet, null),
      value: {
        outlet,
        matches: parentMatches.concat(matches.slice(0, index + 1))
      }
    });
  }, null);
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "");
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else {
    regexpSource += end ? "\\/*$" : "(?:\\b|$)";
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? J(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function resolveTo(toArg, routePathnames, locationPathname) {
  let to = typeof toArg === "string" ? J(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
    path.pathname += "/";
  }
  return path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? J(to).pathname : to.pathname;
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let nextChar = pathname.charAt(basename.length);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(basename.length) || "/";
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * React Router DOM v6.0.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
const _excluded = ["onClick", "replace", "state", "target", "to"];
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window
    });
  }
  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const Link = /* @__PURE__ */ forwardRef(function LinkWithRef(_ref3, ref) {
  let {
    onClick,
    replace = false,
    state,
    target,
    to
  } = _ref3, rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
  let href = useHref(to);
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return /* @__PURE__ */ createElement("a", _extends({}, rest, {
    href,
    onClick: handleClick,
    ref,
    target
  }));
});
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to);
  return useCallback((event) => {
    if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || I(location) === I(path);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to]);
}
createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d47a1"
    },
    secondary: {
      main: "#ad1457"
    }
  }
});
const ColorModeContext = createContext({
  toggleColorMode: () => {
  },
  mode: void 0
});
const useColorModeContext = () => {
  return useContext(ColorModeContext);
};
const COLOR_MODE_KEY = "color-mode";
const DocsThemeProvider = ({
  children
}) => {
  var _a;
  const [mode, setMode] = useState((_a = localStorage.getItem(COLOR_MODE_KEY)) != null ? _a : "light");
  useEffect(() => {
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, [mode]);
  const value = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((m) => m === "light" ? "dark" : "light");
      },
      mode
    };
  }, [mode]);
  const theme2 = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: "#0d47a1"
      },
      secondary: {
        main: "#ad1457"
      }
    }
  }), [mode]);
  return /* @__PURE__ */ jsx(ColorModeContext.Provider, {
    value,
    children: /* @__PURE__ */ jsx(ThemeProvider, {
      theme: theme2,
      children
    })
  });
};
const docOptionsContext = createContext(void 0);
const {
  Provider
} = docOptionsContext;
const DocOptionsContextProvider = (props) => {
  return /* @__PURE__ */ jsx(Provider, {
    value: props.options,
    children: props.children
  });
};
const useDocOptions = () => useContext(docOptionsContext);
const Docs = lazy(() => import("./docs.js"));
const Editor = lazy(() => import("./editor.js"));
const Embed = lazy(() => import("./embed.js"));
const Doks = (options) => {
  return /* @__PURE__ */ jsx(DocsThemeProvider, {
    children: /* @__PURE__ */ jsx(DocOptionsContextProvider, {
      options,
      children: /* @__PURE__ */ jsx(HashRouter, {
        children: /* @__PURE__ */ jsxs(Routes, {
          children: [/* @__PURE__ */ jsx(Route, {
            path: "/editor/*",
            element: /* @__PURE__ */ jsx(Editor, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "/docs/*",
            element: /* @__PURE__ */ jsx(Docs, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "/embed/*",
            element: /* @__PURE__ */ jsx(Embed, {})
          }), /* @__PURE__ */ jsx(Route, {
            path: "*",
            element: /* @__PURE__ */ jsx(Docs, {})
          })]
        })
      })
    })
  });
};
var doks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Doks,
  "default": Doks
});
export { Link as L, Routes as R, Route as a, useNavigate as b, useDocOptions as c, useLocation as d, useColorModeContext as e, doks as f, useParams as u };
//# sourceMappingURL=doks.js.map
