<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()

if (localStorage.getItem("authToken")) {
  localStorage.removeItem("authToken");
}

router.push('/')
</script>
<template>
<p>Deconnexion en cours ...</p>
</template>
