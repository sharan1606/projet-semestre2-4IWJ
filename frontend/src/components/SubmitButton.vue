<template>
    <button :disabled="disabled" class="submit-button">
      {{ label }}
    </button>
  </template>
  
  <script>
  export default {
    name: "SubmitButton",
    props: {
      label: {
        type: String,
        default: "Submit",
      },
      disabled: Boolean,
    },
  };
  </script>
  
  <style scoped>
  .submit-button {
    padding: 12px 24px;
    background-color: #3498db;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  
  .submit-button:active:not(:disabled) {
    background-color: #2471a3;
    transform: translateY(0);
  }
  
  .submit-button:disabled {
    background-color: #bdc3c7;
    color: #fff;
    cursor: not-allowed;
    box-shadow: none;
  }
  </style>
  