module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true,
        es6: true
    },
    plugins: [
        "vue"
    ],
    extends: ["plugin:vue/essential"],
    globals: {
        "GLOBAL": false,
        "process": false,
        "log": false
    },
    /* ESLint 规则  */
    // error-开启规则,错误级别、warn-开启规则,警告级别、off-关闭规则
    rules: {
        "no-cond-assign": "error", // 禁止在条件语句中出现赋值操作符
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境中不建议出现console
        "no-constant-condition": ["warn", {"checkLoops": false}], // 不建议在条件判断中使用常量表达式，但是允许在循环中使用，例如while(true)、for(;true;)
        "no-control-regex": "warn", // 不建议在正则表达式中使用控制字符（ascii编码中0-31范围内的字符），因为这些字符是特殊、不可见的，很少用于JavaScript字符串中
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 生产环境中不允许使用debugger
        "no-dupe-args": "error", // 禁止在函数定义或表达中出现重名参数
        "no-dupe-keys": "error", // 禁止在对象字面量中出现重复的键(Key)
        "no-duplicate-case": "error", // 禁止在switch语句中出现重复的case
        "no-empty": "error", // 禁止空语句块出现，但是在try语句中，包含一个注释的空catch或finally语句块是被允许的
        "no-empty-character-class": "warn", // 不建议在正则表达式中出现空字符集，因为在正则表达式中空字符集不会匹配任何字符，通常这可能是编写代码时的打字错误造成的
        "no-ex-assign": "error", // 禁止对catch子句中的异常重新赋值
        "no-extra-boolean-cast": "warn", // 不建议进行一些不必要的布尔类型转换，例如if(!!foo)是没有意义的，但在某些情况下这种转换可以减少代码量，所以只做警告
        "no-extra-parens": "warn", // 不建议写一些多余的括号，例如typeof (a)中的括号是完全可以省略和多余的
        "no-extra-semi": "warn", // 不建议写一些多余的分号，例如var x = 1;;中的两个分号虽然不会引起错误，但是在阅读代码时会引起困惑
        "no-func-assign": "error", // 禁止对function声明重新赋值
        "no-inner-declarations": "error", // 禁止在嵌套的语句块中出现变量或function声明，所有的函数或变量声明必须在程序或函数体的顶部
        "no-invalid-regexp": "error", // 禁止在RegExp构造函数中出现无效的正则表达式
        "no-irregular-whitespace": "warn", // 不建议在代码中出现多余的不规则空白，因为有些不可见的空白字符可能会引起错误，例如零宽空格等
        "no-obj-calls": "error", // 禁止将全局对象当做函数进行调用，例如Math()这样调用是错误的，Math是一个对象而不是一个函数
        "no-prototype-builtins": "error", // 禁止直接在对象实例上调用 Object.prototype 的一些方法，例如foo.hasOwnProperty("bar")，应当写为Object.prototype.hasOwnProperty.call(foo, "bar")
        "no-regex-spaces": "warn", // 不建议在正则表达式字面量中出现多个空格，例如/foo   bar/这样的正则表达式很难以理解，而且容易出现错误，我们很难断定需要匹配多少个空格，最好的方式是只使用一个空格，然后指定需要多少个，例如/foo {3}bar/
        "no-sparse-arrays": "warn", // 注意避免出现稀疏数组，例如var items = [,,];
        "no-unexpected-multiline": "warn", // 避免出现令人困惑的多行表达式，请不要在表达式中做一些让人难以理解的换行
        "no-unreachable": "warn", // 避免在return、throw、continue、break语句后出现代码，因为这些代码并不会被执行
        "no-unsafe-finally": "error", // 禁止在finally语句块中出现控制流语句，JavaScript会暂停try和catch语句块中的控制流语句，直到finally语句块执行完毕，所以当return、throw、break、continue出现在finally中时，try和catch语句块中的控制流语句将被覆盖，这是一种意外的行为
        "use-isnan": "warn", // 应当调用Number.isNaN()或isNaN()函数来判断一个值是否能是NaN，而不应直接对NaN做条件判断
        "valid-typeof": "error", // 强制typeof表达式必须与有效的字符串进行比较，有效的字符串是：undefined、object、boolean、number、string、function、symbol
        "accessor-pairs": "warn", // 一个对象中不应只有setter而没有对应的getter，因为没有getter就无法读取这个属性，这个属性也就不会被用到
        "array-callback-return": "error", // 强制数组方法的回调函数中必须有return语句，因为数组中的方法一般是用于过滤、映射或折叠，如果没有在它们的回调函数中写return语句，这就可能会是一个错误
        "block-scoped-var": "warn", // 不应把变量在其定义的作用域范围之外使用
        "complexity": "warn", // 不应过多的使用else if来做条件判断，如果有较多的条件判断及处理，使用switch语句会是一个更好的选择，当圈复杂度超过20时将发出警告
        "curly": ["warn", "multi-line"], // 在if、else if、else、for、while、do只有一行时运行省略大括号，而其他情况不建议省略大括号，因为这样会使代码不方便阅读，而且更容易出错
        "default-case": "warn", // 在switch语句中应当有default分支，哪怕分支中没有任何代码，或在switch中注释//no default以说明是有意为之
        "dot-location": ["warn", "property"], // 如果需要在成员表达式的点操作符之前或之后换行，建议在点操作符之前换行
        "dot-notation": "warn", // 虽然JavaScript可以使用方括号来访问属性（foo["bar"]），但是建议尽可能的使用点号来访问属性（foo.bar），因为它更加易读、简洁，也更适于JavaScript代码压缩
        "eqeqeq": ["warn", "always", {"null": "ignore"}], // 应当尽可能的使用绝对相等，因为在一个看似没问题的语句中使用等于，发生问题是很难被发现的。在除了与null字面量进行比较时，其它任何情况未使用恒等都将发出警告
        "guard-for-in": "warn", // 在使用for-in时，应当对结果使用hasOwnProperty()进行检测，以免一些意外的错误出现
        "no-alert": process.env.NODE_ENV === "production" ? "warn" : "off", // JavaScript的alert、confirm、prompt十分影响UI的整体性，应当避免在生产环境中出现这类弹窗，转而使用UI库提供的或符合整体设计的弹窗进行输入输出提示信息
        "no-caller": "error", // arguments.caller和arguments.callee的使用使一些代码优化变得不可能。在JavaScript的新版本中它们已被弃用，同时在ECMAScript 5的严格模式下，它们也是被禁用的
        "no-case-declarations": "warn", // 不要在switch的case或default字句中出现词法声明，如果一定需要这么做，请将含词法声明的字句包裹在块中，该规则旨在避免访问未经初始化的词法绑定以及跨case语句访问被提升的函数
        "no-div-regex": "warn", // 不建议使用看起来像除法的正则表达式，例如/=foo/，也因为这样看起来会与除法操作符有歧义，建议改写为/\=foo/
        "no-else-return": "warn", // 如果在if块中包含了一个return语句，那么else块就是多余的了，所以不建议在else之前有return
        "no-empty-function": "error", // 禁止在代码中出现空函数，空函数降低代码的可读性，除非在空函数中用注释标明是有意为之
        "no-empty-pattern": "error", // 禁止在代码中出现空解构模式，因为空解构赋值是不会起作用的
        "no-eq-null": "off", // 大多数时候我们都将null、undefined视为是空，所以在多数时候null与undefined是等价的，所以不需要过于严格的判断null与undefined的类型
        "no-eval": "warn", // 不建议在代码中使用eval()函数
        "no-extend-native": ["warn", {exceptions: ["String", "Date", "Array"]}], // 不建议扩展原生的对象，因为可能会导致原生的功能发生改变，这将影响到所有的对象甚至是其它的内建对象
        "no-extra-bind": "warn", // 无需用bind()做一些不必要的函数绑定，请确保函数中会用到this再使用bind()方法来改变function的this值
        "no-extra-label": "error", // 禁用不必要的标签，如果一个循环中不包含嵌套循环或switch语句，对这样的循环使用标签是不必要的。你可以通过移除标签，只使用break或continue实现同样的结果。这些标签可能会使读者感到困惑，因为他们可能希望使用标签跳转到更远的地方
        "no-fallthrough": "error", // 禁止case语句落空，switch语句是一种比较容易出错的结构，这主要是因为case的落空，如果case语句中没有使用break进行组织，在子句代码执行完后依然会继续执行下一个case，而通常这是因为编写代码时的疏忽造成的，所以如果是有意为之请使用// falls through注明，否则没有break的case语句都将被认为是错误的
        "no-floating-decimal": "off", // 在JavaScript中是允许小数点前后没有数字的，例如小数点前如果是0则可以省略，正常的开发人员应当要很容易的读懂这种浮点数
        "no-implicit-coercion": "off", // 只要确保代码不会出错，是允许使用简单的类型转换及判断的，正常的开发人员应当要熟悉那些较短的使用符号进行的类型转换及条件判断
        "no-implicit-globals": "off", // 使用sourceType module模式的时候，实际上并不会匹配该规则，所以开启关闭该规则都是无效的，当然从代码角度我们是应当避免使用全局变量和函数
        "no-implied-eval": "warn", // 避免使用eval()是因为考虑到安全性和性能，然而，也有一些其它方式可以通过传递一个字符串并将其解析为JavaScript代码，而这种行为也会导致类似的问题，例如setTimeout()、setInterval()、execScript()，它们都可以接受一个字符串并解析执行为JavaScript代码，这也是我们应当避免使用的
        "no-invalid-this": "off", // 如果在类或类对象之外使用this关键字时需要特别注意，因为此时this关键字可能是undefined并且引发TypeError
        "no-iterator": "error", // 禁止使用__iterator__迭代器，这个属性现在已经被废弃，所以不应再使用
        "no-labels": "error", // 不允许使用标签语句，虽然在某些情况下标签语句很方便，但是并不赞成将标签语句作为一种复杂流程控制的补救措施
        "no-lone-blocks": "error", // 在ES6中，如果出现一个块级绑定、类声明或函数声明，代码块会创建一个新的作用域，在这些情况下，这些代码不会被认为是多余的，所以禁止出现一些不必要的嵌套块
        "no-loop-func": "error", // 禁止在循环中创建函数，因为这种情况下，函数会创建一个闭包，虽然你的代码可能会正常运行，但是在某些情况下，也会出现一些意外的行为
        "no-magic-numbers": "off", // 有时候我们为了省事和方便，会在编写代码的时候不自觉的出现魔术数字，这种行为可能不会给代码运行带来问题，但是对于协同开发或后续维护人员来说，这些魔术数字是很难理解的，我们应当尽量确保将具体数字声明为意义明确的常量
        "no-multi-spaces": "warn", // 在代码中，出现多个空格并且不是用来作为缩进的，通常我们认为这是一个错误，例如if(foo  === "bar")这种代码无论是语法还是代码风格都是不可取的
        "no-multi-str": "warn", // 在JavaScript中可以在新行之前使用斜线创建多行字符串，但是这并不是JavaScript的一个正式特性，所以在创建多行字符串的时候，建议使用+拼接运算符
        "no-new-func": "warn", // 不建议使用Function构造函数去创建一个函数，例如var x = new Function()，在非特殊使用场景，这种声明方式会令人难以理解
        "no-new-wrappers": "warn", // 不建议使用原始包装实例，JavaScript中有3种原始类型包装对象，在声明时，如果使用原始包装器作为构造函数，虽然这么做是可行的，但是实际可能并不是这样，例如var stringObject = new String("Hello world");创建的并不是string类型，而是object类型，所以避免通过new操作符使用String、Number和Boolean
        "no-octal": "error", // 禁止使用八进制字面量，八进制字面量是指那些以0开始的数字，例如var num = 071;此处的071对应的十进制是57，八进制的前导数字0作为其标识一直是导致混淆和错误的来源，在ES5就已经弃用了八进制字面量
        "no-octal-escape": "error", // ES5已将字符串字面量中的八进制转义序列弃用，不应再使用，可改用Unicode转义序列
        "no-param-reassign": "warn", // 不建议对函数的参数再次赋值，因为一个函数的代码块如果很大，对函数参数中的变量进行再赋值可能会误导读者，导致混乱，也会改变arguments对象，而通常对函数参数进行再赋值并非有意为之，而是程序员图省事而造成的
        "no-proto": "error", // 禁用__proto__，在ES3.1中就已经弃用__proto__，不应再继续使用，可改用getPrototypeOf()方法替代
        "no-redeclare": "error", // 禁止重新声明变量，JavaScript可以使用var对同一个变量再次声明，这会使变量实际声明和定义的位置混乱不堪
        "no-return-assign": "warn", // 在JavaScript我们甚至可以在任何位置进行赋值操作，正因如此，在return返回语句中可能出现return foo = bar + 2;这种情况，而此类情况极有可能是想进行比较操作而手误造成的
        "no-script-url": "warn", // 在链接地址中使用javascript:被认为是eval的一种形式，在javascript:链接中的代码必须由浏览器解析和赋值，其处理方式与eval一样，所以并不建议使用Script URL
        "no-self-assign": "error", // 禁止自身赋值，自身赋值不会起任何作用，可能是由于不完整的重构造成的错误
        "no-self-compare": "error", // 禁止自身比较，变量与其自身进行比较通常来说是一个错误，要么是编码时输入错误要么是重构错误，这都会给读者造成困扰并且可能会引发运行错误。唯一可能会对变量自身做比较的时候是当你再测试变量是否为NaN，然而在这种情况下，更适合使用typeof x === "number" && isNaN(x)或Number.isNaN()函数，而不是变量自身比较
        "no-sequences": "warn", // 不建议使用逗号操作符，逗号操作符包含多个表达式，其中只有一个是可使用的，它从左至右计算每一个操作数并返回最后一个操作数的值，然而这往往掩盖了它的副作用，这样的使用经常会发生错误，并且对于代码阅读也是不友好的
        "no-throw-literal": "warn", // 如果需要throw抛出异常，不建议直接抛出字面量异常，而应当使用Error对象抛出，例如throw new Error("error")
        "no-unmodified-loop-condition": "warn", // 循环条件中的变量在循环中应当是要经常改变的，如果变量在循环中是一成不变的，那么可能是个错误
        "no-unused-expressions": "warn", // 未使用过的表达式在程序中不起任何作用，通常是逻辑错误或代码冗余
        "no-unused-labels": "error", // 禁止出现未使用的标签，只声明却没有使用的标签可能是由于不完全的重构造成的错误，当然也是禁止使用标签语句的
        "no-useless-call": "error", // 禁用不必要的.call()和.apply()，虽然函数的调用可以写成Function.prototype.call()或Function.prototype.apply()，但是这比正常的函数调用效率要低
        "no-useless-concat": "warn", // 不建议做没有必要的字符串拼接，例如var foo = "a" + "b";，这种拼接并没有任何意义，完全可以被写成var foo = "ab";
        "no-useless-escape": "error", // 禁止出现不必要的转义，对字符串、模板字面量和正则表达式中的常规字符进行转义，不会对结果产生任何影响，并且影响阅读
        "no-void": "off", // 使用void操作符通常是为了得到一个单纯的undefined值，因为在ES5中undefined值是可变的，并且void 0比undefined更简短
        "no-warning-comments": "off", // 我们应当善用TODO、FIXME、XXX等警告注释，因为在提交或发布代码时这可以标明哪些代码没有完成或有问题需要修复
        "no-with": "warn", // with语句会在当前的域中增加对象成员，使得区分实际块中的变量变得不确定，应当避免使用with语句
        "radix": ["warn", "as-needed"], // 当使用parseInt()函数时，我们通常会省略第二个参数，基数，并只根据第一个参数确定它是什么类型的数字，默认情况下parseInt()将自动检测十进制和十六进制(通过0x前缀)，在ES5之前，parseInt()也会自动检测八进制文本，这会出现一些问题，因为许多开发人员认为前导0会被忽略，所以我们除了十进制基数以外，我们应当标明parseInt()的基数
        "vars-on-top": "warn", // 应当将变量声明放在它们作用域的顶部，因为JavaScript解析器实际会隐式的将变量声明移到它们所在作用域的顶部，而我们如果直接将变量声明写在作用域的顶部更有利于阅读
        "wrap-iife": "warn", // 如果有需要使用立即执行函数(IIFE)，应当使用括号将立即执行函数包裹起来，因为括号内的函数会被解析为一个表达式，而不会是一个声明
        "yoda": ["warn", "never"], // Yoda条件被如此命名，是因为在条件判断中，字面量在先，而变量在第二的位置，例如if("red" === color)这就是Yoda条件，它被叫做Yoda条件是因为它被这样读：“红色是颜色”，类似于星球大战中Yoda的说话方式，反之另一种写法是if(color === "red)，这样则读作：“颜色是红色”，这显然是一种更自然的描述方式，所以并不建议使用Yoda条件
        "strict": "warn", // 代码建议启用严格模式，严格模式指令是在脚本或函数体开始位置放置一个"use strict"字面量，这将启用严格模式语义。实际使用sourceType module模式时，文件是ECMAScript模块，所以就已经处于严格模式语义下了
        "init-declarations": "warn", // 所有的变量声明都应该初始化，即需要赋一个默认的初始值，这样有利于区分变量的数据类型
        "no-catch-shadow": "error", // 不允许在catch语句中覆盖外部同名变量的值
        "no-delete-var": "error", // 禁止对变量使用delete操作符，因为delete的作用是删除对象的属性，而使用delete删除一个变量可能会导致意外发生
        "no-label-var": "error", // 禁止标签与变量同名，并且再次声明不允许使用标签
        "no-restricted-globals": "error", // 禁止使用特定的全局变量，例如早期的IE暴露了当前DOM事件的event作为一个全局变量，但是使用这个变量并不是一个好的做法
        "no-shadow": "error", // 禁止变量声明覆盖外层作用域的变量，覆盖是指在同一作用域中局部变量和全局变量同名
        "no-shadow-restricted-names": "error", // 禁止重定义关键字，重定义关键字会产生意想不到的后果且容易迷惑其他读者
        "no-undef": "error", // 禁止使用未声明的变量，除非显式的在/*global ...*/注释中指定
        "no-undefined": "error", // 禁止声明名为undefined的变量，undefined在JavaScript中是独一无二的，它实际上是一个全局对象属性，在ES3中可重写undefined值，虽然ES5不再允许重写undefined，但仍能覆盖原来的undefined，这么做会带来一个十分严重的错误，由于undefined被覆盖，所以在读取undefined时会给你一个意想不到的值
        "no-unused-vars": ["error", {args: "none"}], // 禁止出现声明了却未使用的变量，已声明的变量在代码中未被使用，这样的变量增加了代码量，并且容易混淆读者。但是允许函数参数声明了不使用的情况，因为有些函数接收的参数或许不会被用到，如果声明反而能够让读者理解这个函数接收了哪些参数，所以参数名一定要足够明确
        "no-use-before-define": "error", // 在ES6之前，某个作用域中变量和函数的声明会被自动解析到作用域顶部，所以可能存在此变量在声明前被使用，这样做会扰乱读者，不应在声明变量前预先使用
        "global-require": "off", // 其实针对require()只在模块的顶部调用的这条规则是针对NodeJS的，在Vue中使用require也可以实现异步加载
        "handle-callback-err": "off", // 在回调函数做错误处理是一种非常好的行为和习惯，但也并不需要强制这么做，简单代码中如果有错误处理不但会显得繁琐也会让逻辑难以阅读
        "no-mixed-requires": "warn", // 为了代码清晰度和易读性，不要将普通变量声明和require调用混合使用，调用require模块的初始化和其它变量声明应该分开，并且建议以模块类型对它们进行分组
        "no-new-require": "error", // 禁止使用new require调用模块，因为可能模块返回的是一个构造函数，而这样的引入会造成混乱
        "no-path-concat": "warn", // 不建议将_dirname和_filename直接进行字符串拼接使用，因为node可以在任何电脑中运行，而电脑的系统可能不同，而使用的路径分隔符也不同，手动进行路径的拼接可能会出现问题，建议使用path模块创建正确的路径
        "no-process-env": "off", // process.env对象用于存储部署或配置参数，虽然不禁止随意使用，但是最好的方式是通过将这些参数写在一个配置文件中，然后通过这个配置文件在整个项目中进行访问
        "no-process-exit": "warn", // process.exit()是用于立即终止Node.js进程并退出，这是非常危险的操作，因为在任何时候使用，都可能发生错误并完全终止Node.js应用，不应随意调用
        "no-restricted-modules": "off", // 目前没有需要限制使用的模块，如需做限制可修改此规则
        "no-sync": "warn", // 因为Node.js是要求能够高并发非阻塞的异步操作，并且大多数I/O都是通过异步方法执行，虽然有些异步方法有提供同步方法，但是我们应当避免使用同步方法，因为同步方法在高并发时可能会发生服务器阻塞，所以建议在Node.js都尽量使用异步操作
        "array-bracket-spacing": "error", // 数组括号内逗号后加空格，大括号和方括号之间不应出现空格，正确格式示例：[2, 3, 5]、[{foo:bar}, {bar:foo}]、[{foo : bar},{bar : foo}]
        "block-spacing": "error", // 在当行代码块中需要使用空格，正确格式示例：if(foo) { bar = 0; } 错误格式：if(foo) {bar=0;}
        "brace-style": "error", // 大括号要求使用one true brace style风格，即大括号不单独占用一行，正确示例：
        /*
        if(foo) {
            bar();
        } else {
            baz();
        }
        */
        "camelcase": ["error", {properties: "never"}], // 代码强制使用驼峰命名法，不检查属性名称
        "comma-dangle": "error", // 禁止使用拖尾逗号
        "comma-spacing": ["error", {after: true}], // 在逗号前不需要空格，但是逗号后必须有一个空格，正确格式示例：var arr = [1, 2];
        "comma-style": "error", // 要求所有逗号都放在数组元素、对象属性或变量声明之后，并且在同一行，即当前行的末尾
        "computed-property-spacing": "error", // 在计算属性中不要加空格，即禁止括号和其内部值之间出现空格，正确格式示例：var x = {[b] : a}; 错误格式示例：var x = {[ b] : a};
        "consistent-this": "error", // 要求使用一致的this上下文变量名，指定如有需要用到声明this为一个变量或常量时，名称使用that，正确示例：var that = this; 错误示例：var self = this; 如果在代码中有需要用到获取嵌套上下文的情况，consistent-this的规则是会有问题的，但这种代码通常很难阅读和维护，应当是避免出现这样的代码
        "eol-last": "off", // 在文件末尾留空一行只是习惯问题，这种行为可有可无，并不会有什么影响
        "func-names": "error", // 为了能够在调试时更方便的追踪到出错函数，在声明函数时必须给函数命名，因为如果不使用函数名的情况下，当该函数抛出异常时，将会得到一些类似于堆栈里anonymous function的东西，如果提供了可选的函数名，那么将可以在堆栈中找到该函数表达式的名称
        "func-style": ["error", "expression", {allowArrowFunctions: true}], // 所有的函数声明都必须使用函数表达式，因为函数声明的自动提升到作用域顶部可能会使代码流程不易读，允许在ES6中使用箭头函数声明
        "id-blacklist": "off", // 没有太严格的要求，但是在命名的时候，尽量避免使用难以理解的名称或标识符，所有的命名要尽量简单但是明确
        "id-length": ["error", {
            min: 3,
            exceptions: ["$", "e", "h", "i", "j", "x", "y", "to", "on", "id", "ak", "el", "ws", "qq", "uc","iv"]
        }], // 没有太严格的要求，但是在命名的时候，尽量避免使用难以理解的名称或标识符，所有的命名要尽量简单但是明确，最少需要3个字符，在循环变量可以使用缩写的i来表示index，h在Vue中是createElement的别名，Vue官方文档说明：将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 h 失去作用， 在应用中会触发报错。
        "id-match": "off", // 所有的命名都遵守驼峰命名法，不做太严格限制
        "indent": ["error", 4, {SwitchCase: 1}], // 所有的代码缩进必须使用4个空格，不允许使用tab或两个空格，这么做是为了保持代码统一性，并且空格能确保在所有的编辑器、字体中表现都是一致的
        "jsx-quotes": "error", // 如果项目中有需要用到JSX，则强制所有不包含双引号的JSX属性值使用双引号
        "key-spacing": ["error"] // 在对象字面量键和值的冒号后加一个空格，正确格式示例：{foo: 2}

    }
};
