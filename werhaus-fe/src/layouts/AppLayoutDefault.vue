<script>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue';
export default {
    components: { Sidebar, Topbar },
    name: 'AppLayout',
    data() {
        return {
            name: ''
        }
    },
    mounted () {
        if (this.$route.name === 'so') {
            this.name = 'stockopname'
            
        } else {
            this.name = this.$route.name
        }
    }
}
</script>
<template>
    <div class="grid grid-cols-12">
        <Sidebar class="col-span-3" />
        <div class="flex flex-col col-span-9 gap-y-5">
            <Topbar />
            <div class="flex flex-col px-5 gap-y-10">
                <div class="flex flex-col gap-y-2">
                    <p class="text-3xl font-light capitalize">{{ name }} page</p>
                    <div class="w-full h-0.5 bg-gray-100" />
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>