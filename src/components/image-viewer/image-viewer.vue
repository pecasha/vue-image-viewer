<template>
    <transition name="image-viewer-fade">
        <div class="image-viewer" v-if="visible">
            <i class="image-viewer-close image-viewer-icon-close" @click="visible=false"></i>
            <div class="image-viewer-content">
                <img :src="images[index].url" :alt="images[index].name?images[index].name:'图片'+(index+1)" :width="imgStyle.width" :height="imgStyle.height" v-show="imgVisible">
                <div class="image-viewer-info">
                    <p>{{images[index].name?images[index].name:'图片'+(index+1)}}({{(index+1)+'/'+images.length}})</p>
                    <a :href="images[index].url" target="_blank">下载原图</a>
                </div>
                <div class="image-viewer-content-prev" @click="imgChange('prev')"><i class="image-viewer-icon-left"></i></div>
                <div class="image-viewer-content-next" @click="imgChange('next')"><i class="image-viewer-icon-right"></i></div>
            </div>
            <div class="image-viewer-nav">
                <div class="image-viewer-nav-prev" @click="pageChange('prev')"><i class="image-viewer-icon-left"></i></div>
                <div class="image-viewer-nav-main">
                    <div class="image-viewer-nav-thumb">
                        <div v-for="(il,i) in images" :class="{active:i===index}" :alt="il.name?il.name:'图片'+(i+1)" :title="il.name?il.name:'图片'+(i+1)" :style="{backgroundImage:'url('+il.url+')'}" @click="imgChange(i)"></div>
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
                index: 0,
                page: 0,
                images: []
            }
        },
        watch: {
            visible(val) {
                if(this.images.length > 0) {
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
        methods: {
            imgLoad(callback) {
                setTimeout(() => {
                    const $img = document.querySelector(".image-viewer-content > img");
                    let count = 0;
                    const timer = setInterval(() => {
                        count++;
                        if($img.complete || count) {
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
            }
        }
    }
</script>
<style lang="less" src="../../styles/image-viewer.less"></style>