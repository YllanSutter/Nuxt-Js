<template>
    <div>
      <h2 class="text-white tracking-wider text-2xl text-center pt-10 pb-5">{{ groupName }}</h2>
      <div class="text-white flex gap-x-5 pb-10 justify-center">
        <p>Nombres de jeux du bundle : {{ nombrejeuxbundle }}</p> /  <p>Nombres de jeux voulus : {{ nombrejeuxbundle }}</p> /  <p>Nombres de jeux que j'aurais pu acheter : {{ nombrejeuxachetables }}</p>
      </div>
      <table>
        <!-- Tableau pour afficher les jeux du groupe -->
        <thead>
          <tr class="text-white">
            <th class="text-left">Nom</th>
            <th>Prix Payé</th>
            <th>Prix le plus bas</th>
            <th>Prix le plus bas (Marché Noir)</th>
            <th>Prix Hors Soldes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Utilisation d'une boucle v-for pour afficher les jeux du groupe -->
          <tr v-for="(game, index) in games" :key="index">
            <td>{{ game.name }}</td>
            <td>{{ round(prixPayeParJeu) }}€</td>
            <td>{{ game.prixPlusBas }}€</td>
            <td>{{ game.prixPlusBasMarcheNoir }}€</td>
            <td>{{ game.prixHorsSoldes }}€</td>
           
          </tr>
        </tbody>
        <tfoot class="bg-gray-900">
          <tr>
            <td>Total</td>
            <td>{{ round(prixTotalPaye) }}€</td>
            <td>{{ round(totalPrixPlusBas) }}€</td>
            <td>{{ round(totalPrixPlusBasMarcheNoir) }}€</td>
            <td>{{ round(totalPrixHorsSoldes) }}€</td>
          </tr>
        </tfoot>
        <a v-bind:href="lienBundle" class="absBundle bg-gray-900" target="_blank">Lien vers le bundle</a>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      groupName: String, // Le nom du groupe de jeux
      games: Array, // Les jeux du groupe
      prixTotalPaye: Number, // Prix total payé pour tous les jeux du groupe
      lienBundle: String, // Prix total payé pour tous les jeux du groupe
      nombrejeuxbundle: Number, // Prix total payé pour tous les jeux du groupe
      nombrejeuxvoulus: Number, // Prix total payé pour tous les jeux du groupe
      nombrejeuxachetables: Number, // Prix total payé pour tous les jeux du groupe
    },
    computed:{
        prixPayeParJeu() {
        // Calcul du "Prix payé par jeu" en divisant le "Prix total payé" par le nombre de jeux
        return this.prixTotalPaye / this.games.length;
        },
        totalPrixPlusBas() {
        // Calcul du total pour le "Prix le plus bas"
        return this.games.reduce((total, game) => total + game.prixPlusBas, 0);
        },
        totalPrixPlusBasMarcheNoir() {
        // Calcul du total pour le "Prix le plus bas (Marché Noir)"
        return this.games.reduce((total, game) => total + game.prixPlusBasMarcheNoir, 0);
        },
        totalPrixHorsSoldes() {
        // Calcul du total pour le "Prix le plus bas (Marché Noir)"
        return this.games.reduce((total, game) => total + game.prixHorsSoldes, 0);
        }
    },
  methods: {
      round(value) {
        // Utilisation de Math.round() pour arrondir le prix payé par jeu
        return parseFloat(value).toFixed(2);
      },
      addNewGame() {
    // Créez un nouvel objet de jeu et ajoutez-le au tableau
    const newGame = {
      name: 'Nouveau jeu',
      prixPaye: 0,
      prixPlusBas: 0,
      prixPlusBasMarcheNoir: 0,
      prixHorsSoldes: 0,
    };
    this.addGame(newGame);
  },
  removeGame(index) {
    // Supprimez un jeu en utilisant son index dans le tableau
    this.deleteGame(index);
  },
  updateGameDetails(index, updatedGame) {
    // Mettez à jour les détails d'un jeu en utilisant son index et l'objet mis à jour
    this.updateGame({ index, game: updatedGame });
  },
    },
  };
  </script>