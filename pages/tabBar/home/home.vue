<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition, top: statusTop, opacity: afterHeaderOpacity }"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header">
			<!-- 搜索框 -->
			<view class="input-box">
				<input placeholder="搜索关键字" placeholder-style="color: #c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
		</view>

		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id"><image :src="swiper.img" @tap="toSwiper(swiper)"></image></swiper-item>
				</swiper>
				<view class="indicator"><view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view></view>
			</view>
		</view>

		<!-- 分类列表 -->
		<view class="category-list">
			<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(index)">
				<view class="img"><image :src="row.img"></image></view>
				<view class="title">
					<view class="chinese-title">{{ row.chineseTitle }}</view>
					<view class="english-title">{{ row.englishTitle }}</view>
				</view>
			</view>
		</view>

		<!-- 现时抢购列表 -->
		<view class="buying-now" v-if="buyingList.length > 0">
			<view class="title">
				<view class="english-title">Limited time</view>
				<view class="chinese-title">限时抢购</view>
			</view>
			<view class="buying-first">
				<view class="img"><image :src="buyingList[0].img"></image></view>
				<view class="top">
					<view class="list">
						<view class="day">12月01日</view>
						<view class="text">进行中</view>
					</view>
					<view class="list">
						<view class="day">12月01日</view>
						<view class="text">即将开始</view>
					</view>
				</view>
				<view class="bottom">
					<view class="countdown">
						<view class="left">还剩</view>
						<view class="right" v-for="(row, index) in countdownToTheDay" :key="index">
							<view>{{ row.h }}</view>
							:
							<view>{{ row.m }}</view>
							:
							<view>{{ row.s }}</view>
						</view>
					</view>
					<view class="info">
						<view class="name">{{ buyingList[0].name }}</view>
						<view class="progress"><view class="schedule" :style="{ width: buyingList[0].schedule + '%' }"></view></view>
						<view class="sales">已抢888件</view>
					</view>
					<view class="price">
						<view class="current-price">￥{{ buyingList[0].currentPrice }}</view>
						<view class="original-price">原价：￥{{ buyingList[0].originalPrice }}</view>
					</view>
				</view>
			</view>
			<view class="buying-list">
				<view class="buying" v-for="(buying, index) in buyingList" :key="index" v-if="index != 0">
					<view class="left"><image :src="buying.img"></image></view>
					<view class="right">
						<view class="top">
							<view class="text">
								<view class="name">{{ buying.name }}</view>
								<view class="info">
									<view class="original-price">原价：￥{{ buying.originalPrice }}</view>
									<view class="current-price">￥{{ buying.currentPrice }}</view>
								</view>
							</view>
							<view class="button">马上抢购</view>
						</view>
						<view class="bottom">
							<view class="progress"><view class="schedule" :style="{ width: buying.schedule + '%' }"></view></view>
							<view class="sales">已抢888件</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 新品展示列表 -->
		<view class="news-product-display" v-if="newsList.length > 0">
			<view class="title">
				<view class="english-title">New product display</view>
				<view class="chinese-title">新品展示</view>
			</view>
			<view class="news-list">
				<view class="news" v-for="(news, index) in newsList" :key="index"><image :src="news.img"></image></view>
			</view>
		</view>

		<!-- 热销商品列表 -->
		<view class="popular-products" v-if="popularList.length > 0">
			<view class="title">
				<view class="english-title">Popular products</view>
				<view class="chinese-title">热销商品</view>
			</view>
			<scroll-view scroll-x class="popular-list">
				<view class="popular" v-for="(popular, index) in popularList" :key="index">
					<view class="img"><image :src="popular.img"></image></view>
					<view class="name">{{ popular.name }}</view>
					<view class="price">￥{{ popular.price }}</view>
				</view>
			</scroll-view>
		</view>

		<!-- 热销商品列表 -->
		<view class="today-specials" v-if="todayList.length > 0">
			<view class="title">
				<view class="english-title">Today's specials</view>
				<view class="chinese-title">今日特惠</view>
			</view>
			<view class="today-list">
				<view class="today" v-for="(today, index) in todayList" :key="index" @tap="toGoods(today)">
					<view class="top">
						<image :src="today.img" mode="widthFix"></image>
						<view class="name">{{ today.name }}</view>
					</view>
					<view class="bottom">
						<view class="progress">
							<view class="text">已抢29件</view>
							<view class="schedule" :style="{ width: today.schedule + '%' }"></view>
						</view>
						<view class="info">
							<view class="original-price">￥{{ today.originalPrice }}</view>
							<view class="current-price">￥{{ today.currentPrice }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view class="place-text">Ladies&amp;Kids</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showHeader: true,
			afterHeaderOpacity: 1, //不透明度
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			nVueTitle: null,
			currentSwiper: 0,
			// 轮播图片
			swiperList: [
				{
					id: 1,
					src: 'url1',
					img: '/static/img/1.jpg'
				},
				{
					id: 2,
					src: 'url2',
					img: '/static/img/2.jpg'
				},
				{
					id: 3,
					src: 'url3',
					img: '/static/img/3.jpg'
				}
			],
			// 分类菜单
			categoryList: [
				{
					id: 1,
					img: '/static/img/tabBar/home/01.jpg',
					chineseTitle: '童装',
					englishTitle: "Children's Wear"
				},
				{
					id: 2,
					img: '/static/img/tabBar/home/02.jpg',
					chineseTitle: '女装',
					englishTitle: "Women's Wear"
				}
			],
			countdownToTheDay: null,
			// 限时抢购
			buyingList: [
				{
					buyingId: 1,
					img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg',
					name: '商品名称商品名称商品名称',
					originalPrice: '22.00',
					currentPrice: '10.99',
					schedule: 25
				},
				{
					buyingId: 2,
					img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg',
					name: '商品名称商品',
					originalPrice: '444.00',
					currentPrice: '23.00',
					schedule: 88
				},
				{
					buyingId: 3,
					img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称商品名称',
					originalPrice: '444.00',
					currentPrice: '23.00',
					schedule: 63
				}
			],
			// 新品展示
			newsList: [
				{
					newsId: 1,
					img: '/static/img/tabBar/home/100.jpg'
				},
				{
					newsId: 1,
					img: '/static/img/tabBar/home/100.jpg'
				}
			],
			// 热销商品
			popularList: [
				{
					popularId: 1,
					img: '/static/img/goods/p1.jpg',
					name: '热销商品',
					price: '449.00'
				},
				{
					popularId: 2,
					img: '/static/img/goods/p2.jpg',
					name: '热销商品热销商品热销商品',
					price: '449.00'
				},
				{
					popularId: 3,
					img: '/static/img/goods/p3.jpg',
					name: '热销商品热销商品热销商品',
					price: '449.00'
				},
				{
					popularId: 4,
					img: '/static/img/goods/p4.jpg',
					name: '热销商品热销商品热销商品',
					price: '449.00'
				},
				{
					popularId: 5,
					img: '/static/img/goods/p5.jpg',
					name: '热销商品热销商品热销商品',
					price: '449.00'
				}
			],
			// 热销商品列表
			todayList: [
				{
					todayId: 0,
					img: '/static/img/goods/p1.jpg',
					name: '商品名称商品',
					originalPrice: '424.00',
					currentPrice: '243.00',
					amount: '1235人付款',
					schedule: 40
				},
				{
					todayId: 1,
					img: '/static/img/goods/p2.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					originalPrice: '444.00',
					currentPrice: '23.00',
					amount: '1235人付款',
					schedule: 40
				},
				{
					todayId: 2,
					img: '/static/img/goods/p3.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					originalPrice: '444.00',
					currentPrice: '23.00',
					amount: '1235人付款',
					schedule: 40
				},
				{
					todayId: 3,
					img: '/static/img/goods/p4.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					originalPrice: '444.00',
					currentPrice: '23.00',
					amount: '1235人付款',
					schedule: 40
				},
				{
					todayId: 4,
					img: '/static/img/goods/p5.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					originalPrice: '444.00',
					currentPrice: '23.00',
					amount: '1235人付款',
					schedule: 40
				},
				{
					todayId: 5,
					img: '/static/img/goods/p6.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名',
					originalPrice: '444.00',
					currentPrice: '23.00',
					amount: '1235人付款',
					schedule: 40
				}
			],
			loadingText: '正在加载...'
		};
	},

	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop >= 0 ? 'fixed' : 'absolute';
		this.headerTop = e.scrollTop >= 0 ? null : 0;
		this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
	},

	// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},

	onLoad() {
		// 开启定时器
		this.Timer();
		// 加载活动专区
		this.loadPromotion();
	},

	methods: {
		// 加载Promotion 并设定倒计时,,实际应用中应该是ajax加载此数据。
		loadPromotion() {
			let cutTime = new Date();
			let yy = cutTime.getFullYear(),
				mm = cutTime.getMonth() + 1,
				dd = cutTime.getDate();
			let tmpcountdown = yy + '/' + mm + '/' + dd + ' 23:59:59';
			// 检查倒计时
			let row = this.countdownToTheDay;
			// if (row.countdown) {
			let h = '00',
				m = '00',
				s = '00';
			let currentTime = new Date();
			let cutoffTime = new Date(tmpcountdown);
			if (!(currentTime >= cutoffTime)) {
				let countTime = parseInt((cutoffTime.getTime() - currentTime.getTime()) / 1000);
				h = parseInt(countTime / 3600);
				m = parseInt((countTime % 3600) / 60);
				s = countTime % 60;
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				s = s < 10 ? '0' + s : s;
			}
			this.countdownToTheDay = [{ h: h, m: m, s: s }];
		},

		// 定时器
		Timer() {
			setInterval(() => {
				if (this.countdownToTheDay.length > 0) {
					for (let i = 0; i < this.countdownToTheDay.length; i++) {
						let row = this.countdownToTheDay[i];
						if (row) {
							if (!(row.h == 0 && row.m == 0 && row.s == 0)) {
								if (row.s > 0) {
									row.s--;
									row.s = row.s < 10 ? '0' + row.s : row.s;
								} else if (row.m > 0) {
									row.m--;
									row.m = row.m < 10 ? '0' + row.m : row.m;
									row.s = 59;
								} else if (row.h > 0) {
									row.h--;
									row.h = row.h < 10 ? '0' + row.h : row.h;
									row.m = 59;
									row.s = 59;
								}
								this.countdownToTheDay[i] = row;
							}
						}
					}
				}
			}, 1000);
		},

		// 搜索跳转
		toSearch() {
			uni.showToast({
				title: '建议跳转到新页面做搜索功能'
			});
		},

		// 轮播图跳转
		toSwiper(e) {
			uni.showToast({
				title: e.src,
				icon: 'none'
			});
		},

		// 分类跳转
		toCategory(e) {
			getApp().globalData.activeCategoryMain = e;
			uni.switchTab({
				url: '/pages/tabBar/category/category'
			});
		},

		// 商品跳转
		toGoods(e) {
			uni.showToast({
				title: '商品' + e.goods_id,
				icon: 'none'
			});
			uni.navigateTo({
				url: '../../goods/goods'
			});
		},

		// 轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		}
	}
};
</script>

