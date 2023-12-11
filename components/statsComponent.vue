<template>
  <div>
    <div>
      <!-- Filtre pour sélectionner les mois à afficher -->
      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center"> 
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
  
    <!-- Filtre pour sélectionner ce qu'on affiche -->
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
        
        <!-- Sélection des tags -->
        <select v-model="selectedTag" @change="filterByTag">
          <option value="tous">Tous les tags</option>
          <option v-for="tag in TagsList" :key="tag" :value="tag">{{ tag }}</option>
        </select>
  
        <input class="inputGap" v-model="searchText" @input="filterTables" placeholder="Rechercher..." />
  
        <div  v-for="column in columnsCreate" :key="column[0]">
          <div class="checkbox-wrapper">
            <input type="checkbox" :id="'cbx-' + column[0]" class="inp-cbx" v-model="columnVisibility[column[0]]" @click="toggleColumn(column[0])" style="display:none"/>
            <label :for="'cbx-' + column[0]" class="cbx">
              <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"> <polyline points="1 5 4 8 11 1"></polyline></svg></span>
              <span class="label-text">{{ column[1] }}</span>
            </label>
          </div>
        </div>
  
        <div class="checkbox-wrapper"> <input type="checkbox" id="tab-cbx-2" class="inp-cbx" v-model="columnVisibility.showTableInOne" @click="toggleDisplayMode" style="display:none"/><label class="cbx" for="tab-cbx-2"><span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span><span class="label-text">Un seul tableau</span></label></div>
        <div v-if="!showTableInOne" class="checkbox-wrapper"><input type="checkbox" id="tab-cbx-1" class="inp-cbx" v-model="columnVisibility.hideAllElements" @click="hideAllElements()" style="display:none"/><label class="cbx" for="tab-cbx-1"><span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span><span class="label-text">Réduire les tableaux</span></label></div>
        
      </div>
    </div>
  </div>
    
    <table border="1"  class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white">
      <thead>
        <tr>
          <th>Totaux par mois</th>
          <!-- <th v-if="columnVisibility.showPrixPaye">Prix payé</th> -->
          <th v-if="columnVisibility.nombreJeux">Nombre</th>
          <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
          <th v-if="columnVisibility.showPrixBasMarche">Marché noir</th>
          <th v-if="columnVisibility.showPrixBas">Soldes</th>
          <th v-if="columnVisibility.showPrixHorsSoldes">Hors soldes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(total, month) in monthlyTotals" :key="month">
          <td>{{ month }}</td>
          <!-- <td v-if="columnVisibility.showPrixPaye" class="currency">{{ total.totalSpent.toFixed(2) }}</td> -->
          <td v-if="columnVisibility.nombreJeux" class="">{{ total.totalnombreJeux - 1 }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ total.totalHoursPlayed.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ total.totalPrixMarcheNoir.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ total.totalPrixBas.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ total.totalPrixHorsSoldes.toFixed(2) }}</td>
          
        </tr>
      </tbody>
      <tfoot class="total bg-gray-900 w-full">
        <tr>
          <td>Total des totaux</td>
          <td v-if="columnVisibility.nombreJeux">{{ getTotalOfTotals('totalnombreJeux') }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ getTotalOfTotals('totalHoursPlayed').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ getTotalOfTotals('totalPrixMarcheNoir').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ getTotalOfTotals('totalPrixBas').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ getTotalOfTotals('totalPrixHorsSoldes').toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import filtersMixin from '~/plugins/filtersMixin.js';

export default {
  mixins: [filtersMixin],
  data() {
    return {
      monthlyTotals: {} // Initialisation de monthlyTotals
    };
  },
  mounted() {
    // Appeler la méthode pour calculer les totaux par mois
    this.calculateTotalsByMonth();
  },
  methods: {
    calculateTotalsByMonth() {
      const totalsByMonth = {};

      this.tables.forEach(table => {
        const month = table.mois;
        const totalPrixHorsSoldes = table.items.reduce((acc, item) => acc + parseFloat(item.prixHorsSoldes || 0), 0);
        const totalPrixBas = table.items.reduce((acc, item) => acc + parseFloat(item.prixbas || 0), 0);
        const totalPrixMarcheNoir = table.items.reduce((acc, item) => acc + parseFloat(item.prixbasmarche || 0), 0);
        const totalHoursPlayed = table.items.reduce((acc, item) => acc + (parseFloat(item.heuresJouees) || 0), 0);
        const totalnombreJeux = table.items.length;

        if (!totalsByMonth[month]) {
          totalsByMonth[month] = {
            totalHoursPlayed: totalHoursPlayed,
            totalPrixHorsSoldes: totalPrixHorsSoldes,
            totalPrixBas: totalPrixBas,
            totalPrixMarcheNoir: totalPrixMarcheNoir,
            totalnombreJeux:totalnombreJeux

          };
        } else {
          totalsByMonth[month].totalHoursPlayed += totalHoursPlayed;
          totalsByMonth[month].totalPrixHorsSoldes += totalPrixHorsSoldes;
          totalsByMonth[month].totalPrixBas += totalPrixBas;
          totalsByMonth[month].totalPrixMarcheNoir += totalPrixMarcheNoir;
          totalsByMonth[month].totalnombreJeux += totalnombreJeux;
        }
      });

      // Stocker les totaux par mois dans monthlyTotals
      this.monthlyTotals = totalsByMonth;
    },
    getTotalOfTotals(property) {
      let total = 0;
      for (const month in this.monthlyTotals) {
        total += this.monthlyTotals[month][property];
      }
      return total;
    }
  }
};
</script>
