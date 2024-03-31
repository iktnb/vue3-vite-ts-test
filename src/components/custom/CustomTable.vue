<template>
  <table class="custom-table">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" :style="{ width: getColumnWidth(index) }">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          <slot :name="'column-' + cellIndex" :cell="cell">{{ cell }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";

  const props = defineProps({
    columns: {
      type: Array as PropType<string[]>,
      required: true
    },
    rows: {
      type: Array as PropType<string[][]>,
      required: true
    },
    columnsWithActions: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => []
    }
  });

  const getColumnWidth = (index: number) => {
    if (props.columnsWithActions && props.columnsWithActions.length > index) {
      return props.columnsWithActions[index];
    }
    return "";
  };
</script>

<style lang="scss" scoped>
  .custom-table {
    width: 100%;
    margin-top: 24px;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #333;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    @media (max-width: 1024px) {
      // Пример адаптивных стилей для мобильных устройств
      th:nth-child(3),
      td:nth-child(3) {
        display: none; // Скрыть третий столбец на мобильных устройствах
      }

      th,
      td {
        padding: 6px; // Изменить отступы для лучшего отображения на мобильных устройствах
      }
    }
  }
</style>
