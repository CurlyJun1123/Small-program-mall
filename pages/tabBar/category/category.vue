<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{ position: headerPosition }"></view>
		<view v-if="showHeader" class="header">
			<view class="input-box">
				<input placeholder="搜索关键字" placeholder-style="color: #c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 头部导航导航 -->
		<view class="category-top">
			<view class="box" v-for="(main, index) in categoryList" :key="main.id" :class="[index == showMainIndex ? 'on' : '']" @tap="showMain(index)">
				<view class="text">
					<view>{{ main.nameOne }}</view>
					<view>{{ main.nameTwo }}</view>
				</view>
				<image :src="'/static/img/tabBar/category/' + main.img"></image>
			</view>
		</view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view v-for="(main, i) in categoryList" :key="i" v-show="i == showMainIndex">
					<view class="row" v-for="(one, j) in main.oneList" :key="j" :class="[j == showOneIndex ? 'on' : '']" @tap="showOne(j)">
						<view class="text">
							<view class="block"></view>
							{{ one.title }}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view v-for="(main, i) in categoryList" :key="i" v-show="i == showMainIndex">
					<view class="category" v-for="(one, j) in main.oneList" :key="j" v-show="j == showOneIndex">
						<view v-for="(two, k) in one.twoList" :key="k">
							<!-- 三级标题 -->
							<view class="class">{{ two.title }}</view>
							<view class="list">
								<view class="box" v-for="(three, z) in two.threelist" :key="z" @tap="toCategory(two.title, z, two.threelist)">
									<image :src="'/static/img/category/list/' + three.img"></image>
									<view class="text">{{ three.name }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showHeader: true,
			showMainIndex: 0, // 头部导航下标
			showOneIndex: 0, // 右侧子导航下标
			headerPosition: 'fixed',
			// 分类列表
			categoryList: [
				{
					id: 1,
					nameOne: '时尚',
					nameTwo: '辣妈',
					img: '01.png',
					oneList: [
						{
							id: 1,
							title: '家用电器',
							twoList: [
								{
									title: '上衣',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										},
										{
											id: 3,
											name: '燃气灶',
											img: '6.jpg'
										},
										{
											id: 4,
											name: '热水器',
											img: '7.jpg'
										},
										{
											id: 5,
											name: '电吹风',
											img: '8.jpg'
										},
										{
											id: 6,
											name: '电饭煲',
											img: '9.jpg'
										},
										{
											id: 7,
											name: '电视',
											img: '2.jpg'
										}
									]
								},
								{
									title: '下衣',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										},
										{
											id: 3,
											name: '风扇',
											img: '5.jpg'
										},
										{
											id: 4,
											name: '燃气灶',
											img: '6.jpg'
										},
										{
											id: 5,
											name: '热水器',
											img: '7.jpg'
										},
										{
											id: 6,
											name: '电吹风',
											img: '8.jpg'
										},
										{
											id: 7,
											name: '电饭煲',
											img: '9.jpg'
										},
										{
											id: 8,
											name: '电视',
											img: '2.jpg'
										}
									]
								}
							]
						},
						{
							id: 2,
							title: '办公用品',
							twoList: [
								{
									title: '化妆品',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										},
										{
											id: 3,
											name: '空调',
											img: '3.jpg'
										},
										{
											id: 4,
											name: '电吹风',
											img: '8.jpg'
										},
										{
											id: 5,
											name: '电饭煲',
											img: '9.jpg'
										},
										{
											id: 6,
											name: '电视',
											img: '2.jpg'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 2,
					nameOne: '萌娃',
					nameTwo: '童装',
					img: '02.png',
					oneList: [
						{
							id: 1,
							title: '婴儿用品',
							twoList: [
								{
									title: '下衣',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										}
									]
								},
								{
									title: '上衣',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										},
										{
											id: 3,
											name: '风扇',
											img: '5.jpg'
										},
										{
											id: 4,
											name: '燃气灶',
											img: '6.jpg'
										}
									]
								}
							]
						},
						{
							id: 2,
							title: '其他用品',
							twoList: [
								{
									title: '化妆品',
									threelist: [
										{
											id: 1,
											name: '冰箱',
											img: '1.jpg'
										},
										{
											id: 2,
											name: '电视',
											img: '2.jpg'
										},
										{
											id: 3,
											name: '空调',
											img: '3.jpg'
										},
										{
											id: 4,
											name: '洗衣机',
											img: '4.jpg'
										},
										{
											id: 5,
											name: '风扇',
											img: '5.jpg'
										},
										{
											id: 6,
											name: '电吹风',
											img: '8.jpg'
										},
										{
											id: 7,
											name: '电饭煲',
											img: '9.jpg'
										},
										{
											id: 8,
											name: '电视',
											img: '2.jpg'
										}
									]
								}
							]
						}
					]
				}
			]
		};
	},

	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},

	onLoad() {},

	onShow() {
		this.showMainIndex = getApp().globalData.activeCategoryMain ? getApp().globalData.activeCategoryMain : 0;
		this.showOneIndex = 0;
	},

	methods: {
		// 头部导航切换显示
		showMain(index) {
			getApp().globalData.activeCategoryMain = index;
			this.showMainIndex = index;
			this.showOneIndex = 0;
		},

		// 右侧子导航切换显示
		showOne(index) {
			this.showOneIndex = index;
		},

		// 列表跳转
		toCategory(name, index, list) {
			// uni.setStorageSync('catName', name);
			// uni.setStorageSync('catList', list);

			// 设置当前活动的项目索引值
			getApp().globalData.activeitemindex = index;
			// 设置当前活动的项目位置
			let curscrollitem = null;
			index == 0 ? (curscrollitem = 'glsntb-' + index) : index == 1 ? (curscrollitem = 'glsntb-' + (index - 1)) : (curscrollitem = 'glsntb-' + (index - 2));
			getApp().globalData.curscrollitem = curscrollitem;

			uni.navigateTo({
				url: '../../goods/goods-list/goods-list?index=' + index + '&name=' + name + '&list=' + JSON.stringify(list)
			});
		},

		// 搜索跳转
		toSearch() {
			uni.showToast({
				title: '建议跳转到新页面做搜索功能'
			});
		}
	}
};
</script>

