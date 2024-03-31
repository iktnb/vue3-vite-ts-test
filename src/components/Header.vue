<template>
  <header>
    <div class="container">
      <div class="flex">
        <CustomInput placeholder="Search package name..." class="w-90" @input="handleInput" />
        <Loader v-if="packageStore.loading" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { debounce } from "lodash-es";
  import CustomInput from "./CustomInput.vue";

  import Loader from "./Loader.vue";

  import usePackageStore from "@/store/packageStore";

  const packageStore = usePackageStore();

  const handleInput = debounce((event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    packageStore.text = target.value.trim();
    packageStore.currentPage = 1;
    packageStore.fetchPackages();
  }, 150);
</script>

<style lang="scss">
  header {
    background: $main;
    color: $secondary;
    padding: 20px 10px;

    h1 {
      font-size: 1.5rem;
    }
  }
</style>
