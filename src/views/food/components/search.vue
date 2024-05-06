<route lang="yaml">
  name: foodSearch
  meta:
    title: 食物分类
</route>

<script lang="ts">
import type { TableColumnCtx } from 'element-plus'
import { ElButton, ElButtonGroup, ElCol } from 'element-plus'
import apiFood from '@/api/modules/food'

enum CompositionStatus {
  BothEnabled = 0,
  InputEnabled = 1,
  SelectEnabled = 2,
}

export default {
  data() {
    return {
      compositionStatus: CompositionStatus.BothEnabled,
      foodName: '',

      all_list: [{
        gsbrid: '0',
        foodName: '',
        foodColoriesVal: '',
        foodProteinVal: '',
        foodFatVal: '',
        foodCarbohydrate: '',
      }],
    }
  },

  mounted() {
    this.getAllfoodlist()
  },

  methods: {
    getAllfoodlist() {
      apiFood.allfoodlist().then((res) => {
        this.all_list = res.data
      })
    },
    filteredTableData() {
      return this.all_list.filter(val => val.foodName.match(this.foodName))
    },
    categorySet() {
      return new Set(this.all_list.map(val => val.foodName))
    },

    categoryFilters() {
      return [...this.categorySet()].map(val => ({ text: val, value: val }))
    },
    categoryFilterMethod(
      value: string,
      row: any,
      _column: TableColumnCtx<any>,
    ) {
      // console.log(value, row.category)
      return row.category === value
    },
    // handleSelectChange() {
    //   this.setCompositionState(this.fid === 0 ? CompositionStatus.BothEnabled : CompositionStatus.SelectEnabled)
    // },

    handleInputChange() {
      this.setCompositionState(this.foodName === '' ? CompositionStatus.BothEnabled : CompositionStatus.InputEnabled)
    },

    setCompositionState(state: CompositionStatus) {
      this.compositionStatus = state
      // Clear the content of the other component
      switch (state) {
        case CompositionStatus.BothEnabled:
          break

        case CompositionStatus.SelectEnabled:
          this.foodName = ''
          break

        // case CompositionStatus.InputEnabled:
        //   this.valueid = 0
        //   break
      }
    },

  },
}
</script>

<template>
  <div>
    <el-card id="search" class="box-card">
      <el-row>
        <el-col :span="18">
          <el-input v-model.lazy="foodName" placeholder="请输入要查找的食物名" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain :disabled="false">
            <el-icon style="margin-right: 5px;">
              <svg-icon name="ep:search" />
            </el-icon>
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card id="result" class="box-card">
      <el-table :data="filteredTableData()" height="1000" border style="width: 100%;">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="foodName" label="食物名" width="180">
          <!-- <template #default="scope">
            <el-link type="primary">
              <RouterLink :to="`/community/management/${scope.row.clubID}`">
                {{ scope.row.name }}
              </RouterLink>
            </el-link>
          </template> -->
        </el-table-column>
        <!-- <el-table-column prop="category" label="类别" :filters="categoryFilters()" :filter-method="categoryFilterMethod" width="180" /> -->
        <el-table-column prop="foodColoriesVal" label="热量（千卡/100克）" />
        <el-table-column prop="foodProteinVal" label="蛋白质（克/100克）" />
        <el-table-column prop="foodFatVal" label="脂肪（克/100克）" />
        <el-table-column prop="foodCarbohydrate" label="碳水化合物（克/100克）" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
#search .el-input {
  margin-right: 50px;
}

/* .el-card {
  margin: 10px;
} */
</style>
