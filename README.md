# LocalScrollFix

修复ios局部滚动的一些坑，见[ios局部滚动的坑及解决方案](https://zhuanlan.zhihu.com/p/24837233).

### 安装

```javascript
npm install localscrollfix --save
```

### 使用

如果你没有用模块管理，直接从window对象下取LocalScrollFix对象也是可以的，打包后的js放在lib目录下，可以直接用script标签引入  
同时支持模块引入  

```javascript
//ES6
import LocalScrollFix from 'LocalScrollFix'
//commonjs
const LocalScrollFix = require('LocalScrollFix').default
```

当然也支持amd,不过我没用过。 

比如你需要修复的视窗元素的类名是win

```javascript
const localScrollFix = new LocalScrollFix(document.querySelector('.win'))
//当你需要更新win的内容的时候你需要调用localScrollFix.update()
// 切记一定要在dom更新完成后才能使用update才会生效
```

 示例的使用见https://github.com/fa-ge/LocalScrollFix/blob/master/src/demo/index.js

### API

- update: 该方法不接受任何参数。当你更新完视窗的内容的时候你需要调用该方法。他会去计算paddingTop的值。
- isArrived: 这是一个属性，true则表示你的内容已经至少占满一屏了。