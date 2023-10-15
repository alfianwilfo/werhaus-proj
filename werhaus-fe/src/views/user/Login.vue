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
    <div class="flex flex-row w-screen h-screen">
        <div class="flex items-center justify-center w-full bg-white">
            <div class="flex flex-col w-1/3 py-10 rounded shadow-xl gap-y-5 bg-rose-200">
                <p class="text-2xl font-bold text-center capitalize text-rose-600">Werhaus Inventory <br> {{ mode }} </p>
                <Form v-if="mode === 'login'" @submit="submitHandler" class="flex flex-col px-10 gap-y-6">
                    <div class="flex flex-col">
                        <Field v-model="employee_detail.email" name="email" type="email" :rules="validateEmail" placeholder="Email" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="email" class="text-sm italic text-red-600"/>
                        </span> 
                    </div>
                    <div class="flex flex-col">
                        <Field v-model="employee_detail.password" name="password" :rules="validatePassword" type="password" placeholder="Password" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="password" class="text-sm italic text-red-600"/>
                        </span> 
                    </div>
                    <button class="py-2 font-semibold text-white rounded bg-rose-600">Login</button>
                    <p>Not have account ? <span @click="mode ='register'" class="cursor-pointer">Register here</span> </p>
                </Form>
                <Form v-if="mode === 'register'" @submit="submitHandler" class="flex flex-col px-10 gap-y-6">
                    <div class="flex flex-col">
                        <Field name="email" type="email" :rules="validateEmail" placeholder="Email" v-model="employee_detail.email" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="email" class="text-sm italic text-red-600"/>
                        </span> 
                    </div>
                    <div class="flex flex-col">
                        <Field name="name" type="text" :rules="validateName" placeholder="Name" v-model="employee_detail.name" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="name" class="text-sm italic text-red-600" />
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <Field name="password" :rules="validatePassword" type="text" placeholder="Create Password" v-model="employee_detail.password" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="password" class="text-sm italic text-red-600" />
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <Field name="confirmPassword" :rules="confirmPassword" type="text" placeholder="Confirm Password" class="px-5 py-2 border focus:outline-none" />
                        <span class="h-4">
                            <ErrorMessage name="confirmPassword" class="text-sm italic text-red-600" />
                        </span>
                    </div>
                    <button class="py-2 font-semibold text-white rounded bg-rose-600">Register</button>
                    <p>Have account ? <span @click="mode ='login'" class="cursor-pointer">Login here</span> </p>
                </Form>
            </div>
        </div>
    </div>
</template>