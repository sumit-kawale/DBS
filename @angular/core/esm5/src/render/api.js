/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di/injection_token';
import { injectRenderer2 as render3InjectRenderer2 } from '../render3/view_engine_compatibility';
import { noop } from '../util/noop';
/**
 * @deprecated Use `RendererType2` (and `Renderer2`) instead.
 * @publicApi
 */
var RenderComponentType = /** @class */ (function () {
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
    return RenderComponentType;
}());
export { RenderComponentType };
/**
 * @deprecated Debug info is handled internally in the view engine now.
 */
var RenderDebugInfo = /** @class */ (function () {
    function RenderDebugInfo() {
    }
    return RenderDebugInfo;
}());
export { RenderDebugInfo };
/**
 * @deprecated Use the `Renderer2` instead.
 * @publicApi
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    return Renderer;
}());
export { Renderer };
export var Renderer2Interceptor = new InjectionToken('Renderer2Interceptor');
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link Renderer#setElementProperty setElementProperty} or
 * {@link Renderer#setElementAttribute setElementAttribute} respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactory2` instead.
 * @publicApi
 */
var RootRenderer = /** @class */ (function () {
    function RootRenderer() {
    }
    return RootRenderer;
}());
export { RootRenderer };
/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * @publicApi
 */
var RendererFactory2 = /** @class */ (function () {
    function RendererFactory2() {
    }
    return RendererFactory2;
}());
export { RendererFactory2 };
/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
export var RendererStyleFlags2;
(function (RendererStyleFlags2) {
    /**
     * Marks a style as important.
     */
    RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
})(RendererStyleFlags2 || (RendererStyleFlags2 = {}));
/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * @publicApi
 */
