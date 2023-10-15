<script>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue';
export default {
    components: { Sidebar, Topbar },
    name: 'AppLayout',
}
</script>
<template>
    <div class="grid grid-cols-12">
        <Sidebar class="col-span-3" />
        <div class="flex flex-col col-span-9">
            <Topbar />
            <slot />
        </div>
    </div>
</template>