<script>

 
export default {
    
    components: {
 
     
    },
    props: {
        isOpen: Boolean,  
    
    },
    watch: {
        isOpen(newVal) {
         this.isModalVisible = newVal;
        },
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        closeModal() {
            this.isModalVisible = false;
             this.$emit('modal-closed');
        },
    },
   
}

</script>


<template>
    <div  @click="closeModal" v-if="isModalVisible" class="modal_veil">
        <div class="modal_container" @click.stop> 
            <button @click="closeModal" class="cross_close"> X </button>

            <slot></slot>

               
           
        </div>
    </div>
</template>


<style scoped>

.modal_veil{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.368);
    z-index: 1000;
}

.modal_container{
    position: relative;
    width: max-content;
    height: max-content;
    padding: 4rem 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 4rem;
    background-color: #ffffff;
    border-radius: 1rem;
    overflow: hidden;
}

.cross_close{
    position: absolute;
    right: 0;
    top: 0;
}

</style>