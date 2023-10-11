<template>
    <div>
        <Navbar/>
        <div class="container col-md-4 offset-md-4">
            <form @submit.prevent="handleUpdate" class="card card-body">
                <h5 class="card-title text-center">Actualizar Usuario</h5>

                <input type="text" v-model="currentUser.first_name" class="form-control" />
                <p v-if="showFirstNameError" class="error-text">{{ errors.firstName }}</p>

                <input type="text" v-model="currentUser.last_name" class="form-control" />
                <p v-if="showLastNameError" class="error-text">{{ errors.lastName }}</p>

                <input type="text" v-model="currentUser.email" class="form-control" />
                <p v-if="showEmailError" class="error-text">{{ errors.email }}</p>

                <textarea v-model="currentUser.about_me" class="form-control"></textarea>
                <p v-if="showAboutMeError" class="error-text">{{ errors.aboutMe }}</p>

                <p v-if="successMessage" class="success-text">{{ successMessage }}</p>

                <button class="btn btn-primary">Actualizar</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getUser, updateUser } from "../services/userServices";
import Navbar from "../ui/Navbar.vue";

export default defineComponent({
  components: { Navbar },
    name: "CardUser",
    data() {
        const currentUser = ref({
            first_name: "",
            last_name: "",
            email: "",
            about_me: "",
        });

        const errors = ref({
            firstName: "",
            lastName: "",
            email: "",
            aboutMe: "",
        });

        const successMessage = ref("");

        return {
            currentUser,
            errors,
            successMessage,
        };
    },
    methods: {
        async loadUser(id: string) {
            console.log("Loaded user");
            try {
                const { data } = await getUser(id);
                this.currentUser = data.user[0];
            } catch (error) {
                console.error(error);
            }
        },

        validateEmail() {
            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            if (!emailPattern.test(this.currentUser.email)) {
                this.errors.email = "Correo electrónico no válido";
            } else {
                this.errors.email = "";
            }
        },

        validateAboutMe() {
            const aboutMeText = this.currentUser.about_me;
            if (aboutMeText) {
                const wordCount = aboutMeText.split(/\s+/).filter(Boolean).length;
                if (wordCount > 200) {
                    this.errors.aboutMe = "La descripción debe contener menos de 200 palabras.";
                } else {
                    this.errors.aboutMe = "";
                }
            }
        },

        validateNames() {
            if (this.currentUser.first_name.length < 3) {
                this.errors.firstName = "El nombre debe tener al menos 3 caracteres.";
            } else {
                this.errors.firstName = "";
            }

            if (this.currentUser.last_name.length < 3) {
                this.errors.lastName = "El apellido debe tener al menos 3 caracteres.";
            } else {
                this.errors.lastName = "";
            }
        },

        async handleUpdate() {
            this.validateEmail();
            this.validateAboutMe();
            this.validateNames();

            if (
                !this.errors.email &&
                !this.errors.aboutMe &&
                !this.errors.firstName &&
                !this.errors.lastName
            ) {
                try {
                    if (typeof this.$route.params.id === "string") {
                        // @ts-ignore
                        await updateUser(this.$route.params.id, this.currentUser);
                        this.successMessage = "Guardado con éxito";
                        this.$router.push('/home');
                        // Restablecer el formulario y borrar los datos del usuario
                        this.currentUser = {
                            first_name: "",
                            last_name: "",
                            email: "",
                            about_me: "",
                        };
                    }
                } catch (error) {
                    console.error(error);
                    this.successMessage = "";
                }
            }
        },
    },
    computed: {
        showFirstNameError() {
            return this.errors.firstName !== "";
        },
        showLastNameError() {
            return this.errors.lastName !== "";
        },
        showEmailError() {
            return this.errors.email !== "";
        },
        showAboutMeError() {
            return this.errors.aboutMe !== "";
        },
    },
    mounted() {
        if (typeof this.$route.params.id === "string") {
            this.loadUser(this.$route.params.id);
        }
    },
});
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

.card-body {
    min-width: 300px;
    max-width: 360px;
    width: 50%;
    margin: 1em auto;
    border-radius: 30px;
    box-shadow: 0 0 2em #e6e9f9;
    background: #f1f7fe;
    /* Centra horizontalmente en la pantalla */
}

form {
    width: 85%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.btn {
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
}

.error-text {
    color: #e93f3f;
}

.success-text {
    color: rgb(119, 209, 119);
}
</style>
