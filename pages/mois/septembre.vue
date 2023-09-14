<template>
  <div class="wrapperSite">
    <Entete />
    <Entetesecondaire />
    <StyleSheet />
    <ArticleElem
      titreElem="Septembre 2023"
      contenuElem="Dépenses & revenu de tous les jeux du mois"
    />
    <div class="grid justify-center p-10">

      <!-- Afficher le total des prix hors soldes -->
      <table>
      <thead>
          <tr class="font-black">
            <th>Total Payé</th>
            <th>Total Prix le plus bas</th>
            <th>Total Prix le plus bas (Marché Noir)</th>
            <th>Total Prix hors soldes</th>
          </tr>
        </thead>
      <tr class="total-prix">
        <td> {{  round(totalPrixPaye) }} €</td>
        <td> {{  round(totalprixPlusBas) }} €</td>
        <td> {{  round(totalPrixPlusBasMarcheNoir) }} €</td>
        <td> {{  round(totalPrixHorsSoldes) }} €</td>
      </tr>
    </table>


      <!-- Utilisation du composant GameGroup pour afficher les groupes de jeux -->
      <GameGroup
        v-for="(group, index) in gameGroups"
        :key="index"
        :group-name="group.groupName"
        :games="group.games"
        :prix-total-paye="group.prixTotalPaye"
        :lienBundle="group.lienBundle"
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
      lienBundle : 'https://www.humblebundle.com/membership/september-2023',
      },
      // {
      //   groupName: "Groupe 2",
      //   games: [
      //     {
      //       name: "Jeu 2",
      //       prixPlusBas: 10.67,
      //       prixPlusBasMarcheNoir: 8.49,
      //       prixHorsSoldes: 20,
      //     },
      //     // Ajoutez d'autres jeux au groupe 2
      //   ],
      //   prixTotalPaye: 15.99, // Prix total payé pour le groupe 2
      //     lienBundle : 'test',
      // },
      
        // Ajoutez d'autres groupes de jeux ici
      ],
    };
  },
  computed: {
    totalPrixHorsSoldes() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixHorsSoldes;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
    totalprixPlusBas() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixPlusBas;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
    totalPrixPaye() {
      // Utilisez reduce pour calculer la somme des prix payés de tous les jeux de tous les groupes
      return this.gameGroups.reduce((total, group) => {
        return total + group.prixTotalPaye;
      }, 0);
    },
    totalPrixPlusBasMarcheNoir() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixPlusBasMarcheNoir;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
  },
  methods: {
    round(value) {
      // Utilisation de Math.round() pour arrondir le prix payé par jeu
      return parseFloat(value).toFixed(2);
    }
    },
};
</script>