<template>
	<view>
		<image class="line" src="../../static/img/order/01.png"></image>
		<!-- 收货地址 -->
		<view class="address">
			<view class="icon_left"><image src="../../static/img/order/02.png"></image></view>
			<view class="center">
				<view class="name-phone">
					<view class="name">林振明</view>
					<view class="phone">13211123123</view>
				</view>
				<view class="detailed">士大夫士大夫嘎豆腐干士大夫敢死队风格斯士大夫风格斯士大夫士士</view>
			</view>
			<!-- <view class="center-null">选择收货地址</view> -->
			<view class="icon xiangyou"></view>
		</view>

		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row, index) in buylist" :key="index">
				<view class="order-img"><image :src="row.img"></image></view>
				<view class="info">
					<view class="top">
						<view class="title">{{ row.name }}</view>
						<view class="depict">规格：{{ row.spec }}</view>
					</view>
					<view class="price-number">
						<view class="price">￥{{ row.price * row.number }}</view>
						<view class="number">×{{ row.number }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 选择类型 -->
		<view class="bottom">
			<view class="box">
				<view class="left">商品总价</view>
				<view class="right">￥{{ goodsPrice | toFixed }}</view>
			</view>
			<!-- <view class='box'>
				<view class='left'>运费</view>
				<view class='right'>￥0.00</view>
			</view> -->
			<view class="box offer" bindtap="checkdiscounts">
				<view class="left">优惠卷</view>
				<view class="icon_right">
					<view class="havedis_id">2个可用</view>
					<!-- <view class="num">￥{{ discounts }}</view> -->
					<view class="icon xiangyou"></view>
				</view>
			</view>
			<view class="box actual">
				<view class="left">实付款</view>
				<view class="right">￥{{ realTotalMoney }}</view>
			</view>
		</view>

		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>

		<!-- 提交订单 -->
		<view class="footer">
			<view class="text">
				<!-- <view class="left">共{{ totalnum }}件，</view> -->
				<view class="right">合计：</view>
				<view class="price">￥{{ sumPrice | toFixed }}</view>
			</view>
			<view class="submit" bindtap="submit">提交订单</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showHeader: true,
			buylist: [], //订单列表
			goodsPrice: 0.0, //商品合计价格
			sumPrice: 0.0, //用户付款价格
			freight: 12.0, //运费
			note: '', //备注
			int: 1200, //抵扣积分
			deduction: 0, //抵扣价格
			recinfo: {
				id: 1,
				name: '大黑哥',
				head: '大',
				tel: '18816881688',
				address: { region: { label: '广东省-深圳市-福田区', value: [18, 2, 1], cityCode: '440304' }, detailed: '深南大道1111号无名摩登大厦6楼A2' },
				isDefault: true
			}
		};
	},

	onShow() {
		// 页面显示时，加载订单信息
		uni.getStorage({
			key: 'buylist',
			success: ret => {
				this.buylist = ret.data;
				this.goodsPrice = 0;
				//合计
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					this.goodsPrice = this.goodsPrice + this.buylist[i].number * this.buylist[i].price;
				}
				this.deduction = this.int / 100;
				this.sumPrice = this.goodsPrice - this.deduction + this.freight;
			}
		});

		uni.getStorage({
			key: 'selectAddress',
			success: e => {
				this.recinfo = e.data;
				uni.removeStorage({
					key: 'selectAddress'
				});
			}
		});
	},

	onHide() {},

	onBackPress() {
		// 页面后退时候，清除订单信息
		this.clearOrder();
	},

	filters: {
		toFixed: function(x) {
			return parseFloat(x).toFixed(2);
		}
	},

	methods: {
		clearOrder() {
			uni.removeStorage({
				key: 'buylist',
				success: res => {
					this.buylist = [];
					console.log('remove buylist success');
				}
			});
		},

		toPay() {
			// 商品列表
			let paymentOrder = [];
			let goodsid = [];
			let len = this.buylist.length;
			for (let i = 0; i < len; i++) {
				paymentOrder.push(this.buylist[i]);
				goodsid.push(this.buylist[i].id);
			}
			if (paymentOrder.length == 0) {
				uni.showToast({ title: '订单信息有误，请重新购买', icon: 'none' });
				return;
			}
			// 本地模拟订单提交UI效果
			uni.showLoading({
				title: '正在提交订单...'
			});
			setTimeout(() => {
				uni.setStorage({
					key: 'paymentOrder',
					data: paymentOrder,
					success: () => {
						uni.hideLoading();
						uni.redirectTo({
							url: '../pay/payment/payment?amount=' + this.sumPrice
						});
					}
				});
			}, 1000);
		},

		// 选择收货地址
		selectAddress() {
			uni.navigateTo({
				url: '../user/address/address?type=select'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f9f9f9;
}

.place {
	height: 116upx;
}

.line {
	display: block;
	width: 100%;
	height: 6upx;
}

/* 收货地址 */
.address {
	display: flex;
	padding: 0 4%;
	width: 92%;
	height: 160upx;
	background-color: #fff;
	align-items: center;

	.icon_left image {
		margin-right: 30upx;
		width: 50upx;
		height: 50upx;
	}

	.center {
		width: 100%;

		.name-phone {
			display: flex;
			margin-bottom: 6upx;
			align-items: center;

			.name {
				margin-right: 18upx;
				font-size: 30upx;
			}

			.phone {
				color: #7f7f7f;
				font-size: 24upx;
			}
		}

		.detailed {
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 24upx;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}

	.center-null {
		width: 100%;
		color: #333;
		font-size: 28upx;
	}

	.icon {
		margin-left: 30upx;
		color: #bdc3c7;
		font-size: 24upx;
	}
}

/* 订单详情 */
.buy-list {
	margin-top: 20upx;
	padding: 30upx 4%;
	width: 92%;
	background-color: #fff;

	.row {
		display: flex;
		margin-top: 24upx;

		.order-img {
			margin-right: 20upx;

			image {
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 8upx;
				background-color: #f5f5f5;
			}
		}

		.info {
			display: flex;
			width: 100%;
			flex-direction: column;
			justify-content: space-between;

			.top {
				.title {
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26upx;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.depict {
					display: flex;
					color: #999;
					font-size: 24upx;
				}
			}

			.price-number {
				display: flex;
				width: 100%;
				font-size: 24upx;
				justify-content: space-between;

				.price {
					display: flex;
					color: red;
					font-size: 24upx;
				}

				.number {
					display: flex;
					font-size: 24upx;
				}
			}
		}
	}

	.row:first-child {
		margin-top: 0;
	}
}

/* 选择类型 */
.bottom {
	margin-top: 20upx;
	padding: 30upx 4%;
	width: 92%;
	background-color: #fff;

	.box {
		display: flex;
		margin-bottom: 24upx;
		color: #95a5a6;
		font-size: 24upx;
		justify-content: space-between;
		align-items: center;

		.left {
			margin-right: 30upx;
			text-align: right;
		}

		.right {
			display: flex;
			justify-content: space-between;
		}

		.icon_right {
			display: flex;
			align-items: center;

			.havedis_id {
				margin-right: 15upx;
				color: red;
			}

			.num {
				margin-right: 20upx;
			}

			.icon {
				color: #bdc3c7;
				font-size: 24upx;
			}
		}
	}

	.box:last-child {
		margin-bottom: 0;
	}

	.box.offer {
		color: #7f7f7f;
	}

	.actual {
		color: #333;
		font-size: 28upx;

		.box-right {
			color: red;
		}
	}
}

/* 提交订单 */
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	width: 100%;
	height: 96upx;
	background-color: #fff;
	line-height: 96upx;
	justify-content: flex-end;

	.text {
		display: flex;

		.left {
			color: #808080;
			font-size: 24upx;
		}

		.right {
			font-size: 24upx;
		}

		.price {
			color: red;
			font-size: 32upx;
		}
	}

	.submit {
		margin-left: 30upx;
		padding: 0 60upx;
		background-color: #fe4646;
		color: #fff;
		font-size: 32upx;
	}
}
</style>
