<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Modal",
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    emits: ["update:isVisible"],
    setup(props, { emit }) {
      const closeModal = () => {
        emit("update:isVisible", false);
      };

      return {
        closeModal
      };
    }
  });
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);

    &-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;

      transform: translateY(-25%);

      @media (max-width: 768px) {
        transform: translateY(0%);
      }
    }
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
