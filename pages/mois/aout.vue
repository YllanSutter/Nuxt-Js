<template>
  <div class="wrapperSite">
    <Entete />
    <Entetesecondaire />
    <StyleSheet />
    <ArticleElem
      titreElem="Août 2023"
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

    <div class=" gap-20 flexDirectionScroll" data-scroll-container>
        <!-- Utilisation du composant GameGroup pour afficher les groupes de jeux -->
        <GameGroup
          v-for="(group, index) in gameGroups"
          :key="index"
          :group-name="group.groupName"
          :games="group.games"
          :prix-total-paye="group.prixTotalPaye"
          :lienBundle="group.lienBundle"
          :nombrejeuxbundle="group.nombrejeuxbundle"
          :nombrejeuxvoulus="group.nombrejeuxvoulus"
          :nombrejeuxachetables="group.nombrejeuxachetables"
        />
        
      </div>
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
          groupName: "Take your turn",
          games: [
         {
          name: "Song of conquest",
          prixPlusBas: 14.99,
          prixPlusBasMarcheNoir: 10.74,
          prixHorsSoldes :  29.99
        },
        {
          name: "Banner saga trilogy deluxe pack",
          prixPlusBas: 11.80,
          prixPlusBasMarcheNoir: 6.44,
          prixHorsSoldes :  64.15
        },
        {
          name: "Immortal realms : vampire wars",
          prixPlusBas: 13.79,
          prixPlusBasMarcheNoir: 2.89,
          prixHorsSoldes :  29.99
        },
        {
          name: "Before we leave",
          prixPlusBas: 3.43,
          prixPlusBasMarcheNoir: 1.59,
          prixHorsSoldes : 17.99
        },
        {
          name: "Supraland",
          prixPlusBas: 9.99,
          prixPlusBasMarcheNoir: 1.63,
          prixHorsSoldes : 19.99
        },
        {
          name: "Unexplored 2",
          prixPlusBas:  15.42,
          prixPlusBasMarcheNoir: 1.07,
          prixHorsSoldes : 19.50
        },
        {
          name: "Spirit Hunter NG",
          prixPlusBas: 17.21,
          prixPlusBasMarcheNoir: 2.72,
          prixHorsSoldes : 41.99
        },
        {
          name: "TOEM",
          prixPlusBas: 15.99,
          prixPlusBasMarcheNoir: 0.89,
          prixHorsSoldes : 19.50
        },
        {
          name: "Alien fireteam elite",
          prixPlusBas: 11.85,
          prixPlusBasMarcheNoir: 4.13 ,
          prixHorsSoldes : 29.99
        },
        {
          name: "Alien fireteam elite",
          prixPlusBas: 11.85,
          prixPlusBasMarcheNoir: 4.13 ,
          prixHorsSoldes : 29.99
        },
        {
          name: "Spellcaster university",
          prixPlusBas: 16.79,
          prixPlusBasMarcheNoir: 2.10,
          prixHorsSoldes : 20.99
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 18.18, // Prix total payé pour tous les jeux
      lienBundle : 'https://www.humblebundle.com/games/take-your-turn-tactics-rpgs',
      nombrejeuxbundle : 8,
      nombrejeuxvoulus : 4,
      nombrejeuxachetables : 1,
      },
      // {
      //   groupName: "Groupe 2",
      //   games: [
      //   {
      //     name: "TINY TINA'S WONDERLANDS CHAOTIC GREAT EDITION",
      //     prixPlusBas: 20,
      //     prixPlusBasMarcheNoir: 20,
      //     prixHorsSoldes : 79.99
      //   },
      //   {
      //     name: "DECEIVE INC.",
      //     prixPlusBas: 10.67,
      //     prixPlusBasMarcheNoir: 8.49,
      //     prixHorsSoldes : 20
      //   },
      //   {
      //     name: "THE FORGOTTEN CITY",
      //     prixPlusBas: 8.74,
      //     prixPlusBasMarcheNoir: 10.61,
      //     prixHorsSoldes : 24.99
      //   },
      //   {
      //     name: "ACES & ADVENTURES",
      //     prixPlusBas: 10.05,
      //     prixPlusBasMarcheNoir: 6.52,
      //     prixHorsSoldes : 19.50
      //   },
      //   {
      //     name: "PATCH QUEST",
      //     prixPlusBas: 5.97,
      //     prixPlusBasMarcheNoir: 3.34,
      //     prixHorsSoldes : 14.99
      //   },
      //   {
      //     name: "FORETALES",
      //     prixPlusBas: 10.29,
      //     prixPlusBasMarcheNoir: 12.31,
      //     prixHorsSoldes : 19.99
      //   },
      //   {
      //     name: "WHO PRESSED MUTE ON UNCLE MARCUS",
      //     prixPlusBas: 4.43,
      //     prixPlusBasMarcheNoir: 6.20,
      //     prixHorsSoldes : 14.79
      //   },
      //   {
      //     name: "AUTONAUTS VS PIRATEBOTS",
      //     prixPlusBas: 5.39,
      //     prixPlusBasMarcheNoir: 2.14,
      //     prixHorsSoldes : 19.99
      //   },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      // prixTotalPaye: 9.99, // Prix total payé pour tous les jeux
      // lienBundle : 'https://www.humblebundle.com/membership/september-2023',
      // nombrejeuxbundle : 5,
      // nombrejeuxvoulus : 5,
      // nombrejeuxachetables : 5,
      //},
      
        // Ajoutez d'autres groupes de jeux ici
      //],
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
      },
    },
};
</script>