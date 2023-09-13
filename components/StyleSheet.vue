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
    table
    {
        position: relative;
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
    /* ----------- */
    .absBundle
    {
        position: absolute;
        bottom: 0;
        left: 0px;
        transform: rotate(-90deg);
        transform-origin: bottom left;
        background: #ececec;
        padding: 20px 40px;
        transition: all 0.4s;
    }
    .absBundle:hover
    {
        background: #111;
        color: #fff;
    }
</style>