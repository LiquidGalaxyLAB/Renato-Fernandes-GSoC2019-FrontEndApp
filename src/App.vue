<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>Google</span>
        <span class="font-weight-light">Summer of code</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat href="/sensorlist" color="primary">
        <span class="mr-2 blue--text">Sensor List</span>
      </v-btn>
      <v-btn flat href="/about" color="primary">
        <span class="mr-2 blue--text">About</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer class="pa-3">
      Google Summer Of Code
      - Renato Fernandes - 
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>