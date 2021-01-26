<template>
  <div id="bottom-bar" class="shadow-bottom-bar-nav" :style="'background-color:'+navbarColorLocal">
    <BottomNavBarItems></BottomNavBarItems>
  </div>
</template>

<script>
import BottomNavBarItems from "@/layouts/components/bottom-bar/BottomNavBarItems";


export default {
  name: "BottomNavBar",
  components: {BottomNavBarItems},
  data() {
    return {
      navbarColor: '#fff'
    }
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#161d31' : this.navbarColor
    },
  }
}

</script>

<style scoped>

.shadow-bottom-bar-nav {
  box-shadow: 0px -12px 20px 8px rgba(45, 37, 37, 0.26), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#bottom-bar {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 15px;
  transition: padding-bottom 0.5s;
  height: 80px;
}

/* Prevents IOS keyboard bar from hiding text input */
@supports (-webkit-overflow-scrolling: touch) {
  #bottom-bar {
    padding-bottom: 20px;
  }

  #bottom-bar:focus-within {
    padding-bottom: 60px;
    transition: padding-bottom 0.5s;
  }
}
</style>