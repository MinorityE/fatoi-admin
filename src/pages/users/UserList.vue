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
                    text: 'FirstName',
                    classses: '',
                    dataField: 'firstName'
                },
                {
                    text: 'lastName',
                    classses: '',
                    dataField: 'lastName'
                },
                {
                    text: 'User Type',
                    classses: '',
                    dataField: 'sds'
                },
                {
                    text: 'Location',
                    classses: '',
                    dataField: 'sds'
                },
                {
                    text: 'Status',
                    classses: '',
                    dataField: '',
                    default: 'Active'
                },
                {
                    text: 'Reason For Joining',
                    classses: '',
                    dataField: 'reasonForJoining',
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
        <div class="grid cards-grid  grid-cols-[repeat(auto-fill,_minmax(23%,_1fr))] gap-[30px] mb-8 mt-[50px]">

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
        <div class="grid grid-cols-10 gap-6 items-center mb-8">
            <div class="col-span-8"></div>
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
                        <td>{{ row?.firstName }}</td>
                        <td>{{ row?.lastName }}</td>
                        <td></td>
                        <td>{{renderLocation(row?.address)}}</td>
                        <td>{{renderSuspended(row?.suspended)}}</td>
                        <td>{{ renderReasons(row?.reasonForJoining) }}</td>
                        <td>
                            <button class="btn btn-ghost btn-circle " @click="showRecord(row)">
                                <img src="../../assets/eye.svg" alt="">
                            </button>
                        </td>

                    </tr>

                </tbody>
            </table>

            <div class="btn-group">
                <button v-for="(currPage, index) in pagination"
                    :class="{ 'btn': true, 'btn-active': currPage === page }" @click="onPageChange(currPage)">{{
                    currPage
                    }}</button>

            </div>
        </div>


        <div :class="{ 'modal': true, 'modal-open': openDetailModal }">
            <div class="modal-box">

                <div v-if="!detailLoading">

                    <h3 class="font-bold text-lg">{{ userData.bio }}</h3>

                    <div class="flex flex-wrap gap-6 items-center">


                        <div class="form-control w-[48%]">
                            <label class="label ">
                                <span class="label-text">First Name</span>
                                <p>{{ userData.firstName }}</p>
                            </label>

                        </div>
                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Contact</span>
                                <p>{{ userData.phone }}</p>
                            </label>

                        </div>


                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Last Name</span>
                                <p>{{ userData.lastName }}</p>
                            </label>

                        </div>


                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Company</span>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Industry</span>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Education</span>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Skills</span>
                                <p><span v-for="(skill, index) in userData.skills">{{ skill.name }}</span></p>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Work Experience</span>
                            </label>
                        </div>
                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Linked In</span>
                                <p>{{ userData.linkedInUrl }}</p>
                            </label>
                        </div>
                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Email Address</span>
                                <p>{{ userData.email }}</p>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">Founder Name</span>
                            </label>
                        </div>

                        <div class="form-control w-[48%]">
                            <label class="label">
                                <span class="label-text">VC Name</span>
                            </label>
                        </div>
                    </div>
                </div>


                <div class="modal-action">
                    <label for="my-modal" @click="openDetailModal = false" class="btn">Close</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cards-grid {
  .card {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-color: #fff;
    .card-title {
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      ~ p {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
}
</style>
