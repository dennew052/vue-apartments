<script setup>

import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import CardItem from '@/components/CardItem.vue'
import Pagination from '@/components/Pagination.vue'

const items = ref([])
const paginationInfo = ref([])
const filters = reactive({
  type: ''
})
const currentPage = ref(1)
const isRequestExecuted = ref(false)
const fetchItems = async () => {
  try {
    const params = {
      "type[0]": filters.type || undefined,
      page: currentPage.value,
      limit: 5
    }

    const { data } = await axios.get('https://96392043176edfb5.mokky.dev/items', {
      params
    })
    items.value = data.items
    paginationInfo.value = data.meta
  } catch (e) {
    console.log(e)
  } finally {
    isRequestExecuted.value = false
  }
}

const onChangeSelect = (event) => {
  filters.type = event.target.value
  openPageByNum(1)
}

const nextPage = () => {

  if (!isRequestExecuted.value) {
    console.log(paginationInfo.value.remaining_count > 1)
    if (paginationInfo.value.remaining_count > 1) {
      currentPage.value++
      fetchItems()
    }
  }
}

const previousPage = () => {
  if (!isRequestExecuted.value) {
    if (paginationInfo.value.current_page > 1) {
      currentPage.value--
      fetchItems()
    }
  }
}

const openPageByNum = (num) => {
  console.log('Проверка ' + num)
  if (Number(num) >= 1 && Number(num) <= paginationInfo.value.total_pages) {
    currentPage.value = Number(num)
    fetchItems()
  }
}

onMounted(() => {
  fetchItems()
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex mb-6">
    <div
      class="w-full h-96 bg-[url('/background-main.jpg')] bg-cover brightness-50">
    </div>
    <div
      class="text-white absolute w-full h-96 md:text-6xl text-4xl font-medium text-center flex items-center justify-center">
      Лучшие апартаменты
    </div>
  </div>

  <div class="pt-10 bg-gray-300">
    <div class="flex gap-4 flex-row justify-center p-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none text-xl w-[350px]">
        <option value="">Тип - По умолчанию</option>
        <option value="Condo">Condo</option>
        <option value="Villa">Villa</option>
      </select>

    </div>
    <Pagination @next-page="nextPage" @previous-page="previousPage" @open-page-by-num="openPageByNum"
                :info="paginationInfo" :currentPage="currentPage" />
  </div>
  <div class="grid gap-5 p-6 justify-items-center"
       style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))" v-auto-animate>
    <CardItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title.ru"
      :image="item.images[0]"
    />
  </div>
</template>
