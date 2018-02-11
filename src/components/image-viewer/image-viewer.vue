<template>
    <transition name="image-viewer-fade">
        <div class="image-viewer" v-if="visible">
            <i class="image-viewer-close image-viewer-icon-close" @click="visible=false"></i>
            <div class="image-viewer-content">
                <img :src="images[imgIndex].url" :alt="images[imgIndex].name?images[imgIndex].name:'图片'+(imgIndex+1)" :width="imgStyle.width" :height="imgStyle.height" v-show="imgVisible">
                <div class="image-viewer-info">
                    <p>{{images[imgIndex].name?images[imgIndex].name:'图片'+(imgIndex+1)}}({{(imgIndex+1)+'/'+images.length}})</p>
                    <a :href="images[imgIndex].url" target="_blank">下载原图</a>
                </div>
                <div class="image-viewer-content-prev" @click="imgChange('prev')"><i class="image-viewer-icon-left"></i></div>
                <div class="image-viewer-content-next" @click="imgChange('next')"><i class="image-viewer-icon-right"></i></div>
            </div>
            <div class="image-viewer-nav">
                <div class="image-viewer-nav-prev" @click="pageChange('prev')"><i class="image-viewer-icon-left"></i></div>
                <div class="image-viewer-nav-main">
                    <div class="image-viewer-nav-thumb">
                        <div v-for="(il,i) in images" :class="{active:i===imgIndex}" :alt="il.name?il.name:'图片'+(i+1)" :title="il.name?il.name:'图片'+(i+1)" :style="{backgroundImage:'url('+il.url+')'}" @click="imgChange(i)"></div>
                    </div>
                </div>
                <div class="image-viewer-nav-next" @click="pageChange('next')"><i class="image-viewer-icon-right"></i></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "imageViewer",
        props: {
            index: {
                type: Number,
                default: 0
            },
            page: {
                type: Number,
                default: 0
            },
            images: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                config: {
                    imgMaxWidth: window.innerWidth * .8,
                    imgMaxHeight: window.innerHeight * .8
                },
                imgStyle: {
                    width: "auto",
                    height: "auto"
                },
                visible: false,
                imgVisible: false,
                imgIndex: 0,
                imgPage: 0
            }
        },
        watch: {
            visible(val) {
                if(this.images.length > 0) {
                    if(val) document.body.style.overflow = "hidden";
                    else document.body.style.overflow = "";

                    this.imgIndex = this.index;
                    this.imgPage = this.page;
                    this.imgLoad(this.imgSize);
                } else {
                    this.visible = false;
                }
            },
            imgIndex() {
                this.imgStyle = {
                    width: "auto",
                    height: "auto"
                };
                this.imgVisible = false;
                this.imgLoad(this.imgSize);
            }
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
                    this.imgIndex = this.imgIndex-- <= 0 ? 0 : this.imgIndex;
                    if(this.imgIndex < this.imgPage * 8) this.imgPageChange("prev");
                } else if(action === "next") {
                    this.imgIndex = this.imgIndex++ >= length ? length : this.imgIndex;
                    if(this.imgIndex >= (this.imgPage + 1) * 8) this.imgPageChange("next");
                } else if(!isNaN(action)) {
                    this.imgIndex = action <= 0 ? 0 : action >= length ? length : action;
                }
            },
            pageChange(action) {
                const length = this.images.length - 1;
                if(action === "prev" && this.imgPage * 8 >= 8) this.imgPage--;
                else if(action === "next" && (this.imgPage * 8 < length && length - this.imgPage * 8 > 8)) this.imgPage++;
                document.querySelector(".image-viewer-nav-thumb > div:first-child").style.marginLeft = -(document.querySelector(".image-viewer-nav-thumb").width * this.imgPage) + "px";
            }
        }
    }
</script>
<style src="../../styles/image-viewer.css"></style>