<template>
  <nav aria-label="Pagination">
    <ul class="pagination">
      <!-- Кнопка "First" -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="goToPage(1)">First</a>
      </li>

      <!-- Кнопка "Previous" -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
      </li>

      <!-- Список номеров страниц -->
      <li v-for="pageNumber in visiblePages" :key="pageNumber" class="page-item">
        <a
          class="page-link"
          href="#"
          :class="{ active: pageNumber === currentPage }"
          @click.prevent="goToPage(pageNumber)"
          >{{ pageNumber }}
        </a>
      </li>

      <!-- Кнопка "Next" -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>

      <!-- Кнопка "Last" -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="goToPage(totalPages)">Last</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    props: {
      currentPage: {
        type: Number as PropType<number>,
        required: true
      },
      totalPages: {
        type: Number as PropType<number>,
        required: true
      },
      maxVisiblePages: {
        type: Number as PropType<number>,
        default: 5 // Задайте количество отображаемых кнопок страниц по умолчанию
      }
    },
    emits: ["update:currentPage"],
    computed: {
      visiblePages(): number[] {
        const start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
        const end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }
    },
    methods: {
      goToPage(pageNumber: number) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
          this.$emit("update:currentPage", pageNumber);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.goToPage(this.currentPage + 1);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center; /* Центрируем элементы по горизонтали */
    list-style: none;
    padding: 0;
    flex-wrap: wrap; /* Добавляем перенос строк для адаптивного отображения */

    .page-item {
      height: 40px;
      margin-right: 5px;
      margin-bottom: 5px; /* Добавляем отступ снизу для разделения кнопок на разных строках */

      .page-link {
        color: #007bff;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid #007bff;
        border-radius: 0.25rem;
        transition: background-color 0.3s;

        &.active {
          background-color: #007bff;
          color: #fff;
        }

        &:hover {
          background-color: #007bff;
          color: #fff;
        }
      }

      &.disabled {
        .page-link {
          color: #6c757d;
          border-color: #6c757d;
          pointer-events: none;
        }
      }
    }
  }
</style>
