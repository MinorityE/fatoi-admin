<script>


import moment from 'moment'
import accessRequestService from '../../services/accessRequest.service'
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            rows: [],
            cols: [
                {
                    text: 'Full Name',
                    classses: '',
                },
                
                {
                    text: 'Type',
                    classses: ''
                },

            ],
            totalPages: 0,
            limit: 5,
            page: 1,
            pagination: [],
            selectedRows: [],
            moment: moment
        }
    },
    created() {
        this.getUsers()
    },
    watch: {

        totalPages: {
            handler: function () {
                this.pagination = this.computePagination(this.page, this.totalPages)
            },
            immediate: true,
        },
        page: {
            handler: function () {
                this.pagination = this.computePagination(this.page, this.totalPages)
            },
            immediate: true,
        },
    },
    methods: {
        getUsers() {
            accessRequestService.getAccessRequest({
                limit: this.limit,
                page: this.page,
                status:'pending'
            }).then(({ data }) => {
                console.log(data)
                this.rows = data.results.map((r) => ({ ...r, selected: false }))
                this.totalPages = data.totalPages,
                    this.page = data.page
            }).catch((err) => {
                console.log(err)
            })
        },
        onPageChange(nextPage) {
            if (nextPage !== '...') {
                this.page = nextPage
                this.getUsers()
                this.selectedRows = []
            }
        },

      
        computePagination(current_page, last_page, onSides = 1) {
            let pages = [];
            for (let i = 1; i <= last_page; i++) {

                let offset = (i == 1 || last_page) ? onSides + 1 : onSides;

                if (i == 1 || (current_page - offset <= i && current_page + offset >= i) ||
                    i == current_page || i == last_page) {
                    pages.push(i);
                } else if (i == current_page - (offset + 1) || i == current_page + (offset + 1)) {
                    pages.push('...');
                }
            }
            return pages;
        },
        selectRow(e, row, index) {
            if (e.target.checked) {
                this.selectedRows.push(row)
                this.rows[index].selected = true
            } else {
                this.selectedRows = this.selectedRows.filter((r) => r._id !== e.target.value)
                this.rows[index].selected = false
            }
        },
        selectAll(e) {
            if (e.target.checked) {
                this.selectedRows = this.rows
                this.rows = this.rows.map((r) => ({ ...r, selected: true }))

            } else {
                this.selectedRows = []
                this.rows = this.rows.map((r) => ({ ...r, selected: false }))

            }
        },
        renderType(data){
                if(data==='recruiterConfirmation'){
                    return 'Recruiters Confirmation'
                }
                if(data==='buzzConfirmation'){
                    return 'Buzz Confirmation'
                }
                if(data==='founderConfirmation'){
                    return 'Founder Confirmation'
                }
                if(data==='vcConfirmation'){
                    return 'Vc\'sConfirmation'
                }
        },
        changeStatus(row,status){

                accessRequestService.updateBulkStatus([row._id],status).then((res)=>{
                    this.getUsers()
    }).catch((err)=>{
                    console.log(err)
                })
        },

        changeStatusBulk(status){
                const ids=this.selectedRows.map((r)=>r._id)
                accessRequestService.updateBulkStatus(ids,status).then((res)=>{
                       this.getUsers()
                }).catch((err)=>{
                    console.log(err)
                })
        }



    }
}
</script>
<template>
    <div>
        <div class="flex flex-wrap gap-3 mb-8">

            <div class="card w-96  bg-base-100 shadow-md">
                <div class="card-body">
                     <div class="grid grid-cols-3 gap-4">
                         <div class="col-span-1"><i class="fa-solid fa-users text-7xl "></i></div>
                         <div class="col-span-1"> 
                             <h2 class="card-title">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card w-96  bg-base-100 shadow-md">
                <div class="card-body">
                     <div class="grid grid-cols-3 gap-4">
                         <div class="col-span-1"><i class="fa-solid fa-users text-7xl "></i></div>
                         <div class="col-span-1"> 
                             <h2 class="card-title">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card w-96  bg-base-100 shadow-md">
                <div class="card-body">
                     <div class="grid grid-cols-3 gap-4">
                         <div class="col-span-1"><i class="fa-solid fa-users text-7xl "></i></div>
                         <div class="col-span-1"> 
                             <h2 class="card-title">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card w-96  bg-base-100 shadow-md">
                <div class="card-body">
                     <div class="grid grid-cols-3 gap-4">
                         <div class="col-span-1"><i class="fa-solid fa-users text-7xl "></i></div>
                         <div class="col-span-1"> 
                             <h2 class="card-title">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
        </div>
        <div class="grid grid-cols-10 gap-4 mb-8">
            <div class="col-span-8"></div>
            <div class="flex flex-row gap-3">
                <button class="btn btn-error space-x-1" @click="changeStatusBulk('approved')" >Accept</button>

                <div class="dropdown space-x-1">
                    <button tabindex="0" class="btn btn-info  " @click="changeStatusBulk('rejected')">Reject</button>

                   
                </div>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th v-for="(col, index) in cols">{{ col.text }}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="row._id" class="hover">
                        <th>
                            <label>
                                <input v-on:change="selectRow($event, row, index)" :value="row._id"
                                    :checked="row.selected" type="checkbox" class="checkbox" /> {{index+1}}
                            </label>
                        </th>
                        <td>{{ row?.user?.firstName }} {{ row?.user?.lastName }}</td>
                        <td>{{renderType(row?.type)}}</td>
                     
                        <td>
                            <button class="btn btn-outline btn-success" @click="changeStatus(row,'approved')">ok</button>{{'  '}}
                            <button class="btn btn-outline btn-error" @click="changeStatus(row,'rejected')">cancel</button>
                        </td>

                    </tr>

                </tbody>
            </table>

            <div class="btn-group">
                <button 
                    v-for="(currPage, index) in pagination"
                        :class="{ 'btn': true, 'btn-active': currPage === page }" @click="onPageChange(currPage)">{{
                        currPage
                    }}</button>

            </div>
        </div>


     
    </div>
</template>