<style lang="scss">
page {
	position: relative;
	background-color: #fff;
}

@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}

.pullDown-effects {
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);

	/*  #endif  */
	image {
		width: 100%;
		height: 36vw;
	}
}

.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); // 覆盖样式
	/*  #endif  */
}

.header {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	padding: 0 4%;
	width: 92%;
	height: 100upx;
	background-color: #fff;
	align-items: center;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;

		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}

		input {
			padding-left: 28upx;
			height: 28upx;
			width: calc(100% - 110upx);
			border-radius: 30upx;
			background-color: #f5f5f5;
			font-size: 28upx;
		}
	}
}

.swiper {
	width: 100%;
	display: flex;
	justify-content: center;

	.swiper-box {
		width: 100%;
		height: 50vw;

		overflow: hidden;
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;

		swiper {
			width: 100%;
			height: 50vw;

			swiper-item {
				image {
					width: 100%;
					height: 50vw;
				}
			}
		}

		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;

			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;

				&.on {
					width: (100%/3);
				}
			}
		}
	}
}

.category-list {
	display: flex;
	margin: 0 4%;
	padding-top: 30upx;
	width: 92%;
	justify-content: space-between;

	.category {
		position: relative;
		width: 48%;

		.img {
			width: 100%;

			image {
				display: block;
				width: 100%;
				height: 29.256vw;
				border-radius: 18upx;
				box-shadow: 6upx 6upx 10upx rgba(26, 26, 26, 0.1);
			}
		}

		.title {
			position: absolute;
			top: 10upx;
			right: 16upx;
			text-align: right;
			color: #fff;
			font-size: 30upx;

			.chinese-title {
				font-size: 32upx;
			}
		}
	}
}

