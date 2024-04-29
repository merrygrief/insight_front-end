<route lang="yaml">
  name: foodCate
  meta:
    title: 食物分类
</route>

<script lang="ts">
import { ElButton, ElButtonGroup, ElCol } from 'element-plus'
import apiFood from '@/api/modules/food'

export default {
  data() {
    return {
      data: [],
      list: [],
      all_list: [],
      foodName: '',
    }
  },

  mounted() {
    this.updateValue()
    this.getCatefoodlist({ cateId: '1' })
  },

  methods: {
    updateValue() {
      apiFood.foodcate().then((res) => {
        this.data = res.data
      })
    },
    getCatefoodlist(_data: { cateId: string }) {
      apiFood.catefoodlist(_data).then((res) => {
        this.list = res.data
      })
    },
    getAllfoodlist() {
      apiFood.allfoodlist().then((res) => {
        this.all_list = res.data
      })
    },
    filteredTableData() {
      return this.all_list.filter(val => val.foodName.match(this.foodName))
    },

  },
}
</script>

<!-- <style>
.button {
  font-size: 23px;
  color: red;
  background-color: #000;
}

.vertical-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 可选，控制交叉轴对齐方式 */
}

.cate {
  width: 400px;
  height: 150px;
  overflow: auto;
}
</style> -->
<template>
  <el-container style="height: 1000px; border: 1px solid #eee;">
    <el-aside width="200px" style="background-color: rgb(238 241 246);">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item-group>
          <el-menu-item v-for="item in data" :key="item" class="cateName" @click="getCatefoodlist({ cateId: String(item.fcid) })">
            {{ item.cateName }}
          </el-menu-item>
          <el-divider />
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container style="height: 1000px; border: 1px solid #eee;">
      <el-aside width="1000px" style="background-color: rgb(238 241 246);">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item-group v-for="item in list" :key="item" class="details">
            <el-menu-item>
              <el-aside width="300px">
                {{ item.foodName }}
              </el-aside>
              <el-main>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="details">
                      热量: {{ item.foodColoriesVal }} 千卡/100克
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="details">
                      蛋白质: {{ item.foodProteinVal }} 克/100克
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="details">
                      脂肪: {{ item.foodFatVal }} 克/100克
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="details">
                      碳水化合物: {{ item.foodCarbohydrate }} 克/100克
                    </div>
                  </el-col>
                </el-row>
              </el-main>
            </el-menu-item>
            <el-divider />
          </el-menu-item-group>
        </el-menu>
      </el-aside>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    line-height: 60px;
    color: #333;
    background-color: #b3c0d1;
  }

  .el-aside {
    color: #333;
  }

  .cateName {
    font-size: 16px;
  }

  .details {
    font-size: 12px;
  }
</style>
