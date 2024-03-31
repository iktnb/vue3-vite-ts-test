<template>
  <footer class="footer">
    <p>{{ authorName }}</p>
    <a :href="githubLink" target="_blank">GitHub: {{ githubUsername }}</a>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        authorName: "Yuri Basyk",
        githubUsername: "iktnb",
        githubLink: "https://github.com/iktnb"
      };
    }
  });
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    background-color: $main;
    color: #fff;
    padding: 10px;
    text-align: center;

    p,
    a {
      margin: 5px 0;
    }

    a {
      color: #fff;
      text-decoration: underline;
      &:hover {
        color: #ccc;
      }
    }
  }
</style>
