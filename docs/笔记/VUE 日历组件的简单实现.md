```javascript
<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps({
  // 一周的开始时间，0-6，0表示周日，1表示周一，以此类推
  startDay: {
    type: Number,
    default: 1,
  },
  // 日历当前选中的日期
  modelValue: {
    type: Date,
    default: () => moment().month(4).toDate(),
  },
  // 如果月份开始时间/结束时间和日历范围重合，是否多添加一周的数据（如果需要日历翻页时，必须）
  fixed: {
    type: Boolean,
    default: true,
  },
});

defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();

const dayOrderMap = new Map([
  [1, '一'],
  [2, '二'],
  [3, '三'],
  [4, '四'],
  [5, '五'],
  [6, '六'],
  [0, '日'],
]);

const dayMap = computed(() => {
  const dayMap: string[] = [];
  for (let i = props.startDay; i < props.startDay + 7; i++) {
    dayMap.push(dayOrderMap.get(i % 7) as string);
  }
  return dayMap;
});

const getDays = (date: Date) => {
  const days = [];
  const start = moment(date).startOf('month');
  start.subtract((7 - props.startDay + start.day()) % 7 || (props.fixed ? 7 : 0), 'day');
  const end = moment(date).endOf('month');
  end.add((6 - end.day() + props.startDay) % 7 || (props.fixed ? 7 : 0), 'day');
  const diff = end.diff(start, 'days');
  days.push(start.toDate());
  for (let i = 0; i < diff; i++) {
    days.push(start.add(1, 'day').toDate());
  }
  return days;
};

const trDays = computed(() => {
  const days = getDays(props.modelValue);
  const trDays: Date[][] = [];
  days.forEach((date, index) => {
    if (index % 7 === 0) {
      trDays.push([]);
    }
    trDays[trDays.length - 1].push(date);
  });
  return trDays;
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="day in dayMap" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr, index) in trDays" :key="index">
        <td
          v-for="(date, idx) in tr"
          :key="idx"
          :class="{
            current: date.toLocaleDateString() === modelValue.toLocaleDateString(),
          }"
          @click="$emit('update:modelValue', date)"
        >
          <slot name="calendarCell" :date="date">
            {{ date.toLocaleDateString() }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  td {
    border: solid 1px #ccc;
    &.current {
      background-color: #ccc;
    }
  }
}
</style>

```
