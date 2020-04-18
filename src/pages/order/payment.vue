<template>
  <div>
    <!--头部导航-->
    <div class="navbar">
    	<div class="left">
    		<i class="iconfont icon-arrow-lift" @click="goback"></i>
    	</div>
    	<div class="right">
    		我的订单
    	</div>
    </div>
    <div class="section section-payment">
      <div class="cash-title">选择以下支付方式付款</div>
      <div class="payment-box">
        <div class="payment-body">
          <ul class="payment-list">
            <li class="J_bank" id="alipay">
              <a target="_blank" @click="payment">
                <img src="@/assets/images/payOnline_zfb.png" alt="支付宝" style="margin-left: 0;" />
              </a>
            </li>
             <li id="weixinPay">
              <img src="@/assets/images/weixinpay0701.png" alt="微信支付" style="margin-left: 0;">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";

import config from "@/assets/js/config";
export default {
  name: "payment",
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    if (!window.localStorage.getItem("userinfo")) {
      this.orderList = [];
    } else {
      this.userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
      this.$axios
        .get(
          "http://localhost:3000/confirm?orderId=" + this.$route.query.orderId
        )
        .then(res => {
          console.log(res.data.data);
          this.total_price = res.data.data.orderResult.all_price;
          this.orders = res.data.data.id;
          //console.log(this.total_price, this.orders);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
  	goback(){
  		this.$router.go(-1);
  	},
    payment() {
      if (!window.localStorage.getItem("userinfo")) {
        this.orderList = [];
      } else {
        this.userId = JSON.parse(localStorage.getItem("userinfo"))[0]._id;
        var api = config.api + "/alipay/doPay";
        this.$axios({
          method: "post",
          url: api,
          headers: {
            "content-type": "application/json;charset=UTF-8"
          },
          data: {
            uid: this.userId, // 会员id
            total_price: this.total_price, // 总价格
            order_id: this.$route.query.orderId, // 订单编号
            return_url: "http://app.yiqigoumall.com/success" //支付支付成功后返给客户端的地址
          },
          dataType: "json"
        })
          .then(res => {
            console.log(res);
            location.href = res.data;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    goback() {
      // 返回历史对象的上一页
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #D0E9C6;
		display: flex;
	}
	
	.navbar .left {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	
	.navbar .left .iconfont {
		font-size: 24px;
	}
	
	.navbar .right {
		flex: 1;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding-right: 35px;
	}
.section-payment {
  display: flex;
  height: 300px;
  flex-direction: column;
  background-color: #f2f5f8;
}
.cash-title {
  font: bold 16px 微软雅黑;
  padding: 30px 0 30px 10px;
}
.payment-list {
  display: flex;
  justify-content: space-around;
}
.payment-list li {
  width: 46%;
}
</style>