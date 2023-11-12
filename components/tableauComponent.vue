<template>
    <div>
      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center">
          <!-- Filtre pour sélectionner les mois à afficher -->
          <select v-model="selectedPlateforme" @change="filterTables">
            <option value="tous">toutes les plateformes</option>
            <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
          </select>

          <select v-model="selectedMonth" @change="filterTables">
            <option value="tous">tous les mois</option>
            <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
          </select>

          <select v-model="selectedYear" @change="filterTables">
            <option value="tous">toutes les années</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <input class="inputGap" v-model="searchText" @input="filterTables" placeholder="Rechercher..." />
  </div>
  <div class="posfix checkboxTableauCalculator  text-white ">
    <div class="absBundle nopad affichageWrapChoix" @click="toggleWrapChoix">
      <p class="bg-green-500 p-5">Plus d'options</p>
    </div>
    <div class="wrapChoix bg-gray-900 grid p-10" v-show="isWrapChoixVisible">
      <!-- Checkbox -->
      <select v-model="selectedPlateforme" @change="filterTables">
        <option value="tous">toutes les plateformes</option>
        <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
      </select>

      <select v-model="selectedMonth" @change="filterTables">
        <option value="tous">tous les mois</option>
        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
      </select>

      <select v-model="selectedYear" @change="filterTables">
        <option value="tous">toutes les années</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <input class="inputGap" v-model="searchText" @input="filterTables" placeholder="Rechercher..." />
      <div v-for="column in columnsCreate" :key="column[0]">
        <div class="checkbox-wrapper">
          <input
            type="checkbox"
            :id="'cbx-' + column[0]"
            class="inp-cbx"
            v-model="columnVisibility[column[0]]"
            @click="toggleColumn(column[0])"
            style="display:none"
          />
          <label :for="'cbx-' + column[0]" class="cbx">
            <span class="checkbox-custom">
              <svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1"></polyline>
              </svg>
            </span>
            <span class="label-text">{{ column[1] }}</span>
          </label>
        </div>
      </div>
      <div class="checkbox-wrapper"><input type="checkbox" id="tab-cbx-1" class="inp-cbx" v-model="columnVisibility.hideAllElements" @click="hideAllElements()" style="display:none"/><label class="cbx" for="tab-cbx-1"><span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span><span class="label-text">Réduire les tableaux</span></label></div>
    </div>
  </div>

    <!-- Tableau pour afficher le total de tous les totaux -->
    <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable">
      <thead>
        <tr>
          <th>Totaux</th>
          <th v-if="columnVisibility.showPrixPaye">Prix payé</th>
          <th>Nombre de jeux</th>
          <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
          <th v-if="columnVisibility.showPrixBasMarche">Prix le plus bas (marché noir)</th>
          <th v-if="columnVisibility.showPrixBas">Prix le plus bas</th>
          <th v-if="columnVisibility.showPrixHorsSoldes">Prix Hors soldes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="total bg-gray-900 w-full">
          <td>Total général</td>
          <td v-if="columnVisibility.showPrixPaye" class="currency"  :class="(calculateGrandTotalPrixPaye() > 0 && calculateGrandTotalPrixPaye() <= 25 ? 'green ' : '') + (calculateGrandTotalPrixPaye() > 25 && calculateGrandTotalPrixPaye() < 50 ? 'orange' : '') + (calculateGrandTotalPrixPaye() >= 50 ? 'red' : '')">{{ calculateGrandTotalPrixPaye() }}</td>
          <td class="nbjeux">{{ totalNumberOfGamesForVisibleTables() }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ calculateGrandTotal('heuresJouees') }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ calculateGrandTotal('prixbasmarche') }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ calculateGrandTotal('prixbas') }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ calculateGrandTotal('prixHorsSoldes') }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Ratio</td>
          <td></td>
          <td v-if="columnVisibility.showPrixPaye" class="ratio" :class="(ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) > 0 && ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) <= 2.5 ? 'green ' : '') + (ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) > 2.5 && ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) < 4 ? 'orange' : '') + (ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) >= 4 ? 'red' : '')">{{ ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) }}€/jeu</td>
          <td v-if="columnVisibility.showHeuresJouees" class="ratio" :class="(ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) > 0 && ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) <= 1 ? 'green ' : '') + (ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) > 1 && ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) < 2 ? 'orange' : '') + (ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) >= 2 ? 'red' : '')">{{ ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) }}€/h</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="ratio" :class="(ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="ratio" :class="(ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="ratio" :class="(ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) }}</td>
        </tr>
      </tfoot>
    </table>

      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-for="(table, tableIndex) in filteredTables" :key="tableIndex" :id="table.id">
        <div class="w-full p-10 text-center">
          <textarea spellcheck="false" class="textCenter" v-model="table.tableText" @input="saveTableTextLocally(tableIndex)"></textarea>
          <textarea spellcheck="false" class="textCenter smallTextArea" v-model="table.tableText2" @input="saveTableTextLocally(tableIndex)"></textarea>
        </div>
        <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable" :class="[table.mois, { 'hideElements': !table.hideElementsVisible }]">
          <thead>
            <tr>
              <th class="text-center">Move</th>
              <th class="text-left">Nom</th>
              <th v-if="columnVisibility.showPrixPaye">Prix payé</th>
              <th v-if="columnVisibility.showPrixBasMarche">Prix le plus bas (marché noir)</th>
              <th v-if="columnVisibility.showPrixBas">Prix le plus bas</th>
              <th v-if="columnVisibility.showPrixHorsSoldes">Prix Hors soldes</th>
              <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
              <th v-if="columnVisibility.showTag" class="text-center">Tag</th>
              <th v-if="columnVisibility.showActions && table.items.length > 1" class="hideChild"  @click="toggleHideElements(table.id)">{{ !table.hideElementsVisible ? 'Voir +' : 'Voir -' }}</th>
            </tr>
          </thead>
          <!-- <tbody v-if="table.items.length > 0"> -->
            <draggable v-if="table.items.length > 0" tag="tbody" v-model="table.items" v-bind="dragOptions" handle=".draghandle" @end="handleDragEnd">
              <tr v-for="(item, rowIndex) in table.items" :key="rowIndex" >
                <td class="draghandle"></td>
                <td spellcheck="false" class="statut nopad baseWidth" :class="item.tag" :style="{ width: item.name.length * 9 + 'px'}">
                  <input
                    class="w-full"
                    v-model="item.name"
                    @input="saveDataLocally(table.id)"
                    placeholder="Nom du jeu"
                    :class="{ 'highlight': shouldHighlight(item.name, false) }"
                  />
                </td>
                <td v-if="columnVisibility.showPrixPaye" class="currency">{{ calculatePrixPaye(table.cout, table.items.length) }}</td>
                <td v-if="columnVisibility.showPrixBasMarche" class="nopad currency"><input class="w-full" v-model="item.prixbasmarche" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbasmarche')" placeholder="......" /></td>
                <td v-if="columnVisibility.showPrixBas" class="nopad currency"><input class="w-full" v-model="item.prixbas" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbas')" placeholder="......"/></td>
                <td v-if="columnVisibility.showPrixHorsSoldes" class="nopad currency"><input class="w-full" v-model="item.prixHorsSoldes"  @input="fixDecimalSeparator(table.id, rowIndex, 'prixHorsSoldes')" placeholder="......"/></td>
                <td v-if="columnVisibility.showHeuresJouees" class="nopad heures"><input class="w-full" v-model="item.heuresJouees"  @input="fixDecimalSeparator(table.id, rowIndex, 'heuresJouees')" placeholder="......"/></td>
                <td v-if="columnVisibility.showTag" class="text-center">
                  <select v-model="item.tag" @change="saveDataLocally">
                    <option value="base">Base</option>
                    <option value="trade">Trade</option>
                    <option value="traded">Traded</option>
                    <option value="platine">100%</option>
                    <option value="keep">Keep</option>
                  </select>
                </td>
                <!-- Supprimer une ligne (passer l'ID du tableau, ainsi que l'ID de la ligne) -->
                <td v-if="columnVisibility.showActions" @click="removeRow(table.id, rowIndex)" class="bg-red-500 text-center">Supprimer la ligne</td>
              </tr>
            <tr class="total bg-gray-900 w-full">
              <td></td>
              <td>Total : Nombre de jeux : {{table.items.length}}</td>
              <td v-if="columnVisibility.showPrixPaye" class="nopad currency"><input class="w-full" v-model="table.cout" @input="saveDataLocally(table.id)" placeholder="Coût" /></td>
              <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ calculateTotal(table, 'prixbasmarche') }}</td>
              <td v-if="columnVisibility.showPrixBas" class="currency">{{ calculateTotal(table, 'prixbas') }}</td>
              <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ calculateTotal(table, 'prixHorsSoldes') }}</td>
              <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ calculateTotal(table, 'heuresJouees') }}</td>
              <td v-if="columnVisibility.showTag" class="maxSize"></td>
              <td v-if="columnVisibility.showActions" class="maxSize lastmodified">Modifié le {{table.lastModified}}</td>
            </tr>
            
          </draggable>
          <!-- </tbody> -->
          <tfoot>
            <td class="absBundle nopad">
              <p @click="addRow(table.id)" class="bg-green-500 p-5">Ajouter une ligne</p>
            </td>
            <td class="absBundle nopad inverse">
              <select v-model="table.plateforme" @change="saveDataLocally()">
                <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
              </select>
              <select v-model="table.mois" @change="saveDataLocally()">
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select v-model="table.annee" @change="saveDataLocally()">
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

  import draggable from 'vuedraggable';
  import { saveData, loadData } from '~/data/dataHandler';
  
  export default {
    components: {
      draggable, // Ajoutez le composant vuedraggable
    },
    data() {
      return {
        dragOptions: {
          animation: 150, // Durée de l'animation de glissement en millisecondes
        },
        tables: [],
        tableText: '',
        tableText2: '',
        lastTableId: 0,
        lastModified:'',
        currentMonth: '',
        selectedYear: 'tous',
        selectedMonth: 'tous', // Ajoutez cette propriété pour le filtre par mois
        selectedPlateforme: 'tous', // Ajoutez cette propriété pour le filtre par mois
        months: [ // Ajoutez cette propriété
          "janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "aout", "septembre", "octobre", "novembre", "décembre"
        ],
        plateformes: [ // Ajoutez cette propriété
          "Autres", "Steam", "Fanatical", "Humble"
        ],
        years: [
          2023,2024,2025
        ],
        hideElementsVisible: true,
        searchText: '',
        columnVisibility: {
          showPrixPaye: true,
          showPrixBasMarche: true,
          showPrixBas:true,
          showPrixHorsSoldes:true,
          showHeuresJouees:true,
          showTag:false,
          showActions:false,
        },
        columnsCreate : [
          ['showPrixPaye', 'Afficher Prix payé'],
          ['showPrixBasMarche', 'Afficher Prix marché'],
          ['showPrixBas', 'Afficher Prix bas'],
          ['showPrixHorsSoldes', 'Afficher Prix hors soldes'],
          ['showHeuresJouees', 'Afficher Heures jouées'],
          ['showTag', 'Afficher Tag']
        ],
        columnCreateVisibility: this.generateColumnVisibilityObject(['showPrixPaye', 'showPrixBasMarche', 'showPrixBas', 'showPrixHorsSoldes', 'showHeuresJouees', 'showTag']),
        isWrapChoixVisible: false,
        showElementsVisibleAll: true,
        
      };
    },
    computed: {
    filteredTables() {
        if (this.selectedMonth === 'tous' && this.selectedYear === 'tous' && this.selectedPlateforme === 'tous') {
          return this.tables;
        }

        return this.tables.filter(table => {
          const isMonthMatch = this.selectedMonth === 'tous' || table.mois === this.selectedMonth;
          const isYearMatch = this.selectedYear === 'tous' || table.annee === this.selectedYear;
          const isPlateformeMatch = this.selectedPlateforme === 'tous' || table.plateforme === this.selectedPlateforme;

         // Ajoutez un filtre de recherche en fonction de this.searchText
      const isSearchMatch = this.searchText === '' || 
        table.items.some(item => item.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        table.tableText.toLowerCase().includes(this.searchText.toLowerCase());


          return isMonthMatch && isYearMatch && isPlateformeMatch && isSearchMatch;
        });
      },
    },
    filters: {
      currency(value) {
        return `${value} €`;
      },
    },
    methods: {
      saveDataLocally(tableId) {
        //console.log(tableId);
        this.tables.forEach((table) => {
          const tableData = this.tables.find((t) => t.id === tableId); // Trouvez le tableau correspondant
          if (tableData) {
            tableData.lastModified = new Date().toLocaleString(); // Mettez à jour la date de modification
          }
        });
        saveData(this.tables);
      },
      saveTableTextLocally(tableIndex) {
        // Sauvegarde du texte du tableau localement
        this.$set(this.tables[tableIndex], 'tableText', this.tables[tableIndex].tableText);
        this.$set(this.tables[tableIndex], 'tableText2', this.tables[tableIndex].tableText2);
        saveData(this.tables);
        //console.log(this.tables[tableIndex]);
      },
      filterTables() {
        // Vous pouvez accéder au mois sélectionné et à l'année sélectionnée comme ceci :
        const selectedMonth = this.selectedMonth;
        const selectedYear = this.selectedYear;
        const selectedPlateforme = this.selectedPlateforme;
        // Faites ce que vous voulez avec les valeurs sélectionnées
        // console.log('Mois sélectionné :', selectedMonth);
        // console.log('Année sélectionnée :', selectedYear);
        this.$forceUpdate();
      },
      fixDecimalSeparator(tableId, rowIndex, columnName) {
        // Récupérez la valeur actuelle
        const tableIndex = this.tables.findIndex(table => table.id === tableId);
        if (tableIndex !== -1) {
          const table = this.tables[tableIndex];
          if (table.items && table.items[rowIndex]) {
            const value = table.items[rowIndex][columnName];
            
            // Remplacez les virgules par des points
            const fixedValue = value.replace(',', '.');

            // Mettez à jour la valeur dans le tableau
            this.$set(table.items[rowIndex], columnName, fixedValue);

            // Sauvegardez les données localement
            this.saveDataLocally(tableId);
          }
        }
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
          plateforme: this.selectedPlateforme,
         hideElementsVisible: true,
          items: [
            { name: '', prix: '', prixbasmarche: '', prixbas: '', prixHorsSoldes: '', tag: 'base' },
          ],
          tableText: 'Nom du Bundle / jeu',
          tableText2: 'Nombre de jeux initial : 0 / Nombres de jeux voulus : 0 / Nombres de jeux que j\'aurais pu acheter : 0', 
          lastModified: new Date().toLocaleString(), // Ajoutez la date de création
        };
        this.tables.push(newTable);
        this.saveDataLocally();

        // Mettez à jour le dernier ID dans le stockage local
        localStorage.setItem('lastTableId', newTable.id.toString());
      },
      confirmDeleteTable(tableIndex) {
        //const tableId = this.tables[tableIndex].id; // Obtenez l'ID de la table
        //console.log(tableIndex);
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
      ratio(column1, column2, column3) {
        let result = parseFloat(column1 / column2);
        if (!isNaN(result) && !isNaN(column3)) {
          result /= parseFloat(column3);
        }
        return isNaN(result) ? 0 : result.toFixed(2);
      },
      totalNumberOfGamesForVisibleTables() {
        let total = 0;
        for (const table of this.filteredTables) {
          total += table.items.length;
        }
        return total;
      },
      handleDragEnd(event) {
        // L'ordre des éléments a été modifié, mettez à jour les données
        // dans le tableau correspondant et sauvegardez les données localement.
        this.tables.forEach((table) => {
          if (table.items) {
            table.items = table.items.map((item, index) => ({
              ...item,
              // Vous pouvez également mettre à jour d'autres propriétés si nécessaire
            }));
          }
        });
        this.saveDataLocally();
      },
      toggleHideElements(tableId) {
        
        const tableIndexHide = this.tables.findIndex(table => table.id === tableId);
        if (tableIndexHide !== -1) {
         this.tables[tableIndexHide].hideElementsVisible = !this.tables[tableIndexHide].hideElementsVisible;
        }
        
        this.saveDataLocally();
      },
      hideAllElements() {
      // Inversez la valeur de showElementsVisibleAll
      this.showElementsVisibleAll = !this.showElementsVisibleAll;

      // Appliquez la même valeur à hideElementsVisible pour chaque table
      this.tables.forEach(table => {
        table.hideElementsVisible = this.showElementsVisibleAll;
      });

      this.saveDataLocally();
    },
      shouldHighlight(itemName, isTableText) {
        if (isTableText) {
          return false; // Ne mettez pas en surbrillance dans le textarea
        }

        return this.searchText && itemName.toLowerCase().includes(this.searchText.toLowerCase());
      },
      //colonnes a afficher
      toggleColumn(column) {
        // Basculez l'état de la colonne dans l'objet columnVisibility
        this.columnVisibility[column] = !this.columnVisibility[column];

        // Mettez à jour la visibilité des colonnes dans toutes les tables
        this.tables.forEach(table => {
          table[column] = this.columnVisibility[column];
        });

        // Forcez la mise à jour de l'interface utilisateur
        this.$forceUpdate();

        // Sauvegardez les données localement
        this.saveDataLocally();
      },
      toggleWrapChoix() {
        this.isWrapChoixVisible = !this.isWrapChoixVisible;
      },
      generateColumnVisibilityObject(columns) {
        const visibilityObject = {};
        columns.forEach(column => {
          visibilityObject[column] = true; // ou false si vous voulez initialiser à false
        });
        return visibilityObject;
      },
    },
    mounted() {
      this.tables = loadData();
      if (!this.tables || !Array.isArray(this.tables)) {
        this.tables = [];
      }
      //On remet toutes les tables en visible
      this.tables.forEach((table) => {
        table.hideElementsVisible = true;
      });
      // Obtenir le mois actuel (par exemple, "janvier") et l'initialiser
      const months = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
      const currentDate = new Date();
      this.currentMonth = months[currentDate.getMonth()];
      this.selectedMonth = this.currentMonth; // Initialiser selectedMonth avec le mois actuel
      //console.log(this.currentMonth)

      // Obtenir l'année actuelle et l'initialiser
      const currentYear = currentDate.getFullYear();
      this.years = [currentYear - 1, currentYear, currentYear + 1]; // Vous pouvez personnaliser cette liste
      this.selectedYear = currentYear; // Initialiser selectedYear avec "toutes" pour afficher toutes les années

      //Obtenir la plateforme actuelle
      const plateformes = ["Autres", "Steam", "Fanatical", "Humble"];
      this.selectedPlateforme = "tous";
    },
  };
  </script>
  