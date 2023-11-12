<template>
  <div class="text-white text-center">
    <Entete/>
    <StyleSheet/>
    <h1>Tier List! 👋</h1>
  </div>
</template>

<script>
import Entete from '~/components/entete';
import StyleSheet from '~/components/StyleSheet.vue';
import listGameData from '~/static/listGame.json';  // Renommez la constante locale ici

export default {
  components: {
    Entete,
    StyleSheet,
  },
  data() {
    return {
      games: [], // Nous allons remplir ce tableau avec les données JSON
      filters: {
        '2d': false,
        '4x': false,
        // Ajoutez d'autres filtres ici avec le même format
      },
    };
  },
  computed: {
    filteredGames() {
      // Filtrer les jeux en fonction des filtres sélectionnés
      return this.games.filter(game => {
        return Object.keys(this.filters).every(filter => {
          // Si le filtre est activé, vérifie si la catégorie est cochée pour le jeu
          return !this.filters[filter] || game[filter] === 'x';
        });
      });
    },
  },
  mounted() {
    this.loadGameData();
  },
  methods: {
    async loadGameData() {
      try {
        // Utilisez le nom correct pour la constante locale
        const response = await fetch(listGameData);

        if (!response.ok) {
          throw new Error(`Erreur de chargement du fichier JSON: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("Le fichier JSON est vide ou mal formé.");
        }

        this.games = data;
      } catch (error) {
        console.error('Erreur lors du chargement des données depuis le fichier JSON', error);
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez du style ici si nécessaire */
</style>
