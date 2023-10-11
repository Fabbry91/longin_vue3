<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-principal nav-link">
            <img src="../assets/icon/logo.png" ref="" />
            Workanda</router-link>
        </li>
      </ul>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <div class="name">{{ currentUser.name }}</div>
          <button class="btn btn-light" @click.prevent="logOut">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    currentUser(): any {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut(): void {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
});
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 75px;
  background: #3f1cbd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: relative;
}

img {
  width: 40px;
  height: 40px;
}

.nav-principal {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  font-style: italic;
  padding: 15px;
  font-size: 26px;
  font-weight: 600;
}

.d-flex {
  align-items: center;
  gap: 1em;
}
.nav-item .active{
  color: white;
  text-transform: uppercase;
}
.d-flex .name {
  color: white;
  text-transform: uppercase;
  padding: 15px;
  font-size: 16px;
}

.btn {
  height: 40px;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 50px;
  color: #0d6efd;
  padding: 10px 30px;
  font-weight: bold;
}</style>