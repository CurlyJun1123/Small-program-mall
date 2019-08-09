<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">收件人</view>
				<view class="input"><input placeholder="请输入收件人姓名" type="text" v-model="name" /></view>
			</view>
			<view class="row">
				<view class="nominal">手机号码</view>
				<view class="input"><input placeholder="请输入收件人手机号码" type="number" v-model="tel" /></view>
			</view>
			<view class="row">
				<view class="nominal">所在地区</view>
				<view class="input" @tap="chooseCity">{{ region.label }}</view>
			</view>
			<view class="row">
				<view class="nominal">详细地址</view>
				<view class="textarea"><textarea v-model="detailed" auto-height="true" placeholder="如道路、门牌号、小区、楼道号等"></textarea></view>
			</view>
			<view class="row">
				<view class="nominal">设为默认地址</view>
				<view class="input switch"><switch color="#e0b87a" :checked="isDefault" @change="isDefaultChange" /></view>
			</view>
			<view class="row" v-if="editType == 'edit'" @tap="del"><view class="del">删除收货地址</view></view>
		</view>
		<view class="save" @tap="save"><view class="btn">保存地址</view></view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';

export default {
	components: {
		mpvueCityPicker
	},

	data() {
		return {
			editType: 'edit',
			id: '',
			name: '',
			tel: '',
			detailed: '',
			isDefault: false,
			cityPickerValue: [0, 0, 1],
			themeColor: '#007AFF',
			region: { label: '请点击选择地址', value: [], cityCode: '' }
		};
	},

	methods: {
		onCancel(e) {
			console.log(e);
		},

		chooseCity() {
			this.$refs.mpvueCityPicker.show();
		},

		onConfirm(e) {
			this.region = e;
			this.cityPickerValue = e.value;
		},

		isDefaultChange(e) {
			this.isDefault = e.detail.value;
		},

		del() {
			uni.showModal({
				title: '删除提示',
				content: '你将删除这个收货地址',
				success: res => {
					if (res.confirm) {
						uni.setStorage({
							key: 'delAddress',
							data: { id: this.id },
							success() {
								uni.navigateBack();
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},

		save() {
			let data = { name: this.name, head: this.name.substr(0, 1), tel: this.tel, address: { region: this.region, detailed: this.detailed }, isDefault: this.isDefault };
			if (this.editType == 'edit') {
				data.id = this.id;
			}
			if (!data.name) {
				uni.showToast({ title: '请输入收件人姓名', icon: 'none' });
				return;
			}
			if (!data.tel) {
				uni.showToast({ title: '请输入收件人手机号码', icon: 'none' });
				return;
			}
			if (!data.address.detailed) {
				uni.showToast({ title: '请输入收件人详细地址', icon: 'none' });
				return;
			}
			if (data.address.region.value.length == 0) {
				uni.showToast({ title: '请选择所在地区', icon: 'none' });
				return;
			}
			uni.showLoading({
				title: '正在提交'
			});
			// 实际应用中请提交ajax，模板定时器模拟提交效果
			setTimeout(() => {
				uni.setStorage({
					key: 'saveAddress',
					data: data,
					success() {
						uni.hideLoading();
						uni.navigateBack();
					}
				});
			}, 300);
		}
	},

	onLoad(e) {
		// 获取传递过来的参数
		this.editType = e.type;
		if (e.type == 'edit') {
			uni.getStorage({
				key: 'address',
				success: e => {
					this.id = e.data.id;
					this.name = e.data.name;
					this.tel = e.data.tel;
					this.detailed = e.data.address.detailed;
					this.isDefault = e.data.isDefault;
					this.cityPickerValue = e.data.address.region.value;
					this.region = e.data.address.region;
				}
			});
		}
	},

	onBackPress() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},

	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
		}
	}
};
</script>

<style lang="scss">
.save {
	position: fixed;
	bottom: 0;
	display: flex;
	width: 100%;
	height: 140upx;
	justify-content: center;
	align-items: center;

	view {
		display: flex;
	}

	.btn {
		width: 90%;
		height: 80upx;
		border-radius: 80upx;
		background-color: #e0b87a;
		box-shadow: 0upx 4upx 20upx rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 28upx;
		justify-content: center;
		align-items: center;
	}
}

.content {
	display: flex;
	flex-wrap: wrap;

	view {
		display: flex;
	}

	.row {
		margin: 0 4%;
		width: 92%;
		border-bottom: solid 1upx #eee;

		.nominal {
			height: 120upx;
			width: 25%;
			font-size: 28upx;
			align-items: center;
		}

		.input {
			height: 120upx;
			width: 75%;
			font-size: 28upx;
			align-items: center;

			input {
				width: 100%;
				font-size: 28upx;
			}

			&.switch {
				justify-content: flex-end;

				switch {
					transform: scale(0.8);
				}
			}
		}

		.textarea {
			padding: 30upx 0;
			width: 75%;
			align-items: center;

			textarea {
				font-size: 28upx;
			}
		}

		.del {
			width: 100%;
			height: 100upx;
			background-color: rgba(255, 0, 0, 0.05);
			color: #f06c7a;
			font-size: 32upx;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
