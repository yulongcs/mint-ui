<template>
  <div>
    <h1>{{ msg }}</h1>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';

export default {
  name: 'vankeLife-index',
  data() {
    return {
      msg: 'AAAAAAAAAAAAAAAAAAAAA',
    };
  },
  components: { HelloWorld },
};
</script>
