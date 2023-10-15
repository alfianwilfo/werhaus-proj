<script>
import axios from 'axios'
import layout from '../layouts/AppLayoutDefault.vue'
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useToast } from "vue-toastification";

export default {
    components: { layout, Field, Form, ErrorMessage },
    name: 'CreateItemPage',
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
        return {
            name: '',
        }
    },
    methods: {
        submitHandler() {
            this.url = 'http://localhost:8000/items/storeType'
            axios({ url: this.url, method: 'post', data: { name: this.name } })
                .then(({ data }) => {
                    if (data.code === 201) {
                        this.toast.success(data.message[0])
                        // this.toast.success('Now you can login with your account')
                    } else {
                        this.toast.error(data.message[0])
                    }
                })
                .catch(err => {
                    this.toast.error(err)
                })
        },
        validateName(value) {
            if (!value) {
                return 'This field is required';
            }
            return true
        },
        validateCount(value) {
            if (value < 0) {
                return 'This field is cannot be negative';
            }
            if (value === 0) {
                return 'Count minimal 1';
            }
            return true
        }
    }
}
</script>
<template>
    <layout>
        <Form @submit="submitHandler" class="flex flex-col px-10 gap-y-6">
            <div class="grid grid-cols-2 gap-x-6">
                <div class="flex flex-col col-span-1">
                    <p class="font-semibold capitalize">name</p>
                    <Field v-model="name" name="name" type="text" :rules="validateName" class="px-5 py-2 border focus:outline-none" />
                    <span class="h-4">
                        <ErrorMessage name="name" class="text-sm italic text-red-600"/>
                    </span> 
                </div>
            </div>
            <button class="py-2 font-semibold text-white capitalize rounded bg-rose-600">add</button>
        </Form>
    </layout>
</template>