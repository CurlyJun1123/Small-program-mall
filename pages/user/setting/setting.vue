<template>
	<view>
		<view class="content">
			<!-- 头像昵称 -->
			<view class="top">
				<view class="avatar"><image></image></view>
				<view class="nickname">
					<view>微信昵称：</view>
					<view>{{ nickname }}</view>
				</view>
			</view>

			<!-- 信息 -->
			<view class="info">
				<view class="left">
					<view>真实姓名</view>
					<view class="left-sex">性别</view>
					<view>手机号码</view>
				</view>
				<view class="right">
					<view><input name="realName" :value="realname" placeholder="真实姓名" /></view>
					<view>
						<picker name="gender" @change="selectGender" :value="index" :range="genderList">
							<view class="picker">
								{{ genderList[index] }}
								<view class="icon xiangyou"></view>
							</view>
						</picker>
					</view>
					<view><input name="phone" type="number" :value="phone" placeholder="手机号码" /></view>
				</view>
			</view>

			<!-- 保存 -->
			<view class="save"><button class="text" form-type="submit">保&emsp;存</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickname: '',
			realname: null,
			genderList: ['请选择', '男', '女'],
			index: 0,
			phone: null
		};
	},

	methods: {
		// 选择性别
		selectGender: function(e) {
			this.index = e.target.value;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f9f9f9;
}

/* 头像昵称 */
.top {
	display: flex;
	padding: 55upx 30upx;
	width: calc(100% - 60upx);
	height: 130upx;
	background-color: #fff;

	.avatar image {
		display: block;
		margin-right: 30upx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background-color: #f3f3f3;
	}

	.nickname {
		display: flex;
		font-weight: 900;
		font-size: 32upx;
		line-height: 120upx;
	}
}

/* 信息 */
.info {
	display: flex;
	margin-top: 30upx;
	padding: 0 30upx;
	width: calc(100% - 60upx);
	background-color: #fff;
	font-size: 30upx;

	.left view,
	.right view {
		height: 108upx;
		border-bottom: 2upx solid #e6e6e6;
		line-height: 108upx;
	}

	.left view:last-child,
	.right view:last-child {
		border-bottom: 0;
	}

	.left {
		view {
			padding-right: 30upx;
		}

		.left-sex {
			text-align: justify;
			text-justify: distribute-all-lines;
			text-align-last: justify;
		}

		.left-sex::after {
			display: inline-block;
			width: 100%;
			content: '';
		}
	}

	.right {
		width: 540upx;

		view input {
			height: 108upx;
			line-height: 108upx;
		}
	}

	.picker {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.sex-iconright {
			position: absolute;
			right: 0;
			color: #c6c6c6;
		}

		.icon {
			color: #808080;
			font-size: 30upx;
		}
	}
}

.save {
	margin: 30upx 30upx 0 30upx;

	.text {
		width: 100%;
		height: 80upx;
		border-radius: 10upx;
		background-color: #e0b87a;
		color: #fff;
		text-align: center;
		font-size: 30upx;
		line-height: 80upx;
	}
}
</style>
