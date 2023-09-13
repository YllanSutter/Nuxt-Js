<template>
  <div class="wrapperSite">
    <Entete />
    <StyleSheet />
    <ArticleElem
      titreElem="Calculator"
      contenuElem="Revenu de tous les jeux"
    />
    <div class="grid justify-center p-10">
      <!-- Utilisation du composant GameGroup pour afficher les groupes de jeux -->
      <GameGroup
        v-for="(group, index) in gameGroups"
        :key="index"
        :group-name="group.groupName"
        :games="group.games"
        :prix-total-paye="group.prixTotalPaye"
      />
    </div>
  </div>
</template>

<script>
import StyleSheet from '~/components/StyleSheet';
import ArticleElem from '~/components/article';
import Entete from '~/components/entete';
import GameGroup from '~/components/GameGroup'; // Importez le composant GameGroup

export default {
  components: {
    StyleSheet,
    ArticleElem,
    Entete,
    GameGroup, // Ajoutez le composant GameGroup ici
  },
  data() {
    return {
      gameGroups: [
        {
          groupName: "Humble Choice - September 2023",
          games: [
        {
          name: "TINY TINA'S WONDERLANDS CHAOTIC GREAT EDITION",
          prixPlusBas: 20,
          prixPlusBasMarcheNoir: 20,
          prixHorsSoldes : 79.99
        },
        {
          name: "DECEIVE INC.",
          prixPlusBas: 10.67,
          prixPlusBasMarcheNoir: 8.49,
          prixHorsSoldes : 20
        },
        {
          name: "THE FORGOTTEN CITY",
          prixPlusBas: 8.74,
          prixPlusBasMarcheNoir: 10.61,
          prixHorsSoldes : 24.99
        },
        {
          name: "ACES & ADVENTURES",
          prixPlusBas: 10.05,
          prixPlusBasMarcheNoir: 6.52,
          prixHorsSoldes : 19.50
        },
        {
          name: "PATCH QUEST",
          prixPlusBas: 5.97,
          prixPlusBasMarcheNoir: 3.34,
          prixHorsSoldes : 14.99
        },
        {
          name: "FORETALES",
          prixPlusBas: 10.29,
          prixPlusBasMarcheNoir: 12.31,
          prixHorsSoldes : 19.99
        },
        {
          name: "WHO PRESSED MUTE ON UNCLE MARCUS",
          prixPlusBas: 4.43,
          prixPlusBasMarcheNoir: 6.20,
          prixHorsSoldes : 14.79
        },
        {
          name: "AUTONAUTS VS PIRATEBOTS",
          prixPlusBas: 5.39,
          prixPlusBasMarcheNoir: 2.14,
          prixHorsSoldes : 19.99
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 9.99, // Prix total payé pour tous les jeux
        },
        {
          groupName: "Groupe 2",
          games: [
            {
              name: "Jeu 2",
              prixPlusBas: 10.67,
              prixPlusBasMarcheNoir: 8.49,
              prixHorsSoldes: 20,
            },
            // Ajoutez d'autres jeux au groupe 2
          ],
          prixTotalPaye: 15.99, // Prix total payé pour le groupe 2
        },
        // Ajoutez d'autres groupes de jeux ici
      ],
    };
  },
};
</script>