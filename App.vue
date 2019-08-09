<script>
export default {
	globalData: function() {
		activeCategoryMain: 0; // 分类主类下标
		activeitemindex: 0; // 商品列表导航下标
		curscrollitem: 'glsntb-0'; // 商品列表导航项目位置
	},

	onLaunch: function() {
		// console.log("App Launch");
	},

	onShow: function() {
		// console.log("App Show");
	},

	onHide: function() {
		// console.log("App Hide");
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '/static/iconfont/font.scss';
</style>
