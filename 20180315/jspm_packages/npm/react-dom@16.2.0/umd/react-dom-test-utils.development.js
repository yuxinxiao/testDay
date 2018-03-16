/* */ 
"format cjs";
'use strict';
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('../index')) : typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) : (global.ReactTestUtils = factory(global.React, global.ReactDOM));
}(this, (function(React, ReactDOM) {
  'use strict';
  var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var _assign = ReactInternals.assign;
  var validateFormat = function validateFormat(format) {};
  {
    validateFormat = function validateFormat(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }
  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function() {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1;
      throw error;
    }
  }
  var invariant_1 = invariant;
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  var emptyFunction = function emptyFunction() {};
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() {
    return this;
  };
  emptyFunction.thatReturnsArgument = function(arg) {
    return arg;
  };
  var emptyFunction_1 = emptyFunction;
  var warning = emptyFunction_1;
  {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function() {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {}
    };
    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }
      if (format.indexOf('Failed Composite propType: ') === 0) {
        return;
      }
      if (!condition) {
        for (var _len2 = arguments.length,
            args = Array(_len2 > 2 ? _len2 - 2 : 0),
            _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }
        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }
  var warning_1 = warning;
  function get(key) {
    return key._reactInternalFiber;
  }
  var ReactInternals$1 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var ReactCurrentOwner = ReactInternals$1.ReactCurrentOwner;
  var ReactDebugCurrentFrame = ReactInternals$1.ReactDebugCurrentFrame;
  var FunctionalComponent = 1;
  var ClassComponent = 2;
  var HostRoot = 3;
  var HostComponent = 5;
  var HostText = 6;
  var NoEffect = 0;
  var Placement = 2;
  var MOUNTING = 1;
  var MOUNTED = 2;
  var UNMOUNTED = 3;
  function isFiberMountedImpl(fiber) {
    var node = fiber;
    if (!fiber.alternate) {
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
      while (node['return']) {
        node = node['return'];
        if ((node.effectTag & Placement) !== NoEffect) {
          return MOUNTING;
        }
      }
    } else {
      while (node['return']) {
        node = node['return'];
      }
    }
    if (node.tag === HostRoot) {
      return MOUNTED;
    }
    return UNMOUNTED;
  }
  function assertIsMounted(fiber) {
    !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;
    if (!alternate) {
      var state = isFiberMountedImpl(fiber);
      !(state !== UNMOUNTED) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
      if (state === MOUNTING) {
        return null;
      }
      return fiber;
    }
    var a = fiber;
    var b = alternate;
    while (true) {
      var parentA = a['return'];
      var parentB = parentA ? parentA.alternate : null;
      if (!parentA || !parentB) {
        break;
      }
      if (parentA.child === parentB.child) {
        var child = parentA.child;
        while (child) {
          if (child === a) {
            assertIsMounted(parentA);
            return fiber;
          }
          if (child === b) {
            assertIsMounted(parentA);
            return alternate;
          }
          child = child.sibling;
        }
        invariant_1(false, 'Unable to find node on an unmounted component.');
      }
      if (a['return'] !== b['return']) {
        a = parentA;
        b = parentB;
      } else {
        var didFindChild = false;
        var _child = parentA.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) {
          _child = parentB.child;
          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }
            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }
            _child = _child.sibling;
          }
          !didFindChild ? invariant_1(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
        }
      }
      !(a.alternate === b) ? invariant_1(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    !(a.tag === HostRoot) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
    if (a.stateNode.current === a) {
      return fiber;
    }
    return alternate;
  }
  var didWarnForAddedNewProperty = false;
  var isProxySupported = typeof Proxy === 'function';
  var EVENT_POOL_SIZE = 10;
  var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];
  var EventInterface = {
    type: null,
    target: null,
    currentTarget: emptyFunction_1.thatReturnsNull,
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };
  function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
    {
      delete this.nativeEvent;
      delete this.preventDefault;
      delete this.stopPropagation;
    }
    this.dispatchConfig = dispatchConfig;
    this._targetInst = targetInst;
    this.nativeEvent = nativeEvent;
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }
      {
        delete this[propName];
      }
      var normalize = Interface[propName];
      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        if (propName === 'target') {
          this.target = nativeEventTarget;
        } else {
          this[propName] = nativeEvent[propName];
        }
      }
    }
    var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
    if (defaultPrevented) {
      this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
    } else {
      this.isDefaultPrevented = emptyFunction_1.thatReturnsFalse;
    }
    this.isPropagationStopped = emptyFunction_1.thatReturnsFalse;
    return this;
  }
  _assign(SyntheticEvent.prototype, {
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      if (!event) {
        return;
      }
      if (event.preventDefault) {
        event.preventDefault();
      } else if (typeof event.returnValue !== 'unknown') {
        event.returnValue = false;
      }
      this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
    },
    stopPropagation: function() {
      var event = this.nativeEvent;
      if (!event) {
        return;
      }
      if (event.stopPropagation) {
        event.stopPropagation();
      } else if (typeof event.cancelBubble !== 'unknown') {
        event.cancelBubble = true;
      }
      this.isPropagationStopped = emptyFunction_1.thatReturnsTrue;
    },
    persist: function() {
      this.isPersistent = emptyFunction_1.thatReturnsTrue;
    },
    isPersistent: emptyFunction_1.thatReturnsFalse,
    destructor: function() {
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        {
          Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
        }
      }
      for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
        this[shouldBeReleasedProperties[i]] = null;
      }
      {
        Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
        Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction_1));
        Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction_1));
      }
    }
  });
  SyntheticEvent.Interface = EventInterface;
  SyntheticEvent.augmentClass = function(Class, Interface) {
    var Super = this;
    var E = function() {};
    E.prototype = Super.prototype;
    var prototype = new E();
    _assign(prototype, Class.prototype);
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.Interface = _assign({}, Super.Interface, Interface);
    Class.augmentClass = Super.augmentClass;
    addEventPoolingTo(Class);
  };
  {
    if (isProxySupported) {
      SyntheticEvent = new Proxy(SyntheticEvent, {
        construct: function(target, args) {
          return this.apply(target, Object.create(target.prototype), args);
        },
        apply: function(constructor, that, args) {
          return new Proxy(constructor.apply(that, args), {set: function(target, prop, value) {
              if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
                warning_1(didWarnForAddedNewProperty || target.isPersistent(), "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.');
                didWarnForAddedNewProperty = true;
              }
              target[prop] = value;
              return true;
            }});
        }
      });
    }
  }
  addEventPoolingTo(SyntheticEvent);
  function getPooledWarningPropertyDefinition(propName, getVal) {
    var isFunction = typeof getVal === 'function';
    return {
      configurable: true,
      set: set,
      get: get
    };
    function set(val) {
      var action = isFunction ? 'setting the method' : 'setting the property';
      warn(action, 'This is effectively a no-op');
      return val;
    }
    function get() {
      var action = isFunction ? 'accessing the method' : 'accessing the property';
      var result = isFunction ? 'This is a no-op function' : 'This is set to null';
      warn(action, result);
      return getVal;
    }
    function warn(action, result) {
      var warningCondition = false;
      warning_1(warningCondition, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result);
    }
  }
  function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
    var EventConstructor = this;
    if (EventConstructor.eventPool.length) {
      var instance = EventConstructor.eventPool.pop();
      EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
      return instance;
    }
    return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
  }
  function releasePooledEvent(event) {
    var EventConstructor = this;
    !(event instanceof EventConstructor) ? invariant_1(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
    event.destructor();
    if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
      EventConstructor.eventPool.push(event);
    }
  }
  function addEventPoolingTo(EventConstructor) {
    EventConstructor.eventPool = [];
    EventConstructor.getPooled = getPooledEvent;
    EventConstructor.release = releasePooledEvent;
  }
  var SyntheticEvent$1 = SyntheticEvent;
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
  };
  var ExecutionEnvironment_1 = ExecutionEnvironment;
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes['Webkit' + styleProp] = 'webkit' + eventName;
    prefixes['Moz' + styleProp] = 'moz' + eventName;
    prefixes['ms' + styleProp] = 'MS' + eventName;
    prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
    animationstart: makePrefixMap('Animation', 'AnimationStart'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd')
  };
  var prefixedEventNames = {};
  var style = {};
  if (ExecutionEnvironment_1.canUseDOM) {
    style = document.createElement('div').style;
    if (!('AnimationEvent' in window)) {
      delete vendorPrefixes.animationend.animation;
      delete vendorPrefixes.animationiteration.animation;
      delete vendorPrefixes.animationstart.animation;
    }
    if (!('TransitionEvent' in window)) {
      delete vendorPrefixes.transitionend.transition;
    }
  }
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    } else if (!vendorPrefixes[eventName]) {
      return eventName;
    }
    var prefixMap = vendorPrefixes[eventName];
    for (var styleProp in prefixMap) {
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
        return prefixedEventNames[eventName] = prefixMap[styleProp];
      }
    }
    return '';
  }
  var topLevelTypes$1 = {
    topAbort: 'abort',
    topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
    topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
    topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
    topBlur: 'blur',
    topCancel: 'cancel',
    topCanPlay: 'canplay',
    topCanPlayThrough: 'canplaythrough',
    topChange: 'change',
    topClick: 'click',
    topClose: 'close',
    topCompositionEnd: 'compositionend',
    topCompositionStart: 'compositionstart',
    topCompositionUpdate: 'compositionupdate',
    topContextMenu: 'contextmenu',
    topCopy: 'copy',
    topCut: 'cut',
    topDoubleClick: 'dblclick',
    topDrag: 'drag',
    topDragEnd: 'dragend',
    topDragEnter: 'dragenter',
    topDragExit: 'dragexit',
    topDragLeave: 'dragleave',
    topDragOver: 'dragover',
    topDragStart: 'dragstart',
    topDrop: 'drop',
    topDurationChange: 'durationchange',
    topEmptied: 'emptied',
    topEncrypted: 'encrypted',
    topEnded: 'ended',
    topError: 'error',
    topFocus: 'focus',
    topInput: 'input',
    topKeyDown: 'keydown',
    topKeyPress: 'keypress',
    topKeyUp: 'keyup',
    topLoadedData: 'loadeddata',
    topLoad: 'load',
    topLoadedMetadata: 'loadedmetadata',
    topLoadStart: 'loadstart',
    topMouseDown: 'mousedown',
    topMouseMove: 'mousemove',
    topMouseOut: 'mouseout',
    topMouseOver: 'mouseover',
    topMouseUp: 'mouseup',
    topPaste: 'paste',
    topPause: 'pause',
    topPlay: 'play',
    topPlaying: 'playing',
    topProgress: 'progress',
    topRateChange: 'ratechange',
    topScroll: 'scroll',
    topSeeked: 'seeked',
    topSeeking: 'seeking',
    topSelectionChange: 'selectionchange',
    topStalled: 'stalled',
    topSuspend: 'suspend',
    topTextInput: 'textInput',
    topTimeUpdate: 'timeupdate',
    topToggle: 'toggle',
    topTouchCancel: 'touchcancel',
    topTouchEnd: 'touchend',
    topTouchMove: 'touchmove',
    topTouchStart: 'touchstart',
    topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
    topVolumeChange: 'volumechange',
    topWaiting: 'waiting',
    topWheel: 'wheel'
  };
  var BrowserEventConstants = {topLevelTypes: topLevelTypes$1};
  var findDOMNode = ReactDOM.findDOMNode;
  var _ReactDOM$__SECRET_IN = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var EventPluginHub = _ReactDOM$__SECRET_IN.EventPluginHub;
  var EventPluginRegistry = _ReactDOM$__SECRET_IN.EventPluginRegistry;
  var EventPropagators = _ReactDOM$__SECRET_IN.EventPropagators;
  var ReactControlledComponent = _ReactDOM$__SECRET_IN.ReactControlledComponent;
  var ReactDOMComponentTree = _ReactDOM$__SECRET_IN.ReactDOMComponentTree;
  var ReactDOMEventListener = _ReactDOM$__SECRET_IN.ReactDOMEventListener;
  var topLevelTypes = BrowserEventConstants.topLevelTypes;
  function Event(suffix) {}
  function findAllInRenderedFiberTreeInternal(fiber, test) {
    if (!fiber) {
      return [];
    }
    var currentParent = findCurrentFiberUsingSlowPath(fiber);
    if (!currentParent) {
      return [];
    }
    var node = currentParent;
    var ret = [];
    while (true) {
      if (node.tag === HostComponent || node.tag === HostText || node.tag === ClassComponent || node.tag === FunctionalComponent) {
        var publicInst = node.stateNode;
        if (test(publicInst)) {
          ret.push(publicInst);
        }
      }
      if (node.child) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === currentParent) {
        return ret;
      }
      while (!node.sibling) {
        if (!node['return'] || node['return'] === currentParent) {
          return ret;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }
  var ReactTestUtils = {
    renderIntoDocument: function(element) {
      var div = document.createElement('div');
      return ReactDOM.render(element, div);
    },
    isElement: function(element) {
      return React.isValidElement(element);
    },
    isElementOfType: function(inst, convenienceConstructor) {
      return React.isValidElement(inst) && inst.type === convenienceConstructor;
    },
    isDOMComponent: function(inst) {
      return !!(inst && inst.nodeType === 1 && inst.tagName);
    },
    isDOMComponentElement: function(inst) {
      return !!(inst && React.isValidElement(inst) && !!inst.tagName);
    },
    isCompositeComponent: function(inst) {
      if (ReactTestUtils.isDOMComponent(inst)) {
        return false;
      }
      return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
    },
    isCompositeComponentWithType: function(inst, type) {
      if (!ReactTestUtils.isCompositeComponent(inst)) {
        return false;
      }
      var internalInstance = get(inst);
      var constructor = internalInstance.type;
      return constructor === type;
    },
    findAllInRenderedTree: function(inst, test) {
      if (!inst) {
        return [];
      }
      !ReactTestUtils.isCompositeComponent(inst) ? invariant_1(false, 'findAllInRenderedTree(...): instance must be a composite component') : void 0;
      var internalInstance = get(inst);
      return findAllInRenderedFiberTreeInternal(internalInstance, test);
    },
    scryRenderedDOMComponentsWithClass: function(root, classNames) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        if (ReactTestUtils.isDOMComponent(inst)) {
          var className = inst.className;
          if (typeof className !== 'string') {
            className = inst.getAttribute('class') || '';
          }
          var classList = className.split(/\s+/);
          if (!Array.isArray(classNames)) {
            !(classNames !== undefined) ? invariant_1(false, 'TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.') : void 0;
            classNames = classNames.split(/\s+/);
          }
          return classNames.every(function(name) {
            return classList.indexOf(name) !== -1;
          });
        }
        return false;
      });
    },
    findRenderedDOMComponentWithClass: function(root, className) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
      }
      return all[0];
    },
    scryRenderedDOMComponentsWithTag: function(root, tagName) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
      });
    },
    findRenderedDOMComponentWithTag: function(root, tagName) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
      }
      return all[0];
    },
    scryRenderedComponentsWithType: function(root, componentType) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
      });
    },
    findRenderedComponentWithType: function(root, componentType) {
      var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
      }
      return all[0];
    },
    mockComponent: function(module, mockTagName) {
      mockTagName = mockTagName || module.mockTagName || 'div';
      module.prototype.render.mockImplementation(function() {
        return React.createElement(mockTagName, null, this.props.children);
      });
      return this;
    },
    simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
      fakeNativeEvent.target = node;
      ReactDOMEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
    },
    simulateNativeEventOnDOMComponent: function(topLevelType, comp, fakeNativeEvent) {
      ReactTestUtils.simulateNativeEventOnNode(topLevelType, findDOMNode(comp), fakeNativeEvent);
    },
    nativeTouchData: function(x, y) {
      return {touches: [{
          pageX: x,
          pageY: y
        }]};
    },
    Simulate: null,
    SimulateNative: {}
  };
  function makeSimulator(eventType) {
    return function(domNode, eventData) {
      !!React.isValidElement(domNode) ? invariant_1(false, 'TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering.') : void 0;
      !!ReactTestUtils.isCompositeComponent(domNode) ? invariant_1(false, 'TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead.') : void 0;
      var dispatchConfig = EventPluginRegistry.eventNameDispatchConfigs[eventType];
      var fakeNativeEvent = new Event();
      fakeNativeEvent.target = domNode;
      fakeNativeEvent.type = eventType.toLowerCase();
      var targetInst = ReactDOMComponentTree.getInstanceFromNode(domNode);
      var event = new SyntheticEvent$1(dispatchConfig, targetInst, fakeNativeEvent, domNode);
      event.persist();
      _assign(event, eventData);
      if (dispatchConfig.phasedRegistrationNames) {
        EventPropagators.accumulateTwoPhaseDispatches(event);
      } else {
        EventPropagators.accumulateDirectDispatches(event);
      }
      ReactDOM.unstable_batchedUpdates(function() {
        ReactControlledComponent.enqueueStateRestore(domNode);
        EventPluginHub.enqueueEvents(event);
        EventPluginHub.processEventQueue(true);
      });
    };
  }
  function buildSimulators() {
    ReactTestUtils.Simulate = {};
    var eventType;
    for (eventType in EventPluginRegistry.eventNameDispatchConfigs) {
      ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
    }
  }
  var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
  EventPluginHub.injection.injectEventPluginOrder = function() {
    oldInjectEventPluginOrder.apply(this, arguments);
    buildSimulators();
  };
  var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
  EventPluginHub.injection.injectEventPluginsByName = function() {
    oldInjectEventPlugins.apply(this, arguments);
    buildSimulators();
  };
  buildSimulators();
  function makeNativeSimulator(eventType) {
    return function(domComponentOrNode, nativeEventData) {
      var fakeNativeEvent = new Event(eventType);
      _assign(fakeNativeEvent, nativeEventData);
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
      } else if (domComponentOrNode.tagName) {
        ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
      }
    };
  }
  Object.keys(topLevelTypes).forEach(function(eventType) {
    var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
    ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
  });
  var ReactTestUtils$2 = Object.freeze({default: ReactTestUtils});
  var ReactTestUtils$3 = (ReactTestUtils$2 && ReactTestUtils) || ReactTestUtils$2;
  var testUtils = ReactTestUtils$3['default'] ? ReactTestUtils$3['default'] : ReactTestUtils$3;
  return testUtils;
})));
