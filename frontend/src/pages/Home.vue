
<template>
  <div>  
  <Navbar/>
    <div class="row">
      <div class="col-sm-8">
        <UsersList/>
      </div>
      <div class="col-sm-4">
        <UserForm/>
      </div>
    </div>   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "../components/UserForm.vue";
import UsersList from "../components/UsersList.vue";
import Navbar from "../ui/Navbar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navbar,
    UserForm,
    UsersList,
  },
});
</script>