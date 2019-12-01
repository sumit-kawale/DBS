/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { resolveForwardRef } from '../di/forward_ref';
import { Injector } from '../di/injector';
import { INJECTOR, setCurrentInjector } from '../di/injector_compatibility';
import { getInjectableDef } from '../di/interface/defs';
import { APP_ROOT } from '../di/scope';
import { NgModuleRef } from '../linker/ng_module_factory';
import { stringify } from '../util/stringify';
import { splitDepsDsl, tokenKey } from './util';
var UNDEFINED_VALUE = new Object();
var InjectorRefTokenKey = tokenKey(Injector);
var INJECTORRefTokenKey = tokenKey(INJECTOR);
var NgModuleRefTokenKey = tokenKey(NgModuleRef);
export function moduleProvideDef(flags, token, value, deps) {
    // Need to resolve forwardRefs as e.g. for `useValue` we
    // lowered the expression and then stopped evaluating it,
    // i.e. also didn't unwrap it.
    value = resolveForwardRef(value);
    var depDefs = splitDepsDsl(deps, stringify(token));
    return {
        // will bet set by the module definition
        index: -1,
        deps: depDefs, flags: flags, token: token, value: value
    };
}
export function moduleDef(providers) {
    var providersByKey = {};
    var modules = [];
    var isRoot = false;
    for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        if (provider.token === APP_ROOT && provider.value === true) {
            isRoot = true;
        }
        if (provider.flags & 1073741824 /* TypeNgModule */) {
            modules.push(provider.token);
        }
        provider.index = i;
        providersByKey[tokenKey(provider.token)] = provider;
    }
    return {
        // Will be filled later...
        factory: null,
        providersByKey: providersByKey,
        providers: providers,
        modules: modules,
        isRoot: isRoot,
    };
}
export function initNgModule(data) {
    var def = data._def;
    var providers = data._providers = new Array(def.providers.length);
    for (var i = 0; i < def.providers.length; i++) {
        var provDef = def.providers[i];
        if (!(provDef.flags & 4096 /* LazyProvider */)) {
            // Make sure the provider has not been already initialized outside this loop.
            if (providers[i] === undefined) {
                providers[i] = _createProviderInstance(data, provDef);
            }
        }
    }
}
export function resolveNgModuleDep(data, depDef, notFoundValue) {
    if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
    var former = setCurrentInjector(data);
    try {
        if (depDef.flags & 8 /* Value */) {
            return depDef.token;
        }
        if (depDef.flags & 2 /* Optional */) {
            notFoundValue = null;
        }
        if (depDef.flags & 1 /* SkipSelf */) {
            return data._parent.get(depDef.token, notFoundValue);
        }
        var tokenKey_1 = depDef.tokenKey;
        switch (tokenKey_1) {
            case InjectorRefTokenKey:
            case INJECTORRefTokenKey:
            case NgModuleRefTokenKey:
                return data;
        }
        var providerDef = data._def.providersByKey[tokenKey_1];
        var injectableDef = void 0;
        if (providerDef) {
            var providerInstance = data._providers[providerDef.index];
            if (providerInstance === undefined) {
                providerInstance = data._providers[providerDef.index] =
                    _createProviderInstance(data, providerDef);
            }
            return providerInstance === UNDEFINED_VALUE ? undefined : providerInstance;
        }
        else if ((injectableDef = getInjectableDef(depDef.token)) && targetsModule(data, injectableDef)) {
            var index = data._providers.length;
            data._def.providers[index] = data._def.providersByKey[depDef.tokenKey] = {
                flags: 1024 /* TypeFactoryProvider */ | 4096 /* LazyProvider */,
                value: injectableDef.factory,
                deps: [], index: index,
                token: depDef.token,
            };
            data._providers[index] = UNDEFINED_VALUE;
            return (data._providers[index] =
                _createProviderInstance(data, data._def.providersByKey[depDef.tokenKey]));
        }
        else if (depDef.flags & 4 /* Self */) {
            return notFoundValue;
        }
        return data._parent.get(depDef.token, notFoundValue);
    }
    finally {
        setCurrentInjector(former);
    }
}
function moduleTransitivelyPresent(ngModule, scope) {
    return ngModule._def.modules.indexOf(scope) > -1;
}
function targetsModule(ngModule, def) {
    return def.providedIn != null && (moduleTransitivelyPresent(ngModule, def.providedIn) ||
        def.providedIn === 'root' && ngModule._def.isRoot);
}
function _createProviderInstance(ngModule, providerDef) {
    var injectable;
    switch (providerDef.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            injectable = _createClass(ngModule, providerDef.value, providerDef.deps);
            break;
        case 1024 /* TypeFactoryProvider */:
            injectable = _callFactory(ngModule, providerDef.value, providerDef.deps);
            break;
        case 2048 /* TypeUseExistingProvider */:
            injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
            break;
        case 256 /* TypeValueProvider */:
            injectable = providerDef.value;
            break;
    }
    // The read of `ngOnDestroy` here is slightly expensive as it's megamorphic, so it should be
    // avoided if possible. The sequence of checks here determines whether ngOnDestroy needs to be
    // checked. It might not if the `injectable` isn't an object or if NodeFlags.OnDestroy is already
    // set (ngOnDestroy was detected statically).
    if (injectable !== UNDEFINED_VALUE && injectable !== null && typeof injectable === 'object' &&
        !(providerDef.flags & 131072 /* OnDestroy */) && typeof injectable.ngOnDestroy === 'function') {
        providerDef.flags |= 131072 /* OnDestroy */;
    }
    return injectable === undefined ? UNDEFINED_VALUE : injectable;
}
function _createClass(ngModule, ctor, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            var depValues = new Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return new (ctor.bind.apply(ctor, tslib_1.__spread([void 0], depValues)))();
    }
}
function _callFactory(ngModule, factory, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            var depValues = Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return factory.apply(void 0, tslib_1.__spread(depValues));
    }
}
export function callNgModuleLifecycle(ngModule, lifecycles) {
    var def = ngModule._def;
    var destroyed = new Set();
    for (var i = 0; i < def.providers.length; i++) {
        var provDef = def.providers[i];
        if (provDef.flags & 131072 /* OnDestroy */) {
            var instance = ngModule._providers[i];
            if (instance && instance !== UNDEFINED_VALUE) {
                var onDestroy = instance.ngOnDestroy;
                if (typeof onDestroy === 'function' && !destroyed.has(instance)) {
                    onDestroy.apply(instance);
                    destroyed.add(instance);
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdmlldy9uZ19tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFDLGdCQUFnQixFQUFrQixNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUc1QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUU5QyxJQUFNLGVBQWUsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBRXJDLElBQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLElBQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLElBQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWxELE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsS0FBZ0IsRUFBRSxLQUFVLEVBQUUsS0FBVSxFQUN4QyxJQUErQjtJQUNqQyx3REFBd0Q7SUFDeEQseURBQXlEO0lBQ3pELDhCQUE4QjtJQUM5QixLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFD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Q0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLFFBQVEsSUFBSSxRQUFRLEtBQUssZUFBZSxFQUFFO2dCQUM1QyxJQUFNLFNBQVMsR0FBdUIsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDM0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUMvRCxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxQixTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7cmVzb2x2ZUZvcndhcmRSZWZ9IGZyb20gJy4uL2RpL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7SU5KRUNUT1IsIHNldEN1cnJlbnRJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge2dldEluamVjdGFibGVEZWYsIMm1ybVJbmplY3RhYmxlRGVmfSBmcm9tICcuLi9kaS9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge0FQUF9ST09UfSBmcm9tICcuLi9kaS9zY29wZSc7XG5pbXBvcnQge05nTW9kdWxlUmVmfSBmcm9tICcuLi9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcblxuaW1wb3J0IHtEZXBEZWYsIERlcEZsYWdzLCBOZ01vZHVsZURhdGEsIE5nTW9kdWxlRGVmaW5pdGlvbiwgTmdNb2R1bGVQcm92aWRlckRlZiwgTm9kZUZsYWdzfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7c3BsaXREZXBzRHNsLCB0b2tlbktleX0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgVU5ERUZJTkVEX1ZBTFVFID0gbmV3IE9iamVjdCgpO1xuXG5jb25zdCBJbmplY3RvclJlZlRva2VuS2V5ID0gdG9rZW5LZXkoSW5qZWN0b3IpO1xuY29uc3QgSU5KRUNUT1JSZWZUb2tlbktleSA9IHRva2VuS2V5KElOSkVDVE9SKTtcbmNvbnN0IE5nTW9kdWxlUmVmVG9rZW5LZXkgPSB0b2tlbktleShOZ01vZHVsZVJlZik7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVQcm92aWRlRGVmKFxuICAgIGZsYWdzOiBOb2RlRmxhZ3MsIHRva2VuOiBhbnksIHZhbHVlOiBhbnksXG4gICAgZGVwczogKFtEZXBGbGFncywgYW55XSB8IGFueSlbXSk6IE5nTW9kdWxlUHJvdmlkZXJEZWYge1xuICAvLyBOZWVkIHRvIHJlc29sdmUgZm9yd2FyZFJlZnMgYXMgZS5nLiBmb3IgYHVzZVZhbHVlYCB3ZVxuICAvLyBsb3dlcmVkIHRoZSBleHByZXNzaW9uIGFuZCB0aGVuIHN0b3BwZWQgZXZhbHVhdGluZyBpdCxcbiAgLy8gaS5lLiBhbHNvIGRpZG4ndCB1bndyYXAgaXQuXG4gIHZhbHVlID0gcmVzb2x2ZUZvcndhcmRSZWYodmFsdWUpO1xuICBjb25zdCBkZXBEZWZzID0gc3BsaXREZXBzRHNsKGRlcHMsIHN0cmluZ2lmeSh0b2tlbikpO1xuICByZXR1cm4ge1xuICAgIC8vIHdpbGwgYmV0IHNldCBieSB0aGUgbW9kdWxlIGRlZmluaXRpb25cbiAgICBpbmRleDogLTEsXG4gICAgZGVwczogZGVwRGVmcywgZmxhZ3MsIHRva2VuLCB2YWx1ZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxlRGVmKHByb3ZpZGVyczogTmdNb2R1bGVQcm92aWRlckRlZltdKTogTmdNb2R1bGVEZWZpbml0aW9uIHtcbiAgY29uc3QgcHJvdmlkZXJzQnlLZXk6IHtba2V5OiBzdHJpbmddOiBOZ01vZHVsZVByb3ZpZGVyRGVmfSA9IHt9O1xuICBjb25zdCBtb2R1bGVzID0gW107XG4gIGxldCBpc1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm92aWRlciA9IHByb3ZpZGVyc1tpXTtcbiAgICBpZiAocHJvdmlkZXIudG9rZW4gPT09IEFQUF9ST09UICYmIHByb3ZpZGVyLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpc1Jvb3QgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocHJvdmlkZXIuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZU5nTW9kdWxlKSB7XG4gICAgICBtb2R1bGVzLnB1c2gocHJvdmlkZXIudG9rZW4pO1xuICAgIH1cbiAgICBwcm92aWRlci5pbmRleCA9IGk7XG4gICAgcHJvdmlkZXJzQnlLZXlbdG9rZW5LZXkocHJvdmlkZXIudG9rZW4pXSA9IHByb3ZpZGVyO1xuICB9XG4gIHJldHVybiB7XG4gICAgLy8gV2lsbCBiZSBmaWxsZWQgbGF0ZXIuLi5cbiAgICBmYWN0b3J5OiBudWxsLFxuICAgIHByb3ZpZGVyc0J5S2V5LFxuICAgIHByb3ZpZGVycyxcbiAgICBtb2R1bGVzLFxuICAgIGlzUm9vdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXROZ01vZHVsZShkYXRhOiBOZ01vZHVsZURhdGEpIHtcbiAgY29uc3QgZGVmID0gZGF0YS5fZGVmO1xuICBjb25zdCBwcm92aWRlcnMgPSBkYXRhLl9wcm92aWRlcnMgPSBuZXcgQXJyYXkoZGVmLnByb3ZpZGVycy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZi5wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcm92RGVmID0gZGVmLnByb3ZpZGVyc1tpXTtcbiAgICBpZiAoIShwcm92RGVmLmZsYWdzICYgTm9kZUZsYWdzLkxhenlQcm92aWRlcikpIHtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcHJvdmlkZXIgaGFzIG5vdCBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWQgb3V0c2lkZSB0aGlzIGxvb3AuXG4gICAgICBpZiAocHJvdmlkZXJzW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvdmlkZXJzW2ldID0gX2NyZWF0ZVByb3ZpZGVySW5zdGFuY2UoZGF0YSwgcHJvdkRlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlTmdNb2R1bGVEZXAoXG4gICAgZGF0YTogTmdNb2R1bGVEYXRhLCBkZXBEZWY6IERlcERlZiwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKTogYW55IHtcbiAgY29uc3QgZm9ybWVyID0gc2V0Q3VycmVudEluamVjdG9yKGRhdGEpO1xuICB0cnkge1xuICAgIGlmIChkZXBEZWYuZmxhZ3MgJiBEZXBGbGFncy5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGRlcERlZi50b2tlbjtcbiAgICB9XG4gICAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLk9wdGlvbmFsKSB7XG4gICAgICBub3RGb3VuZFZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLlNraXBTZWxmKSB7XG4gICAgICByZXR1cm4gZGF0YS5fcGFyZW50LmdldChkZXBEZWYudG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbktleSA9IGRlcERlZi50b2tlbktleTtcbiAgICBzd2l0Y2ggKHRva2VuS2V5KSB7XG4gICAgICBjYXNlIEluamVjdG9yUmVmVG9rZW5LZXk6XG4gICAgICBjYXNlIElOSkVDVE9SUmVmVG9rZW5LZXk6XG4gICAgICBjYXNlIE5nTW9kdWxlUmVmVG9rZW5LZXk6XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBjb25zdCBwcm92aWRlckRlZiA9IGRhdGEuX2RlZi5wcm92aWRlcnNCeUtleVt0b2tlbktleV07XG4gICAgbGV0IGluamVjdGFibGVEZWY6IMm1ybVJbmplY3RhYmxlRGVmPGFueT58bnVsbDtcbiAgICBpZiAocHJvdmlkZXJEZWYpIHtcbiAgICAgIGxldCBwcm92aWRlckluc3RhbmNlID0gZGF0YS5fcHJvdmlkZXJzW3Byb3ZpZGVyRGVmLmluZGV4XTtcbiAgICAgIGlmIChwcm92aWRlckluc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvdmlkZXJJbnN0YW5jZSA9IGRhdGEuX3Byb3ZpZGVyc1twcm92aWRlckRlZi5pbmRleF0gPVxuICAgICAgICAgICAgX2NyZWF0ZVByb3ZpZGVySW5zdGFuY2UoZGF0YSwgcHJvdmlkZXJEZWYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb3ZpZGVySW5zdGFuY2UgPT09IFVOREVGSU5FRF9WQUxVRSA/IHVuZGVmaW5lZCA6IHByb3ZpZGVySW5zdGFuY2U7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgKGluamVjdGFibGVEZWYgPSBnZXRJbmplY3RhYmxlRGVmKGRlcERlZi50b2tlbikpICYmIHRhcmdldHNNb2R1bGUoZGF0YSwgaW5qZWN0YWJsZURlZikpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gZGF0YS5fcHJvdmlkZXJzLmxlbmd0aDtcbiAgICAgIGRhdGEuX2RlZi5wcm92aWRlcnNbaW5kZXhdID0gZGF0YS5fZGVmLnByb3ZpZGVyc0J5S2V5W2RlcERlZi50b2tlbktleV0gPSB7XG4gICAgICAgIGZsYWdzOiBOb2RlRmxhZ3MuVHlwZUZhY3RvcnlQcm92aWRlciB8IE5vZGVGbGFncy5MYXp5UHJvdmlkZXIsXG4gICAgICAgIHZhbHVlOiBpbmplY3RhYmxlRGVmLmZhY3RvcnksXG4gICAgICAgIGRlcHM6IFtdLCBpbmRleCxcbiAgICAgICAgdG9rZW46IGRlcERlZi50b2tlbixcbiAgICAgIH07XG4gICAgICBkYXRhLl9wcm92aWRlcnNbaW5kZXhdID0gVU5ERUZJTkVEX1ZBTFVFO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICBkYXRhLl9wcm92aWRlcnNbaW5kZXhdID1cbiAgICAgICAgICAgICAgX2NyZWF0ZVByb3ZpZGVySW5zdGFuY2UoZGF0YSwgZGF0YS5fZGVmLnByb3ZpZGVyc0J5S2V5W2RlcERlZi50b2tlbktleV0pKTtcbiAgICB9IGVsc2UgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLlNlbGYpIHtcbiAgICAgIHJldHVybiBub3RGb3VuZFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YS5fcGFyZW50LmdldChkZXBEZWYudG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICB9IGZpbmFsbHkge1xuICAgIHNldEN1cnJlbnRJbmplY3Rvcihmb3JtZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vZHVsZVRyYW5zaXRpdmVseVByZXNlbnQobmdNb2R1bGU6IE5nTW9kdWxlRGF0YSwgc2NvcGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbmdNb2R1bGUuX2RlZi5tb2R1bGVzLmluZGV4T2Yoc2NvcGUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIHRhcmdldHNNb2R1bGUobmdNb2R1bGU6IE5nTW9kdWxlRGF0YSwgZGVmOiDJtcm1SW5qZWN0YWJsZURlZjxhbnk+KTogYm9vbGVhbiB7XG4gIHJldHVybiBkZWYucHJvdmlkZWRJbiAhPSBudWxsICYmIChtb2R1bGVUcmFuc2l0aXZlbHlQcmVzZW50KG5nTW9kdWxlLCBkZWYucHJvdmlkZWRJbikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5wcm92aWRlZEluID09PSAncm9vdCcgJiYgbmdNb2R1bGUuX2RlZi5pc1Jvb3QpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlUHJvdmlkZXJJbnN0YW5jZShuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBwcm92aWRlckRlZjogTmdNb2R1bGVQcm92aWRlckRlZik6IGFueSB7XG4gIGxldCBpbmplY3RhYmxlOiBhbnk7XG4gIHN3aXRjaCAocHJvdmlkZXJEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZXMpIHtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlQ2xhc3NQcm92aWRlcjpcbiAgICAgIGluamVjdGFibGUgPSBfY3JlYXRlQ2xhc3MobmdNb2R1bGUsIHByb3ZpZGVyRGVmLnZhbHVlLCBwcm92aWRlckRlZi5kZXBzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVGYWN0b3J5UHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gX2NhbGxGYWN0b3J5KG5nTW9kdWxlLCBwcm92aWRlckRlZi52YWx1ZSwgcHJvdmlkZXJEZWYuZGVwcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlVXNlRXhpc3RpbmdQcm92aWRlcjpcbiAgICAgIGluamVjdGFibGUgPSByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIHByb3ZpZGVyRGVmLmRlcHNbMF0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVZhbHVlUHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gcHJvdmlkZXJEZWYudmFsdWU7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIFRoZSByZWFkIG9mIGBuZ09uRGVzdHJveWAgaGVyZSBpcyBzbGlnaHRseSBleHBlbnNpdmUgYXMgaXQncyBtZWdhbW9ycGhpYywgc28gaXQgc2hvdWxkIGJlXG4gIC8vIGF2b2lkZWQgaWYgcG9zc2libGUuIFRoZSBzZXF1ZW5jZSBvZiBjaGVja3MgaGVyZSBkZXRlcm1pbmVzIHdoZXRoZXIgbmdPbkRlc3Ryb3kgbmVlZHMgdG8gYmVcbiAgLy8gY2hlY2tlZC4gSXQgbWlnaHQgbm90IGlmIHRoZSBgaW5qZWN0YWJsZWAgaXNuJ3QgYW4gb2JqZWN0IG9yIGlmIE5vZGVGbGFncy5PbkRlc3Ryb3kgaXMgYWxyZWFkeVxuICAvLyBzZXQgKG5nT25EZXN0cm95IHdhcyBkZXRlY3RlZCBzdGF0aWNhbGx5KS5cbiAgaWYgKGluamVjdGFibGUgIT09IFVOREVGSU5FRF9WQUxVRSAmJiBpbmplY3RhYmxlICE9PSBudWxsICYmIHR5cGVvZiBpbmplY3RhYmxlID09PSAnb2JqZWN0JyAmJlxuICAgICAgIShwcm92aWRlckRlZi5mbGFncyAmIE5vZGVGbGFncy5PbkRlc3Ryb3kpICYmIHR5cGVvZiBpbmplY3RhYmxlLm5nT25EZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvdmlkZXJEZWYuZmxhZ3MgfD0gTm9kZUZsYWdzLk9uRGVzdHJveTtcbiAgfVxuICByZXR1cm4gaW5qZWN0YWJsZSA9PT0gdW5kZWZpbmVkID8gVU5ERUZJTkVEX1ZBTFVFIDogaW5qZWN0YWJsZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGN0b3I6IGFueSwgZGVwczogRGVwRGVmW10pOiBhbnkge1xuICBjb25zdCBsZW4gPSBkZXBzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gbmV3IGN0b3IoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gbmV3IGN0b3IocmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzBdKSk7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIG5ldyBjdG9yKHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSksIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1sxXSkpO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBuZXcgY3RvcihcbiAgICAgICAgICByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pLFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1syXSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBkZXBWYWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZGVwVmFsdWVzW2ldID0gcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgY3RvciguLi5kZXBWYWx1ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jYWxsRmFjdG9yeShuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBmYWN0b3J5OiBhbnksIGRlcHM6IERlcERlZltdKTogYW55IHtcbiAgY29uc3QgbGVuID0gZGVwcy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZmFjdG9yeShyZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZmFjdG9yeShyZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pKTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZmFjdG9yeShcbiAgICAgICAgICByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pLFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1syXSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBkZXBWYWx1ZXMgPSBBcnJheShsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZXBWYWx1ZXNbaV0gPSByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhY3RvcnkoLi4uZGVwVmFsdWVzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsbE5nTW9kdWxlTGlmZWN5Y2xlKG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGxpZmVjeWNsZXM6IE5vZGVGbGFncykge1xuICBjb25zdCBkZWYgPSBuZ01vZHVsZS5fZGVmO1xuICBjb25zdCBkZXN0cm95ZWQgPSBuZXcgU2V0PGFueT4oKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYucHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdkRlZiA9IGRlZi5wcm92aWRlcnNbaV07XG4gICAgaWYgKHByb3ZEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuT25EZXN0cm95KSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5nTW9kdWxlLl9wcm92aWRlcnNbaV07XG4gICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UgIT09IFVOREVGSU5FRF9WQUxVRSkge1xuICAgICAgICBjb25zdCBvbkRlc3Ryb3k6IEZ1bmN0aW9ufHVuZGVmaW5lZCA9IGluc3RhbmNlLm5nT25EZXN0cm95O1xuICAgICAgICBpZiAodHlwZW9mIG9uRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJyAmJiAhZGVzdHJveWVkLmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgICBvbkRlc3Ryb3kuYXBwbHkoaW5zdGFuY2UpO1xuICAgICAgICAgIGRlc3Ryb3llZC5hZGQoaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=