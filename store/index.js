import axios from '../plugins/axios';

export const state = () => ({
    blogLists: [],
    peoples: []
})

export const mutations = {
    setData(state, items) {
        state.blogLists = items
    },
    setDataPeople(state, dataUser) {
        state.peoples = dataUser
    },
    removeUser(state, id) {
        const foundItem = state.peoples.findIndex(p => p.id === id)
        state.peoples.splice(foundItem, 1)
    },
    addData(state, items) {
        state.peoples.push(items)
    },
    updateData(state, data) {
        const foundItem = state.peoples.find(p => p.id === data.id)
        foundItem.newItem = data.newItem
    },
}

export const actions = {
    async nuxtServerInit({commit}) {
        const res = await axios.get('posts')
        const res1 = await axios.get('users')
        commit('setData', res.data)
        commit('setDataPeople', res1.data)
    },

    async deleteUser({commit}, id) {
        const res = await axios.delete('users/' + id)
        commit('removeUser', id)
    },

    async add({commit}, newItem) {
        const res = await axios.post('users', {name:newItem.name, email:newItem.email, gender:newItem.gender, status:newItem.status})
        commit('addData', res.data)
    },

    async getData({commit}, id) {
        const res = await axios.get('users/' + id)
        return res.data
    },

    async updateData({commit}, data) {
        const res = await axios.put('users/' + data.id, {name:data.name, email:data.email, gender:data.gender, status:data.status})
        commit('updateData', data)
    }
}