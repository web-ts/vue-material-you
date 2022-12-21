<script setup>
import {ref} from "vue"
const model = ref("")
const showRules = ref(false)

function required(value){
    return value ? true : 'This is required'
}

</script>

# Inputs

Defaults

<div class="flex flex-col gap-4 max-w-sm">
  <vmu-input v-model="model" label="Default Input" />
  <vmu-input v-model="model" label="With Icon" leading-icon="line-md:heart-twotone" :rules="showRules ? required : undefined" />
  <vmu-button @click="showRules = !showRules">Toggle</vmu-button>
</div>
