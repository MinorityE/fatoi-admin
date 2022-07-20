<script>

import reportService from '../../services/report.service'
import userService from '../../services/user.service'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            rows: [],
            cols: [
                {
                    text: 'User',
                },
                {
                    text: 'Reported By'
                },
                {
                    text: 'Reasons',
                },
                // {
                //     text: 'Action Taken',
                // }
            ],
            totalPages: 0,
            limit: 5,
            page: 1,
            openDetailModal: false,
            userData: null,
            detailLoading: true,
            pagination: [],
            selectedRows: [],
            moment: moment
        }
    },
    created() {
        this.getReports()
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
        getReports() {
            reportService.getReports({
                limit: this.limit,
                page: this.page
            }).then(({ data }) => {
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
        showRecord(data) {
            this.userData = null
            this.openDetailModal = true
            this.getDetails(data._id)
        },
        getDetails(id) {
            this.detailLoading = true
            userService.getUser(id).then(({ data }) => {
                this.userData = data

                this.detailLoading = false
            }).catch((err) => {
                console.log(err)
            })
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
        deleteSelected() {
            const userIds = this.selectedRows.map((r) => r?.reportedUser?._id)
            if(userIds.length===0){
                this.$swal('No User Selected', 'Cannot Delete', 'warning');
                return
            }
             const ids = this.selectedRows.map((r) => r._id)
            userService.deleteBulkUsers(userIds).then((res) => {
                reportService.takeActionBulkUser(ids,'deleted').then(()=>{}).then(()=>{
                    this.getReports()
                    this.$swal('Deleted', 'Users has been deleted successfully', 'success');
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err) => {
                this.$swal('Couldn\'t Delete', 'Something went wrong', 'error');
            })
        },
        suspendSelected(time) {
            
            const userIds = this.selectedRows.map((r) => r?.reportedUser?._id)
             if(userIds.length===0){
                this.$swal('No User Selected', 'Cannot Suspend', 'warning');
                return
            }
            const ids = this.selectedRows.map((r) => r._id)
            userService.suspendBulkUsers(userIds, time).then((res) => {
                reportService.takeActionBulkUser(ids,'suspened').then((res)=>{
                    console.log(res)
                    this.getReports()
                    this.$swal('Suspened', 'Users has been suspeneded successfully', 'success');
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err) => {
                this.$swal('Couldn\'t suspend', 'Something went wrong', 'error');
            })
        },
        renderReasons(reasons){
            return reasons.toString() 
        }

    }
}
</script>
<template>
    <div class="">
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
                            <p>Totals Recruiters</p>
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
                            <p>Total Hiring Managers</p>
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
                            <p>Total Active</p>
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
                
               
            </div>

            <div class="right flex gap-[50px] flex-1 items-center justify-end md:flex-none flex-wrap ">
                <button class="btn btn-fatou-red border-none w-[100px] min-h-[43px] h-[43px]"  @click="deleteSelected">Delete</button>
                     <div class="dropdown space-x-1">
                    <button tabindex="0" class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Suspend</button>

                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 right-0 mt-2">
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(12, 'hours'))">12 Hours</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(2, 'days'))">2 Days</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(5, 'days'))">5 Days</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(1, 'months'))">1 Months</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(2, 'months'))">2 Months</li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" v-on:change="selectAll($event)" />
                            </label>
                        </th>
                        <th v-for="(col, index) in cols">{{ col.text }}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in rows" :key="row._id" class="hover">
                        <th>
                            <label>
                                <input v-on:change="selectRow($event, row, index)" :value="row._id"
                                    :checked="row.selected" type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>{{ row?.reportedUser?.firstName+' '+row?.reportedUser?.lastName   }}</td>
                        <td>{{ row?.reportedBy?.firstName+' '+row?.reportedBy?.lastName   }}</td>
                        <td>{{renderReasons(row?.reasons)}}</td>
                        <td>{{row.actionTaken}}</td>
                     
                        <!-- <td>
                            <button class="btn btn-ghost btn-circle " @click="showRecord(row)">
                                <img src="../../assets/eye.svg" alt="">
                            </button>
                        </td> -->

                    </tr>

                </tbody>
            </table>

            <div class="btn-group justify-center py-5">
               <button v-for="(currPage, index) in pagination" v-bind:key="{index}"
                    :class="{ 'btn btn-ghost bg-[#077685]/[.25] hover:btn-fatou': true, 'btn-active btn-fatou': currPage === page }" @click="onPageChange(currPage)">{{
                    currPage
                    }}
                </button>

            </div>
        </div>


     
    </div>
</template>

<style lang="scss" scoped>

</style>
