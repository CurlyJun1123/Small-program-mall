<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row, index) in addressList" :key="index" @tap="select(row)">
					<view class="left">
						<view class="head">{{ row.head }}</view>
					</view>
					<view class="center">
						<view class="name-tel">
							<view class="name">{{ row.name }}</view>
							<view class="tel">{{ row.tel }}</view>
							<view class="default" v-if="row.isDefault">默认</view>
						</view>
						<view class="address">{{ row.address.region.label }} {{ row.address.detailed }}</view>
					</view>
					<view class="right"><view class="icon bianji" @tap.stop="edit(row)"></view></view>
				</view>
			</view>
		</view>
		<view class="add"><view class="btn" @tap="add">新增地址</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isSelect: false,
			addressList: [
				{
					id: 1,
					name: '大黑哥',
					head: '大',
					tel: '18816881688',
					address: { region: { label: '广东省-深圳市-福田区', value: [18, 2, 1], cityCode: '440304' }, detailed: '深南大道1111号无名摩登大厦6楼A2' },
					isDefault: true
				},
				{
					id: 2,
					name: '大黑哥',
					head: '大',
					tel: '15812341234',
					address: { region: { label: '广东省 深圳市 福田区', value: [18, 2, 1], cityCode: '440304' }, detailed: '深北小道2222号有名公寓502' },
					isDefault: false
				},
				{
					id: 3,
					name: '老大哥',
					head: '老',
					tel: '18155467897',
					address: { region: { label: '广东省 深圳市 福田区', value: [18, 2, 1], cityCode: '440304' }, detailed: '深南大道1111号无名摩登大厦6楼A2' },
					isDefault: false
				},
				{
					id: 4,
					name: '王小妹',
					head: '王',
					tel: '13425654895',
					address: { region: { label: '广东省 深圳市 福田区', value: [18, 2, 1], cityCode: '440304' }, detailed: '深南大道1111号无名摩登大厦6楼A2' },
					isDefault: false
				}
			]
		};
	},

	onShow() {
		uni.getStorage({
			key: 'delAddress',
			success: e => {
				let len = this.addressList.length;
				if (e.data.hasOwnProperty('id')) {
					for (let i = 0; i < len; i++) {
						if (this.addressList[i].id == e.data.id) {
							this.addressList.splice(i, 1);
							break;
						}
					}
				}
				uni.removeStorage({
					key: 'delAddress'
				});
			}
		});

		uni.getStorage({
			key: 'saveAddress',
			success: e => {
				let len = this.addressList.length;
				if (e.data.hasOwnProperty('id')) {
					for (let i = 0; i < len; i++) {
						if (this.addressList[i].id == e.data.id) {
							this.addressList.splice(i, 1, e.data);
							break;
						}
					}
				} else {
					let lastid = this.addressList[len - 1];
					lastid++;
					e.data.id = lastid;
					this.addressList.push(e.data);
				}
				uni.removeStorage({
					key: 'saveAddress'
				});
			}
		});
	},

	onLoad(e) {
		if (e.type == 'select') {
			this.isSelect = true;
		}
	},

	methods: {
		edit(row) {
			uni.setStorage({
				key: 'address',
				data: row,
				success() {
					uni.navigateTo({
						url: 'edit/edit?type=edit'
					});
				}
			});
		},

		add() {
			uni.navigateTo({
				url: 'edit/edit?type=add'
			});
		},

		select(row) {
			//是否需要返回地址(从订单确认页跳过来选收货地址)
			if (!this.isSelect) {
				return;
			}
			uni.setStorage({
				key: 'selectAddress',
				data: row,
				success() {
					uni.navigateBack();
				}
			});
		}
	}
};
</script>

<style lang="scss">
view {
	display: flex;
}

.icon {
	// &.bianji {
	// 	&:before{content:"\e61b";}
	// }
	// &.tianjia {
	// 	&:before{content:"\e81a";}
	// }
}

.add {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 140upx;
	justify-content: center;
	align-items: center;

	.btn {
		width: 90%;
		height: 80upx;
		border-radius: 80upx;
		background-color: #e0b87a;
		box-shadow: 0upx 4upx 20upx rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 30upx;
		justify-content: center;
		align-items: center;
	}
}

.list {
	flex-wrap: wrap;

	.row {
		padding: 20upx 4%;
		width: 92%;

		.left {
			width: 100upx;
			flex-shrink: 0;
			align-items: center;

			.head {
				width: 70upx;
				height: 70upx;
				border-radius: 60upx;
				background: linear-gradient(to right, #ccc, #aaa);
				color: #fff;
				font-size: 32upx;
				line-height: 70upx;
				justify-content: center;
			}
		}

		.center {
			width: 100%;
			flex-wrap: wrap;

			.name-tel {
				width: 100%;
				align-items: center;

				.name {
					font-size: 28upx;
				}

				.tel {
					margin-left: 20upx;
					color: #777;
					font-size: 26upx;
				}

				.default {
					margin-left: 20upx;
					padding: 0 16upx;
					border-radius: 24upx;
					background-color: #e0b87a;
					color: #fff;
					font-size: 22upx;
				}
			}

			.address {
				margin-top: 5upx;
				width: 100%;
				color: #777;
				font-size: 24upx;
				align-items: baseline;
			}
		}

		.right {
			flex-shrink: 0;
			align-items: center;

			.icon {
				width: 60upx;
				height: 60upx;
				color: #777;
				font-size: 40upx;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
