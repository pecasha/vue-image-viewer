import type Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $imageViewer: any;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        imageViewer?: any;
    }
}
