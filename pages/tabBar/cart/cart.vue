<template>
	<view>
		<view v-if="showHeader" class="status" :style="{ position: headerPosition, top: statusTop }"></view>

		<view class="tis" v-if="goodsList.length == 0">
			<view class="img"><image src="/static/img/tabBar/cart/01.png" mode=""></image></view>
			<view class="text">购物车是空的哦~</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="row" v-for="(row, index) in goodsList" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row.id)"><view class="icon shanchu"></view></view>
				<!-- 商品 -->
				<view
					class="carrier"
					:class="[theIndex == index ? 'open' : oldIndex == index ? 'close' : '']"
					@touchstart="touchStart(index, $event)"
					@touchmove="touchMove(index, $event)"
					@touchend="touchEnd(index, $event)"
				>
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox"><view :class="[row.selected ? 'on' : '']"></view></view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info">
						<view class="img" @tap="toGoods(row)"><image :src="row.img"></image></view>
						<view class="info">
							<view class="title" @tap="toGoods(row)">{{ row.name }}</view>
							<view class="flex">
								<view class="spec">{{ row.spec }}</view>
							</view>
							<view class="price-number">
								<view class="price">￥{{ row.price }}</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(index)"><view class="icon jian"></view></view>
									<view class="input" @tap.stop="discard"><input type="number" v-model="row.number" @input="sum($event, index)" /></view>
									<view class="add" @tap.stop="add(index)"><view class="icon jia"></view></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{ bottom: footerbottom }">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox"><view :class="[isAllselected ? 'on' : '']"></view></view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList" v-if="selectedList.length > 0">删除</view>
			<view class="settlement">
				<view class="sum">
					<view class="text">合计:</view>
					<view class="money">￥{{ sumPrice }}</view>
				</view>
				<view class="btn" @tap="toConfirmation">结算 ({{ selectedList.length }})</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sumPrice: '0.00',
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			showHeader: true,
			selectedList: [],
			isAllselected: false,
			goodsList: [
				{
					id: 1,
					img: '/static/img/goods/p1.jpg',
					name: '商品标题商品标题商品标题商品',
					spec: '规格:S码',
					price: 127.5,
					number: 1,
					selected: false
				},
				{
					id: 2,
					img: '/static/img/goods/p2.jpg',
					name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					spec: '规格:S码',
					price: 127.5,
					number: 1,
					selected: false
				},
				{
					id: 3,
					img: '/static/img/goods/p3.jpg',
					name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					spec: '规格:S码',
					price: 127.5,
					number: 1,
					selected: false
				},
				{
					id: 4,
					img: '/static/img/goods/p4.jpg',
					name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					spec: '规格:S码',
					price: 127.5,
					number: 1,
					selected: false
				},
				{
					id: 5,
					img: '/static/img/goods/p5.jpg',
					name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
					spec: '规格:S码',
					price: 127.5,
					number: 1,
					selected: false
				}
			],
			//控制滑动效果
			theIndex: null,
			oldIndex: null,
			isStop: false
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
		// 兼容H5下结算条位置
		// #ifdef H5
		this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
		// #endif
		// #ifdef APP-PLUS
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
	},

	methods: {
		// 加入商品 参数 goods:商品数据
		joinGoods(goods) {
			/*
			 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
			 * 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
			 * 一般商城购物车的增删改动作是由后端来完成的,
			 * 后端记录后返回前端更新前端缓存
			 */
			let len = this.goodsList.length;
			let isFind = false; // 是否找到ID一样的商品
			for (let i = 0; i < len; i++) {
				let row = this.goodsList[i];
				if (row.id == goods.id) {
					// 找到商品一样的商品
					this.goodsList[i].number++; // 数量自增
					isFind = true; // 找到一样的商品
					break; // 跳出循环
				}
			}
			if (!isFind) {
				// 没有找到一样的商品，新增一行到购物车商品列表头部
				this.goodsList[i].unshift(goods);
			}
		},

		// 控制左滑删除效果-begin
		touchStart(index, event) {
			// 多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			this.oldIndex = this.theIndex;
			this.theIndex = null;
			// 初始坐标
			this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
		},

		touchMove(index, event) {
			// 多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			let moveX = event.touches[0].pageX - this.initXY[0];
			let moveY = event.touches[0].pageY - this.initXY[1];
			if (this.isStop || Math.abs(moveX) < 5) {
				return;
			}
			if (Math.abs(moveY) > Math.abs(moveX)) {
				// 竖向滑动-不触发左滑效果
				this.isStop = true;
				return;
			}
			if (moveX < 0) {
				this.theIndex = index;
				this.isStop = true;
			} else if (moveX > 0) {
				if (this.theIndex != null && this.oldIndex == this.theIndex) {
					this.oldIndex = index;
					this.theIndex = null;
					this.isStop = true;
					setTimeout(() => {
						this.oldIndex = null;
					}, 150);
				}
			}
		},

		touchEnd(index, $event) {
			// 结束禁止触发效果
			this.isStop = false;
		},

		// 控制左滑删除效果-end
		// 商品跳转
		toGoods(e) {
			uni.showToast({
				title: '商品' + e.id,
				icon: 'none'
			});
			uni.navigateTo({
				url: '../../goods/goods'
			});
		},

		// 跳转确认订单页面
		toConfirmation() {
			let tmpList = [];
			let len = this.goodsList.length;
			for (let i = 0; i < len; i++) {
				if (this.goodsList[i].selected) {
					tmpList.push(this.goodsList[i]);
				}
			}
			if (tmpList.length < 1) {
				uni.showToast({
					title: '请选择商品结算',
					icon: 'none'
				});
				return;
			}
			uni.setStorage({
				key: 'buylist',
				data: tmpList,
				success: () => {
					uni.navigateTo({
						url: '../../order/confirmation'
					});
				}
			});
		},

		// 删除商品
		deleteGoods(id) {
			let len = this.goodsList.length;
			for (let i = 0; i < len; i++) {
				if (id == this.goodsList[i].id) {
					this.goodsList.splice(i, 1);
					break;
				}
			}
			this.selectedList.splice(this.selectedList.indexOf(id), 1);
			this.sum();
			this.oldIndex = null;
			this.theIndex = null;
		},

		// 删除商品s
		deleteList() {
			let len = this.selectedList.length;
			while (this.selectedList.length > 0) {
				this.deleteGoods(this.selectedList[0]);
			}
			this.selectedList = [];
			this.isAllselected = this.selectedList.length == this.goodsList.length && this.goodsList.length > 0;
			this.sum();
		},

		// 选中商品
		selected(index) {
			this.goodsList[index].selected = this.goodsList[index].selected ? false : true;
			let i = this.selectedList.indexOf(this.goodsList[index].id);
			i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id);
			this.isAllselected = this.selectedList.length == this.goodsList.length;
			this.sum();
		},

		// 全选
		allSelect() {
			let len = this.goodsList.length;
			let arr = [];
			for (let i = 0; i < len; i++) {
				this.goodsList[i].selected = this.isAllselected ? false : true;
				arr.push(this.goodsList[i].id);
			}
			this.selectedList = this.isAllselected ? [] : arr;
			this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true;
			this.sum();
		},

		// 减少数量
		sub(index) {
			if (this.goodsList[index].number <= 1) {
				return;
			}
			this.goodsList[index].number--;
			this.sum();
		},

		// 增加数量
		add(index) {
			this.goodsList[index].number++;
			this.sum();
		},

		// 合计
		sum(e, index) {
			this.sumPrice = 0;
			let len = this.goodsList.length;
			for (let i = 0; i < len; i++) {
				if (this.goodsList[i].selected) {
					if (e && i == index) {
						this.sumPrice = this.sumPrice + e.detail.value * this.goodsList[i].price;
					} else {
						this.sumPrice = this.sumPrice + this.goodsList[i].number * this.goodsList[i].price;
					}
				}
			}
			this.sumPrice = this.sumPrice.toFixed(2);
		},

		discard() {
			// 丢弃
		}
	}
};
</script>

