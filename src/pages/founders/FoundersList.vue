<script>

import userService from '../../services/user.service'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            rows: [],
            cols: [
                {
                    text: 'ID',
                    classses: '',
                    dataField: 'id'
                },
                {
                    text: 'Company Name',
                    classses: '',
                    dataField: 'lastName'
                },
                {
                    text: 'Location',
                    classses: '',
                    dataField: 'sds'
                },
                {
                    text: 'Gender',
                    classses: '',
                    dataField: 'sds'
                },
                {
                    text: 'Added by',
                    classses: '',
                    dataField: '',
                    default: 'Active'
                },
                {
                    text: 'Status',
                    classses: '',
                    dataField: '',
                    default: 'Active'
                },


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
            userService.getUsers({
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
            const ids = this.selectedRows.map((r) => r._id)
            userService.deleteBulkUsers(ids).then((res) => {
                this.getUsers()
                console.log(res)
               this.$swal('Deleted','Users has been deleted successfully','success');
            }).catch((err) => {
            this.$swal('Couldn\'t Delete','Something went wrong','error');
            })
        },
            suspendSelected(time) {
                const ids = this.selectedRows.map((r) => r._id)
                userService.suspendBulkUsers(ids, time).then((res) => {
                    this.getUsers()
                this.$swal('Suspened','Users has been suspeneded successfully','success');
                }).catch((err) => {
                this.$swal('Couldn\'t suspend','Something went wrong','error');
                })
            },
        renderSuspended(time){
            console.log(time)
            if(moment(time).isAfter(moment())){
                return 'Suspened'
            }
            return 'Active'
        },
        renderReasons(reason) {
            return reason.toString()
        },
        renderLocation(address){
            if(address.state && address.city){
                return address.state+', '+address.city
            }
            return ''
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
                        <option class="text-[#7B7B7B]" disabled selected>Select Founder</option>
                        <option class="text-[#333]">Saidatech</option>
                        <option class="text-[#333]">Fatou</option>
                        <option class="text-[#333]">Saidatech</option>
                    </select>
                </div>
                <div class="button-div">
                     <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Filter</button>
                </div>
            </div>

            <div class="right flex gap-[50px] flex-1 items-center justify-end md:flex-none flex-wrap ">
                     <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Add</button>
                     <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Upload</button>
            </div>

        </div>
        <!-- <div class="flex items-center mb-8">
            <div class="flex flex-row gap-3">
                <button class="btn btn-error space-x-1" @click="deleteSelected">Delete</button>

                <div class="dropdown space-x-1">
                    <button tabindex="0" class="btn btn-info  ">Suspend</button>

                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(12, 'hours'))">12 Hours</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(2, 'days'))">2 Days</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(5, 'days'))">5 Days</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(1, 'months'))">1 Months</li>
                        <li class='cursor-pointer' @click="suspendSelected(moment().add(2, 'months'))">2 Months</li>
                    </ul>
                </div>
            </div>
        </div> -->
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
                        <td>{{ row?._id }}</td>
                        <td>{{ row?.lastName }}</td>
                        <td></td>
                        <td>{{renderLocation(row?.address)}}</td>
                        <td>   
                            <div class="flex items-center gap-[10px]">
                                 <img src="https://api.lorem.space/image/face?hash=33791" class="w-[30px] h-[30px] rounded-full object-cover " />
                                 <span class="text-[14px] font-[300]">Albert Flores</span>
                            </div>
                        </td>
                        
                        <td :class="renderSuspended(row?.suspended) === 'Active' ?  'text-[#419044]' : 'text-red-600'">
                            {{renderSuspended(row?.suspended)}}
                        </td>
                        <td>
                            <button class="btn btn-ghost btn-circle " @click="showRecord(row)">
                                <img src="../../assets/eye.svg" alt="">
                            </button>
                        </td>

                    </tr>

                </tbody>
            </table>

        </div>

  
            <div class="btn-group flex justify-center py-5">
                <button v-for="(currPage, index) in pagination" v-bind:key="{index}"
                    :class="{ 'btn btn-ghost bg-[#077685]/[.25] hover:btn-fatou': true, 'btn-active btn-fatou': currPage === page }" @click="onPageChange(currPage)">{{
                    currPage
                    }}
                </button>

            </div>
        <div :class="{ 'modal modal-middle': true, 'modal-open': openDetailModal }">
            <div class="modal-box md:max-w-[720px] p-[50px]">

                <div v-if="!detailLoading">
                    <div class="flex justify-between modal-header">
                    <img src="../../assets/founder.svg" alt="founder">
                     <label for="my-modal" @click="openDetailModal = false" class="btn glass btn-ghost hover:btn-fatou hover:text-[#fff] text-[#333] w-12 p-[3px] h-12 rounded-full text-[16px]"><i class="fas fa-times  "></i></label>
                    </div>
                 <div class="flex gap-[24px_50px] flex-wrap justify-between">
                    <div class="user-info">
                        <label>Founder Name</label>
                        <h4>Saidatech</h4>
                    </div>
                    <div class="user-info">
                        <label>Added By</label>
                        <h4>Albert Flores</h4>
                    </div>

                    <div class="user-info">
                        <label>Email</label>
                        <h4>saidatech@gmail.com</h4>
                    </div>
                    <div class="user-info">
                        <label>Industry</label>
                        <h4>Internet</h4>
                    </div>

                    <div class="user-info">
                        <label>State</label>
                        <h4>New York</h4>
                    </div>
                    <div class="user-info">
                        <label>Sector</label>
                        <h4>Devops</h4>
                    </div>

                    <div class="user-info">
                        <label>Year</label>
                        <h4>2022</h4>
                    </div>
                    <div class="user-info">
                        <label>Funding Round</label>
                        <h4>Private</h4>
                    </div>

                       <div class="user-info">
                        <label>Linkedin</label>
                        <h4>Linkedin</h4>
                    </div>
                    <div class="user-info">
                        <label>Website</label>
                        <h4>www.website.com</h4>
                    </div>
                 </div>

                 <div class="description">
                    <h4>About Company</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor.Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam lectus magna fringilla,</p>
                 </div>

               
                </div>
              
                  <div class="text-center" v-if="detailLoading">
                    <progress class="progress fatou-progress w-56 mx-auto"></progress>
                  </div>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
