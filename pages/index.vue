<template>
  <v-card>
    <v-card-title>
      <h2>Blog List</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table v-for="data in dummyData" :headers="headers" :items="blogLists" :items-per-page="5" :search="search"
      :key="data.a" show-expand>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" style="padding:20px;">
          {{ item.body }}
        </td>
      </template>
      <template v-slot:[`item.comment`]="{ item }">
        <v-icon @click="" style="color: #00337C; margin-left: 35px;">bx bxs-message-rounded-dots</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Comment', value: 'comment' },
      ],
      dummyData: [{ a: 0 }],
    }
  },
  computed: {
    ...mapState([
      'blogLists',
      'peoples'
    ]),
  }
}
</script>