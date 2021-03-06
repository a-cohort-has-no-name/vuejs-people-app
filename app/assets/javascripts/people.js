/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: '',
      newPersonBio: '',
      errors: [],
      nameFilter: '',
      bioFilter: '',
      sortAttribute: 'name',
      sortAscending: true
    },
    mounted: function() {
      $.get('/api/v1/people.json', function(result) {
        this.people = result;
      }.bind(this));
      // Rails.ajax({
      //   url: '/api/v1/people.json',
      //   type: "GET",
      //   success: function(response) {
      //     this.people = response;
      //   }.bind(this)
      // });
    },
    methods: {
      toggleBio: function(person) {
        person.bioVisible = !person.bioVisible
      },
      addPerson: function() {
        var params = {
          name: this.newPersonName,
          bio: this.newPersonBio
        };
        $.post('/api/v1/people.json', params, function(result){
          this.people.push(result);
          this.newPersonName = '';
          this.newPersonBio = '';
        }.bind(this)).fail(function(response){
          this.errors = response.responseJSON.errors;
        }.bind(this));
      },
      deletePerson: function(person) {
        var index = this.people.indexOf(person);
        $.ajax({
          url: '/api/v1/people/'+person.id,
          type: 'DELETE',
          success: function(response) {
            this.people.splice(index, 1);
          }.bind(this)
        });
      },
      isValidPerson: function(person) {
        var validName = person.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1;
        var validBio = person.bio.toLowerCase().indexOf(this.bioFilter.toLowerCase()) > -1;
        return validName && validBio;
      },
      setSortAttribute: function(inputAttribute) {
        if(inputAttribute !== this.sortAttribute) {
          this.sortAscending = true;
        } else {
          this.sortAscending = !this.sortAscending;
        }
        this.sortAttribute = inputAttribute;
      }
    },
    computed: {
      modifiedPeople: function() {
        return this.people.sort(function(person1, person2) {
          if (this.sortAscending) {
            return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);
          } else {
            return person2[this.sortAttribute].localeCompare(person1[this.sortAttribute]);
          }
        }.bind(this));
      }
    }
  });
});

















