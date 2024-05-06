import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  app: {
    enablePermission: false,
    enableDynamicTitle: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
    menuMode: 'head',
  },
  topbar: {
    mode: 'fixed',
  },
  tabbar: {
    enable: false,
    enableIcon: false,
    enableHotkeys: false,
  },
  toolbar: {
    fullscreen: false,
    pageReload: false,
    colorScheme: false,
  },
  mainPage: {
    enableHotkeys: false,
  },
  copyright: {
    enable: true,
    dates: '2020-present',
    company: 'Fantastic-admin',
    website: 'https://fantastic-admin.gitee.io',
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