<style lang="scss">
page {
	position: relative;
	background-color: #f9f9f9;
}

.place {
	height: 130upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}

.checkbox-box {
	display: flex;
	height: 40upx;
	line-height: 40upx;
	align-items: center;

	.checkbox {
		width: 32upx;
		height: 32upx;
		border-radius: 100%;
		border: solid 2upx #e0b87a;
		display: flex;
		justify-content: center;
		align-items: center;

		.on {
			width: 20upx;
			height: 20upx;
			border-radius: 100%;
			background-color: #e0b87a;
		}
	}

	.text {
		font-size: 28upx;
		margin-left: 10upx;
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
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}

.tis {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	width: 100%;
	height: calc(100vh - 100upx);
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.img {
		image {
			display: block;
			width: 65vw;
			height: 52vw;
		}
	}

	.text {
		margin-top: 30upx;
		color: #cdcdcd;
		font-size: 28upx;
	}
}

.goods-list {
	margin: 30upx 30upx 0;
	width: calc(100% - 60upx);
	border-radius: 15upx;
	box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

	.row {
		position: relative;
		z-index: 4;
		display: flex;
		overflow: hidden;
		height: calc(25vw + 40upx);
		border: 0;
		align-items: center;

		.menu {
			position: absolute;
			right: 0;
			z-index: 2;
			display: flex;
			width: 30%;
			height: 100%;
			background-color: red;
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				color: #fff; // font-size: 25upx;
			}
		}

		.carrier {
			position: absolute;
			z-index: 3;
			display: flex;
			padding: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			align-items: center;

			@keyframes showMenu {
				0% {
					transform: translateX(0);
				}

				100% {
					transform: translateX(-30%);
				}
			}

			@keyframes closeMenu {
				0% {
					transform: translateX(-30%);
				}

				100% {
					transform: translateX(0);
				}
			}

			&.open {
				animation: showMenu 0.25s linear both;
			}

			&.close {
				animation: closeMenu 0.15s linear both;
			}

			.checkbox-box {
				padding-left: 20upx;
				flex-shrink: 0;
				height: 25vw;
				margin-right: 20upx;
			}

			.goods-info {
				width: 100%;
				display: flex;
				padding-right: 20upx;

				.img {
					width: 25vw;
					height: 25vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 20upx;

					image {
						width: 25vw;
						height: 25vw;
					}
				}

				.info {
					width: 100%;
					height: 25vw;
					overflow: hidden;
					position: relative;

					.title {
						display: -webkit-box;
						overflow: hidden;
						width: 100%;
						text-overflow: ellipsis;
						font-size: 28upx;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.flex {
						display: flex;
						margin-top: 5upx;

						.spec {
							padding: 0 10upx;
							height: 32upx;
							border-radius: 6upx;
							background-color: #f9f9f9;
							color: #a7a7a7;
							font-size: 20upx;
							line-height: 32upx;
						}
					}

					.price-number {
						position: absolute;
						bottom: 0upx;
						display: flex;
						width: 100%;
						height: 60upx;
						font-size: 28upx;
						justify-content: space-between;
						align-items: flex-end;

						.price {
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: flex-end;

							.input {
								width: 60upx;
								height: 60upx;
								margin: 0 10upx;
								background-color: #f9f9f9;

								input {
									width: 60upx;
									height: 60upx;
									display: flex;
									justify-content: center;
									align-items: center;
									text-align: center;
									font-size: 26upx;
								}
							}

							.sub,
							.add {
								width: 50upx;
								height: 50upx;
								background-color: #f9f9f9;
								border-radius: 5upx;

								.icon {
									font-size: 22upx;
									width: 50upx;
									height: 50upx;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}
						}
					}
				}
			}
		}
	}

	.row:first-child {
		border-radius: 15upx 15upx 0 0;

		.menu {
			border-radius: 0 15upx 0 0;
		}
	}

	.row:last-child {
		border-radius: 0 0 15upx 15upx;

		.menu {
			border-radius: 0 0 15upx 0;
		}
	}
}

.footer {
	width: 92%;
	padding: 0 4%;
	background-color: #fff;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28upx;
	position: fixed;
	bottom: 0upx;
	z-index: 5;

	.delBtn {
		border: solid 1upx #f06c7a;
		color: #f06c7a;
		padding: 0 30upx;
		height: 50upx;
		border-radius: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.settlement {
		width: 60%;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.sum {
			width: 50%;
			font-size: 28upx;
			margin-right: 20upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.money {
				font-weight: 600;
			}
		}

		.btn {
			padding: 0 30upx;
			height: 74upx;
			background-color: #e0b87a;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 14upx;
		}
	}
}
</style>
