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
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Login</h2>

            <div class="form-control">
                <label class="label">
                    <span class="label-text">Your Email</span>
                </label>
                <label class="input-group">
                    <span>Email</span>
                    <input type="text" placeholder="info@site.com" class="input input-bordered" />
                </label>
            </div>
             <div class="form-control">
                <label class="label">
                    <span class="label-text">You Password</span>
                </label>
                <label class="input-group">
                    <span>Password</span>
                    <input type="password" class="input input-bordered" />
                </label>
            </div>

            <div class="card-actions justify-end">
                <button class="btn btn-success"  @click="handleForm">Login</button>
            </div>
        </div>
    </div>
</template>

