(function (window) {
    "use strict";

    //noinspection JSUnresolvedVariable
    var no_op = function () {
        // No Op!
    }, requireFn = (typeof require === "function") ? require : no_op;

    // cordova platform
    var channel = requireFn('cordova/channel'),
        exec = requireFn('cordova/exec'),
        cordova = requireFn('cordova');

    function OfficeABI() {
        this.ABI = {executeCommand: no_op};
        this.ABI_SRC = "unknown source";
    }

    /**
     * Enable DeepLinks Mode
     * @type {boolean}
     */
    OfficeABI.prototype.deepLinksEnabled = false;

    /**
     * detect office implementation base on platform
     */
    OfficeABI.prototype.infer = function () {
        //noinspection JSUnresolvedVariable
        var UNDEF_ABI = {executeCommand: no_op},
            // browser platform
            androidBrowser = navigator.userAgent.match(/Android/i),
            iosBrowser = navigator.userAgent.match(/iPhone|iPad|iPod/i),
            //noinspection JSUnresolvedVariable
            messageHandlersFeature = window.webkit ? window.webkit.messageHandlers : undefined,
            // documentflow platform
            documentflowSDK = window["DocumentFlow"],
            uexOffice = window["uexOffice"],
            // cordova platform
            cordovaPlatform = typeof cordova !== 'undefined';

        if (this.deepLinksEnabled) {
            this.ABI_SRC = "deep_link";
            // ABI implementation
            this.ABI = {
                executeCommand: function (message) {
                    var args = JSON.stringify(message);
                    args = encodeURIComponent(args);

                    var appUri='rhmo://open.oav.app?args=' + args;
                    //通过uri打开ntko app
                    if(typeof api!=='undefined')
                    {
                        api.openApp({
                            uri: appUri
                        }, function(ret, err){
                            if(ret){

                            }
                            if(err){
                                $.alert("在线编缉控件需独立授权，请联系综合科钟主任授权！");
                            }
                        });
                    }
                    //location.href = 'rhmo://open.oav.app?args=' + args;
                }
            };
            return;
        }

        if (cordovaPlatform) {
            this.ABI_SRC = "cordova_plugin";
            // ABI implementation
            this.ABI = {
                executeCommand: function (message) {
                    exec(null, null, "Office", "edit", [message]);
                }
            };
        } else {

            // documentflow OFFICE_IMPL
            if (typeof documentflowSDK !== "undefined" && typeof documentflowSDK['executeCommand'] === "function") {
                this.ABI_SRC = "documentflow";
                this.ABI = documentflowSDK;
                return;
            }

            // AppCan OFFICE_IMPL
            if (typeof uexOffice !== "undefined" && typeof uexOffice['edit'] === "function") {
                this.ABI_SRC = "uexOffice";
                this.ABI = {
                    executeCommand: function (message) {
                        uexOffice.edit(message);
                    }
                };
                return;
            }

            // ios web view plugin
            if (iosBrowser) {
                //noinspection JSUnresolvedVariable
                if (!messageHandlersFeature) {
                    console.log("浏览器不支持MessageHandlers");
                    this.ABI = UNDEF_ABI;
                }

                this.ABI_SRC = "ios_webview_plugin";
                this.ABI = {
                    executeCommand: function (message) {
                        //noinspection JSUnresolvedVariable
                        var executor = messageHandlersFeature.iOSOfficeSDK;
                        if (typeof executor['postMessage'] === "function") {
                            executor.postMessage(message);
                        }
                    }
                };
                return;
            }

            // android web view plugin
            if (androidBrowser) {
                this.ABI_SRC = "android_webview_plugin";
                this.ABI = {
                    executeCommand: function (message) {
                        //noinspection JSUnresolvedVariable
                        var executor = window["AndroidOfficeSDK"];
                        if (typeof executor['execute'] === "function") {
                            //noinspection JSUnresolvedFunction
                            executor.execute(JSON.stringify(message));
                        }
                    }
                };
                return;
            }


            // otherwise blank implementation
            this.ABI = UNDEF_ABI
        }
    };

    var OFFICE_VERSION = "7.0.11",
        OFFICE_IMPL = new OfficeABI(),
        copyProperties = function (data, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    data[key] = source[key];
                }
            }

            return data;
        },
        abiGlobalData = function (data) {
            return copyProperties({
                /**
                 * 文件版本
                 * COMPATIBLE 或者 LATEST
                 * @type {string}
                 */
                version: "",
                /**
                 * 文件名称
                 * @type {string}
                 */
                fileName: "",

                /**
                 * 下载地址
                 * @type {string}
                 */
                downloadURL: "",

                /**
                 * 上传地址
                 * @type {string}
                 */
                uploadURL: "",

                /**
                 * 文档参数配置
                 * @type {object}
                 */
                config: {},

                /**
                 * 推送设备参数
                 * @type {object}
                 */
                pushDevice: {
                    /**
                     * 设备序列号
                     * @type {string}
                     */
                    serialNumber: "",
                    /**
                     * 设备持有人
                     * @type {string}
                     */
                    holder: "",
                    /**
                     * 设备分组
                     * @type {string}
                     */
                    domain: "default"
                }
            }, data);
        },
        abiConfigGlobalData = function (extended) {
            return copyProperties({

                /**
                 * 审阅用户名
                 * @type {string}
                 */
                username: "",
                /**
                 * 表单项列表
                 * @type {Array}
                 */
                formFields: [],

                /**
                 * 请求头
                 * @type {Array}
                 */
                httpHeaders: [],

                /**
                 * 只读模式
                 * @type {boolean}
                 */
                readOnly: false,

                /**
                 * 用户自定义参数
                 * 样例： abc=xyz&exa=123
                 */
                userDefinedProperties: "",

                /**
                 * 手写笔颜色
                 */
                inkColor: "black",
                /**
                 * 手写笔宽度
                 */
                inkSize: 11,
                /**
                 * 批注类型
                 * 注意：如果使用手写笔批注，设置为true
                 *      否则设置为false
                 */
                usePenMode: false,

                /**
                 * 文档模式
                 * 设置文档为只读模式: OPEN_IN_READONLY
                 * 设置文档为阅读模式: OPEN_IN_READ
                 * 设置文档为编辑模式: OPEN_IN_NORMAL
                 * 设置文档为签批模式: OPEN_IN_HAND_SIGNATURE
                 */
                openInView: "OPEN_IN_NORMAL",

                /**
                 * 是否删除本地文件
                 * 注意：设置false文件不会被删除
                 *      设置true文件关闭后会被删除
                 */
                deleteLocalFile: false
            }, extended);
        };

