<template>
    <div class="demo">
        <img v-for="(item,index) in images" :key="index" :src="item.url" @click="open(index)">
    </div>
</template>

<script>
    import Vue from "vue";

    import vueImageViewer from '../../lib/vue-image-viewer';
    // import vueImageViewer from '../../src/main.js';

    Vue.use(vueImageViewer);

    export default {
        name: "demo",
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
                        name: "Floral"
                    },
                    {
                        url: "https://static.pexels.com/photos/545968/pexels-photo-545968.jpeg"
                    }
                ]
            }
        },
        created() {
            this.$imageViewer.images(this.images);
        },
        methods: {
            open(index) {
                this.$imageViewer.index(index);
                this.$imageViewer.show();
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,Ionicons,iconfont,"vue-image-viewer-icon",sans-serif;
        box-sizing: border-box;
    }
    .demo {
        zoom: 1;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        width: 620px;
        margin: auto;
        color: #2c3e50;
    }
    .demo:after {
        display: block;
        content: "";
        height: 0;
        visibility: hidden;
        clear: both;
    }
    .demo img {
        display: block;
        float: left;
        width: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: #999;
        cursor: pointer;
    }
    .demo img:nth-child(2n) {
        clear: both;
    }
    .demo img:nth-child(3n) {
        margin-right: 0;
    }
</style>
