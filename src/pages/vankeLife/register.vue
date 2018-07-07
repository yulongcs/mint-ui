<template>
  <div class="vankelife-wrap">
    <h1>{{ title }}</h1>
    <p class="font-small text-lightgrey">{{ subTitle }}</p>
    <form id="login-phone-form" class="vankelife-from">
      <mt-field class="flex-wrap" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field class="flex-wrap" label="验证码" placeholder="请输入验证码" v-model="captcha">
        <mt-button type="primary" size="small" v-on:click="SendingSMS" v-show="!isStartSendSMS">获取验证码</mt-button>
        <mt-button type="primary" disabled plain size="small" v-show="isStartSendSMS">
          (<countdown v-model="SendSmsTime" :start="isStartSendSMS" @on-finish="FinishCountdown"></countdown>s)秒后重新获取
        </mt-button>
      </mt-field>
      <mt-field class="flex-wrap" label="密码" placeholder="请输入密码" type="password" v-model="password">
      </mt-field>
      <mt-button type="primary" size="large" v-on:click="Register">注册</mt-button>
      <div class="flex-between margin-top-1rem font-small">
        <span>点击注册即同意<a class="primary" href="https://wh.m.life.vanke.com/protocol" target="_blank">《万生活用户协议》</a></span>
        <router-link to="/vankelife/login">密码登录</router-link>
      </div>
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

axios.defaults.baseURL = 'http://api.yznt.com/api/services/app/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const DefaultSendSmsTime = 90;

const RegisterContentData = {
  title: '注册',
  subTitle: '',
  phone: '',
  password: '',
  captcha: '',
  isLoginWithSMS: false,
  isStartSendSMS: false,
  SendSmsTime: DefaultSendSmsTime,
};

export default {
  name: 'vankeLife-register',
  data() {
    return RegisterContentData;
  },
  components: {
    Countdown,
  },
  methods: {
    SendingSMS() {
      // start countdown;
      this.$options.methods.StartCountdown.bind(this)();

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
    StartCountdown() {
      this.$data.isStartSendSMS = true;
    },
    FinishCountdown() {
      this.$data.isStartSendSMS = false;
      this.$data.SendSmsTime = DefaultSendSmsTime;
    },
    Register() {
      const params = qs.stringify({
        phoneNum: this.$data.phone,
        password: this.$data.password,
        verCode: this.$data.captcha,
      });

      axios.post('VankeLife/CreateAccount', params)
        .then((response) => {
          if (response.data.success) {
            Toast({
              message: '注册成功',
            });
          }
        })
        .catch((error) => {
          Toast({
            message: error,
          });
        });
    },
  },
};
</script>