var Renderer2 = /** @class */ (function () {
    function Renderer2() {
    }
    /**
     * @internal
     * @nocollapse
     */
    Renderer2.__NG_ELEMENT_ID__ = function () { return SWITCH_RENDERER2_FACTORY(); };
    return Renderer2;
}());
export { Renderer2 };
export var SWITCH_RENDERER2_FACTORY__POST_R3__ = render3InjectRenderer2;
var SWITCH_RENDERER2_FACTORY__PRE_R3__ = noop;
var SWITCH_RENDERER2_FACTORY = SWITCH_RENDERER2_FACTORY__PRE_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHckQsT0FBTyxFQUFDLGVBQWUsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQy9GLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFJbEM7OztHQUdHO0FBQ0g7SUFDRSw2QkFDVyxFQUFVLEVBQVMsV0FBbUIsRUFBUyxTQUFpQixFQUNoRSxhQUFnQyxFQUFTLE1BQTJCLEVBQ3BFLFVBQWU7UUFGZixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2hFLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQ3BFLGVBQVUsR0FBVixVQUFVLENBQUs7SUFBRyxDQUFDO0lBQ2hDLDBCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBRUQ7O0dBRUc7QUFDSDtJQUFBO0lBT0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7O0FBYUQ7OztHQUdHO0FBQ0g7SUFBQTtJQTZDQSxDQUFDO0lBQUQsZUFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7O0FBRUQsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQWMsc0JBQXNCLENBQUMsQ0FBQztBQUU1Rjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFtQ0Q7Ozs7R0FJRztBQUNIO0lBQUE7SUFxQkEsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQzs7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxtQkFTWDtBQVRELFdBQVksbUJBQW1CO0lBQzdCOztPQUVHO0lBQ0gsdUVBQWtCLENBQUE7SUFDbEI7O09BRUc7SUFDSCxxRUFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBVFcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQVM5QjtBQUVEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0g7SUFBQTtJQTBLQSxDQUFDO0lBTEM7OztPQUdHO0lBQ0ksMkJBQWlCLEdBQW9CLGNBQU0sT0FBQSx3QkFBd0IsRUFBRSxFQUExQixDQUEwQixDQUFDO0lBQy9FLGdCQUFDO0NBQUEsQUExS0QsSUEwS0M7U0ExS3FCLFNBQVM7QUE2Sy9CLE1BQU0sQ0FBQyxJQUFNLG1DQUFtQyxHQUFHLHNCQUFzQixDQUFDO0FBQzFFLElBQU0sa0NBQWtDLEdBQUcsSUFBSSxDQUFDO0FBQ2hELElBQU0sd0JBQXdCLEdBQWtDLGtDQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge2luamVjdFJlbmRlcmVyMiBhcyByZW5kZXIzSW5qZWN0UmVuZGVyZXIyfSBmcm9tICcuLi9yZW5kZXIzL3ZpZXdfZW5naW5lX2NvbXBhdGliaWxpdHknO1xuaW1wb3J0IHtub29wfSBmcm9tICcuLi91dGlsL25vb3AnO1xuXG5cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlbmRlcmVyVHlwZTJgIChhbmQgYFJlbmRlcmVyMmApIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcsIHB1YmxpYyBzbG90Q291bnQ6IG51bWJlcixcbiAgICAgIHB1YmxpYyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbiwgcHVibGljIHN0eWxlczogQXJyYXk8c3RyaW5nfGFueVtdPixcbiAgICAgIHB1YmxpYyBhbmltYXRpb25zOiBhbnkpIHt9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgRGVidWcgaW5mbyBpcyBoYW5kbGVkIGludGVybmFsbHkgaW4gdGhlIHZpZXcgZW5naW5lIG5vdy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlckRlYnVnSW5mbyB7XG4gIGFic3RyYWN0IGdldCBpbmplY3RvcigpOiBJbmplY3RvcjtcbiAgYWJzdHJhY3QgZ2V0IGNvbXBvbmVudCgpOiBhbnk7XG4gIGFic3RyYWN0IGdldCBwcm92aWRlclRva2VucygpOiBhbnlbXTtcbiAgYWJzdHJhY3QgZ2V0IHJlZmVyZW5jZXMoKToge1trZXk6IHN0cmluZ106IGFueX07XG4gIGFic3RyYWN0IGdldCBjb250ZXh0KCk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0IHNvdXJjZSgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBgUmVuZGVyZXIyYCBpbnN0ZWFkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdFJlbmRlcmVyIHtcbiAgcmVtb3ZlKG5vZGU6IGFueSk6IHZvaWQ7XG4gIGFwcGVuZENoaWxkKG5vZGU6IGFueSwgcGFyZW50OiBhbnkpOiB2b2lkO1xuICBpbnNlcnRCZWZvcmUobm9kZTogYW55LCByZWZOb2RlOiBhbnkpOiB2b2lkO1xuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnk7XG4gIHBhcmVudEVsZW1lbnQobm9kZTogYW55KTogYW55O1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgYFJlbmRlcmVyMmAgaW5zdGVhZC5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyIHtcbiAgYWJzdHJhY3Qgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIGRlYnVnSW5mbz86IFJlbmRlckRlYnVnSW5mbyk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBkZWJ1Z0luZm8/OiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IGFueSk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50OiBhbnksIGRlYnVnSW5mbz86IFJlbmRlckRlYnVnSW5mbyk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZGVidWdJbmZvPzogUmVuZGVyRGVidWdJbmZvKTogYW55O1xuXG4gIGFic3RyYWN0IHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYXR0YWNoVmlld0FmdGVyKG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb247XG5cbiAgYWJzdHJhY3QgbGlzdGVuR2xvYmFsKHRhcmdldDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnkpOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlPzogc3RyaW5nKTpcbiAgICAgIHZvaWQ7XG5cbiAgLyoqXG4gICAqIFVzZWQgb25seSBpbiBkZWJ1ZyBtb2RlIHRvIHNlcmlhbGl6ZSBwcm9wZXJ0eSBjaGFuZ2VzIHRvIGRvbSBub2RlcyBhcyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpOlxuICAgICAgdm9pZDtcblxuICBhYnN0cmFjdCBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nKTogdm9pZDtcblxuICBhYnN0cmFjdCBpbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzPzogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldFRleHQocmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGFuaW1hdGUoXG4gICAgICBlbGVtZW50OiBhbnksIHN0YXJ0aW5nU3R5bGVzOiBhbnksIGtleWZyYW1lczogYW55W10sIGR1cmF0aW9uOiBudW1iZXIsIGRlbGF5OiBudW1iZXIsXG4gICAgICBlYXNpbmc6IHN0cmluZywgcHJldmlvdXNQbGF5ZXJzPzogYW55W10pOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBSZW5kZXJlcjJJbnRlcmNlcHRvciA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSZW5kZXJlcjJbXT4oJ1JlbmRlcmVyMkludGVyY2VwdG9yJyk7XG5cbi8qKlxuICogSW5qZWN0YWJsZSBzZXJ2aWNlIHRoYXQgcHJvdmlkZXMgYSBsb3ctbGV2ZWwgaW50ZXJmYWNlIGZvciBtb2RpZnlpbmcgdGhlIFVJLlxuICpcbiAqIFVzZSB0aGlzIHNlcnZpY2UgdG8gYnlwYXNzIEFuZ3VsYXIncyB0ZW1wbGF0aW5nIGFuZCBtYWtlIGN1c3RvbSBVSSBjaGFuZ2VzIHRoYXQgY2FuJ3QgYmVcbiAqIGV4cHJlc3NlZCBkZWNsYXJhdGl2ZWx5LiBGb3IgZXhhbXBsZSBpZiB5b3UgbmVlZCB0byBzZXQgYSBwcm9wZXJ0eSBvciBhbiBhdHRyaWJ1dGUgd2hvc2UgbmFtZSBpc1xuICogbm90IHN0YXRpY2FsbHkga25vd24sIHVzZSB7QGxpbmsgUmVuZGVyZXIjc2V0RWxlbWVudFByb3BlcnR5IHNldEVsZW1lbnRQcm9wZXJ0eX0gb3JcbiAqIHtAbGluayBSZW5kZXJlciNzZXRFbGVtZW50QXR0cmlidXRlIHNldEVsZW1lbnRBdHRyaWJ1dGV9IHJlc3BlY3RpdmVseS5cbiAqXG4gKiBJZiB5b3UgYXJlIGltcGxlbWVudGluZyBhIGN1c3RvbSByZW5kZXJlciwgeW91IG11c3QgaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlLlxuICpcbiAqIFRoZSBkZWZhdWx0IFJlbmRlcmVyIGltcGxlbWVudGF0aW9uIGlzIGBEb21SZW5kZXJlcmAuIEFsc28gYXZhaWxhYmxlIGlzIGBXZWJXb3JrZXJSZW5kZXJlcmAuXG4gKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBSZW5kZXJlckZhY3RvcnkyYCBpbnN0ZWFkLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm9vdFJlbmRlcmVyIHtcbiAgYWJzdHJhY3QgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlcjtcbn1cblxuLyoqXG4gKiBVc2VkIGJ5IGBSZW5kZXJlckZhY3RvcnkyYCB0byBhc3NvY2lhdGUgY3VzdG9tIHJlbmRlcmluZyBkYXRhIGFuZCBzdHlsZXNcbiAqIHdpdGggYSByZW5kZXJpbmcgaW1wbGVtZW50YXRpb24uXG4gKiAgQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlcmVyVHlwZTIge1xuICAvKipcbiAgICogQSB1bmlxdWUgaWRlbnRpZnlpbmcgc3RyaW5nIGZvciB0aGUgbmV3IHJlbmRlcmVyLCB1c2VkIHdoZW4gY3JlYXRpbmdcbiAgICogdW5pcXVlIHN0eWxlcyBmb3IgZW5jYXBzdWxhdGlvbi5cbiAgICovXG4gIGlkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdmlldyBlbmNhcHN1bGF0aW9uIHR5cGUsIHdoaWNoIGRldGVybWluZXMgaG93IHN0eWxlcyBhcmUgYXBwbGllZCB0b1xuICAgKiBET00gZWxlbWVudHMuIE9uZSBvZlxuICAgKiAtIGBFbXVsYXRlZGAgKGRlZmF1bHQpOiBFbXVsYXRlIG5hdGl2ZSBzY29waW5nIG9mIHN0eWxlcy5cbiAgICogLSBgTmF0aXZlYDogVXNlIHRoZSBuYXRpdmUgZW5jYXBzdWxhdGlvbiBtZWNoYW5pc20gb2YgdGhlIHJlbmRlcmVyLlxuICAgKiAtIGBTaGFkb3dEb21gOiBVc2UgbW9kZXJuIFtTaGFkb3dcbiAgICogRE9NXShodHRwczovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL3NoYWRvdy8pIGFuZFxuICAgKiBjcmVhdGUgYSBTaGFkb3dSb290IGZvciBjb21wb25lbnQncyBob3N0IGVsZW1lbnQuXG4gICAqIC0gYE5vbmVgOiBEbyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgb3Igc3R5bGUgZW5jYXBzdWxhdGlvbi5cbiAgICovXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuICAvKipcbiAgICogRGVmaW5lcyBDU1Mgc3R5bGVzIHRvIGJlIHN0b3JlZCBvbiBhIHJlbmRlcmVyIGluc3RhbmNlLlxuICAgKi9cbiAgc3R5bGVzOiAoc3RyaW5nfGFueVtdKVtdO1xuICAvKipcbiAgICogRGVmaW5lcyBhcmJpdHJhcnkgZGV2ZWxvcGVyLWRlZmluZWQgZGF0YSB0byBiZSBzdG9yZWQgb24gYSByZW5kZXJlciBpbnN0YW5jZS5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHJlbmRlcmVycyB0aGF0IGRlbGVnYXRlIHRvIG90aGVyIHJlbmRlcmVycy5cbiAgICovXG4gIGRhdGE6IHtba2luZDogc3RyaW5nXTogYW55fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBhIGN1c3RvbSByZW5kZXJlciB0aGF0IGltcGxlbWVudHMgdGhlIGBSZW5kZXJlcjJgIGJhc2UgY2xhc3MuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBhIGN1c3RvbSByZW5kZXJlciBmb3IgYSBob3N0IERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0gaG9zdEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gcmVuZGVyLlxuICAgKiBAcGFyYW0gdHlwZSBUaGUgYmFzZSBjbGFzcyB0byBpbXBsZW1lbnQuXG4gICAqIEByZXR1cm5zIFRoZSBuZXcgY3VzdG9tIHJlbmRlcmVyIGluc3RhbmNlLlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyO1xuICAvKipcbiAgICogQSBjYWxsYmFjayBpbnZva2VkIHdoZW4gcmVuZGVyaW5nIGhhcyBiZWd1bi5cbiAgICovXG4gIGFic3RyYWN0IGJlZ2luPygpOiB2b2lkO1xuICAvKipcbiAgICogQSBjYWxsYmFjayBpbnZva2VkIHdoZW4gcmVuZGVyaW5nIGhhcyBjb21wbGV0ZWQuXG4gICAqL1xuICBhYnN0cmFjdCBlbmQ/KCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBVc2Ugd2l0aCBhbmltYXRpb25zIHRlc3Qtb25seSBtb2RlLiBOb3RpZmllcyB0aGUgdGVzdCB3aGVuIHJlbmRlcmluZyBoYXMgY29tcGxldGVkLlxuICAgKiBAcmV0dXJucyBUaGUgYXN5bmNocm9ub3VzIHJlc3VsdCBvZiB0aGUgZGV2ZWxvcGVyLWRlZmluZWQgZnVuY3Rpb24uXG4gICAqL1xuICBhYnN0cmFjdCB3aGVuUmVuZGVyaW5nRG9uZT8oKTogUHJvbWlzZTxhbnk+O1xufVxuXG4vKipcbiAqIEZsYWdzIGZvciByZW5kZXJlci1zcGVjaWZpYyBzdHlsZSBtb2RpZmllcnMuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIFJlbmRlcmVyU3R5bGVGbGFnczIge1xuICAvKipcbiAgICogTWFya3MgYSBzdHlsZSBhcyBpbXBvcnRhbnQuXG4gICAqL1xuICBJbXBvcnRhbnQgPSAxIDw8IDAsXG4gIC8qKlxuICAgKiBNYXJrcyBhIHN0eWxlIGFzIHVzaW5nIGRhc2ggY2FzZSBuYW1pbmcgKHRoaXMtaXMtZGFzaC1jYXNlKS5cbiAgICovXG4gIERhc2hDYXNlID0gMSA8PCAxXG59XG5cbi8qKlxuICogRXh0ZW5kIHRoaXMgYmFzZSBjbGFzcyB0byBpbXBsZW1lbnQgY3VzdG9tIHJlbmRlcmluZy4gQnkgZGVmYXVsdCwgQW5ndWxhclxuICogcmVuZGVycyBhIHRlbXBsYXRlIGludG8gRE9NLiBZb3UgY2FuIHVzZSBjdXN0b20gcmVuZGVyaW5nIHRvIGludGVyY2VwdFxuICogcmVuZGVyaW5nIGNhbGxzLCBvciB0byByZW5kZXIgdG8gc29tZXRoaW5nIG90aGVyIHRoYW4gRE9NLlxuICpcbiAqIENyZWF0ZSB5b3VyIGN1c3RvbSByZW5kZXJlciB1c2luZyBgUmVuZGVyZXJGYWN0b3J5MmAuXG4gKlxuICogVXNlIGEgY3VzdG9tIHJlbmRlcmVyIHRvIGJ5cGFzcyBBbmd1bGFyJ3MgdGVtcGxhdGluZyBhbmRcbiAqIG1ha2UgY3VzdG9tIFVJIGNoYW5nZXMgdGhhdCBjYW4ndCBiZSBleHByZXNzZWQgZGVjbGFyYXRpdmVseS5cbiAqIEZvciBleGFtcGxlIGlmIHlvdSBuZWVkIHRvIHNldCBhIHByb3BlcnR5IG9yIGFuIGF0dHJpYnV0ZSB3aG9zZSBuYW1lIGlzXG4gKiBub3Qgc3RhdGljYWxseSBrbm93biwgdXNlIHRoZSBgc2V0UHJvcGVydHkoKWAgb3JcbiAqIGBzZXRBdHRyaWJ1dGUoKWAgbWV0aG9kLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyMiB7XG4gIC8qKlxuICAgKiBVc2UgdG8gc3RvcmUgYXJiaXRyYXJ5IGRldmVsb3Blci1kZWZpbmVkIGRhdGEgb24gYSByZW5kZXJlciBpbnN0YW5jZSxcbiAgICogYXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcga2V5LXZhbHVlIHBhaXJzLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgcmVuZGVyZXJzIHRoYXQgZGVsZWdhdGUgdG8gb3RoZXIgcmVuZGVyZXJzLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0IGRhdGEoKToge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIGRlc3Ryb3kgdGhlIHJlbmRlcmVyIG9yIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogQHBhcmFtIG5hbWUgQW4gaWRlbnRpZnlpbmcgbmFtZSBmb3IgdGhlIG5ldyBlbGVtZW50LCB1bmlxdWUgd2l0aGluIHRoZSBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBmb3IgdGhlIG5ldyBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBUaGUgbmV3IGVsZW1lbnQuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGwpOiBhbnk7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBhZGQgYSBjb21tZW50IHRvIHRoZSBET00gb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBjb21tZW50IHRleHQuXG4gICAqIEByZXR1cm5zIFRoZSBtb2RpZmllZCBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBhZGQgdGV4dCB0byB0aGUgRE9NIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdGV4dCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIFRoZSBtb2RpZmllZCBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55O1xuICAvKipcbiAgICogSWYgbnVsbCBvciB1bmRlZmluZWQsIHRoZSB2aWV3IGVuZ2luZSB3b24ndCBjYWxsIGl0LlxuICAgKiBUaGlzIGlzIHVzZWQgYXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gZm9yIHByb2R1Y3Rpb24gbW9kZS5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBkZXN0cm95Tm9kZSAhOiAoKG5vZGU6IGFueSkgPT4gdm9pZCkgfCBudWxsO1xuICAvKipcbiAgICogQXBwZW5kcyBhIGNoaWxkIHRvIGEgZ2l2ZW4gcGFyZW50IG5vZGUgaW4gdGhlIGhvc3QgZWxlbWVudCBET00uXG4gICAqIEBwYXJhbSBwYXJlbnQgVGhlIHBhcmVudCBub2RlLlxuICAgKiBAcGFyYW0gbmV3Q2hpbGQgVGhlIG5ldyBjaGlsZCBub2RlLlxuICAgKi9cbiAgYWJzdHJhY3QgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkO1xuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gaW5zZXJ0IGEgY2hpbGQgbm9kZSBhdCBhIGdpdmVuIHBvc2l0aW9uIGluIGEgcGFyZW50IG5vZGVcbiAgICogaW4gdGhlIGhvc3QgZWxlbWVudCBET00uXG4gICAqIEBwYXJhbSBwYXJlbnQgVGhlIHBhcmVudCBub2RlLlxuICAgKiBAcGFyYW0gbmV3Q2hpbGQgVGhlIG5ldyBjaGlsZCBub2Rlcy5cbiAgICogQHBhcmFtIHJlZkNoaWxkIFRoZSBleGlzdGluZyBjaGlsZCBub2RlIHRoYXQgc2hvdWxkIHByZWNlZGUgdGhlIG5ldyBub2RlLlxuICAgKi9cbiAgYWJzdHJhY3QgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZDtcbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHJlbW92ZSBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgaG9zdCBlbGVtZW50J3MgRE9NLlxuICAgKiBAcGFyYW0gcGFyZW50IFRoZSBwYXJlbnQgbm9kZS5cbiAgICogQHBhcmFtIG9sZENoaWxkIFRoZSBjaGlsZCBub2RlIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIGlzSG9zdEVsZW1lbnQgT3B0aW9uYWxseSBzaWduYWwgdG8gdGhlIHJlbmRlcmVyIHdoZXRoZXIgdGhpcyBlbGVtZW50IGlzIGEgaG9zdCBlbGVtZW50XG4gICAqIG9yIG5vdFxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHByZXBhcmUgYW4gZWxlbWVudCB0byBiZSBib290c3RyYXBwZWRcbiAgICogYXMgYSByb290IGVsZW1lbnQsIGFuZCByZXR1cm4gdGhlIGVsZW1lbnQgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSBzZWxlY3Rvck9yTm9kZSBUaGUgRE9NIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBwcmVzZXJ2ZUNvbnRlbnQgV2hldGhlciB0aGUgY29udGVudHMgb2YgdGhlIHJvb3QgZWxlbWVudFxuICAgKiBzaG91bGQgYmUgcHJlc2VydmVkLCBvciBjbGVhcmVkIHVwb24gYm9vdHN0cmFwIChkZWZhdWx0IGJlaGF2aW9yKS5cbiAgICogVXNlIHdpdGggYFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbWAgdG8gYWxsb3cgc2ltcGxlIG5hdGl2ZVxuICAgKiBjb250ZW50IHByb2plY3Rpb24gdmlhIGA8c2xvdD5gIGVsZW1lbnRzLlxuICAgKiBAcmV0dXJucyBUaGUgcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pOiBhbnk7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBnZXQgdGhlIHBhcmVudCBvZiBhIGdpdmVuIG5vZGVcbiAgICogaW4gdGhlIGhvc3QgZWxlbWVudCdzIERPTS5cbiAgICogQHBhcmFtIG5vZGUgVGhlIGNoaWxkIG5vZGUgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIFRoZSBwYXJlbnQgbm9kZSwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBwYXJlbnQuXG4gICAqIEZvciBXZWJXb3JrZXJzLCBhbHdheXMgcmV0dXJucyB0cnVlLlxuICAgKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNoZWNrIGlzIHN5bmNocm9ub3VzLFxuICAgKiBhbmQgdGhlIGNhbGxlciBjYW4ndCByZWx5IG9uIGNoZWNraW5nIGZvciBudWxsLlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnk7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBnZXQgdGhlIG5leHQgc2libGluZyBub2RlIG9mIGEgZ2l2ZW4gbm9kZVxuICAgKiBpbiB0aGUgaG9zdCBlbGVtZW50J3MgRE9NLlxuICAgKiBAcmV0dXJucyBUaGUgc2libGluZyBub2RlLCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHNpYmxpbmcuXG4gICAqIEZvciBXZWJXb3JrZXJzLCBhbHdheXMgcmV0dXJucyBhIHZhbHVlLlxuICAgKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNoZWNrIGlzIHN5bmNocm9ub3VzLFxuICAgKiBhbmQgdGhlIGNhbGxlciBjYW4ndCByZWx5IG9uIGNoZWNraW5nIGZvciBudWxsLlxuICAgKi9cbiAgYWJzdHJhY3QgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55O1xuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgYW4gZWxlbWVudCBpbiB0aGUgRE9NLlxuICAgKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZS5cbiAgICovXG4gIGFic3RyYWN0IHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gcmVtb3ZlIGFuIGF0dHJpYnV0ZSBmcm9tIGFuIGVsZW1lbnQgaW4gdGhlIERPTS5cbiAgICogQHBhcmFtIGVsIFRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgYXR0cmlidXRlIG5hbWUuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZS5cbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIGFkZCBhIGNsYXNzIHRvIGFuIGVsZW1lbnQgaW4gdGhlIERPTS5cbiAgICogQHBhcmFtIGVsIFRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAgICovXG4gIGFic3RyYWN0IGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHJlbW92ZSBhIGNsYXNzIGZyb20gYW4gZWxlbWVudCBpbiB0aGUgRE9NLlxuICAgKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBjbGFzcyBuYW1lLlxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IGEgQ1NTIHN0eWxlIGZvciBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1lIG9mIHRoZSBzdHlsZS5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUuXG4gICAqIEBwYXJhbSBmbGFncyBGbGFncyBmb3Igc3R5bGUgdmFyaWF0aW9ucy4gTm8gZmxhZ3MgYXJlIHNldCBieSBkZWZhdWx0LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gcmVtb3ZlIHRoZSB2YWx1ZSBmcm9tIGEgQ1NTIHN0eWxlIGZvciBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1lIG9mIHRoZSBzdHlsZS5cbiAgICogQHBhcmFtIGZsYWdzIEZsYWdzIGZvciBzdHlsZSB2YXJpYXRpb25zIHRvIHJlbW92ZSwgaWYgc2V0LiA/Pz9cbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHNldCB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBvZiBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIG5hbWUgVGhlIHByb3BlcnR5IG5hbWUuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IHRoZSB2YWx1ZSBvZiBhIG5vZGUgaW4gdGhlIGhvc3QgZWxlbWVudC5cbiAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc3RhcnQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIGNvbnRleHQgaW4gd2hpY2ggdG8gbGlzdGVuIGZvciBldmVudHMuIENhbiBiZVxuICAgKiB0aGUgZW50aXJlIHdpbmRvdyBvciBkb2N1bWVudCwgdGhlIGJvZHkgb2YgdGhlIGRvY3VtZW50LCBvciBhIHNwZWNpZmljXG4gICAqIERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgQSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEByZXR1cm5zIEFuIFwidW5saXN0ZW5cIiBmdW5jdGlvbiBmb3IgZGlzcG9zaW5nIG9mIHRoaXMgaGFuZGxlci5cbiAgICovXG4gIGFic3RyYWN0IGxpc3RlbihcbiAgICAgIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHN0YXRpYyBfX05HX0VMRU1FTlRfSURfXzogKCkgPT4gUmVuZGVyZXIyID0gKCkgPT4gU1dJVENIX1JFTkRFUkVSMl9GQUNUT1JZKCk7XG59XG5cblxuZXhwb3J0IGNvbnN0IFNXSVRDSF9SRU5ERVJFUjJfRkFDVE9SWV9fUE9TVF9SM19fID0gcmVuZGVyM0luamVjdFJlbmRlcmVyMjtcbmNvbnN0IFNXSVRDSF9SRU5ERVJFUjJfRkFDVE9SWV9fUFJFX1IzX18gPSBub29wO1xuY29uc3QgU1dJVENIX1JFTkRFUkVSMl9GQUNUT1JZOiB0eXBlb2YgcmVuZGVyM0luamVjdFJlbmRlcmVyMiA9IFNXSVRDSF9SRU5ERVJFUjJfRkFDVE9SWV9fUFJFX1IzX187XG4iXX0=