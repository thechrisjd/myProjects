<template>
    <table class="info-table">
      <tr>
        <td class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.748 36.336" style="width:16px;height:16px;">
            <path data-name="company industry" d="M19.1,3a2.138,2.138,0,0,0-2.167,2.137H6.275A4.274,4.274,0,0,0,2,9.412V22.237a4.279,4.279,0,0,0,4.275,4.275h34.2a4.279,4.279,0,0,0,4.275-4.275V9.412a4.274,4.274,0,0,0-4.275-4.275H29.815A2.138,2.138,0,0,0,27.649,3Zm4.275,14.962A2.137,2.137,0,1,1,21.236,20.1,2.138,2.138,0,0,1,23.374,17.962ZM2,29.6v5.464a4.274,4.274,0,0,0,4.275,4.275h34.2a4.274,4.274,0,0,0,4.275-4.275V29.6a8.463,8.463,0,0,1-4.275,1.19H6.275A8.463,8.463,0,0,1,2,29.6Z"
              transform="translate(-2 -3)" />
          </svg>
        </td>
        <td class="text">{{ params.description || 'Brief description of your company' }}</td>
      </tr>
      <tr>
        <td class="icon">
          <svg viewBox="0 0 24 24">
            <path fill="#000000" d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z" />
          </svg>
        </td>
        <td class="text">{{ params.employees + ' employees' || 'Employees' }}</td>
      </tr>
      <tr>
        <td class="icon">
          <svg viewBox="0 0 24 24">
            <path fill="#000000" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
          </svg>
        </td>
        <td class="text">
          {{ params.location.city || 'Zip and city' }}
        </td>
      </tr>
    </table>
</template>

<script>
export default {
  props: ['params'],
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 12% auto 0 auto;
  color: #707070;
  font-size: 15px;

  .title {
    font-weight: 600;
    margin-bottom: 15px;
  }

  .info-table {
    width: 60%;
    margin: auto;
    text-align: left;
    // font-size: calc(5px + 2.3vw);

    .icon {
      width: 25%;
      text-align: center;

      svg {
        width: 20px;
        height: 20px;
      }

      path {
        fill: #666666;
      }
    }

    .text {
      max-width: 80px;
      margin-bottom: 10px;
    }
  }
}

</style>
