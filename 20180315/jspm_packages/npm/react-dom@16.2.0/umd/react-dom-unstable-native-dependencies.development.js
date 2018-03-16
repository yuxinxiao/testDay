/* */ 
"format cjs";
(function(process) {
  'use strict';
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../index'), require('react')) : typeof define === 'function' && define.amd ? define(['react-dom', 'react'], factory) : (global.ReactDOMUnstableNativeDependencies = factory(global.ReactDOM, global.React));
  }(this, (function(ReactDOM, React) {
    'use strict';
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
    {
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');
      }
    }
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
    var getFiberCurrentPropsFromNode = null;
    var getInstanceFromNode = null;
    var getNodeFromInstance = null;
    var injection = {injectComponentTree: function(Injected) {
        getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
        getInstanceFromNode = Injected.getInstanceFromNode;
        getNodeFromInstance = Injected.getNodeFromInstance;
        {
          warning_1(getNodeFromInstance && getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.');
        }
      }};
    function isEndish(topLevelType) {
      return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
    }
    function isMoveish(topLevelType) {
      return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
    }
    function isStartish(topLevelType) {
      return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
    }
    var validateEventDispatches;
    {
      validateEventDispatches = function(event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchInstances = event._dispatchInstances;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        var instancesIsArr = Array.isArray(dispatchInstances);
        var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;
        warning_1(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.');
      };
    }
    function executeDispatchesInOrderStopAtTrueImpl(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchInstances = event._dispatchInstances;
      {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          if (dispatchListeners[i](event, dispatchInstances[i])) {
            return dispatchInstances[i];
          }
        }
      } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchInstances)) {
          return dispatchInstances;
        }
      }
      return null;
    }
    function executeDispatchesInOrderStopAtTrue(event) {
      var ret = executeDispatchesInOrderStopAtTrueImpl(event);
      event._dispatchInstances = null;
      event._dispatchListeners = null;
      return ret;
    }
    function executeDirectDispatch(event) {
      {
        validateEventDispatches(event);
      }
      var dispatchListener = event._dispatchListeners;
      var dispatchInstance = event._dispatchInstances;
      !!Array.isArray(dispatchListener) ? invariant_1(false, 'executeDirectDispatch(...): Invalid `event`.') : void 0;
      event.currentTarget = dispatchListener ? getNodeFromInstance(dispatchInstance) : null;
      var res = dispatchListener ? dispatchListener(event) : null;
      event.currentTarget = null;
      event._dispatchListeners = null;
      event._dispatchInstances = null;
      return res;
    }
    function hasDispatches(event) {
      return !!event._dispatchListeners;
    }
    var HostComponent = 5;
    function getParent(inst) {
      do {
        inst = inst['return'];
      } while (inst && inst.tag !== HostComponent);
      if (inst) {
        return inst;
      }
      return null;
    }
    function getLowestCommonAncestor(instA, instB) {
      var depthA = 0;
      for (var tempA = instA; tempA; tempA = getParent(tempA)) {
        depthA++;
      }
      var depthB = 0;
      for (var tempB = instB; tempB; tempB = getParent(tempB)) {
        depthB++;
      }
      while (depthA - depthB > 0) {
        instA = getParent(instA);
        depthA--;
      }
      while (depthB - depthA > 0) {
        instB = getParent(instB);
        depthB--;
      }
      var depth = depthA;
      while (depth--) {
        if (instA === instB || instA === instB.alternate) {
          return instA;
        }
        instA = getParent(instA);
        instB = getParent(instB);
      }
      return null;
    }
    function isAncestor(instA, instB) {
      while (instB) {
        if (instA === instB || instA === instB.alternate) {
          return true;
        }
        instB = getParent(instB);
      }
      return false;
    }
    function getParentInstance(inst) {
      return getParent(inst);
    }
    function traverseTwoPhase(inst, fn, arg) {
      var path = [];
      while (inst) {
        path.push(inst);
        inst = getParent(inst);
      }
      var i;
      for (i = path.length; i-- > 0; ) {
        fn(path[i], 'captured', arg);
      }
      for (i = 0; i < path.length; i++) {
        fn(path[i], 'bubbled', arg);
      }
    }
    function accumulateInto(current, next) {
      !(next != null) ? invariant_1(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;
      if (current == null) {
        return next;
      }
      if (Array.isArray(current)) {
        if (Array.isArray(next)) {
          current.push.apply(current, next);
          return current;
        }
        current.push(next);
        return current;
      }
      if (Array.isArray(next)) {
        return [current].concat(next);
      }
      return [current, next];
    }
    function forEachAccumulated(arr, cb, scope) {
      if (Array.isArray(arr)) {
        arr.forEach(cb, scope);
      } else if (arr) {
        cb.call(scope, arr);
      }
    }
    function isInteractive(tag) {
      return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
    }
    function shouldPreventMouseEvent(name, type, props) {
      switch (name) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
          return !!(props.disabled && isInteractive(type));
        default:
          return false;
      }
    }
    function getListener(inst, registrationName) {
      var listener;
      var stateNode = inst.stateNode;
      if (!stateNode) {
        return null;
      }
      var props = getFiberCurrentPropsFromNode(stateNode);
      if (!props) {
        return null;
      }
      listener = props[registrationName];
      if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
        return null;
      }
      !(!listener || typeof listener === 'function') ? invariant_1(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
      return listener;
    }
    function listenerAtPhase(inst, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(inst, registrationName);
    }
    function accumulateDirectionalDispatches(inst, phase, event) {
      {
        warning_1(inst, 'Dispatching inst must not be null');
      }
      var listener = listenerAtPhase(inst, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
      }
    }
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        var targetInst = event._targetInst;
        var parentInst = targetInst ? getParentInstance(targetInst) : null;
        traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateDispatches(inst, ignoredDirection, event) {
      if (inst && event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(inst, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
        }
      }
    }
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event._targetInst, null, event);
      }
    }
    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }
    function accumulateTwoPhaseDispatchesSkipTarget(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
    }
    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }
    var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var _assign = ReactInternals.assign;
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
    var ResponderEventInterface = {touchHistory: function(nativeEvent) {
        return null;
      }};
    function ResponderSyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
      return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
    }
    SyntheticEvent$1.augmentClass(ResponderSyntheticEvent, ResponderEventInterface);
    var MAX_TOUCH_BANK = 20;
    var touchBank = [];
    var touchHistory = {
      touchBank: touchBank,
      numberActiveTouches: 0,
      indexOfSingleActiveTouch: -1,
      mostRecentTimeStamp: 0
    };
    function timestampForTouch(touch) {
      return touch.timeStamp || touch.timestamp;
    }
    function createTouchRecord(touch) {
      return {
        touchActive: true,
        startPageX: touch.pageX,
        startPageY: touch.pageY,
        startTimeStamp: timestampForTouch(touch),
        currentPageX: touch.pageX,
        currentPageY: touch.pageY,
        currentTimeStamp: timestampForTouch(touch),
        previousPageX: touch.pageX,
        previousPageY: touch.pageY,
        previousTimeStamp: timestampForTouch(touch)
      };
    }
    function resetTouchRecord(touchRecord, touch) {
      touchRecord.touchActive = true;
      touchRecord.startPageX = touch.pageX;
      touchRecord.startPageY = touch.pageY;
      touchRecord.startTimeStamp = timestampForTouch(touch);
      touchRecord.currentPageX = touch.pageX;
      touchRecord.currentPageY = touch.pageY;
      touchRecord.currentTimeStamp = timestampForTouch(touch);
      touchRecord.previousPageX = touch.pageX;
      touchRecord.previousPageY = touch.pageY;
      touchRecord.previousTimeStamp = timestampForTouch(touch);
    }
    function getTouchIdentifier(_ref) {
      var identifier = _ref.identifier;
      !(identifier != null) ? invariant_1(false, 'Touch object is missing identifier.') : void 0;
      {
        warning_1(identifier <= MAX_TOUCH_BANK, 'Touch identifier %s is greater than maximum supported %s which causes ' + 'performance issues backfilling array locations for all of the indices.', identifier, MAX_TOUCH_BANK);
      }
      return identifier;
    }
    function recordTouchStart(touch) {
      var identifier = getTouchIdentifier(touch);
      var touchRecord = touchBank[identifier];
      if (touchRecord) {
        resetTouchRecord(touchRecord, touch);
      } else {
        touchBank[identifier] = createTouchRecord(touch);
      }
      touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
    }
    function recordTouchMove(touch) {
      var touchRecord = touchBank[getTouchIdentifier(touch)];
      if (touchRecord) {
        touchRecord.touchActive = true;
        touchRecord.previousPageX = touchRecord.currentPageX;
        touchRecord.previousPageY = touchRecord.currentPageY;
        touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
        touchRecord.currentPageX = touch.pageX;
        touchRecord.currentPageY = touch.pageY;
        touchRecord.currentTimeStamp = timestampForTouch(touch);
        touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
      } else {
        console.error('Cannot record touch move without a touch start.\n' + 'Touch Move: %s\n', 'Touch Bank: %s', printTouch(touch), printTouchBank());
      }
    }
    function recordTouchEnd(touch) {
      var touchRecord = touchBank[getTouchIdentifier(touch)];
      if (touchRecord) {
        touchRecord.touchActive = false;
        touchRecord.previousPageX = touchRecord.currentPageX;
        touchRecord.previousPageY = touchRecord.currentPageY;
        touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
        touchRecord.currentPageX = touch.pageX;
        touchRecord.currentPageY = touch.pageY;
        touchRecord.currentTimeStamp = timestampForTouch(touch);
        touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
      } else {
        console.error('Cannot record touch end without a touch start.\n' + 'Touch End: %s\n', 'Touch Bank: %s', printTouch(touch), printTouchBank());
      }
    }
    function printTouch(touch) {
      return JSON.stringify({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY,
        timestamp: timestampForTouch(touch)
      });
    }
    function printTouchBank() {
      var printed = JSON.stringify(touchBank.slice(0, MAX_TOUCH_BANK));
      if (touchBank.length > MAX_TOUCH_BANK) {
        printed += ' (original size: ' + touchBank.length + ')';
      }
      return printed;
    }
    var ResponderTouchHistoryStore = {
      recordTouchTrack: function(topLevelType, nativeEvent) {
        if (isMoveish(topLevelType)) {
          nativeEvent.changedTouches.forEach(recordTouchMove);
        } else if (isStartish(topLevelType)) {
          nativeEvent.changedTouches.forEach(recordTouchStart);
          touchHistory.numberActiveTouches = nativeEvent.touches.length;
          if (touchHistory.numberActiveTouches === 1) {
            touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier;
          }
        } else if (isEndish(topLevelType)) {
          nativeEvent.changedTouches.forEach(recordTouchEnd);
          touchHistory.numberActiveTouches = nativeEvent.touches.length;
          if (touchHistory.numberActiveTouches === 1) {
            for (var i = 0; i < touchBank.length; i++) {
              var touchTrackToCheck = touchBank[i];
              if (touchTrackToCheck != null && touchTrackToCheck.touchActive) {
                touchHistory.indexOfSingleActiveTouch = i;
                break;
              }
            }
            {
              var activeRecord = touchBank[touchHistory.indexOfSingleActiveTouch];
              warning_1(activeRecord != null && activeRecord.touchActive, 'Cannot find single active touch.');
            }
          }
        }
      },
      touchHistory: touchHistory
    };
    function accumulate(current, next) {
      !(next != null) ? invariant_1(false, 'accumulate(...): Accumulated items must be not be null or undefined.') : void 0;
      if (current == null) {
        return next;
      }
      if (Array.isArray(current)) {
        return current.concat(next);
      }
      if (Array.isArray(next)) {
        return [current].concat(next);
      }
      return [current, next];
    }
    var responderInst = null;
    var trackedTouchCount = 0;
    var previousActiveTouches = 0;
    var changeResponder = function(nextResponderInst, blockHostResponder) {
      var oldResponderInst = responderInst;
      responderInst = nextResponderInst;
      if (ResponderEventPlugin.GlobalResponderHandler !== null) {
        ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderInst, nextResponderInst, blockHostResponder);
      }
    };
    var eventTypes = {
      startShouldSetResponder: {phasedRegistrationNames: {
          bubbled: 'onStartShouldSetResponder',
          captured: 'onStartShouldSetResponderCapture'
        }},
      scrollShouldSetResponder: {phasedRegistrationNames: {
          bubbled: 'onScrollShouldSetResponder',
          captured: 'onScrollShouldSetResponderCapture'
        }},
      selectionChangeShouldSetResponder: {phasedRegistrationNames: {
          bubbled: 'onSelectionChangeShouldSetResponder',
          captured: 'onSelectionChangeShouldSetResponderCapture'
        }},
      moveShouldSetResponder: {phasedRegistrationNames: {
          bubbled: 'onMoveShouldSetResponder',
          captured: 'onMoveShouldSetResponderCapture'
        }},
      responderStart: {registrationName: 'onResponderStart'},
      responderMove: {registrationName: 'onResponderMove'},
      responderEnd: {registrationName: 'onResponderEnd'},
      responderRelease: {registrationName: 'onResponderRelease'},
      responderTerminationRequest: {registrationName: 'onResponderTerminationRequest'},
      responderGrant: {registrationName: 'onResponderGrant'},
      responderReject: {registrationName: 'onResponderReject'},
      responderTerminate: {registrationName: 'onResponderTerminate'}
    };
    function setResponderAndExtractTransfer(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var shouldSetEventType = isStartish(topLevelType) ? eventTypes.startShouldSetResponder : isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder : topLevelType === 'topSelectionChange' ? eventTypes.selectionChangeShouldSetResponder : eventTypes.scrollShouldSetResponder;
      var bubbleShouldSetFrom = !responderInst ? targetInst : getLowestCommonAncestor(responderInst, targetInst);
      var skipOverBubbleShouldSetFrom = bubbleShouldSetFrom === responderInst;
      var shouldSetEvent = ResponderSyntheticEvent.getPooled(shouldSetEventType, bubbleShouldSetFrom, nativeEvent, nativeEventTarget);
      shouldSetEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
      if (skipOverBubbleShouldSetFrom) {
        accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);
      } else {
        accumulateTwoPhaseDispatches(shouldSetEvent);
      }
      var wantsResponderInst = executeDispatchesInOrderStopAtTrue(shouldSetEvent);
      if (!shouldSetEvent.isPersistent()) {
        shouldSetEvent.constructor.release(shouldSetEvent);
      }
      if (!wantsResponderInst || wantsResponderInst === responderInst) {
        return null;
      }
      var extracted;
      var grantEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderGrant, wantsResponderInst, nativeEvent, nativeEventTarget);
      grantEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
      accumulateDirectDispatches(grantEvent);
      var blockHostResponder = executeDirectDispatch(grantEvent) === true;
      if (responderInst) {
        var terminationRequestEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest, responderInst, nativeEvent, nativeEventTarget);
        terminationRequestEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
        accumulateDirectDispatches(terminationRequestEvent);
        var shouldSwitch = !hasDispatches(terminationRequestEvent) || executeDirectDispatch(terminationRequestEvent);
        if (!terminationRequestEvent.isPersistent()) {
          terminationRequestEvent.constructor.release(terminationRequestEvent);
        }
        if (shouldSwitch) {
          var terminateEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminate, responderInst, nativeEvent, nativeEventTarget);
          terminateEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
          accumulateDirectDispatches(terminateEvent);
          extracted = accumulate(extracted, [grantEvent, terminateEvent]);
          changeResponder(wantsResponderInst, blockHostResponder);
        } else {
          var rejectEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderReject, wantsResponderInst, nativeEvent, nativeEventTarget);
          rejectEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
          accumulateDirectDispatches(rejectEvent);
          extracted = accumulate(extracted, rejectEvent);
        }
      } else {
        extracted = accumulate(extracted, grantEvent);
        changeResponder(wantsResponderInst, blockHostResponder);
      }
      return extracted;
    }
    function canTriggerTransfer(topLevelType, topLevelInst, nativeEvent) {
      return topLevelInst && (topLevelType === 'topScroll' && !nativeEvent.responderIgnoreScroll || trackedTouchCount > 0 && topLevelType === 'topSelectionChange' || isStartish(topLevelType) || isMoveish(topLevelType));
    }
    function noResponderTouches(nativeEvent) {
      var touches = nativeEvent.touches;
      if (!touches || touches.length === 0) {
        return true;
      }
      for (var i = 0; i < touches.length; i++) {
        var activeTouch = touches[i];
        var target = activeTouch.target;
        if (target !== null && target !== undefined && target !== 0) {
          var targetInst = getInstanceFromNode(target);
          if (isAncestor(responderInst, targetInst)) {
            return false;
          }
        }
      }
      return true;
    }
    var ResponderEventPlugin = {
      _getResponder: function() {
        return responderInst;
      },
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        if (isStartish(topLevelType)) {
          trackedTouchCount += 1;
        } else if (isEndish(topLevelType)) {
          if (trackedTouchCount >= 0) {
            trackedTouchCount -= 1;
          } else {
            console.error('Ended a touch event which was not counted in `trackedTouchCount`.');
            return null;
          }
        }
        ResponderTouchHistoryStore.recordTouchTrack(topLevelType, nativeEvent);
        var extracted = canTriggerTransfer(topLevelType, targetInst, nativeEvent) ? setResponderAndExtractTransfer(topLevelType, targetInst, nativeEvent, nativeEventTarget) : null;
        var isResponderTouchStart = responderInst && isStartish(topLevelType);
        var isResponderTouchMove = responderInst && isMoveish(topLevelType);
        var isResponderTouchEnd = responderInst && isEndish(topLevelType);
        var incrementalTouch = isResponderTouchStart ? eventTypes.responderStart : isResponderTouchMove ? eventTypes.responderMove : isResponderTouchEnd ? eventTypes.responderEnd : null;
        if (incrementalTouch) {
          var gesture = ResponderSyntheticEvent.getPooled(incrementalTouch, responderInst, nativeEvent, nativeEventTarget);
          gesture.touchHistory = ResponderTouchHistoryStore.touchHistory;
          accumulateDirectDispatches(gesture);
          extracted = accumulate(extracted, gesture);
        }
        var isResponderTerminate = responderInst && topLevelType === 'topTouchCancel';
        var isResponderRelease = responderInst && !isResponderTerminate && isEndish(topLevelType) && noResponderTouches(nativeEvent);
        var finalTouch = isResponderTerminate ? eventTypes.responderTerminate : isResponderRelease ? eventTypes.responderRelease : null;
        if (finalTouch) {
          var finalEvent = ResponderSyntheticEvent.getPooled(finalTouch, responderInst, nativeEvent, nativeEventTarget);
          finalEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
          accumulateDirectDispatches(finalEvent);
          extracted = accumulate(extracted, finalEvent);
          changeResponder(null);
        }
        var numberActiveTouches = ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
        if (ResponderEventPlugin.GlobalInteractionHandler && numberActiveTouches !== previousActiveTouches) {
          ResponderEventPlugin.GlobalInteractionHandler.onChange(numberActiveTouches);
        }
        previousActiveTouches = numberActiveTouches;
        return extracted;
      },
      GlobalResponderHandler: null,
      GlobalInteractionHandler: null,
      injection: {
        injectGlobalResponderHandler: function(GlobalResponderHandler) {
          ResponderEventPlugin.GlobalResponderHandler = GlobalResponderHandler;
        },
        injectGlobalInteractionHandler: function(GlobalInteractionHandler) {
          ResponderEventPlugin.GlobalInteractionHandler = GlobalInteractionHandler;
        }
      }
    };
    var injectComponentTree = injection.injectComponentTree;
    var ReactDOMComponentTree = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDOMComponentTree;
    injectComponentTree(ReactDOMComponentTree);
    var ReactDOMUnstableNativeDependencies = Object.freeze({
      injectComponentTree: injectComponentTree,
      ResponderEventPlugin: ResponderEventPlugin,
      ResponderTouchHistoryStore: ResponderTouchHistoryStore
    });
    var unstableNativeDependencies = ReactDOMUnstableNativeDependencies;
    return unstableNativeDependencies;
  })));
})(require('process'));
