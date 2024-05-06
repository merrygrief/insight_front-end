<route lang="yaml">
name: personalSetting
meta:
  title: 个人设置
  cache: personal-edit.password
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import useStore from 'element-plus/es/components/table/src/store/index.mjs'
import apiUser from '@/api/modules/user'
import useUserStore, { FailReasons } from '@/store/modules/user'

defineOptions({
  name: 'PersonalSetting',
})

const userStore = useUserStore()
const router = useRouter()

const formRef = ref<FormInstance>()
const form = ref({
  nickname: '',
  gender: '',
  mailbox: '',
  phonenum: '',
})
const dataGet = ref({
  nickname: '',
  gender: '',
  mailbox: '',
  phonenum: '',
})

// function handleSuccess(res: any) {
//   if (res.error === '') {
//     form.value.headimg = res.data.path
//   }
//   else {
//     ElMessage.warning(res.error)
//   }
// }
function editPassword() {
  router.push({
    name: 'personalEditPassword',
  })
}
function editPhonenum() {
  router.push({
    name: 'personalEditPhonenum',
  })
}
function editMailbox() {
  router.push({
    name: 'personalEditPhonenum',
  })
}

function onSubmit(form: {
  nickname: string
  gender: string
  mailbox: string
  phonenum: string
}) {
  apiUser.userinfoEdit(form).then(() => {
    // eslint-disable-next-line eqeqeq
    if (form.nickname != '') {
      userStore.account = form.nickname
    }
    getUserInfo()
  })
}

function getUserInfo() {
  apiUser.userinfoGet().then((res) => {
    dataGet.value = res.data
    form.value.gender = dataGet.value.gender === '男' ? '0' : '1'
  })
}
getUserInfo()
</script>

<template>
  <div>
    <PageMain>
      <ElTabs tab-position="left" style="height: 600px;">
        <ElTabPane label="基本设置" class="basic">
          <h2>基本设置</h2>
          <ElRow :gutter="20">
            <ElCol :span="16">
              <ElForm :model="form" label-width="120px" label-suffix="：">
                <ElFormItem label="昵 称">
                  <ElInput v-model="form.nickname" :placeholder="dataGet.nickname" />
                </ElFormItem>
                <ElFormItem label="性 别">
                  <ElRadioGroup v-model="form.gender">
                    <el-radio label="0">
                      男
                    </el-radio>
                    <el-radio label="1">
                      女
                    </el-radio>
                  </ElRadioGroup>
                </ElFormItem>
                <ElFormItem label="邮 箱">
                  <ElInput v-model="form.mailbox" :placeholder="dataGet.mailbox" />
                </ElFormItem>
                <ElFormItem label="手机号">
                  <ElInput v-model="form.phonenum" :placeholder="dataGet.phonenum" />
                </ElFormItem>

                <ElFormItem>
                  <ElButton type="primary" @click="onSubmit(form)">
                    保存
                  </ElButton>
                </ElFormItem>
              </ElForm>
            </ElCol>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="安全设置" class="security">
          <h2>安全设置</h2>
          <div class="setting-list">
            <div class="item">
              <div class="content">
                <div class="title">
                  账户密码
                </div>
                <div class="desc">
                  当前密码强度：强
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text @click="editPassword">
                  修改
                </ElButton>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="title">
                  密保手机
                </div>
                <div class="desc">
                  已绑定手机：187****3441
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text @click="editPhonenum">
                  修改
                </ElButton>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="title">
                  备用邮箱
                </div>
                <div class="desc">
                  当前未绑定备用邮箱
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text @click="editMailbox">
                  绑定
                </ElButton>
              </div>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header .el-tabs__nav {
    .el-tabs__active-bar {
      z-index: 0;
      width: 100%;
      background-color: var(--el-color-primary-light-9);
      border-right: 2px solid var(--el-color-primary);
      transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
    }

    .el-tabs__item {
      padding-right: 100px;
      text-align: left;
    }
  }

  .el-tab-pane {
    padding: 0 20px 0 30px;
  }
}

h2 {
  margin: 0;
  margin-bottom: 30px;
  font-weight: normal;
}

.basic {
  :deep(.headimg-upload) {
    text-align: center;

    .el-upload-dragger {
      border-radius: 50%;
    }
  }
}

.security {
  .setting-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
      transition: var(--el-transition-border);

      .content {
        .title {
          margin-bottom: 5px;
          color: var(--el-text-color-primary);
          transition: var(--el-transition-color);
        }

        .desc {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          transition: var(--el-transition-color);
        }
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
