<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  created() {},
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<template>
  <div class="flex">
    <div
      class="menu sidebar bg-fatuo p-[20px] h-screen top-0"
      :class="{ isActive }"
    >
      <label class="drawer-overlay" @click="isActive = !isActive"></label>
      <button
        class="btn glass w-12 h-12 rounded-full absolute top-2 right-2 lg:hidden block"
        @click="isActive = !isActive"
      >
        <i class="fas fa-times"></i>
      </button>
      <div class="logo">
        <img src="../assets/fatou.svg" alt="" />
      </div>
      <ul
        class="overflow-y-auto pl-[0px_!important] overflow-y-auto text-base-content mt-[50px]"
      >
        <li>
          <router-link to="/">
            <div class="icon">
              <img src="../assets/user.svg" alt="" />
            </div>
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/users">
            <div class="icon">
              <img src="../assets/user.svg" alt="" />
            </div>
            Users
          </router-link>
        </li>
        <li>
          <router-link to="/founders">
            <div class="icon">
              <img src="../assets/bulb.svg" alt="" />
            </div>
            Founders
          </router-link>
        </li>
        <li>
          <router-link to="/vcs">
            <div class="icon">
              <img src="../assets/vcs.svg" alt="" />
            </div>
            VC's
          </router-link>
        </li>
        <li>
          <router-link to="/requests">
            <div class="icon">
              <img src="../assets/request.svg" alt="" />
            </div>
            Request
          </router-link>
        </li>
        <li>
          <router-link to="/jobs">
            <div class="icon">
              <img src="../assets/job.svg" alt="" />
            </div>
            Job
          </router-link>
        </li>
        <li>
          <router-link to="/buzzs">
            <div class="icon">
              <img src="../assets/buzz.svg" alt="" />
            </div>
            Buzz
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="logout">
            <div class="icon">
              <img src="../assets/request.svg" alt="" />
            </div>
            Logout
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-wrapper" :class="{ isActive }">
      <div
        class="navbar bg-base-100 sticky top-0 z-[999] h-[100px] p-[26px_25px_!important]"
      >
        <div class="navbarLogo" :class="{ isActive }">
          <img src="../assets/fatou.svg" alt="" />
        </div>
        <label
          tabindex="0"
          class="btn btn-ghost btn-circle"
          @click="isActive = !isActive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div class="flex-1 md:block hidden">
          <span class="text-[24px] font-medium capitalize">{{ $route.name }} Overview</span>
        </div>
        <div class="md:flex-none flex-1 justify-end">
          <div class="dropdown profile-dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost avatar flex gap-4">
              <div class="w-12 h-12 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" />
              </div>
              <span class="font-normal capitalize text-[20px]">Admin</span>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content bg-base-100 mt-3 p-2 shadow rounded-box w-52"
            >
              <li><a class="to-base-100">Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
          <button class="btn btn-ghost btn-circle ml-4">
            <div class="indicator">
              <img src="../assets/bell.svg" alt="" />

              <span
                class="badge badge-xs bg-danger indicator-item top-[3px_!important] right-[1px_!important]"
              ></span>
            </div>
          </button>
        </div>
      </div>
      <div class="p-[25px]">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-fatuo {
  background-color: #077685;
}
.sidebar {
  width: 240px;
  overflow: hidden;
  position: fixed;
  z-index: 1000;
  margin-left: -240px;
  transition: 0.3s all;
  height: 100%;
  flex: 0 0 240px;

  &.isActive {
    margin-left: 0;
    @media (max-width: 1023px) {
      margin-left: -240px;
    }
  }

  @media (max-width: 1023px) {
    &:not(.isActive) {
      margin-left: 0;
      .drawer-overlay {
        visibility: visible;
        opacity: 0.3;
        cursor: pointer;
        --tw-bg-opacity: 1;
        background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));
        transition-property: all;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
        height: 100%;
        position: fixed;
        inset: 0;
        z-index: -1;
      }
    }
  }
}
.main-wrapper {
  background-color: #f0f4f5;
  transition: 0.3s all;
  margin-left: 0;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;

  &.isActive {
    margin-left: 240px;
    @media (max-width: 1023px) {
      margin-left: 0;
    }
  }

  .navbar {
    transition: 0.3s all;
  }
}

.menu {
  ul {
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 4px; background-color: transparent;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #09acc2;
    }
  }
  li > :where(a:active) {
    background-color: transparent !important;
  }
}
.menu li {
  margin-bottom: 15px;
}

.menu li > :where(a) {
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
}
.menu li > :where(a) > img {
  margin-right: 15px;
  width: 80px;
}
.menu li > :where(a) > .icon {
  width: 50px;
}
.bg-danger {
  background-color: #f10a0a !important;
}

.profile-dropdown {
  a {
    color: #333;
  }
}
.navbarLogo {
  display: block;
  transition: 0.5s all;
  max-width: 100%;
  opacity: 1;
  &.isActive {
    max-width: 0;
    transition: 0.1s all;
    opacity: 0;
  }

  @media (max-width: 1023px) {
    max-width: 100px;
    &.isActive {
      max-width: 100px;
      transition: 0.1s all;
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    img {
      max-width: 60px;
    }
  }
}
</style>
