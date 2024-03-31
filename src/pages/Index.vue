<template>
  <div class="page">
    <div class="container">
      <template v-if="packageStore.packages.length > 0">
        <CustomTable :columnsWithActions="['15%', '10%', '75%']" :columns="columns" :rows="rows">
          <template #column-0="{ cell }">
            <div class="flex">
              <a :href="cell.href" target="_blank">{{ cell.name }}</a>
              <IconMagnify @click="() => openPackage(cell._package)" class="cursor-pointer" />
            </div>
          </template>
        </CustomTable>
        <CustomPagination
          v-model:currentPage="packageStore.currentPage"
          @update:current-page="packageStore.fetchPackages"
          :totalPages="packageStore.pages"
        />
      </template>

      <div v-else>
        <div class="nothing-found"><h4>Nothing found</h4></div>
      </div>
    </div>
  </div>

  <CustomModal v-model:is-visible="modalView">
    <PackageDetailInfo v-if="packageModalData" :package="packageModalData" />
  </CustomModal>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from "vue";

  import CustomTable from "@/components/custom/CustomTable.vue";
  import CustomPagination from "@/components/custom/CustomPagination.vue";
  import CustomModal from "@/components/custom/CustomModal.vue";

  import IconMagnify from "@/components/icon/IconMagnify.vue";
  import PackageDetailInfo from "@/components/PackageDetailInfo.vue";

  import usePackageStore from "@/store/packageStore";

  import { Package } from "@/types/package";

  const packageStore = usePackageStore();

  const modalView = ref(false);

  const columns = ["Name", "Version", "Description"];

  const rows = computed(() => {
    return packageStore.packages.map((pkg) => [
      { name: pkg.name, href: pkg.links.npm, _package: pkg },
      pkg.version,
      pkg.description
    ]);
  });

  const packageModalData = ref<Package | null>(null);
  const openPackage = (pkg: Package) => {
    packageModalData.value = pkg;
    modalView.value = true;
  };

  onMounted(() => {
    packageStore.fetchPackages();
  });
</script>

<style lang="scss" scoped>
  .page {
    height: calc(100vh - 143px);
  }

  .nothing-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.5rem;
    color: #333;
  }
</style>
