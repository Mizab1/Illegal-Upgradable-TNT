import type { SandstoneConfig } from 'sandstone'

export default {
  name: 'Illegal Upgradable TNT',
  description: [ 'A ', { text: 'Sandstone', color: 'gold' }, ' data pack.' ],
  formatVersion: 7,
  namespace: 'illegal_upgradale_tnt',
  packUid: 'zIoSdkjJ',
  saveOptions: { path: './.sandstone/output/datapack' },
  onConflict: {
    default: 'warn',
  },
} as SandstoneConfig
