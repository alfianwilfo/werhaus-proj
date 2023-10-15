<script>
export default {
    name: 'SidebarComp'
}
</script>

<template>
    <div class="sticky top-0 flex flex-col h-screen px-2 bg-rose-200 gap-y-20">
        <div>
            <p class="mt-10 text-2xl font-bold text-center capitalize text-rose-600">Werhaus Inventory</p>
        </div>
        <div class="flex flex-col">
            <router-link to="/dashboard" class="flex items-center py-2 rounded hover:bg-white">
                <div class="flex flex-row gap-x-5">
                    <div>
                        <img src="../assets/dashboard.svg" class="w-10"> 
                    </div>
                    <div class="flex items-center justify-center">
                        <p class="text-xl text-rose-600">Dashboard</p>
                    </div>
                </div>
            </router-link>
            <router-link to="/item" class="flex items-center py-2 rounded hover:bg-white">
                <div class="flex flex-row gap-x-5">
                    <div>
                        <img src="../assets/box.svg" class="w-9"> 
                    </div>
                    <div class="flex items-center justify-center">
                        <p class="text-xl text-rose-600">Item</p>
                    </div>
                </div>
            </router-link>
            <router-link to="/so" class="flex items-center py-2 rounded hover:bg-white">
                <div class="flex flex-row gap-x-5">
                    <div>
                        <img src="../assets/so.svg" class="w-9"> 
                    </div>
                    <div class="flex items-center justify-center">
                        <p class="text-xl text-rose-600">Stockopname</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>