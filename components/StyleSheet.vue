<template>
    <div class="">
      
    </div>
</template>

<script>


    export default{
      
    }
</script>

<style >
    .boite *
    {
        pointer-events: none;
    }
    .boite.active
    {
        background-color: red;
    }
    .boite:not(.active) .hiddenBox, .boite.active .visibleBox
    {
        display: none;
    }
    td
    {
        padding: 20px;
        border: 1px solid #00000090;
    }
    th
    {
        text-transform: uppercase;
        letter-spacing: 2Px;
        font-size: 10Px;
        padding: 10px;
    }
</style>