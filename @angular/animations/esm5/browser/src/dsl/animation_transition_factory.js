import * as tslib_1 from "tslib";
import { getOrSetAsInMap } from '../render/shared';
import { copyObj, interpolateParams, iteratorToArray } from '../util';
import { buildAnimationTimelines } from './animation_timeline_builder';
import { createTransitionInstruction } from './animation_transition_instruction';
var EMPTY_OBJECT = {};
var AnimationTransitionFactory = /** @class */ (function () {
    function AnimationTransitionFactory(_triggerName, ast, _stateStyles) {
        this._triggerName = _triggerName;
        this.ast = ast;
        this._stateStyles = _stateStyles;
    }
    AnimationTransitionFactory.prototype.match = function (currentState, nextState, element, params) {
        return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState, element, params);
    };
    AnimationTransitionFactory.prototype.buildStyles = function (stateName, params, errors) {
        var backupStateStyler = this._stateStyles['*'];
        var stateStyler = this._stateStyles[stateName];
        var backupStyles = backupStateStyler ? backupStateStyler.buildStyles(params, errors) : {};
        return stateStyler ? stateStyler.buildStyles(params, errors) : backupStyles;
    };
    AnimationTransitionFactory.prototype.build = function (driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
        var errors = [];
        var transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
        var currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
        var currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
        var nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
        var nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
        var queriedElements = new Set();
        var preStyleMap = new Map();
        var postStyleMap = new Map();
        var isRemoval = nextState === 'void';
        var animationOptions = { params: tslib_1.__assign({}, transitionAnimationParams, nextAnimationParams) };
        var timelines = skipAstBuild ? [] : buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
        var totalTime = 0;
        timelines.forEach(function (tl) { totalTime = Math.max(tl.duration + tl.delay, totalTime); });
        if (errors.length) {
            return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
        }
        timelines.forEach(function (tl) {
            var elm = tl.element;
            var preProps = getOrSetAsInMap(preStyleMap, elm, {});
            tl.preStyleProps.forEach(function (prop) { return preProps[prop] = true; });
            var postProps = getOrSetAsInMap(postStyleMap, elm, {});
            tl.postStyleProps.forEach(function (prop) { return postProps[prop] = true; });
            if (elm !== element) {
                queriedElements.add(elm);
            }
        });
        var queriedElementsList = iteratorToArray(queriedElements.values());
        return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap, totalTime);
    };
    return AnimationTransitionFactory;
}());
export { AnimationTransitionFactory };
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState, element, params) {
    return matchFns.some(function (fn) { return fn(currentState, nextState, element, params); });
}
var AnimationStateStyles = /** @class */ (function () {
    function AnimationStateStyles(styles, defaultParams) {
        this.styles = styles;
        this.defaultParams = defaultParams;
    }
    AnimationStateStyles.prototype.buildStyles = function (params, errors) {
        var finalStyles = {};
        var combinedParams = copyObj(this.defaultParams);
        Object.keys(params).forEach(function (key) {
            var value = params[key];
            if (value != null) {
                combinedParams[key] = value;
            }
        });
        this.styles.styles.forEach(function (value) {
            if (typeof value !== 'string') {
                var styleObj_1 = value;
                Object.keys(styleObj_1).forEach(function (prop) {
                    var val = styleObj_1[prop];
                    if (val.length > 1) {
                        val = interpolateParams(val, combinedParams, errors);
                    }
                    finalStyles[prop] = val;
                });
            }
        });
        return finalStyles;
    };
    return AnimationStateStyles;
}());
export { AnimationStateStyles };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyYW5zaXRpb25fZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvZHNsL2FuaW1hdGlvbl90cmFuc2l0aW9uX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBd0IsTUFBTSxTQUFTLENBQUM7QUFHM0YsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFckUsT0FBTyxFQUFpQywyQkFBMkIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRy9HLElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV4QjtJQUNFLG9DQUNZLFlBQW9CLEVBQVMsR0FBa0IsRUFDL0MsWUFBeUQ7UUFEekQsaUJBQVksR0FBWixZQUFZLENBQVE7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBQy9DLGlCQUFZLEdBQVosWUFBWSxDQUE2QztJQUFHLENBQUM7SUFFekUsMENBQUssR0FBTCxVQUFNLFlBQWlCLEVBQUUsU0FBYyxFQUFFLE9BQVksRUFBRSxNQUE0QjtRQUNqRixPQUFPLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRCxnREFBVyxHQUFYLFVBQVksU0FBaUIsRUFBRSxNQUE0QixFQUFFLE1BQWE7UUFDeEUsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFD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LDBDQUFXLEdBQVgsVUFBWSxNQUE0QixFQUFFLE1BQWdCO1FBQ3hELElBQU0sV0FBVyxHQUFlLEVBQUUsQ0FBQztRQUNuQyxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUM3QixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNqQixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixJQUFNLFVBQVEsR0FBRyxLQUFZLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDaEMsSUFBSSxHQUFHLEdBQUcsVUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNsQixHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDdEQ7b0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uT3B0aW9ucywgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi4vcmVuZGVyL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtnZXRPclNldEFzSW5NYXB9IGZyb20gJy4uL3JlbmRlci9zaGFyZWQnO1xuaW1wb3J0IHtjb3B5T2JqLCBpbnRlcnBvbGF0ZVBhcmFtcywgaXRlcmF0b3JUb0FycmF5LCBtZXJnZUFuaW1hdGlvbk9wdGlvbnN9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge1N0eWxlQXN0LCBUcmFuc2l0aW9uQXN0fSBmcm9tICcuL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtidWlsZEFuaW1hdGlvblRpbWVsaW5lc30gZnJvbSAnLi9hbmltYXRpb25fdGltZWxpbmVfYnVpbGRlcic7XG5pbXBvcnQge1RyYW5zaXRpb25NYXRjaGVyRm59IGZyb20gJy4vYW5pbWF0aW9uX3RyYW5zaXRpb25fZXhwcic7XG5pbXBvcnQge0FuaW1hdGlvblRyYW5zaXRpb25JbnN0cnVjdGlvbiwgY3JlYXRlVHJhbnNpdGlvbkluc3RydWN0aW9ufSBmcm9tICcuL2FuaW1hdGlvbl90cmFuc2l0aW9uX2luc3RydWN0aW9uJztcbmltcG9ydCB7RWxlbWVudEluc3RydWN0aW9uTWFwfSBmcm9tICcuL2VsZW1lbnRfaW5zdHJ1Y3Rpb25fbWFwJztcblxuY29uc3QgRU1QVFlfT0JKRUNUID0ge307XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfdHJpZ2dlck5hbWU6IHN0cmluZywgcHVibGljIGFzdDogVHJhbnNpdGlvbkFzdCxcbiAgICAgIHByaXZhdGUgX3N0YXRlU3R5bGVzOiB7W3N0YXRlTmFtZTogc3RyaW5nXTogQW5pbWF0aW9uU3RhdGVTdHlsZXN9KSB7fVxuXG4gIG1hdGNoKGN1cnJlbnRTdGF0ZTogYW55LCBuZXh0U3RhdGU6IGFueSwgZWxlbWVudDogYW55LCBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9uZU9yTW9yZVRyYW5zaXRpb25zTWF0Y2godGhpcy5hc3QubWF0Y2hlcnMsIGN1cnJlbnRTdGF0ZSwgbmV4dFN0YXRlLCBlbGVtZW50LCBwYXJhbXMpO1xuICB9XG5cbiAgYnVpbGRTdHlsZXMoc3RhdGVOYW1lOiBzdHJpbmcsIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGVycm9yczogYW55W10pIHtcbiAgICBjb25zdCBiYWNrdXBTdGF0ZVN0eWxlciA9IHRoaXMuX3N0YXRlU3R5bGVzWycqJ107XG4gICAgY29uc3Qgc3RhdGVTdHlsZXIgPSB0aGlzLl9zdGF0ZVN0eWxlc1tzdGF0ZU5hbWVdO1xuICAgIGNvbnN0IGJhY2t1cFN0eWxlcyA9IGJhY2t1cFN0YXRlU3R5bGVyID8gYmFja3VwU3RhdGVTdHlsZXIuYnVpbGRTdHlsZXMocGFyYW1zLCBlcnJvcnMpIDoge307XG4gICAgcmV0dXJuIHN0YXRlU3R5bGVyID8gc3RhdGVTdHlsZXIuYnVpbGRTdHlsZXMocGFyYW1zLCBlcnJvcnMpIDogYmFja3VwU3R5bGVzO1xuICB9XG5cbiAgYnVpbGQoXG4gICAgICBkcml2ZXI6IEFuaW1hdGlvbkRyaXZlciwgZWxlbWVudDogYW55LCBjdXJyZW50U3RhdGU6IGFueSwgbmV4dFN0YXRlOiBhbnksXG4gICAgICBlbnRlckNsYXNzTmFtZTogc3RyaW5nLCBsZWF2ZUNsYXNzTmFtZTogc3RyaW5nLCBjdXJyZW50T3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMsXG4gICAgICBuZXh0T3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMsIHN1Ykluc3RydWN0aW9ucz86IEVsZW1lbnRJbnN0cnVjdGlvbk1hcCxcbiAgICAgIHNraXBBc3RCdWlsZD86IGJvb2xlYW4pOiBBbmltYXRpb25UcmFuc2l0aW9uSW5zdHJ1Y3Rpb24ge1xuICAgIGNvbnN0IGVycm9yczogYW55W10gPSBbXTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25BbmltYXRpb25QYXJhbXMgPSB0aGlzLmFzdC5vcHRpb25zICYmIHRoaXMuYXN0Lm9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uUGFyYW1zID0gY3VycmVudE9wdGlvbnMgJiYgY3VycmVudE9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVTdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVzKGN1cnJlbnRTdGF0ZSwgY3VycmVudEFuaW1hdGlvblBhcmFtcywgZXJyb3JzKTtcbiAgICBjb25zdCBuZXh0QW5pbWF0aW9uUGFyYW1zID0gbmV4dE9wdGlvbnMgJiYgbmV4dE9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBuZXh0U3RhdGVTdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVzKG5leHRTdGF0ZSwgbmV4dEFuaW1hdGlvblBhcmFtcywgZXJyb3JzKTtcblxuICAgIGNvbnN0IHF1ZXJpZWRFbGVtZW50cyA9IG5ldyBTZXQ8YW55PigpO1xuICAgIGNvbnN0IHByZVN0eWxlTWFwID0gbmV3IE1hcDxhbnksIHtbcHJvcDogc3RyaW5nXTogYm9vbGVhbn0+KCk7XG4gICAgY29uc3QgcG9zdFN0eWxlTWFwID0gbmV3IE1hcDxhbnksIHtbcHJvcDogc3RyaW5nXTogYm9vbGVhbn0+KCk7XG4gICAgY29uc3QgaXNSZW1vdmFsID0gbmV4dFN0YXRlID09PSAndm9pZCc7XG5cbiAgICBjb25zdCBhbmltYXRpb25PcHRpb25zID0ge3BhcmFtczogey4uLnRyYW5zaXRpb25BbmltYXRpb25QYXJhbXMsIC4uLm5leHRBbmltYXRpb25QYXJhbXN9fTtcblxuICAgIGNvbnN0IHRpbWVsaW5lcyA9IHNraXBBc3RCdWlsZCA/IFtdIDogYnVpbGRBbmltYXRpb25UaW1lbGluZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyLCBlbGVtZW50LCB0aGlzLmFzdC5hbmltYXRpb24sIGVudGVyQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlQ2xhc3NOYW1lLCBjdXJyZW50U3RhdGVTdHlsZXMsIG5leHRTdGF0ZVN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25PcHRpb25zLCBzdWJJbnN0cnVjdGlvbnMsIGVycm9ycyk7XG5cbiAgICBsZXQgdG90YWxUaW1lID0gMDtcbiAgICB0aW1lbGluZXMuZm9yRWFjaCh0bCA9PiB7IHRvdGFsVGltZSA9IE1hdGgubWF4KHRsLmR1cmF0aW9uICsgdGwuZGVsYXksIHRvdGFsVGltZSk7IH0pO1xuXG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVUcmFuc2l0aW9uSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgZWxlbWVudCwgdGhpcy5fdHJpZ2dlck5hbWUsIGN1cnJlbnRTdGF0ZSwgbmV4dFN0YXRlLCBpc1JlbW92YWwsIGN1cnJlbnRTdGF0ZVN0eWxlcyxcbiAgICAgICAgICBuZXh0U3RhdGVTdHlsZXMsIFtdLCBbXSwgcHJlU3R5bGVNYXAsIHBvc3RTdHlsZU1hcCwgdG90YWxUaW1lLCBlcnJvcnMpO1xuICAgIH1cblxuICAgIHRpbWVsaW5lcy5mb3JFYWNoKHRsID0+IHtcbiAgICAgIGNvbnN0IGVsbSA9IHRsLmVsZW1lbnQ7XG4gICAgICBjb25zdCBwcmVQcm9wcyA9IGdldE9yU2V0QXNJbk1hcChwcmVTdHlsZU1hcCwgZWxtLCB7fSk7XG4gICAgICB0bC5wcmVTdHlsZVByb3BzLmZvckVhY2gocHJvcCA9PiBwcmVQcm9wc1twcm9wXSA9IHRydWUpO1xuXG4gICAgICBjb25zdCBwb3N0UHJvcHMgPSBnZXRPclNldEFzSW5NYXAocG9zdFN0eWxlTWFwLCBlbG0sIHt9KTtcbiAgICAgIHRsLnBvc3RTdHlsZVByb3BzLmZvckVhY2gocHJvcCA9PiBwb3N0UHJvcHNbcHJvcF0gPSB0cnVlKTtcblxuICAgICAgaWYgKGVsbSAhPT0gZWxlbWVudCkge1xuICAgICAgICBxdWVyaWVkRWxlbWVudHMuYWRkKGVsbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBxdWVyaWVkRWxlbWVudHNMaXN0ID0gaXRlcmF0b3JUb0FycmF5KHF1ZXJpZWRFbGVtZW50cy52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIGNyZWF0ZVRyYW5zaXRpb25JbnN0cnVjdGlvbihcbiAgICAgICAgZWxlbWVudCwgdGhpcy5fdHJpZ2dlck5hbWUsIGN1cnJlbnRTdGF0ZSwgbmV4dFN0YXRlLCBpc1JlbW92YWwsIGN1cnJlbnRTdGF0ZVN0eWxlcyxcbiAgICAgICAgbmV4dFN0YXRlU3R5bGVzLCB0aW1lbGluZXMsIHF1ZXJpZWRFbGVtZW50c0xpc3QsIHByZVN0eWxlTWFwLCBwb3N0U3R5bGVNYXAsIHRvdGFsVGltZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25lT3JNb3JlVHJhbnNpdGlvbnNNYXRjaChcbiAgICBtYXRjaEZuczogVHJhbnNpdGlvbk1hdGNoZXJGbltdLCBjdXJyZW50U3RhdGU6IGFueSwgbmV4dFN0YXRlOiBhbnksIGVsZW1lbnQ6IGFueSxcbiAgICBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gIHJldHVybiBtYXRjaEZucy5zb21lKGZuID0+IGZuKGN1cnJlbnRTdGF0ZSwgbmV4dFN0YXRlLCBlbGVtZW50LCBwYXJhbXMpKTtcbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblN0YXRlU3R5bGVzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHlsZXM6IFN0eWxlQXN0LCBwcml2YXRlIGRlZmF1bHRQYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7fVxuXG4gIGJ1aWxkU3R5bGVzKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGVycm9yczogc3RyaW5nW10pOiDJtVN0eWxlRGF0YSB7XG4gICAgY29uc3QgZmluYWxTdHlsZXM6IMm1U3R5bGVEYXRhID0ge307XG4gICAgY29uc3QgY29tYmluZWRQYXJhbXMgPSBjb3B5T2JqKHRoaXMuZGVmYXVsdFBhcmFtcyk7XG4gICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgY29tYmluZWRQYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3R5bGVzLnN0eWxlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlT2JqID0gdmFsdWUgYXMgYW55O1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZU9iaikuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBsZXQgdmFsID0gc3R5bGVPYmpbcHJvcF07XG4gICAgICAgICAgaWYgKHZhbC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnBvbGF0ZVBhcmFtcyh2YWwsIGNvbWJpbmVkUGFyYW1zLCBlcnJvcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaW5hbFN0eWxlc1twcm9wXSA9IHZhbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsU3R5bGVzO1xuICB9XG59XG4iXX0=