.buying-now,
.news-product-display,
.popular-products,
.today-specials {
	.title {
		margin: 50upx 0 30upx;
		text-align: center;

		.english-title {
			font-size: 28upx;
			text-transform: uppercase;
		}

		.chinese-title {
			color: #795a45;
			font-size: 34upx;
			font-weight: 600;
		}
	}
}

.buying-now {
	.name {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28upx;
		-webkit-box-orient: vertical;
	}

	.current-price {
		color: #d7c650;
		font-size: 30upx;
	}

	.original-price {
		text-decoration: line-through;
		color: #8f8f8f;
		font-size: 22upx;
	}

	.buying-first {
		position: relative;
		width: 100%;
		height: 100vw;

		.img {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.top {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			width: 100%;
			height: 115upx;
			background-color: rgba(0, 0, 0, 0.5);
			color: #fff;
			font-size: 26upx;
			align-items: center;
			justify-content: space-around;

			.list {
				text-align: center;
			}
		}

		.bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;

			.countdown {
				display: flex;
				width: 100%;
				height: 60upx;
				background-color: #c0392b;
				color: #fff;
				line-height: 60upx;
				justify-content: center;
				align-items: center;

				.left {
					margin-right: 10upx;
					font-size: 24upx;
				}

				.right {
					display: flex;
					font-size: 28upx;
					justify-content: center;
					align-items: center;

					view {
						display: flex;
						margin: 0 8upx;
						width: 38upx;
						height: 38upx;
						border-radius: 4upx;
						background-color: #fff;
						color: #c0392b;
						line-height: 38upx;
						justify-content: center;
					}
				}
			}

			.info {
				display: flex;
				padding: 20upx 4% 10upx;
				width: 92%;
				justify-content: space-between;
				align-items: center;

				.name {
					margin-right: 20upx;
					width: 200upx;
					-webkit-line-clamp: 1;
				}

				.progress {
					margin-right: 20upx;
					width: 290upx;
					height: 12upx;
					border-radius: 4upx;
					background-color: #efeff9;

					.schedule {
						width: 0%;
						height: 100%;
						border-radius: 4upx;
						background-color: #d7c650;
					}
				}

				.sales {
					width: 160upx;
					text-align: right;
					font-size: 24upx;
				}
			}

			.price {
				display: flex;
				padding: 0 4% 20upx;
				width: 92%;
				align-items: center;

				.current-price {
					margin-right: 20upx;
				}

				.original-price {
				}
			}
		}
	}

	.buying-list {
		padding: 0 4%;
		width: 92%;
		border-top: 20upx solid #efeff9;

		.buying {
			display: flex;
			padding: 20upx 0;
			border-bottom: 2upx solid #d4d4d4;

			.left {
				margin-right: 20upx;
				width: 200upx;
				height: 200upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}
			}

			.right {
				display: flex;
				width: calc(100% - 220upx);
				flex-direction: column;
				justify-content: space-between;

				.top {
					display: flex;
					width: 100%;
					justify-content: space-between;

					.text {
						width: calc(100% - 180upx);

						.name {
							-webkit-line-clamp: 2;
						}

						.info {
							margin-top: 12upx;
						}
					}

					.button {
						width: 160upx;
						height: 60upx;
						background-color: #795a45;
						color: #fff;
						text-align: center;
						font-size: 28upx;
						line-height: 60upx;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.progress {
						width: calc(100% - 180upx);
						height: 12upx;
						border-radius: 4upx;
						background-color: #efeff9;

						.schedule {
							width: 0%;
							height: 100%;
							border-radius: 4upx;
							background-color: #d7c650;
						}
					}

					.sales {
						font-size: 24upx;
					}
				}
			}
		}

		.buying:last-child {
			border-bottom: 0;
		}
	}
}

