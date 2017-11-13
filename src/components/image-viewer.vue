<template>
    <transition name="image-viewer-fade" v-if="visible">
        <div class="image-viewer">
            <i class="image-viewer-close image-viewer-icon-close" @click="$emit('close')"></i>
            <div class="image-viewer-content">
                <img :src="images[imgIndex].url" :alt="images[imgIndex].name?images[imgIndex].name:'图片'+(imgIndex+1)" :width="imgStyle.width" :height="imgStyle.height" v-show="imgVisible">
                <div class="image-viewer-info">
                    <p>{{images[imgIndex].name?images[imgIndex].name:'图片'+(imgIndex+1)}}({{(imgIndex+1)+'/'+images.length}})</p>
                    <a :href="images[imgIndex].url" target="_blank">下载原图</a>
                </div>
                <div class="image-viewer-content-prev" @click="imgChange('prev')"><i class="absolute-m image-viewer-icon-left"></i></div>
                <div class="image-viewer-content-next" @click="imgChange('next')"><i class="absolute-m image-viewer-icon-right"></i></div>
            </div>
            <div class="image-viewer-nav">
                <div class="image-viewer-nav-prev" @click="pageChange('prev')"><i class="absolute-cm image-viewer-icon-left"></i></div>
                <div class="image-viewer-nav-main">
                    <div class="image-viewer-nav-thumb">
                        <div v-for="(il,i) in images" :class="{active:i==imgIndex}" :alt="il.name?il.name:'图片'+(i+1)" :title="il.name?il.name:'图片'+(i+1)" :style="{backgroundImage:'url('+il.url+')'}" @click="imgChange(i)"></div>
                    </div>
                </div>
                <div class="image-viewer-nav-next" @click="pageChange('next')"><i class="absolute-cm image-viewer-icon-right"></i></div>
            </div>
        </div>
    </transition>
</template>

<style src="../styles/image-viewer.css"></style>
<script src="../controllers/image-viewer.js"></script>