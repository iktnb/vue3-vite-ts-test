<template>
  <div v-if="package">
    <h1>{{ package?.name }}</h1>
    <p><strong>Version:</strong> {{ package?.version }}</p>
    <p><strong>Description:</strong> {{ package?.description }}</p>
    <p><strong>Keywords:</strong> {{ package?.keywords?.length ? package?.keywords.join(" ,") : "-" }}</p>
    <p><strong>Date:</strong> {{ package.date }}</p>
    <p><strong>Publisher:</strong> {{ package.publisher.username }} ({{ package.publisher.email }})</p>
    <p><strong>Links:</strong></p>
    <ul>
      <li><a :href="package.links.npm">NPM</a></li>
      <li><a :href="package.links.homepage">Homepage</a></li>
      <li><a :href="package.links.repository">Repository</a></li>
      <li><a :href="package.links.bugs">Bugs</a></li>
    </ul>
    <p><strong>Maintainers:</strong></p>
    <ul>
      <li v-for="(maintainer, index) in package.maintainers" :key="index">
        {{ maintainer.username }} ({{ maintainer.email }})
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  import { Package } from "@/types/package";

  defineProps({
    package: Object as PropType<Package>
  });
</script>
