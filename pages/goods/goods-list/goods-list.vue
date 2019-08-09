<template>
	<view>
		<!-- glance 滑动导航栏组件 -->
		<glanceSlideNavTabBar topfixedval="0px" :topfixed="true" @clickitem="clickitem" :data="categoryList"></glanceSlideNavTabBar>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="goods in goodsList" :key="goods.goods_id" @tap="toGoods(goods)">
					<image :src="goods.img" mode="widthFix"></image>
					<view class="name">{{ goods.name }}</view>
					<view class="info">
						<view class="price">{{ goods.price }}</view>
						<view class="slogan">{{ goods.slogan }}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
	</view>
</template>

<script>
import glanceSlideNavTabBar from '@/components/glance-SlideNavTabBar/glanceSlideNavTabBar.vue';

export default {
	data() {
		return {
			goodsList: [
				{
					goods_id: 0,
					img: '/static/img/goods/p1.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 1,
					img: '/static/img/goods/p2.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 2,
					img: '/static/img/goods/p3.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 3,
					img: '/static/img/goods/p4.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 4,
					img: '/static/img/goods/p5.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 5,
					img: '/static/img/goods/p6.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				}
			],
			loadingText: '正在加载...',
			headerTop: '0px',
			headerPosition: 'fixed',
			categoryList: [],
			orderby: 'sheng'
		};
	},

	components: { glanceSlideNavTabBar },

	onLoad: function(option) {
		// 导航初次化
		this.categoryList = JSON.parse(option.list);

		uni.setNavigationBarTitle({
			title: option.name
		});

		// 兼容H5下排序栏位置
		// #ifdef H5
		// 定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
		let Timer = setInterval(() => {
			let uniHead = document.getElementsByTagName('uni-page-head');
			if (uniHead.length > 0) {
				this.headerTop = uniHead[0].offsetHeight + 'px';
				clearInterval(Timer); // 清除定时器
			}
		}, 1);
		// #endif
	},

	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},

	// 上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({
			title: '触发上拉加载'
		});
		let len = this.goodsList.length;
		if (len >= 40) {
			this.loadingText = 'Ladies&Kids';
			return false;
		} else {
			this.loadingText = '正在加载...';
		}
		let end_goods_id = this.goodsList[len - 1].goods_id;
		for (let i = 1; i <= 10; i++) {
			let goods_id = end_goods_id + i;
			let p = {
				goods_id: goods_id,
				img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			};
			this.goodsList.push(p);
		}
	},

	methods: {
		clickitem(idx, val) {
			uni.showToast({
				title: '点击了:' + val //val 指点击的导航栏位值
			});
		},

		reload() {
			console.log('reload');
			let tmpArr = [];
			this.goodsList = [];
			let end_goods_id = 0;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				};
				this.goodsList.push(p);
			}
		},

		// 商品跳转
		toGoods(e) {
			uni.showToast({
				title: '商品' + e.goods_id,
				icon: 'none'
			});
			uni.navigateTo({
				url: '../goods'
			});
		},

		// 排序类型
		select(index) {
			let tmpTis = this.orderbyList[index].text + '排序 ';
			if (this.orderbyList[index].orderbyicon) {
				let type = this.orderbyList[index].orderby == 0 ? '升序' : '降序';
				if (this.orderbyList[index].selected) {
					type = this.orderbyList[index].orderby == 0 ? '降序' : '升序';
					this.orderbyList[index].orderby = this.orderbyList[index].orderby == 0 ? 1 : 0;
				}
				tmpTis += type;
			}
			this.orderbyList[index].selected = true;
			let len = this.orderbyList.length;
			for (let i = 0; i < len; i++) {
				if (i != index) {
					this.orderbyList[i].selected = false;
				}
			}
			uni.showToast({
				title: tmpTis,
				icon: 'none'
			});
		}
	}
};
</script>

<style lang="scss">
.icon {
	font-size: 26upx;
}

.goods-list {
	.loading-text {
		display: flex;
		width: 100%;
		height: 100rpx;
		background-color: #f9f9f9;
		color: #979797;
		font-size: 24upx;
		justify-content: center;
		align-items: center;
	}

	.product-list {
		display: flex;
		padding: 0 4%;
		width: 92%;
		justify-content: space-between;
		flex-wrap: wrap;

		.product {
			margin-bottom: 30upx;
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			box-shadow: 0upx 5upx 12upx rgba(0, 0, 0, 0.2);

			image {
				display: block;
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}

			.name {
				display: -webkit-box;
				overflow: hidden;
				margin: 10upx 6%;
				width: 88%;
				text-overflow: ellipsis;
				font-size: 28upx;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.info {
				display: flex;
				padding: 0 6% 15upx;
				width: 88%;
				justify-content: space-between;
				align-items: flex-end;

				.price {
					color: #e65339;
					font-weight: 600;
					font-size: 30upx;
				}

				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
