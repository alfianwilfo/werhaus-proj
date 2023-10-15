<script>
import layout from '../layouts/AppLayoutDefault.vue'

export default {
    components: { layout },
    name: 'WerhausPage'
}
</script>
<template>
    <layout>
        <div class="flex flex-col">
            <div class="flex flex-row-reverse gap-x-5">
                <router-link to="/item/create" class="px-5 py-2 capitalize rounded shadow-lg text-rose-600 bg-rose-200">
                    add item
                </router-link>
                <router-link to="/item/add-type" class="px-5 py-2 capitalize rounded shadow-lg text-rose-600 bg-rose-200">
                    Create Type
                </router-link>
            </div>
            dari werhaus
        </div>
    </layout>
</template>