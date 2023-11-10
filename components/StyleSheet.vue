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
        border-radius: 16px 16px 0 0;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        color: #fff;
        font-family: 'Dosis', sans-serif;
    }
    table.hideElements tbody tr:not(:first-child,:last-child)
    {
        display: none;
    }
    td
    {
        padding: 15px 20px;
        border: 1px solid #ffffff12;
        transition: all 0.4s;
    }
    .baseWidth input
    {
        min-width: 200px;
        text-align: left;
    }
    th,td
    {
        position: relative;
    }
    th:not(:first-child), td.currency,td.heures
    {
        max-width: 100px;
    }
    .maxSize
    {
        max-width: 170px;
    }
    th.currency,th.heures
    {
        padding-right: 20px;
    }
    td.nopad
    {
        padding: 0;
    }
    td input
    {
        padding: 20px;
        text-align: right;
    }
    .currency::after,.heures::after,.nbjeux::after
    {
        content: "€";
        position: absolute;
        top: 0;
        left: initial;
        right: 10px;
        height: 100%;
        display: grid;
        align-items: center;
    }
    .heures::after
    {
        content: "h";
    }
    .nbjeux
    {
        text-align: center!important;
    }
    .nbjeux::after
    {
        content: "jeux";
        right: 10Px;
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
    td:not(:first-child,.text-center,.text-left),th:not(:first-child,.text-center,.text-left)
    {
        text-align: right;
    }
    td:hover,td p:hover
    {
        background: #ffffff12;
    }
    td p
    {
        transition: all 0.5s;
    }
    th
    {
        text-transform: uppercase;
        letter-spacing: 2Px;
        font-size: 10Px;
        padding: 10px;
    }
    .draghandle
    {
        position: relative;
    }
    .draghandle::before
    {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(../assets/move.svg);
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.1;
        transition: all 0.4s;
    }
    .draghandle:hover::before
    {
        opacity: 0.3;
    }
    tfoot
    {
        width: 100%;
    }
    textarea
    {
        font-size: 2em;
        text-align: center;
        display: grid;
        justify-items: center;
        margin: 0 auto;
        width: 100%;
        /* Désactive le soulignement des erreurs */
        text-decoration: none !important;
        outline: none;
        resize: none;
        height: 60Px!important;
    }
    .smallTextArea
    {
        font-size: 1em;
        height: 25px!important;
    }
    tfoot td:not(:first-child,.ratio)
    {
        text-align: center;
    }
    .selectableTable *,.deleteTable
    {
        cursor: pointer;
    }
    .selectableTable input
    {
        cursor: initial;
    }
    input,select,textarea
    {
        background: #fff0;  
        outline: none!important; 
        -webkit-box-shadow: none!important;
        box-shadow: none!important;
    }
    select,select:focus
    {
        padding: 10px;
    }
    option
    {
        color: #010f1e!important;
    }
    .space
    {
        height: 300px;
    }
    .total td input
    {
        text-align: right;
    }

    .noborder
    {
        border: none!important;
        border-color: #fff0!important;
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
    .absBundle.inverse
    {
        left: initial;
        right: 0;
        transform-origin: bottom right;
        transform: rotate(90deg);
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
    /* ----RECHERCHE ---- */
    .inputGap
    {
        padding: 0 20px;
    }
    /* ----STATUT ET COULEUR ---- */
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
        border-bottom: 1Px solid #2f666a!important;
    }
    .green
    {
        border-bottom: 1Px solid #1e8847!important;
    }
     .orange
    {
        border-bottom: 1Px solid orange!important;
    }
    .trade,.red
    {
        border-bottom: 1Px solid #f00!important;
    }
    .traded
    {
        border-bottom:  1Px solid #3c4b56!important;
    }
    .platine
    {
        border-bottom:  1Px solid #af8303!important;
    }
    .platine::before
    {
        background: #463400!important;
    }
    .traded::before,.traded .statut::before
    {
        background: #010f1e!important;
    }
   .trade::before,.trade .statut::before
    {
        background: #700f0f!important;
    }
    .keep::before,.keep .statut::before
    {
        background: #214c4c;
    }
    .highlight
    {
        border-left:3px solid #af8303;
    }

</style>