/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: '',
      newPersonBio: ''
    },
    mounted: function() {
      $.get('/api/v1/people.json', function(result) {
        this.people = result;
      }.bind(this));
    },
    methods: {
      toggleBio: function(person) {
        person.bioVisible = !person.bioVisible
      },
      addPerson: function() {
        var newPerson = {
          name: this.newPersonName,
          bio: this.newPersonBio,
          bioVisible: false
        };
        this.people.push(newPerson);
      },
      deletePerson: function(person) {
        var index = this.people.indexOf(person);
        this.people.splice(index, 1);
      }
    },
    computed: {

    }
  });
});

















