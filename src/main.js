import imageViewer from "./components/image-viewer";

const install = Vue => {
    if(install.installed) return;
    Vue.component("imageViewer", imageViewer);
    Vue.prototype.$imageViewer = imageViewer;
};

if(window && window.Vue) {
    install(window.Vue);
}

export default {
    install
};