<template>
  <div class="vankelife-wrap">
    <h1>{{ title }}</h1>
    <p class="font-small text-lightgrey">{{ subTitle }}</p>
    <transition name="fade" mode="out-in">
    <form v-if="isLoginWithSMS===false" id="login-pw-form" class="vankelife-from">
      <mt-field class="flex-wrap" label="手机号" state="error" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field class="flex-wrap" label="密码" state="error" placeholder="请输入密码" type="password" v-model="password">
        <router-link class="primary" to="/vankelife/resetpassword">忘记密码</router-link>
      </mt-field>
      <mt-button type="primary" size="large" v-on:click="loginWithPassword">登录</mt-button>
      <div class="flex-between margin-top-1rem">
        <a v-on:click="showSMSLoginContent">验证码登录</a>
        <router-link to="/vankelife/register">注册</router-link>
      </div>
    </form>
    <form v-else id="login-phone-form" class="vankelife-from">
      <mt-field class="flex-wrap" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field class="flex-wrap" label="验证码" placeholder="请输入验证码" v-model="captcha">
        <mt-button type="primary" size="small" v-on:click="SendingSMS">获取验证码</mt-button>
        <mt-button type="primary" size="small">
          <countdown></countdown>秒后重新获取
        </mt-button>
      </mt-field>
      <mt-button type="primary" size="large" v-on:click="loginForSMS">登录</mt-button>
      <div class="flex-between margin-top-1rem">
        <a v-on:click="showPasswordLoginContent">密码登录</a>
        <router-link to="/vankelife/register">注册</router-link>
      </div>
    </form>
    </transition>
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

const LoginContentData = {
  title: '密码登录',
  subTitle: '',
  phone: '13544166273',
  password: '123456',
  captcha: '',
  isLoginWithSMS: false,
};

export default {
  name: 'vankeLife-login',
  data() {
    return LoginContentData;
  },
  components: {
    Countdown,
  },
  methods: {
    showPasswordLoginContent() {
      this.$data.isLoginWithSMS = false;
      this.$data.title = '密码登录';
      this.$data.subTitle = null;
      this.$data.phone = null;
      this.$data.password = null;
      this.$data.captcha = null;
    },
    showSMSLoginContent() {
      this.$data.isLoginWithSMS = true;
      this.$data.title = '短信快捷登录';
      this.$data.subTitle = '验证即登录，未注册将自动创建万生活帐号';
      this.$data.phone = null;
      this.$data.password = null;
      this.$data.captcha = null;
    },
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
    loginWithPassword() {
      const params = qs.stringify({
        username: this.$data.phone,
        password: this.$data.password,
      });

      axios.post('VankeLife/Login', params)
        .then((response) => {
          debugger;
          if (response.data.success) {
            Toast({
              message: '登录成功',
              iconClass: 'mint-toast-icon mintui mintui-success',
            });
          } else {
            Toast({
              message: '登录错误',
              iconClass: 'mint-toast-icon mintui mintui-field-error',
            });
          }
        })
        .catch((error) => {
          Toast({
            message: error,
          });
        });
    },
    loginForSMS() {
      const params = qs.stringify({
        phoneNum: this.$data.phone,
        verCode: this.$data.captcha,
      });

      axios.post('VankeLife/LoginWithVerificationCode', params)
        .then((response) => {
          debugger;
          if (response.data.success) {
            Toast({
              message: '登录成功',
              iconClass: 'mint-toast-icon mintui mintui-success',
            });
          } else {
            Toast({
              message: '登录错误',
              iconClass: 'mint-toast-icon mintui mintui-field-error',
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