.news-product-display {
	.news-list {
		margin: 0 4%;
		width: 92%;

		.news {
			margin-bottom: 30upx;
			width: 100%;
			height: calc((16 / 30) * 92vw);

			image {
				width: 100%;
				height: 100%;
				border-radius: 20upx;
			}
		}

		.news:last-child {
			margin-bottom: 0;
		}
	}
}

.popular-products {
	overflow: hidden;
	white-space: nowrap;

	.popular-list {
		overflow: hidden;
		width: auto;

		.popular {
			display: inline-block;
			margin-right: 24upx;
			width: 34vw;
			vertical-align: top;

			.img {
				width: 100%;
				height: 34vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}
			}

			.name {
				display: -webkit-box;
				overflow: hidden;
				margin-top: 15upx;
				text-overflow: ellipsis;
				white-space: normal;
				font-size: 28upx;
				line-height: 40upx;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.price {
				margin-top: 8upx;
				color: #b7954b;
				font-size: 28upx;
			}
		}

		.popular:first-child {
			margin-left: 30upx;
		}

		.popular:last-child {
			margin-right: 30upx;
		}
	}
}

.today-specials {
	.today-list {
		display: flex;
		padding: 0 4%;
		width: 92%;
		justify-content: space-between;
		flex-wrap: wrap;

		.today {
			display: flex;
			flex-direction: column;
			margin-bottom: 30upx;
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			box-shadow: 0upx 2upx 10upx rgba(0, 0, 0, 0.1);
			justify-content: space-between;

			.top {
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
			}

			.bottom {
				.progress {
					position: relative;
					margin: 10upx 6%;
					width: 88%;
					height: 26upx;
					border-radius: 6upx;
					background-color: #efeff9;

					.text {
						position: absolute;
						top: 0;
						left: 10upx;
						z-index: 10;
						color: #fff;
						font-size: 18upx;
						line-height: 26upx;
					}

					.schedule {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 5;
						width: 0%;
						height: 100%;
						border-radius: 6upx;
						background-color: #d7c650;
					}
				}

				.info {
					display: flex;
					padding: 0 6% 15upx;
					width: 88%;
					align-items: center;

					.original-price {
						color: #b7954b;
						font-size: 28upx;
					}

					.current-price {
						margin-left: 10upx;
						color: #8f8f8f;
						text-decoration: line-through;
						font-size: 24upx;
					}
				}
			}
		}
	}
}

.place-text {
	display: flex;
	margin-top: 30upx;
	width: 100%;
	height: 100upx;
	background-color: #f9f9f9;
	color: #979797;
	font-size: 24upx;
	justify-content: center;
	align-items: center;
}
</style>
