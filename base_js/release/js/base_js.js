/**
 * Created by konishi_muneki on 2014/06/28.
 */

"use strict";

/**
 * グローバルスコープ.
 * @global
 */
var global = new Function("return this")();

/**
 * ベースネームスペース.
 * @type {object}
 * @global
 */
var org = org || {};

/**
 * org.mkパッケージ定義スコープ.
 */
(function (ns) {
    /**
     * org.mkネームスペース.
     * @type {object}
     * @public
     */
    ns.mk = ns.mk || {};
})(org);/**
 * Created by konishi_muneki on 2014/06/29.
 */

/**
 * org.mk.StaticCommon定義スコープ.
 */
(function (ns) {
    /**
     * org.mkパッケージ共通オブジェクトネームスペース.
     * @type {object}
     * @public
     */
    ns.StaticCommon = ns.StaticCommon || {};
})(org.mk);

/**
 * org.mk.StaticCommons.StringUtils定義スコープ.
 */
(function (ns) {
    /**
     * org.mk.StaticCommons.StringUtilsネームスペース..
     * @type {object}
     * @public
     */
    ns.StringUtils = ns.StringUtils || {};
})(org.mk.StaticCommon);

/**
 * org.mk.StaticCommons.FunctionUtils定義スコープ.
 */
(function (ns) {
    /**
     * org.mk.StaticCommons.FunctionUtilsネームスペース..
     * @type {object}
     * @public
     */
    ns.FunctionUtils = ns.FunctionUtils || {};
})(org.mk.StaticCommon);

/**
 * org.mk.StaticCommons.StringUtils内関数定義スコープ.
 */
(function (ns) {

    /**
     * startsWith()
     * @param {string} str - 対象文字列.
     * @param {string} start - 開始文字列.
     * @return {boolean} - 対象文字列が開始文字列で始まっていた場合はtrue.
     */
    function startsWith(str, start) {
        if ('string' !== typeof (str) || 'string' !== typeof (start)) {
            throw new Error('IllegalArguments.');
        }
        return str.substring(0, start.length) === start;
    }

    ns.startsWith = ns.startsWith || startsWith;

    /**
     * 文字列ハッシュコード.
     * @param {string} arg - 文字列.
     * @returns {number} ハッシュ値.
     * @private
     */
    function stringHashCode(arg) {
        if (!arg) {
            return 0;
        }
        // 強制的に文字列化.
        var str = '' + arg;
        var hash = 0;
        for (var i = 0, size = str.length; i < size; i++) {
            hash = hash * 31 + str.charCodeAt(i);
            hash = hash | 0;
        }
        return hash;
    }

    ns.stringHashCode = ns.stringHashCode || stringHashCode;

})(org.mk.StaticCommon.StringUtils);

/**
 * org.mk.StaticCommons.FunctionUtils内関数定義スコープ.
 */
(function (ns) {

    /**
     * 関数オブジェクトから関数名を取得する.
     * @param f {Function} - 対象関数.
     * @return {string} - 関数名.
     */
    function getFunctionName(f) {
        return 'name' in f
            ? f.name
            : ('' + f).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    }

    ns.getFunctionName = ns.getFunctionName || getFunctionName;

})(org.mk.StaticCommon.FunctionUtils);/**
 * Created by konishi_muneki on 2014/06/29.
 */

/**
 * org.mk.ClassContainer定義スコープ.
 */
(function (ns) {
    /**
     * org.mkクラスコンテナオブジェクト.
     * @type {object}
     * @public
     */
    ns.ClassContainer = ns.ClassContainer || {};
})(org.mk);

/**
 * org.mk.ClassContainer.pack()/pick()定義スコープ.
 */
(function (ns, gl) {
    // include FunctionUtils.
    var FunctionUtils = org.mk.StaticCommon.FunctionUtils;

    /**
     * 登録済みクラスマップ.
     * @type {object}
     * @private
     */
    var registry = {};

    /**
     * コンテナクラスマップに登録する.
     * @param {string} fullName - フルパス名.
     * @param {object|Function} target - instance/class.
     * @private
     */
    function register(fullName, target) {
        if (registry.hasOwnProperty(fullName)) {
            throw new Error('IllegalArguments');
        }
        registry[fullName] = target;
    }

    /**
     *
     * @param {string} fullName
     * @return {object|Function}
     * @public
     */
    function pick(fullName) {
        return registry[fullName];
    }

    ns.pick = ns.pick || pick;

    /**
     * ネームスペースパッキング関数.
     * @param {string} nsstr - ネームスペース文字列.
     * @param {Function} func - コンストラクタ関数.
     * @public
     */
    function pack(nsstr, func) {
        // 型バリデート.
        if ('string' !== typeof  nsstr
            || !func instanceof Function) {
            throw new Error('IllegalArguments');
        }

        // グローバルスコープを起点.
        var targetSpace = gl;

        // 子ネームスペースを生成.
        var nsstrs = nsstr.split('.');
        for (var i = 0, size = nsstrs.length; i < size; i++) {
            var child = nsstrs[i];
            // すでに存在している場合は生成しない.
            targetSpace[child] = targetSpace[child] || {};
            targetSpace = targetSpace[child];
        }

        // 生成したネームスペースに引数のコンストラクタ関数を追加する.
        var funcName = FunctionUtils.getFunctionName(func);
        if (targetSpace.hasOwnProperty(funcName)) {
            // すでに存在している場合はエラー.
            throw new Error('IllegalArguments.');
        }
        targetSpace[funcName] = func;

        var fullName = nsstr + '.' + funcName;
        register(fullName, func);
    }

    ns.pack = ns.pack || pack;

})(org.mk.ClassContainer, global);