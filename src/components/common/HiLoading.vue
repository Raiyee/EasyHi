<template>
  <div :class="['loading', className]">
    <div :class="['loading-' + theme]"></div>
    <slot></slot>
  </div>
</template>
<style scoped>
  .loading {
    text-align: center;
    position: fixed;
    top: 50%;
    width: 100%;
    transform: translate3d(0, -50%, 0);
  }

  .loading-snake {
    animation: loading-snake-rotate 0.8s infinite linear;
    border: 4px solid rgb(204, 204, 204);
    border-right-color: transparent;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: inline-block;
  }

  @keyframes loading-snake-rotate {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
</style>
<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'snake'
      }
    }
  };
</script>
