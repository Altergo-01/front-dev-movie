<script>

export default {
    props: {
        info1 : String,
        info2 : String,
        info3 : String,
        info4 : String,
        info5 : String,
    },
 
    components: {
 
    },
    data() {
        return {
          
        };
    },
    methods: {
 
    },
   
}

</script>


<template>
    <div class="card_container">
        <img :src="this.info1" alt="">
        <p> {{ info2 }} {{ info3 }}</p>
    </div>
</template>


<style scoped>
.card_container{
    padding: 2rem 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    row-gap: 1rem;
    width: 15vw;
    height: 35vh;
    border-radius: 0.75rem;
    background-color: rgb(39, 39, 39);
}

img{
    width: 80%;
}

p{
    color: white;
    font-size: 22px;
}
</style>