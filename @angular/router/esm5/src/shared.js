/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The primary routing outlet.
 *
 * @publicApi
 */
export var PRIMARY_OUTLET = 'primary';
var ParamsAsMap = /** @class */ (function () {
    function ParamsAsMap(params) {
        this.params = params || {};
    }
    ParamsAsMap.prototype.has = function (name) { return this.params.hasOwnProperty(name); };
    ParamsAsMap.prototype.get = function (name) {
        if (this.has(name)) {
            var v = this.params[name];
            return Array.isArray(v) ? v[0] : v;
        }
        return null;
    };
    ParamsAsMap.prototype.getAll = function (name) {
        if (this.has(name)) {
            var v = this.params[name];
            return Array.isArray(v) ? v : [v];
        }
        return [];
    };
    Object.defineProperty(ParamsAsMap.prototype, "keys", {
        get: function () { return Object.keys(this.params); },
        enumerable: true,
        configurable: true
    });
    return ParamsAsMap;
}());
/**
 * Converts a `Params` instance to a `ParamMap`.
 * @param params The instance to convert.
 * @returns The new map instance.
 *
 * @publicApi
 */
export function convertToParamMap(params) {
    return new ParamsAsMap(params);
}
var NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
export function navigationCancelingError(message) {
    var error = Error('NavigationCancelingError: ' + message);
    error[NAVIGATION_CANCELING_ERROR] = true;
    return error;
}
export function isNavigationCancelingError(error) {
    return error && error[NAVIGATION_CANCELING_ERROR];
}
// Matches the route configuration (`route`) against the actual URL (`segments`).
export function defaultUrlMatcher(segments, segmentGroup, route) {
    var parts = route.path.split('/');
    if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
    }
    var posParams = {};
    // Check each config part against the actual URL
    for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        var segment = segments[index];
        var isParameter = part.startsWith(':');
        if (isParameter) {
            posParams[part.substring(1)] = segment;
        }
        else if (part !== segment.path) {
            // The actual URL part does not match the config, no match
            return null;
        }
    }
    return { consumed: segments.slice(0, parts.length), posParams: posParams };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBTUg7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFtRHhDO0lBR0UscUJBQVksTUFBYztRQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFFM0QseUJBQUcsR0FBSCxVQUFJLElBQVksSUFBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RSx5QkFBRyxHQUFILFVBQUksSUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sSUFBWTtRQUNqQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELHNCQUFJLDZCQUFJO2FBQVIsY0FBdUIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzNELGtCQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELElBQU0sMEJBQTBCLEdBQUcsNEJBQTRCLENBQUM7QUFFaEUsTUFBTSxVQUFVLHdCQUF3QixDQUFDLE9BQWU7SUFDdEQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQzNELEtBQWEsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsS0FBWTtJQUNyRCxPQUFPLEtBQUssSUFBSyxLQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQsaUZBQWlGO0FBQ2pGLE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsUUFBc0IsRUFBRSxZQUE2QixFQUFFLEtBQVk7SUFDckUsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDbEMsc0RBQXNEO1FBQ3RELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTTtRQUMxQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsRSw0RkFBNEY7UUFDNUYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQU0sU0FBUyxHQUFnQyxFQUFFLENBQUM7SUFFbEQsZ0RBQWdEO0lBQ2hELEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLFdBQVcsRUFBRTtZQUNmLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ3hDO2FBQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQywwREFBMEQ7WUFDMUQsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUMsQ0FBQztBQUNoRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JvdXRlLCBVcmxNYXRjaFJlc3VsdH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtVcmxTZWdtZW50LCBVcmxTZWdtZW50R3JvdXB9IGZyb20gJy4vdXJsX3RyZWUnO1xuXG5cbi8qKlxuICogVGhlIHByaW1hcnkgcm91dGluZyBvdXRsZXQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgUFJJTUFSWV9PVVRMRVQgPSAncHJpbWFyeSc7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIG1hdHJpeCBhbmQgcXVlcnkgVVJMIHBhcmFtZXRlcnMuXG4gKiBAc2VlIGBjb252ZXJ0VG9QYXJhbU1hcCgpYFxuICogQHNlZSBgUGFyYW1NYXBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IGFueVxufTtcblxuLyoqXG4gKiBBIG1hcCB0aGF0IHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgcmVxdWlyZWQgYW5kIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAqIHNwZWNpZmljIHRvIGEgcm91dGUuXG4gKiBUaGUgbWFwIHN1cHBvcnRzIHJldHJpZXZpbmcgYSBzaW5nbGUgdmFsdWUgd2l0aCBgZ2V0KClgXG4gKiBvciBtdWx0aXBsZSB2YWx1ZXMgd2l0aCBgZ2V0QWxsKClgLlxuICpcbiAqIEBzZWUgW1VSTFNlYXJjaFBhcmFtc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTFNlYXJjaFBhcmFtcylcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyYW1NYXAge1xuICAvKipcbiAgICogUmVwb3J0cyB3aGV0aGVyIHRoZSBtYXAgY29udGFpbnMgYSBnaXZlbiBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgbmFtZS5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbWFwIGNvbnRhaW5zIHRoZSBnaXZlbiBwYXJhbWV0ZXIsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGhhcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICAvKipcbiAgICogUmV0cmlldmVzIGEgc2luZ2xlIHZhbHVlIGZvciBhIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciBuYW1lLlxuICAgKiBAcmV0dXJuIFRoZSBwYXJhbWV0ZXIncyBzaW5nbGUgdmFsdWUsXG4gICAqIG9yIHRoZSBmaXJzdCB2YWx1ZSBpZiB0aGUgcGFyYW1ldGVyIGhhcyBtdWx0aXBsZSB2YWx1ZXMsXG4gICAqIG9yIGBudWxsYCB3aGVuIHRoZXJlIGlzIG5vIHN1Y2ggcGFyYW1ldGVyLlxuICAgKi9cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuICAvKipcbiAgICogUmV0cmlldmVzIG11bHRpcGxlIHZhbHVlcyBmb3IgYSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgbmFtZS5cbiAgICogQHJldHVybiBBbiBhcnJheSBjb250YWluaW5nIG9uZSBvciBtb3JlIHZhbHVlcyxcbiAgICogb3IgYW4gZW1wdHkgYXJyYXkgaWYgdGhlcmUgaXMgbm8gc3VjaCBwYXJhbWV0ZXIuXG4gICAqXG4gICAqL1xuICBnZXRBbGwobmFtZTogc3RyaW5nKTogc3RyaW5nW107XG5cbiAgLyoqIE5hbWVzIG9mIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSBtYXAuICovXG4gIHJlYWRvbmx5IGtleXM6IHN0cmluZ1tdO1xufVxuXG5jbGFzcyBQYXJhbXNBc01hcCBpbXBsZW1lbnRzIFBhcmFtTWFwIHtcbiAgcHJpdmF0ZSBwYXJhbXM6IFBhcmFtcztcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFBhcmFtcykgeyB0aGlzLnBhcmFtcyA9IHBhcmFtcyB8fCB7fTsgfVxuXG4gIGhhcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpOyB9XG5cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHYgPSB0aGlzLnBhcmFtc1tuYW1lXTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHYpID8gdlswXSA6IHY7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRBbGwobmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xuICAgICAgY29uc3QgdiA9IHRoaXMucGFyYW1zW25hbWVdO1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodikgPyB2IDogW3ZdO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBrZXlzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucGFyYW1zKTsgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYFBhcmFtc2AgaW5zdGFuY2UgdG8gYSBgUGFyYW1NYXBgLlxuICogQHBhcmFtIHBhcmFtcyBUaGUgaW5zdGFuY2UgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIFRoZSBuZXcgbWFwIGluc3RhbmNlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1BhcmFtTWFwKHBhcmFtczogUGFyYW1zKTogUGFyYW1NYXAge1xuICByZXR1cm4gbmV3IFBhcmFtc0FzTWFwKHBhcmFtcyk7XG59XG5cbmNvbnN0IE5BVklHQVRJT05fQ0FOQ0VMSU5HX0VSUk9SID0gJ25nTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpb25DYW5jZWxpbmdFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgY29uc3QgZXJyb3IgPSBFcnJvcignTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yOiAnICsgbWVzc2FnZSk7XG4gIChlcnJvciBhcyBhbnkpW05BVklHQVRJT05fQ0FOQ0VMSU5HX0VSUk9SXSA9IHRydWU7XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yKGVycm9yOiBFcnJvcikge1xuICByZXR1cm4gZXJyb3IgJiYgKGVycm9yIGFzIGFueSlbTkFWSUdBVElPTl9DQU5DRUxJTkdfRVJST1JdO1xufVxuXG4vLyBNYXRjaGVzIHRoZSByb3V0ZSBjb25maWd1cmF0aW9uIChgcm91dGVgKSBhZ2FpbnN0IHRoZSBhY3R1YWwgVVJMIChgc2VnbWVudHNgKS5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VXJsTWF0Y2hlcihcbiAgICBzZWdtZW50czogVXJsU2VnbWVudFtdLCBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgcm91dGU6IFJvdXRlKTogVXJsTWF0Y2hSZXN1bHR8bnVsbCB7XG4gIGNvbnN0IHBhcnRzID0gcm91dGUucGF0aCAhLnNwbGl0KCcvJyk7XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCA+IHNlZ21lbnRzLmxlbmd0aCkge1xuICAgIC8vIFRoZSBhY3R1YWwgVVJMIGlzIHNob3J0ZXIgdGhhbiB0aGUgY29uZmlnLCBubyBtYXRjaFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmXG4gICAgICAoc2VnbWVudEdyb3VwLmhhc0NoaWxkcmVuKCkgfHwgcGFydHMubGVuZ3RoIDwgc2VnbWVudHMubGVuZ3RoKSkge1xuICAgIC8vIFRoZSBjb25maWcgaXMgbG9uZ2VyIHRoYW4gdGhlIGFjdHVhbCBVUkwgYnV0IHdlIGFyZSBsb29raW5nIGZvciBhIGZ1bGwgbWF0Y2gsIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwb3NQYXJhbXM6IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuXG4gIC8vIENoZWNrIGVhY2ggY29uZmlnIHBhcnQgYWdhaW5zdCB0aGUgYWN0dWFsIFVSTFxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgcGFydCA9IHBhcnRzW2luZGV4XTtcbiAgICBjb25zdCBzZWdtZW50ID0gc2VnbWVudHNbaW5kZXhdO1xuICAgIGNvbnN0IGlzUGFyYW1ldGVyID0gcGFydC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgaWYgKGlzUGFyYW1ldGVyKSB7XG4gICAgICBwb3NQYXJhbXNbcGFydC5zdWJzdHJpbmcoMSldID0gc2VnbWVudDtcbiAgICB9IGVsc2UgaWYgKHBhcnQgIT09IHNlZ21lbnQucGF0aCkge1xuICAgICAgLy8gVGhlIGFjdHVhbCBVUkwgcGFydCBkb2VzIG5vdCBtYXRjaCB0aGUgY29uZmlnLCBubyBtYXRjaFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtjb25zdW1lZDogc2VnbWVudHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoKSwgcG9zUGFyYW1zfTtcbn1cbiJdfQ==