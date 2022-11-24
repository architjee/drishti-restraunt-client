<template>
  <div v-if="loading">Loading</div>
  Hi! Welcome to the
  Summary Dashboard
  <a-table :pagination="{pageSize:6}" :data-source="currentStateOfData" :key="currentStateOfData" :columns="columns">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span style="color: #1890ff">Name</span>
      </template>
    </template>
    <template class="a-input-tag" #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" class="a-input-tag"/>
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)" >
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset()">
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ text, column }">
      <span v-if="state.stasearchText && searchedColumn === column.dataIndex">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
    </template>
    
  </a-table>

</template>

<style>

</style>

<script>
import firebaseapp from '../firebaseconfig';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { SearchOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    SearchOutlined
  },
  computed:{
      // a computed getter
      getCurrentStateOfData() {
      // `this` points to the component instance
      return this.currentStateOfData
    }
  },
  data() {
    return {
      loading: false,
      db: getFirestore(firebaseapp),
      dishData: [],
      currentStateOfData : [],
      state: {
        searchText: '',
        searchedColumn: '',
      },
      columns: [
        {
          title: 'Dish Name',
          dataIndex: 'dish',
          customFilterDropdown: true,
          onFilter: (value, record) =>record.dish.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
          title: 'Station',
          dataIndex: 'station',
          customFilterDropdown: true,
          onFilter: (value, record) =>
          record.station.toString().toLowerCase().includes(value.toLowerCase()),

        },
        {
          title: 'Duration',
          dataIndex: 'duration',

        },
        {
          title: 'startTime',
          dataIndex: 'startTime',

        },
        {
          title: 'Action Taken',
          dataIndex: 'action',
          customFilterDropdown: true,
          onFilter: (value, record) => record.action.toString().toLowerCase().includes(value.toLowerCase()),
        //   onFilterDropdownVisibleChange: visible => {
        //   if (visible) {
        //     setTimeout(() => {
        //       searchInput.value.focus();
        //     }, 100);
        //   }
        // },
        }
      ],
      searchInput: {
        dish: false,
        station: false,
        action: false,
      },
      

    };
  },
  methods: {
     handleSearch(selectedKeys, confirm, dataIndex) {
      console.log(selectedKeys)
      this.currentStateOfData=this.currentStateOfData.filter(record=>{
        let text = record[dataIndex]  
        if(text==null || text==undefined)
        {
          return false
        }
    return text.toString().toLowerCase().includes(selectedKeys[0].trim().toLowerCase());
  });
      confirm();
      this.searchInput[selectedKeys]=true
      this.state.searchText = selectedKeys[0];
      this.state.searchedColumn = dataIndex;
    },
    handleReset () {
      console.log("Force resetting by rereading the data from db");
      this.readData();
      this.state.searchText = '';
    },
    async readData() {
      this.loading = true
      let dishData = [];
      const querySnapshot = await getDocs(collection(this.db, "data-collection"));
      console.log("We got the following querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        dishData.push(doc.data())
        console.log(`${doc.id} => ${doc.data()}`);
      });
      console.log(dishData)
      this.dishData = dishData
      this.currentStateOfData = this.dishData;
      this.loading = false;
    },
    async addDoc() {
      // This is a dummy function to add sample documents.
      // try {
      //   const docRef = await addDoc(collection(this.db, "data-collection"), {
      //     dish: "Ada",
      //     startTime: "24 Nov 8:21AM",
      //     duration: 10
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
    }
  },
  mounted() {
    this.readData()

  },

};

</script>
<style scoped>

</style>