// post setup
//noinspection JSUnresolvedVariable
    if (channel && channel.onCordovaReady
        && typeof channel.onCordovaReady.subscribe === "function") {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        channel.onCordovaReady.subscribe(function () {
            // infer office implementation
            OFFICE_IMPL.infer();
        });
    } else {
        // default infer call
        OFFICE_IMPL.infer();
    }

    /**
     * 表单项
     * @constructor
     */
    function FormField(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * 表单名称
     * @type {string}
     */
    FormField.prototype.name = "";

    /**
     * 表单值
     * @type {string}
     */
    FormField.prototype.value = "";

    /**
     * WordAbi对象
     * @constructor
     */
    var WordAbi = function () {
        return abiGlobalData({
            fileType: ".doc"
        });
    };

    /**
     * 文档参数配置对象
     * @constructor
     */
    var WordAbiConfig = function () {
        return abiConfigGlobalData({

            /**
             * 开启审阅
             * @type {boolean}
             */
            enableRevision: true,

            /**
             * 开启注释
             * @type {boolean}
             */
            enableComment: true,

            /**
             * 开启编辑注释
             * @type {boolean}
             */
            enableEditComment: true,

            /**
             * 启用复制
             * @type {boolean}
             */
            enableCopy: true,

            /**
             * 启用分享
             * @type {boolean}
             */
            enableShare: true,

            /**
             * 启用打印
             * @type {boolean}
             */
            enablePrint: true,

            /**
             * 启用另存为
             * @type {boolean}
             */
            enableSaveAs: true,

            /**
             * 启用发送邮件
             * @type {boolean}
             */
            enableSendMail: true,

            /**
             * 启用手写
             * @type {boolean}
             */
            enableHandWrite: true,

            /**
             * 启用导出PDF
             * @type {boolean}
             */
            enableExportToPDF: true,

            /**
             * 进入编辑模式
             * @type {boolean}
             */
            openInEditMode: true,

            /**
             * 开启审阅文字下划线标记
             * @type {boolean}
             */
            revisionTextMarkVisible: true,

            /**
             * 隐藏或者显示审阅面板
             * @type {boolean}
             */
            revisionPanelVisible: true,

            /**
             * 启用审阅文字下划线标记可关闭
             * @type {boolean}
             */
            revisionTextMarkCanTurnOff: true,

            /**
             * 书签替换
             */
            bookmarkReplacement: []
        });
    };

    /**
     * ExcelAbi对象
     * @constructor
     */
    var ExcelAbi = function () {
        return abiGlobalData({
            fileType: ".xls"
        });
    };

    /**
     * ExcelAbi文档参数配置
     * @constructor
     */
    var ExcelAbiConfig = function () {
        return abiConfigGlobalData({

            /**
             * 以编辑模式打开
             * @type {boolean}
             */
            openInEditMode: true,

            /**
             * 开启另存为
             * @type {boolean}
             */
            enableSaveAs: true,

            /**
             * 开启分享
             * @type {boolean}
             */
            enableShare: true,

            /**
             * 开启发送邮件
             * @type {boolean}
             */
            enableSendMail: true
        });
    };

    /**
     * PowerPointAbi对象
     * @constructor
     */
    var PowerPointAbi = function () {
        return abiGlobalData({
            fileType: ".ppt"
        });
    };

    /**
     * PowerPointAbi文档参数配置
     * @constructor
     */
    var PowerPointAbiConfig = function () {
        return abiConfigGlobalData({

            /**
             * 以编辑模式打开
             * @type {boolean}
             */
            openInEditMode: true,

            /**
             * 开启另存为
             * @type {boolean}
             */
            enableSaveAs: true,

            /**
             * 开启分享
             * @type {boolean}
             */
            enableShare: true,

            /**
             * 开启发送邮件
             * @type {boolean}
             */
            enableSendMail: true,

            /**
             * 启用导出PDF
             * @type {boolean}
             */
            enableExportToPDF: true
        });
    };

    /**
     * PDF文档对象
     * @constructor
     */
    var PDFAbi = function () {
        return abiGlobalData({
            fileType: ".pdf"
        });
    };

    /**
     * PDF文档参数配置
     * @constructor
     */
    var PDFAbiConfig = function () {
        return abiConfigGlobalData({

            /**
             * 开启编辑功能
             * @type {boolean}
             */
            enableEdit: true,

            /**
             * 允许文字复制
             * @type {boolean}
             */
            enableCopy: true,

            /**
             * 允许打印
             * @type {boolean}
             */
            enablePrint: true,

            /**
             * 允许另存为
             * @type {boolean}
             */
            enableSaveAs: true,

            /**
             * 开启分享和发送邮件
             * @type {boolean}
             */
            enableShareAndSendMail: true,

            /**
             * 手写笔颜色
             */
            inkColor: "black",
            /**
             * 手写笔宽度
             */
            inkSize: 3,
            /**
             * 保护批注
             */
            secureAnnotations: false,

            /**
             * 对批注添加的用户自定义参数的名称的注解
             * 样例： abc=xyz&exa=123
             */
            customAnnotationQueries: "",

            /**
             * 对批注添加用户自定义参数
             * 样例： abc=xyz&exa=123
             */
            customAnnotationProperties: "",
            /**
             * 批注类型
             * 注意：如果使用手写笔批注，设置为true
             *      否则设置为false
             */
            usePenMode: false,

            /**
             * 隐藏浮动工具栏
             */
            hideActionButton: false,

            /**
             * 显示菜单文字
             * 注意：仅在宽屏模式下有效
             */
            showMenuText: false
        });
    };

    /**
     * Office SDK
     * @constructor
     */
    function OfficeSDK() {
    }

    /**
     *
     * @type {boolean}
     */
    OfficeSDK.prototype.deepLinksEnabled = function () {
        return OFFICE_IMPL.deepLinksEnabled;
    };
    /**
     *
     * @type {boolean}
     */
    OfficeSDK.prototype.enabledDeepLinks = function () {
        OFFICE_IMPL.deepLinksEnabled = true;
        OFFICE_IMPL.infer();
    };

    /**
     *
     * @param abi
     * @param invoke
     * @returns {*}
     */
    var executeCommand = function (abi, invoke) {

        if (typeof abi.config.formFields === "undefined") {
            abi.config.formFields = [];
        }

        if (typeof abi.config.httpHeaders === "undefined") {
            abi.config.httpHeaders = [];
        }

        // 添加默认表单参数
        abi.config.formFields.push(new FormField("office_sdk_version", OFFICE_VERSION));
        abi.config.httpHeaders.push(new FormField("OfficeABI", OFFICE_IMPL.ABI_SRC));

        var message = {
            "type": OFFICE_IMPL.ABI_SRC,
            "invoke": invoke,
            "body": abi
        };

        message = minify(message);

        // execute command
        return OFFICE_IMPL.ABI.executeCommand(message);
    };

    /**
     * 压缩请求
     * @param data
     */
    var minify = function (data) {
        if (data.body.pushDevice) {

            var sn = String(data.body.pushDevice.serialNumber);
            var holder = String(data.body.pushDevice.holder);
            var domain = String(data.body.pushDevice.domain);

            data.body.pushDevice = {
                holder: holder,
                serialNumber: sn,
                domain: domain
            };
        }

        return data;
    };

    /**
     * 请求执行判定SDK类型
     */
    OfficeSDK.prototype.infer = function () {
        OFFICE_IMPL.infer();
    };
    /**
     * 创建新的Word文档
     * @param abi WordAbi对象
     */
    OfficeSDK.prototype.createNewWord = function (abi) {
        return executeCommand(abi, "createNewWordInternal");
    };

    /**
     * 从服务器打开Word文档
     * @param abi WordAbi对象
     */
    OfficeSDK.prototype.openWordFromURL = function (abi) {
        return executeCommand(abi, "openWordFromURLInternal");
    };

    /**
     * 创建新的Excel文档
     * @param abi ExcelAbi对象
     */
    OfficeSDK.prototype.createNewExcel = function (abi) {
        return executeCommand(abi, "createNewExcelInternal");
    };

    /**
     * 从服务器打开Excel文档
     * @param abi ExcelAbi对象
     */
    OfficeSDK.prototype.openExcelFromURL = function (abi) {
        return executeCommand(abi, "openExcelFromURLInternal");
    };

    /**
     * 创建新的PowerPoint文档
     * @param abi PowerPointAbi对象
     */
    OfficeSDK.prototype.createNewPowerPoint = function (abi) {
        return executeCommand(abi, "createNewPowerPointInternal");
    };

    /**
     * 从服务器打开PowerPoint文档
     * @param abi PowerPointAbi对象
     */
    OfficeSDK.prototype.openPowerPointFromURL = function (abi) {
        return executeCommand(abi, "openPowerPointFromURLInternal");
    };

    /**
     * 从服务器打开PDF文档
     * @param abi PDFAbi对象
     */
    OfficeSDK.prototype.openPDFFromURL = function (abi) {
        return executeCommand(abi, "openPDFFromURLInternal");
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newWordDocument = function () {
        return copyProperties({}, WordAbi());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newExcelDocument = function () {
        return copyProperties({}, ExcelAbi());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newPowerPointDocument = function () {
        return copyProperties({}, PowerPointAbi());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newPDFDocument = function () {

        return copyProperties({}, PDFAbi());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newWordDocumentConfig = function () {
        return copyProperties({}, WordAbiConfig());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newExcelDocumentConfig = function () {
        return copyProperties({}, ExcelAbiConfig());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newPowerPointDocumentConfig = function () {
        return copyProperties({}, PowerPointAbiConfig());
    };

    /**
     *
     * @constructor
     */
    OfficeSDK.prototype.newPDFDocumentConfig = function () {
        return copyProperties({}, PDFAbiConfig());
    };

    // cordova exports
    //noinspection JSUnresolvedVariable
    if (typeof module !== "undefined") {
        //noinspection JSUnresolvedVariable
        module.exports = new OfficeSDK();
    }

    // ios&android webview compatible
    if (window) {

        // exports FormFiled
        window.FormField = FormField;

        // export OfficeSDK
        var _OfficeInstance = new OfficeSDK();
        window.OfficePro = _OfficeInstance;
        window.Office = _OfficeInstance;

        /**
         * 文档版本
         */
        window.OfficeVersion = {
            COMPATIBLE: "COMPATIBLE",
            LATEST: "LATEST"
        }
    }
}(window));