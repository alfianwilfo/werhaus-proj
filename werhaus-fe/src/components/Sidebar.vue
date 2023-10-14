<script>
export default {
    name: 'SidebarComp',
}
</script>

<template>
    <div class="h-screen sticky top-0 bg-rose-200 px-5 flex flex-col gap-y-20">
        <div>
            <p class="text-rose-600 font-bold text-center text-2xl capitalize mt-10">Werhaus Inventory</p>
        </div>
        <div>
            <button class="flex justify-center items-center ">
                <div class="flex flex-row">
                    <div>
                        <img src="../assets/dashboard.svg" class="w-10"> 
                    </div>
                    <div class="flex justify-center items-center">
                        <p class="text-xl text-rose-600">Dashboard</p>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>