<script>
import { mapActions } from "vuex";

export default {

    created() {
    },

    methods: {
          ...mapActions(["userLogin"]),
          handleForm(){
             
              this.userLogin({email:'faizan@karigar.pk',password:'admin123'}).then((result) => {
                  console.log('first')
              this.$router.push({path:"/users"})
            }).catch((err) => {
                console.log(err)
            });
          }
          
    }
}
</script>
<template>
    <div class="card w-full border-4 border-[#077685]/40 border-y-[#077685] bg-base-100 shadow-lg fixed inset-x-0 top-2/4 -translate-y-2/4 mx-auto max-w-[650px]">
        <div class="card-body">
            <img src="../assets/fatou.svg" alt="" class="max-w-[140px] mx-auto mb-4">
            <h2 class="card-title text-center text-[30px] text-[#077685]">Login</h2>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Your Email</span>
                </label>
                <label class="input-group">
                    <span class="fas fa-envelope  bg-[#077685] text-white"></span>
                    <input type="text" placeholder="info@site.com" class="input input-bordered input-fatou w-full" />
                </label>
            </div>
             <div class="form-control">
                <label class="label">
                    <span class="label-text">You Password</span>
                </label>
                <label class="input-group">
                    <span class="fas fa-key bg-[#077685] text-white"></span>
                    <input type="password" class="input input-bordered input-fatou w-full " />
                </label>
            </div>

            <div class="card-actions justify-end">
                <button class="btn bg-[#077685] hover:bg-[#077685] text-white border-0"  @click="handleForm">Login</button>
            </div>
        </div>
    </div>
</template>

