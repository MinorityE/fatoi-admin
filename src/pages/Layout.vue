<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

</script>

<template>
  <div class="flex">
   <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/users">Users</router-link></li>
      <li><router-link to="/founders">Founders</router-link></li>
      <li><router-link to="/vcs">VC's</router-link></li>
      <li><router-link to="/requests">Request</router-link></li>
      <li><router-link to="/jobs">Job</router-link></li>
      <li><router-link to="/buzzs">Buzz</router-link></li>
    </ul>
   <router-view />
  </div>
 
</template>

 
