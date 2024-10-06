<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'
import { useStore } from 'vuex';
import { onMounted } from "vue";

const props = defineProps({
  isOpen: Boolean,
  currentSongId: Number,  
});

const store = useStore();
const emit = defineEmits(["modal-close","submit-modal"]);

const target = ref(null)
onClickOutside(target, ()=>emit('modal-close'))

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container p-5" ref="target">
        <div class="modal-header">
          <slot name="header">Default header, if you're seeing this something probably went wrong</slot>
        </div>
        <hr/>
        <div class="modal-body">
          <slot name="content">Default body, if you're seeing this something probably went wrong</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: fit-content;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  overflow: auto;
  max-height: 80vh;
}
.modal-header {
  display:flex;
  flex-direction:row;
  justify-content: space-between;
}

</style>