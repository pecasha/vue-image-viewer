<template>
    <transition name="image-viewer-fade">
        <div class="image-viewer" v-show="visible">
            <i class="image-viewer-close icon-close" @click="close"></i>
            <div class="image-viewer-content" v-if="images.length">
                <img :src="images[index].url" :alt="images[index].name?images[index].name:''" :width="imgStyle.width" :height="imgStyle.height" v-show="imgVisible">
                <div class="image-viewer-info">
                    <p>{{images[index].name?images[index].name:""}}({{(index+1)+'/'+images.length}})</p>
                    <div class="right">
                        <i :class="`icon-${config.fullScreen?'cancel-':''}full-screen`" @click="fullScreen"></i>
                        <i class="icon-download" @click="download(images[index].url)"></i>
                    </div>
                </div>
                <div class="image-viewer-content-prev" @click="imgChange('prev')"></div>
                <div class="image-viewer-content-next" @click="imgChange('next')"></div>
            </div>
            <div class="image-viewer-nav"
                 v-if="thumbnail">
                <div class="image-viewer-nav-prev" @click="pageChange('prev')"><i class="icon-arrow-left"></i></div>
                <div class="image-viewer-nav-main">
                    <div class="image-viewer-nav-thumb">
                        <div v-for="(il,i) in images" :key="i" :class="{active:i===index}" :alt="il.name?il.name:''" :title="il.name?il.name:''" :style="{backgroundImage:'url('+il.url+')'}" @click="imgChange(i)"></div>
                    </div>
                </div>
                <div class="image-viewer-nav-next" @click="pageChange('next')"><i class="icon-arrow-right"></i></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "imageViewer",
    data() {
        return {
            config: {
                imgMaxWidth: window.innerWidth * .8,
                imgMaxHeight: window.innerHeight * .8,
                fullScreen: false
            },
            imgStyle: {
                width: "auto",
                height: "auto"
            },
            thumbnail: true,
            visible: false,
            imgVisible: false,
            index: 0,
            page: 0,
            images: []
        }
    },
    watch: {
        visible(val) {
            if(this.images.length) {
                if(val) document.body.style.overflow = "hidden";
                else document.body.style.overflow = "";

                this.imgLoad(this.imgSize);
            } else {
                this.visible = false;
            }
        },
        index() {
            this.imgStyle = {
                width: "auto",
                height: "auto"
            };
            this.imgVisible = false;
            this.imgLoad(this.imgSize);
        }
    },
    created() {
        window.onresize = () => {
            const fullscreenEnabled = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if(!fullscreenEnabled) this.config.fullScreen = false;
        };
    },
    methods: {
        imgLoad(callback) {
            setTimeout(() => {
                const $img = document.querySelector(".image-viewer-content > img");
                const timer = setInterval(() => {
                    if($img.complete) {
                        callback();
                        clearInterval(timer);
                    }
                }, 100);
            })
        },
        imgSize(recursionWidth, recursionHeight) {
            const _img = document.querySelector(".image-viewer-content > img");
            const _width = recursionWidth || _img.width,
                _height = recursionHeight || _img.height;

            let imgSizeAuto = this.imgSizeAuto(_width, _height);
            if(imgSizeAuto.width - 10 > this.config.imgMaxWidth || imgSizeAuto.height - 10 > this.config.imgMaxHeight) {
                this.imgSize(imgSizeAuto.width, imgSizeAuto.height);
            } else {
                this.imgStyle = imgSizeAuto;
                this.imgVisible = true;
            }
        },
        imgSizeAuto(width, height) {
            let zoomSize = 0;

            if(width > this.config.imgMaxWidth || height > this.config.imgMaxHeight) {
                zoomSize = width - this.config.imgMaxWidth > height - this.config.imgMaxHeight ? this.config.imgMaxWidth / width : this.config.imgMaxHeight / height;
                return {
                    width: width * zoomSize,
                    height: height * zoomSize
                }
            }
            return {
                width,
                height
            }
        },
        imgChange(action) {
            const length = this.images.length - 1;
            if(action === "prev") {
                this.index = this.index-- <= 0 ? 0 : this.index;
                if(this.index < this.page * 8) this.pageChange("prev");
            } else if(action === "next") {
                this.index = this.index++ >= length ? length : this.index;
                if(this.index >= (this.page + 1) * 8) this.pageChange("next");
            } else if(!isNaN(action)) {
                this.index = action <= 0 ? 0 : action >= length ? length : action;
            }
        },
        pageChange(action) {
            const length = this.images.length - 1;
            if(action === "prev" && this.page * 8 >= 8) this.page--;
            else if(action === "next" && (this.page * 8 < length && length - this.page * 8 > 8)) this.page++;
            document.querySelector(".image-viewer-nav-thumb > div:first-child").style.marginLeft = -(document.querySelector(".image-viewer-nav-thumb").width * this.page) + "px";
        },
        close() {
            if(this.config.fullScreen) this.fullScreen();
            this.visible = false;
        },
        download(url) {
            window.open(url);
        },
        fullScreen() {
            if(this.config.fullScreen) {
                if(document.exitFullscreen) document.exitFullscreen();
                else if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if(document.msExitFullscreen) document.msExitFullscreen();

                this.config.fullScreen = false;
            } else {
                const requestFullScreen = document.documentElement.requestFullScreen ||
                    document.documentElement.webkitRequestFullScreen ||
                    document.documentElement.mozRequestFullScreen ||
                    document.documentElement.msRequestFullscreen;

                if(requestFullScreen) requestFullScreen.call(document.documentElement);

                this.config.fullScreen = true;
            }
        }
    }
}
</script>

<style lang="less" src="../../styles/image-viewer.less"></style>
