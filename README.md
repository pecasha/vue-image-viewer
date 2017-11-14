[![npm version](https://img.shields.io/npm/v/vue-image-viewer.svg?style=flat-square)](https://www.npmjs.com/package/vue-image-viewer)
[![MIT Licence](https://img.shields.io/npm/l/vue-image-viewer.svg?style=flat-square)](https://github.com/ChiHai-Chuck/vue-image-viewer/blob/master/LICENSE)

# vue-image-viewer
a simple and lightweight picture viewer.

>一个用于Vue2.0的简单且轻量化的图片查看器。

# Install
```
npm install vue-image-viewer --save
```

# Usage
```
import imageViewer from "vue-image-viewer";
import "vue-image-viewer/lib/vue-image-viewer.css";

export default {
    name : "demo",
    components : {
        imageViewer
    },
    data() {
        return {
            imageViewerParams : {
                visible : false,
                index : 0,
                page : 0,
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
        }
    },
    methods : {
        imageViewShow(index) {
            if(index !== void 0) {
                this.imageViewerParams.index = index;
                this.imageViewerParams.visible = true;
            }
        }
    }
}
```
```
<image-viewer :images="imageViewerParams.images"
              :index="imageViewerParams.index"
              :visible="imageViewerParams.visible"
              :page="imageViewerParams.page"
              @close="imageViewerParams.visible=false"></image-viewer>
```

# Props
| Name | Type | Default | Description | Required |
|---|---|---|---|---|
| visible | `Boolean` | `false` | Show or hide. | Yes |
| index | `Number` | `0` | Which image to show first. | No |
| page | `Number` | `0` | The page of the thumbnail list. | No |
| images | `Array` | `[]` | Image list. | Yes |
