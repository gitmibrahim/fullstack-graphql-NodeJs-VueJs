<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #14090b;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 100px 50px;
}

h1, h2, h3, h4, h5, h6, p, span, label, input, button {
  font-family: Recursive, 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
  font-variation-settings: "MONO" 1;
  font-weight: 900;
}
h1, h2, h3, h4, h5, h6, p, span, label {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #F59BAC;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
