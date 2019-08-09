<template>
	<view>
		<view v-if="showHeader" class="status" :style="{ position: headerPosition, top: statusTop }"></view>
		<!-- 用户信息 -->
		<view class="user" @tap="toSetting">
			<image src="/static/img/tabBar/user/01.png" class="back"></image>
			<!-- 头像 -->
			<view class="left"><image :src="user.face"></image></view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view class="username">{{ user.username }}</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order">
			<view class="title">
				<view class="left">我的订单</view>
				<view class="right" @tap="toOrderList(0)">
					<view class="text">查看全部</view>
					<view class="icon xiangyou"></view>
				</view>
			</view>
			<!-- 订单类型 -->
			<view class="list">
				<view class="box" v-for="(row, index) in orderList" :key="index" @tap="toOrderList(index + 1)">
					<view class="img"><view class="icon" :class="row.icon"></view></view>
					<view class="text">{{ row.text }}</view>
				</view>
			</view>
		</view>
		<view v-if="showHeader" class="place-order-bottom"></view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<!-- <view class="title">我的工具栏</view> -->
			<view class="list">
				<view class="box" v-for="(row, index) in toolbarList" :key="index" @tap="toPage(row.url)">
					<view class="left">
						<view class="title">{{ row.title }}</view>
						<view class="subtitle" v-if="row.subtitle">{{ row.subtitle }}</view>
					</view>
					<view class="right">
						<view class="text">{{ row.prompt }}</view>
						<view class="icon xiangyou"></view>
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
			isfirst: true,
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			showHeader: true,
			// 个人信息,
			user: {
				username: '游客1002',
				face: '/static/img/face.jpg'
			},
			// 订单类型
			orderList: [
				{
					text: '待付款',
					icon: 'fukuan'
				},
				{
					text: '待发货',
					icon: 'fahuo'
				},
				{
					text: '待收货',
					icon: 'shouhuo'
				},
				{
					text: '待评价',
					icon: 'pingjia'
				},
				{
					text: '退换货',
					icon: 'tuihuo'
				}
			],
			// 工具栏列表
			toolbarList: [
				{
					url: '../../user/coupon/coupon',
					title: '优惠券',
					subtitle: '暂无可用优惠卷',
					prompt: '查看'
				},
				{
					url: '../../user/keep/keep',
					title: '我的收藏',
					subtitle: '暂无收藏',
					prompt: '查看'
				},
				{
					url: '../../user/address/address',
					title: '收货地址',
					prompt: '查看'
				}
			]
		};
	},

	// 下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},

	onPageScroll(e) {
		// 兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop >= 0 ? 'fixed' : 'absolute';
		this.headerTop = e.scrollTop >= 0 ? null : 0;
		this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
	},

	onLoad() {
		this.statusHeight = 0;
		// #ifdef APP-PLUS
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
	},

	onReady() {
		// 此处，演示,每次页面初次渲染都把登录状态重置
		uni.setStorage({
			key: 'UserInfo',
			data: false,
			success: function() {},
			fail: function(e) {}
		});
	},

	onShow() {
		uni.getStorage({
			key: 'UserInfo',
			success: res => {
				if (!res.data) {
					if (this.isfirst) {
						//this.toLogin();
					}
					return;
				}
				this.user = res.data;
			},
			fail: e => {
				//this.toLogin();
			}
		});
	},

	methods: {
		// 消息列表
		toMsg() {
			uni.navigateTo({
				url: '../../msg/msg'
			});
		},

		toOrderList(index) {
			uni.setStorageSync('tbIndex', index);
			uni.navigateTo({
				url: '../../user/order_list/order_list?tbIndex=' + index
			});
		},

		toSetting() {
			uni.navigateTo({
				url: '../../user/setting/setting'
			});
		},

		toPage(url) {
			if (!url) {
				uni.showToast({
					title: '模板未包含此页面',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	position: relative;
	background-color: #f9f9f9;
}

.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #f06c7a;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}

.place-order-bottom {
	height: 20upx;
}

.user {
	display: flex;
	padding: 80upx 4%;
	width: 92%;
	align-items: center;

	.back {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 280upx;
	}

	.left {
		margin-right: 30upx;
		width: 108upx;
		height: 108upx;
		border: solid 1upx #fff;
		border-radius: 100%;
		flex-shrink: 0;

		image {
			width: 108upx;
			height: 108upx;
			border-radius: 100%;
		}
	}

	.right {
		width: 100%;

		.username {
			font-size: 32upx;
			color: #fff;
		}
	}
}

.order {
	padding: 30upx 4% 40upx;
	width: 92%;
	background-color: #fff;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #464646;

		.left {
			font-size: 28upx;
			font-weight: 600;
			line-height: 40upx;
		}

		.right {
			display: flex;
			align-items: center;

			.text {
				color: #bdc3c7;
				font-size: 24upx;
			}

			.icon {
				margin-left: 10rpx;
				color: #bdc3c7;
				font-size: 24upx;
			}
		}
	}

	.list {
		margin-top: 40upx;
		display: flex;

		.box {
			width: 20%;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				.icon {
					font-size: 50rpx;
					color: #464646;
				}
			}

			.text {
				margin-top: 10upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #464646;
			}
		}
	}
}

.toolbar {
	padding: 0 4%;
	width: 92%;
	background-color: #fff;

	.list {
		display: flex;
		flex-direction: column;

		.box {
			display: flex;
			padding: 30upx 0;
			width: 100%;
			border-bottom: 2upx solid #f0f0f0;
			justify-content: space-between;

			.left {
				.title {
					height: 50upx;
					color: #3d3d3d;
					font-weight: 600;
					font-size: 28upx;
					line-height: 50upx;
				}

				.subtitle {
					margin-top: 10upx;
					color: #888888;
					font-size: 24upx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.text {
					color: #bdc3c7;
					font-size: 24upx;
				}

				.icon {
					margin-left: 10rpx;
					color: #bdc3c7;
					font-size: 24upx;
				}
			}
		}

		.box:last-of-type {
			border: 0;
		}
	}
}

.place-text {
	display: flex;
	width: 100%;
	height: 100rpx;
	background-color: #f9f9f9;
	color: #979797;
	font-size: 24upx;
	justify-content: center;
	align-items: center;
}
</style>
