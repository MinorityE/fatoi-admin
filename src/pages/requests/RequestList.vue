<script>


import moment from 'moment'
import accessRequestService from '../../services/accessRequest.service'
import notificationService from '../../services/notification.service'
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
        changeStatus(row,status='rejected'){
            console.log(row)
            const notificationData={
                user:row.user._id,
                title:'Access Request Approval',
                description:status==='approved'?'Your request has been approved!':'Your request has been rejected!',
                type:'RecruiterApproval'
            }
           
                accessRequestService.updateBulkStatus([row._id],status).then((res)=>{
                    notificationService.createNotification(notificationData).then((res)=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
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
       <div class="grid cards-grid   gap-[30px] mb-8 mt-[50px]">

            <div class="card">
                <div class="card-body">
                     <div class="flex  gap-6 items-center">
                         <div class="col-span-1">
                             <img src="../../assets/userIcon.svg" alt="">
                         </div>
                         <div class="col-span-1"> 
                             <h2 class="card-title mb-0">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                     <div class="flex gap-6 items-center">
                         <div class="col-span-1">
                             <img src="../../assets/userIcon.svg" alt="">
                         </div>
                         <div class="col-span-1"> 
                             <h2 class="card-title mb-0">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                     <div class="flex gap-6 items-center">
                         <div class="col-span-1">
                              <img src="../../assets/userIcon.svg" alt="">
                         </div>
                         <div class="col-span-1"> 
                             <h2 class="card-title mb-0">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                     <div class="flex gap-6 items-center">
                         <div class="col-span-1">
                             <img src="../../assets/userIcon.svg" alt="">
                         </div>
                         <div class="col-span-1"> 
                             <h2 class="card-title mb-0">200</h2>
                            <p>Total Users</p>
                        </div>
                     </div>
                   
                </div>
            </div>
        </div>
        <div class="flex gap-[20px] flex-wrap mb-6">
            <div class="left flex gap-[20px_50px] flex-auto items-center sm:flex-nowrap flex-wrap">
                <div class="search sm:max-w-[300px] relative flex-auto">
                    <input type="search" placeholder="Search Users Name" class="input w-full h-[43px] pl-[61px] input-fatou  focus:border-fatou text-[#7B7B7B] " />
                    <img src="../../assets/search.svg" alt="search" class="absolute left-[19px] top-[12px] ">
                </div>
                <div class="select-div sm:max-w-[200px] flex-auto w-full">
                    <select class="select w-full text-[14px] font-[400] text-[#7B7B7B] input-fatou focus:border-fatou h-[43px] min-h-[43px]">
                        <option class="text-[#7B7B7B]" disabled selected>Select Request Type</option>
                        <option class="text-[#333]">Recruiters Confirmation</option>
                        <option class="text-[#333]">Hiring Manager Confirmation</option>
                        <option class="text-[#333]">VCs Confirmation</option>
                    </select>
                </div>
                <div class="button-div">
                     <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Filter</button>
                </div>
            </div>

            <div class="right flex gap-[50px] flex-1 items-center justify-end md:flex-none flex-wrap ">
                     <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]"  @click="changeStatusBulk('approved')">Accept</button>
                     <button class="btn btn-fatou-red w-[100px] min-h-[43px] h-[43px] p-[12px_7px]"  @click="changeStatusBulk('rejected')">Reject</button>
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
            <div class="btn-group flex justify-center py-5">
                <button v-for="(currPage, index) in pagination" v-bind:key="{index}"
                    :class="{ 'btn btn-ghost bg-[#077685]/[.25] hover:btn-fatou': true, 'btn-active btn-fatou': currPage === page }" @click="onPageChange(currPage)">{{
                    currPage
                    }}
                </button>

            </div>
        </div>


     
    </div>
</template>

