<script>

import founderService from '../../services/founder.service'
import notificationService from '../../services/notification.service'
import moment from 'moment'
import useVuelidate from '@vuelidate/core';
import {required, helpers, url, email, numeric} from '@vuelidate/validators';
import { sectorOptions, industryOptions } from '../../services/constants'

export default {

    data() {
        return {
            v$: useVuelidate(),
            rows: [],
            cols: [

                {
                    text: 'Company Name',
                    classses: '',
                },
                {
                    text: 'Claimed By',
                    classses: '',
                },
                {
                    text: 'Location',
                    classses: '',
                },
                {
                    text: 'Action',
                    classses: '',
                },

            ],
            totalPages: 0,
            limit: 5,
            page: 1,
            pagination: [],
            selectedRows: [],
            moment: moment,
            showAddModal: false,



            // genders: [
            //     { name: 'Female', value: 'female' },
            //     { name: 'Male', value: 'male' },
            //     { name: 'Other', value: 'other' }
            // ],
            foundingRounds: [
                'Private',
                'Angel',
                'Seed',
                'Series A',
                'Series B',
                'Series C',
                'Series E',
                'Series F',
                'Public'
            ],
            founderForm: {
                email: '',
                name: '',
                industry: 'none',
                sector: 'none',
                founded: '',
                // gender: 'gender',
                employeeCount: '',
                bio: '',
                foundingRound: 'Founding Round',
                additionalFounder: '',
                additionalFounderTwo: '',
                website: '',
                facebook: '',
                instagram: '',
                twitter: '',
                linkdIn: '',

                crunchbase: '',

                logo: '',
                user: '',
                hiring: false,

            },
            industryOptions: industryOptions,
            sectorOptions: sectorOptions,
        }

    },
    validations() {
        return {
            founderForm: {
                email: {
                    required: helpers.withMessage('Email is required', required),
                    email: helpers.withMessage('Must be a valid email', email),
                },
                name: { required: helpers.withMessage('please include a company name', required) },
                sector: { required: helpers.withMessage('please include a sector', required), },
                industry: { required: helpers.withMessage('please include a industry', required), },
                // gender: { required: helpers.withMessage('please include a gender', required), },
                founded: { required: helpers.withMessage('please include a year founded', required), },
                foundingRound: { required: helpers.withMessage('please include a founding round', required), },
                employeeCount: { required: helpers.withMessage('please include an employee number', required), numeric, },
                bio: { required: helpers.withMessage('please include a bio', required), },
                additionalFounder: {
                    // required: helpers.withMessage(
                    //   'please include an additional founder',
                    //   required
                    // ),
                },
                additionalFounderTwo: {
                    // required: helpers.withMessage(
                    //   'please include an additional founder',
                    //   required
                    // ),
                },
                hiring: { required: helpers.withMessage('The hiring field is required', required), },
                user: { required: helpers.withMessage('The user field is required', required), },

                website: { url: helpers.withMessage('Url not valid', url), },

                facebook: { url: helpers.withMessage('Url not valid', url), },
                twitter: { url: helpers.withMessage('Url not valid', url), },
                instagram: { url: helpers.withMessage('Url not valid', url), },
                linkdIn: { url: helpers.withMessage('Url not valid', url), },
                mediaLink: { url: helpers.withMessage('Url not valid', url), },
                crunchbase: { url: helpers.withMessage('Url not valid', url), },
            },
        };
    },
    created() {
        this.getNotApproved()
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
        getNotApproved() {
            founderService.getNotApproved({
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
                this.getNotApproved()
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
        changeStatus(row, status) {
            this.changeStatusCall([row._id], status)

        },
        changeStatusBulk(status) {
            const ids = this.selectedRows.map((r) => r._id)
            this.changeStatusCall(ids, status)
        },
        changeStatusCall(ids, status) {
            this.$swal.showLoading()
            founderService.updateBulkStatus(ids, status).then((res) => {
                if(status) this.$swal('Approved', 'Founders have been approved ', 'success');
                if(!status) this.$swal('Declined', 'Founders request for claim has been declined ', 'success');
                this.getNotApproved()
            }).catch((err) => {
                this.$swal('Opps!', 'Something went wrong ', 'error');
                console.log(err)
            })
        },

        onImageSelect(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.founderForm.logo = files[0];
            if (!files.length) return;
        },
        // setGender(e, gender) {
        //     const isChecked = e.target.checked
        //     if (isChecked) {
        //         this.v$.founderForm.gender.$model = gender.value
        //     } else {
        //         this.v$.founderForm.gender.$model = null
        //     }
        // },
        isRoundSelected(round) {
            return this.v$.founderForm.foundingRound.$model === round ? true : false
        },
        setRound(e, round) {
            const isChecked = e.target.checked
            if (isChecked) {
                this.v$.founderForm.foundingRound.$model = round
            } else {
                this.v$.founderForm.foundingRound.$model = null
            }
        },
        isHiring() {
            if (this.founderForm.hiring) return true
            return false
        },
        addFounder() {
            let formData = new FormData();
            // load data body

            formData.append('logo', this.founderForm.logo);
            formData.append('name', this.v$.founderForm.name.$model);
            formData.append('email', this.v$.founderForm.email.$model);
            formData.append('sector', this.v$.founderForm.sector.$model);
            formData.append('industry', this.v$.founderForm.industry.$model);
            formData.append('founded', this.v$.founderForm.founded.$model);
            // formData.append('gender', this.v$.founderForm.gender.$model);
            formData.append('user', this.founderForm.user);
            formData.append(
                'foundingRound',
                this.v$.founderForm.foundingRound.$model
            );
            formData.append(
                'employeeCount',
                this.v$.founderForm.employeeCount.$model
            );
            formData.append('bio', this.v$.founderForm.bio.$model);
            formData.append(
                'additionalFounder',
                this.v$.founderForm.additionalFounder.$model
            );
            formData.append(
                'additionalFounderTwo',
                this.v$.founderForm.additionalFounderTwo.$model
            );
            formData.append('hiring', this.v$.founderForm.hiring.$model);
            formData.append('website', this.v$.founderForm.website.$model);
            formData.append('facebook', this.v$.founderForm.facebook.$model);
            formData.append('twitter', this.v$.founderForm.twitter.$model);
            formData.append('linkedIn', this.v$.founderForm.linkdIn.$model);
            formData.append('crunchbase', this.v$.founderForm.crunchbase.$model);
            formData.append('instagram', this.v$.founderForm.instagram.$model);

            founderService.addFounder(formData)
        },
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
                    <input type="search" placeholder="Search Users Name"
                        class="input w-full h-[43px] pl-[61px] input-fatou  focus:border-fatou text-[#7B7B7B] " />
                    <img src="../../assets/search.svg" alt="search" class="absolute left-[19px] top-[12px] ">
                </div>
                <div class="select-div sm:max-w-[200px] flex-auto w-full">
                    <select
                        class="select w-full text-[14px] font-[400] text-[#7B7B7B] input-fatou focus:border-fatou h-[43px] min-h-[43px]">
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
                <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]" @click="showAddModal = true">Add</button>
                <button class="btn btn-fatou w-[100px] min-h-[43px] h-[43px]">Upload</button>
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
                        <td>{{ row?.company.name }}</td>
                        <td>{{row?.claimedBy? row?.claimedBy?.firstName + ' ' + row?.claimedBy?.lastName:'' }}</td>
                        <td>{{ row?.claimedBy? row?.claimedBy?.address?.country:'' }}</td>
                        <td>
                            <button class="btn btn-outline btn-success"
                                @click="changeStatus(row, true)">Approve</button>{{ ' ' }}
                            <button class="btn btn-outline btn-fatou-red"
                                @click="changeStatus(row, false)">Decline</button>{{ ' ' }}
                        </td>

                    </tr>

                </tbody>
            </table>

        </div>


        <div class="btn-group flex justify-center py-5">
            <button v-for="(currPage, index) in pagination" v-bind:key="{ index }"
                :class="{ 'btn btn-ghost bg-[#077685]/[.25] hover:btn-fatou': true, 'btn-active btn-fatou': currPage === page }"
                @click="onPageChange(currPage)">{{ currPage }}
            </button>

        </div>

        <div :class="{ 'modal': true, 'modal-open': showAddModal }">
            <div class="modal-box md:max-w-[720px] p-[50px]">
                <div class="flex justify-end absolute " style="top: 10px;right: 10px;">
                    <label for="my-modal" @click="showAddModal = false"
                        class="btn glass btn-ghost hover:btn-fatou hover:text-[#fff] text-[#333] w-12 p-[3px] h-12 rounded-full text-[16px]">
                        <i class="fas fa-times  "></i>
                    </label>
                </div>
                <div>



                    <form @submit.prevent="addFounder">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- company error -->
                                <div v-if="v$.founderForm.name.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.name.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.name.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Company’s Name" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- email error -->
                                <div v-if="v$.founderForm.email.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.email.$errors[0].$message }}
                                </div>
                                <input type="email"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    v-model="v$.founderForm.email.$model" placeholder="Email" />
                            </div>

                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- sector error -->
                                <div v-if="v$.founderForm.industry.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.industry.$errors[0].$message }}
                                </div>
                                <select
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md "
                                    v-model="founderForm.industry" v-on:change="handleEdit">
                                    <option value="none" selected>Select Industry</option>

                                    <option v-for="(option, index) in industryOptions" :key="index"
                                        :value="option.value">{{ option.label }}</option>
                                </select>
                            </div>





                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- sector error -->
                                <div v-if="v$.founderForm.sector.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.sector.$errors[0].$message }}
                                </div>
                                <select v-model="founderForm.sector" v-on:change="handleEdit"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md ">
                                    <option value="none" selected>Select Sector</option>
                                    <option v-for="(option, index) in sectorOptions" :key="index" :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>





                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!--founded error -->
                                <div v-if="v$.founderForm.founded.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.founded.$errors[0].$message }}
                                </div>
                                <input type="number" v-model="v$.founderForm.founded.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Year Founded" />
                            </div>
                            <!-- <div class="w-full md:w-1/2 py-2 px-2">
                            
                                <div v-if="v$.founderForm.gender.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.gender.$errors[0].$message }}
                                </div>

                                <div
                                    class=" dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                                    <label tabindex="1"
                                        class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md">
                                        {{ v$.founderForm.gender.$model || 'Gender' }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg></label>

                                    <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10"
                                        tabindex="1">
                                        <ul class="h-50">
                                            <li v-for="(gender, index) in genders" :key="index + 'GR'">
                                                <div class="flex items-center mb-2">
                                                    <input type="checkbox"
                                                        :checked="v$.founderForm.gender.$model === gender.value"
                                                        @change="setGender($event, gender)"
                                                        class="checkbox checkbox-sm checkbox-primary" />

                                                    <span class="pl-2">{{ gender.name }}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> -->

                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- foundingRound error -->
                                <div v-if="v$.founderForm.foundingRound.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.foundingRound.$errors[0].$message }}
                                </div>

                                <div
                                    class=" dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                                    <label tabindex="1"
                                        class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md">
                                        {{
                                                v$.founderForm.foundingRound.$model || 'Founding Round'
                                        }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg></label>

                                    <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10"
                                        tabindex="1">
                                        <ul class="h-50">
                                            <li v-for="(round, index) in foundingRounds" :key="index + 'FR'">
                                                <div class="flex items-center mb-2">
                                                    <input type="checkbox" :checked="isRoundSelected(round)"
                                                        @change="setRound($event, round)"
                                                        class="checkbox checkbox-sm checkbox-primary" />

                                                    <span class="pl-2">{{ round }}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- employeeCount error -->
                                <div v-if="v$.founderForm.employeeCount.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.employeeCount.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.employeeCount.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="# of employee" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- additionalFounder error -->
                                <div v-if="v$.founderForm.additionalFounder.$error" class="text-red-600 text-xs">
                                    {{
                                            '* ' + v$.founderForm.additionalFounder.$errors[0].$message
                                    }}
                                </div>
                                <input v-model="v$.founderForm.additionalFounder.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Add additional Founder" />
                            </div>

                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- additionalFounder error -->
                                <div v-if="v$.founderForm.additionalFounderTwo.$error" class="text-red-600 text-xs">
                                    {{
                                            '* ' + v$.founderForm.additionalFounderTwo.$errors[0].$message
                                    }}
                                </div>
                                <input v-model="v$.founderForm.additionalFounderTwo.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Add additional Founder" />
                            </div>

                            <div class="w-full py-2 px-2">
                                <!-- bio error -->
                                <div v-if="v$.founderForm.bio.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.bio.$errors[0].$message }}
                                </div>
                                <textarea v-model="v$.founderForm.bio.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    name="bio" rows="3" placeholder="Brief Bio"></textarea>
                            </div>

                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- website error -->
                                <div v-if="v$.founderForm.website.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.website.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.website.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Website" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- linkdIn error -->
                                <div v-if="v$.founderForm.linkdIn.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.linkdIn.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.linkdIn.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="LinkedIn URL" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- instagram error -->
                                <div v-if="v$.founderForm.instagram.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.instagram.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.instagram.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Instagram URL" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- twitter error -->
                                <div v-if="v$.founderForm.twitter.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.twitter.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.twitter.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="Twitter URL" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- crunchbase error -->
                                <div v-if="v$.founderForm.crunchbase.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.crunchbase.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.crunchbase.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeHolder="crunchbase URL" />
                            </div>
                            <div class="w-full md:w-1/2 py-2 px-2">
                                <!-- mediaLink error -->
                                <div v-if="v$.founderForm.facebook.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.facebook.$errors[0].$message }}
                                </div>
                                <input v-model="v$.founderForm.facebook.$model"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    placeholder="facebook URL" />
                            </div>
                            <div class="w-full py-2 px-2">
                                <!-- hiring error -->
                                <div v-if="v$.founderForm.hiring.$error" class="text-red-600 text-xs">
                                    {{ '* ' + v$.founderForm.hiring.$errors[0].$message }}
                                </div>
                                <div
                                    class=" mt-4 dropdown flex-1 flex rounded-lg py-1 bg-fatou-gray-200 border-fatou-black-400 border-[1px]">
                                    <label tabindex="1" class=" flex justify-between w-full h-10 overflow-hidden bg-fatou-gray-200 focus:outline-none pt-2 mx-1 px-1 text-gray-400 text-md
                    ">
                                        Are you Hiring?
                                        {{
                                                v$.founderForm.hiring.$model && v$.founderForm.hiring.$model !== '' ? ' - Yes' :
                                                    ' - No'
                                        }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg></label>

                                    <div class=" bg-white rounded-box dropdown-content px-4 py-3 shadow mt-10"
                                        tabindex="1">
                                        <ul class="h-50">
                                            <li>
                                                <div class="flex items-center mb-2">
                                                    <input type="checkbox" :checked="isHiring()"
                                                        @change="founderForm.hiring = !founderForm.hiring"
                                                        class="checkbox checkbox-sm checkbox-primary" />

                                                    <span class="pl-2">Yes</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="flex items-center mb-2">
                                                    <input type="checkbox" :checked="!isHiring()"
                                                        @change="founderForm.hiring = !founderForm.hiring"
                                                        class="checkbox checkbox-sm checkbox-primary" />

                                                    <span class="pl-2">No</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full py-2 px-2">
                                <input @change="onImageSelect" accept="image/*" type="file" ref="file"
                                    class=" w-full bg-fatou-gray-200 focus:outline-none py-2 px-3 border-fatou-gray-400 border-[1px] rounded-md"
                                    id="founderFile" placeholder="logo" />
                            </div>
                            <div class="w-full py-3.5 flex items-center justify-center">
                                <button :disabled="isLoading"
                                    class=" btn bg-fatou-blue hover:bg-fatou-blue rounded-3xl border-0 text-white w-1/2">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
