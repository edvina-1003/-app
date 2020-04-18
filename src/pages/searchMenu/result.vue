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
        	<img :src="`${url}/${item.menu_img.split(',')[0]}`" width="100" height="100"/>
        </div>
        <div class="right">
        	<div class="g-list-text">{{item.food_title}}</div>
        	<div class="g-list-subTitle">{{item.sub_title}}</div>
        	
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

      this.$router.push("/detail/" + item._id);
    },
    getResults(keyword) {
      if (!keyword) {
        return;
      }
      this.$axios
        .get(config.api + "/indexs/search?keyword=" +keyword)
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
		height: 120px;
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
		border-bottom: 1px dashed #C0C0C0;
	}
	.left{
		float: left;
		margin-left: 10px;
	}
	.left img{
		border-radius: 10px;
		margin-top: 10px;
	}
	.right{
		flex: 1;
		margin-left: 20px;
		font-size: 17px;
	}
	.g-list-text{
		margin-top: 15px;
	}
	.g-list-subTitle{
		margin-top: 10px;
		font-size: 15px;
		color: #808080;
		height: 40px;
		overflow: hidden;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.no-result{
		margin-top: 100px;
		text-align: center;
		font-size: 16px;
		color: #808080;
	}
</style>
