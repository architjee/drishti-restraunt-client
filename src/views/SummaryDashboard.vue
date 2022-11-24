<template>
  <div v-if="loading">Loading</div>
  Hi! Welcome to the 
  Summary Dashboard
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
    };
  },
  methods: {
    async readData() {
      this.loading = true
      let dishData = [];
      const querySnapshot = await getDocs(collection(this.db, "data-collection"));
      console.log("We got the following querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });

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