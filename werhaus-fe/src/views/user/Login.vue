<script>
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useToast } from "vue-toastification";

export default {
    components: { Field, Form, ErrorMessage },
    name: 'LoginPage',
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
        return {
            mode: 'login',
            employee_detail: {
                email: '',
                name: '',
                password: ''
            },
            isShowPassword: false,
            isShowPasswordConfirm: false
        };
    },
    methods: {
        submitHandler() {
            if (this.mode === 'register') {
                let url = 'http://localhost:8000/users/registers'
                axios({ url, method: 'post', data: { employee_detail: this.employee_detail } })
                .then(({ data }) => {
                    if (data.code === 201) {
                        this.toast.success('Now you can login with your account')
                    } else {
                        this.toast.error(data.message[0])
                    }
                }).catch(err => {
                    this.toast.error(err)
                })
            } else if (this.mode === 'login') {
                const url = 'http://localhost:8000/users/logins'
                axios({ url, method: 'post', data: { employee_detail: this.employee_detail } })
                .then(({ data }) => {
                    if (data.code === 200) {
                        console.log(data, 'dataaaaaa');
                    } else {
                        this.toast.error(data.message[0])
                    }
                })
                .catch(err => {
                    this.toast.error(err)
                })
            }
        },
        validateEmail(value) {
            if (!value) {
                return 'This field is required';
            }

            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }

            return true;
        },
        validateName(value) {
            console.log(value, 'vall');
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validatePassword(value) {
            if (!value) {
                return 'This field is required';
            }
            if (value.length < 6) {
                return 'password must be at least 6 characters';
            }
            return true
        },
        confirmPassword(value) {
            if (!value) {
                return 'This field is required';
            }
            if (value !== this.employee_detail.password) {
                return 'Passwords do not match';
            }
            return true
        },
    },
}
</script>

<template>
    <div class="w-screen h-screen flex flex-row">
        <div class="w-full bg-white flex items-center justify-center">
            <div class="flex flex-col gap-y-5 bg-rose-200 w-1/3 py-10 rounded shadow-xl">
                <p class="text-rose-600 font-bold text-center text-2xl capitalize">Werhaus Inventory <br> {{ mode }} </p>
                <Form v-if="mode === 'login'" @submit="submitHandler" class="flex flex-col gap-y-6 px-10">
                    <div class="flex flex-col">
                        <Field v-model="employee_detail.email" name="email" type="email" :rules="validateEmail" placeholder="Email" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="email" class="text-red-600 text-sm italic"/>
                        </span> 
                    </div>
                    <div class="flex flex-col">
                        <Field v-model="employee_detail.password" name="password" :rules="validatePassword" type="password" placeholder="Password" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="password" class="text-red-600 text-sm italic"/>
                        </span> 
                    </div>
                    <button class="bg-rose-600 text-white rounded py-2 font-semibold">Login</button>
                    <p>Not have account ? <span @click="mode ='register'" class="cursor-pointer">Register here</span> </p>
                </Form>
                <Form v-if="mode === 'register'" @submit="submitHandler" class="flex flex-col gap-y-6 px-10">
                    <div class="flex flex-col">
                        <Field name="email" type="email" :rules="validateEmail" placeholder="Email" v-model="employee_detail.email" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="email" class="text-red-600 text-sm italic"/>
                        </span> 
                    </div>
                    <div class="flex flex-col">
                        <Field name="name" type="text" :rules="validateName" placeholder="Name" v-model="employee_detail.name" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="name" class="text-red-600 text-sm italic" />
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <Field name="password" :rules="validatePassword" type="text" placeholder="Create Password" v-model="employee_detail.password" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="password" class="text-red-600 text-sm italic" />
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <Field name="confirmPassword" :rules="confirmPassword" type="text" placeholder="Confirm Password" class="border py-2 focus:outline-none px-5" />
                        <span class="h-4">
                            <ErrorMessage name="confirmPassword" class="text-red-600 text-sm italic" />
                        </span>
                    </div>
                    <button class="bg-rose-600 text-white rounded py-2 font-semibold">Register</button>
                    <p>Have account ? <span @click="mode ='login'" class="cursor-pointer">Login here</span> </p>
                </Form>
            </div>
        </div>
    </div>
</template>