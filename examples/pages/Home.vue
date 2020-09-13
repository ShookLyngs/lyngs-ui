<template>
  <div>
    <!--future-calculator-->
    <div><button @click="earn({
      start: 3800, // 起始月薪
      years: 5, // 计算年限
      growPercentage: 0.2, // 涨薪百分比
      growInterval: 12, // 涨薪间隔（月）
      bonusPercentage: 1, // 奖金百分比（比当前月薪）
      bonusInterval: 12, // 奖金间隔
      outputStart: 3000, // 起始支出
      outputGrowInterval: 1, // 支出增长间隔（月）
      outputGrowPercentage: 0.1 / 8, // 支出增长百分比（比当前月薪）
    })">output</button></div>

    <!--call-confirm-->
    <ul ref="list">
      <li v-for="item in 500" :key="item">
        <button @click="openConfirm">Open Confirm({{ item }})</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import confirm from '{packages}/confirm';
import { async } from '{packages}/util';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const list = ref(null);

    const openConfirm = (): void => {
      setTimeout(() => {
        confirm({
          title: String(Date.now()),
          content: String(Date.now() * Math.floor(Math.random() * Math.pow(10, 10))),
          width: '400px',
          allowHtml: true,
          closeOnClick: false,
        }).then(async (context) => {
          console.log(context);
          if (context.button) context.button.loading = true;
          await async.timeout(1000);
          context.close();
        }).catch((context) => {
          context.close();
        });
      }, 1000);
    };

    interface EarnOptions {
      start: number;
      years: number;
      growPercentage: number;
      growInterval: number;
      bonusPercentage: number;
      bonusInterval: number;
      outputStart: number;
      outputGrowInterval: number;
      outputGrowPercentage: number;
    }
    interface EarnHistoryItem {
      month: number;
      income: number;
      bonus: number;
      output: number;
      deposit: number;
    }
    interface Earn {
      (options: EarnOptions): EarnHistoryItem[];
    }
    const earn: Earn = (options) => {
      const length  = options.years * 12;
      let   income  = options.start,
            output  = options.outputStart,
            deposit = 0,
            history: EarnHistoryItem[] = [];

      for (let i = 0; i < length; i++) {
        if (i % options.growInterval === 0 && i > 0) {
          income += income * options.growPercentage;
        }
        if (i % options.outputGrowInterval === 0 && i > 0) {
          output += income * options.outputGrowPercentage;
        }
        let bonus = i % options.bonusInterval === 0 && i > 0 ? income * options.bonusPercentage : 0;

        deposit += income + bonus - output;
        history.push({ month: i, income, bonus, output, deposit });
      }

      console.table(history);
      return history;
    };

    return {
      list,
      confirm,
      openConfirm,
      earn
    };
  },
});
</script>

<style lang="less">

</style>
