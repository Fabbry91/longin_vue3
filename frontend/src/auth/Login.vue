<template>
  <div class="container col-md-12">
    <div class="card card-container">
      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <Form @submit="login" :validation-schema="schema">
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="text" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group  text-center">
            <button class="w-100 btn btn-md btn-primary mt-4 p-1" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
          </div>
          <hr class="my-4">
          <div class="col-lg-6 mx-auto text-center">
            <span class="text-muted">
              ¿No tienes cuenta?
            </span>

            <router-link to="/register" class="txt2">
              Crear una aquí
            </router-link>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, ErrorMessage, FormActions } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const myEmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const customEmailMessage: string = 'El formato de correo electrónico no es válido.';

    //mensaje error personalizado
    yup.addMethod(yup.string, 'email', function (message) {
      return this.matches(myEmailRegex, {
        message,
        name: 'email',
        excludeEmptyString: true,
      });
    });

    //Validacion de campos
    const schema: yup.ObjectSchema<{ email: string; password: string }> = yup.object().shape({
      email: yup.string().email(customEmailMessage).email().required("Email es obligatorio"),
      password: yup.string().min(6, 'Debe tener al meos 6 caracteres').required("Password es obligatorio"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    async login(user: any, formActions: FormActions<any>): Promise<void> {
      this.loading = true;
      try {
        // Llama a la acción de Vuex para realizar el inicio de sesión
        await this.$store.dispatch('auth/login', user);
        formActions.resetForm()
        // Redirige a la página de inicio después de un inicio de sesión exitoso
        this.$router.push('/home');

      } catch (error: any) {
        // Maneja los errores
        console.log(error.response)
        this.loading = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message ||
          error.toString();
      }
    },
  }
})

</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card-container {
  min-width: 300px;
  max-width: 360px;
  width: 50%;
  min-height: 50vh;
  margin: 1em auto;
  border-radius: 30px;
  box-shadow: 0 0 2em #e6e9f9;
  background: #f1f7fe;
  /* Centra horizontalmente en la pantalla */
}

.card-container .card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

form {
  width: 85%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn{
  padding: 1em;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
}
.error-feedback {
  color: #e93f3f;
}</style>