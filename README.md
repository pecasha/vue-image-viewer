[![npm version](https://img.shields.io/npm/v/vue-image-viewer.svg?style=flat-square)](https://www.npmjs.com/package/vue-image-viewer)
[![MIT Licence](https://img.shields.io/npm/l/vue-image-viewer.svg?style=flat-square)](https://github.com/chiHai-chuck/vue-image-viewer/blob/master/LICENSE)

# vue-image-viewer
a simple and lightweight picture viewer. [Demo](https://chihai-chuck.github.io/vue-image-viewer/dist/index.html)

>一个用于Vue2.0的简单且轻量化的图片查看器。

# Install
```
npm install vue-image-viewer --save
```

# Usage
```
import imageViewer from "vue-image-viewer";

Vue.use(imageViewer);

export default {
    data() {
        return {
            images : [
                {
                    name : "image1",
                    url : "/static/images/1.jpg"
                },
                {
                    name : "image2",
                    url : "/static/images/2.png"
                },
                {
                    url : "/static/images/3.gif"
                }
            ]
        }
    },
    created() {
        this.$imageViewer.images(this.images);
    },
    methods : {
        imageView(index) {
            this.$imageViewer.index(index);
            this.$imageViewer.show();
        }
    }
}
```
```
<img v-for="(item,index) in images" :key="index" :src="item.url" @click="imageView(index)">
```

# Events
| Name | Params | Type | Description |
|---|---|---|---|
| show | - | - | Open picture viewer. |
| hide | - | - | Close picture viewer. |
| index | `num` | `Number` | Which image to show first. |
| page | `num` | `Number` | The page of the thumbnail list. |
| images | `data` | `Array` | Set image list. |
