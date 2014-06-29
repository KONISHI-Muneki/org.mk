/**
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