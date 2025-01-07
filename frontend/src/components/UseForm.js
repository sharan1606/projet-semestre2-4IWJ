import { reactive, ref } from 'vue';
import { z } from 'zod';
import axios from 'axios';

export function useForm() {
  const formData = reactive({
    name: '',
    email: '',
    password: ''
  });

  const isSubmitting = ref(false); 
  const errors = reactive({
    name: null,
    email: null,
    password: null,
  });
  const serverError = ref(null); 

  const formSchema = z.object({
    name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
    email: z.string().email("L'email doit être valide"),
    password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères")
  });

  const updateField = (field, value) => {
    formData[field] = value;
    errors[field] = null;
  };

  const validateForm = () => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    isSubmitting.value = true;
    serverError.value = null;

    try {
      const response = await axios.post('https://api.example.com/submit', formData);
      console.log('Formulaire soumis avec succès:', response.data);
      resetForm();
    } catch (error) {
      serverError.value = error.response ? error.response.data : "Une erreur s'est produite";
    } finally {
      isSubmitting.value = false;
    }
  };

  const cancelRequest = () => {
    console.log("Requête annulée");
    isSubmitting.value = false;
  };

  const resetForm = () => {
    formData.name = '';
    formData.email = '';
    formData.password = '';
    errors.name = null;
    errors.email = null;
    errors.password = null;
  };

  return {
    formData,
    errors,
    serverError,
    isSubmitting,
    updateField,
    submitForm,
    cancelRequest,
  };
}
