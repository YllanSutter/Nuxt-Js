<template>
    <div class="">
      
    </div>
</template>

<script>


    export default{
      
    }
</script>

<style >
    body
    {
        font-family: 'Dosis', sans-serif;
    }
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
    .border-b-2 
    {
        border-color: #ffffff50;
        border-bottom-width: 1Px;
    }
    table
    {
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        color: #fff;
        font-family: 'Dosis', sans-serif;
    }
    td
    {
        padding: 20px;
        border: 1px solid #ffffff12;
        position: relative;
    }
    tr:last-child>td
    {
        border-bottom: none;
    }
    td:first-child
    {
        border-left: none;
    }
    td:last-child
    {
        border-right: none;
    }
    td:not(:first-child),th:not(:first-child)
    {
        text-align: right;
    }
    td:hover
    {
        background: #ffffff12;
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
        padding: 20px 40px;
        transition: all 0.4s;
    }
    .absBundle:hover
    {
        background: #111;
        color: #fff;
    }
    body::before
    {
        content : "";
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: url(../assets/background.jpg);
        filter: brightness(0.095);
        z-index: -1;
    }
    /* ----------- */
    .statut
    {
        position: relative;
    }
    .statut::before
    {
        content: "";
        opacity: 0.3;
        position:absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: all 0.4s;
        z-index: -1;
    }
    .statut:hover::before
    {
        opacity: 0.6;
    } 
    .keep
    {
        border-bottom: 1Px solid #2f666a;
    }
    .trade
    {
        border-bottom: 1Px solid #6f4949;
    }
    .traded
    {
        border-bottom:  1Px solid #3c4b56;
    }
    .traded::before
    {
        background: #010f1e;
    }
   .trade::before
    {
        background: #700f0f;
    }
    .keep::before
    {
        background: #214c4c;
    }

</style>