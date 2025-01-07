<template>
    <div class="text-input">
      <label :for="id">{{ label }}</label>
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="$emit('update:modelValue', inputValue)"
        :class="{ 'input-error': error }"
      />
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "TextInput",
    props: {
      label: String,
      id: String,
      type: {
        type: String,
        default: "text",
      },
      placeholder: String,
      modelValue: String,
      error: String,
    },
    data() {
      return {
        inputValue: this.modelValue,
      };
    },
    watch: {
      modelValue(value) {
        this.inputValue = value;
      },
    },
  };
  </script>
  
  <style scoped>
  .text-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    font-family: Arial, sans-serif;
  }
  
  label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
  
  input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  input:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.2);
    outline: none;
  }
  
  .input-error {
    border-color: #e74c3c;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.8rem;
  }
  </style>
  