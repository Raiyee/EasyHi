import Vue from 'vue'

import filters from 'filters'

for (const [key, value] of Object.entries(filters)) {
  Vue.filter(key, value)
}
