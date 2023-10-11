<template>
  <div class="container">
    <h1 class="text-center mt-5 text-muted">Listas de Usuario</h1>
    <ul class="list-group mt-4 w-100 mx-auto">
      <li v-for="(user, index) in users" :key="index"
        class="list-group-item justify-content-evenly align-items-center gap-3 py-3">
        <div class="col">
          <img src="../assets/icon/user.png" alt="twbs" width="55" height="55" class="rounded-circle flex-shrink-0">
        </div>
        <div class="col flex-column">
          <h6>{{ user.first_name }}</h6>
          <p class="mb-0 opacity-75">{{ user.last_name }}</p>
        </div>
        <div class="col ">
          {{ user.email }}
        </div>
        <div class="col text-center">
          {{ user.created_at }}
        </div>
        <div class="col">
          {{ user.about_me }}
        </div>
        <div class="container-buttons">
          <button class="btn btn-warning btn-sm mr-2" @click="$router.push(`/user/${user.id}`)">Editar</button>
          <button class="btn btn-danger btn-sm" @click="selectedUser = user" data-bs-toggle="modal"
            data-bs-target="#exampleModal">Eliminar</button>
        </div>
      </li>
    </ul>
    <div class="modal fade" id="exampleModal" ref="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h3><img src="../assets/icon/warning.png" alt="twbs" width="55" height="55"
                class="rounded-circle flex-shrink-0"> Atencion!</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <h5>Estas por eliminar un usuario de la base de datos. </h5>
            <p>¿Seguro deseas eliminar al usuario <span style="font-weight: bold; text-transform: capitalize;">{{
              selectedUser?.first_name }}</span>? </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
            <button type="button" class="btn btn-danger" @click="deleteUserConfirmed" data-bs-dismiss="modal">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deleteUsers, getUsers } from "../services/userServices";
import { User } from "../interfaces/User";
import UserForm from "./UserForm.vue"

export default defineComponent({
  components: {
    UserForm,
  },
  data() {
    return {
      users: [] as User[],
      selectedUser: null as User | null,
    };
  },
  methods: {
    async loadUsers() {
      const res = await getUsers();
      this.users = res.data?.users;
    },
    editUser(user: User) {
      this.selectedUser = user;
    },
    async deleteUserConfirmed() {
      try {
        if (this.selectedUser && this.selectedUser.id != undefined) {
          const res = await deleteUsers(this.selectedUser.id);
          console.log(res);
          return this.users = this.users.filter(f => f.id != this.selectedUser?.id)
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadUsers();
  },
});
</script>

<style scoped>
.list-group {
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.5em 0;
}

.list-group-item {
  display: flex;
  margin: 0.5em;
  margin: 0.5em;
  border-radius: 0.5em;
  border: 1px solid #a5a5a5a5;
  box-shadow: 0 0 2em #e6e9f9;
}

.list-group-item .col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-header {
  padding: 0.6em;
}

.modal-header h3 {
  widows: 100%;
  display: flex;
  align-items: center;
  margin: 0;
}

.modal-header h3 img {
  margin-right: 0.7em;
}

.container-buttons {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}

.list-group::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: var(--color-border-radius-pista-scroll-lista-ordenable, 20px);
  background-color: var(--color-fondo-pista-scroll-lista-ordenable, #f5f5f5);
}

.list-group::-webkit-scrollbar {
  width: 5px;
  border-radius: 20px;
  background-color: var(--color-fondo-pista-scroll-lista-ordenable, #f5f5f5);
}

.list-group::-webkit-scrollbar-thumb {
  border-radius: var(--color-border-radius-scroll-lista-ordenable, 20px);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: var(--color-fondo-scroll-lista-ordenable, #0d6efd);
}

.btn {
  color: white;
  border: none;
  border-radius: 0.7em;
  font-weight: 400;
}

@media (max-width: 1024px) {
  .list-group-item {
    display: block;
  }

  .container-buttons {
    justify-content: center;
    align-items: center;
    margin-top: 0.7em;
  }
}</style>