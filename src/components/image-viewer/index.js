import Vue from 'vue';
import ImageViewer from './image-viewer.vue';

ImageViewer.newInstance = (props = {}) => {
    const Instance = new Vue({
        render(h) {
            return h("div", {
                "class": "vue-image-viewer-full"
            }, [
                h(ImageViewer, {
                    props
                })
            ]);
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const imageViewer = Instance.$children[0];

    return {
        config(options) {
            for(let key of Object.keys(options)) {
                imageViewer[key] = options[key];
            }
        },
        visible(val) {
            imageViewer.visible = !!val;
            return this;
        },
        images(data) {
            if(data) imageViewer.images = data;
            return this;
        },
        page(num) {
            imageViewer.images = +num;
            return this;
        },
        index(num) {
            imageViewer.index = +num;
            return this;
        },
        component: imageViewer
    };
};

let imageViewerInstance = null;
const getImageViewerInstance = props => {
    imageViewerInstance = imageViewerInstance || ImageViewer.newInstance(props);
    return imageViewerInstance;
};

getImageViewerInstance();

ImageViewer.show = options => {
    if(options) {
        getImageViewerInstance().config(options);
        getImageViewerInstance().visible(true);
    } else {
        getImageViewerInstance().visible(true);
    }
};
ImageViewer.hide = () => {
    getImageViewerInstance().visible(false);
};
ImageViewer.page = num => {
    getImageViewerInstance().page(num);
};
ImageViewer.index = num => {
    getImageViewerInstance().index(num);
};
ImageViewer.images = data => {
    getImageViewerInstance().images(data);
};

export default ImageViewer;
