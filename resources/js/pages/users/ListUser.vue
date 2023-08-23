<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const users = ref([]);

// const form = reactive({
//     name: '',
//     email: '',
//     password: ''
// })


const getUser = () => {
    axios.get('/api/users')
        .then((response) => {
            users.value = response.data
        })
}

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
})

const createUser = (values, { resetForm }) => {
    axios.post('/api/users', values)
    .then((response) => {
            users.value.unshift(response.data)
            $('#createUserModal').modal('hide')
            resetForm()
        })
}

// const createUser = () => {
//     axios.post('/api/users', form)
//         .then((response) => {
//             users.value.unshift(response.data)
//             form.name = '';
//             form.email = '';
//             form.password = '';
//             $('#createUserModal').modal('hide')
//         })
// }

onMounted(() => {
    getUser()
})
</script>
<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">User Page</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <button type="button" class="btn btn-primary mb-2" data-toggle="modal" data-target="#createUserModal">
                Add New User
            </button>
            <div class="card">
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="width: 10px;">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registered Date</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td> - </td>
                                <td> - </td>
                                <td> - </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="createUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <Field type="text" class="form-control" id="name" :class="{'is-invalid':errors.name}" placeholder="Enter Name"
                                    name="name"/>
                                    <span class="valid">{{ errors.name }}</span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <Field type="email" class="form-control" id="email" :class="{'is-invalid':errors.email}" placeholder="Enter Email"
                                    name="email"/>
                                    <span class="valid">{{ errors.email }}</span>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <Field type="password" class="form-control" id="password" :class="{'is-invalid':errors.password}" placeholder="******"
                                    name="password"/>
                                    <span class="valid">{{ errors.password }}</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary" @click="createUser">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    </template>
<style scoped>
    .valid {
        color: #dc3545;
    }
</style>
