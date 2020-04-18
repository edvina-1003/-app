<template>
  <div class="result">
    <ul class="g-list" v-show="results.length">
      <li
        class="g-list-item clearfix"
        v-for="(item, index) in results"
        :key="index"
        @click="$_search_selectItem(item)"
      >
        <div class="left">
        	<img :src="`${url}/${item.goods_img.split(',')[0]}`" width="100" />
        </div>
        <div class="right">
        	<div class="g-list-text">{{item.title}}</div>
        	<div class="g-list-subTitle">{{item.sub_title}}</div>
        	<div class="g-list-price">￥{{item.market_price}}</div>
        	
        </div>
        
      </li>
    </ul>
    <div class="no-result" v-show="!results.length">暂无结果</div>
  </div>
</template>

<script>
import config from "@/assets/js/config";
export default {
  name: "SearchResult",
  data() {
    return {
      results: [],
      url: ""
    };
  },
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  watch: {
    query(query) {
      this.getResults(query);
    }
  },
  methods: {
    $_search_selectItem(item) {
      //  本地存储，将浏览的信息放入本地存储。
      var keyword = this.query;

      let keywords = JSON.parse(localStorage.getItem("historys")) || [];

      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
      }
      keywords.unshift(keyword);

      localStorage.setItem("historys", JSON.stringify(keywords));

      this.$router.push("/productDetail/" + item._id);
    },
    getResults(keyword) {
      if (!keyword) {
        return;
      }
      this.$axios
        .get(config.api + "/index/search?keyword=" + keyword)
        .then(res => {
          //console.log(res.data.data);
          this.results = res.data.data;
          console.log(this.results);
          this.url = config.api;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
	.g-list{
		margin-top: 80px;
		width: 100%;
		
	}
	.g-list-item{
		width: 100%;
		height: 100px;
		margin-top: 10px;
		margin-bottom: 20px;
		display: flex;
	}
	.left{
		float: left;
		margin-left: 10px;
	}
	.left img{
		border-radius: 4px;
	}
	.right{
		flex: 1;
		margin-left: 20px;
		font-size: 17px;
	}
	.g-list-subTitle{
		margin-top: 10px;
		font-size: 15px;
		color: #808080;
	}
	.g-list-price{
		padding-top: 8px;
		color: #f60;
	}
	.no-result{
		margin-top: 100px;
		text-align: center;
		font-size: 16px;
		color: #808080;
	}
</style>
