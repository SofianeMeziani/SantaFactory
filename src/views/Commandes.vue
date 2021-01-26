<template>
  <div>
    <h1 class="v-100 text-center mb-6">Commandes</h1>
    <div class="vx-row">
      <div class="vx-col w-full">
        <vx-card title="Dispatched Orders">
          <div slot="no-body" class="mt-4">
            <vs-table :data="Orders" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>ORDER NO.</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>OPERATORS</vs-th>
                <vs-th>LOCATION</vs-th>
                <vs-th>DISTANCE</vs-th>
                <vs-th>START DATE</vs-th>
                <vs-th>EST DELIVERY DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{ data[indextr].orderNo }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2"
                                                                           :class="'bg-' + data[indextr].statusColor"></div>{{
                        data[indextr].status
                      }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <ul class="users-liked user-list">
                      <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                        <vx-tooltip :text="user.name" position="bottom">
                          <vs-avatar :src="user.img" size="30px"
                                     class="border-2 border-white border-solid -m-1"></vs-avatar>
                        </vx-tooltip>
                      </li>
                    </ul>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].location }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].distance }}</span>
                    <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].startDate }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].estDelDate }}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commandes"
}
</script>

<style scoped>

</style>