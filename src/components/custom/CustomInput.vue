<template>
  <input
    class="custom-input"
    v-model="inputValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :type="type"
    @input="handleInput"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, PropType } from "vue";

  export default defineComponent({
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: Infinity
      },
      type: {
        type: String as PropType<"text" | "number" | "password">,
        default: "text"
      }
    },
    setup(props, { emit }) {
      const inputValue = ref<string | number>(props.value);

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        let newValue: string | number = target.value;

        if (props.type === "number") {
          newValue = parseFloat(newValue);
          if (isNaN(newValue)) {
            newValue = 0;
          }
        }

        // Проверка на максимальную длину
        if (newValue.toString().length <= props.maxlength) {
          inputValue.value = newValue;
          emit("input", newValue);
        }
      };

      return {
        inputValue,
        handleInput
      };
    }
  });
</script>

<style scoped>
  .custom-input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .custom-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
  }

  .custom-input[disabled] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
</style>
