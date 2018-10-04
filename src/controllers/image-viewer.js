export default {
    name: "imageViewer",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
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
            default: []
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
            imgVisible: false,
            imgIndex: 0,
            imgPage: 0
        }
    },
    watch: {
        "visible"() {
            if(this.images.length > 0) {
                this.imgIndex = this.index;
                this.imgPage = this.page;
                setTimeout(() => {
                    this.imgSize();
                });
            } else {
                this.$emit("close");
            }
        },
        "imgIndex"() {
            this.imgStyle = {
                width: "auto",
                height: "auto"
            };
            this.imgVisible = false;
            setTimeout(() => {
                this.imgSize();
            });
        }
    },
    methods: {
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