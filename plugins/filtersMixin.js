import { saveData, loadData } from '~/data/dataHandler';
export default {
  
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
    filterByTag(tag) {
      // Si le wrapChoix est 'Tous les tags', retourne toujours vrai pour afficher toutes les lignes
      if (this.wrapChoix === 'Tous les tags') {
        return true;
      }
      // Retourne vrai si le tag correspond au wrapChoix sélectionné
      // Appel à filterItems() après avoir modifié selectedTag
      return tag === this.wrapChoix;
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
    toggleColumn(column) {
      //console.log(column);
      if (column === "checkAll" || column === "UncheckAll") {
        const targetValue = column === "UncheckAll" ? false : true;

        // Mettez à jour toutes les valeurs de columnVisibility
        for (const key in this.columnVisibility) {
          if (this.columnVisibility.hasOwnProperty(key)) {
            this.columnVisibility[key] = targetValue;
          }
        }

        // Mettez à jour la visibilité des colonnes dans toutes les tables
        this.tables.forEach(table => {
          table[column] = targetValue;
        });

        // Mettez à jour l'état de checkAll et UncheckAll en fonction de la colonne sélectionnée
        this.columnVisibility.checkAll = column === "checkAll" ? true : false;
        this.columnVisibility.UncheckAll = column === "UncheckAll" ? true : false;
      } else {
        // Basculez l'état de la colonne dans l'objet columnVisibility
        this.columnVisibility[column] = !this.columnVisibility[column];

        // Mettez à jour la visibilité de la colonne dans toutes les tables
        this.tables.forEach(table => {
          table[column] = this.columnVisibility[column];
        });

        // Vérifiez si toutes les colonnes sont cochées pour mettre à jour checkAll
        this.columnVisibility.checkAll = Object.values(this.columnVisibility).every(value => value === true);

        // Vérifiez si toutes les colonnes sont décochées pour mettre à jour UncheckAll
        this.columnVisibility.UncheckAll = Object.values(this.columnVisibility).every(value => value === false);
      }

      // Forcez la mise à jour de l'interface utilisateur
      this.$forceUpdate();
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
    toggleDisplayMode() {
      this.showTableInOne = !this.showTableInOne;
    },
    
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
}