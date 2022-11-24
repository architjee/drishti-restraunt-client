<template>
  <div v-if="loading">Loading</div>
  Hi! Welcome to the 
  Summary Dashboard
  <a-table :dataSource="dishData" :columns="columns"/>
</template>

<style>
</style>

<script>
import firebaseapp from '../firebaseconfig';
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      loading: false,
      db: getFirestore(firebaseapp),
      dishData : [],
      columns: [
          {
            title: 'Dish Name',
            dataIndex: 'dish',
        
          },
          {
            title: 'Station',
            dataIndex: 'station',
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
          }
        ],
    };
  },
  methods: {
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
      this.loading = false;
    },
    async addDoc() {
      try {
        const docRef = await addDoc(collection(this.db, "data-collection"), {
          dish: "Ada",
          startTime: "24 Nov 8:21AM",
          duration: 10
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  },
  mounted() {

    
    this.readData()
  },

};

</script>