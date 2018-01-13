<template>
  <div>
    {{msg}}

    <div v-if="type === 'A'">This is A</div>
    <div v-else-if="type === 'B'">This is B</div>
    <div v-else>else</div>

    <div v-show="ok">show me</div>

    <ul>
      <li v-bind:key="item" v-for="(item, index) in items" v-if="item.iscomplete ===false">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>

    <ul>
      <li v-bind:key="item.id" v-for="(item, index) in objects">
        <!-- better to bind with item.id -->
        {{ parentMessage }} - {{ index }} - {{ item }}
      </li>
    </ul>

  </div>

</template>


<script>
export default {
  name: 'hello',
  data() {
    return {
      parentMessage: 'parenT',
      msg: 'ohhhhh',
      type: 'A',
      ok: false,
      items: [
        {
          message: '1',
          iscomplete: true
        },
        {
          message: '2',
          iscomplete: false
        }
      ],
      objects: {
        firstname: 'bob',
        secondname: 'jason',
        age: 30
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style "scoped">

</style>
