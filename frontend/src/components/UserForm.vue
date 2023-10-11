<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="col p-2">
      <h1 class="text-center mt-5 text-muted">Crear usuario</h1>
      <div class="card card-body mt-4 w-75 mx-auto">
        <Form @submit="userSave" :validation-schema="schema" ref="form">
          <div v-if="!successful">
            <div class="form-group">
              <label for="firstName">Nombre</label>
              <Field name="firstName" type="text" class="form-control" />
              <ErrorMessage name="firstName" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="lastName">Apellido</label>
              <Field name="lastName" type="lastName" class="form-control" />
              <ErrorMessage name="lastName" class="error-feedback" />
            </div>
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
            <div class="form-group">
              <label for="aboutMe">About Me</label>
              <Field name="aboutMe" type="text" class="form-control" />
              <ErrorMessage name="aboutMe" class="error-feedback" />
            </div>
            <div class="form-group text-center">
              <button class="w-75 btn btn-md btn-primary mt-4" :disabled="loading">
                <div v-show="loading" class="spinner-border spinner-border-sm"></div>
                Guardar
              </button>
            </div>
          </div>
        </Form>
        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from "vue";
import { Form, Field, ErrorMessage, FormActions } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "UserForm",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {

    // Expresión regular y mensaje personalizado para validar el correo electrónico
    const myEmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const customEmailMessage: string = 'El formato de correo electrónico no es válido.';

    // Agrega un método personalizado de validación de correo electrónico a yup
    yup.addMethod(yup.string, 'email', function (message) {
      return this.matches(myEmailRegex, {
        message,
        name: 'email',
        excludeEmptyString: true,
      });
    });

    // Define el esquema de validación
    const schema: yup.ObjectSchema<{ email: string; password: string }> = yup.object().shape({
      firstName: yup
        .string()
        .required("Nombre es obligatorio!")
        .min(3, "Necesitas un mínimo de 3 caracteres!")
        .max(20, "Máximo 20 caracteres!"),
      lastName: yup
        .string()
        .required("Apellido es obligatorio!")
        .min(3, "Necesitas un mínimo de 3 caracteres!")
        .max(20, "Máximo 20 caracteres!"),
      email: yup
        .string()
        .required("Email es obligatorio!")
        .email(customEmailMessage)
        .max(50, "Máximo 50 caracteres!"),
      password: yup
        .string()
        .required("Contraseña es obligatoria")
        .min(6, "Necesitas un mínimo de 6 caracteres!")
        .max(40, "Máximo 40 caracteres!"),
      aboutMe: yup
        .string()
        .max(250, "Máximo 250 caracteres para About Me"),
    });

    // Variables reactivas para el estado del formulario
    const successful: Ref<boolean> = ref(false);
    const loading: Ref<boolean> = ref(false);
    const message: Ref<string> = ref("");

    // Variable calculada para verificar si el usuario está autenticado
    const loggedIn = computed(() => {
      // @ts-ignore
      return this.$store.state.auth.status.loggedIn;
    });

    // Función para manejar el registro del usuario
    const userSave = async (user: any, formActions: FormActions<any>): Promise<void> => {
      message.value = "";
      successful.value = false;
      loading.value = true;

      try {
        // @ts-ignore
        const data = await this.$store.dispatch("auth/register", user);
        if (data && data.msg) {
          message.value = data.msg;
          successful.value = true;
        }
        formActions.resetForm()
        window.location.reload()
        loading.value = false;
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.msg) {
          message.value = error.response.data.msg;
        } else {
          message.value = error.message || error.toString();
        }
        loading.value = false;
      }
    };

    return {
      schema,
      successful,
      loading,
      message,
      loggedIn,
      userSave,
    };
  }, 
});
</script>

<style scoped>
.card-body {
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 360px;
  min-height: 450px;
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

.btn {
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
}

.error-feedback {
  color: #e93f3f;
}

</style>