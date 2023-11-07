<template>
    <div>
      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center">
        <!-- Filtre pour sélectionner les mois à afficher -->
        <select v-model="selectedMonth" @change="filterTables">
          <option value="tous">tous les mois</option>
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>

        <select v-model="selectedYear" @change="filterTables">
          <option value="tous">toutes les années</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

    <!-- Tableau pour afficher le total de tous les totaux -->
    <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable">
      <thead>
        <tr>
          <th>Totaux</th>
          <th>Prix payé</th>
          <th>Prix le plus bas (marché noir)</th>
          <th>Prix le plus bas</th>
          <th>Prix Hors soldes</th>
        </tr>
      </thead>
      <tfoot>
        <tr class="total bg-gray-900 w-full">
          <th>Total général</th>
          <th class="currency">{{ calculateGrandTotalPrixPaye() }}</th>
          <th class="currency">{{ calculateGrandTotal('prixbasmarche') }}</th>
          <th class="currency">{{ calculateGrandTotal('prixbas') }}</th>
          <th class="currency">{{ calculateGrandTotal('prixHorsSoldes') }}</th>
          <th colspan="2"></th>
        </tr>
      </tfoot>
    </table>

      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-for="(table, tableIndex) in filteredTables" :key="tableIndex" :id="table.id">
        <div class="w-full p-10 text-center">
          <textarea spellcheck="false" class="textCenter" v-model="table.tableText" @input="saveTableTextLocally(tableIndex)"></textarea>
          <textarea spellcheck="false" class="textCenter smallTextArea" v-model="table.tableText2" @input="saveTableTextLocally(tableIndex)"></textarea>
        </div>
        <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable" :class="table.mois">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix payé</th>
              <th>Prix le plus bas (marché noir)</th>
              <th>Prix le plus bas</th>
              <th>Prix Hors soldes</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, rowIndex) in table.items" :key="rowIndex" >
              <td class="statut nopad baseWidth" :class="item.tag" :style="{ width: item.name.length * 7 + 'px'}"><input class="w-full" v-model="item.name"  @input="saveDataLocally" placeholder="Nom du jeu"/></td>
              <td class="currency">{{ calculatePrixPaye(table.cout, table.items.length) }}</td>
              <td class="nopad currency"><input class="w-full" v-model="item.prixbasmarche" @input="saveDataLocally" placeholder="......" /></td>
              <td class="nopad currency"><input class="w-full" v-model="item.prixbas" @input="saveDataLocally" placeholder="......"/></td>
              <td class="nopad currency"><input class="w-full" v-model="item.prixHorsSoldes" @input="saveDataLocally" placeholder="......"/></td>
              <td>
                <select v-model="item.tag" @change="saveDataLocally">
                  <option value="base">Base</option>
                  <option value="trade">Trade</option>
                  <option value="traded">Traded</option>
                  <option value="keep">Keep</option>
                </select>
              </td>
              <!-- Supprimer une ligne (passer l'ID du tableau, ainsi que l'ID de la ligne) -->
              <td @click="removeRow(table.id, rowIndex)" class="bg-red-500">Supprimer la ligne</td>
            </tr>
            <tr class="total bg-gray-900 w-full">
              <td>Total</td>
              <td class="nopad currency"><input class="w-full" v-model="table.cout" @input="saveDataLocally" placeholder="Coût" /></td>
              <td class="currency">{{ calculateTotal(table, 'prixbasmarche') }}</td>
              <td class="currency">{{ calculateTotal(table, 'prixbas') }}</td>
              <td class="currency">{{ calculateTotal(table, 'prixHorsSoldes') }}</td>
              <td colspan="2"></td>
            </tr>
          </tbody>
          <tfoot>
            <td class="absBundle nopad">
              <p @click="addRow(table.id)" class="bg-green-500 p-5">Ajouter une ligne</p>
            </td>
            <td class="absBundle nopad inverse">
              <select v-model="table.mois" @change="saveDataLocally">
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select v-model="table.annee" @change="saveDataLocally">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </td>
          </tfoot>
        </table>
        <div class="grid remove justify-center max-w-screen-2xl mx-auto text-red-500 ">
          <p @click="confirmDeleteTable(table.id)" class="p-5 deleteTable">Supprimer le tableau</p>
        </div>
      </div>
  
      <div class="space"></div>
      <button @click="addTable" class="text-white button justify-center p-10 text-center w-full">
        Ajouter un tableau
      </button>
    </div>
  </template>
  
  <script>


  import { saveData, loadData } from '~/data/dataHandler';
  
  export default {
    
    data() {
      return {
        tables: [],
        tableText: '',
        tableText2: '',
        lastTableId: 0,
        currentMonth: '',
        selectedYear: 'tous',
        selectedMonth: 'tous', // Ajoutez cette propriété pour le filtre par mois
        months: [ // Ajoutez cette propriété
          "janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "aout", "septembre", "octobre", "novembre", "décembre"
        ],
        years: [
          2023,2024,2025
        ],
      };
    },
    computed: {
    filteredTables() {
        if (this.selectedMonth === 'tous' && this.selectedYear === 'tous') {
          return this.tables;
        }

        return this.tables.filter(table => {
          const isMonthMatch = this.selectedMonth === 'tous' || table.mois === this.selectedMonth;
          const isYearMatch = this.selectedYear === 'tous' || table.annee === this.selectedYear;
          return isMonthMatch && isYearMatch;
        });
      },
    },
    filters: {
      currency(value) {
        return `${value} €`;
      },
    },
    methods: {
      saveDataLocally() {
        saveData(this.tables);
      },
      saveTableTextLocally(tableIndex) {
        // Sauvegarde du texte du tableau localement
        this.$set(this.tables[tableIndex], 'tableText', this.tables[tableIndex].tableText);
        this.$set(this.tables[tableIndex], 'tableText2', this.tables[tableIndex].tableText2);
        saveData(this.tables);
      },
      filterTables() {
        // Vous pouvez accéder au mois sélectionné et à l'année sélectionnée comme ceci :
        const selectedMonth = this.selectedMonth;
        const selectedYear = this.selectedYear;
        // Faites ce que vous voulez avec les valeurs sélectionnées
        // console.log('Mois sélectionné :', selectedMonth);
        // console.log('Année sélectionnée :', selectedYear);
        this.$forceUpdate();
      },
      addRow(tableId) {
        const tableIndex = this.tables.findIndex(table => table.id === tableId);
        if (tableIndex !== -1) {
          const table = this.tables[tableIndex];
          if (!table.items) {
            table.items = [];
          }
          table.items.push({ name: '', prix: '', prixbasmarche: '', prixbas: '', prixHorsSoldes: '', tag: 'base' });
          this.saveDataLocally();
        }
      },

      removeRow(tableId, rowIndex) {
        const tableIndex = this.tables.findIndex(table => table.id === tableId);
        if (tableIndex !== -1) {
          const table = this.tables[tableIndex];
          table.items.splice(rowIndex, 1);
          this.saveDataLocally();
        }
      },
    getLastTableId() {
    const lastId = localStorage.getItem('lastTableId');
    return lastId ? parseInt(lastId) : 0;
  },
    addTable() {
      const lastId = this.getLastTableId();
      const newTable = {
        id: lastId + 1, // Incrémente le dernier ID
        mois: this.selectedMonth,
        annee: this.selectedYear,
        items: [
          { name: '', prix: '', prixbasmarche: '', prixbas: '', prixHorsSoldes: '', tag: 'base' },
        ],
        tableText: 'Nom du Bundle / jeu',
        tableText2: 'Nombre de jeux initial : 0 / Nombre de jeux final : 0 / Nombres de jeux voulus : 0 / Nombres de jeux que j\'aurais pu acheter : 0',
      };
      this.tables.push(newTable);
      this.saveDataLocally();

      // Mettez à jour le dernier ID dans le stockage local
      localStorage.setItem('lastTableId', newTable.id.toString());
    },
    confirmDeleteTable(tableIndex) {
      //const tableId = this.tables[tableIndex].id; // Obtenez l'ID de la table
      console.log(tableIndex);
      const confirmed = window.confirm('Voulez-vous vraiment supprimer ce tableau ?');
      if (confirmed) {
        this.removeTable(tableIndex); // Appelez la méthode removeTable avec l'ID
      }
    },
    removeTable(tableId) {
      const tableIndex = this.tables.findIndex(table => table.id === tableId);
      if (tableIndex !== -1) {
        this.tables.splice(tableIndex, 1);
        this.saveDataLocally();
      }
    },
      calculateTotal(table, column) {
        let total = 0;
        // Parcourez les éléments du tableau pour calculer le total en fonction de la colonne spécifiée
        for (const item of table.items) {
          if (!isNaN(parseFloat(item[column]))) {
            total += parseFloat(item[column]);
          }
        }
        return total.toFixed(2); // Assurez-vous d'obtenir deux décimales pour le total
      },
      calculatePrixPaye(cout, itemCount) {
        if (itemCount === 0) {
          return 0;
        }
        return (parseFloat(cout) / itemCount).toFixed(2);
      },
      calculateGrandTotal(column) {
        let grandTotal = 0;

        // Parcourez toutes les tables et additionnez les totaux de la colonne spécifiée
        for (const table of this.filteredTables) {
          grandTotal += parseFloat(this.calculateTotal(table, column));
        }

        return grandTotal.toFixed(2);
      },
      calculateGrandTotalPrixPaye() {
        let grandTotalPrixPaye = 0;

        // Parcourez toutes les tables
        for (const table of this.filteredTables) {
          // Obtenez la valeur de "Coût" pour cette table
          const tableCout = parseFloat(table.cout);

          // Assurez-vous que la valeur est un nombre
          if (!isNaN(tableCout)) {
            grandTotalPrixPaye += tableCout;
          }
        }

        return grandTotalPrixPaye.toFixed(2);
      },
    },
    mounted() {
      this.tables = loadData();
      if (!this.tables || !Array.isArray(this.tables)) {
        this.tables = [];
      }
      // Obtenir le mois actuel (par exemple, "janvier") et l'initialiser
      const months = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
      const currentDate = new Date();
      this.currentMonth = months[currentDate.getMonth()];
      this.selectedMonth = this.currentMonth; // Initialiser selectedMonth avec le mois actuel
      console.log(this.currentMonth)

      // Obtenir l'année actuelle et l'initialiser
      const currentYear = currentDate.getFullYear();
      this.years = [currentYear - 1, currentYear, currentYear + 1]; // Vous pouvez personnaliser cette liste
      this.selectedYear = currentYear; // Initialiser selectedYear avec "toutes" pour afficher toutes les années
    },
  };
  </script>
  