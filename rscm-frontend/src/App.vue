<template>
    <div class="container-fluid" style="max-height: 10%;">
        <headerVue/>
    </div>
    <div class="container-fluid">
      <div class="row">
        <sideBar/>
        <router-view/>
      </div>
    </div>
</template>


<style>
#app {
  font-family: "Gothic A1", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border-color:#a19e9e;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import headerVue from "@/components/headerVue.vue";
import sideBar from "@/components/sideBar.vue";
export default {
  name: "App",
  components: { sideBar, headerVue },
};
</script>