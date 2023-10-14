<script>
import Sidebar from '../components/Sidebar.vue'
export default {
    components: { Sidebar },
    name: 'AppLayout',
}
</script>
<template>
    <div class="grid grid-cols-12">
        <Sidebar class="col-span-3" />
        <slot class="col-span-9" />
    </div>
</template>