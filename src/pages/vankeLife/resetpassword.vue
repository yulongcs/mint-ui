<template>
  <div class="vankelife-wrap">
    <h1>{{ title }}</h1>
    <p class="font-small text-lightgrey">{{ subTitle }}</p>
    <form id="login-phone-form" class="vankelife-from">
      <mt-field class="flex-wrap" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field class="flex-wrap" label="验证码" placeholder="请输入验证码" v-model="captcha">
        <mt-button type="primary" size="small" v-on:click="SendingSMS">获取验证码</mt-button>
        <mt-button type="primary" disabled plain size="small">
          <countdown></countdown>秒后重新获取
        </mt-button>
      </mt-field>
      <mt-field class="flex-wrap" label="新密码" placeholder="请填写新密码" type="password" v-model="password">
      </mt-field>
      <mt-button type="primary" size="large" v-on:click="ResetPassword">确定</mt-button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Field, Button, Cell, Toast } from 'mint-ui';
import axios from 'axios';
import qs from 'qs';
import Countdown from '../../components/countdown';
import '../../assets/css/vankelife.less';

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

const RegisterContentData = {
  title: '设置新密码',
  subTitle: '',
  phone: '',
  password: '',
  captcha: '',
  isLoginWithSMS: false,
};

export default {
  name: 'vankeLife-login',
  data() {
    return RegisterContentData;
  },
  components: {
    Countdown,
  },
  methods: {
    SendingSMS() {
      const params = qs.stringify({
        phoneNum: this.$data.phone,
      });

      axios.post('VankeLife/SendVerificationCode', params)
        .then((response) => {
          if (response.data.success) {
            Toast({
              message: '发送成功',
            });
          }
        })
        .catch((error) => {
          Toast({
            message: error,
          });
        });
    },
    ResetPassword() {
      const params = qs.stringify({
        phoneNum: this.$data.phone,
        password: this.$data.password,
        verCode: this.$data.captcha,
      });

      axios
        .get('ResetPassword', params)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
