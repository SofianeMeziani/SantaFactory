<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div>
        <bottom-nav-bar v-if="windowWidth < 1200"></bottom-nav-bar>

        <footer class="the-footer flex-wrap justify-between" :class="classes">
            <p class="text-center" style="width: 100%">
                <span>COPYRIGHT &copy;</span>
                <span>{{ new Date().getFullYear() }} </span>
                <b>Fox Sportif 🦊</b>
                <span class="hidden sm:inline-block"> Tous droits reservés • <router-link target="_blank"
                                                                                          to="/cgu">CGU</router-link> • Mentions légales</span>
            </p>
        </footer>
    </div>

</template>

<script>
    import BottomNavBar from "@/layouts/components/bottom-bar/BottomNavBar";

    export default {
        name: 'theFooter',
        components: {
            BottomNavBar,
        },
        props: {
            classes: {
                type: String
            }
        },
        computed: {
            windowWidth() {
                return this.$store.state.windowWidth
            }
        }
    }
</script>
