<template>
  <v-app>
    <v-app-bar app="" color="primary" dark="">
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="isSidebar = !isSidebar"
      />
      <v-toolbar-title>
        <v-img src="/icon.png" width="30" alt="Ayo Rek Admin">
          <template #placeholder="">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate="" color="grey lighten-5" />
            </v-row>
          </template>
        </v-img>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only ml-4">
        <template v-for="(menu, i) in menus">
          <v-menu
            v-if="menu.subMenus"
            :key="`menu_toolbar_${i}`"
            offset-y=""
            bottom=""
          >
            <template #activator="{ on }">
              <v-btn text="" :class="menu.id" v-on="on">
                <span>{{ menu.text }}</span>
                <v-icon dark>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(menuSub, j) in menu.subMenus"
                :key="`menu_toolbar_${i}_sub_${j}`"
                ripple=""
                nuxt=""
                exact=""
                :class="menuSub.id"
                :to="menuSub.to"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ menuSub.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-else=""
            :key="`menu_toolbar_${i}`"
            text=""
            nuxt=""
            exact=""
            :to="menu.to"
          >
            {{ menu.text }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-menu offset-y="">
          <template #activator="{ on }">
            <v-btn class="aio-menu-account" text="" v-on="on">
              <app-avatar
                :name="avatarName"
                :image="user.image"
                size="36"
                class="mr-3"
              />
              <span class="hidden-xs-only">{{ avatarName }}</span>
              <v-icon right="">arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="$route.name.includes('device')"
              ripple=""
              @click="onSettings"
            >
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="aio-menu-logout" ripple="" @click="onLogout">
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid="">
        <v-row>
          <v-col cols="12">
            <nuxt />
            <app-notification />
            <app-loading :value="isModelsLoading">
              Loading face recognition models
            </app-loading>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import AppNotification from '~/components/AppNotification'
import AppAvatar from '~/components/AppAvatar'
import AppLoading from '~/components/AppLoading'

import { types as deviceTypes } from '~/store/device'

const Cookie = process.client ? require('js-cookie') : null

export default {
  middleware: 'non-auth',
  components: {
    AppNotification,
    AppAvatar,
    AppLoading
  },
  data() {
    return {
      isSidebar: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('face', {
      isModelsLoading: 'isLoading'
    }),
    avatarName() {
      if (this.user.role === 'admin') {
        return 'Admin'
      } else if (this.user.role === 'device') {
        return 'Device'
      }
      return this.user.profile.name
    },
    menus() {
      if (this.user.role === 'device') {
        return [{ text: 'Home', to: { name: 'device' } }]
      }
      return [
        { id: 'aio-menu-home', text: 'Home', to: { name: 'admin' } },
        {
          id: 'aio-menu-datasets',
          text: 'Datasets',
          subMenus: [
            {
              id: 'aio-menu-students',
              text: 'Students',
              to: { name: 'admin-students' }
            },
            {
              id: 'aio-menu-lecturers',
              text: 'Lecturers',
              to: { name: 'admin-lecturers' }
            },
            {
              id: 'aio-menu-rooms',
              text: 'Rooms',
              to: { name: 'admin-rooms' }
            },
            {
              id: 'aio-menu-subjects',
              text: 'Subjects',
              to: { name: 'admin-subjects' }
            },
            {
              id: 'aio-menu-departments',
              text: 'Departments',
              to: { name: 'admin-departments' }
            },
            {
              id: 'aio-menu-study-programs',
              text: 'Study Programs',
              to: { name: 'admin-study-programs' }
            },
            {
              id: 'aio-menu-majors',
              text: 'Majors',
              to: { name: 'admin-majors' }
            },
            {
              id: 'aio-menu-groups',
              text: 'Groups',
              to: { name: 'admin-groups' }
            },
            {
              id: 'aio-menu-schedules',
              text: 'Schedules',
              to: { name: 'admin-schedules' }
            }
          ]
        },
        {
          id: 'aio-menu-attendance',
          text: 'Attendance',
          subMenus: [
            {
              id: 'aio-menu-attendances',
              text: 'Attendances',
              to: { name: 'admin-attendances' }
            },
            {
              id: 'aio-menu-presences',
              text: 'Presences',
              to: { name: 'admin-presences' }
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initToken()
    },
    initToken() {
      const token = Cookie.get('t')
      const { name } = this.$route
      const { role } = this.user
      if (token) {
        this.$http.setToken(token, 'Bearer')
        if (name && role && !name.includes(role)) {
          this.$router.replace({ name: role })
        }
      }
    },
    onSettings() {
      this.$store.commit(`device/${deviceTypes.SET_CONFIGURING}`, true)
    },
    onLogout() {
      Cookie.remove('t')
      this.$http.setToken(false)
      window.location.reload(true)
    }
  }
}
</script>
