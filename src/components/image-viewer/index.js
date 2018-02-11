import Vue from 'vue';
import ImageViewer from './image-viewer.vue';

ImageViewer.newInstance = (properties = {}, props = {}) => {
    const Instance = new Vue({
        data: Object.assign({}, properties, {}),
        render(h) {
            let vnode = null;

            if(this.render) {
                vnode = h(ImageViewer, {
                    props
                }, [this.render(h)]);
            } else {
                vnode = h(ImageViewer, {
                    props
                });
            }
            return h("div", {
                "class": "vue-image-viewer-full"
            }, [vnode]);
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const imageViewer = Instance.$children[0];

    return {
        show() {
            imageViewer.visible = true;
        },
        remove(callback) {
            imageViewer.visible = false;
            setTimeout(() => {
                imageViewer.$parent.$destroy();
                const $imageViewer = document.getElementsByClassName("vue-image-viewer-full");
                if($imageViewer.length) document.body.removeChild($imageViewer[0]);
                callback();
            }, 500);
        },
        component: imageViewer
    };
};

let imageViewerInstance = null;

const getImageViewerInstance = (render, props) => {
    imageViewerInstance = imageViewerInstance || ImageViewer.newInstance({
        render
    }, props);

    return imageViewerInstance;
};

ImageViewer.show = (props = {}) => {
    getImageViewerInstance(props.render, props).show(props);
};

ImageViewer.hide = props => {
    if(!imageViewerInstance) return false;

    getImageViewerInstance({}, props).remove(() => {
        imageViewerInstance = null;
    });
};

export default ImageViewer;