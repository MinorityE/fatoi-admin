<script>
import { Fragment } from 'vue';

export default {
    props: {
        rows: Array,
        cols: Array,
        totalPages:Number,
        page:Number,
        onPageChange:Function,
        showRecord:Function
    },
    data() {
        return {
            _rows: this.rows ?? [],
            _cols: this.cols,
            _totalPages:this.totalPages??0,
            _pagination:[],
            _page:this._page??1
        
        }
    },
    watch: {
        rows: {
            handler: function () { this._rows = this.rows },
            immediate: true,
        },
        totalPages: {
            handler: function () {
                this._totalPages = this.totalPages
                this._pagination=this.computePagination(this._page,this._totalPages)
            },
            immediate: true,
        },
        page: {
            handler: function () { 
                this._page = this.page
                this._pagination=this.computePagination(this._page,this._totalPages)
                 },
            immediate: true,
        },
    },
    methods:{
        computePagination(current_page, last_page, onSides = 1){
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

        handlePageChange(page){
            this.onPageChange(page)
        },
        handleView(data){
            this.showRecord(data)
        },
        renderReasons(reason){
            return reason.toString()
        }
    }
}
</script>
<template>
    <!-- content -->
    <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th v-for="(col, index) in _cols">{{ col.text }}</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in _rows" :key="row._id" class="hover">
                    <td>{{row.firstName}}</td>
                    <td>{{row.lastName}}</td>
                    <td></td>
                    <td></td>
                    <td>Active</td>
                    <td>{{renderReasons(row.reasonForJoining)}}</td>
                    <td >
                        <button class="btn btn-outline" @click="handleView(row)">View</button>
                    </td>
                    
                </tr>

            </tbody>
        </table>
        {{_totalPages}}
        <div class="btn-group">
            <button 
                v-for="(currPage, index) in _pagination" 
                :class="{ 'btn':true,'btn-active': currPage===page }"
                @click="handlePageChange(currPage)"
                >{{currPage}}</button>
            
        </div>
    </div>
    <!-- footer -->
</template>

