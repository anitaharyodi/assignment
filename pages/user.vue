<template>
  <v-card>
    <v-card-title>
      <h2>User</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line></v-text-field>
    </v-card-title>
    <v-data-table v-for="data in dummyData" :headers="headers" :items="peoples" :items-per-page="5" :search="search"
      :key="data.a" style="text-align: center;">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon style="margin-right: 2px; color: orange;" @click="editData(item.id)">bx bx-edit</v-icon>
        <v-icon style="margin-right: 2px; color: red;" @click="deleteData(item.id)">bx bxs-trash</v-icon>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <span v-if="item.status == 'active'">
          <v-chip style="color: white; background-color: #00c04b;"><v-icon left style="color: white;">bx
              bxs-badge-check</v-icon>{{ item.status }}</v-chip>
        </span>
        <span v-else>
          <v-chip style="color: white; background-color: red;"><v-icon left style="color: white;">bx
              bxs-x-circle</v-icon>{{ item.status }}</v-chip>
        </span>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-card style="margin-top: 40px;">
      <v-card-title>
        <h2>Add/Edit User </h2>
      </v-card-title>
      <v-card-text style="padding-bottom: 0px;">
        <v-container>
          <v-text-field prepend-icon="bx bx-group" v-model="newItem.name" label="Name" type="text" outlined
            required></v-text-field>
          <v-text-field prepend-icon="bx bx-envelope" v-model="newItem.email" label="Email" type="text" outlined
            required></v-text-field>
          <v-text-field prepend-icon="bx bx-male-sign" v-model="newItem.gender" label="Gender" type="text" outlined
            required></v-text-field>
          <v-text-field prepend-icon="bx bx-info-circle" v-model="newItem.status" label="Status" type="text" outlined
            required></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions v-bind:class="{ hidden: !isHidden }">
        <v-spacer></v-spacer>
        <v-btn @click="cancel()"
          style="margin-top: 0px; color: white; background-color: gray; margin-right: 10px; width: 100px; height: 40px;">Cancel</v-btn>
        <v-btn @click="add(newItem)"
          style="margin-top: 0px; color: white; background-color: #00337C; margin: auto; width: 100px; height: 40px;">Submit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-actions v-bind:class="{ hidden: isHidden }">
        <v-spacer></v-spacer>
        <v-btn @click="cancel()"
          style="margin-top: 0px; color: white; background-color: gray; margin-right: 10px; width: 100px; height: 40px;">Cancel</v-btn>
        <v-btn @click="update()"
          style="margin-top: 0px; color: white; background-color: orange; margin: auto; width: 100px; height: 40px;">Update</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Status', value: 'status' },
        { text: '', value: 'actions' },
      ],
      dummyData: [{ a: 0 }],
      newItem: {
        name: '',
        email: '',
        gender: '',
        status: '',
      },
      isHidden: true,
      activeItem: null
    }
  },
  methods: {
    deleteData(id) {
      this.$store.dispatch('deleteUser', id)
    },
    add(newItem) {
      this.$store.dispatch('add', newItem)
      this.newItem = ''
    },
    editData(id) {
      this.$store.dispatch('getData', id).then((res) => {
        this.newItem.name = res.name
        this.newItem.email = res.email
        this.newItem.gender = res.gender
        this.newItem.status = res.status
        this.activeItem = res
        this.isHidden = false
      })
    },
    update() {
      this.$store.dispatch('updateData', { id: this.activeItem.id, newItem: this.newItem })
      this.newItem = ''
      this.isHidden = true
    },
    cancel() {
      this.newItem = ''
      this.isHidden = true
    }
  },
  computed: {
    ...mapState([
      'blogLists',
      'peoples'
    ])
  }
}
</script>

<style>
.hidden {
  display: none;
}
</style>