<style lang="scss">
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}

.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	z-index: 10;
	background-color: #fff;
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
			font-size: 28upx;
		}
	}
}

.category-top {
	display: flex;
	margin: 0 4%;
	height: 100upx;
	align-items: center;
	justify-content: space-between;

	.box {
		position: relative;
		width: 335upx;
		height: 100upx;
		border-radius: 12upx;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.2);
		filter: grayscale(100%);
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);

		.text {
			position: absolute;
			top: 50%;
			left: 16%;
			color: #fff;
			font-size: 28upx;
			transform: translate(-50%, -50%);
		}

		image {
			width: 100%;
			height: 100upx;
			border-radius: 12upx;
		}

		&.on {
			filter: grayscale(0%);
			-webkit-filter: grayscale(0%);
			-moz-filter: grayscale(0%);
			-ms-filter: grayscale(0%);
			-o-filter: grayscale(0%);
		}
	}
}

.category-list {
	width: 100%;
	background-color: #fff;
	display: flex;

	.left,
	.right {
		position: absolute;

		top: 220upx;
		/*  #ifdef  APP-PLUS  */
		top: calc(220upx + var(--status-bar-height));
		/*  #endif  */
		bottom: 0upx;
	}

	.left {
		width: 24%;
		left: 0upx;
		background-color: #f2f2f2;

		.row {
			width: 100%;
			height: 100upx;
			display: flex;
			align-items: center;

			.text {
				width: 100%;
				position: relative;
				font-size: 28upx;
				display: flex;
				justify-content: center;
				color: #3c3c3c;

				.block {
					position: absolute;
					width: 0upx;
					left: 0;
				}
			}

			&.on {
				background-color: #fff;

				.text {
					font-size: 30upx;
					font-weight: 600;
					color: #2d2d2d;

					.block {
						width: 10upx;
						height: 80%;
						top: 10%;
						background-color: #f06c7a;
					}
				}
			}
		}
	}

	.right {
		width: 76%;
		left: 24%;

		.category {
			width: 94%;
			padding: 20upx 3%;

			.class {
				position: relative;
				margin: 60upx 0 30upx;
				width: 100%;
				text-align: center;
				font-size: 28upx;
			}

			.class:before,
			.class:after {
				position: absolute;
				background: #ccc;
				content: '';
				height: 2upx;
				top: 50%;
				width: 20%;
			}

			.class:before {
				left: 16%;
			}

			.class:after {
				right: 16%;
			}

			.list {
				display: flex;
				width: 100%;
				flex-wrap: wrap;

				.box {
					width: calc(71.44vw / 3);
					margin: 20upx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;

					image {
						width: 60%;
						height: calc(71.44vw / 3 * 0.6);
					}

					.text {
						display: flex;
						margin-top: 18upx;
						width: 100%;
						font-size: 24upx;
						justify-content: center;
					}
				}
			}
		}

		.category :first-child .class {
			margin: 10upx 0 30upx;
		}
	}
}
</style>
