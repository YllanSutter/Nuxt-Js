<template>
    <div>
        <h1 class="font-black tracking-wider text-8xl text-center p-10">{{ titreElem }}</h1>
        <p class="text-center">{{ contenuElem }}</p>
    </div>
</template>

<script>
    export default{
        name:'articleElem',
        props:["titreElem", "contenuElem"]
    }
</script>

<style scoped>

</style>