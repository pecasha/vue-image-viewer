<template>
    <div id="app">
        <button @click="open">打开图片浏览器(open image viewer)</button>
    </div>
</template>

<script>
    import Vue from "vue";

    // import vueImageViewer from '../../lib/vue-image-viewer';
    import "../../lib/vue-image-viewer.css";
    import vueImageViewer from '../../src/main.js';

    Vue.use(vueImageViewer);

    export default {
        name: 'App',
        data() {
            return {
                visible: false,
                images: [
                    {
                        url: "https://static.pexels.com/photos/860935/pexels-photo-860935.jpeg",
                        name: "Sunset"
                    },
                    {
                        url: "https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg",
                        name: "Autumn"
                    },
                    {
                        url: "https://static.pexels.com/photos/126793/pexels-photo-126793.jpeg"
                    },
                    {
                        url: "https://static.pexels.com/photos/74775/pexels-photo-74775.jpeg",
                        name: "Flora"
                    },
                    {
                        url: "https://static.pexels.com/photos/545968/pexels-photo-545968.jpeg"
                    }
                ]
            }
        },
        methods: {
            open() {
                this.$imageViewer.show({
                    images: this.images
                });
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
