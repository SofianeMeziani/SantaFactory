<!-- =========================================================================================
    File Name: Chat.vue
    Description: Chat Application - Stay connected
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="vx-row">
        <template v-if="meetings.length===0">

            <div v-for="(index) in 8" :key="index"
                 class="vx-col  w-full md:w-1/3 lg:w-1/4 xl:w-1/4 mb-base">

                <vx-card

                        class="card-overlay bg-cover"
                        style="border-radius: 15px"
                >
                    <vue-content-loading :width="300" :height="100">
                        <circle cx="145" cy="33" r="34"/>
                        <rect x="55" y="73" rx="4" ry="4" width="200" height="15"/>
                        <rect x="100" y="90" rx="4" ry="4" width="100" height="10"/>
                    </vue-content-loading>
                </vx-card>

            </div>
        </template>
        <template v-else>
            <div v-for="(meeting,index) in meetings" :key="index" class="vx-col w-full sm:w-1/3 lg:w-1/4 mb-base">
                <vx-card class="p-2" style="border-radius: 15px">
                    <vs-avatar class="mx-auto mb-6 block" size="80px"
                               color="#262c49" :text="meeting.author"/>
                    <div class="text-center">
                        <h4>{{ meeting.author }}</h4>
                        <p class="text-grey">{{ meeting.name }} | {{ meeting.meeting_id }} </p>
                    </div>
                    <vs-button ref="loadableButton" id="button-with-loading" style="width: 100%"
                               class="mt-4 shadow-lg vs-con-loading__container"
                               @click="openLoadingContained(meeting.id)" type="relief">
                        Join
                    </vs-button>


                    <!--            <template slot="footer">-->
                    <!--                <vs-divider/>-->
                    <!--                <div class="flex justify-between">-->
                    <!--                            <span class="flex items-center">-->
                    <!--                                <feather-icon :icon="card_4.footer_text_1_icon"-->
                    <!--                                              svgClasses="h-5 w-5 text-warning stroke-current"/>-->
                    <!--                                <span class="ml-2">{{ card_4.footer_text_1 }}</span>-->
                    <!--                            </span>-->
                    <!--                    <span class="flex items-center">-->
                    <!--                                <feather-icon :icon="card_4.footer_text_2_icon"-->
                    <!--                                              svgClasses="h-5 w-5 text-primary stroke-current"/>-->
                    <!--                                <span class="ml-2">{{ card_4.footer_text_2 }}</span>-->
                    <!--                            </span>-->
                    <!--                </div>-->
                    <!--            </template>-->
                </vx-card>
            </div>
        </template>
    </div>

</template>

<script>

    import {getAPI} from "@/axios";
    import VueContentLoading from "vue-content-loading";

    export default {
        data() {
            return {
                meetings: [],
                join_meeting: {},
                backgroundLoading: 'primary',
                colorLoading: '#fff',
            }
        },
        watch: {},
        computed: {


            windowWidth() {
                return this.$store.state.windowWidth
            }
        },
        methods: {
            getJoinMeetingLink(meeting_id) {
                getAPI.get('api/v1/meeting/join-meeting/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        meeting_id: meeting_id,
                    }
                }).then(response => {
                    setTimeout(() => {
                        console.log('heheheh')
                    }, 2000);
                    this.$vs.loading.close("#button-with-loading > .con-vs-loading")
                    console.log(response.data.valid)
                    this.join_meeting = response.data
                    window.open(response.data.join_link, '_blank');
                    // console.log(response.data);
                }).catch(error => {
                    // this.$vs.loading.close("#button-with-loading > .con-vs-loading")
                    console.log(error);
                    // commit('showErrorAlert', error.data)
                    // console.log(error.response.data);
                })
            },
            getMeeting() {
                getAPI.get('api/v1/meeting/meetings-list').then(response => {
                    // commit('offerPosts', response.data)
                    setTimeout(() => {
                        console.log('heheheh')
                    }, 2000);
                    console.log(response.data['results'].id)
                    this.meetings.push(...response.data['results'])
                    // console.log(response.data);
                }).catch(error => {
                    console.log(error);
                    // commit('showErrorAlert', error.data)
                    // console.log(error.response.data);
                })
            },
            openLoadingContained(meeting_id) {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#button-with-loading",
                    scale: 0.45
                });

                this.getJoinMeetingLink(meeting_id)

            },
        },
        components: {
            VueContentLoading
            // VueApexCharts,
            // VueContentLoading,
            // VclFacebook
        },
        created() {

        },
        beforeDestroy() {
        },
        mounted() {
            this.getMeeting();
        }
    }

</script>


<style lang="scss">

    @import "@/assets/scss/vuexy/apps/chat.scss";


</style>
