import imageViewer from "./components/image-viewer";

const install = function(Vue) {
    if(install.installed) return;
    Vue.component("imageViewer", imageViewer);
    Vue.prototype.$imageViewer = imageViewer;
};

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    install
};

export default API;